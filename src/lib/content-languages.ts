import { sanityFetch } from "@sanity/lib/live";
import { CONTENT_SLUG_LOCALES_QUERY } from "@sanity/lib/queries";
import { buildExistingItemLanguages, type ContentSection, type SlugLocale } from "@/lib/hreflang";

const documentTypes: Record<ContentSection, string> = {
  blog: "blogPost",
  connectors: "connectorPage",
  glossary: "glossaryTerm",
  comparisons: "comparisonPage",
  "case-studies": "caseStudy",
};

export async function getContentLanguages(siteUrl: string, section: ContentSection, slug: string): Promise<Record<string, string>> {
  const { data } = await sanityFetch({
    query: CONTENT_SLUG_LOCALES_QUERY,
    params: { type: documentTypes[section], slug },
  });

  return buildExistingItemLanguages(siteUrl, section, (data ?? []) as SlugLocale[]);
}
