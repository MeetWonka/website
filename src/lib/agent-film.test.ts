import assert from "node:assert/strict";
import test from "node:test";
import type { AgentBlueprintAgent } from "@/lib/agent-blueprint";
import { agentFilmTimeline, buildAgentFilmSpec } from "@/lib/agent-film";

const agent: AgentBlueprintAgent = {
  id: "agent-1",
  name: "Tender response drafter",
  tier: "Human in the loop",
  mission: "Drafts tender answers from past bids.",
  whyNow: "Tender volume doubled this year.",
  trigger: "New tender published on the portal",
  inputs: ["Tender file"],
  tools: ["SharePoint", "Outlook", "Odoo ERP"],
  workflow: ["Read the tender file", "Find similar bids", "Draft the answer"],
  humanControl: "Bid manager approves before sending",
  expectedImpact: "Answers drafted in 2 hours",
  weeklyHoursSaved: { min: 6, max: 10 },
  effort: "Medium",
  benchmarkPattern: "Bid drafting from past answers",
  process: "Tender response",
  companySignal: "Your site lists public tenders.",
  conversationStarters: ["Summarise this tender", "Find past bids", "Draft section 3"],
};

test("falls back to the workflow when the agent has no demo script", () => {
  const spec = buildAgentFilmSpec(agent, "fr");
  assert.equal(spec.start.kind, "event");
  assert.equal(spec.start.text, agent.trigger);
  assert.deepEqual(
    spec.steps.map((step) => step.action),
    agent.workflow,
  );
  assert.equal(spec.deliverable.title, agent.expectedImpact);
  assert.equal(spec.labels.action, "Valider");
});

test("uses the demo script and maps each step to its connector", () => {
  const spec = buildAgentFilmSpec(
    {
      ...agent,
      tier: "Copilot",
      demo: {
        request: "Prepare the answer for the Lille tender",
        steps: [
          { action: "Read the tender file", tool: "SharePoint", finding: "42 requirements found" },
          { action: "Check stock prices", tool: "Odoo ERP", finding: "12 items priced" },
          { action: "Draft the answer", tool: "Outlook", finding: "Draft ready" },
        ],
        deliverable: {
          kind: "Draft answer",
          title: "Two requirements need a site visit",
          sections: [
            { heading: "Scope", body: "Three sites, two phases." },
            { heading: "Risks", body: "Delivery date is tight." },
          ],
        },
      },
    },
    "en",
  );
  assert.equal(spec.start.kind, "message");
  assert.equal(spec.start.text, "Prepare the answer for the Lille tender");
  assert.deepEqual(
    spec.steps.map((step) => step.tool.name),
    ["SharePoint", "Odoo ERP", "Outlook"],
  );
  assert.equal(spec.labels.action, "Use this draft");
});

test("timeline scenes are contiguous and grow with the script", () => {
  const short = agentFilmTimeline(buildAgentFilmSpec(agent, "en"));
  const scenes = Object.values(short.scenes);
  scenes.forEach((scene, index) => {
    if (index > 0) {
      const previous = scenes[index - 1];
      assert.equal(scene.from, previous.from + previous.duration);
    }
  });
  const last = scenes[scenes.length - 1];
  assert.equal(short.total, last.from + last.duration);
  assert.equal(short.stepStarts.length, agent.workflow.length);

  const longer = agentFilmTimeline(
    buildAgentFilmSpec({ ...agent, workflow: [...agent.workflow, "Send it"] }, "en"),
  );
  assert.ok(longer.total > short.total);
});
