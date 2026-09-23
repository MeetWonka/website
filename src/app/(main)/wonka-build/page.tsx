import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import {
  SITE_SETTINGS_QUERY,
  WONKA_BUILD_CONTENT_QUERY,
} from "@sanity/lib/queries";
import { ContactBlock } from "@/components/sections/contact-block";
import { DeliverablesPanel } from "@/components/sections/deliverables-panel";
import { FaqSection } from "@/components/sections/faq-section";
import { IndustryTabs } from "@/components/sections/industry-tabs";
import { LogoStrip } from "@/components/sections/logo-strip";
import { NumberedCards } from "@/components/sections/numbered-cards";
import { ProductHero } from "@/components/sections/product-hero";
import { Testimonials } from "@/components/sections/testimonials";
import {
  resolveWonkaBuildContent,
  type WonkaBuildResolvedContent,
} from "@/lib/page-defaults/resolve-pages";
import { buildMetadata } from "@/lib/seo";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import type { SiteSettings, WonkaBuildContent } from "@/lib/types";

export const dynamic = "force-static";

async function getPageContent() {
  const { data } = await sanityFetch({
    query: WONKA_BUILD_CONTENT_QUERY,
    tags: ["wonkaBuildContent"],
  });
  return resolveWonkaBuildContent((data as WonkaBuildContent | null) ?? null);
}

async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data as SiteSettings | null;
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent();
  return buildMetadata(content.seo, {
    path: "/wonka-build",
    fallbackTitle:
      "Wonka Build · Custom AI applications for your business | Wonka",
  });
}

export default async function WonkaBuildPage() {
  const [content, settings] = await Promise.all([
    getPageContent(),
    getSiteSettings(),
  ]);
  const sharedLinks = settings?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-build");
  const meetingLabel = sharedLinks?.meetingLabel ?? null;

  return (
    <WonkaBuildSections
      content={content}
      meetingUrl={meetingUrl}
      meetingLabel={meetingLabel}
    />
  );
}

function WonkaBuildSections({
  content,
  meetingUrl,
  meetingLabel,
}: {
  content: WonkaBuildResolvedContent;
  meetingUrl: string;
  meetingLabel: string | null;
}) {
  return (
    <>
      <ProductHero
        data={content.hero}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="wonka-build"
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
      />
      <ContactBlock
        id="contact"
        data={content.contact}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="wonka-build"
        className="py-24"
      />
      <FaqSection data={content.faq} bordered={false} className="py-24" />
    </>
  );
}
