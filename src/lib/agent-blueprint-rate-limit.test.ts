import assert from "node:assert/strict";
import test from "node:test";
import type { SanityClient } from "next-sanity";
import { isAgentBlueprintRateLimited } from "@/lib/agent-blueprint-rate-limit";

function clientWithRecentStatuses(statuses: string[]): SanityClient {
  return {
    fetch: async (query: string) => {
      const countsOnlyActiveAttempts = query.includes(
        'status in ["processing", "completed"]',
      );
      return countsOnlyActiveAttempts
        ? statuses.filter(
            (status) => status === "processing" || status === "completed",
          ).length
        : statuses.length;
    },
  } as unknown as SanityClient;
}

test("failed generations do not consume the blueprint quota", async () => {
  const client = clientWithRecentStatuses([
    "failed",
    "failed",
    "failed",
    "failed",
    "failed",
  ]);

  assert.equal(await isAgentBlueprintRateLimited(client, "203.0.113.1"), false);
});

test("nine active or completed generations remain below the blueprint quota", async () => {
  const client = clientWithRecentStatuses([
    "completed",
    "processing",
    "completed",
    "processing",
    "completed",
    "processing",
    "completed",
    "processing",
    "completed",
  ]);

  assert.equal(await isAgentBlueprintRateLimited(client, "203.0.113.1"), false);
});

test("ten active or completed generations exhaust the blueprint quota", async () => {
  const client = clientWithRecentStatuses([
    "completed",
    "processing",
    "completed",
    "processing",
    "completed",
    "processing",
    "completed",
    "processing",
    "completed",
    "processing",
  ]);

  assert.equal(await isAgentBlueprintRateLimited(client, "203.0.113.1"), true);
});
