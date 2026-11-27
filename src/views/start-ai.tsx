import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { START_AI_CONTENT_QUERY, SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { CardGrid } from "@/components/sections/card-grid";
import { ContactBlock } from "@/components/sections/contact-block";
import { DeliverablesPanel } from "@/components/sections/deliverables-panel";
import { FaqSection } from "@/components/sections/faq-section";
import { IndustryTabs } from "@/components/sections/industry-tabs";
import { LogoStrip } from "@/components/sections/logo-strip";
import { NumberedCards } from "@/components/sections/numbered-cards";
import { ProductHero } from "@/components/sections/product-hero";
import { PromoPanel } from "@/components/sections/promo-panel";
import { Testimonials } from "@/components/sections/testimonials";
import type { Locale } from "@/i18n/config";
import { fetchPageDoc, resolveMeetingLabel } from "@/lib/localized-content";
import { resolveStartAiContent } from "@/lib/page-defaults/resolve-pages";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildCommercialMetadata } from "@/lib/seo";
import type { SiteSettings, StartAiContent } from "@/lib/types";

async function getPageContent(locale: Locale) {
  const doc = await fetchPageDoc<StartAiContent>(
    START_AI_CONTENT_QUERY,
    "startAiContent",
    locale,
  );
  return resolveStartAiContent(doc, locale);
}

export async function startAiMetadata(locale: Locale): Promise<Metadata> {
  const content = await getPageContent(locale);
  return buildCommercialMetadata(
    content.seo,
    "startAi",
    locale,
    "Start AI · Make your company AI-powered, fast | Wonka",
  );
}

export async function StartAiView({ locale }: { locale: Locale }) {
  const [content, { data: settings }] = await Promise.all([
    getPageContent(locale),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ]);
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "start-ai", locale);
  const meetingLabel = resolveMeetingLabel(sharedLinks, locale);

  return (
    <>
      <ProductHero
        data={content.hero}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="start-ai"
        locale={locale}
      />
      <LogoStrip data={content.logoStrip} />
      <NumberedCards data={content.phases} className="py-24" />
      <DeliverablesPanel data={content.deliverables} />
      <IndustryTabs
        data={content.industries}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="start-ai"
      />
      <CardGrid data={content.whyNow} className="py-24" />
      <PromoPanel
        data={content.promo}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="start-ai"
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
        meetingTrackType="start-ai"
        className="py-24"
        locale={locale}
      />
      <FaqSection data={content.faq} bordered={false} className="py-24" />
    </>
  );
}
