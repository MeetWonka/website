export interface ConnectedTool {
  name: string;
  domain: string;
  iconUrl?: string;
}

const connectorIcon = (filename: string) =>
  `https://stwonkachatpweu001.blob.core.windows.net/mcp-logo/${filename}`;

const tools = {
  airtable: {
    name: "Airtable",
    domain: "airtable.com",
    iconUrl: connectorIcon("airtable.svg"),
  },
  asana: {
    name: "Asana",
    domain: "asana.com",
    iconUrl: connectorIcon("asana.svg"),
  },
  azure: { name: "Azure AI", domain: "azure.com" },
  box: { name: "Box", domain: "box.com", iconUrl: connectorIcon("box.svg") },
  confluence: {
    name: "Confluence",
    domain: "atlassian.com",
    iconUrl: connectorIcon("confluence.svg"),
  },
  dynamics: {
    name: "Dynamics 365",
    domain: "dynamics.microsoft.com",
    iconUrl: connectorIcon("Dynamics365.svg.png"),
  },
  github: {
    name: "GitHub",
    domain: "github.com",
    iconUrl: connectorIcon("github.svg"),
  },
  googleDrive: {
    name: "Google Drive",
    domain: "drive.google.com",
    iconUrl: connectorIcon("google_drive.png"),
  },
  hubspot: {
    name: "HubSpot",
    domain: "hubspot.com",
    iconUrl: connectorIcon("hubspot.svg"),
  },
  jira: {
    name: "Jira",
    domain: "jira.com",
    iconUrl: connectorIcon("jira.svg"),
  },
  notion: {
    name: "Notion",
    domain: "notion.so",
    iconUrl: connectorIcon("notion.svg"),
  },
  odoo: {
    name: "Odoo ERP",
    domain: "odoo.com",
    iconUrl: connectorIcon("odoo.png"),
  },
  oneDrive: {
    name: "OneDrive",
    domain: "onedrive.com",
    iconUrl: connectorIcon("onedrive.svg"),
  },
  outlook: {
    name: "Outlook",
    domain: "outlook.com",
    iconUrl: connectorIcon("outlook.svg"),
  },
  salesforce: {
    name: "Salesforce",
    domain: "salesforce.com",
    iconUrl: connectorIcon("salesforce.svg"),
  },
  sap: { name: "SAP", domain: "sap.com" },
  sharePoint: {
    name: "SharePoint",
    domain: "sharepoint.com",
    iconUrl: connectorIcon("sharepoint.png"),
  },
  slack: {
    name: "Slack",
    domain: "slack.com",
    iconUrl: connectorIcon("slack.svg"),
  },
  teams: {
    name: "Microsoft Teams",
    domain: "teams.microsoft.com",
    iconUrl: connectorIcon("microsoft_teams.svg"),
  },
} satisfies Record<string, ConnectedTool>;

const toolRules: Array<[RegExp, ConnectedTool]> = [
  [/\bshare\s?point\b/i, tools.sharePoint],
  [/\bodoo\b/i, tools.odoo],
  [/\bsap\b/i, tools.sap],
  [/\bdynamics\b/i, tools.dynamics],
  [/\bsalesforce\b/i, tools.salesforce],
  [/\bhubspot\b/i, tools.hubspot],
  [/\b(outlook|e-?mail|mailbox|inbound mail|calendar)\b/i, tools.outlook],
  [/\bteams\b/i, tools.teams],
  [/\bslack\b/i, tools.slack],
  [/\bjira\b/i, tools.jira],
  [/\bconfluence\b/i, tools.confluence],
  [/\bgoogle drive\b/i, tools.googleDrive],
  [/\bone\s?drive\b/i, tools.oneDrive],
  [/\bgithub\b/i, tools.github],
  [/\bairtable\b/i, tools.airtable],
  [/\basana\b/i, tools.asana],
  [/\bnotion\b/i, tools.notion],
  [/\bbox\b/i, tools.box],
  [
    /\b(erp|enterprise resource|inventory|accounting|finance system)\b/i,
    tools.odoo,
  ],
  [
    /\b(crm|sales pipeline|customer relationship|account workspace)\b/i,
    tools.salesforce,
  ],
  [
    /\b(document|repository|knowledge|procedure|policy|template library)\b/i,
    tools.sharePoint,
  ],
  [/\b(project|task|work management)\b/i, tools.asana],
  [
    /\b(code|source control|configuration|api|integration catalogue|integration catalog)\b/i,
    tools.github,
  ],
  [/\b(workflow|approval|collaboration|meeting)\b/i, tools.teams],
  [/\b(notification|alert|chat interface|feedback)\b/i, tools.slack],
  [/\b(form|database|structured record)\b/i, tools.airtable],
  [
    /\b(ai platform|language model|generation layer|secure enterprise platform)\b/i,
    tools.azure,
  ],
  [/\b(file|drive|storage)\b/i, tools.oneDrive],
];

const fallbackTools = [
  tools.sharePoint,
  tools.odoo,
  tools.teams,
  tools.salesforce,
  tools.slack,
  tools.airtable,
];

function stableIndex(value: string, length: number) {
  const hash = Array.from(value).reduce(
    (total, character) => (total * 31 + character.charCodeAt(0)) >>> 0,
    0,
  );
  return hash % length;
}

export function resolveConnectedTools(values: string[]): ConnectedTool[] {
  const resolved = values.map((value) => {
    const match = toolRules.find(([pattern]) => pattern.test(value));
    return (
      match?.[1] ?? fallbackTools[stableIndex(value, fallbackTools.length)]
    );
  });

  return resolved.filter(
    (tool, index) =>
      resolved.findIndex((candidate) => candidate.name === tool.name) === index,
  );
}
