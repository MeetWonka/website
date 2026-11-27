import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { client } from "@sanity/lib/client";
import { ALL_CONTENT_SLUGS_QUERY } from "@sanity/lib/queries";
import { hubPath, itemPath } from "@/lib/locale-path";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { buildExistingItemLanguages, buildHubLanguages } from "@/lib/hreflang";
import { CATALOG_SLUGS } from "@/lib/resolve-connectors";
import {
  commercialLanguages,
  commercialPath,
  LANDING_PATHS,
  landingLanguages,
  landingPath,
  type CommercialPage,
  type LandingPage,
} from "@/i18n/routes";

// /wonka-chat redirects to /workspace (a duplicate of the homepage): not listed.
// /security is hidden (redirects home): not listed.
const COMMERCIAL_PRIORITY: Record<Exclude<CommercialPage, "wonkaChat" | "security">, number> = {
  home: 1.0,
  startAi: 0.9,
  wonkaBuild: 0.9,
  aiAgents: 0.85,
  wonkaChatOdoo: 0.85,
  aiChat: 0.85,
  pricing: 0.85,
  contact: 0.85,
};

type SlugItem = { slug: { current: string }; language: string; _updatedAt?: string };

const sections = ["blog", "connectors", "glossary", "comparisons", "case-studies"] as const;

function latestModified(items: SlugItem[]): Date {
  const latest = items
    .map((item) => item._updatedAt ? new Date(item._updatedAt).getTime() : 0)
    .filter(Boolean)
    .sort((a, b) => b - a)[0];

  return latest ? new Date(latest) : new Date();
}

function uniqueByUrl(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values());
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  // Commercial pages: one entry per locale, each listing its EN/FR/NL siblings
  const commercialPages: MetadataRoute.Sitemap = (
    Object.keys(COMMERCIAL_PRIORITY) as Array<keyof typeof COMMERCIAL_PRIORITY>
  ).flatMap((page) =>
    locales.map((locale) => {
      const path = commercialPath(page, locale as Locale);
      return {
        url: path === "/" ? siteUrl : `${siteUrl}${path}`,
        lastModified,
        changeFrequency: page === "home" ? ("weekly" as const) : ("monthly" as const),
        priority: COMMERCIAL_PRIORITY[page],
        alternates: { languages: commercialLanguages(siteUrl, page) },
      };
    })
  );

  // SEO landing pages: localized slugs, hreflang limited to existing locales
  const landingPages: MetadataRoute.Sitemap = (
    Object.keys(LANDING_PATHS) as LandingPage[]
  ).flatMap((page) =>
    locales.flatMap((locale) => {
      const path = landingPath(page, locale as Locale);
      if (!path) return [];
      return [{
        url: `${siteUrl}${path}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.85,
        alternates: { languages: landingLanguages(siteUrl, page) },
      }];
    })
  );

  const staticPages: MetadataRoute.Sitemap = [
    ...commercialPages,
    ...landingPages,
    { url: `${siteUrl}/ai-agent-blueprint`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/services/start-ai-subsidized-flanders`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/case-studies/itzu`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/case-studies/n-allo`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/france`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/france/diagnostic`, lastModified, changeFrequency: "monthly", priority: 0.80 },
    { url: `${siteUrl}/vs/dust`, lastModified, changeFrequency: "monthly", priority: 0.80 },
    { url: `${siteUrl}/fr/vs/dust`, lastModified, changeFrequency: "monthly", priority: 0.80 },
    { url: `${siteUrl}/vs/langdock`, lastModified, changeFrequency: "monthly", priority: 0.80 },
    { url: `${siteUrl}/fr/vs/langdock`, lastModified, changeFrequency: "monthly", priority: 0.80 },
    { url: `${siteUrl}/fr/agent-ia-entreprise`, lastModified, changeFrequency: "monthly", priority: 0.80 },
    // Hub pages with hreflang
    ...sections.flatMap((section) =>
      locales.map((locale) => ({
        url: `${siteUrl}${hubPath(section, locale as Locale)}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: { languages: buildHubLanguages(siteUrl, section, locales) },
      }))
    ),
  ];

  try {
    const data = await client.fetch(ALL_CONTENT_SLUGS_QUERY);
    if (!data) return staticPages;

    // Group items by slug so we can build hreflang across all 3 language versions
    const groupBySlug = (items: SlugItem[]) =>
      items.reduce<Record<string, SlugItem[]>>((acc, item) => {
        const s = item.slug.current;
        acc[s] = [...(acc[s] ?? []), item];
        return acc;
      }, {});

    const blogBySlag = groupBySlug(data.blogPosts ?? []);
    const glossaryBySlug = groupBySlug(data.glossaryTerms ?? []);
    const comparisonsBySlug = groupBySlug(data.comparisons ?? []);
    const connectorsBySlug = groupBySlug(data.connectors ?? []);
    for (const slug of CATALOG_SLUGS) {
      const existing = connectorsBySlug[slug] ?? [];
      const missing = locales
        .filter((language) => !existing.some((item) => item.language === language))
        .map((language) => ({ slug: { current: slug }, language }));
      connectorsBySlug[slug] = [...existing, ...missing];
    }
    const caseStudiesBySlug = groupBySlug(data.caseStudies ?? []);

    const contentPages: MetadataRoute.Sitemap = [
      // Blog
      ...Object.entries(blogBySlag).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("blog", item.language as Locale, slug)}`,
          lastModified: item._updatedAt ? new Date(item._updatedAt) : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: { languages: buildExistingItemLanguages(siteUrl, "blog", items) },
        }))
      ),
      // Glossary
      ...Object.entries(glossaryBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("glossary", item.language as Locale, slug)}`,
          lastModified: item._updatedAt ? new Date(item._updatedAt) : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.6,
          alternates: { languages: buildExistingItemLanguages(siteUrl, "glossary", items) },
        }))
      ),
      // Comparisons
      ...Object.entries(comparisonsBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("comparisons", item.language as Locale, slug)}`,
          lastModified: item._updatedAt ? new Date(item._updatedAt) : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: { languages: buildExistingItemLanguages(siteUrl, "comparisons", items) },
        }))
      ),
      // Connectors
      ...Object.entries(connectorsBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("connectors", item.language as Locale, slug)}`,
          lastModified: item._updatedAt ? new Date(item._updatedAt) : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.8,
          alternates: { languages: buildExistingItemLanguages(siteUrl, "connectors", items) },
        }))
      ),
      // Case studies
      ...Object.entries(caseStudiesBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("case-studies", item.language as Locale, slug)}`,
          lastModified: item._updatedAt ? new Date(item._updatedAt) : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: { languages: buildExistingItemLanguages(siteUrl, "case-studies", items) },
        }))
      ),
    ];

    return uniqueByUrl([...staticPages, ...contentPages]);
  } catch {
    return uniqueByUrl(staticPages);
  }
}
