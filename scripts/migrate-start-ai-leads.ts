/**
 * Migrate legacy startAiLead documents to siteLead.
 *
 * Usage:
 *   bun run scripts/migrate-start-ai-leads.ts
 *   bun run scripts/migrate-start-ai-leads.ts --dry-run
 *
 * Requires SANITY_API_WRITE_TOKEN in .env (Editor token).
 */

import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env");
try {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    const val = t.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
} catch {}

const dryRun = process.argv.includes("--dry-run");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-03-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

interface LegacyLead {
  _id: string;
  email?: string;
  submittedAt?: string;
  source?: string;
}

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Missing SANITY_API_WRITE_TOKEN.");
    process.exit(1);
  }

  const legacyLeads = await client.fetch<LegacyLead[]>(
    `*[_type == "startAiLead"]{ _id, email, submittedAt, source }`,
  );

  if (legacyLeads.length === 0) {
    console.log("No legacy startAiLead documents found.");
    return;
  }

  console.log(`Found ${legacyLeads.length} legacy lead(s) to migrate.${dryRun ? " (dry run)" : ""}`);

  for (const lead of legacyLeads) {
    const nextDoc = {
      _id: lead._id,
      _type: "siteLead" as const,
      email: lead.email,
      submittedAt: lead.submittedAt ?? new Date().toISOString(),
      source: lead.source ?? "start-ai-hero",
    };

    console.log(`- ${lead._id} → siteLead (${nextDoc.email})`);

    if (!dryRun) {
      await client.createOrReplace(nextDoc);
    }
  }

  console.log(dryRun ? "Dry run complete." : "Migration complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
