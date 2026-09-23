import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import {
  HOMEPAGE_CONTENT_QUERY,
  SITE_SETTINGS_QUERY,
  WONKA_CHAT_CONTENT_QUERY,
} from "@sanity/lib/queries";
import { BreadcrumbSchema, FaqSchema, SoftwareAppSchema } from "@/components/json-ld";
import { CenteredBanner } from "@/components/sections/centered-banner";
import { ContactBlock } from "@/components/sections/contact-block";
import { Cta } from "@/components/sections/cta";
import { FaqSection } from "@/components/sections/faq-section";
import { LogoStrip } from "@/components/sections/logo-strip";
import { ProductHero } from "@/components/sections/product-hero";
import { Security } from "@/components/sections/security";
import { SplitContent } from "@/components/sections/split-content";
import { StickyFeatures } from "@/components/sections/sticky-features";
import { Testimonials } from "@/components/sections/testimonials";
import { UseCases } from "@/components/sections/use-cases";
import { DEFAULT_WONKA_CHAT_SECURITY } from "@/lib/cms-sections";
import {
  resolveWonkaChatContent,
  type WonkaChatResolvedContent,
} from "@/lib/page-defaults/resolve-pages";
import { WONKA_CHAT_DEFAULTS } from "@/lib/page-defaults/wonka-chat";
import { buildMetadata } from "@/lib/seo";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { getSiteUrl } from "@/lib/site-url";
import type { HomepageContent, SiteSettings, WonkaChatContent } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/wonka-chat";
const TRIAL_URL = "https://wonka.chat/register";

async function getPageBundle() {
  const [{ data: settings }, { data: homepage }, { data: content }] =
    await Promise.all([
      sanityFetch({ query: SITE_SETTINGS_QUERY }),
      sanityFetch({ query: HOMEPAGE_CONTENT_QUERY }),
      sanityFetch({ query: WONKA_CHAT_CONTENT_QUERY }),
    ]);

  const homepageContent = homepage as HomepageContent | null;
  const resolved = resolveWonkaChatContent(
    (content as WonkaChatContent | null) ?? null,
    homepageContent?.useCases ?? null,
  );

  return {
    settings: settings as SiteSettings | null,
    content: resolved,
    rawContent: content as WonkaChatContent | null,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getPageBundle();
  return buildMetadata(content.seo, {
    path: pagePath,
    fallbackTitle: WONKA_CHAT_DEFAULTS.seo.metaTitle ?? undefined,
  });
}

export default async function WonkaChatPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${pagePath}`;
  const { settings, content, rawContent } = await getPageBundle();
  const sharedLinks = settings?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-chat");
  const meetingLabel = sharedLinks?.meetingLabel ?? null;
  const faqItems =
    content.faq.items?.map((item) => ({
      question: item.question,
      answer: item.answer,
    })) ?? [];
  const schemaDescription =
    content.seo.metaDescription ??
    WONKA_CHAT_DEFAULTS.seo.metaDescription ??
    "";

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "WonkaChat", url: pageUrl },
        ]}
      />
      <SoftwareAppSchema
        name="WonkaChat"
        description={schemaDescription}
        url={pageUrl}
        features={content.features.features.map((f) => f.title)}
      />
      {faqItems.length > 0 ? <FaqSchema items={faqItems} /> : null}

      <main className="bg-background text-text">
        <WonkaChatSections
          content={content}
          rawSecurity={rawContent?.security ?? null}
          meetingUrl={meetingUrl}
          meetingLabel={meetingLabel}
        />
      </main>

      <Cta meetingUrl={meetingUrl} meetingLabel={meetingLabel} meetingTrackType="wonka-chat" />
    </>
  );
}

function WonkaChatSections({
  content,
  rawSecurity,
  meetingUrl,
  meetingLabel,
}: {
  content: WonkaChatResolvedContent;
  rawSecurity: WonkaChatContent["security"];
  meetingUrl: string;
  meetingLabel: string | null;
}) {
  return (
    <>
      <ProductHero
        data={{
          ...content.hero,
          eyebrow: "Wonka Workspace",
          title: "The AI workspace for your entire organization.",
          subtitle:
            "Let your entire organization use AI in a safe and secure way. Optimize your work by connecting to your daily tools.",
        }}
        meetingUrl={TRIAL_URL}
        meetingLabel="Start free trial"
        meetingTrackType="wonka-chat"
      />
      <LogoStrip data={content.logoStrip} />
      <SplitContent
        data={{
          ...content.problem,
          header: {
            ...content.problem.header,
            heading: "Not everyone knows how to work with AI.",
            body:
              "Most AI tools create value for the people who already know how to use them. Everyone else keeps doing repetitive work manually.\n\nWonka Workspace changes that. It gives your whole team access to AI in a way that is simple, practical and built for daily work.",
          },
        }}
        className="py-18 md:py-24"
      />
      <CenteredBanner
        id="how-it-works"
        header={{
          ...content.overview,
          eyebrow: "What is Wonka Workspace?",
          body:
            "Wonka Workspace lets you chat with AI in a safe manner, create AI Agents for daily work, make AI Apps to visualize key processes and statistics, and AI Automations to automate boring work. All in a secure environment.",
        }}
      />
      <StickyFeatures
        data={{
          ...content.features,
          header: {
            ...content.features.header,
            body:
              "Wonka Workspace is built to make AI useful across the organisation: simple enough for every employee, powerful enough for difficult processes.",
          },
          features: content.features.features.map((feature) => {
            if (feature._key === "chat") {
              return {
                ...feature,
                title: "AI Chat for everyone.",
                description:
                  "Give your employees one simple place to ask questions, find information and get support from AI. Wonka Workspace works like a familiar chat experience, but with your company context built in.",
              };
            }
            if (feature._key === "models") {
              return {
                ...feature,
                title: "Choose your own AI model.",
                description:
                  "Wonka Workspace gives your company the flexibility to use an AI model that fits your needs, preferences and security requirements.",
              };
            }
            return feature;
          }),
        }}
        meetingUrl={TRIAL_URL}
        meetingLabel="Start free trial"
        meetingTrackType="wonka-chat"
        className="py-18 md:py-24"
      />
      <UseCases id="use-cases" data={content.useCases} />
      <Security
        id="security"
        data={rawSecurity}
        defaults={DEFAULT_WONKA_CHAT_SECURITY}
      />
      <Testimonials
        id="testimonials"
        header={content.testimonials}
        className="py-18 md:py-24"
      />
      <ContactBlock
        id="contact"
        data={content.contact}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="wonka-chat"
        className="py-18 text-center md:py-24"
      />
      <FaqSection data={content.faq} className="py-18 md:py-24" />
    </>
  );
}
