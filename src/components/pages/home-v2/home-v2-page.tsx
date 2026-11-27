import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import type { Locale } from "@/i18n/config";
import { commercialPath } from "@/i18n/routes";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildCommercialMetadata } from "@/lib/seo";
import type { SiteSettings } from "@/lib/types";
import { HOME_V2_COPY } from "@/views/copy/home-v2";
import { HomeV2Client } from "./home-v2-client";

export function homeMetadata(locale: Locale): Metadata {
  const { seo } = HOME_V2_COPY[locale];
  return buildCommercialMetadata(
    {
      metaTitle: seo.title,
      metaDescription: seo.description,
      ogImage: null,
    },
    "home",
    locale,
  );
}

/** @deprecated Use `homeMetadata` — kept for `/home-v2` redirects. */
export const homeV2Metadata = homeMetadata;

export async function HomeV2Page({ locale = "en" }: { locale?: Locale }) {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;

  return (
    <HomeV2Client
      locale={locale}
      copy={HOME_V2_COPY[locale]}
      links={{
        meetingUrl: resolveMeetingUrl(sharedLinks, "wonka-chat", locale),
        teamUrl: locale === "en" ? "/team" : `/${locale}/team`,
      }}
    />
  );
}
