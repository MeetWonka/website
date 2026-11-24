import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { resolve } from "path";
import { WONKA_BUILD_DEFAULTS } from "../src/lib/page-defaults/wonka-build";

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
  const d = WONKA_BUILD_DEFAULTS;

  const document = {
    _id: "wonkaBuildContent",
    _type: "wonkaBuildContent",
    hero: {
      eyebrow: d.hero.eyebrow,
      title: d.hero.title,
      subtitle: d.hero.subtitle,
      theme: d.hero.theme,
    },
    logoStrip: {
      proofLines: d.logoStrip.proofLines,
    },
    phases: {
      eyebrow: d.phases.header?.eyebrow,
      heading: d.phases.header?.heading,
      body: d.phases.header?.body,
      items: d.phases.items,
    },
    deliverables: d.deliverables,
    industries: d.industries,
    whyNow: d.whyNow,
    promo: {
      eyebrow: d.promo.eyebrow,
      heading: d.promo.heading,
      body: d.promo.body,
      variant: d.promo.variant,
      showCta: d.promo.showCta,
    },
    testimonials: d.testimonials,
    contact: {
      header: d.contact.header,
      personName: d.contact.personName,
      personRole: d.contact.personRole,
    },
    faq: d.faq,
    seo: d.seo,
  };

  const result = await client.createOrReplace(document);
  console.log("Seeded wonkaBuildContent:", result._id);
}

seed().catch(console.error);
