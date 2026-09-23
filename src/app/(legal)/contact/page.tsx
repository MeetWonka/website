import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { CONTACT_PAGE_CONTENT_QUERY } from "@sanity/lib/queries";
import { ContactGeneralSection } from "@/components/sections/contact-general-section";
import { ContactTeamSection } from "@/components/sections/contact-team-section";
import { resolveContactPageContent } from "@/lib/page-defaults/resolve-contact-page";
import { buildMetadata } from "@/lib/seo";
import type { ContactPageContent } from "@/lib/types/page-sections";

export const dynamic = "force-static";

async function getPageContent() {
  const { data } = await sanityFetch({ query: CONTACT_PAGE_CONTENT_QUERY });
  return resolveContactPageContent((data as ContactPageContent | null) ?? null);
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent();
  return buildMetadata(content.seo, {
    path: "/contact",
    fallbackTitle: "Contact | Wonka",
  });
}

export default async function ContactPage() {
  const content = await getPageContent();

  return (
    <>
      <ContactGeneralSection
        header={content.general.header}
        details={content.general.details ?? []}
      />
      <ContactTeamSection
        header={content.team.header}
        people={content.team.people}
      />
    </>
  );
}
