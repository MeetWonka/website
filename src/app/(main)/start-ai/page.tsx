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
import {
  resolveStartAiContent,
  type StartAiResolvedContent,
} from "@/lib/page-defaults/resolve-pages";
import { buildMetadata } from "@/lib/seo";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import type { SiteSettings, StartAiContent } from "@/lib/types";

export const dynamic = "force-static";

async function getPageContent() {
  const { data } = await sanityFetch({ query: START_AI_CONTENT_QUERY });
  return resolveStartAiContent((data as StartAiContent | null) ?? null);
}

async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data as SiteSettings | null;
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent();
  return buildMetadata(content.seo, {
    path: "/start-ai",
    fallbackTitle: "Start AI · Make your company AI-powered, fast | Wonka",
  });
}

export default async function StartAIPage() {
  const [content, settings] = await Promise.all([
    getPageContent(),
    getSiteSettings(),
  ]);
  const sharedLinks = settings?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "start-ai");
  const meetingLabel = sharedLinks?.meetingLabel ?? null;

  return (
    <>
      <StartAiSections
        content={content}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
      />
    </>
  );
}

function StartAiSections({
  content,
  meetingUrl,
  meetingLabel,
}: {
  content: StartAiResolvedContent;
  meetingUrl: string;
  meetingLabel: string | null;
}) {
  return (
    <>
      <ProductHero data={content.hero} leadForm="start-ai-hero" />
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
      />
      <ContactBlock
        id="contact"
        data={content.contact}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="start-ai"
        className="py-24"
      />
      <FaqSection data={content.faq} bordered={false} className="py-24" />
    </>
  );
}
