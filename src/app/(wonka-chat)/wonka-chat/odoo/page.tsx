import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import {
  SITE_SETTINGS_QUERY,
  WONKA_CHAT_ODOO_CONTENT_QUERY,
} from "@sanity/lib/queries";
import { BreadcrumbSchema } from "@/components/json-ld";
import { ContactBlock } from "@/components/sections/contact-block";
import { Cta } from "@/components/sections/cta";
import { IconFeatureGrid } from "@/components/sections/icon-feature-grid";
import { LogoStrip } from "@/components/sections/logo-strip";
import { ProblemBento } from "@/components/sections/problem-bento";
import { ProductHero } from "@/components/sections/product-hero";
import { Security } from "@/components/sections/security";
import { StickyFeatures } from "@/components/sections/sticky-features";
import { WorkflowSteps } from "@/components/sections/workflow-steps";
import { DEFAULT_WONKA_CHAT_SECURITY } from "@/lib/cms-sections";
import { resolveWonkaChatOdooContent } from "@/lib/page-defaults/resolve-pages";
import { WONKA_CHAT_ODOO_DEFAULTS } from "@/lib/page-defaults/wonka-chat-odoo";
import { buildMetadata } from "@/lib/seo";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { getSiteUrl } from "@/lib/site-url";
import type { SiteSettings, WonkaChatOdooContent } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/wonka-chat/odoo";

async function getPageBundle() {
  const [{ data: settings }, { data: content }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({
      query: WONKA_CHAT_ODOO_CONTENT_QUERY,
      tags: ["wonkaChatOdooContent"],
    }),
  ]);

  return {
    settings: settings as SiteSettings | null,
    rawContent: content as WonkaChatOdooContent | null,
    content: resolveWonkaChatOdooContent(
      (content as WonkaChatOdooContent | null) ?? null,
    ),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getPageBundle();
  return buildMetadata(content.seo, {
    path: pagePath,
    fallbackTitle:
      WONKA_CHAT_ODOO_DEFAULTS.seo.metaTitle ??
      "WonkaChat for Odoo · AI on your ERP | Wonka",
  });
}

export default async function WonkaChatOdooPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${pagePath}`;
  const { settings, content, rawContent } = await getPageBundle();
  const sharedLinks = settings?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-chat");
  const meetingLabel = sharedLinks?.meetingLabel ?? null;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "WonkaChat", url: `${siteUrl}/wonka-chat` },
          { name: "Odoo", url: pageUrl },
        ]}
      />

      <main className="bg-background text-text">
        <ProductHero data={content.hero} leadForm="wonka-chat-odoo-hero" />
        <LogoStrip data={content.logoStrip} />
        <ProblemBento id="the-problem" data={content.problem} />
        <div id="how-it-works">
          <StickyFeatures
            data={content.features}
            meetingUrl={meetingUrl}
            meetingLabel={meetingLabel}
            meetingTrackType="wonka-chat"
            className="py-18 md:py-24"
          />
        </div>
        <WorkflowSteps id="how-it-works-steps" data={content.workflowSteps} />
        <IconFeatureGrid id="odoo-capabilities" data={content.capabilities} />
        <Security
          id="security"
          data={rawContent?.security ?? null}
          defaults={DEFAULT_WONKA_CHAT_SECURITY}
        />
        <ContactBlock
          id="contact"
          data={content.contact}
          meetingUrl={meetingUrl}
          meetingLabel={meetingLabel}
          meetingTrackType="wonka-chat"
          className="py-18 text-center md:py-24"
        />
      </main>

      <Cta meetingUrl={meetingUrl} meetingLabel={meetingLabel} meetingTrackType="wonka-chat" />
    </>
  );
}
