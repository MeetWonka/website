import type {
  AgentDraft,
  AgentTemplate,
  Connector,
  ExecutionStep,
  Member,
  PermissionGrant,
  Skill,
} from "../../../../packages/product-ui/src";
import snapshot from "./templates.snapshot.json";
export const templates = snapshot as AgentTemplate[];
export const connectors: Connector[] = [
  {
    id: "outlook",
    name: "Outlook",
    category: "Communication",
    description:
      "Consultez vos emails et préparez vos réponses depuis votre compte Microsoft.",
    icon: "/images/solution/card-3/logos/outlook.svg",
    state: "connected",
    favorite: true,
  },
  {
    id: "odoo",
    name: "Odoo",
    category: "ERP & CRM",
    description: "Retrouvez vos clients, opportunités et données métier.",
    icon: "/images/solution/card-3/logos/odoo.svg",
    state: "connected",
    managed: true,
    tags: ["Équipe commerciale"],
  },
  {
    id: "sharepoint",
    name: "SharePoint",
    category: "Connaissances",
    description: "Accédez aux documents et méthodes de votre organisation.",
    icon: "/images/visual/sharepoint.svg",
    state: "connected",
    managed: true,
  },
  {
    id: "gmail",
    icon: "/images/solution/card-3/logos/gmail.svg",
    name: "Gmail",
    category: "Communication",
    description: "Connectez votre boîte mail professionnelle.",
    state: "disconnected",
  },
  {
    id: "slack",
    icon: "/images/solution/card-3/logos/slack.svg",
    name: "Slack",
    category: "Communication",
    description: "Retrouvez les échanges utiles de vos canaux.",
    state: "disconnected",
  },
  {
    id: "notion",
    icon: "/images/solution/card-3/logos/notion.svg",
    name: "Notion",
    category: "Connaissances",
    description: "Consultez les pages et bases de votre équipe.",
    state: "expired",
  },
  {
    id: "hubspot",
    icon: "/images/solution/card-3/logos/hubspot.svg",
    name: "HubSpot",
    category: "ERP & CRM",
    description: "Retrouvez le contexte de vos comptes et contacts.",
    state: "configuring",
  },
  {
    id: "drive",
    icon: "/images/solution/card-3/logos/googledrive.svg",
    name: "Google Drive",
    category: "Connaissances",
    description: "Parcourez vos documents de travail.",
    state: "disconnected",
  },
  {
    id: "jira",
    icon: "/images/solution/card-3/logos/jira.svg",
    name: "Jira",
    category: "Projet",
    description: "Consultez les projets, tâches et incidents.",
    state: "error",
  },
  {
    id: "sheets",
    name: "Google Sheets",
    category: "Données",
    description: "Consultez les tableaux et données partagées.",
    icon: "/images/solution/card-3/logos/googlesheets.svg",
    state: "disconnected",
  },
  {
    id: "docs",
    name: "Google Docs",
    category: "Connaissances",
    description: "Lisez les documents et préparez vos livrables.",
    icon: "/images/solution/card-3/logos/googledocs.svg",
    state: "disconnected",
  },
  {
    id: "calendar",
    name: "Google Calendar",
    category: "Communication",
    description: "Retrouvez vos rendez-vous et préparez les réunions.",
    icon: "/images/solution/card-3/logos/googlecalendar.svg",
    state: "disconnected",
  },
  {
    id: "gitlab",
    name: "GitLab",
    category: "Projet",
    description: "Consultez les issues et le contexte des releases.",
    icon: "/images/solution/card-3/logos/gitlab.svg",
    state: "disconnected",
  },
  {
    id: "leexi",
    name: "Leexi",
    category: "Communication",
    description: "Retrouvez les transcriptions et les synthèses de réunions.",
    state: "disconnected",
  },
];
export const skills: Skill[] = [
  {
    id: "client-preparation",
    name: "Préparation client",
    description:
      "Comprendre le contexte, vérifier les écarts et préparer les prochaines actions.",
    instructions:
      "1. Comprendre la demande du client et le périmètre prévu.\n2. Comparer les sources et signaler les informations manquantes.\n3. Proposer trois prochaines actions sans contacter le client.",
    enabled: true,
  },
  {
    id: "evidence",
    name: "Réponse sourcée",
    description: "Appuyer chaque constat sur une source identifiable.",
    instructions:
      "Distinguer les faits des hypothèses. Citer les documents et signaler toute information absente.",
    enabled: true,
  },
  {
    id: "writing",
    name: "Rédaction commerciale",
    description: "Structurer un message clair à relire avant envoi.",
    instructions:
      "Présenter le contexte, une recommandation et une prochaine action. Ne pas envoyer le message.",
    enabled: false,
  },
];
export const briefAgent: AgentDraft = {
  id: "brief-client",
  name: "Brief client",
  description:
    "Prépare les rendez-vous clients. Contexte, écarts, prochaines actions.",
  model: "policy/auto",
  instructions:
    "Tu prépares les rendez-vous commerciaux à partir des sources autorisées. Compare les demandes du client avec le périmètre indiqué dans le CRM. Signale les écarts et les informations manquantes. Ne complète jamais un fait absent. Structure la réponse en Situation, Points à vérifier, Prochaines actions. Ne contacte personne et ne modifie aucun système externe.",
  tools: ["outlook", "odoo", "sharepoint"],
  skills: ["client-preparation", "evidence"],
  starters: [
    "Prépare mon rendez-vous avec Northstar.",
    "Quels points dois-je vérifier avant ce rendez-vous ?",
  ],
  files: [
    {
      id: "method",
      name: "Méthode commerciale.pdf",
      size: "240 Ko",
      state: "ready",
    },
  ],
  capabilities: { artifacts: true, web: false, code: false },
};
export const agents: AgentDraft[] = [
  briefAgent,
  {
    ...briefAgent,
    id: "finance",
    name: "Revue financière",
    description:
      "Vérifie les pièces d’un dossier et relève les points à contrôler.",
    tools: ["odoo"],
    skills: ["evidence"],
  },
  {
    ...briefAgent,
    id: "operations",
    name: "Synthèse des opérations",
    description:
      "Rassemble les priorités et les prochaines actions de l’équipe.",
    tools: ["sharepoint"],
    skills: ["evidence"],
  },
];
export const models = [
  { id: "policy/auto", name: "Sélection automatique", provider: "Wonka" },
  {
    id: "policy/wonkachat-fallback-gpt-5-6-luna",
    name: "Modèle du catalogue public",
    provider: "OpenAI",
  },
];
export const prompt =
  "Crée un agent qui prépare mes rendez-vous clients avec Outlook, Odoo et notre méthode commerciale.";
export const request =
  "Prépare mon rendez-vous avec Northstar. Compare la demande reçue avec le périmètre prévu dans le CRM.";
export const steps: ExecutionStep[] = [
  {
    id: "crm",
    name: "Consulter le contexte CRM",
    source: "Odoo",
    state: "pending",
  },
  {
    id: "emails",
    name: "Lire les derniers échanges",
    source: "Outlook",
    state: "pending",
  },
  {
    id: "method",
    name: "Appliquer la méthode métier",
    source: "Préparation client",
    state: "pending",
  },
];
export const grants: PermissionGrant[] = [
  {
    id: "sales",
    name: "Équipe commerciale",
    kind: "team",
    role: "use",
    selected: true,
  },
  {
    id: "alex",
    name: "Alex Martin",
    kind: "person",
    role: "edit",
    selected: false,
  },
];
export const members: Member[] = [
  {
    id: "camille",
    name: "Camille Martin",
    email: "camille@example.com",
    role: "Admin",
    status: "Actif",
  },
  {
    id: "alex",
    name: "Alex Martin",
    email: "alex@example.com",
    role: "Membre",
    status: "Actif",
  },
  {
    id: "morgan",
    name: "Morgan",
    email: "morgan@example.com",
    role: "Membre",
    status: "Invité",
  },
];
export const outputSections = [
  {
    title: "Situation",
    body: "Le client demande d’inclure trois sites dans la proposition. Le CRM indique que la proposition actuelle couvre un site.",
  },
  {
    title: "Point à vérifier",
    body: "Le périmètre n’est pas aligné. Les sites supplémentaires et leurs besoins restent à confirmer.",
  },
  {
    title: "Prochaines actions",
    body: "1. Confirmer les sites à couvrir.\n2. Ajuster le périmètre de la proposition.\n3. Valider les prochaines étapes pendant le rendez-vous.",
  },
];

export function agentFromTemplate(
  template: AgentTemplate,
  id: string,
): AgentDraft {
  const aliases: Record<string, string> = {
    gitlab_v2: "gitlab",
    jira_v2: "jira",
    gmail_v2: "gmail",
    outlook_v2: "outlook",
    google_drive_v2: "drive",
    google_sheets_v2: "sheets",
    google_docs_v2: "docs",
    google_calendar_v2: "calendar",
    leexi_3: "leexi",
  };
  const toolIds = Array.from(
    new Set([
      ...template.mcp,
      ...(template.mcpServerNames ?? []),
      ...template.tools.filter((t) => !t.includes("_mcp_")),
    ]),
  )
    .filter((t) => !["file_search", "web_search"].includes(t))
    .map((t) => aliases[t] ?? t);
  return {
    id,
    name: template.translations?.title.fr || template.name,
    description: template.translations?.description.fr || template.description,
    instructions: template.instructions ?? "",
    model: template.model,
    tools: toolIds,
    skills: [],
    files: [],
    starters: template.capabilities.conversation_starters,
    capabilities: {
      artifacts: template.capabilities.artifacts !== "off",
      web: template.tools.includes("web_search"),
      code: false,
    },
  };
}
