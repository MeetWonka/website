import type { Metadata } from "next";

import { sanityFetch } from "@sanity/lib/live";

import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";

import { WorkspaceGovernancePageSections } from "@/components/sections/workspace-governance/sections";

import type { Locale } from "@/i18n/config";

import { getWorkspaceGovernanceFeatures } from "@/lib/page-defaults/workspace-governance-grid";

import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";

import { buildMetadata } from "@/lib/seo";

import type { SiteSettings } from "@/lib/types";

import { HOME_V2_COPY } from "@/views/copy/home-v2";
import { WORKSPACE_GOVERNANCE_COPY } from "@/views/copy/workspace-governance";



const TRIAL_URL = "https://wonka.chat/register";

const PAGE_PATH = "/workspace/governance";



export async function workspaceGovernanceMetadata(locale: Locale): Promise<Metadata> {

  const { seo } = WORKSPACE_GOVERNANCE_COPY[locale];

  const path = locale === "en" ? PAGE_PATH : `/${locale}${PAGE_PATH}`;

  return buildMetadata(

    { metaTitle: seo.title, metaDescription: seo.description, ogImage: null },

    { path, fallbackTitle: seo.title, locale },

  );

}



export async function WorkspaceGovernanceView({ locale }: { locale: Locale }) {

  const copy = WORKSPACE_GOVERNANCE_COPY[locale];

  const features = getWorkspaceGovernanceFeatures(locale);



  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;

  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-chat", locale);



  return (

    <main className="bg-background text-text">

      <WorkspaceGovernancePageSections

        hero={copy.hero}

        features={features}

        deployment={copy.deployment}

        finalCta={copy.finalCta}

        meetingUrl={meetingUrl}

        trialUrl={TRIAL_URL}

        securityBanner={HOME_V2_COPY[locale].security}


      />

    </main>

  );

}


