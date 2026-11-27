import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import {
  SITE_SETTINGS_QUERY,
  WONKA_CHAT_CONTENT_QUERY,
} from "@sanity/lib/queries";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { ContactBlock } from "@/components/sections/contact-block";
import { FaqSection } from "@/components/sections/faq-section";
import { HomeSecurityBanner } from "@/components/sections/home-security-banner";
import { LogoStrip } from "@/components/sections/logo-strip";
import { ProductHero } from "@/components/sections/product-hero";
import { WorkspaceTrialCta } from "@/components/sections/workspace-trial-cta";
import {
  WorkspaceAiAgentsGovernance,
  WorkspaceAiAgentsImplementation,
  WorkspaceAiAgentsWorkflow,
} from "@/components/sections/workspace-ai-agents/sections";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/ui";
import { fetchPageDoc, resolveMeetingLabel } from "@/lib/localized-content";
import { getWorkspaceAiAgentsWorkGrid } from "@/lib/page-defaults/workspace-ai-agents-grid";
import { getWorkspaceLogoStrip } from "@/lib/page-defaults/workspace-logo-strip";
import { resolveWonkaChatContent } from "@/lib/page-defaults/resolve-pages";
import { resolveSectionHeader } from "@/lib/resolve-cms";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildMetadata } from "@/lib/seo";
import type { SiteSettings, WonkaChatContent } from "@/lib/types";
import { WORKSPACE_AI_AGENTS_IMAGES } from "@/lib/workspace-ai-agents-images";
import { AI_CHAT_COPY } from "@/views/copy/ai-chat";
import { HOME_V2_COPY } from "@/views/copy/home-v2";
import { WORKSPACE_AI_AGENTS_COPY } from "@/views/copy/workspace-ai-agents";

const PAGE_PATH = "/workspace/ai-agents";

export async function workspaceAiAgentsMetadata(locale: Locale): Promise<Metadata> {
  const { seo } = WORKSPACE_AI_AGENTS_COPY[locale];
  const path = locale === "en" ? PAGE_PATH : `/${locale}${PAGE_PATH}`;
  return buildMetadata(
    { metaTitle: seo.title, metaDescription: seo.description, ogImage: null },
    { path, fallbackTitle: seo.title, locale },
  );
}

export async function WorkspaceAiAgentsView({ locale }: { locale: Locale }) {
  const copy = WORKSPACE_AI_AGENTS_COPY[locale];
  const chatCopy = AI_CHAT_COPY[locale];
  const t = getT(locale);

  const [rawContent, { data: settings }] = await Promise.all([
    fetchPageDoc<WonkaChatContent>(
      WONKA_CHAT_CONTENT_QUERY,
      "wonkaChatContent",
      locale,
    ),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ]);
  const content = resolveWonkaChatContent(rawContent, null, locale, {
    brandAsWorkspace: true,
  });
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-chat", locale);
  const meetingLabel = resolveMeetingLabel(sharedLinks, locale);

  return (
    <main className="bg-background text-text">
      <ProductHero
        data={{
          eyebrow: copy.hero.eyebrow,
          title: copy.hero.title,
          subtitle: copy.hero.subtitle,
          theme: "light",
          heroImage: null,
          backgroundImage: null,
          secondaryText: null,
          fallbackBackground: null,
          secondaryLink: {
            href: meetingUrl,
            label: copy.hero.secondaryCta,
          },
          fallbackHero: {
            src: WORKSPACE_AI_AGENTS_IMAGES.hero,
            alt: copy.hero.imageAlt,
            width: 1920,
            height: 1080,
          },
        }}
        meetingUrl={meetingUrl}
        meetingLabel={t("common.getStarted")}
        meetingTrackType="wonka-chat"
        secondaryMeetingTrackType="general"
        youtubeId="KTogEQeMcWQ"
        scrollReveal
        locale={locale}
      />
      <ScrollReveal>
        <LogoStrip
          data={getWorkspaceLogoStrip(locale)}
          logoSize="lg"
          marquee
          ariaLabel={t("sections.logoStrip.ariaLabel")}
        />
      </ScrollReveal>
      <Section className="pb-0 pt-14 md:pt-20">
        <ScrollReveal>
          <h2 className={cn(headingClass.section, "max-w-2xl text-text")}>
            {copy.builtForWork.title}
          </h2>
        </ScrollReveal>
      </Section>
      <CapabilityGrid data={getWorkspaceAiAgentsWorkGrid(locale)} className="pb-14 md:pb-20" />
      <WorkspaceAiAgentsWorkflow copy={copy.atWork} />
      <WorkspaceAiAgentsGovernance copy={copy.governance} locale={locale} />
      <WorkspaceAiAgentsImplementation copy={copy.implementation} meetingUrl={meetingUrl} />
      <WorkspaceTrialCta
        href={meetingUrl}
        ctaLabel={t("common.talkToSales")}
        {...(chatCopy.trial ?? {})}
        locale={locale}
      />
      <HomeSecurityBanner
        id="security"
        data={HOME_V2_COPY[locale].security}
      />
      <FaqSection data={content.faq} bordered={false} scrollReveal />
      <ContactBlock
        id="contact"
        data={{
          ...content.contact,
          header: {
            ...resolveSectionHeader(content.contact.header, {
              eyebrow: null,
              heading: chatCopy.contactHeading,
              body: chatCopy.contactBody,
            }),
            heading: chatCopy.contactHeading,
            body: chatCopy.contactBody,
          },
        }}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="wonka-chat"
        className="py-18 text-center md:py-24"
        scrollReveal
        locale={locale}
      />
    </main>
  );
}
