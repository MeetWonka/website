import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { resolve } from "path";
import { CONTACT_DEFAULTS } from "../src/lib/page-defaults/contact";

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
  const d = CONTACT_DEFAULTS;

  const document = {
    _id: "contactPageContent",
    _type: "contactPageContent",
    general: {
      header: d.general.header,
      details: d.general.details?.map(({ _key, label, value, href }) => ({
        _type: "contactDetail",
        _key,
        label,
        value,
        ...(href ? { href } : {}),
      })),
    },
    team: {
      header: d.team.header,
      people: d.team.people.map(({ _key, name, role, email }) => ({
        _type: "contactPerson",
        _key,
        name,
        role,
        email,
      })),
    },
    seo: d.seo,
  };

  const result = await client.createOrReplace(document);
  console.log("✅ Contact page seeded:", result._id);
}

seed().catch(console.error);
