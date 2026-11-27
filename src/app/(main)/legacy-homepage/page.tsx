import type { Metadata } from "next";
import { HOMEPAGE_CONTENT_QUERY } from "@sanity/lib/queries";
import type { HomepageContent } from "@/lib/types";
import { fetchPageDoc } from "@/lib/localized-content";
import { buildMetadata } from "@/lib/seo";
import { HomeView } from "@/views/home";

export const dynamic = "force-static";

const pagePath = "/legacy-homepage";

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchPageDoc<HomepageContent>(
    HOMEPAGE_CONTENT_QUERY,
    "homepageContent",
    "en",
  );

  return buildMetadata(content?.seo ?? null, { path: pagePath, noindex: true });
}

export default function LegacyHomepagePage() {
  return <HomeView locale="en" />;
}
