import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env");
const lines = readFileSync(envPath, "utf-8").split("\n");
for (const line of lines) {
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

const resourcesGroup = {
  _type: "footerLinkGroup",
  _key: "resources-seo",
  title: "Resources",
  links: [
    { _type: "footerLink", _key: "blog", label: "Blog", href: "/blog", external: false },
    { _type: "footerLink", _key: "connectors", label: "Connectors", href: "/connectors", external: false },
    { _type: "footerLink", _key: "glossary", label: "Glossary", href: "/glossary", external: false },
    { _type: "footerLink", _key: "comparisons", label: "Comparisons", href: "/comparisons", external: false },
    { _type: "footerLink", _key: "case-studies", label: "Case Studies", href: "/case-studies", external: false },
  ],
};

async function patch() {
  const result = await client
    .patch("siteSettings")
    .setIfMissing({ footerLinkGroups: [] })
    .append("footerLinkGroups", [resourcesGroup])
    .commit();
  console.log("✅ Resources group added to footer:", result._id);
}

patch().catch(console.error);
