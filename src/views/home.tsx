import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { HOMEPAGE_CONTENT_QUERY, SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { HomepageHeroExperiment } from "@/components/sections/homepage-hero-experiment";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Stats } from "@/components/sections/stats";
import { UseCases } from "@/components/sections/use-cases";
import { Security } from "@/components/sections/security";
import { HowToStart } from "@/components/sections/how-to-start";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/ui";
import { fetchPageDoc, resolveMeetingLabel } from "@/lib/localized-content";
import { getPageDefaults } from "@/lib/page-defaults/localized";
import { resolveOptionalString } from "@/lib/resolve-cms";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildCommercialMetadata } from "@/lib/seo";
import type { HomepageContent, SeoData, SiteSettings } from "@/lib/types";

function getHomepageContent(locale: Locale) {
  return fetchPageDoc<HomepageContent>(HOMEPAGE_CONTENT_QUERY, "homepageContent", locale);
}

export async function homeMetadata(locale: Locale): Promise<Metadata> {
  const content = await getHomepageContent(locale);
  // EN keeps its Sanity SEO (buildMetadata falls back to the home title).
  // Translated homes fall back field by field to the UI dictionary.
  let seo: SeoData | null = content?.seo ?? null;
  if (locale !== "en") {
    const t = getT(locale);
    seo = {
      metaTitle: resolveOptionalString(seo?.metaTitle, t("home.seo.metaTitle")),
      metaDescription: resolveOptionalString(
        seo?.metaDescription,
        t("home.seo.metaDescription"),
      ),
      ogImage: seo?.ogImage ?? null,
    };
  }
  return buildCommercialMetadata(seo, "home", locale);
}

export async function HomeView({ locale }: { locale: Locale }) {
  const [content, { data: settings }] = await Promise.all([
    getHomepageContent(locale),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ]);
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "default", locale);
  const meetingLabel = resolveMeetingLabel(sharedLinks, locale);
  const defaults = getPageDefaults(locale);

  return (
    <>
      <HomepageHeroExperiment
        locale={locale}
        data={content?.hero ?? null}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
      />
      <Problem id="problem" />
      <Solution id="solution" data={content?.solution ?? null} />
      <Stats id="stats" />
      <HowItWorks
        id="how-it-works"
        data={content?.whatWeDo ?? null}
        sharedLinks={sharedLinks}
      />
      <UseCases
        id="use-cases"
        data={content?.useCases ?? null}
        defaults={defaults.useCases}
      />
      <HowToStart
        id="how-to-start"
        data={content?.howToStart ?? null}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
      />
      <Security
        id="security"
        data={content?.security ?? null}
        defaults={defaults.security}
        locale={locale}
      />
      <Testimonials id="testimonials" locale={locale} />
      <Cta
        id="get-started"
        data={content?.cta ?? null}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="general"
        locale={locale}
      />
    </>
  );
}
