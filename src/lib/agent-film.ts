import type { Locale } from "@/i18n/config";
import type { AgentBlueprintAgent, AgentTier } from "@/lib/agent-blueprint";
import { blueprintText as t } from "@/lib/agent-blueprint-copy";
import {
  type ConnectedTool,
  resolveConnectedTools,
} from "@/lib/agent-blueprint-tools";

export const AGENT_FILM_FPS = 30;
export const AGENT_FILM_WIDTH = 1280;
export const AGENT_FILM_HEIGHT = 720;

/** Everything the demo film shows, resolved from one blueprint agent. */
export interface AgentFilmSpec {
  locale: Locale;
  agentName: string;
  tier: AgentTier;
  mission: string;
  trigger: string;
  /** Copilots start from a typed message, the other tiers from an event. */
  start: { kind: "message" | "event"; text: string; tool: ConnectedTool };
  tools: ConnectedTool[];
  steps: Array<{ action: string; tool: ConnectedTool; finding: string }>;
  deliverable: {
    kind: string;
    title: string;
    sections: Array<{ heading: string; body: string }>;
  };
  humanControl: string;
  hours: { min: number; max: number };
  labels: AgentFilmLabels;
}

export interface AgentFilmLabels {
  tier: string;
  demoData: string;
  newEvent: string;
  running: string;
  done: string;
  humanCheck: string;
  action: string;
  actionDone: string;
  hours: string;
  builtWith: string;
  composerPlaceholder: string;
  connectedApps: string;
}

const ACTION_LABEL: Record<AgentTier, [string, string]> = {
  Copilot: ["Use this draft", "Draft inserted"],
  "Human in the loop": ["Approve", "Approved"],
  "Fully autonomous": ["Run on schedule", "Scheduled"],
};

export function buildAgentFilmSpec(
  agent: AgentBlueprintAgent,
  locale: Locale,
): AgentFilmSpec {
  const tools = resolveConnectedTools(agent.tools);
  const toolFor = (name: string, index: number) =>
    resolveConnectedTools([name])[0] ?? tools[index % tools.length];
  const demo = agent.demo;

  const steps = demo
    ? demo.steps.map((step, index) => ({
        action: step.action,
        tool: toolFor(step.tool, index),
        finding: step.finding,
      }))
    : agent.workflow.map((step, index) => ({
        action: step,
        tool: tools[index % tools.length],
        finding: "",
      }));

  const kind = agent.tier === "Copilot" ? "message" : "event";
  const [action, actionDone] = ACTION_LABEL[agent.tier];

  return {
    locale,
    agentName: agent.name,
    tier: agent.tier,
    mission: agent.mission,
    trigger: agent.trigger,
    start: {
      kind,
      text:
        demo?.request ??
        (kind === "message"
          ? (agent.conversationStarters?.[0] ?? agent.trigger)
          : agent.trigger),
      tool: steps[0]?.tool ?? tools[0],
    },
    tools,
    steps,
    deliverable: demo?.deliverable ?? {
      kind: t(locale, "Outcome"),
      title: agent.expectedImpact,
      sections: [],
    },
    humanControl: agent.humanControl,
    hours: agent.weeklyHoursSaved,
    labels: {
      tier: t(locale, agent.tier),
      demoData: t(locale, "Demo data"),
      newEvent: t(locale, "New event"),
      running: t(locale, "Running"),
      done: t(locale, "Done"),
      humanCheck: t(locale, "Human check"),
      action: t(locale, action),
      actionDone: t(locale, actionDone),
      hours: t(locale, "estimated hours saved every week"),
      builtWith: t(locale, "Built and run in WonkaChat"),
      composerPlaceholder: t(locale, "Ask Wonka"),
      connectedApps: t(locale, "{count} integrations connected").replace(
        "{count}",
        String(tools.length),
      ),
    },
  };
}

export type FilmScene =
  | "intro"
  | "start"
  | "steps"
  | "deliverable"
  | "approval"
  | "outro";

export interface FilmTimeline {
  scenes: Record<FilmScene, { from: number; duration: number }>;
  /** Frame at which each tool call starts running. */
  stepStarts: number[];
  stepDuration: number;
  total: number;
}

const SCENE_FRAMES = {
  intro: 75,
  start: 90,
  stepEach: 42,
  deliverableBase: 66,
  deliverableSection: 24,
  approval: 84,
  outro: 96,
} as const;

/** Frame layout of the film. Pure, so the Player and tests agree on it. */
export function agentFilmTimeline(
  spec: Pick<AgentFilmSpec, "steps" | "deliverable">,
): FilmTimeline {
  const durations: Record<FilmScene, number> = {
    intro: SCENE_FRAMES.intro,
    start: SCENE_FRAMES.start,
    steps: Math.max(1, spec.steps.length) * SCENE_FRAMES.stepEach + 12,
    deliverable:
      SCENE_FRAMES.deliverableBase +
      spec.deliverable.sections.length * SCENE_FRAMES.deliverableSection,
    approval: SCENE_FRAMES.approval,
    outro: SCENE_FRAMES.outro,
  };

  let cursor = 0;
  const scenes = {} as FilmTimeline["scenes"];
  for (const scene of Object.keys(durations) as FilmScene[]) {
    scenes[scene] = { from: cursor, duration: durations[scene] };
    cursor += durations[scene];
  }

  return {
    scenes,
    stepStarts: spec.steps.map(
      (_, index) => scenes.steps.from + index * SCENE_FRAMES.stepEach,
    ),
    stepDuration: SCENE_FRAMES.stepEach,
    total: cursor,
  };
}
