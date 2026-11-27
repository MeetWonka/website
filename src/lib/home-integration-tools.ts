import type { DepartmentId } from "@/views/copy/home-v2";

export type IntegrationConnector = {
  name: string;
  logo: string;
  variant?: "icon";
};

export type HomeTool = {
  name: string;
  src?: string;
  iconClassName?: string;
};

export const HOME_LOGO_BASE = "/images/home/logos";
export const MCP_INTEGRATIONS_BASE = "/images/mcp-integrations";

const LOGO = HOME_LOGO_BASE;
const MCP = MCP_INTEGRATIONS_BASE;

export const DEPARTMENT_TOOLS: Record<DepartmentId, HomeTool[]> = {
  sales: [
    { name: "Pipedrive", src: `${LOGO}/pipedrive.png` },
    { name: "HubSpot", src: `${LOGO}/hubspot.svg` },
    { name: "Salesforce", src: `${LOGO}/salesforce.svg` },
    { name: "Leexi", src: `${LOGO}/leexi.svg` },
    { name: "Attio", src: `${LOGO}/attio.svg` },
    { name: "Close", src: `${LOGO}/close.svg` },
  ],
  marketing: [
    { name: "Instagram", src: `${LOGO}/instagram.png` },
    { name: "Facebook", src: `${LOGO}/facebook.png` },
    { name: "Meta Ads", src: `${MCP}/meta-ads.jpg` },
    { name: "Google Ads", src: `${MCP}/google-ads.png` },
    { name: "Brevo", src: `${MCP}/brevo.jpg` },
    { name: "Klaviyo", src: `${LOGO}/klaviyo.svg` },
  ],
  finance: [
    { name: "Odoo", src: `${LOGO}/odoo.svg` },
    { name: "Horus", src: `${LOGO}/horus.png` },
    { name: "QuickBooks", src: `${LOGO}/quickbooks.png` },
    { name: "Zoho Books", src: `${LOGO}/zoho-books.png` },
    { name: "Excel", src: `${LOGO}/excel.svg` },
    { name: "Stripe", src: `${MCP}/stripe.webp` },
  ],
  hr: [
    { name: "Stafiz", src: `${LOGO}/stafiz.png` },
    { name: "Greenhouse", src: `${MCP}/greenhouse.svg` },
    { name: "Odoo", src: `${LOGO}/odoo.svg` },
    { name: "Leexi", src: `${LOGO}/leexi.svg` },
    { name: "Dynamics 365", src: `${MCP}/dynamics-365.png` },
    { name: "LinkedIn", src: `${MCP}/linkedin.svg` },
  ],
  operations: [
    { name: "Jira", src: `${LOGO}/jira.svg` },
    { name: "Asana", src: `${LOGO}/asana.svg` },
    {
      name: "monday.com",
      src: `${LOGO}/monday-icon.svg`,
      iconClassName: "size-8 md:size-9",
    },
    { name: "Odoo", src: `${LOGO}/odoo.svg` },
    { name: "Stafiz", src: `${LOGO}/stafiz.png` },
    { name: "Linear", src: `${MCP}/linear.svg` },
  ],
  support: [
    { name: "Zendesk", src: `${MCP}/zendesk.svg` },
    { name: "Intercom", src: `${MCP}/intercom.png` },
    { name: "WhatsApp", src: `${MCP}/whatsapp.webp` },
    { name: "Outlook", src: `${LOGO}/outlook.svg` },
    { name: "Gmail", src: `${LOGO}/gmail.svg` },
    { name: "Aircall", src: `${LOGO}/aircall.svg` },
  ],
};

export const EVERYDAY_TOOL_ROWS: HomeTool[][] = [
  [
    { name: "Outlook", src: `${LOGO}/outlook.svg` },
    { name: "Teams", src: `${LOGO}/teams.svg` },
    { name: "SharePoint", src: `${LOGO}/sharepoint.svg` },
    { name: "OneDrive", src: `${LOGO}/onedrive.svg` },
    { name: "Gmail", src: `${LOGO}/gmail.svg` },
    { name: "Google Drive", src: `${LOGO}/googledrive.svg` },
    { name: "Google Sheets", src: `${LOGO}/googlesheets.svg` },
    { name: "Google Calendar", src: `${LOGO}/googlecalendar.svg` },
    { name: "Slack", src: `${LOGO}/slack.svg` },
    { name: "Notion", src: `${LOGO}/notion.svg` },
    { name: "Confluence", src: `${MCP}/confluence.svg` },
    { name: "Dropbox", src: `${MCP}/dropbox.svg` },
  ],
  [
    { name: "HubSpot", src: `${LOGO}/hubspot.svg` },
    { name: "Salesforce", src: `${LOGO}/salesforce.svg` },
    { name: "Jira", src: `${LOGO}/jira.svg` },
    { name: "Asana", src: `${LOGO}/asana.svg` },
    {
      name: "monday.com",
      src: `${LOGO}/monday-icon.svg`,
      iconClassName: "size-8 md:size-9",
    },
    { name: "Linear", src: `${MCP}/linear.svg` },
    { name: "Trello", src: `${MCP}/trello.svg` },
    { name: "Airtable", src: `${MCP}/airtable.svg` },
    { name: "Zoom", src: `${MCP}/zoom.svg` },
    { name: "Miro", src: `${MCP}/miro.png` },
    { name: "Canva", src: `${MCP}/canva.png` },
    { name: "GitHub", src: `${MCP}/github.svg` },
  ],
];

function isMonday(name: string) {
  return name.toLowerCase().includes("monday");
}

export function homeToolToConnector(tool: HomeTool): IntegrationConnector | null {
  if (!tool.src) {
    return null;
  }
  return {
    name: tool.name,
    logo: tool.src,
    ...(isMonday(tool.name) ? { variant: "icon" as const } : {}),
  };
}

export function dedupeConnectorsByName(
  connectors: IntegrationConnector[],
): IntegrationConnector[] {
  const seen = new Set<string>();
  return connectors.filter((c) => {
    const key = c.name.trim().toLowerCase();
    if (!c.logo || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/** All integration logos from the homepage tools section (deduped). */
export function getHomeIntegrationConnectors(): IntegrationConnector[] {
  const tools = [
    ...Object.values(DEPARTMENT_TOOLS).flat(),
    ...EVERYDAY_TOOL_ROWS.flat(),
  ];
  const connectors = tools
    .map(homeToolToConnector)
    .filter((c): c is IntegrationConnector => c !== null);
  return dedupeConnectorsByName(connectors);
}

export function buildConnectorFlipPool(
  gridItems: IntegrationConnector[],
): IntegrationConnector[] {
  return dedupeConnectorsByName([
    ...gridItems,
    ...getHomeIntegrationConnectors(),
  ]);
}
