import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { PricingPage } from "@/components/sections/pricing-page";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildMetadata } from "@/lib/seo";
import type { SiteSettings } from "@/lib/types";
import type { SeoData } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/pricing";
const title = "AI Workspace pricing | Wonka";
const description = "Transparent per-seat pricing for Wonka AI Workspace.";

const seo: SeoData = {
  metaTitle: title,
  metaDescription: description,
  ogImage: null,
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, { path: pagePath, fallbackTitle: title });
}

export default async function PricingRoutePage() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const settings = data as SiteSettings | null;
  const bookingHref = resolveMeetingUrl(settings?.sharedLinks, "wonka-chat");

  return (
    <main className="bg-background text-text">
      <PricingPage bookingHref={bookingHref} />
    </main>
  );
}
