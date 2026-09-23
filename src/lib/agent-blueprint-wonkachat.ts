import type { AgentBlueprintAgent } from "@/lib/agent-blueprint";
import { resolveConnectedTools } from "@/lib/agent-blueprint-tools";

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

function schedulingFor(agent: AgentBlueprintAgent): string {
  switch (agent.tier) {
    case "Fully autonomous":
      return `Schedule (Cron): Weekdays at 08:00. Prompt: "${agent.workflow[0] ?? agent.mission}"`;
    case "Human in the loop":
      return `External event: ${agent.trigger}. Prompt: "Handle this ${agent.process.toLowerCase()} request: {{trigger data}}"`;
    default:
      return "None. Used directly in chat.";
  }
}

function fallbackStarters(agent: AgentBlueprintAgent): string[] {
  return [
    agent.workflow[0] ?? agent.mission,
    `Help me with ${agent.process.toLowerCase()}`,
    "What do you need from me to start?",
  ];
}

export function buildWonkaChatSetup(
  agent: AgentBlueprintAgent,
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
      : fallbackStarters(agent)
  ).map((starter) => truncate(starter, 80));

  const instructions = [
    `You are "${agent.name}", a ${TIER_PHRASE[agent.tier]} AI agent for our ${agent.process.toLowerCase()} process.`,
    "",
    `Mission: ${agent.mission}`,
    `Trigger: ${agent.trigger}`,
    agent.inputs.length ? `Inputs: ${agent.inputs.join(", ")}` : null,
    "",
    "How you work:",
    ...agent.workflow.map((step, index) => `${index + 1}. ${step}`),
    "",
    `Human control: ${agent.humanControl}`,
    connectors.length ? `Use these connectors: ${connectors.join(", ")}` : null,
    `Expected outcome: ${agent.expectedImpact}`,
    "",
    "Rules:",
    "- Only use information from the connected tools and the files you are given.",
    "- If information is missing or uncertain, say so and ask instead of guessing.",
    "- Before sending, publishing or changing anything, show a draft and ask for confirmation.",
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
    scheduling: schedulingFor(agent),
    conversationStarters: starters,
    instructions,
  };
}

/** Plain-text setup to paste into WonkaChat's "Create new agent" wizard. */
export function formatWonkaChatSetup(setup: WonkaChatSetup): string {
  return [
    "Create a WonkaChat agent with this setup.",
    "",
    `Name: ${setup.name}`,
    `Description: ${setup.description}`,
    `Model: ${setup.model}`,
    `Connectors: ${setup.connectors.length ? setup.connectors.join(", ") : "None"}`,
    setup.unsupportedTools.length
      ? `Not available as a connector (connect separately): ${setup.unsupportedTools.join(", ")}`
      : null,
    `Capabilities: ${setup.capabilities.join(", ")}`,
    `Scheduling: ${setup.scheduling}`,
    "Conversation starters:",
    ...setup.conversationStarters.map((starter) => `- ${starter}`),
    "",
    "Instructions:",
    setup.instructions,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}
