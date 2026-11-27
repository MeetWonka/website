import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { resolve } from "path";
import { DEFAULT_NAVIGATION } from "../src/lib/nav-defaults";

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

const navigation = DEFAULT_NAVIGATION.map((item) => ({
  _type: "navItem" as const,
  _key: item._key,
  itemType: item.itemType,
  label: item.label,
  ...(item.href ? { href: item.href } : {}),
  ...(item.children
    ? {
        children: item.children.map((child) => ({
          _type: "navDropdownChild" as const,
          _key: child._key,
          label: child.label,
          href: child.href,
          ...(child.description ? { description: child.description } : {}),
        })),
      }
    : {}),
}));

async function seed() {
  const result = await client
    .patch("siteSettings")
    .set({ navigation })
    .commit();
  console.log("✅ Navigation updated in siteSettings:", result._id);
}

seed().catch(console.error);
