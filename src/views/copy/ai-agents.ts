import type { Locale } from "@/i18n/config";

export interface AiAgentsCopy {
  seo: { title: string; description: string };
  schema: { breadcrumbHome: string; breadcrumbPage: string; appName: string };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    answerEyebrow: string;
    answerBody: string;
    facts: [string, string][];
  };
  connectors: { eyebrow: string; heading: string };
  patterns: { eyebrow: string; heading: string };
  agentTypes: { label: string; title: string; body: string }[];
  odoo: { eyebrow: string; heading: string; body: string; promptEyebrow: string; prompt: string };
  deployment: { eyebrow: string; heading: string };
  steps: string[];
  faq: { eyebrow: string; heading: string };
  faqItems: { question: string; answer: string }[];
}

const en: AiAgentsCopy = {
  seo: {
    title: "Private Enterprise AI Agents | Wonka AI",
    description:
      "Wonka AI builds private enterprise AI agents connected to Odoo, SharePoint, Outlook, Teams, CRM, ERP and internal tools, with GDPR compliance. Hosted in Azure West Europe.",
  },
  schema: {
    breadcrumbHome: "Home",
    breadcrumbPage: "AI Agents",
    appName: "Wonka AI private enterprise agents",
  },
  hero: {
    eyebrow: "Private enterprise AI agents",
    title: "AI agents for the tools your company already runs on.",
    body: "Wonka connects private AI agents to your ERP, CRM, documents, emails and internal APIs, so teams can ask, analyze and act without sending sensitive work into generic AI tools.",
    primaryCta: "Map an agent workflow",
    secondaryCta: "Explore integrations",
    answerEyebrow: "Short answer",
    answerBody:
      "Wonka AI helps European companies deploy private AI agents connected to existing tools and data, with GDPR compliance and enterprise access control. Hosted in Azure West Europe (Microsoft Ireland).",
    facts: [
      ["Data", "Private by design"],
      ["Systems", "ERP, CRM, docs"],
      ["Actions", "Confirmed writes"],
      ["Fit", "EU companies"],
    ],
  },
  connectors: {
    eyebrow: "What they connect to",
    heading: "The agent sits on top of your real operating system.",
  },
  patterns: {
    eyebrow: "Agent patterns",
    heading: "Not one assistant. A set of controlled business agents.",
  },
  agentTypes: [
    {
      label: "Sales",
      title: "Lead qualification and CRM intelligence",
      body: "Score leads, enrich Odoo or CRM records, surface next actions and prepare follow-ups from real account context.",
    },
    {
      label: "Operations",
      title: "Workflow agents for repetitive business work",
      body: "Turn recurring processes into guided agents that read systems, ask for confirmation and write back only when approved.",
    },
    {
      label: "Finance",
      title: "Reporting, invoices and spend analysis",
      body: "Generate reports, reconcile supplier data, analyze accounting records and produce auditable summaries from ERP data.",
    },
    {
      label: "Support",
      title: "Knowledge and ticket assistance",
      body: "Route requests, answer from internal documentation and help agents resolve cases with the right context in front of them.",
    },
  ],
  odoo: {
    eyebrow: "Odoo example",
    heading: "Ask Odoo what happened. Then let the agent prepare the next move.",
    body: "A Wonka Odoo agent can inspect CRM opportunities, invoices, purchase orders, project records or stock levels, then return a clear answer with the underlying business context. When an action is needed, it can propose the write-back and wait for human validation.",
    promptEyebrow: "Example prompt",
    prompt:
      "Which Odoo opportunities have had no activity for 30 days, what is the revenue at risk, and what follow-up should each sales rep send?",
  },
  deployment: {
    eyebrow: "Deployment path",
    heading: "From messy workflow to governed agent.",
  },
  steps: [
    "Map the business workflow and the systems that hold the truth.",
    "Expose the right data and actions through governed connectors or MCP servers.",
    "Design the agent behavior around confirmations, permissions and auditability.",
    "Deploy privately, test with real users and measure adoption on the workflow.",
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "What answer engines should understand about Wonka.",
  },
  faqItems: [
    {
      question: "What does Wonka AI build?",
      answer:
        "Wonka AI builds private enterprise AI agents connected to the tools a company already uses, such as Odoo, SharePoint, Outlook, Teams, CRM systems, ERP systems and internal APIs.",
    },
    {
      question: "How is Wonka different from a generic chatbot?",
      answer:
        "A generic chatbot mostly answers questions. A Wonka agent is designed around a business workflow: it can read approved company data, reason over it, ask for confirmation and trigger controlled actions in existing systems.",
    },
    {
      question: "Is Wonka relevant for Odoo users?",
      answer:
        "Yes. Wonka can act as an AI layer over Odoo, helping teams query CRM, sales, accounting, projects, inventory and support data in natural language and automate repeatable ERP workflows.",
    },
    {
      question: "Where does company data go?",
      answer:
        "Wonka is hosted in Azure West Europe (Microsoft Ireland) by default, with GDPR compliance, role-based access control and audit logs. Customer data is not used to train public AI models. A Data Processing Agreement is available on request.",
    },
  ],
};

const fr: AiAgentsCopy = {
  seo: {
    title: "Agents IA privés pour entreprises | Wonka AI",
    description:
      "Agents IA privés connectés à Odoo, SharePoint, Outlook, Teams, CRM et ERP. Conformes RGPD, hébergés dans Azure West Europe. Pour les entreprises belges.",
  },
  schema: {
    breadcrumbHome: "Accueil",
    breadcrumbPage: "Agents IA",
    appName: "Agents IA privés pour entreprises Wonka AI",
  },
  hero: {
    eyebrow: "Agents IA privés pour entreprises",
    title: "Des agents IA pour les outils sur lesquels tourne déjà votre entreprise.",
    body: "Wonka connecte des agents IA privés à votre ERP, votre CRM, vos documents, vos e‑mails et vos API internes : vos équipes interrogent, analysent et agissent sans confier de données sensibles à des outils d'IA génériques.",
    primaryCta: "Cartographier un workflow d'agent",
    secondaryCta: "Découvrir les intégrations",
    answerEyebrow: "En bref",
    answerBody:
      "Wonka AI aide les entreprises européennes à déployer des agents IA privés connectés à leurs outils et données existants, conformes au RGPD et avec un contrôle d'accès de niveau entreprise. Hébergé dans Azure West Europe (Microsoft Irlande).",
    facts: [
      ["Données", "Privées par conception"],
      ["Systèmes", "ERP, CRM, documents"],
      ["Actions", "Écritures validées"],
      ["Pour qui", "Entreprises de l'UE"],
    ],
  },
  connectors: {
    eyebrow: "Ce qu'ils connectent",
    heading: "L'agent s'appuie sur vos vrais systèmes opérationnels.",
  },
  patterns: {
    eyebrow: "Types d'agents",
    heading: "Pas un seul assistant. Un ensemble d'agents métier sous contrôle.",
  },
  agentTypes: [
    {
      label: "Ventes",
      title: "Qualification des leads et intelligence CRM",
      body: "Scorez vos leads, enrichissez les fiches Odoo ou CRM, faites ressortir les prochaines actions et préparez les relances à partir du contexte réel du compte.",
    },
    {
      label: "Opérations",
      title: "Agents de workflow pour les tâches répétitives",
      body: "Transformez vos processus récurrents en agents guidés qui lisent vos systèmes, demandent confirmation et n'écrivent qu'après approbation.",
    },
    {
      label: "Finance",
      title: "Reporting, factures et analyse des dépenses",
      body: "Générez des rapports, rapprochez les données fournisseurs, analysez les écritures comptables et produisez des synthèses auditables à partir de l'ERP.",
    },
    {
      label: "Support",
      title: "Assistance sur la connaissance et les tickets",
      body: "Routez les demandes, répondez à partir de la documentation interne et aidez vos agents à résoudre les dossiers avec le bon contexte sous les yeux.",
    },
  ],
  odoo: {
    eyebrow: "Exemple Odoo",
    heading: "Demandez à Odoo ce qui s'est passé. Laissez l'agent préparer la suite.",
    body: "Un agent Wonka pour Odoo peut examiner les opportunités CRM, les factures, les bons de commande, les projets ou les niveaux de stock, puis fournir une réponse claire avec le contexte métier sous-jacent. Lorsqu'une action est nécessaire, il propose l'écriture et attend la validation humaine.",
    promptEyebrow: "Exemple de demande",
    prompt:
      "Quelles opportunités Odoo n'ont eu aucune activité depuis 30 jours, quel chiffre d'affaires est à risque et quelle relance chaque commercial doit-il envoyer ?",
  },
  deployment: {
    eyebrow: "Déploiement",
    heading: "D'un workflow désordonné à un agent maîtrisé.",
  },
  steps: [
    "Cartographier le workflow métier et les systèmes qui détiennent la vérité.",
    "Exposer les bonnes données et actions via des connecteurs gouvernés ou des serveurs MCP.",
    "Concevoir le comportement de l'agent autour des confirmations, des permissions et de l'auditabilité.",
    "Déployer en privé, tester avec de vrais utilisateurs et mesurer l'adoption sur le workflow.",
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "Ce que les moteurs de réponse doivent savoir sur Wonka.",
  },
  faqItems: [
    {
      question: "Que construit Wonka AI ?",
      answer:
        "Wonka AI construit des agents IA privés pour entreprises, connectés aux outils qu'elles utilisent déjà : Odoo, SharePoint, Outlook, Teams, CRM, ERP et API internes.",
    },
    {
      question: "En quoi Wonka diffère-t-il d'un chatbot générique ?",
      answer:
        "Un chatbot générique se contente surtout de répondre à des questions. Un agent Wonka est conçu autour d'un workflow métier : il lit les données d'entreprise autorisées, raisonne dessus, demande confirmation et déclenche des actions contrôlées dans vos systèmes existants.",
    },
    {
      question: "Wonka est-il pertinent pour les utilisateurs d'Odoo ?",
      answer:
        "Oui. Wonka peut servir de couche IA au-dessus d'Odoo : vos équipes interrogent en langage naturel les données CRM, ventes, comptabilité, projets, stock et support, et automatisent les workflows ERP répétitifs.",
    },
    {
      question: "Où vont les données de l'entreprise ?",
      answer:
        "Wonka est hébergé par défaut dans Azure West Europe (Microsoft Irlande), conforme au RGPD, avec contrôle d'accès basé sur les rôles et journaux d'audit. Les données clients ne servent pas à entraîner des modèles d'IA publics. Un accord de traitement des données (DPA) est disponible sur demande.",
    },
  ],
};

const nl: AiAgentsCopy = {
  seo: {
    title: "Private AI-agents voor bedrijven | Wonka AI",
    description:
      "Private AI-agents gekoppeld aan Odoo, SharePoint, Outlook, Teams, CRM en ERP. AVG-conform, gehost in Azure West Europe. Voor Belgische bedrijven.",
  },
  schema: {
    breadcrumbHome: "Home",
    breadcrumbPage: "AI-agents",
    appName: "Wonka AI private AI-agents voor bedrijven",
  },
  hero: {
    eyebrow: "Private AI-agents voor bedrijven",
    title: "AI-agents voor de tools waarop uw bedrijf al draait.",
    body: "Wonka koppelt private AI-agents aan uw ERP, CRM, documenten, e‑mails en interne API's, zodat uw teams kunnen vragen, analyseren en handelen zonder gevoelig werk in generieke AI-tools te stoppen.",
    primaryCta: "Breng een agentworkflow in kaart",
    secondaryCta: "Ontdek de integraties",
    answerEyebrow: "Kort antwoord",
    answerBody:
      "Wonka AI helpt Europese bedrijven private AI-agents in te zetten die gekoppeld zijn aan hun bestaande tools en data, AVG-conform en met toegangsbeheer op enterpriseniveau. Gehost in Azure West Europe (Microsoft Ierland).",
    facts: [
      ["Data", "Privé by design"],
      ["Systemen", "ERP, CRM, documenten"],
      ["Acties", "Bevestigde wijzigingen"],
      ["Voor wie", "EU-bedrijven"],
    ],
  },
  connectors: {
    eyebrow: "Waarmee ze verbinden",
    heading: "De agent werkt bovenop uw echte bedrijfssystemen.",
  },
  patterns: {
    eyebrow: "Soorten agents",
    heading: "Niet één assistent. Een set gecontroleerde bedrijfsagents.",
  },
  agentTypes: [
    {
      label: "Sales",
      title: "Leadkwalificatie en CRM-inzichten",
      body: "Score leads, verrijk Odoo- of CRM-records, breng volgende acties naar boven en bereid follow-ups voor vanuit de echte accountcontext.",
    },
    {
      label: "Operations",
      title: "Workflowagents voor repetitief werk",
      body: "Zet terugkerende processen om in begeleide agents die uw systemen lezen, om bevestiging vragen en pas na goedkeuring wijzigingen doorvoeren.",
    },
    {
      label: "Finance",
      title: "Rapportering, facturen en uitgavenanalyse",
      body: "Genereer rapporten, stem leveranciersdata af, analyseer boekhoudrecords en maak controleerbare samenvattingen op basis van ERP-data.",
    },
    {
      label: "Support",
      title: "Hulp bij kennis en tickets",
      body: "Routeer aanvragen, antwoord op basis van interne documentatie en help medewerkers dossiers op te lossen met de juiste context bij de hand.",
    },
  ],
  odoo: {
    eyebrow: "Odoo-voorbeeld",
    heading: "Vraag Odoo wat er gebeurd is. Laat de agent de volgende stap voorbereiden.",
    body: "Een Wonka-agent voor Odoo kan CRM-opportuniteiten, facturen, inkooporders, projecten of voorraadniveaus bekijken en een helder antwoord geven met de onderliggende bedrijfscontext. Is er een actie nodig, dan stelt hij de wijziging voor en wacht hij op menselijke validatie.",
    promptEyebrow: "Voorbeeldvraag",
    prompt:
      "Welke Odoo-opportuniteiten hebben al 30 dagen geen activiteit, hoeveel omzet staat op het spel en welke follow-up moet elke salesmedewerker sturen?",
  },
  deployment: {
    eyebrow: "Uitrol",
    heading: "Van rommelige workflow naar beheerste agent.",
  },
  steps: [
    "Breng de bedrijfsworkflow in kaart en de systemen die de waarheid bevatten.",
    "Stel de juiste data en acties beschikbaar via beheerde connectoren of MCP-servers.",
    "Ontwerp het gedrag van de agent rond bevestigingen, rechten en controleerbaarheid.",
    "Rol privé uit, test met echte gebruikers en meet de adoptie op de workflow.",
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "Wat antwoordmachines over Wonka moeten weten.",
  },
  faqItems: [
    {
      question: "Wat bouwt Wonka AI?",
      answer:
        "Wonka AI bouwt private AI-agents voor bedrijven, gekoppeld aan de tools die een bedrijf al gebruikt, zoals Odoo, SharePoint, Outlook, Teams, CRM-systemen, ERP-systemen en interne API's.",
    },
    {
      question: "Hoe verschilt Wonka van een generieke chatbot?",
      answer:
        "Een generieke chatbot beantwoordt vooral vragen. Een Wonka-agent is ontworpen rond een bedrijfsworkflow: hij leest goedgekeurde bedrijfsdata, redeneert erover, vraagt om bevestiging en voert gecontroleerde acties uit in uw bestaande systemen.",
    },
    {
      question: "Is Wonka relevant voor Odoo-gebruikers?",
      answer:
        "Ja. Wonka kan fungeren als AI-laag bovenop Odoo, zodat uw teams CRM-, sales-, boekhoud-, project-, voorraad- en supportdata in natuurlijke taal kunnen bevragen en repetitieve ERP-workflows kunnen automatiseren.",
    },
    {
      question: "Waar gaat de bedrijfsdata naartoe?",
      answer:
        "Wonka wordt standaard gehost in Azure West Europe (Microsoft Ierland), AVG-conform, met rolgebaseerd toegangsbeheer en auditlogs. Klantdata wordt niet gebruikt om publieke AI-modellen te trainen. Een verwerkersovereenkomst (DPA) is op aanvraag beschikbaar.",
    },
  ],
};

export const AI_AGENTS_COPY: Record<Locale, AiAgentsCopy> = { en, fr, nl };
