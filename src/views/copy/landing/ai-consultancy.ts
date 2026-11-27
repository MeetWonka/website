import type { Locale } from "@/i18n/config";
import type { LandingCopy } from "@/views/copy/landing-types";

/**
 * SEO landing page "aiConsultancy":
 * EN /ai-consultancy · FR /fr/agence-ia · NL /nl/ai-consultancy
 * Lane: Wonka as the AI partner (strategy → build → deploy), Start AI + Wonka Build
 * services, WonkaChat as the platform that keeps what we build running.
 */
export const AI_CONSULTANCY_COPY: Record<Locale, LandingCopy> = {
  /* ------------------------------------------------------------------ */
  /* EN                                                                  */
  /* ------------------------------------------------------------------ */
  en: {
    seo: {
      title: "AI Consultancy in Belgium: Strategy to Build | Wonka AI",
      description:
        "AI consultancy from strategy to production: AI roadmap, custom AI agents and a secure platform, by a Belgian team. Book a 30-minute call.",
    },
    breadcrumb: "AI consultancy",
    schema: {
      serviceName: "Wonka AI consultancy",
      serviceType: "AI consulting and implementation",
    },
    hero: {
      eyebrow: "AI consultancy · Belgium",
      title: "AI consultancy that ships AI, not slide decks.",
      subtitle:
        "Wonka is the AI consultancy and implementation partner for Belgian companies. We design your AI strategy, build the agents and applications that handle your repetitive work, and keep them running on a secure platform your whole team uses.",
      primaryCta: { label: "Book a 30-minute call", href: "meeting" },
      secondaryCta: { label: "Discover the Start AI programme", href: "/start-ai" },
      facts: [
        ["Start AI programmes", "+150 completed"],
        ["Recognition", "#1 AI start-up of the year, Belgium Startup Awards 2026"],
        ["Security", "ISO 27001 · GDPR · NIS 2"],
        ["Backed by", "Nvidia Inception · Microsoft for Startups"],
      ],
    },
    answer: {
      heading: "What does an AI consultancy do?",
      paragraphs: [
        "An AI consultancy helps a company decide where artificial intelligence creates real value, then turns that decision into working systems. A good AI consultant maps your processes, prioritises the use cases with the best return, sets the governance rules and delivers an AI implementation your teams actually adopt, not a report that stays in a drawer.",
        "Wonka works as your AI consultancy and product company in one. With Start AI, our AI experts analyse your workflows and hand you a concrete AI strategy: a readiness assessment, priority business cases, an AI roadmap, an AI policy and the quick wins your team can start on from day one. More than 150 Start AI programmes have been completed with Belgian SMEs and scale-ups across logistics, healthcare, finance, legal, manufacturing and the public sector.",
        "With Wonka Build, the same team engineers the custom AI applications and agents your business needs and puts them into production, connected to the email, ERP, CRM, documents and databases you already run. And with WonkaChat, everything we build lives on one secure AI workspace for your whole organisation, hosted in Azure West Europe and ISO 27001 certified. Your team can choose the AI model that fits, manage who has access to what and require human approval before important actions run.",
        "That is the difference with a pure AI agency: we do not hand over a plan and leave. We stay after go-live, train an owner on your team and keep the platform running, so AI keeps delivering long after the project ends. At N-allo (Engie), that approach cut the time spent on support emails by 50% across +70 employees.",
      ],
    },
    benefits: {
      eyebrow: "Why Wonka",
      heading: "Why an AI consultancy with its own platform beats a pure consultancy",
      items: [
        {
          title: "Strategy and execution under one roof",
          body: "The AI experts who build your AI strategy are the ones who engineer it afterwards. Start AI business cases become the blueprint for your build, so nothing gets lost between advice and delivery.",
        },
        {
          title: "What we build keeps running",
          body: "Agents and applications run on WonkaChat, our secure AI workspace. You are not left with a prototype that nobody maintains once the consultants have gone home.",
        },
        {
          title: "Production, not a pilot",
          body: "Wonka Build ships real workflows with real edge cases into your operations. We plug into the systems you already use instead of building a demo in a sandbox.",
        },
        {
          title: "Security built for European companies",
          body: "ISO 27001 certified, GDPR compliant and NIS 2 compliant, hosted in Azure West Europe (Microsoft Ireland). Custom builds can also run on-premise, inside your own network.",
        },
        {
          title: "Adoption across the whole team",
          body: "Most AI projects fail at adoption, not at technology. We embed with your team and stay until people genuinely use AI, not just until it is live.",
        },
        {
          title: "Independence is part of the deliverable",
          body: "We upskill someone on your team to own, run and extend what we build. You keep a trusted AI implementation partner without becoming dependent on one.",
        },
      ],
    },
    useCases: {
      eyebrow: "Our services",
      heading: "AI consulting services: from AI strategy to AI implementation",
      items: [
        {
          title: "Start AI: your AI strategy and roadmap",
          body: "A 6-week programme to move from AI experiments to a company-wide AI strategy. You walk away with priority business cases, a concrete roadmap, a 90-day execution plan and an AI policy and governance framework.",
          link: { label: "Explore the Start AI programme", href: "/start-ai" },
        },
        {
          title: "Wonka Build: custom AI agents and applications",
          body: "When the AI you need does not exist off the shelf, our AI consultants build it: production-ready agents, custom internal applications and deep integrations, followed by a hypercare period after launch.",
          link: { label: "See how Wonka Build works", href: "/wonka-build" },
        },
        {
          title: "WonkaChat: one secure AI workspace",
          body: "One place for every employee to work with AI, connected to your company tools and data, with the AI model of your choice, access permissions and human-in-the-loop approvals for important actions.",
          link: { label: "Discover WonkaChat", href: "/wonka-chat" },
        },
        {
          title: "AI agents that act in your tools",
          body: "Agents that handle a workflow end to end, such as triaging support emails, processing orders or updating your CRM, with approvals where you need them.",
          link: { label: "Learn about AI agents", href: "/ai-agents" },
        },
        {
          title: "AI on top of Odoo",
          body: "For teams that run on Odoo, we deploy AI agents that act directly inside the ERP instead of only suggesting what to do next.",
          link: { label: "WonkaChat for Odoo", href: "/wonka-chat/odoo" },
        },
      ],
    },
    process: {
      eyebrow: "How an engagement works",
      heading: "How working with our AI consultants works",
      steps: [
        {
          title: "30-minute discovery call",
          body: "Tell us how you work. We tell you where AI would make a difference, and where it would not. You leave with a clear next step: Start AI, Wonka Build or WonkaChat.",
        },
        {
          title: "Strategy with Start AI",
          body: "We align leadership, analyse your workflows and bottlenecks, and assess every opportunity on impact, feasibility and readiness. Roughly half a day per week for 2 to 3 key people; we do the heavy lifting in between.",
        },
        {
          title: "Build and connect",
          body: "We map how the work runs today, connect to your existing systems and engineer the agents and applications that earn their place.",
        },
        {
          title: "Deploy on a secure platform",
          body: "Your AI goes live in your operations and on WonkaChat, with access control, governance and audit logs, so your whole team can use it safely.",
        },
        {
          title: "Tune, train and hand over",
          body: "We stay mobilised after go-live to stabilise and fine-tune, and we level up an owner on your team until they can run and extend it.",
        },
      ],
    },
    faq: {
      heading: "AI consultancy: frequently asked questions",
      items: [
        {
          question: "What is the difference between an AI consultancy and an AI agency?",
          answer:
            "An AI consultancy typically focuses on advice: strategy, use cases and a roadmap. An AI agency typically focuses on building. Wonka does both, and adds its own platform, WonkaChat, so the AI we design and build keeps running securely for your whole team after the project ends.",
        },
        {
          question: "What does an AI consultant deliver at the end of Start AI?",
          answer:
            "An AI readiness assessment, priority AI business cases, a concrete AI roadmap, an AI policy and governance framework, quick wins your team can start on immediately and AI agent concepts. You also get a 90-day execution plan and a leadership presentation ready to share.",
        },
        {
          question: "How much does AI consulting cost?",
          answer:
            "Start AI programmes start at €15,000, and Flemish SMEs can claim up to 70% back through the VLAIO KMO-portefeuille. Wonka Build engagements are scoped to your business. WonkaChat has transparent per-seat pricing and a 7-day free trial, so you can test it with a real company use case before committing.",
        },
        {
          question: "Do we need a finished AI strategy before hiring AI experts to build?",
          answer:
            "No. If you know the process that is costing you time, that is enough to start with Wonka Build. If you do not, Start AI gives you clarity first, and its business cases become the blueprint for your build. Either way, the same AI experts stay with you from the first workshop to production.",
        },
        {
          question: "How soon can an AI implementation partner get started?",
          answer:
            "Most teams kick off within 2 weeks of the first call. The Start AI programme itself runs over 6 weeks, after which you can move straight into building the priority use cases with the same team. Your kick-off starts with aligning expectations and involving the right people from day one.",
        },
        {
          question: "Will we depend on the AI consultancy to keep things running?",
          answer:
            "No. We upskill someone on your team to own, run and extend what we build, and stay through a hypercare period after go-live. Independence is part of the deliverable, while WonkaChat keeps the platform secure and up to date for every user in your organisation.",
        },
        {
          question: "Is our data safe with an AI consultancy like Wonka?",
          answer:
            "Wonka is ISO 27001 certified, GDPR compliant and NIS 2 compliant, and WonkaChat is hosted in Azure West Europe (Microsoft Ireland) by default. A SOC 2 Type II audit is in progress. Custom builds can also run entirely on-premise, inside your network.",
        },
        {
          question: "Which companies work with Wonka as their AI consultancy?",
          answer:
            "Organisations such as PwC, Engie, Buildwise, Xerius, Luminus, Cambio, Zorgi and ODTH. At N-allo (Engie), AI agents cut the time spent on support emails by 50% across +70 employees. At Itzu, every employee has a personal WonkaChat assistant that saves them multiple hours each week.",
        },
      ],
    },
    related: {
      heading: "Explore AI strategy, platform and results",
      links: [
        { label: "Start AI programme", href: "/start-ai", description: "A 6-week AI strategy and roadmap programme." },
        { label: "Wonka Build", href: "/wonka-build", description: "Custom AI agents and applications, shipped to production." },
        { label: "WonkaChat", href: "/wonka-chat", description: "The secure AI workspace for your whole team." },
        { label: "AI for business", href: "/ai-for-business", description: "What companies can do with AI, and how to start." },
        { label: "AI agents for companies", href: "/ai-agents", description: "Private agents connected to your business tools." },
        { label: "Customer case studies", href: "/case-studies", description: "How Itzu and N-allo put AI into production." },
        { label: "WonkaChat pricing", href: "/pricing", description: "Transparent per-seat pricing and a free trial." },
      ],
    },
    cta: {
      heading: "Looking for an AI consultancy that stays?",
      body: "Book a 30-minute call. No slides, no pitch, just a real conversation about where AI fits in your business.",
    },
  },

  /* ------------------------------------------------------------------ */
  /* FR                                                                  */
  /* ------------------------------------------------------------------ */
  fr: {
    seo: {
      title: "Agence IA en Belgique : stratégie et agents IA | Wonka AI",
      description:
        "Agence IA belge : stratégie IA, agents IA sur mesure et plateforme sécurisée, de l'analyse à la production. Réservez un appel de 30 minutes.",
    },
    breadcrumb: "Agence IA",
    schema: {
      serviceName: "Agence IA Wonka",
      serviceType: "Conseil et intégration en intelligence artificielle",
    },
    hero: {
      eyebrow: "Agence IA · Belgique",
      title: "L'agence IA qui met l'IA en production, pas en slides.",
      subtitle:
        "Wonka accompagne les entreprises belges de la stratégie IA à la mise en production : nous identifions où l'IA crée de la valeur, construisons les agents et applications qui prennent en charge le travail répétitif, et les faisons tourner sur une plateforme sécurisée.",
      primaryCta: { label: "Réserver un appel de 30 minutes", href: "meeting" },
      secondaryCta: { label: "Découvrir le programme Start AI", href: "/fr/start-ai" },
      facts: [
        ["Start AI", "+150 réalisés"],
        ["Distinction", "N°1 AI start-up of the year, Belgium Startup Awards 2026"],
        ["Sécurité", "ISO 27001 · RGPD · NIS 2"],
        ["Soutenu par", "Nvidia Inception · Microsoft for Startups"],
      ],
    },
    answer: {
      heading: "Qu'est-ce qu'une agence IA et que fait-elle pour vous ?",
      paragraphs: [
        "Une agence IA aide une entreprise à déterminer où l'intelligence artificielle crée une valeur réelle, puis transforme ces choix en systèmes opérationnels. Un bon consultant IA analyse vos processus, priorise les cas d'usage les plus rentables, fixe les règles de gouvernance et livre une IA que vos équipes utilisent vraiment.",
        "Wonka réunit conseil IA et produit. Avec Start AI, nos experts IA analysent vos flux de travail et vous remettent une stratégie IA concrète : une évaluation de maturité IA, des business cases prioritaires, une feuille de route, une politique IA et les quick wins que votre équipe peut lancer dès le premier jour. Plus de 150 programmes Start AI ont déjà été réalisés, dans la logistique, la santé, la finance, le juridique, l'industrie et le secteur public.",
        "Avec Wonka Build, la même équipe conçoit les applications et agents IA sur mesure dont votre activité a besoin et les met en production, connectés à vos e-mails, ERP, CRM, documents et bases de données. Avec WonkaChat, tout ce que nous construisons vit dans un seul espace de travail IA sécurisé, hébergé dans Azure West Europe et certifié ISO 27001. Vous choisissez le modèle d'IA adapté, gérez les droits d'accès et pouvez exiger une validation humaine avant les actions importantes.",
        "C'est la différence avec un cabinet de conseil IA classique : nous ne vous laissons pas avec un plan. Nous restons après la mise en production, formons un responsable dans votre équipe et maintenons la plateforme, pour que l'IA continue à produire des résultats une fois le projet terminé. Chez N-allo (Engie), cette approche a réduit de 50 % le temps consacré aux e-mails de support.",
      ],
    },
    benefits: {
      eyebrow: "Pourquoi Wonka",
      heading: "Pourquoi choisir une agence IA qui a sa propre plateforme",
      items: [
        {
          title: "Conseil IA et exécution, une seule équipe",
          body: "Les experts IA qui construisent votre stratégie IA sont ceux qui la mettent en œuvre ensuite. Les business cases de Start AI deviennent le plan de votre build : rien ne se perd entre le conseil et la livraison.",
        },
        {
          title: "Ce que nous construisons continue de tourner",
          body: "Agents et applications tournent sur WonkaChat, notre espace de travail IA sécurisé. Vous ne restez pas avec un prototype que plus personne ne maintient après le départ des consultants.",
        },
        {
          title: "De la production, pas un pilote",
          body: "Wonka Build livre de vrais workflows, avec leurs vrais cas limites, dans vos opérations. Nous nous branchons sur les systèmes que vous utilisez déjà au lieu de construire une démo en bac à sable.",
        },
        {
          title: "Une sécurité pensée pour les entreprises européennes",
          body: "Certifié ISO 27001, conforme RGPD et NIS 2, hébergé dans Azure West Europe (Microsoft Irlande). Les développements sur mesure peuvent aussi tourner on-premise, dans votre propre réseau.",
        },
        {
          title: "Une adoption par toute l'équipe",
          body: "La plupart des projets IA échouent à l'adoption, pas à la technologie. Nous travaillons avec vos équipes et restons jusqu'à ce que chacun utilise vraiment l'IA, pas seulement jusqu'à la mise en ligne.",
        },
        {
          title: "Votre autonomie fait partie du livrable",
          body: "Nous formons une personne de votre équipe pour piloter, faire tourner et faire évoluer ce que nous construisons. Vous gardez un partenaire IA de confiance, sans dépendance.",
        },
      ],
    },
    useCases: {
      eyebrow: "Nos services",
      heading: "Conseil IA et intégration : les services de notre agence IA en Belgique",
      items: [
        {
          title: "Start AI : votre stratégie IA et votre feuille de route",
          body: "Un programme de 6 semaines pour passer des expérimentations à une stratégie IA à l'échelle de l'entreprise. Vous repartez avec des business cases prioritaires, une feuille de route, un plan d'exécution à 90 jours et un cadre de gouvernance IA.",
          link: { label: "Découvrir le programme Start AI", href: "/fr/start-ai" },
        },
        {
          title: "Wonka Build : agents et applications IA sur mesure",
          body: "Quand l'IA dont vous avez besoin n'existe pas sur étagère, nos consultants IA la construisent : agents prêts pour la production, applications internes sur mesure et intégrations profondes, suivis d'une période d'hypercare.",
          link: { label: "Voir comment fonctionne Wonka Build", href: "/fr/wonka-build" },
        },
        {
          title: "WonkaChat : un espace de travail IA sécurisé",
          body: "Un seul endroit où chaque collaborateur travaille avec l'IA, connecté aux outils et données de l'entreprise, avec le modèle d'IA de votre choix, des droits d'accès et une validation humaine pour les actions importantes.",
          link: { label: "Découvrir WonkaChat", href: "/fr/wonka-chat" },
        },
        {
          title: "Des agents IA qui agissent dans vos outils",
          body: "Des agents qui prennent en charge un workflow de bout en bout, comme le tri des e-mails de support, le traitement des commandes ou la mise à jour du CRM, avec validation là où vous le souhaitez.",
          link: { label: "L'agent IA pour entreprise", href: "/fr/agent-ia-entreprise" },
        },
        {
          title: "L'IA au cœur d'Odoo",
          body: "Pour les équipes qui tournent sur Odoo, nous déployons des agents IA qui agissent directement dans l'ERP, au lieu de simplement suggérer la prochaine étape.",
          link: { label: "WonkaChat pour Odoo", href: "/fr/wonka-chat/odoo" },
        },
      ],
    },
    process: {
      eyebrow: "Déroulement d'une mission",
      heading: "Comment travailler avec nos consultants IA",
      steps: [
        {
          title: "Un appel découverte de 30 minutes",
          body: "Vous nous expliquez comment vous travaillez. Nous vous disons où l'IA ferait vraiment la différence, et où elle ne la ferait pas. Vous repartez avec une prochaine étape claire : Start AI, Wonka Build ou WonkaChat.",
        },
        {
          title: "La stratégie IA avec Start AI",
          body: "Nous alignons la direction, analysons vos flux et goulots d'étranglement, et évaluons chaque opportunité selon son impact, sa faisabilité et votre maturité. Environ une demi-journée par semaine pour 2 à 3 personnes clés.",
        },
        {
          title: "Construire et connecter",
          body: "Nous cartographions le travail tel qu'il se fait aujourd'hui, nous connectons à vos systèmes existants et développons les agents et applications qui méritent leur place.",
        },
        {
          title: "Déployer sur une plateforme sécurisée",
          body: "Votre IA entre en production dans vos opérations et sur WonkaChat, avec contrôle des accès, gouvernance et journaux d'audit, pour que toute l'équipe l'utilise en sécurité.",
        },
        {
          title: "Ajuster, former et transmettre",
          body: "Nous restons mobilisés après la mise en production pour stabiliser et affiner, et formons un responsable dans votre équipe jusqu'à ce qu'il puisse faire tourner et évoluer la solution.",
        },
      ],
    },
    faq: {
      heading: "Agence IA : questions fréquentes",
      items: [
        {
          question: "Quelle est la différence entre une agence IA et un consultant IA ?",
          answer:
            "Un consultant IA se concentre en général sur le conseil : stratégie IA, cas d'usage et feuille de route. Une agence IA se concentre plutôt sur la construction. Wonka fait les deux et ajoute sa propre plateforme, WonkaChat, pour que l'IA conçue et développée continue de tourner en sécurité après le projet.",
        },
        {
          question: "Que livre un consultant en intelligence artificielle à la fin de Start AI ?",
          answer:
            "Une évaluation de maturité IA, des business cases IA prioritaires, une feuille de route IA concrète, une politique IA et un cadre de gouvernance, des quick wins et des concepts d'agents IA. Vous recevez aussi un plan d'exécution à 90 jours et une présentation pour la direction.",
        },
        {
          question: "Combien coûte le conseil IA chez Wonka ?",
          answer:
            "Les programmes Start AI démarrent à 15 000 €, et les PME flamandes peuvent récupérer jusqu'à 70 % via le KMO-portefeuille de VLAIO. Les missions Wonka Build sont cadrées selon votre activité. WonkaChat a une tarification transparente par utilisateur et un essai gratuit de 7 jours.",
        },
        {
          question: "Faut-il une stratégie IA finalisée avant de faire appel à un expert IA ?",
          answer:
            "Non. Si vous connaissez le processus qui vous coûte du temps, c'est suffisant pour démarrer avec Wonka Build. Sinon, Start AI vous apporte d'abord la clarté, et ses business cases deviennent le plan de votre développement. Dans les deux cas, les mêmes experts IA vous accompagnent du premier atelier à la production.",
        },
        {
          question: "En combien de temps une agence IA en Belgique peut-elle démarrer ?",
          answer:
            "La plupart des équipes démarrent dans les 2 semaines suivant le premier appel. Le programme Start AI dure 6 semaines ; vous pouvez ensuite passer directement à la construction des cas d'usage prioritaires avec la même équipe. Le lancement commence par l'alignement des attentes et l'implication des bonnes personnes dès le départ.",
        },
        {
          question: "Serons-nous dépendants de l'agence IA pour faire tourner la solution ?",
          answer:
            "Non. Nous formons une personne de votre équipe pour piloter, faire tourner et faire évoluer ce que nous construisons, et restons mobilisés pendant une période d'hypercare. L'autonomie fait partie du livrable, tandis que WonkaChat maintient la plateforme sécurisée et à jour.",
        },
        {
          question: "Nos données sont-elles en sécurité avec une agence IA comme Wonka ?",
          answer:
            "Wonka est certifié ISO 27001, conforme RGPD et NIS 2, et WonkaChat est hébergé par défaut dans Azure West Europe (Microsoft Irlande). Un audit SOC 2 Type II est en cours. Les développements sur mesure peuvent aussi tourner entièrement on-premise, dans votre réseau.",
        },
        {
          question: "Quelles entreprises ont choisi Wonka comme agence IA ?",
          answer:
            "Des organisations comme PwC, Engie, Buildwise, Xerius, Luminus, Cambio, Zorgi et ODTH. Chez N-allo (Engie), des agents IA ont réduit de 50 % le temps consacré aux e-mails de support pour plus de 70 collaborateurs. Chez Itzu, chaque collaborateur dispose de son assistant WonkaChat personnel.",
        },
      ],
    },
    related: {
      heading: "Stratégie IA, plateforme et résultats : pour aller plus loin",
      links: [
        { label: "Programme Start AI", href: "/fr/start-ai", description: "Stratégie IA et feuille de route en 6 semaines." },
        { label: "Wonka Build", href: "/fr/wonka-build", description: "Agents et applications IA sur mesure, en production." },
        { label: "WonkaChat", href: "/fr/wonka-chat", description: "L'espace de travail IA sécurisé pour toute l'équipe." },
        { label: "L'IA pour entreprise", href: "/fr/ia-pour-entreprise", description: "Ce que l'IA peut faire pour votre entreprise, et par où commencer." },
        { label: "Agent IA pour entreprise", href: "/fr/agent-ia-entreprise", description: "Des agents privés connectés à vos outils métier." },
        { label: "Cas clients", href: "/fr/cas-clients", description: "Comment nos clients ont mis l'IA en production." },
        { label: "Tarifs WonkaChat", href: "/fr/pricing", description: "Tarification par utilisateur et essai gratuit." },
        { label: "Comparatif IA entreprise", href: "/fr/comparatif-ia-entreprise", description: "ChatGPT, Claude, Gemini, Copilot et Le Chat comparés pour les PME et ETI." },
      ],
    },
    cta: {
      heading: "Vous cherchez une agence IA qui reste à vos côtés ?",
      body: "Réservez un appel de 30 minutes. Pas de slides, pas de pitch : une vraie conversation sur la place de l'IA dans votre activité.",
    },
  },

  /* ------------------------------------------------------------------ */
  /* NL                                                                  */
  /* ------------------------------------------------------------------ */
  nl: {
    seo: {
      title: "AI consultancy in België: van strategie tot AI | Wonka AI",
      description:
        "AI consultancy van strategie tot productie: AI-roadmap, AI-agents op maat en een veilig platform, door een Belgisch team. Plan een gesprek.",
    },
    breadcrumb: "AI consultancy",
    schema: {
      serviceName: "Wonka AI consultancy",
      serviceType: "AI-advies en AI-implementatie",
    },
    hero: {
      eyebrow: "AI consultancy · Vlaanderen en België",
      title: "AI consultancy die AI oplevert, geen slides.",
      subtitle:
        "Wonka is de AI consultancy- en implementatiepartner voor Belgische bedrijven. Wij bepalen uw AI-strategie, bouwen de agents en applicaties die uw repetitieve werk overnemen en houden ze draaiende op een veilig platform voor uw hele team.",
      primaryCta: { label: "Plan een gesprek van 30 minuten", href: "meeting" },
      secondaryCta: { label: "Ontdek het Start AI-programma", href: "/nl/start-ai" },
      facts: [
        ["Start AI-trajecten", "+150 afgerond"],
        ["Erkenning", "#1 AI start-up of the year, Belgium Startup Awards 2026"],
        ["KMO-portefeuille", "Tot 70% subsidie op Start AI"],
        ["Beveiliging", "ISO 27001 · GDPR · NIS 2"],
      ],
    },
    answer: {
      heading: "Wat doet een AI consultancy voor uw bedrijf?",
      paragraphs: [
        "Een AI consultancy helpt een bedrijf bepalen waar artificiële intelligentie echte waarde oplevert en zet die keuzes om in werkende systemen. Een goede AI consultant analyseert uw processen, prioriteert de meest rendabele toepassingen, legt governance vast en levert een AI-implementatie op die uw teams echt gebruiken.",
        "Wonka is AI consultancy en productbedrijf in één. Met Start AI analyseren onze AI-experts uw werkprocessen en krijgt u een concrete AI-strategie: een AI-readiness assessment, geprioriteerde business cases, een AI-roadmap, een AI-beleid en quick wins waar uw team vanaf dag één mee aan de slag kan. Er werden al meer dan 150 Start AI-trajecten afgerond, in onder meer logistiek, zorg, finance, legal, industrie en de publieke sector.",
        "Met Wonka Build bouwt hetzelfde team de AI-applicaties en agents op maat die uw bedrijf nodig heeft en brengt ze in productie, gekoppeld aan uw e-mail, ERP, CRM, documenten en databanken. Met WonkaChat draait alles wat we bouwen op één veilige AI-werkplek, gehost in Azure West Europe en ISO 27001-gecertificeerd. U kiest het AI-model dat past, beheert wie toegang heeft tot wat en kunt menselijke goedkeuring vereisen voor belangrijke acties.",
        "Dat is het verschil met een klassiek AI-bureau: wij laten u niet achter met een plan. We blijven na de livegang, leiden een eigenaar in uw team op en houden het platform draaiende. Vlaamse kmo's kunnen via de VLAIO KMO-portefeuille tot 70% van de Start AI-kost terugkrijgen. Wonka is daarvoor een erkende dienstverlener en helpt u met het papierwerk.",
      ],
    },
    benefits: {
      eyebrow: "Waarom Wonka",
      heading: "Waarom een AI consultancy met een eigen platform beter werkt",
      items: [
        {
          title: "AI-strategie en uitvoering in één team",
          body: "De AI-experts die uw AI-strategie uitwerken, bouwen ze daarna ook. De business cases uit Start AI worden de blauwdruk voor uw build, zodat er niets verloren gaat tussen advies en oplevering.",
        },
        {
          title: "Wat we bouwen, blijft draaien",
          body: "Agents en applicaties draaien op WonkaChat, onze veilige AI-werkplek. U blijft niet achter met een prototype dat niemand meer onderhoudt zodra de consultants vertrokken zijn.",
        },
        {
          title: "Productie, geen pilot",
          body: "Wonka Build levert echte workflows met echte uitzonderingen op in uw operaties. We koppelen aan de systemen die u al gebruikt, in plaats van een demo in een sandbox te bouwen.",
        },
        {
          title: "Beveiliging voor Europese bedrijven",
          body: "ISO 27001-gecertificeerd, GDPR- en NIS 2-conform, gehost in Azure West Europe (Microsoft Ierland). Maatwerk kan ook volledig on-premise draaien, binnen uw eigen netwerk.",
        },
        {
          title: "Subsidie via de KMO-portefeuille",
          body: "Wonka is een erkende dienstverlener voor de KMO-portefeuille. De meeste Vlaamse kmo's recupereren tot 70% van de programmakost van Start AI, en wij helpen u met het papierwerk.",
        },
        {
          title: "Uw onafhankelijkheid hoort bij de oplevering",
          body: "We leiden iemand in uw team op om te beheren, te laten draaien en uit te breiden wat we bouwen. U houdt een betrouwbare AI-specialist als partner, zonder afhankelijk te worden.",
        },
      ],
    },
    useCases: {
      eyebrow: "Onze diensten",
      heading: "AI consultancy-diensten: van AI-strategie tot AI-implementatie",
      items: [
        {
          title: "Start AI: uw AI-strategie en roadmap",
          body: "Een programma van 6 weken om van AI-experimenten naar een bedrijfsbrede AI-strategie te gaan. U krijgt geprioriteerde business cases, een concrete roadmap, een uitvoeringsplan voor 90 dagen en een AI-beleid met governancekader.",
          link: { label: "Ontdek het Start AI-programma", href: "/nl/start-ai" },
        },
        {
          title: "Start AI met KMO-portefeuille",
          body: "Start AI komt in aanmerking voor de VLAIO KMO-portefeuille. Vlaamse kmo's kunnen tot 70% subsidie aanvragen, zodat een AI-strategie ook voor kleinere teams haalbaar wordt.",
          link: { label: "Start AI met 70% subsidie via de KMO-portefeuille", href: "/nl/kmo-portefeuille-ai" },
        },
        {
          title: "Wonka Build: AI-agents en applicaties op maat",
          body: "Wanneer de AI die u nodig hebt niet kant-en-klaar bestaat, bouwen onze AI-consultants ze: productieklare agents, interne applicaties op maat en diepe integraties, gevolgd door een hypercareperiode.",
          link: { label: "Bekijk hoe Wonka Build werkt", href: "/nl/wonka-build" },
        },
        {
          title: "WonkaChat: één veilige AI-werkplek",
          body: "Eén plek waar elke medewerker met AI werkt, gekoppeld aan uw bedrijfstools en data, met het AI-model van uw keuze, toegangsrechten en menselijke goedkeuring voor belangrijke acties.",
          link: { label: "Ontdek WonkaChat", href: "/nl/wonka-chat" },
        },
        {
          title: "AI-agents die handelen in uw tools",
          body: "Agents die een workflow van begin tot eind afhandelen, zoals supportmails sorteren, bestellingen verwerken of uw CRM bijwerken, met goedkeuring waar u dat wilt.",
          link: { label: "Meer over AI-agents", href: "/nl/ai-agents" },
        },
        {
          title: "AI bovenop Odoo",
          body: "Voor teams die op Odoo draaien, zetten we AI-agents in die rechtstreeks in de ERP handelen in plaats van enkel de volgende stap voor te stellen.",
          link: { label: "WonkaChat voor Odoo", href: "/nl/wonka-chat/odoo" },
        },
      ],
    },
    process: {
      eyebrow: "Zo verloopt een traject",
      heading: "Zo werkt u samen met onze AI-experts",
      steps: [
        {
          title: "Kennismakingsgesprek van 30 minuten",
          body: "U vertelt hoe u werkt. Wij vertellen waar AI echt een verschil zou maken, en waar niet. U vertrekt met een duidelijke volgende stap: Start AI, Wonka Build of WonkaChat.",
        },
        {
          title: "AI-strategie met Start AI",
          body: "We brengen de directie op één lijn, analyseren uw processen en knelpunten en beoordelen elke kans op impact, haalbaarheid en maturiteit. Ongeveer een halve dag per week voor 2 tot 3 sleutelfiguren.",
        },
        {
          title: "Bouwen en koppelen",
          body: "We brengen in kaart hoe het werk vandaag loopt, koppelen aan uw bestaande systemen en bouwen de agents en applicaties die hun plaats verdienen.",
        },
        {
          title: "Uitrollen op een veilig platform",
          body: "Uw AI gaat live in uw operaties en op WonkaChat, met toegangsbeheer, governance en auditlogs, zodat uw hele team ze veilig kan gebruiken.",
        },
        {
          title: "Bijsturen, opleiden en overdragen",
          body: "We blijven na de livegang mee aan boord om te stabiliseren en bij te sturen, en leiden een eigenaar in uw team op tot die de oplossing zelf kan beheren en uitbreiden.",
        },
      ],
    },
    faq: {
      heading: "AI consultancy: veelgestelde vragen",
      items: [
        {
          question: "Wat is het verschil tussen een AI consultancy en een AI-bureau?",
          answer:
            "Een AI consultancy focust meestal op advies: AI-strategie, toepassingen en een roadmap. Een AI-bureau focust eerder op bouwen. Wonka doet beide en voegt een eigen platform toe, WonkaChat, zodat de AI die we ontwerpen en bouwen na het project veilig blijft draaien voor uw hele team.",
        },
        {
          question: "Wat levert een AI consultant op na Start AI?",
          answer:
            "Een AI-readiness assessment, geprioriteerde AI-business cases, een concrete AI-roadmap, een AI-beleid en governancekader, quick wins en concepten voor AI-agents, zodat u weet waar assistenten op maat de meeste waarde opleveren. U krijgt ook een uitvoeringsplan voor 90 dagen en een presentatie voor de directie, klaar om te delen.",
        },
        {
          question: "Wat kost AI consultancy en kan ik subsidie krijgen?",
          answer:
            "Start AI-programma's starten vanaf € 15.000. Vlaamse kmo's kunnen via de VLAIO KMO-portefeuille tot 70% terugkrijgen; Wonka is een erkende dienstverlener en helpt met het papierwerk. Wonka Build wordt afgestemd op uw bedrijf. WonkaChat heeft transparante prijzen per gebruiker en een gratis proefperiode van 7 dagen.",
        },
        {
          question: "Hebben we een afgewerkte AI-strategie nodig voor AI-implementatie?",
          answer:
            "Nee. Als u weet welk proces u tijd kost, is dat genoeg om met Wonka Build te starten. Weet u dat niet, dan geeft Start AI u eerst duidelijkheid, en worden de business cases de blauwdruk voor uw build. Hetzelfde team begeleidt u van de eerste workshop tot productie.",
        },
        {
          question: "Hoe snel kan een AI specialist bij ons starten?",
          answer:
            "De meeste teams starten binnen 2 weken na het eerste gesprek. Het Start AI-programma loopt over 6 weken; daarna kunt u meteen de prioritaire toepassingen laten bouwen door hetzelfde team. De kick-off begint met een heldere intake: wie is betrokken, wat zijn de verwachtingen en waar wil uw organisatie naartoe?",
        },
        {
          question: "Worden we afhankelijk van onze AI consultancy?",
          answer:
            "Nee. We leiden iemand in uw team op om te beheren, te laten draaien en uit te breiden wat we bouwen, en blijven mee aan boord tijdens een hypercareperiode. Onafhankelijkheid hoort bij de oplevering, terwijl WonkaChat het platform veilig en up-to-date houdt.",
        },
        {
          question: "Zijn onze gegevens veilig bij een AI consultancy zoals Wonka?",
          answer:
            "Wonka is ISO 27001-gecertificeerd, GDPR- en NIS 2-conform, en WonkaChat wordt standaard gehost in Azure West Europe (Microsoft Ierland). Een SOC 2 Type II-audit loopt. Maatwerk kan ook volledig on-premise draaien, binnen uw eigen netwerk, zonder dat er data naar buiten gaat.",
        },
        {
          question: "Welke bedrijven werken met Wonka als AI-partner?",
          answer:
            "Organisaties zoals PwC, Engie, Buildwise, Xerius, Luminus, Cambio, Zorgi en ODTH. Bij N-allo (Engie) verminderden AI-agents de tijd voor supportmails met 50% voor meer dan 70 medewerkers. Bij Itzu heeft elke medewerker een persoonlijke WonkaChat-assistent die wekelijks meerdere uren bespaart.",
        },
      ],
    },
    related: {
      heading: "Meer over AI-strategie, platform en resultaten",
      links: [
        { label: "Start AI-programma", href: "/nl/start-ai", description: "AI-strategie en roadmap in 6 weken." },
        { label: "Start AI met KMO-portefeuille", href: "/nl/kmo-portefeuille-ai", description: "Tot 70% subsidie voor Vlaamse kmo's." },
        { label: "Wonka Build", href: "/nl/wonka-build", description: "AI-agents en applicaties op maat, in productie." },
        { label: "WonkaChat", href: "/nl/wonka-chat", description: "De veilige AI-werkplek voor uw hele team." },
        { label: "AI voor bedrijven", href: "/nl/ai-voor-bedrijven", description: "Wat bedrijven met AI kunnen doen, en hoe u start." },
        { label: "AI-agents voor bedrijven", href: "/nl/ai-agents", description: "Private agents gekoppeld aan uw bedrijfstools." },
        { label: "Klantcases", href: "/nl/klantcases", description: "Hoe klanten AI in productie brachten." },
      ],
    },
    cta: {
      heading: "Op zoek naar een AI consultancy die blijft?",
      body: "Plan een gesprek van 30 minuten. Geen slides, geen pitch, gewoon een echt gesprek over waar AI past in uw bedrijf.",
    },
  },
};
