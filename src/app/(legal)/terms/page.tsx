import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { LEGAL_PAGE_QUERY } from "@sanity/lib/queries";
import type { LegalPageContent } from "@/lib/types";
import { buildMetadata } from "@/lib/seo";
import { LegalPageView } from "@/components/sections/legal-page-view";

export const dynamic = "force-static";

async function getTermsContent() {
  const { data } = await sanityFetch({
    query: LEGAL_PAGE_QUERY,
    params: { id: "termsPage" },
  });
  return data as LegalPageContent | null;
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTermsContent();
  const metadata = buildMetadata(content?.seo ?? null, {
    path: "/terms",
    fallbackTitle: "Terms of Use",
  });
  return {
    ...metadata,
    robots: { index: false, follow: true },
  };
}

export default async function TermsPage() {
  const content = await getTermsContent();
  return <LegalPageView data={content} fallbackTitle="Terms of Use" />;
}
