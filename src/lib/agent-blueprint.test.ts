import assert from "node:assert/strict";
import test from "node:test";
import {
  companyPlaceholder,
  dedupeAgents,
  isAgentBlueprintResult,
  normalizeTarget,
  redactText,
  type AgentBlueprintAgent,
} from "@/lib/agent-blueprint";

function agent(overrides: Partial<AgentBlueprintAgent>): AgentBlueprintAgent {
  return {
    id: "agent",
    name: "Agent",
    tier: "Copilot",
    mission: "Mission",
    whyNow: "Now",
    trigger: "Trigger",
    inputs: [],
    tools: [],
    workflow: [],
    humanControl: "Review",
    expectedImpact: "Impact",
    weeklyHoursSaved: { min: 1, max: 2 },
    effort: "Low",
    benchmarkPattern: "Pattern",
    process: "Process",
    companySignal: "Signal",
    ...overrides,
  };
}

test("normalizes a company website", () => {
  assert.deepEqual(normalizeTarget("https://www.example.com/about"), {
    domain: "example.com",
    website: "https://example.com",
  });
});

test("rejects an email address", () => {
  assert.equal(normalizeTarget("person@example.com"), null);
});

test("redacts company names in the output language", () => {
  assert.equal(
    redactText("Plus de 150 parcours Acme Acme", ["Acme"], companyPlaceholder("fr")),
    "Plus de 150 parcours l’entreprise",
  );
  assert.equal(redactText("Acme ships", ["Acme"]), "the company ships");
});

test("drops agents that repeat the same process", () => {
  const quotes = agent({
    id: "a",
    name: "Assistant devis menuiserie",
    mission: "Prépare les devis de menuiserie à partir des plans clients.",
    process: "Chiffrage des devis de menuiserie sur mesure",
  });
  const sameProcess = agent({
    id: "b",
    tier: "Fully autonomous",
    name: "Agent chiffrage automatique",
    mission: "Chiffre automatiquement les demandes de devis entrantes.",
    process: "Chiffrage des devis de menuiserie sur mesure",
  });
  const renamedClone = agent({
    id: "c",
    tier: "Human in the loop",
    name: "Copilote devis menuiserie",
    mission: "Prépare les devis de menuiserie à partir des plans clients reçus.",
    process: "Réponse aux demandes clients",
  });
  const planning = agent({
    id: "d",
    name: "Planificateur de chantiers",
    mission: "Planifie les poses et prévient les équipes terrain.",
    process: "Planification des poses chez les particuliers",
  });

  assert.deepEqual(
    dedupeAgents([quotes, sameProcess, renamedClone, planning]).map(
      (item) => item.id,
    ),
    ["a", "d"],
  );
});

test("accepts a blueprint with a single agent", () => {
  const result = {
    sector: "Menuiserie",
    headline: "Headline",
    summary: "Summary",
    signals: ["Signal"],
  };
  assert.equal(isAgentBlueprintResult({ ...result, agents: [agent({})] }), true);
  assert.equal(isAgentBlueprintResult({ ...result, agents: [] }), false);
  assert.equal(
    isAgentBlueprintResult({
      ...result,
      agents: [agent({}), agent({}), agent({}), agent({})],
    }),
    false,
  );
});
