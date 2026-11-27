import type { Locale } from "@/i18n/config";
import { hubPath, itemPath } from "@/lib/locale-path";

export const HREFLANG: Record<Locale, string> = {
  en: "en-US",
  fr: "fr-FR",
  nl: "nl-BE",
};

export type ContentSection = "blog" | "connectors" | "glossary" | "comparisons" | "case-studies";

export interface SlugLocale {
  slug: { current: string };
  language: string;
}

export function buildExistingItemLanguages(
  siteUrl: string,
  section: ContentSection,
  items: SlugLocale[],
): Record<string, string> {
  const languages: Record<string, string> = {};

  items.forEach((item) => {
    const locale = item.language as Locale;
    if (!HREFLANG[locale] || !item.slug?.current) return;
    languages[HREFLANG[locale]] = `${siteUrl}${itemPath(section, locale, item.slug.current)}`;
  });

  if (languages[HREFLANG.en]) {
    languages["x-default"] = languages[HREFLANG.en];
  }

  return languages;
}

export function buildHubLanguages(siteUrl: string, section: ContentSection, locales: readonly Locale[]): Record<string, string> {
  const languages = Object.fromEntries(
    locales.map((locale) => [HREFLANG[locale], `${siteUrl}${hubPath(section, locale)}`])
  );

  return {
    ...languages,
    "x-default": `${siteUrl}${hubPath(section, "en")}`,
  };
}
