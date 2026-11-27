import type { Locale } from "@/i18n/config";
import { commercialPath, landingPath, localizeHref } from "@/i18n/routes";
import { itemPath } from "@/lib/locale-path";

/**
 * Editorial topics for blog articles and glossary terms. Each topic decides
 * the article's cover, the product visual inserted in the body, and the
 * money pages it links to — so every article feeds the landing pages
 * without editing its content in Sanity.
 */
export type ArticleTopic =
  | "agentic"
  | "competitors"
  | "roi"
  | "model"
  | "copilot"
  | "odoo"
  | "knowledge"
  | "governance";

export interface ArticleImage {
  src: string;
  width: number;
  height: number;
}

export interface TopicLink {
  href: string;
  label: string;
  description: string;
}

const COVER = {
  path: { src: "/images/hero-bg.avif", width: 2880, height: 1620 },
  fields: { src: "/images/start-ai/hero.jpg", width: 1920, height: 1080 },
  waterfall: { src: "/images/start-ai/wonka-waterfall.png", width: 1536, height: 1024 },
  wheat: { src: "/images/wonka-build/hero-bg.png", width: 1264, height: 848 },
  river: { src: "/images/wonka-build/promo-bg.avif", width: 2688, height: 1040 },
  valley: { src: "/images/CTA/cta-bg.avif", width: 3000, height: 735 },
} satisfies Record<string, ArticleImage>;

const SHOT = {
  agents: { src: "/images/wonka-chat/create-ai-agents-for-specific-tasks.png", width: 1920, height: 1080 },
  excel: { src: "/images/wonka-chat/build-excel.png", width: 4600, height: 1800 },
  models: { src: "/images/wonka-chat/ai-models.png", width: 4600, height: 1800 },
  erp: { src: "/images/wonka-chat/connect-to-erp.png", width: 3200, height: 1800 },
  tools: { src: "/images/wonka-chat/feature-tools.png", width: 1920, height: 1080 },
  workspace: { src: "/images/wonka-chat/wonka-ai-chat-header.png", width: 3840, height: 2160 },
  knowledge: { src: "/images/wonka-chat/company_knowledge.png", width: 3200, height: 1800 },
} satisfies Record<string, ArticleImage>;

type L10n = Record<Locale, string>;

interface TopicConfig {
  cover: ArticleImage;
  shot: ArticleImage;
  /** Caption and title of the product card inserted in the body. */
  productTitle: L10n;
  productBody: L10n;
  /** Where the product card and the article's main CTA send readers. */
  productHref: (locale: Locale) => string;
  /** "Go further" links, in priority order (missing locales are skipped). */
  links: (locale: Locale) => (TopicLink | null)[];
}

const L = (en: string, fr: string, nl: string): L10n => ({ en, fr, nl });

function landing(page: Parameters<typeof landingPath>[0], locale: Locale, label: L10n, description: L10n): TopicLink | null {
  const href = landingPath(page, locale);
  return href ? { href, label: label[locale], description: description[locale] } : null;
}

function page(href: string, locale: Locale, label: L10n, description: L10n): TopicLink {
  return { href: localizeHref(href, locale), label: label[locale], description: description[locale] };
}

function glossary(slug: string, locale: Locale, label: L10n, description: L10n): TopicLink {
  return { href: itemPath("glossary", locale, slug), label: label[locale], description: description[locale] };
}

const T = {
  wonkaChat: [L("WonkaChat", "WonkaChat", "WonkaChat"), L("The private AI workspace for your whole company.", "L'espace de travail IA privé pour toute l'entreprise.", "De private AI-werkplek voor uw hele organisatie.")] as const,
  startAi: [L("Start AI", "Start AI", "Start AI"), L("Your AI strategy and roadmap in weeks.", "Votre stratégie et votre feuille de route IA en quelques semaines.", "Uw AI-strategie en roadmap in enkele weken.")] as const,
  wonkaBuild: [L("Wonka Build", "Wonka Build", "Wonka Build"), L("Custom AI applications built on your systems.", "Des applications IA sur mesure, sur vos systèmes.", "AI-toepassingen op maat, op uw systemen.")] as const,
  aiAgents: [L("AI agents", "Agents IA", "AI-agents"), L("Private agents connected to your business tools.", "Des agents privés connectés à vos outils métier.", "Private agents gekoppeld aan uw bedrijfstools.")] as const,
  security: [L("Security & compliance", "Sécurité et conformité", "Beveiliging en compliance"), L("ISO 27001, GDPR, NIS 2, hosted in Azure West Europe.", "ISO 27001, RGPD, NIS 2, hébergé dans Azure West Europe.", "ISO 27001, AVG, NIS 2, gehost in Azure West Europe.")] as const,
  pricing: [L("Pricing", "Tarifs", "Prijzen"), L("Per-seat pricing, 7-day free trial.", "Tarif par utilisateur, essai gratuit de 7 jours.", "Prijs per gebruiker, 7 dagen gratis proberen.")] as const,
  odoo: [L("WonkaChat for Odoo", "WonkaChat pour Odoo", "WonkaChat voor Odoo"), L("AI agents that read and act in your ERP.", "Des agents IA qui lisent et agissent dans votre ERP.", "AI-agents die lezen en handelen in uw ERP.")] as const,
  odooIntegration: [L("Odoo integration", "Intégration Odoo", "Odoo-integratie"), L("What the Odoo connector can do.", "Ce que permet le connecteur Odoo.", "Wat de Odoo-connector kan.")] as const,
  integrations: [L("All integrations", "Toutes les intégrations", "Alle integraties"), L("SharePoint, Outlook, Teams, Salesforce, HubSpot and more.", "SharePoint, Outlook, Teams, Salesforce, HubSpot et plus.", "SharePoint, Outlook, Teams, Salesforce, HubSpot en meer.")] as const,
  chatgpt: [L("ChatGPT for business", "ChatGPT entreprise", "ChatGPT voor bedrijven"), L("A private, EU-hosted alternative for your teams.", "Une alternative privée, hébergée en Europe, pour vos équipes.", "Een privé alternatief, gehost in de EU, voor uw teams.")] as const,
  aiForBusiness: [L("AI for business", "IA pour entreprise", "AI voor bedrijven"), L("Where to start and what to deploy first.", "Par où commencer et quoi déployer en premier.", "Waar beginnen en wat eerst uitrollen.")] as const,
  consultancy: [L("AI consultancy", "Agence IA", "AI-consultancy"), L("From strategy to agents in production.", "De la stratégie aux agents en production.", "Van strategie tot agents in productie.")] as const,
  comparatif: [L("Enterprise AI comparison", "Comparatif IA entreprise", "Vergelijking enterprise AI"), L("ChatGPT, Claude, Gemini, Copilot and Le Chat compared.", "ChatGPT, Claude, Gemini, Copilot et Le Chat comparés.", "ChatGPT, Claude, Gemini, Copilot en Le Chat vergeleken.")] as const,
  audit: [L("AI audit", "Audit IA", "AI-audit"), L("Assess, prioritise, plan.", "Évaluer, prioriser, planifier.", "Beoordelen, prioriteren, plannen.")] as const,
  shadowAi: [L("Shadow AI", "Shadow AI", "Shadow AI"), L("Regain control without banning AI.", "Reprendre la main sans interdire l'IA.", "Weer grip zonder AI te verbieden.")] as const,
  charte: [L("AI charter", "Charte IA entreprise", "AI-beleid"), L("Clear rules, applied by your tools.", "Des règles claires, appliquées par vos outils.", "Duidelijke regels, toegepast door uw tools.")] as const,
  kmo: [L("KMO-portefeuille", "KMO-portefeuille", "KMO-portefeuille voor AI"), L("Up to 70% subsidy for Flemish SMEs.", "Jusqu'à 70 % de subside pour les PME flamandes.", "Tot 70% subsidie voor Vlaamse kmo's.")] as const,
  vsChatgpt: [L("Wonka AI vs ChatGPT Enterprise", "Wonka AI vs ChatGPT Enterprise", "Wonka AI vs ChatGPT Enterprise"), L("A detailed comparison for European companies.", "Comparaison détaillée pour les entreprises européennes.", "Gedetailleerde vergelijking voor Europese bedrijven.")] as const,
  privateLlm: [L("Private vs public LLM", "LLM privé vs public", "Private vs publieke LLM"), L("Which model setup fits your data?", "Quel choix de modèle pour vos données ?", "Welke modelkeuze past bij uw data?")] as const,
  gAgent: [L("What is an AI agent?", "Qu'est-ce qu'un agent IA ?", "Wat is een AI-agent?"), L("Definition and examples.", "Définition et exemples.", "Definitie en voorbeelden.")] as const,
  gMcp: [L("MCP explained", "Le MCP expliqué", "MCP uitgelegd"), L("How agents connect to your tools.", "Comment les agents se connectent à vos outils.", "Hoe agents met uw tools verbinden.")] as const,
  gLlm: [L("What is an LLM?", "Qu'est-ce qu'un LLM ?", "Wat is een LLM?"), L("Large language models in plain words.", "Les grands modèles de langage, simplement.", "Grote taalmodellen, eenvoudig uitgelegd.")] as const,
  gRag: [L("What is RAG?", "Qu'est-ce que le RAG ?", "Wat is RAG?"), L("How AI answers from your documents.", "Comment l'IA répond à partir de vos documents.", "Hoe AI antwoordt vanuit uw documenten.")] as const,
  gSovereignty: [L("Data sovereignty", "Souveraineté des données", "Gegevenssouvereiniteit"), L("Keep control of where your data lives.", "Garder la maîtrise de l'emplacement de vos données.", "Controle over waar uw data staat.")] as const,
};

const TOPICS: Record<ArticleTopic, TopicConfig> = {
  agentic: {
    cover: COVER.path,
    shot: SHOT.agents,
    productTitle: L("Agents that finish the job", "Des agents qui vont jusqu'au bout", "Agents die het werk afmaken"),
    productBody: L(
      "In WonkaChat, teams create agents for specific tasks, connect them to their tools and keep a human in the loop for every action that matters.",
      "Dans WonkaChat, les équipes créent des agents pour des tâches précises, les connectent à leurs outils et gardent une validation humaine sur chaque action qui compte.",
      "In WonkaChat maken teams agents voor specifieke taken, koppelen ze aan hun tools en houden een menselijke controle op elke belangrijke actie.",
    ),
    productHref: (l) => commercialPath("aiAgents", l),
    links: (l) => [
      page("/ai-agents", l, ...T.aiAgents),
      l === "fr" ? { href: "/fr/agent-ia-entreprise", label: "Agent IA entreprise", description: "Pour les DSI d'ETI qui arbitrent le SI." } : null,
      landing("aiConsultancy", l, ...T.consultancy),
      glossary("ai-agent", l, ...T.gAgent),
      glossary("mcp", l, ...T.gMcp),
      page("/wonka-build", l, ...T.wonkaBuild),
    ],
  },
  competitors: {
    cover: COVER.river,
    shot: SHOT.models,
    productTitle: L("Every leading model, one private workspace", "Les meilleurs modèles, un seul espace privé", "Alle toonaangevende modellen, één private werkplek"),
    productBody: L(
      "WonkaChat lets your teams pick the right model for each task, connected to company knowledge and hosted in Azure West Europe.",
      "WonkaChat permet à vos équipes de choisir le bon modèle pour chaque tâche, connecté aux connaissances de l'entreprise et hébergé dans Azure West Europe.",
      "Met WonkaChat kiezen uw teams het juiste model per taak, gekoppeld aan de bedrijfskennis en gehost in Azure West Europe.",
    ),
    productHref: (l) => commercialPath("wonkaChat", l),
    links: (l) => [
      landing("comparatifIa", l, ...T.comparatif),
      landing("chatgptForBusiness", l, ...T.chatgpt),
      page("/wonka-chat", l, ...T.wonkaChat),
      page("/pricing", l, ...T.pricing),
      page("/vs/wonka-ai-vs-chatgpt-enterprise", l, ...T.vsChatgpt),
    ],
  },
  roi: {
    cover: COVER.fields,
    shot: SHOT.excel,
    productTitle: L("From question to spreadsheet", "De la question au tableur", "Van vraag naar spreadsheet"),
    productBody: L(
      "Ask for the numbers and get a working file back: WonkaChat reads your data sources and builds the report your team would have spent hours on.",
      "Demandez les chiffres, recevez un fichier prêt à l'emploi : WonkaChat lit vos sources de données et construit le rapport qui aurait pris des heures à votre équipe.",
      "Vraag naar de cijfers en krijg een werkend bestand terug: WonkaChat leest uw databronnen en bouwt het rapport waar uw team uren aan had gewerkt.",
    ),
    productHref: (l) => commercialPath("startAi", l),
    links: (l) => [
      page("/start-ai", l, ...T.startAi),
      landing("auditIa", l, ...T.audit),
      landing("kmoPortefeuille", l, ...T.kmo),
      landing("aiConsultancy", l, ...T.consultancy),
      landing("aiForBusiness", l, ...T.aiForBusiness),
      page("/wonka-build", l, ...T.wonkaBuild),
    ],
  },
  model: {
    cover: COVER.valley,
    shot: SHOT.models,
    productTitle: L("No need to bet on a single model", "Inutile de parier sur un seul modèle", "Geen gok op één model"),
    productBody: L(
      "Use EU-hosted models or bring your own API key, and switch model per task from the same workspace.",
      "Utilisez des modèles hébergés dans l'UE ou votre propre clé API, et changez de modèle selon la tâche depuis le même espace.",
      "Gebruik in de EU gehoste modellen of uw eigen API-sleutel, en wissel per taak van model in dezelfde werkplek.",
    ),
    productHref: (l) => commercialPath("wonkaChat", l),
    links: (l) => [
      landing("comparatifIa", l, ...T.comparatif),
      page("/vs/private-llm-vs-public-llm", l, ...T.privateLlm),
      glossary("llm", l, ...T.gLlm),
      page("/wonka-chat", l, ...T.wonkaChat),
      landing("chatgptForBusiness", l, ...T.chatgpt),
    ],
  },
  copilot: {
    cover: COVER.waterfall,
    shot: SHOT.tools,
    productTitle: L("Beyond Microsoft 365", "Au-delà de Microsoft 365", "Verder dan Microsoft 365"),
    productBody: L(
      "WonkaChat connects to SharePoint, Outlook and Teams, and also to your ERP and CRM, with the model of your choice and EU hosting.",
      "WonkaChat se connecte à SharePoint, Outlook et Teams, mais aussi à votre ERP et votre CRM, avec le modèle de votre choix et un hébergement européen.",
      "WonkaChat koppelt met SharePoint, Outlook en Teams, maar ook met uw ERP en CRM, met het model van uw keuze en hosting in de EU.",
    ),
    productHref: (l) => landingPath("chatgptForBusiness", l) ?? commercialPath("wonkaChat", l),
    links: (l) => [
      landing("chatgptForBusiness", l, ...T.chatgpt),
      landing("shadowAi", l, ...T.shadowAi),
      page("/integrations", l, ...T.integrations),
      glossary("data-sovereignty", l, ...T.gSovereignty),
      landing("comparatifIa", l, ...T.comparatif),
    ],
  },
  odoo: {
    cover: COVER.wheat,
    shot: SHOT.erp,
    productTitle: L("Ask Odoo, get the answer", "Posez la question à Odoo", "Vraag het aan Odoo"),
    productBody: L(
      "WonkaChat reads your Odoo CRM, sales and accounting data, answers in plain language and can create records with your approval.",
      "WonkaChat lit vos données Odoo (CRM, ventes, comptabilité), répond en langage naturel et peut créer des enregistrements avec votre validation.",
      "WonkaChat leest uw Odoo-data (CRM, verkoop, boekhouding), antwoordt in gewone taal en kan records aanmaken met uw goedkeuring.",
    ),
    productHref: (l) => commercialPath("wonkaChatOdoo", l),
    links: (l) => [
      page("/wonka-chat/odoo", l, ...T.odoo),
      page("/integrations/odoo", l, ...T.odooIntegration),
      page("/ai-agents", l, ...T.aiAgents),
      landing("aiForBusiness", l, ...T.aiForBusiness),
      glossary("mcp", l, ...T.gMcp),
      page("/wonka-build", l, ...T.wonkaBuild),
    ],
  },
  knowledge: {
    cover: COVER.fields,
    shot: SHOT.knowledge,
    productTitle: L("Answers from your own documents", "Des réponses tirées de vos documents", "Antwoorden uit uw eigen documenten"),
    productBody: L(
      "WonkaChat searches SharePoint, Drive, Notion and your other sources, cites where each answer comes from and respects each user's permissions.",
      "WonkaChat cherche dans SharePoint, Drive, Notion et vos autres sources, cite l'origine de chaque réponse et respecte les droits de chaque utilisateur.",
      "WonkaChat zoekt in SharePoint, Drive, Notion en uw andere bronnen, vermeldt de bron van elk antwoord en respecteert de rechten van elke gebruiker.",
    ),
    productHref: (l) => commercialPath("aiChat", l),
    links: (l) => [
      page("/workspace/ai-chat", l, L("AI Chat", "Chat IA", "AI-chat"), L("Safe AI chat on your company knowledge.", "Un chat IA sécurisé sur vos connaissances.", "Veilige AI-chat op uw bedrijfskennis.")),
      landing("chatbotEntreprise", l, L("Company chatbot", "Chatbot entreprise", "Bedrijfschatbot"), L("An internal assistant that knows your documents.", "Un assistant interne qui connaît vos documents.", "Een interne assistent die uw documenten kent.")),
      glossary("rag", l, ...T.gRag),
      page("/integrations", l, ...T.integrations),
      page("/wonka-chat", l, ...T.wonkaChat),
    ],
  },
  governance: {
    cover: COVER.waterfall,
    shot: SHOT.workspace,
    productTitle: L("Governed AI for everyone", "Une IA encadrée pour tout le monde", "Beheerste AI voor iedereen"),
    productBody: L(
      "Approved models, permissions by team, EU hosting and admin controls: the rules of your AI policy, applied by the tool.",
      "Modèles approuvés, droits par équipe, hébergement européen et contrôles d'administration : les règles de votre politique IA, appliquées par l'outil.",
      "Goedgekeurde modellen, rechten per team, hosting in de EU en beheerscontroles: de regels van uw AI-beleid, toegepast door de tool.",
    ),
    productHref: (l) => localizeHref("/workspace/governance", l),
    links: (l) => [
      landing("charteIa", l, ...T.charte),
      landing("shadowAi", l, ...T.shadowAi),
      glossary("data-sovereignty", l, ...T.gSovereignty),
      page("/start-ai", l, ...T.startAi),
      page("/wonka-chat", l, ...T.wonkaChat),
    ],
  },
};

const SLUG_TOPICS: [RegExp, ArticleTopic][] = [
  [/odoo/, "odoo"],
  [/copilot/, "copilot"],
  [/roi/, "roi"],
  [/model|modele|kiezen/, "model"],
  [/agentic|agentique|agentische/, "agentic"],
  [/dust|langdock|glean|notebooklm/, "competitors"],
];

/** Glossary term slug → topic. */
const GLOSSARY_TOPICS: Record<string, ArticleTopic> = {
  "ai-agent": "agentic",
  mcp: "agentic",
  rag: "knowledge",
  "vector-database": "knowledge",
  llm: "model",
  "fine-tuning": "model",
  "prompt-engineering": "roi",
  "data-sovereignty": "governance",
  "on-premise": "governance",
};

export function topicForArticle(slug: string, category?: string | null): ArticleTopic {
  for (const [pattern, topic] of SLUG_TOPICS) if (pattern.test(slug)) return topic;
  return category === "security-compliance" ? "governance" : "knowledge";
}

export function topicForGlossary(slug: string): ArticleTopic {
  return GLOSSARY_TOPICS[slug] ?? "knowledge";
}

export interface ResolvedTopic {
  topic: ArticleTopic;
  cover: ArticleImage;
  shot: ArticleImage;
  productTitle: string;
  productBody: string;
  productHref: string;
  links: TopicLink[];
}

export function resolveTopic(topic: ArticleTopic, locale: Locale, currentPath: string): ResolvedTopic {
  const c = TOPICS[topic];
  const seen = new Set<string>([currentPath]);
  const links = c.links(locale).filter((link): link is TopicLink => {
    if (!link || seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
  return {
    topic,
    cover: c.cover,
    shot: c.shot,
    productTitle: c.productTitle[locale],
    productBody: c.productBody[locale],
    productHref: c.productHref(locale),
    links: links.slice(0, 6),
  };
}
