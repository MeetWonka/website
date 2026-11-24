import {
  getClientIp,
  hasRecentDuplicateLead,
  isRateLimited,
  isTurnstileRequired,
  normalizeLeadEmail,
  verifyTurnstileToken,
} from "@/lib/lead-api";
import { isLeadSource, type LeadErrorCode } from "@/lib/lead-capture";
import { getSanityWriteClient } from "@sanity/lib/write-client";
import { qualifyLead } from "@/lib/lead-qualification";

interface LeadPayload {
  email?: unknown;
  firstName?: unknown;
  company?: unknown;
  source?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
  analytics?: unknown;
  diagnostic?: unknown;
}

const ANALYTICS_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "landing_page",
  "landing_path",
  "referrer",
  "posthog_distinct_id",
  "posthog_session_id",
  "journey_id",
] as const;

function sanitizeAnalytics(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const input = value as Record<string, unknown>;
  return Object.fromEntries(
    ANALYTICS_KEYS.flatMap((key) => {
      const item = input[key];
      return typeof item === "string" && item.trim() ? [[key, item.trim().slice(0, 2_000)]] : [];
    }),
  );
}

const DIAGNOSTIC_VALUES = {
  secteur: ["industrie", "finance", "energie", "public", "services", "autre"],
  outil: ["chatgpt-perso", "copilot", "rien", "outil-entreprise"],
  donnees: ["sharepoint", "odoo", "mail", "crm", "mix"],
  frein: ["rssi", "shadow-it", "pas-de-temps", "pas-de-cas"],
  role: ["dsi", "rssi", "metier", "direction"],
} as const;

function sanitizeText(value: unknown, maxLength = 200): string | undefined {
  return typeof value === "string" && value.trim()
    ? value.trim().slice(0, maxLength)
    : undefined;
}

function sanitizeDiagnostic(value: unknown): Record<string, string> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const input = value as Record<string, unknown>;
  const answers = Object.fromEntries(
    Object.entries(DIAGNOSTIC_VALUES).flatMap(([key, allowedValues]) => {
      const answer = sanitizeText(input[key], 100);
      return answer && (allowedValues as readonly string[]).includes(answer)
        ? [[key, answer]]
        : [];
    }),
  );
  return Object.keys(answers).length ? answers : undefined;
}

/** Error response: English `error` for humans, stable `code` for clients. */
function errorResponse(code: LeadErrorCode, error: string, status: number) {
  return Response.json({ error, code }, { status });
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return errorResponse("invalid_body", "Invalid request body.", 400);
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return Response.json({ ok: true });
  }

  const email = normalizeLeadEmail(payload.email);
  if (!email) {
    return errorResponse("invalid_email", "Please enter a valid email address.", 400);
  }

  if (!isLeadSource(payload.source)) {
    return errorResponse("invalid_source", "Invalid lead source.", 400);
  }

  if (isTurnstileRequired()) {
    const valid = await verifyTurnstileToken(payload.turnstileToken);
    if (!valid) {
      return errorResponse("verification_failed", "Verification failed. Please try again.", 403);
    }
  }

  const client = getSanityWriteClient();
  if (!client) {
    return errorResponse(
      "not_configured",
      "Lead capture is not configured. Missing SANITY_API_WRITE_TOKEN.",
      503,
    );
  }

  const clientIp = getClientIp(request);
  if (clientIp) {
    try {
      if (await isRateLimited(client, clientIp)) {
        return errorResponse(
          "rate_limited",
          "Too many submissions. Please try again later.",
          429,
        );
      }
    } catch {
      return errorResponse("server_error", "Something went wrong. Please try again.", 500);
    }
  }

  try {
    const duplicate = await hasRecentDuplicateLead(client, email, payload.source);
    if (duplicate) {
      return Response.json(
        {
          ok: true,
          leadId: duplicate._id,
          lifecycleStage: duplicate.lifecycleStage || "lead",
          leadScore: duplicate.qualificationScore || 0,
        },
        { status: 201 },
      );
    }
  } catch {
    return errorResponse("server_error", "Something went wrong. Please try again.", 500);
  }

  try {
    const attribution = sanitizeAnalytics(payload.analytics);
    const qualification = qualifyLead(email, payload.source, attribution);
    const isDiagnostic = payload.source === "france-diagnostic";
    const lead = await client.create({
      // The dataset is public: a dotted id puts the lead in a private path
      // that anonymous queries cannot read.
      _id: `site-lead.${crypto.randomUUID()}`,
      _type: "siteLead",
      email,
      submittedAt: new Date().toISOString(),
      source: payload.source,
      lifecycleStage: qualification.lifecycleStage,
      qualificationScore: qualification.score,
      qualificationSignals: qualification.signals,
      attribution,
      crmExportStatus: "ready",
      ...(isDiagnostic
        ? {
            firstName: sanitizeText(payload.firstName),
            company: sanitizeText(payload.company),
            diagnosticAnswers: sanitizeDiagnostic(payload.diagnostic),
          }
        : {}),
      ...(clientIp ? { clientIp } : {}),
    });

    return Response.json(
      {
        ok: true,
        leadId: lead._id,
        lifecycleStage: qualification.lifecycleStage,
        leadScore: qualification.score,
      },
      { status: 201 },
    );
  } catch {
    return errorResponse("server_error", "Something went wrong. Please try again.", 500);
  }

}
