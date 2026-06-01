import type { Metadata } from "next";
import type { SeoData } from "@/lib/types";
import { getSiteUrl } from "@/lib/site-url";

const HOME_TITLE =
  "Wonka AI – AI-Powered LinkedIn Prospecting & Sales Automation";
const DEFAULT_DESCRIPTION =
  "Wonka AI automates LinkedIn prospecting and sales outreach with AI. Help your whole team prospect smarter, book more meetings, and close more deals.";
const SITE_NAME = "Wonka AI";
const DEFAULT_OG_IMAGE = "/opengraph-image.jpg";

export interface BuildMetadataOptions {
  path: string;
  fallbackTitle?: string;
}

export function buildMetadata(
  seo: SeoData | null,
  options: BuildMetadataOptions,
): Metadata {
  const { path, fallbackTitle } = options;
  const isHome = path === "/";

  const cmsTitle = seo?.metaTitle;
  const title: Metadata["title"] = cmsTitle
    ? { absolute: cmsTitle }
    : isHome
      ? { absolute: HOME_TITLE }
      : (fallbackTitle ?? SITE_NAME);

  const description = seo?.metaDescription || DEFAULT_DESCRIPTION;
  const ogTitle = cmsTitle || (isHome ? HOME_TITLE : fallbackTitle ? `${fallbackTitle} - ${SITE_NAME}` : SITE_NAME);
  const customOgImage = seo?.ogImage || undefined;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      url: `${getSiteUrl()}${path}`,
      locale: "en_US",
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
