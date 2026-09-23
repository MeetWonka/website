import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { sanityFetch } from "@sanity/lib/live";
import {
  HOMEPAGE_CONTENT_QUERY,
  SITE_SETTINGS_QUERY,
} from "@sanity/lib/queries";
import type { HomepageContent, SiteSettings } from "@/lib/types";
import { buildMetadata } from "@/lib/seo";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
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

export const dynamic = "force-static";

async function getHomepageContent() {
  const { data } = await sanityFetch({ query: HOMEPAGE_CONTENT_QUERY });
  return data as HomepageContent | null;
}

async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data as SiteSettings | null;
}

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([
    getHomepageContent(),
    getLocale(),
  ]);
  const path = locale === "en" ? "/" : `/${locale}`;
  return buildMetadata(content?.seo ?? null, {
    path,
    locale,
    hreflang: "home",
  });
}

export default async function Home() {
  const [content, settings] = await Promise.all([
    getHomepageContent(),
    getSiteSettings(),
  ]);
  const sharedLinks = settings?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "default");
  const meetingLabel = sharedLinks?.meetingLabel ?? null;

  return (
    <>
      <HomepageHeroExperiment
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
      <UseCases id="use-cases" data={content?.useCases ?? null} />
      <HowToStart
        id="how-to-start"
        data={content?.howToStart ?? null}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
      />
      <Security id="security" data={content?.security ?? null} />
      <Testimonials id="testimonials" />
      <Cta
        id="get-started"
        data={content?.cta ?? null}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="general"
      />
    </>
  );
}
