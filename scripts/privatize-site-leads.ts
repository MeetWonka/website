/**
 * Move lead documents out of the public part of the dataset.
 *
 * The production dataset is public: any document whose _id has no dot can be
 * read by anyone through the Sanity API. Leads hold personal data, so each one
 * is copied to `site-lead.<old id>` (a private path, readable with a token
 * only) and the public original is deleted in the same transaction.
 *
 * Usage:
 *   bun run scripts/privatize-site-leads.ts            # dry run
 *   bun run scripts/privatize-site-leads.ts --apply
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local or .env (Editor token).
 * Safe to run again: only leads still outside a private path are moved.
 */

import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { resolve } from "path";

for (const file of [".env.local", ".env"]) {
  try {
    for (const line of readFileSync(resolve(process.cwd(), file), "utf-8").split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      const key = t.slice(0, eq).trim();
      const val = t.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {}
}

const apply = process.argv.includes("--apply");
const PRIVATE_PREFIX = "site-lead.";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-03-01",
  useCdn: false,
  perspective: "raw",
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const anonymous = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-03-01",
  useCdn: false,
});

const LEAD_TYPES = ["siteLead", "startAiLead"];

async function publicLeadCount() {
  return anonymous.fetch<number>(`count(*[_type in $types])`, { types: LEAD_TYPES });
}

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Missing SANITY_API_WRITE_TOKEN.");
    process.exit(1);
  }

  // path("*") = ids without a dot (public); path("drafts.*") = their drafts.
  const exposed = await client.fetch<Array<Record<string, unknown> & { _id: string; _type: string }>>(
    `*[_type in $types && _id in path("*")]`,
    { types: LEAD_TYPES },
  );
  const drafts = await client.fetch<string[]>(
    `*[_type in $types && _id in path("drafts.*")]._id`,
    { types: LEAD_TYPES },
  );

  console.log(`Publicly readable leads before: ${await publicLeadCount()}`);
  console.log(
    `${exposed.length} lead(s) to move, ${drafts.length} public-path draft(s) to delete.${apply ? "" : " (dry run)"}`,
  );

  for (const lead of exposed) {
    // System fields are set by Sanity on the new document.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, _rev, _createdAt, _updatedAt, ...fields } = lead;
    const nextId = `${PRIVATE_PREFIX}${_id}`;
    console.log(`- ${lead._type} ${_id} → ${nextId}`);

    // Without --apply, Sanity still validates the transaction but writes nothing.
    await client
      .transaction()
      .createIfNotExists({ ...fields, _id: nextId, _type: lead._type })
      .delete(_id)
      .commit({ dryRun: !apply });
  }

  for (const draftId of drafts) {
    console.log(`- delete draft ${draftId}`);
    if (apply) await client.delete(draftId);
  }

  if (apply) {
    console.log(`Publicly readable leads after: ${await publicLeadCount()}`);
  }
  console.log(apply ? "Done." : "Dry run complete. Re-run with --apply to write.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
