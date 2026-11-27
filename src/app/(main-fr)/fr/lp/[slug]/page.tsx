import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { AdsLandingClient } from "@/components/pages/ads-landing/ads-landing-client";
import { commercialPath } from "@/i18n/routes";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildMetadata } from "@/lib/seo";
import type { SiteSettings } from "@/lib/types";
import {
  ADS_LANDINGS,
  ADS_LANDING_SLUGS,
  type AdsLandingSlug,
} from "@/views/copy/ads-landings";
import { HOME_V2_COPY } from "@/views/copy/home-v2";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

function isSlug(slug: string): slug is AdsLandingSlug {
  return (ADS_LANDING_SLUGS as string[]).includes(slug);
}

export function generateStaticParams() {
  return ADS_LANDING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  const { seo } = ADS_LANDINGS[slug];
  // Paid-search destinations: kept out of the index so they never compete
  // with the organic pages they were derived from.
  return buildMetadata(
    { metaTitle: seo.title, metaDescription: seo.description, ogImage: null },
    { path: `/fr/lp/${slug}`, locale: "fr", fallbackTitle: seo.title, noindex: true },
  );
}

export default async function AdsLandingPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();

  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const home = HOME_V2_COPY.fr;

  return (
    <AdsLandingClient
      slug={slug}
      copy={ADS_LANDINGS[slug]}
      shared={{
        platform: home.platform,
        security: home.security,
        clients: home.clients,
        integrations: home.integrations,
        trustedBy: home.hero.trustedBy,
      }}
      links={{
        meetingUrl: resolveMeetingUrl(sharedLinks, "france"),
        pricingUrl: commercialPath("pricing", "fr"),
      }}
    />
  );
}
