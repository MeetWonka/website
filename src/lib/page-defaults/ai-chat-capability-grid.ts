export interface CapabilityGridImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit?: "contain" | "cover";
}

export interface CapabilityGridConnector {
  name: string;
  logo: string;
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
}

export interface AiChatCapabilityClustersData {
  clusters: CapabilityGridCluster[];
}

const CONNECTOR_LOGOS: CapabilityGridConnector[] = [
  { name: "Odoo", logo: "/images/solution/card-3/logos/odoo.svg" },
  { name: "SharePoint", logo: "/images/visual/sharepoint.svg" },
  { name: "Microsoft Teams", logo: "/images/solution/card-3/logos/teams.svg" },
  { name: "Outlook", logo: "/images/solution/card-3/logos/outlook.svg" },
  { name: "Salesforce", logo: "/images/solution/card-3/logos/salesforce.svg" },
  { name: "HubSpot", logo: "/images/solution/card-3/logos/hubspot.svg" },
  { name: "Google Drive", logo: "/images/solution/card-3/logos/googledrive.svg" },
  { name: "Jira", logo: "/images/solution/card-3/logos/jira.svg" },
  { name: "Notion", logo: "/images/solution/card-3/logos/notion.svg" },
];

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

export const AI_CHAT_CAPABILITY_CLUSTERS: AiChatCapabilityClustersData = {
  clusters: [
    {
      heading: "Connected to all your internal systems.",
      cards: [
        card(
          "ask-erp",
          "Ask your ERP",
          "Open orders, margins and invoices from Odoo, in plain language.",
          {
            image: {
              src: "/images/wonka-chat/connect-to-erp.png",
              alt: "Ask your ERP in Wonka AI chat",
              width: 3200,
              height: 1800,
            },
            bodyLinks: [{ label: "Odoo", href: "/integrations/odoo" }],
          },
        ),
        card(
          "company-knowledge",
          "Company knowledge",
          "Answers come from your own documents, not the internet.",
          {
            image: {
              src: "/images/wonka-chat/company_knowledge.png",
              alt: "Company knowledge in Wonka AI chat",
              width: 3200,
              height: 1800,
              fit: "cover",
            },
          },
        ),
        card(
          "every-connector",
          "Every connector",
          "Odoo, SharePoint, Teams, Outlook, Salesforce, HubSpot, Google Drive, Jira, Notion and more.",
          {
            connectors: CONNECTOR_LOGOS,
            footerLink: {
              label: "View all integrations",
              href: "/integrations",
            },
          },
        ),
      ],
    },
    {
      heading: "From chat to documents.",
      cards: [
        card(
          "build-excel",
          "Build the Excel",
          "Ask for the numbers, get back a working spreadsheet.",
          {
            image: {
              src: "/images/wonka-chat/build-excel.png",
              alt: "Build an Excel spreadsheet with Wonka AI chat",
              width: 4000,
              height: 1800,
              fit: "cover",
            },
          },
        ),
        card(
          "write-word",
          "Write and edit in Word",
          "Draft, rewrite and correct documents without leaving the chat.",
          {
            image: {
              src: "/images/wonka-chat/word_creation.png",
              alt: "Write and edit in Word with Wonka AI chat",
              width: 3200,
              height: 1800,
              fit: "cover",
            },
          },
        ),
        card(
          "deck-minutes",
          "Deck in minutes",
          "Turn a summary into a PowerPoint. Generate the images too.",
          {
            image: {
              src: "/images/wonka-chat/presentation-creation.png",
              alt: "Create a presentation in minutes with Wonka AI chat",
              width: 3200,
              height: 1800,
              fit: "cover",
            },
          },
        ),
      ],
    },
    {
      heading: "Safe and customized for you.",
      cards: [
        card(
          "languages",
          "Dutch, French and English",
          "One workspace, three languages, the same answer.",
          {
            image: {
              src: "/images/wonka-chat/choose-your-language.png",
              alt: "Choose your language in Wonka AI chat",
              width: 3200,
              height: 1800,
              fit: "cover",
            },
          },
        ),
        card(
          "branding",
          "Work as a team",
          "Share a chat, a prompt or an agent with your department.",
          {
            image: {
              src: "/images/wonka-chat/share-agent.png",
              alt: "Share an agent with your team in Wonka AI chat",
              width: 3200,
              height: 1800,
              fit: "cover",
            },
          },
        ),
        card(
          "your-model",
          "Your model",
          "Every leading model, hosted in Europe. Or connect your own.",
          {
            image: {
              src: "/images/wonka-chat/ai-models.png",
              alt: "Choose your AI model in Wonka AI chat",
              width: 4000,
              height: 1800,
              fit: "cover",
            },
          },
        ),
      ],
    },
  ],
};
