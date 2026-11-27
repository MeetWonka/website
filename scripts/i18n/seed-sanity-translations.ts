/**
 * Seed FR/NL page singletons (`<id>-fr`, `<id>-nl`) from the JSON files in
 * `scripts/i18n/sanity-translations/`.
 *
 * Uses `createIfNotExists` in a single transaction: documents that already
 * exist (e.g. edited in the Studio) are never overwritten.
 *
 *   bun scripts/i18n/seed-sanity-translations.ts --dry-run
 *   bun scripts/i18n/seed-sanity-translations.ts
 *
 * Env: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * SANITY_API_WRITE_TOKEN (read from the environment, falling back to .env).
 */
import { createClient } from "next-sanity";
import { existsSync, readdirSync, readFileSync } from "fs";
import { join, resolve } from "path";

const DRY_RUN = process.argv.includes("--dry-run");
const DIR = resolve(import.meta.dirname ?? __dirname, "sanity-translations");

for (const file of [".env.local", ".env"]) {
  const envPath = resolve(process.cwd(), file);
  if (!existsSync(envPath)) continue;
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

type SanityDoc = { _id: string; _type: string; [key: string]: unknown };

const FILE_RE = /^[A-Za-z]+Content-(fr|nl)\.json$/;

function loadDocs(): SanityDoc[] {
  const files = readdirSync(DIR).filter((f) => FILE_RE.test(f)).sort();
  return files.map((file) => {
    const doc = JSON.parse(readFileSync(join(DIR, file), "utf-8")) as SanityDoc;
    const expectedId = file.replace(/\.json$/, "");
    if (doc._id !== expectedId) {
      throw new Error(`${file}: _id "${doc._id}" does not match file name`);
    }
    if (!doc._type) throw new Error(`${file}: missing _type`);
    for (const key of ["_rev", "_createdAt", "_updatedAt"]) {
      if (key in doc) throw new Error(`${file}: system field ${key} must be stripped`);
    }
    return doc;
  });
}

async function main() {
  const docs = loadDocs();
  if (docs.length === 0) throw new Error(`No translation files found in ${DIR}`);

  console.log(`${DRY_RUN ? "[dry-run] " : ""}createIfNotExists × ${docs.length}:`);
  for (const doc of docs) console.log(`  - ${doc._id} (${doc._type})`);

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (DRY_RUN) {
    console.log(`[dry-run] target: ${projectId ?? "<missing project id>"}/${dataset}. Nothing written.`);
    return;
  }

  if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
  if (!token) throw new Error("SANITY_API_WRITE_TOKEN is not set");

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-03-01",
    useCdn: false,
    token,
  });

  const existing = await client.fetch<string[]>(`*[_id in $ids]._id`, {
    ids: docs.map((d) => d._id),
  });

  const tx = client.transaction();
  for (const doc of docs) tx.createIfNotExists(doc);
  const result = await tx.commit({ visibility: "sync" });

  const skipped = new Set(existing);
  for (const doc of docs) {
    console.log(`  ${skipped.has(doc._id) ? "skipped (exists)" : "created"}: ${doc._id}`);
  }
  console.log(`Transaction ${result.transactionId} committed to ${projectId}/${dataset}.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
