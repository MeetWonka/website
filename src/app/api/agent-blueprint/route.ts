import {
  getClientIp,
  isTurnstileRequired,
  verifyTurnstileToken,
} from "@/lib/lead-api";
import {
  anonymizeBlueprint,
  anonymizeCompanyResearch,
  missingBlueprintEnv,
  normalizeTarget,
  redactText,
  type BlueprintStreamEvent,
  type CompanyContext,
  type CompanyResearch,
  type InsightKind,
} from "@/lib/agent-blueprint";
import { crawlCompanySite } from "@/lib/agent-blueprint-crawl";
import { isAgentBlueprintRateLimited } from "@/lib/agent-blueprint-rate-limit";
import {
  designAgents,
  externalSignals,
  researchCompany,
  type ExternalSignals,
} from "@/lib/agent-blueprint-requesty";
import { searchBenchmark } from "@/lib/agent-blueprint-search";
import { getSanityWriteClient } from "@sanity/lib/write-client";

interface CreatePayload {
  target?: unknown;
  anonymous?: unknown;
  turnstileToken?: unknown;
  website?: unknown;
}

interface UpdatePayload {
  assessmentId?: unknown;
  event?: unknown;
  website?: unknown;
}

export const maxDuration = 300;

const PUBLIC_ERROR =
  "We could not build the blueprint right now. Please try again.";

const ASSESSMENT_ID_PATTERN =
  /^agent-blueprint\.[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function publicError(status = 500) {
  return Response.json({ error: PUBLIC_ERROR }, { status });
}

export async function POST(request: Request) {
  let payload: CreatePayload;
  try {
    payload = (await request.json()) as CreatePayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return Response.json({ ok: true });
  }

  const target = normalizeTarget(payload.target);
  if (!target) {
    return Response.json(
      { error: "Enter a valid company website." },
      { status: 400 },
    );
  }

  if (payload.anonymous !== true) {
    return Response.json(
      { error: "Confirm anonymous output before starting." },
      { status: 400 },
    );
  }

  if (isTurnstileRequired()) {
    const valid = await verifyTurnstileToken(payload.turnstileToken);
    if (!valid) {
      return Response.json(
        { error: "Verification failed. Please try again." },
        { status: 403 },
      );
    }
  }

  // Fail before logging an assessment or crawling when the pipeline cannot run.
  const missingEnv = missingBlueprintEnv();
  if (missingEnv.length > 0) {
    console.error("Agent blueprint is not configured", { missingEnv });
    return Response.json(
      {
        error:
          process.env.NODE_ENV === "production"
            ? PUBLIC_ERROR
            : `Agent blueprint is not configured. Missing: ${missingEnv.join(", ")}`,
      },
      { status: 503 },
    );
  }

  const client = getSanityWriteClient();
  if (!client) return publicError(503);

  const clientIp = getClientIp(request);
  if (clientIp) {
    try {
      if (await isAgentBlueprintRateLimited(client, clientIp)) {
        return Response.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 },
        );
      }
    } catch {
      return publicError();
    }
  }

  const assessmentId = `agent-blueprint.${crypto.randomUUID()}`;
  const now = new Date().toISOString();

  try {
    await client.create({
      _id: assessmentId,
      _type: "agentBlueprintAssessment",
      targetDomain: target.domain,
      anonymous: true,
      status: "processing",
      submittedAt: now,
      requestyModel: process.env.REQUESTY_AGENT_BLUEPRINT_MODEL?.trim(),
      ...(clientIp ? { clientIp } : {}),
    });
  } catch {
    return publicError();
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: BlueprintStreamEvent) =>
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      // Keeps proxies from closing the connection during long model calls.
      const heartbeat = setInterval(() => send({ type: "ping" }), 10_000);

      try {
        const startedAt = Date.now();
        const timings: Record<string, number> = {};
        const mark = (label: string) => {
          timings[label] = Date.now() - startedAt;
        };

        send({ type: "stage", stage: "crawl" });
        // Public signals (web search) don't depend on the crawl: start now.
        const signalsPromise = externalSignals(target.domain, assessmentId)
          .then((outcome) => {
            mark("signals");
            return outcome;
          })
          .catch((error: unknown) => {
            console.warn("Agent blueprint external signals skipped", {
              assessmentId,
              error: error instanceof Error ? error.message : "unknown",
            });
            return null;
          });

        const crawl = await crawlCompanySite(target.website, target.domain);
        mark("crawl");
        send({
          type: "insight",
          kind: "pages",
          text: crawl.pages.length
            ? `${crawl.pages.length} pages read · ${crawl.pages
                .map((page) => page.path)
                .slice(0, 4)
                .join("  ")}`
            : "Site not readable · using public web research",
        });

        send({ type: "stage", stage: "research" });
        const research = await researchCompany(
          target.domain,
          crawl.pages,
          assessmentId,
        );
        mark("research");
        const siteOnly = anonymizeCompanyResearch(
          research.value,
          target.domain,
        );
        for (const insight of researchInsights(siteOnly.context)) {
          send({ type: "insight", ...insight });
        }

        send({ type: "stage", stage: "benchmark" });
        // The benchmark only needs the site analysis; overlap it with signals.
        const [benchmark, signals] = await Promise.all([
          searchBenchmark(siteOnly.context).then((patterns) => {
            mark("benchmark");
            return patterns;
          }),
          signalsPromise,
        ]);
        if (benchmark.length < 3) {
          throw new Error("Not enough benchmark matches");
        }

        const { context, identifiers } = anonymizeCompanyResearch(
          mergeSignals(research.value, signals?.value ?? null),
          target.domain,
        );
        for (const insight of signalInsights(
          signals?.value ?? null,
          identifiers,
        )) {
          send({ type: "insight", ...insight });
        }
        send({
          type: "insight",
          kind: "match",
          text: `${benchmark.length} comparable use cases matched`,
        });

        send({ type: "stage", stage: "design" });
        const blueprint = await designAgents(context, benchmark, assessmentId);
        mark("design");
        console.info("Agent blueprint timings (ms since start)", {
          assessmentId,
          pages: crawl.pages.length,
          ...timings,
        });
        const result = {
          ...anonymizeBlueprint(blueprint.value, identifiers),
          sources: research.sources.map((source, index) => ({
            title: `Public source ${index + 1}`,
            url: source.url,
          })),
        };
        const completedAt = new Date().toISOString();
        const responseIds = [
          research.responseId,
          signals?.responseId,
          blueprint.responseId,
        ].filter((value): value is string => Boolean(value));
        const requestCost = [research.cost, signals?.cost, blueprint.cost]
          .filter((value): value is number => typeof value === "number")
          .reduce((sum, cost) => sum + cost, 0);

        await client
          .patch(assessmentId)
          .set({
            status: "completed",
            sector: result.sector,
            headline: result.headline,
            summary: result.summary,
            agents: result.agents.map((agent) => ({
              _key: agent.id,
              name: agent.name,
              tier: agent.tier,
              mission: agent.mission,
              tools: agent.tools,
              expectedImpact: agent.expectedImpact,
              weeklyHoursSaved: agent.weeklyHoursSaved,
              effort: agent.effort,
            })),
            sources: result.sources.map((source, index) => ({
              _key: `source-${index + 1}`,
              ...source,
            })),
            completedAt,
            requestyResponseIds: responseIds,
            ...(requestCost > 0 ? { requestCost } : {}),
          })
          .unset(["errorCode"])
          .commit();

        send({ type: "result", assessmentId, result });
      } catch (error) {
        console.error("Agent blueprint generation failed", {
          assessmentId,
          error: error instanceof Error ? error.message : "unknown",
        });
        await client
          .patch(assessmentId)
          .set({
            status: "failed",
            errorCode: "generation_failed",
            completedAt: new Date().toISOString(),
          })
          .commit()
          .catch(() => undefined);
        send({ type: "error", error: PUBLIC_ERROR });
      } finally {
        clearInterval(heartbeat);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}

function uniqueStrings(values: string[], max: number): string[] {
  return Array.from(
    new Set(values.map((value) => value.trim()).filter(Boolean)),
  ).slice(0, max);
}

/** Folds the web-search signals into the site analysis before design. */
function mergeSignals(
  research: CompanyResearch,
  signals: ExternalSignals | null,
): CompanyResearch {
  if (!signals) return research;
  return {
    ...research,
    scale: signals.scale.trim() || research.scale,
    hiringSignals: uniqueStrings(
      [...research.hiringSignals, ...signals.hiringSignals],
      6,
    ),
    techStackEvidence: uniqueStrings(
      [...research.techStackEvidence, ...signals.techStackEvidence],
      8,
    ),
    regulatoryContext: uniqueStrings(
      [...research.regulatoryContext, ...signals.regulatoryContext],
      6,
    ),
    painHypotheses: uniqueStrings(
      [
        ...research.painHypotheses,
        ...signals.recentNews.map((news) => `Recent change: ${news}`),
      ],
      8,
    ),
    privateIdentifiers: uniqueStrings(
      [...research.privateIdentifiers, ...signals.privateIdentifiers],
      20,
    ),
  };
}

interface Insight {
  kind: InsightKind;
  text: string;
}

/** Keeps streamed insights scannable: one short line each. */
function shortInsight(kind: InsightKind, text: string | undefined): Insight[] {
  const clean = text?.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  return [
    {
      kind,
      text: clean.length > 90 ? `${clean.slice(0, 88).trimEnd()}…` : clean,
    },
  ];
}

function signalInsights(
  signals: ExternalSignals | null,
  identifiers: string[],
): Insight[] {
  if (!signals) return [];
  return [
    ...shortInsight("hiring", signals.hiringSignals[0]),
    ...shortInsight("rules", signals.regulatoryContext[0]),
  ].map((insight) => ({
    ...insight,
    text: redactText(insight.text, identifiers),
  }));
}

/** Short, anonymised observations streamed while the agents are designed. */
function researchInsights(context: CompanyContext): Insight[] {
  return [
    ...shortInsight("offer", context.offerings.slice(0, 3).join(" · ")),
    ...shortInsight("scale", context.scale),
    ...context.keyProcesses
      .slice(0, 3)
      .flatMap((process) => shortInsight("process", process.name)),
  ];
}

export async function PATCH(request: Request) {
  let payload: UpdatePayload;
  try {
    payload = (await request.json()) as UpdatePayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return Response.json({ ok: true });
  }

  if (
    typeof payload.assessmentId !== "string" ||
    !ASSESSMENT_ID_PATTERN.test(payload.assessmentId)
  ) {
    return Response.json({ error: "Invalid assessment." }, { status: 400 });
  }

  const client = getSanityWriteClient();
  if (!client) return publicError(503);

  const now = new Date().toISOString();
  if (payload.event === "demo_clicked") {
    await client
      .patch(payload.assessmentId)
      .setIfMissing({ demoClickedAt: now })
      .commit()
      .catch(() => undefined);
    return Response.json({ ok: true });
  }

  return Response.json({ error: "Invalid update." }, { status: 400 });
}
