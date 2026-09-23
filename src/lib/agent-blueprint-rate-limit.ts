import type { SanityClient } from "next-sanity";

export const AGENT_BLUEPRINT_RATE_LIMIT_MAX = 10;
export const AGENT_BLUEPRINT_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

export async function isAgentBlueprintRateLimited(
  client: SanityClient,
  clientIp: string,
): Promise<boolean> {
  const since = new Date(
    Date.now() - AGENT_BLUEPRINT_RATE_LIMIT_WINDOW_MS,
  ).toISOString();
  const count = await client.fetch<number>(
    `count(*[
      _type == "agentBlueprintAssessment"
      && clientIp == $clientIp
      && submittedAt > $since
      && status in ["processing", "completed"]
    ])`,
    { clientIp, since },
  );

  return count >= AGENT_BLUEPRINT_RATE_LIMIT_MAX;
}
