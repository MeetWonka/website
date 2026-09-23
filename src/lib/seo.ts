import type { Metadata } from "next";
import type { SeoData } from "@/lib/types";
import { getSiteUrl } from "@/lib/site-url";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { itemPath, hubPath } from "@/lib/locale-path";
import { HREFLANG } from "@/lib/hreflang";

const HOME_TITLE = "Wonka AI - Private Enterprise AI Agents";
const DEFAULT_DESCRIPTION =
  "Deploy private AI agents inside your company. Connected to Odoo, SharePoint, Salesforce and Slack, with GDPR compliance. Hosted in Azure West Europe (Microsoft Ireland).";
const SITE_NAME = "Wonka AI";
const DEFAULT_OG_IMAGE = "/opengraph-image.jpg";

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  nl: "nl_BE",
};

export interface BuildMetadataOptions {
  path: string;
  fallbackTitle?: string;
  locale?: string;
  languages?: Record<string, string>;
  /** Pass section + slug to generate per-locale hreflang alternates */
  hreflang?: {
    section: "blog" | "connectors" | "glossary" | "comparisons" | "case-studies";
    slug: string;
  } | "hub" | "home";
}

/**
 * Build hreflang languages map for a given path.
 * - "home": English homepage only; localized homepages are not published
 * - "hub": all locales → their hub path (requires section in path context – caller passes hubPath)
 * - { section, slug }: all locales → itemPath(section, locale, slug)
 * - undefined: returns empty (no cross-locale siblings known)
 */
function buildLanguages(
  siteUrl: string,
  options: BuildMetadataOptions,
): Record<string, string> | undefined {
  const { hreflang, path } = options;

  if (options.languages) return options.languages;

  if (!hreflang) return undefined;

  if (hreflang === "home") {
    return {
      "en-US": siteUrl,
      "x-default": siteUrl,
    };
  }

  if (hreflang === "hub") {
    // Infer section from current path by comparing hub paths
    const sections = ["blog", "connectors", "glossary", "comparisons", "case-studies"] as const;
    for (const section of sections) {
      for (const loc of locales) {
        if (hubPath(section, loc as Locale) === path) {
          const languages: Record<string, string> = { "x-default": siteUrl };
          locales.forEach((l) => {
            languages[HREFLANG[l]] = `${siteUrl}${hubPath(section, l as Locale)}`;
          });
          return languages;
        }
      }
    }
    return undefined;
  }

  // { section, slug }
  const { section, slug } = hreflang;
  const languages: Record<string, string> = { "x-default": siteUrl };
  locales.forEach((l) => {
    languages[HREFLANG[l]] = `${siteUrl}${itemPath(section, l as Locale, slug)}`;
  });
  return languages;
}

export function buildMetadata(
  seo: SeoData | null,
  options: BuildMetadataOptions,
): Metadata {
  const { path, fallbackTitle, locale = "en" } = options;
  const siteUrl = getSiteUrl();
  const isHome = path === "/";

  const cmsTitle = seo?.metaTitle;
  const title: Metadata["title"] = cmsTitle
    ? { absolute: cmsTitle }
    : isHome
      ? { absolute: HOME_TITLE }
      : (fallbackTitle ?? SITE_NAME);

  const description = seo?.metaDescription || DEFAULT_DESCRIPTION;
  const ogTitle = cmsTitle || (isHome ? HOME_TITLE : fallbackTitle ? `${fallbackTitle} – ${SITE_NAME}` : SITE_NAME);
  const customOgImage = seo?.ogImage || undefined;
  const ogLocale = OG_LOCALE[locale] ?? "en_US";

  const languages = buildLanguages(siteUrl, options);

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${siteUrl}${path}`,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      url: `${siteUrl}${path}`,
      locale: ogLocale,
      images: [{ url: customOgImage ?? DEFAULT_OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [customOgImage ?? DEFAULT_OG_IMAGE],
    },
  };
}
