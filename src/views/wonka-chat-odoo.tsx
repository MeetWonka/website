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
import type { Locale } from "@/i18n/config";
import { commercialPath } from "@/i18n/routes";
import { getT } from "@/i18n/ui";
import { fetchPageDoc, resolveMeetingLabel } from "@/lib/localized-content";
import { getPageDefaults } from "@/lib/page-defaults/localized";
import { resolveWonkaChatOdooContent } from "@/lib/page-defaults/resolve-pages";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildCommercialMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import type { SiteSettings, WonkaChatOdooContent } from "@/lib/types";

async function getRawContent(locale: Locale) {
  return fetchPageDoc<WonkaChatOdooContent>(
    WONKA_CHAT_ODOO_CONTENT_QUERY,
    "wonkaChatOdooContent",
    locale,
  );
}

export async function wonkaChatOdooMetadata(locale: Locale): Promise<Metadata> {
  const content = resolveWonkaChatOdooContent(await getRawContent(locale), locale);
  return buildCommercialMetadata(
    content.seo,
    "wonkaChatOdoo",
    locale,
    getPageDefaults(locale).wonkaChatOdoo.seo.metaTitle ??
      "WonkaChat for Odoo · AI on your ERP | Wonka",
  );
}

export async function WonkaChatOdooView({ locale }: { locale: Locale }) {
  const siteUrl = getSiteUrl();
  const t = getT(locale);
  const [{ data: settings }, rawContent] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    getRawContent(locale),
  ]);
  const content = resolveWonkaChatOdooContent(rawContent, locale);
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-chat", locale);
  const meetingLabel = resolveMeetingLabel(sharedLinks, locale);
  const homeUrl = `${siteUrl}${locale === "en" ? "" : commercialPath("home", locale)}`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: t("common.home"), url: homeUrl },
          { name: "WonkaChat", url: `${siteUrl}${commercialPath("wonkaChat", locale)}` },
          { name: "Odoo", url: `${siteUrl}${commercialPath("wonkaChatOdoo", locale)}` },
        ]}
      />

      <main className="bg-background text-text">
        <ProductHero data={content.hero} leadForm="wonka-chat-odoo-hero" locale={locale} />
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
          defaults={getPageDefaults(locale).wonkaChatSecurity}
          locale={locale}
        />
        <ContactBlock
          id="contact"
          data={content.contact}
          meetingUrl={meetingUrl}
          meetingLabel={meetingLabel}
          meetingTrackType="wonka-chat"
          className="py-18 text-center md:py-24"
          locale={locale}
        />
      </main>

      <Cta
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="wonka-chat"
        locale={locale}
      />
    </>
  );
}
