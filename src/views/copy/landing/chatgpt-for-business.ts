import type { Locale } from "@/i18n/config";
import type { LandingCopy } from "@/views/copy/landing-types";

/**
 * /chatgpt-for-business · /fr/chatgpt-entreprise · /nl/chatgpt-voor-bedrijven
 * WonkaChat as the private, EU-hosted, multi-model alternative to
 * ChatGPT Business / Team. Competitor statements stay generic and non-numeric.
 */

const en: LandingCopy = {
  seo: {
    title: "ChatGPT for Business, private & EU-hosted | Wonka AI",
    description:
      "ChatGPT for business without shadow AI: WonkaChat is a private AI workspace hosted in the EU, ISO 27001 certified. Start your 7-day free trial.",
  },
  breadcrumb: "ChatGPT for business",
  schema: {
    serviceName: "WonkaChat: private ChatGPT for business",
    serviceType: "Private AI workspace for companies",
  },
  hero: {
    eyebrow: "ChatGPT Business alternative",
    title: "ChatGPT for business, private and hosted in Europe.",
    subtitle:
      "Your team already uses ChatGPT. WonkaChat gives them the same chat experience in a governed AI workspace: EU hosting, your company knowledge and tools built in, and admin controls your IT team can trust.",
    primaryCta: { label: "Start your free trial", href: "trial" },
    secondaryCta: {
      label: "Compare with ChatGPT Enterprise",
      href: "/vs/wonka-ai-vs-chatgpt-enterprise",
    },
    facts: [
      ["Hosting", "Azure West Europe"],
      ["Compliance", "ISO 27001 · GDPR · NIS 2"],
      ["Free trial", "7 days, no credit card"],
      ["Pricing", "Per seat, 20% off annual"],
    ],
  },
  answer: {
    heading: "What is ChatGPT for business?",
    paragraphs: [
      "ChatGPT for business means giving employees ChatGPT-style AI chat inside a company-controlled environment, with business data protected, access managed and usage governed. WonkaChat is a private alternative to ChatGPT Business and Team: an AI workspace hosted in Azure West Europe, connected to your tools and certified ISO 27001.",
      "Most companies do not start from zero. Employees already paste emails, contracts and customer data into personal ChatGPT accounts because it saves them time. That is shadow AI: useful for the individual, invisible to IT and risky for the company. Banning it rarely works. Offering a better, approved alternative does. The real question is not whether your teams use ChatGPT for business, but where company data goes when they do.",
      "WonkaChat keeps the familiar chat experience and adds what a company actually needs. Answers are grounded in your own knowledge and systems, from SharePoint documents to Odoo, Salesforce or HubSpot records. Your organisation chooses the AI model that fits its needs and security requirements, with EU-hosted models included or your own model API key. Admins manage who can access which data and agents, with single sign-on, audit logs and human approval for important actions. And it goes beyond chat: teams can create AI agents for specific tasks and AI automations for repetitive work.",
      "The result is a private ChatGPT for companies that stays GDPR compliant by design: data hosted in the EU, a Data Processing Agreement included, and customer data never used to train public AI models. You can test it on a real use case with a 7-day free trial, without a credit card.",
    ],
  },
  benefits: {
    eyebrow: "Why companies switch",
    heading: "A private ChatGPT for companies, built for European teams",
    items: [
      {
        title: "Your data stays in Europe",
        body: "WonkaChat is hosted in Azure West Europe (Microsoft Ireland) by default, on EU-based infrastructure with data residency controls. Data is encrypted at rest (AES-256) and in transit (TLS 1.2 or higher).",
      },
      {
        title: "GDPR-compliant ChatGPT alternative",
        body: "Wonka AI is ISO 27001 certified, GDPR compliant and NIS 2 compliant, with a SOC 2 Type II audit in progress. A Data Processing Agreement is included, and customer data is not used to train public AI models.",
      },
      {
        title: "Choose your own AI model",
        body: "You are not locked into one model family. Use the EU-hosted AI models included in your seat, or plug in your own model API key with your provider's billing, depending on your needs and security requirements.",
      },
      {
        title: "Grounded in company knowledge",
        body: "WonkaChat connects to the systems your team already uses (CRM, ERP, email, documents, project tools and internal databases), so answers reflect your company context instead of generic internet knowledge.",
      },
      {
        title: "Admin controls from day one",
        body: "Manage access and permissions per user and team, decide which agents are available to whom, and enforce single sign-on via Azure AD / Entra ID with MFA. Governance and audit logs are part of every paid seat.",
      },
      {
        title: "Built for every employee",
        body: "WonkaChat is designed for the whole organisation, not only early adopters. People work in simple language with shared agents and guided workflows, so adoption does not depend on a few AI experts.",
      },
    ],
  },
  useCases: {
    eyebrow: "What teams do with it",
    heading: "ChatGPT for business use cases, connected to your tools",
    items: [
      {
        title: "Replace personal ChatGPT accounts",
        body: "Move employees from personal ChatGPT accounts to one approved workspace. They keep the chat experience they like; you regain visibility and control over company data.",
        link: { label: "Discover WonkaChat", href: "/wonka-chat" },
      },
      {
        title: "Ask questions across company documents",
        body: "Let employees find answers in contracts, procedures and project files stored in SharePoint, Google Drive or Notion, with the company context built in.",
        link: { label: "See all integrations", href: "/integrations" },
      },
      {
        title: "AI agents for specific tasks",
        body: "Build agents for a role or workflow, from sales follow-up to finance checks or support summaries. Important actions can require human approval before they run.",
        link: { label: "Learn about AI agents", href: "/ai-agents" },
      },
      {
        title: "Support and email handling",
        body: "Engie subsidiary N-allo deployed AI agents on support emails and cut handling time by 50% across a team of more than 70 employees.",
        link: { label: "Read our case studies", href: "/case-studies" },
      },
      {
        title: "A personal AI assistant for every employee",
        body: "Itzu gave personal WonkaChat assistants, connected to internal systems, to 100% of its workforce. Employees save multiple hours per week.",
        link: { label: "Explore AI for business", href: "/ai-for-business" },
      },
    ],
  },
  process: {
    eyebrow: "How to get started",
    heading: "From ChatGPT Team to a private AI workspace in weeks",
    steps: [
      {
        title: "Start a free trial",
        body: "Open a 7-day trial with full AI Workspace access and €5 of included AI usage. No credit card required.",
      },
      {
        title: "Test a real use case",
        body: "Pick a workflow your team already runs in ChatGPT, such as drafting replies or searching documents, and run it on your own company knowledge.",
      },
      {
        title: "Connect your tools and set permissions",
        body: "Connect the systems you need, set up single sign-on and decide which users and teams can access which data and agents.",
      },
      {
        title: "Roll out and govern",
        body: "Invite the whole organisation, share agents across teams and follow usage through governance and audit logs. Per-seat pricing scales with your team.",
      },
    ],
  },
  comparison: {
    eyebrow: "Side by side",
    heading: "WonkaChat vs ChatGPT Business / Team",
    columns: ["Feature", "WonkaChat", "ChatGPT Business / Team"],
    rows: [
      [
        "Default hosting",
        "Azure West Europe (Microsoft Ireland), EU data residency controls",
        "Operated by OpenAI, a US-based vendor; residency options depend on plan",
      ],
      [
        "AI models",
        "Choose your model: EU-hosted models included, or your own API key",
        "OpenAI models (single model family)",
      ],
      [
        "Company tools",
        "CRM, ERP, email, documents: Odoo, SharePoint, Salesforce, HubSpot, Teams and more",
        "Connectors to popular apps; scope depends on plan",
      ],
      [
        "Agents and approvals",
        "Shared agents per role or workflow, with human-in-the-loop approval",
        "Custom GPTs and agent features",
      ],
      [
        "Certifications",
        "ISO 27001 certified, GDPR and NIS 2 compliant, SOC 2 Type II in progress",
        "See OpenAI's trust portal for current certifications",
      ],
      [
        "Training on your data",
        "Customer data is not used to train public AI models",
        "OpenAI states business data is not used for training by default",
      ],
      [
        "Admin controls",
        "SSO via Azure AD / Entra ID, MFA, per-user and per-team permissions, audit logs",
        "Admin console; advanced controls depend on plan",
      ],
      [
        "Deployment options",
        "Managed cloud, your own cloud or on-premise (Enterprise)",
        "SaaS operated by OpenAI",
      ],
      [
        "Rollout support",
        "Belgian team that helps you define and deploy use cases",
        "Mainly self-serve",
      ],
    ],
    footnote:
      "Competitor features and plans evolve quickly. This table reflects generally known information at the time of writing; check OpenAI's website for the current ChatGPT Business offer.",
  },
  faq: {
    heading: "ChatGPT for business: frequently asked questions",
    items: [
      {
        question: "What is a good ChatGPT Business alternative for European companies?",
        answer:
          "Look for an AI workspace that keeps the chat experience employees know but runs under your company's control. WonkaChat is hosted in Azure West Europe, ISO 27001 certified, GDPR and NIS 2 compliant, lets you choose your AI model and connects to your own tools. You can compare it on a real use case with a 7-day free trial.",
      },
      {
        question: "Is ChatGPT Team the same as ChatGPT Business?",
        answer:
          "ChatGPT Team is the earlier name of the OpenAI plan now sold as ChatGPT Business: a shared workspace for teams using OpenAI models. WonkaChat addresses the same need, AI chat for the whole team, with EU hosting by default, a choice of AI models and native connections to company systems such as Odoo, SharePoint or Salesforce.",
      },
      {
        question: "Is using ChatGPT at work GDPR compliant?",
        answer:
          "It depends on the plan, the contract and what employees paste into it. Personal accounts are the biggest risk because the company has no agreement, no visibility and no control. WonkaChat is GDPR compliant, includes a Data Processing Agreement, hosts data in the EU and never uses customer data to train public AI models.",
      },
      {
        question: "Where is our data stored in WonkaChat?",
        answer:
          "WonkaChat is hosted in Azure West Europe (Microsoft Ireland) by default, on EU-based infrastructure with data residency controls. Data is encrypted at rest with AES-256 and in transit with TLS 1.2 or higher. Enterprise customers can also choose their own cloud or an on-premise deployment when contracted.",
      },
      {
        question: "How do we stop shadow AI without slowing teams down?",
        answer:
          "Banning ChatGPT usually pushes usage onto personal devices. The more effective route is to offer an approved private ChatGPT for the company that is at least as useful: connected to internal knowledge, available to everyone and governed by IT with single sign-on, permissions and audit logs. That is the role WonkaChat plays.",
      },
      {
        question: "How much does WonkaChat cost compared to ChatGPT Team?",
        answer:
          "WonkaChat uses transparent per-seat pricing, with 20% off on annual billing. Seats can include EU-hosted AI models with no usage bills, or you can use your own model API key. Organisations with 1,000+ seats get custom Enterprise pricing. Check our pricing page for your exact team size, and OpenAI's site for theirs.",
      },
      {
        question: "Can WonkaChat connect to our existing tools?",
        answer:
          "Yes. WonkaChat connects to company tools such as CRM, ERP, email, documents, project tools and internal databases, including Odoo, SharePoint, Outlook, Microsoft Teams, Salesforce, HubSpot, Jira, Slack, Notion and Google Drive. Employees can find information and trigger actions without switching between applications.",
      },
      {
        question: "Can important AI actions require human approval?",
        answer:
          "Yes. WonkaChat supports human-in-the-loop workflows, so actions such as updating a record or sending a reply can be reviewed before they are executed. Combined with permissions per user and team, this lets you give agents real work without losing control over what happens in your systems.",
      },
    ],
  },
  related: {
    heading: "Keep exploring",
    links: [
      {
        label: "Wonka AI vs ChatGPT Enterprise",
        href: "/vs/wonka-ai-vs-chatgpt-enterprise",
        description: "The detailed comparison for larger organisations.",
      },
      {
        label: "WonkaChat, the AI workspace",
        href: "/wonka-chat",
        description: "Chat, agents and tool connections in one place.",
      },
      {
        label: "WonkaChat pricing",
        href: "/pricing",
        description: "Per-seat plans and the 7-day free trial.",
      },
      {
        label: "Wonka AI vs Microsoft Copilot",
        href: "/vs/wonka-ai-vs-microsoft-copilot",
        description: "How WonkaChat compares with Copilot.",
      },
      {
        label: "Private LLM vs public LLM",
        href: "/vs/private-llm-vs-public-llm",
        description: "What changes when AI runs privately.",
      },
      {
        label: "AI for business",
        href: "/ai-for-business",
        description: "What companies can do with AI, and how to start.",
      },
      {
        label: "Data sovereignty explained",
        href: "/learn/data-sovereignty",
        description: "Why data location matters for AI.",
      },
      {
        label: "AI consultancy",
        href: "/ai-consultancy",
        description: "Strategy, build and deployment with Wonka.",
      },
    ],
  },
  cta: {
    heading: "Give your team ChatGPT for business, the private way.",
    body: "Start a 7-day free trial or book a short demo. We'll show how WonkaChat connects to your tools and replaces personal ChatGPT accounts with one governed AI workspace.",
  },
};

const fr: LandingCopy = {
  seo: {
    title: "ChatGPT entreprise privé, hébergé en Europe | Wonka AI",
    description:
      "ChatGPT entreprise sans shadow AI : WonkaChat, l'espace de travail IA privé hébergé dans l'UE, certifié ISO 27001. Essai gratuit de 7 jours.",
  },
  breadcrumb: "ChatGPT entreprise",
  schema: {
    serviceName: "WonkaChat : ChatGPT privé pour entreprise",
    serviceType: "Espace de travail IA privé pour entreprises",
  },
  hero: {
    eyebrow: "Alternative à ChatGPT Business",
    title: "ChatGPT entreprise : privé, sécurisé et hébergé en Europe.",
    subtitle:
      "Vos équipes utilisent déjà ChatGPT. WonkaChat leur offre la même expérience de chat dans un espace de travail IA gouverné : hébergement dans l'UE, connaissances et outils de l'entreprise intégrés, et des contrôles d'administration dignes de confiance pour votre IT.",
    primaryCta: { label: "Commencer l'essai gratuit", href: "trial" },
    secondaryCta: {
      label: "Comparer avec ChatGPT Enterprise",
      href: "/fr/vs/wonka-ai-vs-chatgpt-enterprise",
    },
    facts: [
      ["Hébergement", "Azure West Europe"],
      ["Conformité", "ISO 27001 · RGPD · NIS 2"],
      ["Essai gratuit", "7 jours, sans carte"],
      ["Tarifs", "Par utilisateur, -20 % en annuel"],
    ],
  },
  answer: {
    heading: "Qu'est-ce qu'un ChatGPT entreprise ?",
    paragraphs: [
      "Un ChatGPT entreprise, c'est un chat IA comparable à ChatGPT, mis à disposition des collaborateurs dans un environnement contrôlé par l'entreprise : données protégées, accès gérés, usage encadré. WonkaChat est une alternative privée à ChatGPT Business et Team : un espace de travail IA hébergé dans Azure West Europe, connecté à vos outils et certifié ISO 27001.",
      "Dans la plupart des entreprises, l'IA est déjà là. Des collaborateurs collent des e-mails, des contrats ou des données clients dans leur compte ChatGPT personnel, parce que cela leur fait gagner du temps. C'est le shadow AI : utile pour la personne, invisible pour l'IT et risqué pour l'entreprise. L'interdire fonctionne rarement. Proposer une alternative validée, et meilleure, fonctionne.",
      "WonkaChat conserve l'expérience de chat familière et ajoute ce dont une entreprise a réellement besoin. Les réponses s'appuient sur vos propres connaissances et systèmes, des documents SharePoint aux fiches Odoo, Salesforce ou HubSpot. Votre organisation choisit le modèle d'IA adapté à ses besoins et à ses exigences de sécurité : modèles hébergés dans l'UE inclus, ou votre propre clé API. Les administrateurs gèrent qui accède à quelles données et à quels agents, avec authentification unique, journaux d'audit et validation humaine pour les actions importantes.",
      "Résultat : un ChatGPT privé pour votre entreprise, conforme au RGPD dès la conception. Données hébergées dans l'UE, accord de traitement des données (DPA) inclus, et des données clients qui ne servent jamais à entraîner des modèles d'IA publics. Vous pouvez le tester sur un vrai cas d'usage pendant 7 jours, gratuitement et sans carte de crédit.",
    ],
  },
  benefits: {
    eyebrow: "Pourquoi les entreprises changent",
    heading: "Un ChatGPT privé pour entreprise, pensé pour les équipes européennes",
    items: [
      {
        title: "Vos données restent en Europe",
        body: "WonkaChat est hébergé par défaut dans Azure West Europe (Microsoft Irlande), sur une infrastructure basée dans l'UE avec contrôle de la résidence des données. Chiffrement au repos (AES-256) et en transit (TLS 1.2 ou supérieur).",
      },
      {
        title: "Un ChatGPT conforme au RGPD",
        body: "Wonka AI est certifié ISO 27001, conforme au RGPD et à NIS 2, et son audit SOC 2 Type II est en cours. Un DPA est inclus, et les données clients ne servent pas à entraîner des modèles d'IA publics.",
      },
      {
        title: "Choisissez votre modèle d'IA",
        body: "Vous n'êtes pas enfermé dans une seule famille de modèles. Utilisez les modèles d'IA hébergés dans l'UE inclus dans votre licence, ou votre propre clé API avec la facturation de votre fournisseur.",
      },
      {
        title: "Ancré dans les connaissances de l'entreprise",
        body: "WonkaChat se connecte aux systèmes que vos équipes utilisent déjà (CRM, ERP, e-mail, documents, outils de projet, bases de données internes) pour des réponses qui reflètent votre contexte, pas des généralités.",
      },
      {
        title: "Des contrôles d'administration dès le premier jour",
        body: "Gérez les accès et permissions par utilisateur et par équipe, décidez quels agents sont disponibles pour qui, et imposez le SSO via Azure AD / Entra ID avec MFA. Gouvernance et journaux d'audit inclus dans chaque licence payante.",
      },
      {
        title: "Pensé pour chaque collaborateur",
        body: "WonkaChat s'adresse à toute l'organisation, pas seulement aux profils technophiles. Chacun travaille en langage simple, avec des agents partagés et des workflows guidés : l'adoption ne dépend pas de quelques experts IA.",
      },
    ],
  },
  useCases: {
    eyebrow: "Ce que les équipes en font",
    heading: "ChatGPT pour entreprise : des cas d'usage connectés à vos outils",
    items: [
      {
        title: "Remplacer les comptes ChatGPT personnels",
        body: "Faites passer vos collaborateurs des comptes ChatGPT personnels à un seul espace validé. Ils gardent l'expérience de chat qu'ils apprécient ; vous retrouvez visibilité et contrôle sur les données de l'entreprise.",
        link: { label: "Découvrir WonkaChat", href: "/fr/wonka-chat" },
      },
      {
        title: "Interroger les documents de l'entreprise",
        body: "Vos équipes trouvent des réponses dans les contrats, procédures et dossiers projet stockés dans SharePoint, Google Drive ou Notion, avec le contexte de l'entreprise intégré.",
        link: { label: "Voir toutes les intégrations", href: "/fr/integrations" },
      },
      {
        title: "Des agents IA pour des tâches précises",
        body: "Créez des agents pour un rôle ou un workflow : suivi commercial, contrôles financiers, synthèses de support. Les actions importantes peuvent exiger une validation humaine avant exécution.",
        link: { label: "Découvrir l'agent IA pour entreprise", href: "/fr/agent-ia-entreprise" },
      },
      {
        title: "Traitement du support et des e-mails",
        body: "N-allo, filiale du groupe Engie, a déployé des agents IA sur ses e-mails de support et réduit de 50 % le temps de traitement, pour une équipe de plus de 70 personnes.",
        link: { label: "Lire nos cas clients", href: "/fr/cas-clients" },
      },
      {
        title: "Un assistant IA personnel pour chaque collaborateur",
        body: "Itzu a déployé des assistants WonkaChat personnels, connectés à ses systèmes internes, auprès de 100 % de ses collaborateurs. Chacun gagne plusieurs heures par semaine.",
        link: { label: "L'IA pour entreprise, par où commencer", href: "/fr/ia-pour-entreprise" },
      },
    ],
  },
  process: {
    eyebrow: "Comment démarrer",
    heading: "De ChatGPT Team à un espace de travail IA privé, en quelques semaines",
    steps: [
      {
        title: "Lancer l'essai gratuit",
        body: "Ouvrez un essai de 7 jours avec un accès complet à AI Workspace et 5 € d'usage IA inclus. Sans carte de crédit.",
      },
      {
        title: "Tester un vrai cas d'usage",
        body: "Choisissez une tâche que vos équipes font déjà dans ChatGPT, comme rédiger des réponses ou chercher dans des documents, et exécutez-la sur vos propres connaissances.",
      },
      {
        title: "Connecter vos outils et définir les accès",
        body: "Connectez les systèmes nécessaires, configurez l'authentification unique et décidez quels utilisateurs et quelles équipes accèdent à quelles données et à quels agents.",
      },
      {
        title: "Déployer et gouverner",
        body: "Invitez toute l'organisation, partagez des agents entre équipes et suivez l'usage grâce à la gouvernance et aux journaux d'audit. La tarification par utilisateur évolue avec votre équipe.",
      },
    ],
  },
  comparison: {
    eyebrow: "Comparatif",
    heading: "WonkaChat ou ChatGPT Business / Team ?",
    columns: ["Critère", "WonkaChat", "ChatGPT Business / Team"],
    rows: [
      [
        "Hébergement par défaut",
        "Azure West Europe (Microsoft Irlande), contrôle de la résidence des données dans l'UE",
        "Opéré par OpenAI, éditeur américain ; options de résidence selon l'offre",
      ],
      [
        "Modèles d'IA",
        "Au choix : modèles hébergés dans l'UE inclus, ou votre propre clé API",
        "Modèles OpenAI (une seule famille de modèles)",
      ],
      [
        "Outils de l'entreprise",
        "CRM, ERP, e-mail, documents : Odoo, SharePoint, Salesforce, HubSpot, Teams et plus",
        "Connecteurs vers des applications courantes ; périmètre selon l'offre",
      ],
      [
        "Agents et validations",
        "Agents partagés par rôle ou workflow, avec validation humaine",
        "GPTs personnalisés et fonctions d'agent",
      ],
      [
        "Certifications",
        "Certifié ISO 27001, conforme RGPD et NIS 2, SOC 2 Type II en cours",
        "Voir le trust portal d'OpenAI pour les certifications à jour",
      ],
      [
        "Entraînement sur vos données",
        "Les données clients ne servent pas à entraîner des modèles d'IA publics",
        "OpenAI indique ne pas entraîner ses modèles sur les données business par défaut",
      ],
      [
        "Contrôles d'administration",
        "SSO via Azure AD / Entra ID, MFA, permissions par utilisateur et équipe, journaux d'audit",
        "Console d'administration ; contrôles avancés selon l'offre",
      ],
      [
        "Options de déploiement",
        "Cloud géré, votre propre cloud ou on-premise (Enterprise)",
        "SaaS opéré par OpenAI",
      ],
      [
        "Accompagnement",
        "Équipe belge qui vous aide à définir et déployer vos cas d'usage",
        "Principalement en libre-service",
      ],
    ],
    footnote:
      "Les fonctionnalités et offres des concurrents évoluent vite. Ce tableau reflète des informations généralement connues au moment de la rédaction ; consultez le site d'OpenAI pour l'offre ChatGPT Business actuelle.",
  },
  faq: {
    heading: "ChatGPT entreprise : questions fréquentes",
    items: [
      {
        question: "Quelle alternative à ChatGPT Business pour une entreprise européenne ?",
        answer:
          "Cherchez un espace de travail IA qui garde l'expérience de chat que vos collaborateurs connaissent, mais sous le contrôle de votre entreprise. WonkaChat est hébergé dans Azure West Europe, certifié ISO 27001, conforme au RGPD et à NIS 2, vous laisse choisir votre modèle d'IA et se connecte à vos outils. Comparez-le sur un vrai cas d'usage avec l'essai gratuit de 7 jours.",
      },
      {
        question: "ChatGPT Team et ChatGPT Business, est-ce la même chose ?",
        answer:
          "ChatGPT Team est l'ancien nom de l'offre qu'OpenAI commercialise désormais sous le nom ChatGPT Business : un espace partagé pour les équipes qui utilisent les modèles OpenAI. WonkaChat répond au même besoin, un chat IA pour toute l'équipe, avec un hébergement dans l'UE par défaut, le choix du modèle et des connexions natives à Odoo, SharePoint ou Salesforce.",
      },
      {
        question: "Utiliser ChatGPT au travail est-il conforme au RGPD ?",
        answer:
          "Cela dépend de l'offre, du contrat et de ce que les collaborateurs y collent. Les comptes personnels représentent le plus grand risque : aucun accord, aucune visibilité, aucun contrôle pour l'entreprise. WonkaChat est conforme au RGPD, inclut un accord de traitement des données, héberge les données dans l'UE et n'utilise jamais les données clients pour entraîner des modèles publics.",
      },
      {
        question: "Où sont stockées nos données dans WonkaChat ?",
        answer:
          "WonkaChat est hébergé par défaut dans Azure West Europe (Microsoft Irlande), sur une infrastructure basée dans l'UE avec contrôle de la résidence des données. Les données sont chiffrées au repos (AES-256) et en transit (TLS 1.2 ou supérieur). Les clients Enterprise peuvent aussi opter pour leur propre cloud ou un déploiement on-premise, sur base contractuelle.",
      },
      {
        question: "Comment éviter le shadow AI sans freiner les équipes ?",
        answer:
          "Interdire ChatGPT déplace généralement l'usage vers les appareils personnels. La voie la plus efficace consiste à proposer un ChatGPT privé pour l'entreprise au moins aussi utile : connecté aux connaissances internes, accessible à tous et gouverné par l'IT avec SSO, permissions et journaux d'audit. C'est exactement le rôle de WonkaChat.",
      },
      {
        question: "Combien coûte WonkaChat par rapport à ChatGPT Team ?",
        answer:
          "WonkaChat applique une tarification transparente par utilisateur, avec 20 % de réduction en facturation annuelle. Les licences peuvent inclure des modèles d'IA hébergés dans l'UE sans facture à l'usage, ou fonctionner avec votre propre clé API. Au-delà de 1 000 licences, l'offre Enterprise est sur mesure. Consultez notre page tarifs pour votre équipe, et le site d'OpenAI pour la leur.",
      },
      {
        question: "WonkaChat se connecte-t-il à nos outils existants ?",
        answer:
          "Oui. WonkaChat se connecte aux outils de l'entreprise, comme le CRM, l'ERP, l'e-mail, les documents, les outils de projet et les bases de données internes : Odoo, SharePoint, Outlook, Microsoft Teams, Salesforce, HubSpot, Jira, Slack, Notion ou Google Drive. Vos équipes trouvent l'information et déclenchent des actions sans changer d'application.",
      },
      {
        question: "Les actions de l'IA peuvent-elles exiger une validation humaine ?",
        answer:
          "Oui. WonkaChat prend en charge les workflows avec humain dans la boucle : une action comme la mise à jour d'une fiche ou l'envoi d'une réponse peut être relue avant exécution. Associé aux permissions par utilisateur et par équipe, cela vous permet de confier un vrai travail aux agents sans perdre le contrôle de vos systèmes.",
      },
    ],
  },
  related: {
    heading: "Pour aller plus loin",
    links: [
      {
        label: "Wonka AI vs ChatGPT Enterprise",
        href: "/fr/vs/wonka-ai-vs-chatgpt-enterprise",
        description: "Le comparatif détaillé pour les grandes organisations.",
      },
      {
        label: "WonkaChat, l'espace de travail IA",
        href: "/fr/wonka-chat",
        description: "Chat, agents et connexions à vos outils, au même endroit.",
      },
      {
        label: "Tarifs WonkaChat",
        href: "/fr/pricing",
        description: "Licences par utilisateur et essai gratuit de 7 jours.",
      },
      {
        label: "Wonka AI vs Microsoft Copilot",
        href: "/fr/vs/wonka-ai-vs-microsoft-copilot",
        description: "Comment WonkaChat se compare à Copilot.",
      },
      {
        label: "LLM privé ou LLM public",
        href: "/fr/vs/private-llm-vs-public-llm",
        description: "Ce qui change quand l'IA tourne en privé.",
      },
      {
        label: "IA pour entreprise",
        href: "/fr/ia-pour-entreprise",
        description: "Ce que l'IA peut faire pour votre entreprise.",
      },
      {
        label: "La souveraineté des données",
        href: "/fr/apprendre/data-sovereignty",
        description: "Pourquoi la localisation des données compte.",
      },
      {
        label: "Agence IA",
        href: "/fr/agence-ia",
        description: "Stratégie, développement et déploiement avec Wonka.",
      },
      { label: "Comparatif IA entreprise", href: "/fr/comparatif-ia-entreprise", description: "ChatGPT, Claude, Gemini, Copilot et Le Chat comparés pour les PME et ETI." },
      { label: "Shadow AI : définition et risques", href: "/fr/shadow-ai", description: "Reprendre la main sur les usages d'IA non encadrés, sans les interdire." },
    ],
  },
  cta: {
    heading: "Offrez à vos équipes un ChatGPT entreprise, en toute confidentialité.",
    body: "Lancez l'essai gratuit de 7 jours ou réservez une courte démo. Nous vous montrons comment WonkaChat se connecte à vos outils et remplace les comptes ChatGPT personnels par un seul espace de travail IA gouverné.",
  },
};

const nl: LandingCopy = {
  seo: {
    title: "ChatGPT voor bedrijven, privé en in de EU | Wonka AI",
    description:
      "ChatGPT voor bedrijven zonder shadow AI: WonkaChat is een privé AI-werkplek, gehost in de EU en ISO 27001-gecertificeerd. Start uw gratis proef.",
  },
  breadcrumb: "ChatGPT voor bedrijven",
  schema: {
    serviceName: "WonkaChat: privé ChatGPT voor bedrijven",
    serviceType: "Privé AI-werkplek voor bedrijven",
  },
  hero: {
    eyebrow: "ChatGPT Business alternatief",
    title: "ChatGPT voor bedrijven: privé, veilig en gehost in Europa.",
    subtitle:
      "Uw medewerkers gebruiken al ChatGPT. WonkaChat geeft hen dezelfde chatervaring in een beheerde AI-werkplek: hosting in de EU, de kennis en tools van uw bedrijf ingebouwd, en beheercontroles waar uw IT-team op kan vertrouwen.",
    primaryCta: { label: "Start uw gratis proef", href: "trial" },
    secondaryCta: {
      label: "Vergelijk met ChatGPT Enterprise",
      href: "/nl/vs/wonka-ai-vs-chatgpt-enterprise",
    },
    facts: [
      ["Hosting", "Azure West Europe"],
      ["Compliance", "ISO 27001 · AVG · NIS 2"],
      ["Gratis proef", "7 dagen, geen kredietkaart"],
      ["Prijs", "Per licentie, -20% jaarlijks"],
    ],
  },
  answer: {
    heading: "Wat is ChatGPT voor bedrijven?",
    paragraphs: [
      "ChatGPT voor bedrijven betekent dat medewerkers een AI-chat zoals ChatGPT gebruiken binnen een omgeving die het bedrijf zelf beheert: bedrijfsdata beschermd, toegang geregeld en gebruik onder controle. WonkaChat is een privé alternatief voor ChatGPT Business en Team: een AI-werkplek gehost in Azure West Europe, gekoppeld aan uw tools en ISO 27001-gecertificeerd.",
      "In de meeste bedrijven is AI er al. Medewerkers plakken e-mails, contracten en klantgegevens in hun persoonlijke ChatGPT-account, omdat het hen tijd bespaart. Dat is shadow AI: nuttig voor de medewerker, onzichtbaar voor IT en riskant voor het bedrijf. Een verbod werkt zelden. Een beter, goedgekeurd alternatief aanbieden wel. De echte vraag is niet óf uw teams ChatGPT zakelijk gebruiken, maar waar uw bedrijfsdata dan terechtkomt.",
      "WonkaChat behoudt de vertrouwde chatervaring en voegt toe wat een bedrijf echt nodig heeft. Antwoorden steunen op uw eigen kennis en systemen, van SharePoint-documenten tot records in Odoo, Salesforce of HubSpot. Uw organisatie kiest het AI-model dat past bij haar behoeften en beveiligingseisen: in de EU gehoste modellen inbegrepen, of uw eigen API-sleutel. Beheerders bepalen wie toegang heeft tot welke data en agents, met single sign-on, auditlogs en menselijke goedkeuring voor belangrijke acties. En het gaat verder dan chat: teams maken AI-agents voor specifieke taken en AI-automatiseringen voor repetitief werk.",
      "Het resultaat is een privé ChatGPT voor uw bedrijf dat AVG-conform is by design: data gehost in de EU, een verwerkersovereenkomst (DPA) inbegrepen, en klantdata die nooit gebruikt wordt om publieke AI-modellen te trainen. U test het op een echte use case met een gratis proef van 7 dagen, zonder kredietkaart.",
    ],
  },
  benefits: {
    eyebrow: "Waarom bedrijven overstappen",
    heading: "Een privé ChatGPT voor bedrijven, gemaakt voor Europese teams",
    items: [
      {
        title: "Uw data blijft in Europa",
        body: "WonkaChat wordt standaard gehost in Azure West Europe (Microsoft Ierland), op EU-infrastructuur met controle over dataresidentie. Data wordt versleuteld in rust (AES-256) en onderweg (TLS 1.2 of hoger).",
      },
      {
        title: "AVG-conforme ChatGPT",
        body: "Wonka AI is ISO 27001-gecertificeerd, AVG-conform en NIS 2-conform; de SOC 2 Type II-audit loopt. Een verwerkersovereenkomst is inbegrepen en klantdata wordt niet gebruikt om publieke AI-modellen te trainen.",
      },
      {
        title: "Kies uw eigen AI-model",
        body: "U zit niet vast aan één modelfamilie. Gebruik de in de EU gehoste AI-modellen die in uw licentie inbegrepen zijn, of uw eigen API-sleutel met de facturatie van uw provider.",
      },
      {
        title: "Gebaseerd op uw bedrijfskennis",
        body: "WonkaChat koppelt met de systemen die uw team al gebruikt (CRM, ERP, e-mail, documenten, projecttools en interne databases), zodat antwoorden uw bedrijfscontext weerspiegelen in plaats van algemene internetkennis.",
      },
      {
        title: "Beheercontroles vanaf dag één",
        body: "Beheer toegang en rechten per gebruiker en team, bepaal welke agents voor wie beschikbaar zijn en verplicht single sign-on via Azure AD / Entra ID met MFA. Governance en auditlogs zitten in elke betaalde licentie.",
      },
      {
        title: "Gebouwd voor elke medewerker",
        body: "WonkaChat is ontworpen voor de hele organisatie, niet alleen voor early adopters. Medewerkers werken in gewone taal met gedeelde agents en begeleide workflows, zodat adoptie niet afhangt van enkele AI-experts.",
      },
    ],
  },
  useCases: {
    eyebrow: "Wat teams ermee doen",
    heading: "ChatGPT zakelijk inzetten, gekoppeld aan uw tools",
    items: [
      {
        title: "Persoonlijke ChatGPT-accounts vervangen",
        body: "Breng medewerkers van persoonlijke ChatGPT-accounts naar één goedgekeurde werkplek. Zij behouden de chatervaring die ze kennen; u krijgt opnieuw zicht en controle over bedrijfsdata.",
        link: { label: "Ontdek WonkaChat", href: "/nl/wonka-chat" },
      },
      {
        title: "Vragen stellen over bedrijfsdocumenten",
        body: "Laat medewerkers antwoorden vinden in contracten, procedures en projectdossiers in SharePoint, Google Drive of Notion, met de context van uw bedrijf ingebouwd.",
        link: { label: "Bekijk alle integraties", href: "/nl/integrations" },
      },
      {
        title: "AI-agents voor specifieke taken",
        body: "Bouw agents voor een rol of workflow, van sales-opvolging tot financiële controles of supportsamenvattingen. Belangrijke acties kunnen menselijke goedkeuring vereisen voor ze uitgevoerd worden.",
        link: { label: "Meer over AI-agents", href: "/nl/ai-agents" },
      },
      {
        title: "Support en e-mailverwerking",
        body: "Engie-dochter N-allo zette AI-agents in op support-e-mails en halveerde de verwerkingstijd (-50%) voor een team van meer dan 70 medewerkers.",
        link: { label: "Lees onze klantcases", href: "/nl/klantcases" },
      },
      {
        title: "Een persoonlijke AI-assistent voor elke medewerker",
        body: "Itzu gaf 100% van zijn medewerkers een persoonlijke WonkaChat-assistent, gekoppeld aan de interne systemen. Medewerkers besparen meerdere uren per week.",
        link: { label: "AI voor bedrijven: waar begint u?", href: "/nl/ai-voor-bedrijven" },
      },
    ],
  },
  process: {
    eyebrow: "Zo start u",
    heading: "Van ChatGPT Team naar een privé AI-werkplek, in enkele weken",
    steps: [
      {
        title: "Start een gratis proef",
        body: "Open een proef van 7 dagen met volledige toegang tot AI Workspace en € 5 AI-gebruik inbegrepen. Geen kredietkaart nodig.",
      },
      {
        title: "Test een echte use case",
        body: "Kies een taak die uw team vandaag al in ChatGPT doet, zoals antwoorden opstellen of documenten doorzoeken, en voer ze uit op uw eigen bedrijfskennis.",
      },
      {
        title: "Koppel uw tools en stel rechten in",
        body: "Koppel de systemen die u nodig hebt, stel single sign-on in en bepaal welke gebruikers en teams toegang krijgen tot welke data en agents.",
      },
      {
        title: "Uitrollen en beheren",
        body: "Nodig de hele organisatie uit, deel agents tussen teams en volg het gebruik via governance en auditlogs. De prijs per licentie groeit mee met uw team.",
      },
    ],
  },
  comparison: {
    eyebrow: "Naast elkaar",
    heading: "WonkaChat vs ChatGPT Business / Team",
    columns: ["Criterium", "WonkaChat", "ChatGPT Business / Team"],
    rows: [
      [
        "Standaard hosting",
        "Azure West Europe (Microsoft Ierland), controle over dataresidentie in de EU",
        "Beheerd door OpenAI, een Amerikaanse leverancier; residentie-opties afhankelijk van het plan",
      ],
      [
        "AI-modellen",
        "Vrije keuze: in de EU gehoste modellen inbegrepen, of uw eigen API-sleutel",
        "OpenAI-modellen (één modelfamilie)",
      ],
      [
        "Bedrijfstools",
        "CRM, ERP, e-mail, documenten: Odoo, SharePoint, Salesforce, HubSpot, Teams en meer",
        "Connectoren naar populaire apps; bereik afhankelijk van het plan",
      ],
      [
        "Agents en goedkeuring",
        "Gedeelde agents per rol of workflow, met menselijke goedkeuring",
        "Custom GPT's en agentfuncties",
      ],
      [
        "Certificeringen",
        "ISO 27001-gecertificeerd, AVG- en NIS 2-conform, SOC 2 Type II loopt",
        "Zie het trust portal van OpenAI voor actuele certificeringen",
      ],
      [
        "Training op uw data",
        "Klantdata wordt niet gebruikt om publieke AI-modellen te trainen",
        "OpenAI stelt dat zakelijke data standaard niet voor training gebruikt wordt",
      ],
      [
        "Beheercontroles",
        "SSO via Azure AD / Entra ID, MFA, rechten per gebruiker en team, auditlogs",
        "Beheerconsole; geavanceerde controles afhankelijk van het plan",
      ],
      [
        "Uitrolopties",
        "Beheerde cloud, uw eigen cloud of on-premise (Enterprise)",
        "SaaS beheerd door OpenAI",
      ],
      [
        "Begeleiding",
        "Belgisch team dat u helpt use cases te bepalen en uit te rollen",
        "Voornamelijk self-service",
      ],
    ],
    footnote:
      "Functies en plannen van concurrenten veranderen snel. Deze tabel geeft algemeen bekende informatie weer op het moment van schrijven; raadpleeg de website van OpenAI voor het actuele ChatGPT Business-aanbod.",
  },
  faq: {
    heading: "ChatGPT voor bedrijven: veelgestelde vragen",
    items: [
      {
        question: "Wat is een goed ChatGPT Business alternatief voor Europese bedrijven?",
        answer:
          "Kies een AI-werkplek die de chatervaring behoudt die medewerkers kennen, maar onder de controle van uw bedrijf draait. WonkaChat wordt gehost in Azure West Europe, is ISO 27001-gecertificeerd, AVG- en NIS 2-conform, laat u uw AI-model kiezen en koppelt met uw eigen tools. Vergelijk het op een echte use case met de gratis proef van 7 dagen.",
      },
      {
        question: "Is ChatGPT Team hetzelfde als ChatGPT Business?",
        answer:
          "ChatGPT Team is de vroegere naam van het plan dat OpenAI nu als ChatGPT Business verkoopt: een gedeelde werkruimte voor teams die OpenAI-modellen gebruiken. WonkaChat beantwoordt dezelfde nood, AI-chat voor het hele team, met standaard hosting in de EU, keuze uit AI-modellen en native koppelingen met bedrijfssystemen zoals Odoo, SharePoint of Salesforce.",
      },
      {
        question: "Is ChatGPT zakelijk gebruiken AVG-conform?",
        answer:
          "Dat hangt af van het plan, het contract en wat medewerkers erin plakken. Persoonlijke accounts vormen het grootste risico: het bedrijf heeft geen overeenkomst, geen zicht en geen controle. WonkaChat is AVG-conform, bevat een verwerkersovereenkomst, host data in de EU en gebruikt klantdata nooit om publieke AI-modellen te trainen.",
      },
      {
        question: "Waar wordt onze bedrijfsdata bewaard in WonkaChat?",
        answer:
          "WonkaChat wordt standaard gehost in Azure West Europe (Microsoft Ierland), op EU-infrastructuur met controle over dataresidentie. Data wordt versleuteld in rust met AES-256 en onderweg met TLS 1.2 of hoger. Enterprise-klanten kunnen ook kiezen voor hun eigen cloud of een on-premise uitrol, als dat contractueel is vastgelegd.",
      },
      {
        question: "Hoe stopt u shadow AI zonder uw teams af te remmen?",
        answer:
          "Een verbod op ChatGPT verschuift het gebruik meestal naar persoonlijke toestellen. Doeltreffender is een goedgekeurde privé ChatGPT voor het bedrijf die minstens even nuttig is: gekoppeld aan interne kennis, beschikbaar voor iedereen en beheerd door IT met single sign-on, rechten en auditlogs. Precies die rol speelt WonkaChat.",
      },
      {
        question: "Wat kost WonkaChat in vergelijking met ChatGPT Team?",
        answer:
          "WonkaChat werkt met transparante prijzen per licentie, met 20% korting bij jaarlijkse facturatie. Licenties kunnen in de EU gehoste AI-modellen bevatten zonder verbruiksfacturen, of u gebruikt uw eigen API-sleutel. Organisaties met meer dan 1.000 licenties krijgen een Enterprise-prijs op maat. Bekijk onze prijspagina voor uw teamgrootte, en de site van OpenAI voor die van hen.",
      },
      {
        question: "Kan WonkaChat koppelen met onze bestaande tools?",
        answer:
          "Ja. WonkaChat koppelt met bedrijfstools zoals CRM, ERP, e-mail, documenten, projecttools en interne databases, waaronder Odoo, SharePoint, Outlook, Microsoft Teams, Salesforce, HubSpot, Jira, Slack, Notion en Google Drive. Medewerkers vinden informatie en starten acties zonder tussen applicaties te wisselen, binnen de rechten die u instelt.",
      },
      {
        question: "Kunnen belangrijke AI-acties menselijke goedkeuring vereisen?",
        answer:
          "Ja. WonkaChat ondersteunt human-in-the-loop-workflows: een actie zoals een record bijwerken of een antwoord versturen kan eerst nagekeken worden. Samen met rechten per gebruiker en team geeft u agents zo echt werk, zonder de controle te verliezen over wat er in uw systemen gebeurt.",
      },
    ],
  },
  related: {
    heading: "Verder lezen",
    links: [
      {
        label: "Wonka AI vs ChatGPT Enterprise",
        href: "/nl/vs/wonka-ai-vs-chatgpt-enterprise",
        description: "De uitgebreide vergelijking voor grotere organisaties.",
      },
      {
        label: "WonkaChat, de AI-werkplek",
        href: "/nl/wonka-chat",
        description: "Chat, agents en koppelingen met uw tools op één plek.",
      },
      {
        label: "Prijzen van WonkaChat",
        href: "/nl/pricing",
        description: "Licenties per gebruiker en een gratis proef van 7 dagen.",
      },
      {
        label: "Wonka AI vs Microsoft Copilot",
        href: "/nl/vs/wonka-ai-vs-microsoft-copilot",
        description: "Hoe WonkaChat zich verhoudt tot Copilot voor bedrijven.",
      },
      {
        label: "Privé LLM vs publieke LLM",
        href: "/nl/vs/private-llm-vs-public-llm",
        description: "Wat verandert er als AI privé draait?",
      },
      {
        label: "AI voor bedrijven",
        href: "/nl/ai-voor-bedrijven",
        description: "Wat AI voor uw bedrijf kan doen, en hoe u start.",
      },
      {
        label: "Datasoevereiniteit uitgelegd",
        href: "/nl/leren/data-sovereignty",
        description: "Waarom de locatie van uw data telt.",
      },
      {
        label: "AI-consultancy",
        href: "/nl/ai-consultancy",
        description: "Strategie, bouw en uitrol met Wonka.",
      },
    ],
  },
  cta: {
    heading: "Geef uw team ChatGPT voor bedrijven, op de privé manier.",
    body: "Start een gratis proef van 7 dagen of plan een korte demo. We tonen u hoe WonkaChat koppelt met uw tools en persoonlijke ChatGPT-accounts vervangt door één beheerde AI-werkplek.",
  },
};

export const CHATGPT_FOR_BUSINESS_COPY: Record<Locale, LandingCopy> = { en, fr, nl };
