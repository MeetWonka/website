import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY, START_AI_CONTENT_QUERY } from "@sanity/lib/queries";
import { ContactBlock } from "@/components/sections/contact-block";
import { StartAiSubsidizedFlandersLogoStrip } from "@/components/sections/start-ai-subsidized-flanders/logo-strip";
import { StartAiSubsidizedFlandersHero } from "@/components/sections/start-ai-subsidized-flanders/hero";
import { StartAiSubsidizedFlandersJourney } from "@/components/sections/start-ai-subsidized-flanders/journey";
import {
  StartAiSubsidizedFlandersProgramDelivery,
  StartAiSubsidizedFlandersProgramOverview,
} from "@/components/sections/start-ai-subsidized-flanders/program-overview";
import { StartAiSubsidizedFlandersReviewVideo } from "@/components/sections/start-ai-subsidized-flanders/review-video";
import { StartAiSubsidizedFlandersSubsidyPopup } from "@/components/sections/start-ai-subsidized-flanders/subsidy-popup";
import { resolveStartAiContent } from "@/lib/page-defaults/resolve-pages";
import { buildMetadata } from "@/lib/seo";
import type { SiteSettings, StartAiContent } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/services/start-ai-subsidized-flanders";

const FLANDERS_MEETING_URL =
  "https://outlook.office.com/bookwithme/user/58f423924e0a4408be133c904198e953@meetwonka.com/meetingtype/6Mql1x37YECWsmIDQ6fK6Q2?anonymous&ismsaljsauthenabled&ep=mLinkFromTile";

async function getStartAiContent() {
  const { data } = await sanityFetch({ query: START_AI_CONTENT_QUERY });
  return resolveStartAiContent((data as StartAiContent | null) ?? null);
}

async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data as SiteSettings | null;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(
    {
      metaTitle: "Start AI met 70% subsidie in Vlaanderen | Wonka",
      metaDescription:
        "Vlaamse KMO's kunnen tot 70% subsidie krijgen op Start AI via de VLAIO KMO-portefeuille. Ontdek het programma en plan een gesprek met Wonka.",
      ogImage: null,
    },
    {
      path: pagePath,
      fallbackTitle: "Start AI met 70% subsidie in Vlaanderen | Wonka",
    },
  );
}

export default async function StartAiSubsidizedFlandersPage() {
  const [content, settings] = await Promise.all([
    getStartAiContent(),
    getSiteSettings(),
  ]);
  const { contact } = content;
  const sharedLinks = settings?.sharedLinks ?? null;
  const meetingLabel = sharedLinks?.meetingLabel ?? null;

  return (
    <main lang="nl-BE" className="bg-background text-text">
      <StartAiSubsidizedFlandersHero />
      <StartAiSubsidizedFlandersLogoStrip />
      <StartAiSubsidizedFlandersProgramOverview />
      <StartAiSubsidizedFlandersProgramDelivery />
      <StartAiSubsidizedFlandersReviewVideo />
      <StartAiSubsidizedFlandersJourney />
      <ContactBlock
        id="contact"
        data={{
          ...contact,
          personRole: "Partner, Wonka",
          header: contact.header
            ? {
                ...contact.header,
                eyebrow: "Neem contact op",
                heading: "Meer info over Start AI?",
                body: null,
              }
            : null,
        }}
        meetingUrl={FLANDERS_MEETING_URL}
        meetingLabel={meetingLabel ?? "Plan een gesprek van 30 min"}
        meetingTrackType="start-ai"
        email="jordy@meetwonka.com"
        phone="+32 496 83 95 28"
        className="py-24"
      />
      <StartAiSubsidizedFlandersSubsidyPopup />
    </main>
  );
}
