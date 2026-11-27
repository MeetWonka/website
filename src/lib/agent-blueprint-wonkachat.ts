import type {
  AgentBlueprintAgent,
  AgentBlueprintResult,
} from "@/lib/agent-blueprint";
import { resolveConnectedTools } from "@/lib/agent-blueprint-tools";
import type { Locale } from "@/i18n/config";

/** Every agent is set up on the same WonkaChat model. */
export const WONKACHAT_MODEL = "GPT-5.6 Luna";

/** WonkaChat's agent description field is capped at 300 characters. */
const DESCRIPTION_MAX_LENGTH = 300;

/**
 * Blueprint tool names → WonkaChat connector names, as listed under
 * Tools → Connectors. Tools without a native connector map to null.
 */
const CONNECTORS: Record<string, string | null> = {
  Airtable: "Airtable",
  Asana: "Asana",
  "Azure AI": null,
  Box: "Box",
  Confluence: "Confluence",
  "Dynamics 365": "Dynamics 365",
  GitHub: "GitHub",
  "Google Drive": "Google Drive",
  HubSpot: "HubSpot",
  Jira: "Jira",
  "Microsoft Teams": "Microsoft Teams",
  Notion: "Notion",
  "Odoo ERP": "Odoo",
  OneDrive: "OneDrive",
  Outlook: "Outlook Mail",
  Salesforce: "Salesforce",
  SAP: null,
  SharePoint: "SharePoint",
  Slack: "Slack",
};

const TIER_PHRASE: Record<AgentBlueprintAgent["tier"], string> = {
  Copilot: "copilot",
  "Human in the loop": "human-in-the-loop",
  "Fully autonomous": "fully autonomous",
};

export interface WonkaChatSetup {
  name: string;
  description: string;
  model: string;
  connectors: string[];
  /** Tools from the blueprint that have no native WonkaChat connector. */
  unsupportedTools: string[];
  capabilities: string[];
  scheduling: string;
  conversationStarters: string[];
  instructions: string;
}

function truncate(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;
}

/** Prompt sent on each scheduled run of a fully autonomous agent. */
function schedulePromptFor(agent: AgentBlueprintAgent): string {
  return agent.workflow[0] ?? agent.mission;
}

/** Prompt sent when the external event of a human-in-the-loop agent fires. */
function triggerPromptFor(agent: AgentBlueprintAgent, locale: Locale): string {
  const process = agent.process.toLowerCase();
  if (locale === "fr") return `Traite cette demande liée à ${process} : {{trigger data}}`;
  if (locale === "nl") return `Verwerk deze aanvraag voor ${process}: {{trigger data}}`;
  return `Handle this ${process} request: {{trigger data}}`;
}

function schedulingFor(agent: AgentBlueprintAgent, locale: Locale): string {
  const prompt = schedulePromptFor(agent);
  switch (agent.tier) {
    case "Fully autonomous":
      if (locale === "fr") return `Planification (Cron) : en semaine à 08 h. Consigne : « ${prompt} »`;
      if (locale === "nl") return `Planning (Cron): weekdagen om 08.00 uur. Prompt: “${prompt}”`;
      return `Schedule (Cron): Weekdays at 08:00. Prompt: "${prompt}"`;
    case "Human in the loop":
      if (locale === "fr") return `Événement externe : ${agent.trigger}. Consigne : « ${triggerPromptFor(agent, locale)} »`;
      if (locale === "nl") return `Externe gebeurtenis: ${agent.trigger}. Prompt: “${triggerPromptFor(agent, locale)}”`;
      return `External event: ${agent.trigger}. Prompt: "${triggerPromptFor(agent, locale)}"`;
    default:
      return locale === "fr" ? "Aucune. Utilisé directement dans le chat." : locale === "nl" ? "Geen. Rechtstreeks in de chat gebruiken." : "None. Used directly in chat.";
  }
}

function fallbackStarters(agent: AgentBlueprintAgent, locale: Locale): string[] {
  if (locale === "fr") return [agent.workflow[0] ?? agent.mission, `Aide-moi pour ${agent.process.toLowerCase()}`, "De quoi as-tu besoin pour commencer ?"];
  if (locale === "nl") return [agent.workflow[0] ?? agent.mission, `Help me met ${agent.process.toLowerCase()}`, "Wat heb je nodig om te beginnen?"];
  return [
    agent.workflow[0] ?? agent.mission,
    `Help me with ${agent.process.toLowerCase()}`,
    "What do you need from me to start?",
  ];
}

export function buildWonkaChatSetup(
  agent: AgentBlueprintAgent,
  locale: Locale = "en",
): WonkaChatSetup {
  const tools = resolveConnectedTools(agent.tools);
  const connectors = Array.from(
    new Set(
      tools.flatMap((tool) => {
        const connector = CONNECTORS[tool.name];
        return connector ? [connector] : [];
      }),
    ),
  );
  const unsupportedTools = tools
    .filter((tool) => !CONNECTORS[tool.name])
    .map((tool) => tool.name);

  const capabilities = [
    "File Search",
    ...(agent.tier === "Human in the loop" ? ["Questions"] : []),
  ];

  const starters = (
    agent.conversationStarters?.length === 3
      ? agent.conversationStarters
      : fallbackStarters(agent, locale)
  ).map((starter) => truncate(starter, 80));

  const tierPhrase = locale === "fr"
    ? { Copilot: "copilote", "Human in the loop": "avec validation humaine", "Fully autonomous": "autonome" }[agent.tier]
    : locale === "nl"
      ? { Copilot: "copiloot", "Human in the loop": "met menselijke controle", "Fully autonomous": "autonoom" }[agent.tier]
      : TIER_PHRASE[agent.tier];
  const instructions = [
    locale === "fr"
      ? `Tu es « ${agent.name} », un agent IA ${tierPhrase} pour le processus ${agent.process.toLowerCase()}.`
      : locale === "nl"
        ? `Je bent “${agent.name}”, een ${tierPhrase} AI-agent voor het proces ${agent.process.toLowerCase()}.`
        : `You are "${agent.name}", a ${tierPhrase} AI agent for our ${agent.process.toLowerCase()} process.`,
    "",
    `${locale === "fr" ? "Mission" : locale === "nl" ? "Opdracht" : "Mission"} : ${agent.mission}`,
    `${locale === "fr" ? "Déclencheur" : locale === "nl" ? "Trigger" : "Trigger"} : ${agent.trigger}`,
    agent.inputs.length ? `${locale === "fr" ? "Données d’entrée" : locale === "nl" ? "Invoer" : "Inputs"} : ${agent.inputs.join(", ")}` : null,
    "",
    locale === "fr" ? "Fonctionnement :" : locale === "nl" ? "Werkwijze:" : "How you work:",
    ...agent.workflow.map((step, index) => `${index + 1}. ${step}`),
    "",
    `${locale === "fr" ? "Validation humaine" : locale === "nl" ? "Menselijke controle" : "Human control"} : ${agent.humanControl}`,
    connectors.length ? `${locale === "fr" ? "Connecteurs à utiliser" : locale === "nl" ? "Te gebruiken koppelingen" : "Use these connectors"} : ${connectors.join(", ")}` : null,
    `${locale === "fr" ? "Résultat attendu" : locale === "nl" ? "Verwacht resultaat" : "Expected outcome"} : ${agent.expectedImpact}`,
    "",
    locale === "fr" ? "Règles :" : locale === "nl" ? "Regels:" : "Rules:",
    locale === "fr" ? "- Utilise uniquement les informations des outils connectés et des fichiers fournis." : locale === "nl" ? "- Gebruik alleen informatie uit gekoppelde tools en aangeleverde bestanden." : "- Only use information from the connected tools and the files you are given.",
    locale === "fr" ? "- Si une information manque ou reste incertaine, dis-le et pose une question au lieu de deviner." : locale === "nl" ? "- Ontbreekt informatie of is die onzeker, zeg dat dan en vraag door in plaats van te gokken." : "- If information is missing or uncertain, say so and ask instead of guessing.",
    locale === "fr" ? "- Avant d’envoyer, publier ou modifier quoi que ce soit, affiche un brouillon et demande confirmation." : locale === "nl" ? "- Toon een concept en vraag om bevestiging voordat je iets verzendt, publiceert of wijzigt." : "- Before sending, publishing or changing anything, show a draft and ask for confirmation.",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  return {
    name: agent.name,
    description: truncate(agent.mission, DESCRIPTION_MAX_LENGTH),
    model: WONKACHAT_MODEL,
    connectors,
    unsupportedTools,
    capabilities,
    scheduling: schedulingFor(agent, locale),
    conversationStarters: starters,
    instructions,
  };
}

/** Plain-text setup to paste into WonkaChat's "Create new agent" wizard. */
export function formatWonkaChatSetup(setup: WonkaChatSetup, locale: Locale = "en"): string {
  return [
    locale === "fr" ? "Créez un agent WonkaChat avec cette configuration." : locale === "nl" ? "Maak een WonkaChat-agent met deze configuratie." : "Create a WonkaChat agent with this setup.",
    "",
    `${locale === "fr" ? "Nom" : locale === "nl" ? "Naam" : "Name"} : ${setup.name}`,
    `${locale === "fr" ? "Description" : locale === "nl" ? "Beschrijving" : "Description"} : ${setup.description}`,
    `${locale === "fr" ? "Modèle" : locale === "nl" ? "Model" : "Model"} : ${setup.model}`,
    `${locale === "fr" ? "Connecteurs" : locale === "nl" ? "Koppelingen" : "Connectors"} : ${setup.connectors.length ? setup.connectors.join(", ") : locale === "fr" ? "Aucun" : locale === "nl" ? "Geen" : "None"}`,
    setup.unsupportedTools.length
      ? `${locale === "fr" ? "Non disponible comme connecteur (à connecter séparément)" : locale === "nl" ? "Niet beschikbaar als koppeling (apart verbinden)" : "Not available as a connector (connect separately)"} : ${setup.unsupportedTools.join(", ")}`
      : null,
    `${locale === "fr" ? "Capacités" : locale === "nl" ? "Mogelijkheden" : "Capabilities"} : ${setup.capabilities.join(", ")}`,
    `${locale === "fr" ? "Planification" : locale === "nl" ? "Planning" : "Scheduling"} : ${setup.scheduling}`,
    locale === "fr" ? "Exemples de demandes :" : locale === "nl" ? "Voorbeelden van prompts:" : "Conversation starters:",
    ...setup.conversationStarters.map((starter) => `- ${starter}`),
    "",
    locale === "fr" ? "Instructions :" : locale === "nl" ? "Instructies:" : "Instructions:",
    setup.instructions,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

/**
 * Days an export stays importable after the blueprint completed. Ids are capability URLs that can
 * leak (logs, analytics, shared links), so they should not be readable forever.
 */
export const WONKACHAT_EXPORT_TTL_DAYS = 30;

export function isWonkaChatExportExpired(
  completedAt: string | undefined,
  now: Date = new Date(),
): boolean {
  const completed = completedAt ? Date.parse(completedAt) : Number.NaN;
  if (Number.isNaN(completed)) return true;
  return now.getTime() - completed > WONKACHAT_EXPORT_TTL_DAYS * 24 * 60 * 60 * 1000;
}

const MARKDOWN_LINK = /!?\[([^\]]*)\]\([^)]*\)/g;
const URL_LIKE = /\b(?:https?:\/\/|www\.)[^\s<>"')]+/gi;
const EMAIL_LIKE = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
const STEP_MAX_LENGTH = 300;

/**
 * Blueprint text comes from an LLM reading a crawled website, which anyone can point at a site they
 * control. Before it becomes an agent's instructions or an unattended prompt in WonkaChat, drop the
 * pieces an injected instruction would need to exfiltrate data (links, URLs, email addresses) and cap
 * each field. WonkaChat also shows everything in a consent dialog; this is defense in depth.
 */
export function sanitizeImportText(value: string, max: number = STEP_MAX_LENGTH): string {
  const cleaned = value
    .replace(MARKDOWN_LINK, "$1")
    .replace(URL_LIKE, "")
    .replace(EMAIL_LIKE, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
  return truncate(cleaned, max);
}

function sanitizeAgentForImport(agent: AgentBlueprintAgent): AgentBlueprintAgent {
  const clean = (value: string) => sanitizeImportText(value);
  return {
    ...agent,
    name: clean(agent.name),
    mission: clean(agent.mission),
    whyNow: clean(agent.whyNow),
    trigger: clean(agent.trigger),
    inputs: agent.inputs.map(clean),
    workflow: agent.workflow.map(clean),
    humanControl: clean(agent.humanControl),
    expectedImpact: clean(agent.expectedImpact),
    process: clean(agent.process),
    companySignal: clean(agent.companySignal),
    conversationStarters: agent.conversationStarters?.map(clean),
  };
}

/** Version of the export payload read by WonkaChat's blueprint import. */
export const WONKACHAT_EXPORT_VERSION = 1;

const EXPORT_LIMITS = {
  agents: 3,
  name: 60,
  description: DESCRIPTION_MAX_LENGTH,
  instructions: 8000,
  starters: 4,
  starter: 80,
  prompt: 1000,
} as const;

export type WonkaChatCapability = "file_search" | "questions";

export interface WonkaChatExportAgent {
  key: string;
  name: string;
  description: string;
  instructions: string;
  tier: AgentBlueprintAgent["tier"];
  conversationStarters: string[];
  connectors: string[];
  capabilities: WonkaChatCapability[];
  schedule: { period: "weekdays"; time: string; prompt: string } | null;
  trigger: { event: string; prompt: string } | null;
}

export interface WonkaChatExport {
  version: typeof WONKACHAT_EXPORT_VERSION;
  blueprintId: string;
  locale: Locale;
  sector: string;
  headline: string;
  agents: WonkaChatExportAgent[];
}

/**
 * Structured payload WonkaChat reads to create the blueprint's agents in one
 * click (GET /api/agent-blueprint/[id]/wonkachat). Built from the anonymised
 * result, with the same mapping as the copy-paste setup.
 */
export function buildWonkaChatExport(
  result: Pick<AgentBlueprintResult, "sector" | "headline" | "agents">,
  assessmentId: string,
  locale: Locale = "en",
): WonkaChatExport {
  const usedKeys = new Set<string>();
  const agents = result.agents
    .slice(0, EXPORT_LIMITS.agents)
    .map((rawAgent, index): WonkaChatExportAgent => {
      const agent = sanitizeAgentForImport(rawAgent);
      const setup = buildWonkaChatSetup(agent, locale);
      let key = agent.id?.trim() || `agent-${index + 1}`;
      if (usedKeys.has(key)) key = `${key}-${index + 1}`;
      usedKeys.add(key);

      return {
        key,
        name: truncate(setup.name, EXPORT_LIMITS.name),
        description: setup.description,
        instructions: truncate(setup.instructions, EXPORT_LIMITS.instructions),
        tier: agent.tier,
        conversationStarters: setup.conversationStarters
          .slice(0, EXPORT_LIMITS.starters)
          .map((starter) => truncate(starter, EXPORT_LIMITS.starter)),
        connectors: setup.connectors,
        capabilities: [
          "file_search",
          ...(agent.tier === "Human in the loop" ? (["questions"] as const) : []),
        ],
        schedule:
          agent.tier === "Fully autonomous"
            ? {
                period: "weekdays",
                time: "08:00",
                prompt: truncate(schedulePromptFor(agent), EXPORT_LIMITS.prompt),
              }
            : null,
        trigger:
          agent.tier === "Human in the loop"
            ? {
                event: truncate(agent.trigger, EXPORT_LIMITS.prompt),
                prompt: truncate(triggerPromptFor(agent, locale), EXPORT_LIMITS.prompt),
              }
            : null,
      };
    });

  return {
    version: WONKACHAT_EXPORT_VERSION,
    blueprintId: assessmentId,
    locale,
    sector: sanitizeImportText(result.sector),
    headline: sanitizeImportText(result.headline),
    agents,
  };
}
