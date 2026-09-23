import assert from "node:assert/strict";
import test from "node:test";
import type { AgentBlueprintAgent } from "@/lib/agent-blueprint";
import {
  buildWonkaChatSetup,
  formatWonkaChatSetup,
  WONKACHAT_MODEL,
} from "@/lib/agent-blueprint-wonkachat";

const agent: AgentBlueprintAgent = {
  id: "agent-1",
  name: "Helpdesk answer drafter",
  tier: "Human in the loop",
  process: "Contractor helpdesk",
  mission: "Drafts answers to contractor questions from your standards.",
  whyNow: "Two adviser roles are open.",
  companySignal: "Your help center lists 300+ answers.",
  trigger: "New question in the helpdesk inbox",
  inputs: ["Question"],
  tools: ["Outlook", "SharePoint", "SAP"],
  workflow: ["Reads the question", "Finds standards", "Drafts a reply"],
  humanControl: "An adviser approves every reply",
  expectedImpact: "40% faster first reply",
  weeklyHoursSaved: { min: 8, max: 12 },
  effort: "Low",
  benchmarkPattern: "B",
  conversationStarters: ["Draft a reply", "Find the standard", "Summarise"],
};

test("always recommends the house model", () => {
  assert.equal(buildWonkaChatSetup(agent).model, WONKACHAT_MODEL);
  assert.equal(WONKACHAT_MODEL, "GPT-5.6 Luna");
});

test("maps tools to WonkaChat connector names and flags the rest", () => {
  const setup = buildWonkaChatSetup(agent);
  assert.deepEqual(setup.connectors, ["Outlook Mail", "SharePoint"]);
  assert.deepEqual(setup.unsupportedTools, ["SAP"]);
});

test("human-in-the-loop agents get an event trigger and Questions", () => {
  const setup = buildWonkaChatSetup(agent);
  assert.match(setup.scheduling, /^External event/);
  assert.ok(setup.capabilities.includes("Questions"));
});

test("autonomous agents run on a weekday schedule, copilots in chat", () => {
  assert.match(
    buildWonkaChatSetup({ ...agent, tier: "Fully autonomous" }).scheduling,
    /^Schedule \(Cron\): Weekdays/,
  );
  assert.match(
    buildWonkaChatSetup({ ...agent, tier: "Copilot" }).scheduling,
    /^None/,
  );
});

test("keeps the description within WonkaChat's 300-character limit", () => {
  const setup = buildWonkaChatSetup({ ...agent, mission: "x".repeat(400) });
  assert.ok(setup.description.length <= 300);
});

test("falls back to three starters when the model returned none", () => {
  const setup = buildWonkaChatSetup({
    ...agent,
    conversationStarters: undefined,
  });
  assert.equal(setup.conversationStarters.length, 3);
});

test("formats a pasteable setup", () => {
  const text = formatWonkaChatSetup(buildWonkaChatSetup(agent));
  assert.match(text, /Model: GPT-5\.6 Luna/);
  assert.match(text, /Connectors: Outlook Mail, SharePoint/);
  assert.match(text, /Instructions:\nYou are "Helpdesk answer drafter"/);
});
