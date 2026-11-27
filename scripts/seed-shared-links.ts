import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { resolve } from "path";
import { DEFAULT_MEETING_URLS } from "../src/lib/shared-links-defaults";

const envPath = resolve(process.cwd(), ".env");
for (const line of readFileSync(envPath, "utf-8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  const key = trimmed.slice(0, eq).trim();
  const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
  if (!process.env[key]) process.env[key] = val;
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-03-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function seed() {
  const result = await client
    .patch("siteSettings")
    .setIfMissing({ sharedLinks: {} })
    .set({
      "sharedLinks.meetingUrl": DEFAULT_MEETING_URLS.team,
      "sharedLinks.startAiMeetingUrl": DEFAULT_MEETING_URLS.startAi,
      "sharedLinks.wonkaBuildMeetingUrl": DEFAULT_MEETING_URLS.wonkaBuild,
      "sharedLinks.wonkaChatMeetingUrl": DEFAULT_MEETING_URLS.wonkaChat,
    })
    .commit();

  console.log("✅ Shared booking URLs updated in siteSettings:", result._id);
}

seed().catch(console.error);
