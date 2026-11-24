import type { Metadata } from "next";
import { CONTACT_PAGE_CONTENT_QUERY } from "@sanity/lib/queries";
import { ContactGeneralSection } from "@/components/sections/contact-general-section";
import { ContactTeamSection } from "@/components/sections/contact-team-section";
import type { Locale } from "@/i18n/config";
import { fetchPageDoc } from "@/lib/localized-content";
import { resolveContactPageContent } from "@/lib/page-defaults/resolve-contact-page";
import { buildCommercialMetadata } from "@/lib/seo";
import type { ContactPageContent } from "@/lib/types/page-sections";

async function getPageContent(locale: Locale) {
  const doc = await fetchPageDoc<ContactPageContent>(
    CONTACT_PAGE_CONTENT_QUERY,
    "contactPageContent",
    locale,
  );
  return resolveContactPageContent(doc, locale);
}

export async function contactMetadata(locale: Locale): Promise<Metadata> {
  const content = await getPageContent(locale);
  return buildCommercialMetadata(content.seo, "contact", locale, "Contact | Wonka");
}

export async function ContactView({ locale }: { locale: Locale }) {
  const content = await getPageContent(locale);

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
