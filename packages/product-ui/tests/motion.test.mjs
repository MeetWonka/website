import { test } from "node:test";
import assert from "node:assert/strict";
import {
  clampFrame,
  resolveCaptureFrame,
  captureScenarios,
} from "../src/motion.ts";
import {
  agentFromTemplate,
  connectors,
  templates,
} from "../../../apps/wonkachat-lab/src/product/fixtures.ts";

test("capture inputs clamp invalid and out-of-range frames", () => {
  assert.equal(clampFrame(NaN), 0);
  assert.equal(clampFrame(-10), 0);
  assert.equal(clampFrame(Infinity), 0);
  assert.equal(clampFrame(999), 150);
  assert.equal(clampFrame(75.9), 75);
});
test("every capture has reproducible monotonic progress and reaches its final state", () => {
  for (const scenario of captureScenarios) {
    let previous = 0;
    for (let frame = 0; frame <= 150; frame++) {
      const result = resolveCaptureFrame(scenario, frame);
      assert.deepEqual(result, resolveCaptureFrame(scenario, frame));
      assert.ok(
        result.promptProgress >= previous && result.promptProgress <= 1,
      );
      previous = result.promptProgress;
    }
    const final = resolveCaptureFrame(scenario, 150);
    assert.equal(final.completedSteps, 3);
    assert.equal(final.save, "saved");
    assert.equal(final.connection, "connected");
    assert.equal(final.phase, "after");
  }
});
test("public templates keep their instructions and all connector selections can be resolved", () => {
  assert.equal(templates.length, 70);
  assert.equal(new Set(templates.map((t) => t.id)).size, 70);
  for (const template of templates) {
    const agent = agentFromTemplate(template, template.id);
    assert.ok(agent.instructions.length > 0, template.name);
    assert.equal(agent.instructions, template.instructions);
    for (const tool of agent.tools)
      assert.ok(
        connectors.some((c) => c.id === tool),
        `${template.name}: ${tool}`,
      );
  }
});
