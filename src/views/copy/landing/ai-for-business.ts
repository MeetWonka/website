import type { Locale } from "@/i18n/config";
import type { LandingCopy } from "@/views/copy/landing-types";

/**
 * /ai-for-business · /fr/ia-pour-entreprise · /nl/ai-voor-bedrijven
 * Broad intent: what companies can do with AI, how to start, private & GDPR-safe AI,
 * from strategy to agents. Links out to the specific product pages.
 * Facts only from: start-ai / wonka-build / wonka-chat defaults, security copy,
 * pricing.json, home.json, case-study fallbacks (Itzu, N-allo), VLAIO KMO-portefeuille.
 */

const en: LandingCopy = {
  seo: {
    title: "AI for Business: Private, Secure & Practical | Wonka AI",
    description:
      "AI for business, done right: strategy, private GDPR-compliant AI workspace and custom agents, hosted in Europe. Book a 30-minute call with Wonka AI.",
  },
  breadcrumb: "AI for business",
  schema: {
    serviceName: "AI for business: strategy, private AI workspace and AI agents",
    serviceType: "Enterprise AI implementation",
  },
  hero: {
    eyebrow: "AI for companies",
    title: "AI for business that your whole team actually uses.",
    subtitle:
      "From AI strategy to a private AI workspace and custom agents connected to your tools. Wonka AI helps Belgian and European companies turn AI from scattered experiments into daily, governed work.",
    primaryCta: { label: "Book a 30-minute call", href: "meeting" },
    secondaryCta: { label: "Discover the Start AI program", href: "/start-ai" },
    facts: [
      ["Recognition", "#1 AI start-up of the year, Belgium Startup Awards 2026"],
      ["Security", "ISO 27001 · GDPR · NIS 2"],
      ["Hosting", "Azure West Europe by default"],
      ["Start AI", "+150 programs completed"],
    ],
  },
  answer: {
    heading: "What is AI for business?",
    paragraphs: [
      "AI for business means using artificial intelligence inside a company's real workflows: answering questions from internal knowledge, drafting and checking documents, processing orders and invoices, and running agents that act in your ERP or CRM. Done well, it is private, governed and used by every team, not only by a few early adopters.",
      "Most companies do not lack AI tools. They lack clarity on where AI creates value, rules for using it safely, and a way to bring it to everyone. In many organisations, AI value stays with a small group of pioneers; their better ways of working rarely spread across teams. If everyone uses AI differently, the organisation loses control; if nobody uses it, the organisation loses momentum.",
      "Enterprise AI therefore starts with priorities, not tools. Wonka AI works in three layers: Start AI to define your AI strategy and roadmap, WonkaChat as one secure AI workspace for the whole organisation, and Wonka Build for custom AI applications and agents that run in production on top of the systems you already use. You do not need a finished AI strategy to start: if you know the process that is costing you, that is enough. Many clients run WonkaChat and Wonka Build side by side.",
      "Private AI is the foundation of all three. Wonka AI is hosted in Azure West Europe (Microsoft Ireland) by default, is ISO 27001 certified, GDPR compliant and NIS 2 compliant, and customer data is not used to train public AI models. When required, custom builds can run on-premise, inside your own network.",
    ],
  },
  benefits: {
    eyebrow: "Why companies adopt AI",
    heading: "What AI for business changes in your company.",
    items: [
      {
        title: "Less repetitive work",
        body: "Your team should not spend its best hours copying information, searching documents or moving work between systems. AI takes over the repetitive part, so people focus on judgement and clients.",
      },
      {
        title: "Company knowledge on demand",
        body: "Employees get accurate answers in seconds, grounded in your own documents and tools, instead of hunting through folders, emails and wikis.",
      },
      {
        title: "Private AI, not shadow AI",
        body: "One approved, EU-hosted environment with role-based access, audit logs and SSO replaces the patchwork of personal AI accounts nobody controls.",
      },
      {
        title: "Adoption across every team",
        body: "AI should not stay with the pioneers. Shared agents, guided workflows and simple chat make AI usable for every employee, not just technical profiles.",
      },
      {
        title: "Measurable results",
        body: "At N-allo (Engie), AI agents cut time spent on support emails by 50% across a team of more than 70 employees. Priorities are chosen on impact and feasibility.",
      },
      {
        title: "Governance built in",
        body: "An AI policy, clear guidelines and human approval for important actions keep enterprise AI responsible, auditable and aligned with your organisation.",
      },
    ],
  },
  useCases: {
    eyebrow: "AI for business use cases",
    heading: "Where AI for business creates value first.",
    items: [
      {
        title: "Define your AI strategy and roadmap",
        body: "Know AI matters but not where to start? Start AI analyses your processes, validates the opportunities with the highest return and hands you a prioritised roadmap, a 90-day execution plan and an AI policy.",
        link: { label: "Explore the Start AI program", href: "/start-ai" },
      },
      {
        title: "Give every employee a secure AI workspace",
        body: "WonkaChat gives your whole team one place to chat with AI, use company knowledge and shared agents, with the AI model that fits your needs and the controls your organisation expects.",
        link: { label: "Discover the WonkaChat AI workspace", href: "/wonka-chat" },
      },
      {
        title: "Automate workflows with AI agents",
        body: "Lead follow-up, order intake, invoice processing, ticket triage: agents read approved data, prepare the work and write back to your systems only after confirmation.",
        link: { label: "See how private AI agents work", href: "/ai-agents" },
      },
      {
        title: "Build custom AI applications",
        body: "When the AI you need doesn't exist off the shelf, Wonka Build engineers it around your data and ships it into production, then trains someone on your team to own it.",
        link: { label: "Learn about Wonka Build", href: "/wonka-build" },
      },
      {
        title: "Connect AI to the tools you already use",
        body: "Odoo, SharePoint, Outlook, Microsoft Teams, Salesforce, HubSpot, Slack, Notion, Jira and Google Drive: enterprise AI is only useful when it sits on top of your real systems.",
        link: { label: "Browse all integrations", href: "/integrations" },
      },
    ],
  },
  process: {
    eyebrow: "How to start",
    heading: "How to implement AI in your company, step by step.",
    steps: [
      {
        title: "A 30-minute discovery call",
        body: "Tell us how you work. We tell you where AI would make a real difference, and where it wouldn't. No slides, no pitch, and a clear next step at the end.",
      },
      {
        title: "Clarify priorities with Start AI",
        body: "We map workflows and bottlenecks, then assess every opportunity on impact, feasibility, readiness and strategic relevance. You leave with business cases, quick wins and a concrete roadmap.",
      },
      {
        title: "Roll out a private AI workspace",
        body: "Your team gets WonkaChat, connected to your tools and knowledge, with SSO, permissions and audit logs. Test it first with a 7-day free trial, no credit card required.",
      },
      {
        title: "Build agents for the processes that cost you",
        body: "We connect to your ERP, CRM, email and documents, then build and ship agents that handle real workflows end to end, with human validation where it matters.",
      },
      {
        title: "Stay until everyone uses it",
        body: "Most AI projects fail at adoption, not at technology. We stay after go-live to stabilise, fine-tune and train your team, and hand over ownership.",
      },
    ],
  },
  faq: {
    heading: "AI for business: frequently asked questions",
    items: [
      {
        question: "How can AI be used in a business?",
        answer:
          "Companies use AI to answer employee questions from internal documents, draft replies and reports, extract data from emails and PDFs, process orders and invoices, triage support tickets and follow up on leads. The biggest gains come when AI is connected to your own tools and data, so it can move real work forward instead of only generating text.",
      },
      {
        question: "Where should a company start with AI?",
        answer:
          "Start with priorities, not tools. Identify the workflows where time is lost and quality is under pressure, validate which AI opportunities are both valuable and realistic, and set basic governance. Start AI does exactly that: it ends with a prioritised roadmap, a 90-day execution plan and a leadership presentation ready to share.",
      },
      {
        question: "What is private AI for companies?",
        answer:
          "Private AI means your company data stays in a controlled environment and is not used to train public AI models. Wonka AI is hosted in Azure West Europe (Microsoft Ireland) by default, with encryption at rest and in transit, role-based access and audit logs. Custom builds can also run on-premise, inside your own network.",
      },
      {
        question: "Is enterprise AI GDPR compliant?",
        answer:
          "It depends on the provider and on how it is deployed. Wonka AI is GDPR compliant, ISO 27001 certified and NIS 2 compliant, with a SOC 2 Type II audit in progress. A Data Processing Agreement is available, and you control which users, teams and agents can access which data.",
      },
      {
        question: "How much does AI for business cost?",
        answer:
          "It depends on what you need. The Start AI strategy program starts at €15,000, and Flemish SMEs can claim up to 70% back through the VLAIO KMO-portefeuille. WonkaChat is priced per seat, with a 7-day free trial. Custom Wonka Build projects are scoped to your processes.",
      },
      {
        question: "Do we need technical AI skills in-house?",
        answer:
          "No. WonkaChat is built for every employee, with simple chat, shared agents and guided workflows. For custom builds, we upskill someone on your team to own, run and extend what we deliver, so you are never dependent on us to keep it running.",
      },
      {
        question: "Is a tool like ChatGPT enough for a company?",
        answer:
          "General-purpose chat tools help individuals, but a company usually also needs connections to its own systems, shared agents, permissions, audit logs and a clear data location. That is the difference between personal AI use and AI for business. Compare the options on our ChatGPT for business page.",
      },
      {
        question: "How fast can we see results?",
        answer:
          "Most teams kick off Start AI within 2 weeks of the first call, and the program itself runs for about six weeks, asking roughly half a day per week from 2 to 3 key people. Quick wins your team can act on immediately are part of the deliverables.",
      },
    ],
  },
  related: {
    heading: "Explore AI for business with Wonka AI",
    links: [
      {
        label: "Start AI: AI strategy and roadmap",
        href: "/start-ai",
        description: "A 6-week program to find and prioritise your AI opportunities.",
      },
      {
        label: "WonkaChat: private AI workspace",
        href: "/wonka-chat",
        description: "One secure AI workspace for your entire organisation.",
      },
      {
        label: "Private enterprise AI agents",
        href: "/ai-agents",
        description: "Agents connected to Odoo, SharePoint, Outlook, CRM and ERP.",
      },
      {
        label: "Wonka Build: custom AI applications",
        href: "/wonka-build",
        description: "Custom agents and applications shipped into production.",
      },
      {
        label: "AI consultancy",
        href: "/ai-consultancy",
        description: "Wonka AI as your partner from strategy to deployment.",
      },
      {
        label: "ChatGPT for business alternative",
        href: "/chatgpt-for-business",
        description: "A private, EU-hosted, multi-model AI workspace for companies.",
      },
      {
        label: "How to calculate enterprise AI ROI",
        href: "/blog/how-to-calculate-roi-enterprise-ai",
        description: "Build the business case before you invest.",
      },
      {
        label: "Customer case studies",
        href: "/case-studies",
        description: "How Itzu and N-allo (Engie) put AI to work.",
      },
    ],
  },
  cta: {
    heading: "Ready to make AI work for your business?",
    body: "Book a 30-minute call. You'll know what's realistic, how fast, and what the right next step is, whether that's Start AI, WonkaChat or Wonka Build.",
  },
};

const fr: LandingCopy = {
  seo: {
    title: "IA pour entreprise : stratégie, IA privée, agents | Wonka",
    description:
      "IA pour entreprise, privée et conforme RGPD : stratégie, espace de travail IA et agents IA, hébergés en Europe. Réservez un appel de 30 minutes.",
  },
  breadcrumb: "IA pour entreprise",
  schema: {
    serviceName: "IA pour entreprise : stratégie IA, espace de travail IA privé et agents IA",
    serviceType: "Solution d'intelligence artificielle pour entreprise",
  },
  hero: {
    eyebrow: "Intelligence artificielle entreprise",
    title: "L'IA pour entreprise que toutes vos équipes utilisent vraiment.",
    subtitle:
      "De la stratégie IA à un espace de travail IA privé et des agents connectés à vos outils : Wonka AI aide les entreprises belges et européennes à passer des expérimentations dispersées à une IA encadrée, utilisée au quotidien.",
    primaryCta: { label: "Réserver un appel de 30 minutes", href: "meeting" },
    secondaryCta: { label: "Découvrir le programme Start AI", href: "/fr/start-ai" },
    facts: [
      ["Distinction", "Start-up IA n°1 de l'année, Belgium Startup Awards 2026"],
      ["Sécurité", "ISO 27001 · RGPD · NIS 2"],
      ["Hébergement", "Azure West Europe par défaut"],
      ["Start AI", "+150 programmes réalisés"],
    ],
  },
  answer: {
    heading: "Qu'est-ce que l'IA pour entreprise ?",
    paragraphs: [
      "L'IA pour entreprise, c'est l'intelligence artificielle intégrée aux vrais processus d'une organisation : répondre aux questions à partir des connaissances internes, rédiger et vérifier des documents, traiter commandes et factures, et faire agir des agents dans votre ERP ou votre CRM. Bien déployée, elle est privée, encadrée et utilisée par toutes les équipes.",
      "La plupart des entreprises ne manquent pas d'outils d'IA. Elles manquent de clarté sur l'endroit où l'IA crée de la valeur, de règles pour l'utiliser en sécurité et d'une méthode pour la rendre accessible à tous. Souvent, la valeur de l'IA reste entre les mains de quelques pionniers et se diffuse rarement dans les équipes. Si chacun utilise l'IA à sa manière, l'organisation perd le contrôle ; si personne ne l'utilise, elle perd son élan.",
      "Une solution IA entreprise commence donc par les priorités, pas par les outils. Wonka AI intervient sur trois niveaux : Start AI pour définir votre stratégie et votre feuille de route IA, WonkaChat comme assistant IA entreprise et espace de travail sécurisé pour toute l'organisation, et Wonka Build pour des applications et agents IA sur mesure, en production sur vos systèmes existants. Pas besoin d'une stratégie IA aboutie pour commencer : si vous connaissez le processus qui vous coûte, c'est suffisant.",
      "L'IA privée est la base des trois. Wonka AI est hébergé par défaut dans Azure West Europe (Microsoft Irlande), certifié ISO 27001, conforme au RGPD et à NIS 2, et les données clients ne servent pas à entraîner des modèles d'IA publics. Si nécessaire, les développements sur mesure peuvent tourner sur site, dans votre propre réseau.",
    ],
  },
  benefits: {
    eyebrow: "Pourquoi adopter l'IA",
    heading: "Ce que l'IA pour entreprise change concrètement.",
    items: [
      {
        title: "Moins de travail répétitif",
        body: "Vos équipes ne devraient pas passer leurs meilleures heures à copier des informations ou chercher des documents. L'IA prend en charge la partie répétitive.",
      },
      {
        title: "Le savoir de l'entreprise, à la demande",
        body: "Vos collaborateurs obtiennent des réponses précises en quelques secondes, fondées sur vos propres documents et outils, au lieu de fouiller dossiers, e-mails et intranet.",
      },
      {
        title: "Une IA privée plutôt qu'une IA fantôme",
        body: "Un environnement unique, approuvé et hébergé dans l'UE, avec contrôle d'accès par rôle, journaux d'audit et SSO, remplace les comptes d'IA personnels que personne ne maîtrise.",
      },
      {
        title: "L'IA pour toutes les équipes",
        body: "L'IA ne doit pas rester l'affaire des pionniers. Chat simple, agents partagés et workflows guidés rendent l'IA utilisable par chaque collaborateur, pas seulement par les profils techniques.",
      },
      {
        title: "Des résultats mesurables",
        body: "Chez N-allo (Engie), des agents IA ont réduit de 50 % le temps consacré aux e-mails de support, pour une équipe de plus de 70 collaborateurs. Les priorités sont choisies selon l'impact et la faisabilité.",
      },
      {
        title: "Une gouvernance intégrée",
        body: "Une politique IA, des lignes directrices claires et une validation humaine pour les actions importantes gardent l'intelligence artificielle en entreprise responsable et auditable.",
      },
    ],
  },
  useCases: {
    eyebrow: "Cas d'usage de l'IA pour entreprise",
    heading: "Où l'IA pour les entreprises crée de la valeur en premier.",
    items: [
      {
        title: "Définir votre stratégie et votre feuille de route IA",
        body: "Vous savez que l'IA compte, sans savoir par où commencer ? Start AI analyse vos processus, valide les opportunités au meilleur retour et vous remet une feuille de route priorisée, un plan d'exécution à 90 jours et une politique IA.",
        link: { label: "Découvrir le programme Start AI", href: "/fr/start-ai" },
      },
      {
        title: "Un assistant IA entreprise pour chaque collaborateur",
        body: "WonkaChat offre à toute votre équipe un seul endroit pour échanger avec l'IA, exploiter le savoir de l'entreprise et des agents partagés, avec le modèle d'IA qui vous convient et les contrôles attendus.",
        link: { label: "Découvrir l'espace de travail WonkaChat", href: "/fr/wonka-chat" },
      },
      {
        title: "Automatiser vos workflows avec un agent IA entreprise",
        body: "Suivi des leads, réception des commandes, traitement des factures, tri des tickets : les agents lisent les données autorisées, préparent le travail et n'écrivent dans vos systèmes qu'après validation.",
        link: { label: "Tout savoir sur l'agent IA entreprise", href: "/fr/agent-ia-entreprise" },
      },
      {
        title: "Développer des applications d'IA générative sur mesure",
        body: "Quand l'IA dont vous avez besoin n'existe pas sur étagère, Wonka Build la conçoit autour de vos données, la met en production, puis forme une personne de votre équipe pour en prendre la responsabilité.",
        link: { label: "Découvrir Wonka Build", href: "/fr/wonka-build" },
      },
      {
        title: "Connecter l'IA aux outils que vous utilisez déjà",
        body: "Odoo, SharePoint, Outlook, Microsoft Teams, Salesforce, HubSpot, Slack, Notion, Jira et Google Drive : l'IA générative en entreprise n'est utile que si elle s'appuie sur vos vrais systèmes.",
        link: { label: "Voir toutes les intégrations", href: "/fr/integrations" },
      },
    ],
  },
  process: {
    eyebrow: "Comment démarrer",
    heading: "Mettre en place l'IA dans votre entreprise, étape par étape.",
    steps: [
      {
        title: "Un appel découverte de 30 minutes",
        body: "Expliquez-nous comment vous travaillez. Nous vous disons où l'IA ferait une vraie différence, et où elle n'en ferait pas. Pas de slides, pas de pitch, et une prochaine étape claire.",
      },
      {
        title: "Clarifier les priorités avec Start AI",
        body: "Nous cartographions vos workflows, puis évaluons chaque opportunité selon son impact, sa faisabilité et sa pertinence stratégique. Vous repartez avec des business cases, des quick wins et une feuille de route.",
      },
      {
        title: "Déployer un espace de travail IA privé",
        body: "Votre équipe reçoit WonkaChat, connecté à vos outils et à vos connaissances, avec SSO, permissions et journaux d'audit. Testez-le d'abord avec un essai gratuit de 7 jours, sans carte bancaire.",
      },
      {
        title: "Construire des agents pour les processus qui vous coûtent",
        body: "Nous nous connectons à votre ERP, votre CRM, vos e-mails et vos documents, puis livrons des agents qui traitent de vrais workflows de bout en bout, avec validation humaine.",
      },
      {
        title: "Rester jusqu'à ce que tout le monde l'utilise",
        body: "La plupart des projets d'IA échouent à l'adoption, pas à la technologie. Nous restons après la mise en production pour stabiliser, ajuster et former votre équipe, puis lui transmettre la main.",
      },
    ],
  },
  faq: {
    heading: "IA pour entreprise : questions fréquentes",
    items: [
      {
        question: "Comment utiliser l'intelligence artificielle en entreprise ?",
        answer:
          "Les entreprises utilisent l'IA pour répondre aux questions des collaborateurs à partir des documents internes, rédiger réponses et rapports, extraire des données d'e-mails et de PDF, traiter commandes et factures, trier les tickets de support et relancer les leads. Les gains les plus importants viennent quand l'IA est connectée à vos propres outils et données.",
      },
      {
        question: "Par où commencer avec l'IA dans une PME ?",
        answer:
          "Commencez par les priorités, pas par les outils. Identifiez les workflows où le temps se perd, validez les opportunités IA à la fois utiles et réalistes, et posez une gouvernance de base. C'est exactement l'objet de Start AI, qui se termine par une feuille de route priorisée, un plan d'exécution à 90 jours et une présentation pour la direction.",
      },
      {
        question: "Qu'est-ce qu'une IA privée pour entreprise ?",
        answer:
          "Une IA privée garde les données de votre entreprise dans un environnement maîtrisé, sans qu'elles servent à entraîner des modèles publics. Wonka AI est hébergé par défaut dans Azure West Europe (Microsoft Irlande), avec chiffrement au repos et en transit, contrôle d'accès par rôle et journaux d'audit. Les développements sur mesure peuvent aussi tourner sur site.",
      },
      {
        question: "Une solution IA entreprise peut-elle être conforme au RGPD ?",
        answer:
          "Oui, selon le fournisseur et le mode de déploiement. Wonka AI est conforme au RGPD, certifié ISO 27001 et conforme à NIS 2, avec un audit SOC 2 Type II en cours. Un accord de traitement des données (DPA) est disponible, et vous décidez quels utilisateurs, équipes et agents accèdent à quelles données.",
      },
      {
        question: "Combien coûte l'IA pour une entreprise ?",
        answer:
          "Cela dépend de votre besoin. Le programme de stratégie Start AI démarre à 15 000 €. WonkaChat est facturé par utilisateur, avec un essai gratuit de 7 jours. Les projets sur mesure Wonka Build sont cadrés selon vos processus. Pour les PME flamandes, jusqu'à 70 % peuvent être récupérés via la KMO-portefeuille de VLAIO.",
      },
      {
        question: "Quelle différence entre un assistant IA entreprise et ChatGPT ?",
        answer:
          "Un outil de chat généraliste aide surtout l'individu. Un assistant IA entreprise se connecte en plus à vos systèmes, propose des agents partagés, des permissions, des journaux d'audit et une localisation claire des données. Nous comparons les deux approches sur notre page ChatGPT pour entreprise.",
      },
      {
        question: "En combien de temps voit-on des résultats ?",
        answer:
          "La plupart des équipes démarrent Start AI dans les 2 semaines suivant le premier appel. Le programme dure environ six semaines et demande à peu près une demi-journée par semaine à 2 ou 3 personnes clés. Des quick wins actionnables immédiatement font partie des livrables.",
      },
    ],
  },
  related: {
    heading: "Aller plus loin avec l'IA pour entreprise",
    links: [
      {
        label: "Start AI : stratégie et feuille de route IA",
        href: "/fr/start-ai",
        description: "Un programme pour identifier et prioriser vos opportunités IA.",
      },
      {
        label: "WonkaChat : espace de travail IA privé",
        href: "/fr/wonka-chat",
        description: "Un espace IA sécurisé pour toute votre organisation.",
      },
      {
        label: "Agent IA entreprise",
        href: "/fr/agent-ia-entreprise",
        description: "Des agents IA connectés à vos outils et à vos données.",
      },
      {
        label: "Wonka Build : applications IA sur mesure",
        href: "/fr/wonka-build",
        description: "Agents et applications mis en production chez vous.",
      },
      {
        label: "Agence IA en Belgique",
        href: "/fr/agence-ia",
        description: "Wonka AI, votre partenaire de la stratégie au déploiement.",
      },
      {
        label: "ChatGPT pour entreprise : l'alternative privée",
        href: "/fr/chatgpt-entreprise",
        description: "Un espace IA hébergé dans l'UE et multi-modèles.",
      },
      {
        label: "Calculer le ROI de l'IA en entreprise",
        href: "/fr/blog/fr-roi-ia-entreprise",
        description: "Construire le business case avant d'investir.",
      },
      {
        label: "Cas clients",
        href: "/fr/cas-clients",
        description: "Comment Itzu et N-allo (Engie) utilisent l'IA.",
      },
      { label: "Comparatif IA entreprise", href: "/fr/comparatif-ia-entreprise", description: "ChatGPT, Claude, Gemini, Copilot et Le Chat comparés pour les PME et ETI." },
      { label: "Shadow AI : définition et risques", href: "/fr/shadow-ai", description: "Reprendre la main sur les usages d'IA non encadrés, sans les interdire." },
    ],
  },
  cta: {
    heading: "Prêt à faire travailler l'IA pour votre entreprise ?",
    body: "Réservez un appel de 30 minutes. Vous saurez ce qui est réaliste, en combien de temps, et quelle est la bonne prochaine étape : Start AI, WonkaChat ou Wonka Build.",
  },
};

const nl: LandingCopy = {
  seo: {
    title: "AI voor bedrijven: strategie, veilige AI en agents | Wonka",
    description:
      "AI voor bedrijven, privé en AVG-conform: AI-strategie, AI-werkruimte en AI-agents, gehost in Europa. Tot 70% subsidie voor kmo's. Plan een gesprek.",
  },
  breadcrumb: "AI voor bedrijven",
  schema: {
    serviceName: "AI voor bedrijven: AI-strategie, private AI-werkruimte en AI-agents",
    serviceType: "AI-implementatie voor bedrijven",
  },
  hero: {
    eyebrow: "Artificial intelligence voor bedrijven",
    title: "AI voor bedrijven die uw hele team echt gebruikt.",
    subtitle:
      "Van AI-strategie tot een private AI-werkruimte en AI-agents die gekoppeld zijn aan uw tools. Wonka AI helpt Belgische en Europese bedrijven om van losse AI-experimenten naar beheerste, dagelijkse AI te gaan.",
    primaryCta: { label: "Plan een gesprek van 30 minuten", href: "meeting" },
    secondaryCta: { label: "Tot 70% subsidie via de KMO-portefeuille", href: "/nl/kmo-portefeuille-ai" },
    facts: [
      ["Erkenning", "#1 AI-start-up van het jaar, Belgium Startup Awards 2026"],
      ["Beveiliging", "ISO 27001 · AVG · NIS 2"],
      ["Hosting", "Standaard Azure West Europe"],
      ["Start AI", "+150 trajecten afgerond"],
    ],
  },
  answer: {
    heading: "Wat is AI voor bedrijven?",
    paragraphs: [
      "AI voor bedrijven is artificiële intelligentie die werkt binnen de echte processen van een organisatie: vragen beantwoorden op basis van interne kennis, documenten opstellen en nakijken, orders en facturen verwerken, en agents laten handelen in uw ERP of CRM. Goed ingezet is ze privé, beheerst en gebruikt door elk team.",
      "De meeste bedrijven hebben geen gebrek aan AI-tools. Ze missen duidelijkheid over waar AI waarde creëert, regels om ze veilig te gebruiken en een aanpak om ze bij iedereen te krijgen. In veel organisaties blijft de waarde van AI hangen bij een kleine groep pioniers, en hun betere werkwijzen verspreiden zich zelden. Gebruikt iedereen AI op zijn eigen manier, dan verliest de organisatie de controle; gebruikt niemand ze, dan verliest ze haar momentum.",
      "AI implementeren begint dus bij prioriteiten, niet bij tools. Wonka AI werkt op drie niveaus: Start AI om uw AI-strategie en roadmap te bepalen, WonkaChat als één beveiligde AI-werkruimte voor de hele organisatie, en Wonka Build voor AI-applicaties en agents op maat, in productie bovenop de systemen die u al gebruikt. U hebt geen uitgewerkte AI-strategie nodig om te starten: kent u het proces dat u tijd en geld kost, dan volstaat dat. Veel klanten combineren WonkaChat en Wonka Build.",
      "Private AI is de basis van alle drie. Wonka AI wordt standaard gehost in Azure West Europe (Microsoft Ierland), is ISO 27001-gecertificeerd, AVG- en NIS 2-conform, en klantdata wordt niet gebruikt om publieke AI-modellen te trainen. Voor Vlaamse kmo's komt Start AI in aanmerking voor de VLAIO KMO-portefeuille, met tot 70% subsidie.",
    ],
  },
  benefits: {
    eyebrow: "Waarom bedrijven AI inzetten",
    heading: "Wat AI in bedrijven concreet verandert.",
    items: [
      {
        title: "Minder repetitief werk",
        body: "Uw team hoort zijn beste uren niet te besteden aan informatie kopiëren, documenten zoeken of werk tussen systemen verplaatsen. AI neemt het repetitieve deel over, zodat mensen zich op klanten en beslissingen richten.",
      },
      {
        title: "Bedrijfskennis op aanvraag",
        body: "Medewerkers krijgen in enkele seconden een correct antwoord, gebaseerd op uw eigen documenten en tools, in plaats van te zoeken in mappen, mails en intranet.",
      },
      {
        title: "Private AI in plaats van schaduw-AI",
        body: "Eén goedgekeurde omgeving in de EU, met rolgebaseerd toegangsbeheer, auditlogs en SSO, vervangt de wildgroei aan persoonlijke AI-accounts waar niemand controle over heeft.",
      },
      {
        title: "AI voor elk team",
        body: "AI mag niet bij de pioniers blijven. Eenvoudige chat, gedeelde agents en begeleide workflows maken AI bruikbaar voor elke medewerker, niet alleen voor technische profielen.",
      },
      {
        title: "Meetbare resultaten",
        body: "Bij N-allo (Engie) verminderden AI-agents de tijd voor supportmails met 50%, over een team van meer dan 70 medewerkers. Prioriteiten worden gekozen op impact en haalbaarheid.",
      },
      {
        title: "Governance ingebouwd",
        body: "Een AI-beleid, duidelijke richtlijnen en menselijke goedkeuring voor belangrijke acties houden artificial intelligence in bedrijven verantwoord en controleerbaar.",
      },
    ],
  },
  useCases: {
    eyebrow: "AI-toepassingen voor bedrijven",
    heading: "AI-toepassingen waar AI voor bedrijven eerst waarde creëert.",
    items: [
      {
        title: "AI voor kmo's, met tot 70% subsidie",
        body: "Wonka is een geregistreerde dienstverlener binnen de VLAIO KMO-portefeuille en Start AI komt in aanmerking. De meeste Vlaamse kmo's kunnen tot 70% van de programmakost terugkrijgen, en wij helpen u met de administratie.",
        link: { label: "Alles over de KMO-portefeuille voor AI", href: "/nl/kmo-portefeuille-ai" },
      },
      {
        title: "Uw AI-strategie en roadmap bepalen",
        body: "U weet dat AI belangrijk is, maar niet waar te beginnen? Start AI analyseert uw processen, valideert de opportuniteiten met het hoogste rendement en levert een geprioriteerde roadmap, een uitvoeringsplan voor 90 dagen en een AI-beleid op.",
        link: { label: "Ontdek het Start AI-programma", href: "/nl/start-ai" },
      },
      {
        title: "Een beveiligde AI-werkruimte voor elke medewerker",
        body: "WonkaChat geeft uw hele team één plek om met AI te werken, met bedrijfskennis en gedeelde agents, het AI-model dat bij u past en de controles die uw organisatie verwacht.",
        link: { label: "Ontdek de WonkaChat AI-werkruimte", href: "/nl/wonka-chat" },
      },
      {
        title: "Workflows automatiseren met AI-agents",
        body: "Opvolging van leads, orderverwerking, facturen, tickettriage: agents lezen goedgekeurde data, bereiden het werk voor en schrijven pas na bevestiging terug naar uw systemen.",
        link: { label: "Zo werken private AI-agents", href: "/nl/ai-agents" },
      },
      {
        title: "AI-integratie met de tools die u al gebruikt",
        body: "Odoo, SharePoint, Outlook, Microsoft Teams, Salesforce, HubSpot, Slack, Notion, Jira en Google Drive: AI in bedrijven is pas nuttig als ze bovenop uw echte systemen draait. Wat niet bestaat, bouwt Wonka Build op maat.",
        link: { label: "Bekijk alle integraties", href: "/nl/integrations" },
      },
    ],
  },
  process: {
    eyebrow: "Hoe te starten",
    heading: "AI implementeren in uw bedrijf, stap voor stap.",
    steps: [
      {
        title: "Een kennismakingsgesprek van 30 minuten",
        body: "Vertel ons hoe u werkt. Wij zeggen u waar AI echt een verschil maakt, en waar niet. Geen slides, geen pitch, en op het einde een duidelijke volgende stap.",
      },
      {
        title: "Prioriteiten scherpstellen met Start AI",
        body: "We brengen workflows en knelpunten in kaart en beoordelen elke opportuniteit op impact, haalbaarheid, maturiteit en strategische relevantie. U krijgt business cases, quick wins en een concrete roadmap. Vlaamse kmo's vragen tot 70% subsidie aan.",
      },
      {
        title: "Een private AI-werkruimte uitrollen",
        body: "Uw team krijgt WonkaChat, gekoppeld aan uw tools en kennis, met SSO, rechtenbeheer en auditlogs. Test het eerst met een gratis proefperiode van 7 dagen, zonder kredietkaart.",
      },
      {
        title: "Agents bouwen voor de processen die u geld kosten",
        body: "We koppelen met uw ERP, CRM, e-mail en documenten en bouwen agents die echte workflows van begin tot einde afhandelen, met menselijke validatie waar het ertoe doet.",
      },
      {
        title: "Blijven tot iedereen het gebruikt",
        body: "De meeste AI-projecten mislukken bij de adoptie, niet bij de technologie. We blijven na de go-live om te stabiliseren, bij te sturen en uw team op te leiden, en dragen daarna het eigenaarschap over.",
      },
    ],
  },
  faq: {
    heading: "AI voor bedrijven: veelgestelde vragen",
    items: [
      {
        question: "Hoe kan een bedrijf AI gebruiken?",
        answer:
          "Bedrijven gebruiken AI om vragen van medewerkers te beantwoorden op basis van interne documenten, antwoorden en rapporten op te stellen, data uit mails en pdf's te halen, orders en facturen te verwerken, supporttickets te sorteren en leads op te volgen. De grootste winst komt wanneer AI gekoppeld is aan uw eigen tools en data.",
      },
      {
        question: "Hoe begin je met AI implementeren in een kmo?",
        answer:
          "Begin bij prioriteiten, niet bij tools. Breng in kaart waar tijd verloren gaat, valideer welke AI-opportuniteiten zowel waardevol als haalbaar zijn en leg basisafspraken rond governance vast. Dat is precies wat Start AI doet: u eindigt met een geprioriteerde roadmap, een uitvoeringsplan voor 90 dagen en een presentatie voor de directie.",
      },
      {
        question: "Krijg ik subsidie voor AI voor kmo's in Vlaanderen?",
        answer:
          "Ja, in veel gevallen. Wonka is een geregistreerde dienstverlener binnen de VLAIO KMO-portefeuille, en Start AI komt daarvoor in aanmerking. De meeste Vlaamse kmo's kunnen tot 70% van de programmakost terugkrijgen. Programma's starten vanaf € 15.000, en wij helpen u met het papierwerk.",
      },
      {
        question: "Wat is private AI voor bedrijven?",
        answer:
          "Bij private AI blijft uw bedrijfsdata in een gecontroleerde omgeving en wordt ze niet gebruikt om publieke modellen te trainen. Wonka AI wordt standaard gehost in Azure West Europe (Microsoft Ierland), met versleuteling in rust en tijdens transport, rolgebaseerd toegangsbeheer en auditlogs. Maatwerk kan ook on-premise, binnen uw eigen netwerk, draaien.",
      },
      {
        question: "Is AI in bedrijven AVG-conform?",
        answer:
          "Dat hangt af van de leverancier en de manier van uitrollen. Wonka AI is AVG-conform, ISO 27001-gecertificeerd en NIS 2-conform, en de SOC 2 Type II-audit loopt. Een verwerkersovereenkomst (DPA) is beschikbaar, en u bepaalt welke gebruikers, teams en agents toegang hebben tot welke data.",
      },
      {
        question: "Wat is het verschil tussen ChatGPT en AI-integratie in uw bedrijf?",
        answer:
          "Een algemene chattool helpt vooral de individuele gebruiker. AI-integratie koppelt AI daarnaast aan uw eigen systemen, met gedeelde agents, rechtenbeheer, auditlogs en een duidelijke datalocatie. Zo werkt AI niet alleen voor wie al weet welke prompt te schrijven, maar voor de hele organisatie. Op onze pagina over ChatGPT voor bedrijven vergelijken we beide benaderingen.",
      },
      {
        question: "Hebben we technische AI-kennis in huis nodig?",
        answer:
          "Nee. WonkaChat is gemaakt voor elke medewerker, met eenvoudige chat, gedeelde agents en begeleide workflows. Bij maatwerk leiden we iemand in uw team op om de oplossing te beheren en uit te breiden, zodat u nooit van ons afhankelijk bent.",
      },
      {
        question: "Hoe snel ziet u resultaat?",
        answer:
          "De meeste teams starten Start AI binnen 2 weken na het eerste gesprek. Het programma duurt ongeveer zes weken en vraagt ongeveer een halve dag per week van 2 tot 3 sleutelfiguren. Quick wins waar uw team meteen mee aan de slag kan, maken deel uit van de resultaten.",
      },
    ],
  },
  related: {
    heading: "Meer over AI voor bedrijven",
    links: [
      {
        label: "KMO-portefeuille voor AI",
        href: "/nl/kmo-portefeuille-ai",
        description: "Tot 70% subsidie voor Vlaamse kmo's via VLAIO.",
      },
      {
        label: "Start AI: AI-strategie en roadmap",
        href: "/nl/start-ai",
        description: "Een programma om uw AI-opportuniteiten te prioriteren.",
      },
      {
        label: "WonkaChat: private AI-werkruimte",
        href: "/nl/wonka-chat",
        description: "Eén beveiligde AI-werkruimte voor uw hele organisatie.",
      },
      {
        label: "Private AI-agents voor bedrijven",
        href: "/nl/ai-agents",
        description: "Agents gekoppeld aan Odoo, SharePoint, Outlook, CRM en ERP.",
      },
      {
        label: "Wonka Build: AI-applicaties op maat",
        href: "/nl/wonka-build",
        description: "Agents en applicaties, in productie bij u.",
      },
      {
        label: "AI-consultancy",
        href: "/nl/ai-consultancy",
        description: "Wonka AI als partner, van strategie tot uitrol.",
      },
      {
        label: "ChatGPT voor bedrijven: het private alternatief",
        href: "/nl/chatgpt-voor-bedrijven",
        description: "Een AI-werkruimte in de EU, met meerdere modellen.",
      },
      {
        label: "De ROI van enterprise AI berekenen",
        href: "/nl/blog/nl-roi-enterprise-ai",
        description: "Bouw de business case voor u investeert.",
      },
    ],
  },
  cta: {
    heading: "Klaar om AI voor uw bedrijf te laten werken?",
    body: "Plan een gesprek van 30 minuten. U weet daarna wat realistisch is, hoe snel, en wat de juiste volgende stap is: Start AI, WonkaChat of Wonka Build.",
  },
};

export const AI_FOR_BUSINESS_COPY: Record<Locale, LandingCopy> = { en, fr, nl };
