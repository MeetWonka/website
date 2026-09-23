export const AGENT_TIERS = [
  "Copilot",
  "Human in the loop",
  "Fully autonomous",
] as const;

export type AgentTier = (typeof AGENT_TIERS)[number];

export interface AgentBlueprintAgent {
  id: string;
  name: string;
  tier: AgentTier;
  mission: string;
  whyNow: string;
  trigger: string;
  inputs: string[];
  tools: string[];
  workflow: string[];
  humanControl: string;
  expectedImpact: string;
  weeklyHoursSaved: {
    min: number;
    max: number;
  };
  effort: "Low" | "Medium" | "High";
  benchmarkPattern: string;
  /** The company process this agent takes over, in the company's own terms. */
  process: string;
  /** What we observed on the website or public sources that motivates it. */
  companySignal: string;
  /** Three prompts a user would type to this agent in WonkaChat. */
  conversationStarters?: string[];
}

export interface AgentBlueprintResult {
  sector: string;
  headline: string;
  summary: string;
  signals: string[];
  agents: AgentBlueprintAgent[];
  sources: Array<{ title: string; url: string }>;
}

const REQUIRED_ENV = [
  "REQUESTY_API_KEY",
  "REQUESTY_AGENT_BLUEPRINT_MODEL",
  "AZURE_AI_SEARCH_ENDPOINT",
  "AZURE_AI_SEARCH_INDEX",
  "AZURE_AI_SEARCH_API_KEY",
] as const;

/** Env vars the generation pipeline needs that are missing or empty. */
export function missingBlueprintEnv(): string[] {
  return REQUIRED_ENV.filter((name) => !process.env[name]?.trim());
}

export type BlueprintStage = "crawl" | "research" | "benchmark" | "design";

/** Newline-delimited JSON events streamed by POST /api/agent-blueprint. */
export type InsightKind =
  | "pages"
  | "offer"
  | "scale"
  | "process"
  | "hiring"
  | "rules"
  | "match";

export type BlueprintStreamEvent =
  | { type: "stage"; stage: BlueprintStage }
  | { type: "insight"; kind: InsightKind; text: string }
  | { type: "ping" }
  | { type: "result"; assessmentId: string; result: AgentBlueprintResult }
  | { type: "error"; error: string };

export interface CompanyProcess {
  name: string;
  department: string;
  description: string;
  repetitiveWork: string;
  documentsAndData: string[];
  volumeSignal: string;
  evidence: string;
}

export interface CompanyContext {
  sector: string;
  subSector: string;
  operatingModel: string;
  summary: string;
  scale: string;
  markets: string[];
  offerings: string[];
  customerSegments: string[];
  valueChain: string[];
  keyProcesses: CompanyProcess[];
  regulatoryContext: string[];
  hiringSignals: string[];
  techStackEvidence: string[];
  painHypotheses: string[];
  departments: string[];
  priorities: string[];
  likelyTools: string[];
  benchmarkQueries: string[];
  confidence: number;
}

export interface CompanyResearch extends CompanyContext {
  privateIdentifiers: string[];
}

export interface BenchmarkPattern {
  useCase: string;
  description: string;
}

export interface NormalizedTarget {
  domain: string;
  website: string;
}

const DOMAIN_PATTERN =
  /^(?=.{4,253}$)(?!-)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

export function normalizeTarget(value: unknown): NormalizedTarget | null {
  if (typeof value !== "string") return null;
  const input = value.trim().toLowerCase();
  if (!input || input.length > 320 || input.includes("@")) return null;

  let hostname: string;
  try {
    const url = new URL(
      /^[a-z][a-z\d+.-]*:\/\//i.test(input) ? input : `https://${input}`,
    );
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    hostname = url.hostname.replace(/^www\./, "").replace(/\.$/, "");
  } catch {
    return null;
  }

  if (!DOMAIN_PATTERN.test(hostname) || hostname.endsWith(".local"))
    return null;

  return {
    domain: hostname,
    website: `https://${hostname}`,
  };
}

export function isAgentBlueprintResult(
  value: unknown,
): value is Omit<AgentBlueprintResult, "sources"> {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<AgentBlueprintResult>;
  return (
    typeof candidate.sector === "string" &&
    typeof candidate.headline === "string" &&
    typeof candidate.summary === "string" &&
    Array.isArray(candidate.signals) &&
    candidate.signals.every((item) => typeof item === "string") &&
    Array.isArray(candidate.agents) &&
    candidate.agents.length === 3 &&
    candidate.agents.every(isAgentBlueprintAgent)
  );
}

export function redactText(value: string, identifiers: string[]): string {
  return identifiers
    .filter((identifier) => identifier.trim().length >= 3)
    .sort((a, b) => b.length - a.length)
    .reduce((text, identifier) => {
      const escaped = identifier.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return text.replace(new RegExp(escaped, "gi"), "the company");
    }, value)
    .replace(/\bthe company(?:\s+the company)+\b/gi, "the company");
}

/** Applies `redact` to every string in a JSON-like value, keeping its shape. */
function redactDeep<T>(value: T, redact: (text: string) => string): T {
  if (typeof value === "string") return redact(value) as T;
  if (Array.isArray(value)) {
    return value.map((item) => redactDeep(item, redact)) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        redactDeep(item, redact),
      ]),
    ) as T;
  }
  return value;
}

export function anonymizeCompanyResearch(
  research: CompanyResearch,
  domain: string,
): { context: CompanyContext; identifiers: string[] } {
  const { privateIdentifiers, ...context } = research;
  const identifiers = Array.from(
    new Set([...privateIdentifiers, domain, domain.split(".")[0] ?? ""]),
  );
  const redact = (value: string) => redactText(value, identifiers);

  return {
    identifiers,
    context: {
      ...redactDeep(context, redact),
      confidence: research.confidence,
    },
  };
}

export function anonymizeBlueprint(
  result: Omit<AgentBlueprintResult, "sources">,
  identifiers: string[],
): Omit<AgentBlueprintResult, "sources"> {
  const redact = (value: string) => redactText(value, identifiers);
  return {
    sector: redact(result.sector),
    headline: redact(result.headline),
    summary: redact(result.summary),
    signals: result.signals.map(redact),
    agents: result.agents.map((agent) => ({
      ...agent,
      name: redact(agent.name),
      mission: redact(agent.mission),
      whyNow: redact(agent.whyNow),
      trigger: redact(agent.trigger),
      inputs: agent.inputs.map(redact),
      tools: agent.tools.map(redact),
      workflow: agent.workflow.map(redact),
      humanControl: redact(agent.humanControl),
      expectedImpact: redact(agent.expectedImpact),
      benchmarkPattern: redact(agent.benchmarkPattern),
      process: redact(agent.process),
      companySignal: redact(agent.companySignal),
      conversationStarters: agent.conversationStarters?.map(redact),
    })),
  };
}

function isAgentBlueprintAgent(value: unknown): value is AgentBlueprintAgent {
  if (!value || typeof value !== "object") return false;
  const agent = value as Partial<AgentBlueprintAgent>;
  return (
    typeof agent.id === "string" &&
    typeof agent.name === "string" &&
    AGENT_TIERS.includes(agent.tier as AgentTier) &&
    typeof agent.mission === "string" &&
    typeof agent.whyNow === "string" &&
    typeof agent.trigger === "string" &&
    Array.isArray(agent.inputs) &&
    agent.inputs.every((item) => typeof item === "string") &&
    Array.isArray(agent.tools) &&
    agent.tools.every((item) => typeof item === "string") &&
    Array.isArray(agent.workflow) &&
    agent.workflow.every((item) => typeof item === "string") &&
    typeof agent.humanControl === "string" &&
    typeof agent.expectedImpact === "string" &&
    Boolean(agent.weeklyHoursSaved) &&
    typeof agent.weeklyHoursSaved?.min === "number" &&
    typeof agent.weeklyHoursSaved?.max === "number" &&
    agent.weeklyHoursSaved.min >= 0 &&
    agent.weeklyHoursSaved.max >= agent.weeklyHoursSaved.min &&
    ["Low", "Medium", "High"].includes(agent.effort ?? "") &&
    typeof agent.benchmarkPattern === "string" &&
    typeof agent.process === "string" &&
    typeof agent.companySignal === "string" &&
    (agent.conversationStarters === undefined ||
      (Array.isArray(agent.conversationStarters) &&
        agent.conversationStarters.every((item) => typeof item === "string")))
  );
}
