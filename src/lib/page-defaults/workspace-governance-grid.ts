import type { Locale } from "@/i18n/config";

import { WORKSPACE_GOVERNANCE_IMAGES } from "@/lib/workspace-governance-images";

import { WORKSPACE_GOVERNANCE_COPY } from "@/views/copy/workspace-governance";



export interface GovernanceFeatureCard {

  id: string;

  title: string;

  body: string;

  imageSrc: string;

  imageAlt: string;

  imageFit?: "contain" | "cover";

  objectPosition?: string;

}



export function getWorkspaceGovernanceFeatures(locale: Locale): {

  heading: string;

  cards: GovernanceFeatureCard[];

} {

  const copy = WORKSPACE_GOVERNANCE_COPY[locale].features;



  return {

    heading: copy.heading,

    cards: [

      {

        id: "access",

        title: copy.cards.access.title,

        body: copy.cards.access.body,

        imageSrc: WORKSPACE_GOVERNANCE_IMAGES.access,

        imageAlt: copy.cards.access.imageAlt,

        imageFit: "contain",

      },

      {

        id: "usage",

        title: copy.cards.usage.title,

        body: copy.cards.usage.body,

        imageSrc: WORKSPACE_GOVERNANCE_IMAGES.usage,

        imageAlt: copy.cards.usage.imageAlt,

        imageFit: "contain",

      },

      {

        id: "agents",

        title: copy.cards.agents.title,

        body: copy.cards.agents.body,

        imageSrc: WORKSPACE_GOVERNANCE_IMAGES.agents,

        imageAlt: copy.cards.agents.imageAlt,

        imageFit: "contain",

      },

      {

        id: "shared-rules",

        title: copy.cards.sharedRules.title,

        body: copy.cards.sharedRules.body,

        imageSrc: WORKSPACE_GOVERNANCE_IMAGES.sharedRules,

        imageAlt: copy.cards.sharedRules.imageAlt,

        imageFit: "contain",

      },

    ],

  };

}


