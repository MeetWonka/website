import type { Locale } from "@/i18n/config";

import { localizeHref } from "@/i18n/routes";

import { getHomeIntegrationConnectors } from "@/lib/home-integration-tools";

import { AI_CHAT_COPY } from "@/views/copy/ai-chat";



export interface CapabilityGridImage {

  src: string;

  alt: string;

  width: number;

  height: number;

  fit?: "contain" | "cover";

  objectPosition?: string;

  /** Retina asset (2× pixel dimensions). Rendered via `srcSet` — avoids upscaling blur. */
  hiResSrc?: string;

}



export interface CapabilityGridConnector {

  name: string;

  logo: string;

  /** Square app icon (e.g. Monday) instead of a wide wordmark. */
  variant?: "icon";

}



export interface CapabilityGridTextLink {

  label: string;

  href: string;

}



export interface CapabilityGridCard {

  id: string;

  title: string;

  body: string;

  image: CapabilityGridImage | null;

  bodyLinks?: CapabilityGridTextLink[];

  footerLink?: CapabilityGridTextLink;

  connectors?: CapabilityGridConnector[];

}



export interface CapabilityGridCluster {

  heading: string;

  cards: CapabilityGridCard[];

  layout?: "two-top" | "two-bottom" | "workspace-features" | "four-grid";

}



export interface AiChatCapabilityClustersData {

  clusters: CapabilityGridCluster[];

}



const LOGO = "/images/solution/card-3/logos";

/** 5×4 grid on the AI Chat integrations capability card. */
const CONNECTOR_LOGOS: CapabilityGridConnector[] = [
  { name: "Odoo", logo: `${LOGO}/odoo.svg` },
  { name: "SharePoint", logo: "/images/visual/sharepoint.svg" },
  { name: "Microsoft Teams", logo: `${LOGO}/teams.svg` },
  { name: "Outlook", logo: `${LOGO}/outlook.svg` },
  { name: "Salesforce", logo: `${LOGO}/salesforce.svg` },
  { name: "HubSpot", logo: `${LOGO}/hubspot.svg` },
  { name: "Google Drive", logo: `${LOGO}/googledrive.svg` },
  { name: "Jira", logo: `${LOGO}/jira.svg` },
  { name: "Notion", logo: `${LOGO}/notion.svg` },
  { name: "Slack", logo: `${LOGO}/slack.svg` },
  { name: "Gmail", logo: `${LOGO}/gmail.svg` },
  { name: "Excel", logo: `${LOGO}/excel.svg` },
  { name: "Word", logo: `${LOGO}/word.svg` },
  { name: "OneDrive", logo: `${LOGO}/onedrive.svg` },
  { name: "Asana", logo: `${LOGO}/asana.svg` },
  { name: "Monday.com", logo: "/images/home/logos/monday-icon.svg", variant: "icon" },
  { name: "Confluence", logo: `${LOGO}/confluence.svg` },
  { name: "Airtable", logo: `${LOGO}/airtable.svg` },
  { name: "ClickUp", logo: `${LOGO}/clickup.svg` },
  { name: "GitHub", logo: `${LOGO}/github.svg` },
];

/** Homepage tools-section logos used when grid cells flip. */
export const CONNECTOR_LOGO_ALTERNATES: CapabilityGridConnector[] =
  getHomeIntegrationConnectors();



function card(

  id: string,

  title: string,

  body: string,

  extras: Partial<CapabilityGridCard> = {},

): CapabilityGridCard {

  return {

    id,

    title,

    body,

    image: null,

    ...extras,

  };

}



export function getAiChatCapabilityClusters(

  locale: Locale,

): AiChatCapabilityClustersData {

  const copy = AI_CHAT_COPY[locale].capabilities;

  const integrationsHref = localizeHref("/integrations", locale);



  return {

    clusters: [

      {

        heading: copy.connected.heading,

        cards: [

          card("ask-erp", copy.connected.erp.title, copy.connected.erp.body, {

            image: {

              src: "/images/wonka-chat/connect-to-erp.png",

              alt: copy.connected.erp.imageAlt,

              width: 3200,

              height: 1800,

            },

          }),

          card(

            "company-knowledge",

            copy.connected.knowledge.title,

            copy.connected.knowledge.body,

            {

              image: {

                src: "/images/wonka-chat/company_knowledge.png",

                alt: copy.connected.knowledge.imageAlt,

                width: 3200,

                height: 1800,

                fit: "cover",

              },

            },

          ),

          card(

            "every-connector",

            copy.connected.integrations.title,

            copy.connected.integrations.body,

            {

              connectors: CONNECTOR_LOGOS,

              footerLink: {

                label: copy.connected.integrations.footerLink,

                href: integrationsHref,

              },

            },

          ),

        ],

      },

      {

        heading: copy.documents.heading,

        cards: [

          card("build-excel", copy.documents.excel.title, copy.documents.excel.body, {

            image: {

              src: "/images/wonka-chat/build-excel.png",

              alt: copy.documents.excel.imageAlt,

              width: 4000,

              height: 1800,

              fit: "cover",

            },

          }),

          card("write-word", copy.documents.word.title, copy.documents.word.body, {

            image: {

              src: "/images/wonka-chat/word_creation.png",

              alt: copy.documents.word.imageAlt,

              width: 3200,

              height: 1800,

              fit: "cover",

            },

          }),

          card(

            "deck-minutes",

            copy.documents.presentations.title,

            copy.documents.presentations.body,

            {

              image: {

                src: "/images/wonka-chat/presentation-creation.png",

                alt: copy.documents.presentations.imageAlt,

                width: 3200,

                height: 1800,

                fit: "cover",

              },

            },

          ),

        ],

      },

      {

        heading: copy.personalisation.heading,

        cards: [

          card(

            "languages",

            copy.personalisation.languages.title,

            copy.personalisation.languages.body,

            {

              image: {

                src: "/images/wonka-chat/choose-your-language.png",

                alt: copy.personalisation.languages.imageAlt,

                width: 3200,

                height: 1800,

                fit: "cover",

              },

            },

          ),

          card("branding", copy.personalisation.team.title, copy.personalisation.team.body, {

            image: {

              src: "/images/wonka-chat/share-agent.png",

              alt: copy.personalisation.team.imageAlt,

              width: 3200,

              height: 1800,

              fit: "cover",

            },

          }),

          card("your-model", copy.personalisation.models.title, copy.personalisation.models.body, {

            image: {

              src: "/images/wonka-chat/ai-models.png",

              alt: copy.personalisation.models.imageAlt,

              width: 4000,

              height: 1800,

              fit: "cover",

            },

          }),

        ],

      },

    ],

  };

}



/** @deprecated Use `getAiChatCapabilityClusters("en")` — kept for imports that expect a static EN object. */

export const AI_CHAT_CAPABILITY_CLUSTERS = getAiChatCapabilityClusters("en");


