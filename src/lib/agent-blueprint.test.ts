import assert from "node:assert/strict";
import test from "node:test";
import { normalizeTarget } from "@/lib/agent-blueprint";

test("normalizes a company website", () => {
  assert.deepEqual(normalizeTarget("https://www.example.com/about"), {
    domain: "example.com",
    website: "https://example.com",
  });
});

test("rejects an email address", () => {
  assert.equal(normalizeTarget("person@example.com"), null);
});
