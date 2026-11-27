import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY, WONKA_BUILD_CONTENT_QUERY } from "@sanity/lib/queries";
import { ContactBlock } from "@/components/sections/contact-block";
import { DeliverablesPanel } from "@/components/sections/deliverables-panel";
import { FaqSection } from "@/components/sections/faq-section";
import { IndustryTabs } from "@/components/sections/industry-tabs";
import { LogoStrip } from "@/components/sections/logo-strip";
import { NumberedCards } from "@/components/sections/numbered-cards";
import { ProductHero } from "@/components/sections/product-hero";
import { Testimonials } from "@/components/sections/testimonials";
import type { Locale } from "@/i18n/config";
import { fetchPageDoc, resolveMeetingLabel } from "@/lib/localized-content";
import { resolveWonkaBuildContent } from "@/lib/page-defaults/resolve-pages";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildCommercialMetadata } from "@/lib/seo";
import type { SiteSettings, WonkaBuildContent } from "@/lib/types";

async function getPageContent(locale: Locale) {
  const doc = await fetchPageDoc<WonkaBuildContent>(
    WONKA_BUILD_CONTENT_QUERY,
    "wonkaBuildContent",
    locale,
  );
  return resolveWonkaBuildContent(doc, locale);
}

export async function wonkaBuildMetadata(locale: Locale): Promise<Metadata> {
  const content = await getPageContent(locale);
  return buildCommercialMetadata(
    content.seo,
    "wonkaBuild",
    locale,
    "Wonka Build · Custom AI applications for your business | Wonka",
  );
}

export async function WonkaBuildView({ locale }: { locale: Locale }) {
  const [content, { data: settings }] = await Promise.all([
    getPageContent(locale),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ]);
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-build", locale);
  const meetingLabel = resolveMeetingLabel(sharedLinks, locale);

  return (
    <>
      <ProductHero
        data={content.hero}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="wonka-build"
        locale={locale}
      />
      <LogoStrip data={content.logoStrip} />
      <NumberedCards data={content.phases} className="py-24" />
      <DeliverablesPanel data={content.deliverables} />
      <IndustryTabs
        data={content.industries}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="wonka-build"
      />
      <Testimonials
        id="testimonials"
        header={content.testimonials}
        className="py-24"
        locale={locale}
      />
      <ContactBlock
        id="contact"
        data={content.contact}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="wonka-build"
        className="py-24"
        locale={locale}
      />
      <FaqSection data={content.faq} bordered={false} className="py-24" />
    </>
  );
}
