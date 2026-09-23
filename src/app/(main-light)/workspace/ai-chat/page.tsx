import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY, WONKA_CHAT_CONTENT_QUERY } from "@sanity/lib/queries";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { ContactBlock } from "@/components/sections/contact-block";
import { FaqSection } from "@/components/sections/faq-section";
import { LogoStrip } from "@/components/sections/logo-strip";
import { ProductHero } from "@/components/sections/product-hero";
import { Security } from "@/components/sections/security";
import { WorkspaceTrialCta } from "@/components/sections/workspace-trial-cta";
import { DEFAULT_WONKA_CHAT_SECURITY } from "@/lib/cms-sections";
import { AI_CHAT_CAPABILITY_CLUSTERS } from "@/lib/page-defaults/ai-chat-capability-grid";
import { resolveWonkaChatContent } from "@/lib/page-defaults/resolve-pages";
import { resolveSectionHeader } from "@/lib/resolve-cms";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildMetadata } from "@/lib/seo";
import type { SiteSettings, WonkaChatContent } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/workspace/ai-chat";
const TRIAL_URL = "https://wonka.chat/register";

async function getPageContent() {
  const { data } = await sanityFetch({ query: WONKA_CHAT_CONTENT_QUERY });

  return {
    content: resolveWonkaChatContent((data as WonkaChatContent | null) ?? null),
    rawContent: data as WonkaChatContent | null,
  };
}

// Own SEO: the CMS `seo` on the WonkaChat document belongs to /wonka-chat
const PAGE_SEO = {
  metaTitle: "AI Chat | Safe AI chat on your company knowledge | Wonka",
  metaDescription:
    "Chat with the best AI models on your company documents and tools. EU-hosted, GDPR-compliant, with enterprise access control. Start a free trial.",
  ogImage: null,
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(PAGE_SEO, { path: pagePath });
}

export default async function WorkspaceAiChatPage() {
  const [{ content, rawContent }, { data: settings }] = await Promise.all([
    getPageContent(),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ]);
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-chat");
  const meetingLabel = sharedLinks?.meetingLabel ?? null;

  return (
    <main className="bg-background text-text">
      <ProductHero
        data={{
          ...content.hero,
          eyebrow: "AI Chat",
          title: "Safe AI chat.",
          subtitle:
            "The best AI models, connected to your company knowledge, running in the EU.",
          theme: "light",
          heroImage: null,
          fallbackHero: {
            src: "/images/wonka-chat/wonka-ai-chat-header.png",
            alt: "Wonka AI chat workspace",
            width: 3840,
            height: 2160,
          },
        }}
        meetingUrl={TRIAL_URL}
        meetingLabel="Start free trial"
      />
      <LogoStrip data={content.logoStrip} />
      <CapabilityGrid id="capabilities" data={AI_CHAT_CAPABILITY_CLUSTERS} />
      <FaqSection data={content.faq} bordered={false} />
      <WorkspaceTrialCta href={TRIAL_URL} />
      <Security
        id="security"
        data={rawContent?.security ?? null}
        defaults={DEFAULT_WONKA_CHAT_SECURITY}
      />
      <ContactBlock
        id="contact"
        data={{
          ...content.contact,
          header: resolveSectionHeader(content.contact.header, {
            eyebrow: null,
            heading: "Book a demo meeting.",
            body: null,
          }),
        }}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="wonka-chat"
        className="py-18 text-center md:py-24"
      />
    </main>
  );
}
