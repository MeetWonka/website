import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { resolve } from "path";
import { WONKA_CHAT_ODOO_DEFAULTS } from "../src/lib/page-defaults/wonka-chat-odoo";
import { DEFAULT_WONKA_CHAT_SECURITY } from "../src/lib/cms-sections";

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
  const d = WONKA_CHAT_ODOO_DEFAULTS;

  const document = {
    _id: "wonkaChatOdooContent",
    _type: "wonkaChatOdooContent",
    hero: {
      eyebrow: d.hero.eyebrow,
      title: d.hero.title,
      subtitle: d.hero.subtitle,
      theme: d.hero.theme,
    },
    logoStrip: {
      proofLines: d.logoStrip.proofLines,
    },
    problem: {
      header: d.problem.header,
      largeCards: d.problem.largeCards.map(({ _key, title, body }) => ({
        _key,
        title,
        body,
      })),
      smallCards: d.problem.smallCards.map(({ _key, title, body }) => ({
        _key,
        title,
        body,
      })),
    },
    features: {
      header: d.features.header,
      showCta: d.features.showCta,
      features: d.features.features.map(
        ({ _key, title, description, link }) => ({
          _key,
          title,
          description,
          link,
        }),
      ),
    },
    workflowSteps: {
      header: d.workflowSteps.header,
      steps: d.workflowSteps.steps.map(({ _key, title, body, visual }) => ({
        _key,
        title,
        body,
        visual,
      })),
    },
    capabilities: {
      header: d.capabilities.header,
      items: d.capabilities.items.map(({ _key, icon, title, body }) => ({
        _key,
        icon,
        title,
        body,
      })),
    },
    security: DEFAULT_WONKA_CHAT_SECURITY,
    contact: {
      header: d.contact.header,
      personName: d.contact.personName,
      personRole: d.contact.personRole,
    },
    seo: d.seo,
  };

  const result = await client.createOrReplace(document);
  console.log("Seeded wonkaChatOdooContent:", result._id);
}

seed().catch(console.error);
