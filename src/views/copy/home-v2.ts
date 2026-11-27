import type { Locale } from "@/i18n/config";

export type DepartmentId =
  | "sales"
  | "marketing"
  | "finance"
  | "hr"
  | "operations"
  | "support";

export type PlatformVideoId =
  | "triggers"
  | "routing"
  | "secure"
  | "control";
export type SecurityTileId =
  | "iso"
  | "gdpr"
  | "eu"
  | "encryption"
  | "sso"
  | "deploy";

export interface SecurityPoint {
  id: SecurityTileId;
  title: string;
  body: string;
}

export interface HomeV2Copy {
  seo: { title: string; description: string };
  award: { label: string };
  hero: {
    title: string;
    titleAccent: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trustedBy: string;
  };
  workspaceTour: {
    title: string;
    posterAlt: string;
  };
  platform: {
    eyebrow: string;
    title: string;
    panels: {
      id: PlatformVideoId;
      title: string;
      body: string;
      ctaLabel?: string;
    }[];
  };
  integrations: {
    eyebrow: string;
    title: string;
    body: string;
    departments: { id: DepartmentId; label: string; pitch: string }[];
    everydayTitle: string;
    everydayCount: string;
    customTitle: string;
    customBody: string;
  };
  clients: {
    eyebrow: string;
    title: string;
    play: string;
    close: string;
    cards: {
      id: string;
      quote: string;
      authorName: string;
      authorRole: string;
      portraitUrl: string;
      portraitAlt: string;
      companyLogoUrl: string;
      companyLogoAlt: string;
      companyLogoWidth: number;
      companyLogoHeight?: number;
      portraitObjectPosition?: string;
      statValue: string;
      statLabel: string;
      videoYoutubeId: string;
      videoTitle: string;
    }[];
  };
  team: {
    eyebrow: string;
    title: string;
    body: string;
    count: string;
    countLabel: string;
    steps: { phase: string; tagline: string; body: string }[];
    cta: string;
    pageCta: string;
  };
  subsidies: {
    eyebrow: string;
    title: string;
    body: string;
    strategyCta: string;
    subsidiesTitle: string;
    cardCta: string;
    cards: {
      title: string;
      body: string;
      href: string;
    }[];
  };
  security: {
    eyebrow: string;
    title: string;
    points: SecurityPoint[];
    cta: string;
    ctaHref: string;
  };
  finalCta: { title: string; subtitle: string };
}

const en: HomeV2Copy = {
  seo: {
    title: "WonkaChat | AI agents set up with you, inside your tools",
    description:
      "Describe a task, WonkaChat builds the agent, connects it to your tools and shares it with your teams. 40+ AI consultants help you get it into production.",
  },
  award: { label: "#1 AI start-up of the year · Belgium Startup Awards 2026" },
  hero: {
    title: "Make AI work for your whole team.",
    titleAccent: "",
    subtitle:
      "Wonka helps you roll out AI across your entire team, in a safe and flexible way.",
    primaryCta: "Get started",
    secondaryCta: "Talk to a consultant",
    trustedBy: "Trusted by 10,000+ people",
  },
  workspaceTour: {
    title: "Discover Wonka Workspace in 3 minutes",
    posterAlt: "Wonka Workspace product tour video",
  },
  platform: {
    eyebrow: "What changes",
    title: "When AI actually works, four things happen.",
    panels: [
      {
        id: "triggers",
        title: "More work gets done.",
        body: "AI moves beyond quick answers and starts creating documents, answering mails and updating your ERP, so teams finish more without adding hours.",
      },
      {
        id: "routing",
        title: "Processes are respected.",
        body: "Requests get redirected to agents built for those specific tasks, so everyone works in the same way with AI.",
        ctaLabel: "Explore AI Agents",
      },
      {
        id: "secure",
        title: "The most valuable use cases get unlocked.",
        body: "Work with sensitive HR, finance and customer data in a secure environment, so even your most valuable AI use cases can go live.",
      },
      {
        id: "control",
        title: "You keep control.",
        body: "Permissions, spend and usage stay visible as adoption spreads across departments, so scaling AI never means losing oversight.",
      },
    ],
  },
  integrations: {
    eyebrow: "Connected AI",
    title: "AI gets adopted when it fits into your specialized tools.",
    body: "Connect your business systems so AI can work with the right context, update records and take action across your existing workflows.",
    departments: [
      { id: "sales", label: "Sales", pitch: "CRM, calls and pipeline." },
      {
        id: "marketing",
        label: "Marketing",
        pitch: "Social, campaigns and ad platforms.",
      },
      {
        id: "finance",
        label: "Finance & Accounting",
        pitch: "Ledgers, invoices and reporting.",
      },
      {
        id: "hr",
        label: "Human Resources",
        pitch: "HRIS, recruiting and workforce planning.",
      },
      {
        id: "operations",
        label: "Operations",
        pitch: "Projects, workflows and ERP.",
      },
      {
        id: "support",
        label: "Customer Support",
        pitch: "Tickets, chat and inbox.",
      },
    ],
    everydayTitle: "Integrate everyday tools and industry-specific software.",
    everydayCount: "80+ connectors",
    customTitle: "Your tool not present? We make the connection for you.",
    customBody: "",
  },
  clients: {
    eyebrow: "Customer success",
    title: "From AI adoption to real results.",
    play: "Play client testimonial video",
    close: "Close",
    cards: [
      {
        id: "itzu",
        quote:
          "Every employee now has their own AI assistant, connected to our internal systems. It helps our teams save hours every week.",
        authorName: "Liesbeth Enkels",
        authorRole: "CIO, Itzu Group",
        portraitUrl: "/images/home/clients/liesbeth-enkels.png",
        portraitAlt: "Liesbeth Enkels, CIO at Itzu Group",
        portraitObjectPosition: "62% center",
        companyLogoUrl: "/images/france/logos/itzu.svg",
        companyLogoAlt: "Itzu",
        companyLogoWidth: 100,
        statValue: "100%",
        statLabel: "of employees equipped with a personal AI assistant.",
        videoYoutubeId: "rACzzZaz9qA",
        videoTitle: "How Itzu equips every employee with AI",
      },
      {
        id: "respace",
        quote:
          "Our team now delivers proposals two to three times faster, bringing more business and value to our clients.",
        authorName: "Pierre Colaiacovo",
        authorRole: "CEO, Re-space",
        portraitUrl: "/images/home/clients/pierre-colaiacovo.png",
        portraitAlt: "Pierre Colaiacovo, CEO of Re-space",
        companyLogoUrl: "/images/workspace/logos/respace.png",
        companyLogoAlt: "Re-space",
        companyLogoWidth: 222,
        companyLogoHeight: 48,
        statValue: "2–3×",
        statLabel: "faster proposal delivery",
        videoYoutubeId: "Qv_65poIhig",
        videoTitle: "How Re-space delivers proposals faster with Wonka",
      },
    ],
  },
  team: {
    eyebrow: "The team",
    title: "AI adoption takes more than software.",
    body: "40+ AI consultants help you find the right use cases, get them into production and make adoption stick across your organisation.",
    count: "40+",
    countLabel: "AI consultants across Belgium and France",
    steps: [
      {
        phase: "Define",
        tagline: "Find the right work",
        body: "Identify the processes where AI can create meaningful value.",
      },
      {
        phase: "Deploy",
        tagline: "Get it into production",
        body: "Build, connect and deploy AI in the tools your teams already use.",
      },
      {
        phase: "Adopt",
        tagline: "Make it stick",
        body: "Train teams, follow up and scale the use cases that work.",
      },
    ],
    cta: "Talk to a consultant",
    pageCta: "Meet the team",
  },
  subsidies: {
    eyebrow: "AI strategy",
    title: "No clear AI strategy yet?",
    body: "We help you identify where AI creates value, set priorities and turn them into a roadmap your teams can adopt.",
    strategyCta: "Explore AI Strategy Program",
    subsidiesTitle: "Funding available",
    cardCta: "Discover more",
    cards: [
      {
        title: "Subsidy for Flemish SMEs.",
        body: "Financial support is available to help your business fund an AI strategy programme in Flanders.",
        href: "/services/start-ai-subsidized-flanders",
      },
    ],
  },
  security: {
    eyebrow: "Security",
    title: "Your data stays yours.",
    // TODO: CHECK whether ISO 27001 / SOC 2 certificates may be shown in the security points.
    points: [
      { id: "eu", title: "EU-hosted", body: "Your data and most AI models stay in the EU" },
      { id: "gdpr", title: "GDPR-compliant", body: "Built to meet European privacy rules" },
      { id: "sso", title: "Single sign-on", body: "Sign in with Microsoft Entra ID" },
      { id: "deploy", title: "Deploy anywhere", body: "Managed cloud, your own cloud or on-premise" },
    ],
    cta: "More about security",
    ctaHref: "/security",
  },
  finalCta: {
    title: "Start adopting AI across your teams.",
    subtitle:
      "Explore the platform on your own, or work with our consultants to bring the right AI use cases into production.",
  },
};

const fr: HomeV2Copy = {
  seo: {
    title: "WonkaChat | Des agents IA mis en place avec vous, dans vos outils",
    description:
      "Décrivez une tâche, WonkaChat crée l'agent, le connecte à vos outils et le partage à vos équipes. Plus de 40 consultants IA vous accompagnent jusqu'à la production.",
  },
  award: { label: "Start-up IA n°1 de l'année · Belgium Startup Awards 2026" },
  hero: {
    title: "Faites fonctionner l'IA pour toute votre équipe.",
    titleAccent: "",
    subtitle:
      "Wonka vous aide à déployer l'IA auprès de toutes vos équipes, de façon sûre et flexible.",
    primaryCta: "Commencer",
    secondaryCta: "Parler à un consultant",
    trustedBy: "Plus de 10 000 personnes nous font confiance",
  },
  workspaceTour: {
    title: "Découvrez Wonka Workspace en 3 minutes",
    posterAlt: "Vidéo de présentation de Wonka Workspace",
  },
  platform: {
    eyebrow: "Ce qui change",
    title: "Quand l'IA fonctionne vraiment, quatre choses se passent.",
    panels: [
      {
        id: "triggers",
        title: "Plus de travail avance.",
        body: "L'IA dépasse les réponses rapides et commence à créer des documents, répondre aux e-mails et mettre à jour votre ERP, pour que vos équipes avancent sans y passer plus d'heures.",
      },
      {
        id: "routing",
        title: "Les processus sont respectés.",
        body: "Les demandes sont orientées vers des agents conçus pour ces tâches précises, pour que chacun travaille de la même façon avec l'IA.",
        ctaLabel: "Découvrir AI Agents",
      },
      {
        id: "secure",
        title: "Les cas d'usage les plus utiles se débloquent.",
        body: "Travaillez avec des données RH, financières et clients sensibles dans un environnement sécurisé, pour que vos cas d'usage IA les plus stratégiques puissent passer en production.",
      },
      {
        id: "control",
        title: "Vous gardez le contrôle.",
        body: "Droits, dépenses et usage restent visibles quand l'adoption se propage, pour scaler l'IA sans perdre la visibilité.",
      },
    ],
  },
  integrations: {
    eyebrow: "IA connectée",
    title: "L'IA s'adopte quand elle s'intègre à vos outils métier.",
    body: "Connectez vos systèmes métier pour que l'IA dispose du bon contexte, mette à jour les données et agisse dans vos workflows existants.",
    departments: [
      { id: "sales", label: "Ventes", pitch: "CRM, appels et pipeline." },
      {
        id: "marketing",
        label: "Marketing",
        pitch: "Réseaux sociaux, campagnes et publicité.",
      },
      {
        id: "finance",
        label: "Finance & comptabilité",
        pitch: "Compta, factures et reporting.",
      },
      {
        id: "hr",
        label: "Ressources humaines",
        pitch: "SIRH, recrutement et planification des équipes.",
      },
      {
        id: "operations",
        label: "Opérations",
        pitch: "Projets, workflows et ERP.",
      },
      {
        id: "support",
        label: "Service client",
        pitch: "Tickets, chat et messagerie.",
      },
    ],
    everydayTitle:
      "Intégrez vos outils du quotidien et vos logiciels métier.",
    everydayCount: "80+ connecteurs",
    customTitle: "Votre outil n'est pas dans la liste ? Nous mettons en place la connexion pour vous.",
    customBody: "",
  },
  clients: {
    eyebrow: "Réussites clients",
    title: "De l'adoption de l'IA à des résultats concrets.",
    play: "Lancer la vidéo témoignage",
    close: "Fermer",
    cards: [
      {
        id: "itzu",
        quote:
          "Chaque collaborateur dispose désormais de son assistant IA, connecté à nos systèmes internes. Cela aide nos équipes à gagner des heures chaque semaine.",
        authorName: "Liesbeth Enkels",
        authorRole: "DSI, Itzu Group",
        portraitUrl: "/images/home/clients/liesbeth-enkels.png",
        portraitAlt: "Liesbeth Enkels, DSI chez Itzu Group",
        portraitObjectPosition: "62% center",
        companyLogoUrl: "/images/france/logos/itzu.svg",
        companyLogoAlt: "Itzu",
        companyLogoWidth: 100,
        statValue: "100 %",
        statLabel: "des collaborateurs équipés d'un assistant IA personnel.",
        videoYoutubeId: "rACzzZaz9qA",
        videoTitle: "Comment Itzu équipe chaque collaborateur en IA",
      },
      {
        id: "respace",
        quote:
          "Notre équipe livre désormais des propositions deux à trois fois plus vite, ce qui apporte plus de business et de valeur à nos clients.",
        authorName: "Pierre Colaiacovo",
        authorRole: "CEO, Re-space",
        portraitUrl: "/images/home/clients/pierre-colaiacovo.png",
        portraitAlt: "Pierre Colaiacovo, CEO de Re-space",
        companyLogoUrl: "/images/workspace/logos/respace.png",
        companyLogoAlt: "Re-space",
        companyLogoWidth: 222,
        companyLogoHeight: 48,
        statValue: "2–3×",
        statLabel: "livraison de propositions plus rapide",
        videoYoutubeId: "Qv_65poIhig",
        videoTitle: "Comment Re-space accélère ses propositions avec Wonka",
      },
    ],
  },
  team: {
    eyebrow: "L'équipe",
    title: "Adopter l'IA, ce n'est pas qu'un logiciel.",
    body: "Plus de 40 consultants IA vous aident à identifier les bons cas d'usage, à les mettre en production et à ancrer l'adoption dans toute votre organisation.",
    count: "40+",
    countLabel: "consultants IA en Belgique et en France",
    steps: [
      {
        phase: "Définir",
        tagline: "Cibler le bon travail",
        body: "Identifiez les processus où l'IA peut créer une valeur réelle.",
      },
      {
        phase: "Déployer",
        tagline: "Passer en production",
        body: "Construisez, connectez et déployez l'IA dans les outils que vos équipes utilisent déjà.",
      },
      {
        phase: "Adopter",
        tagline: "Ancrer les usages",
        body: "Formez les équipes, suivez l'adoption et scalez les cas d'usage qui fonctionnent.",
      },
    ],
    cta: "Parler à un consultant",
    pageCta: "Rencontrer l'équipe",
  },
  subsidies: {
    eyebrow: "Stratégie IA",
    title: "Pas encore de stratégie IA claire ?",
    body: "Nous vous aidons à identifier où l'IA crée de la valeur, à fixer les priorités et à en faire une feuille de route adoptable par vos équipes.",
    strategyCta: "Découvrir le programme stratégie IA",
    subsidiesTitle: "Financement disponible",
    cardCta: "En savoir plus",
    cards: [
      {
        title: "Subvention pour les PME flamandes.",
        body: "Un soutien financier peut financer votre programme de stratégie IA en Flandre.",
        href: "/services/start-ai-subsidized-flanders",
      },
    ],
  },
  security: {
    eyebrow: "Sécurité",
    title: "Vos données restent les vôtres.",
    points: [
      { id: "eu", title: "Hébergé dans l'UE", body: "Vos données et la plupart des modèles IA restent dans l'UE" },
      { id: "gdpr", title: "Conforme au RGPD", body: "Conçu pour respecter les règles européennes de protection des données" },
      { id: "sso", title: "Authentification unique", body: "Connexion avec Microsoft Entra ID" },
      { id: "deploy", title: "Déployez où vous voulez", body: "Cloud géré, votre propre cloud ou sur site" },
    ],
    cta: "En savoir plus sur la sécurité",
    ctaHref: "/fr/security",
  },
  finalCta: {
    title: "Déployez l'IA au sein de vos équipes.",
    subtitle:
      "Explorez la plateforme en autonomie, ou faites appel à nos consultants pour mettre en production les bons cas d'usage IA.",
  },
};

const nl: HomeV2Copy = {
  seo: {
    title: "WonkaChat | AI-agents samen met u opgezet, in uw tools",
    description:
      "Beschrijf een taak, WonkaChat bouwt de agent, koppelt hem aan uw tools en deelt hem met uw teams. Meer dan 40 AI-consultants begeleiden u tot in productie.",
  },
  award: { label: "#1 AI-start-up van het jaar · Belgium Startup Awards 2026" },
  hero: {
    title: "Laat AI werken voor uw hele team.",
    titleAccent: "",
    subtitle:
      "Wonka helpt u AI uit te rollen over uw hele team, op een veilige en flexibele manier.",
    primaryCta: "Aan de slag",
    secondaryCta: "Spreek een consultant",
    trustedBy: "Vertrouwd door 10.000+ mensen",
  },
  workspaceTour: {
    title: "Ontdek Wonka Workspace in 3 minuten",
    posterAlt: "Producttourvideo van Wonka Workspace",
  },
  platform: {
    eyebrow: "Wat er verandert",
    title: "Wanneer AI echt werkt, gebeuren vier dingen.",
    panels: [
      {
        id: "triggers",
        title: "Er gebeurt meer werk.",
        body: "AI blijft niet bij snelle antwoorden en begint documenten op te stellen, mails te beantwoorden en uw ERP bij te werken, zodat teams meer afronden zonder extra uren.",
      },
      {
        id: "routing",
        title: "Processen worden gerespecteerd.",
        body: "Aanvragen worden doorgestuurd naar agents die voor die specifieke taken zijn opgezet, zodat iedereen op dezelfde manier met AI werkt.",
        ctaLabel: "Ontdek AI Agents",
      },
      {
        id: "secure",
        title: "De meest waardevolle use cases worden vrijgespeeld.",
        body: "Werk met gevoelige HR-, financiële en klantdata in een veilige omgeving, zodat ook uw meest waardevolle AI-use cases live kunnen.",
      },
      {
        id: "control",
        title: "U houdt controle.",
        body: "Rechten, spend en gebruik blijven zichtbaar wanneer adoptie groeit, zodat opschalen nooit betekent dat u het overzicht verliest.",
      },
    ],
  },
  integrations: {
    eyebrow: "Verbonden AI",
    title: "AI wordt geadopteerd wanneer het aansluit op uw gespecialiseerde tools.",
    body: "Koppel uw bedrijfssystemen zodat AI met de juiste context werkt, gegevens bijwerkt en acties uitvoert in uw bestaande workflows.",
    departments: [
      { id: "sales", label: "Sales", pitch: "CRM, gesprekken en pipeline." },
      {
        id: "marketing",
        label: "Marketing",
        pitch: "Social, campagnes en advertentieplatformen.",
      },
      {
        id: "finance",
        label: "Finance & Accounting",
        pitch: "Boekhouding, facturen en reporting.",
      },
      {
        id: "hr",
        label: "Human Resources",
        pitch: "HRIS, recruiting en workforce planning.",
      },
      {
        id: "operations",
        label: "Operations",
        pitch: "Projecten, workflows en ERP.",
      },
      {
        id: "support",
        label: "Customer Support",
        pitch: "Tickets, chat en inbox.",
      },
    ],
    everydayTitle:
      "Integreer alledaagse tools en branchespecifieke software.",
    everydayCount: "80+ connectoren",
    customTitle: "Staat uw tool er niet tussen? Wij maken de koppeling voor u.",
    customBody: "",
  },
  clients: {
    eyebrow: "Klantsucces",
    title: "Van AI-adoptie naar echte resultaten.",
    play: "Klanttestimonialvideo afspelen",
    close: "Sluiten",
    cards: [
      {
        id: "itzu",
        quote:
          "Elke medewerker heeft nu een eigen AI-assistent, gekoppeld aan onze interne systemen. Zo helpen we teams elke week uren te besparen.",
        authorName: "Liesbeth Enkels",
        authorRole: "CIO, Itzu Group",
        portraitUrl: "/images/home/clients/liesbeth-enkels.png",
        portraitAlt: "Liesbeth Enkels, CIO bij Itzu Group",
        portraitObjectPosition: "62% center",
        companyLogoUrl: "/images/france/logos/itzu.svg",
        companyLogoAlt: "Itzu",
        companyLogoWidth: 100,
        statValue: "100%",
        statLabel: "van de medewerkers uitgerust met een persoonlijke AI-assistent.",
        videoYoutubeId: "rACzzZaz9qA",
        videoTitle: "Hoe Itzu elke medewerker uitrust met AI",
      },
      {
        id: "respace",
        quote:
          "Ons team levert voorstellen nu twee tot drie keer sneller, met meer business en waarde voor onze klanten.",
        authorName: "Pierre Colaiacovo",
        authorRole: "CEO, Re-space",
        portraitUrl: "/images/home/clients/pierre-colaiacovo.png",
        portraitAlt: "Pierre Colaiacovo, CEO van Re-space",
        companyLogoUrl: "/images/workspace/logos/respace.png",
        companyLogoAlt: "Re-space",
        companyLogoWidth: 222,
        companyLogoHeight: 48,
        statValue: "2–3×",
        statLabel: "snellere oplevering van voorstellen",
        videoYoutubeId: "Qv_65poIhig",
        videoTitle: "Hoe Re-space sneller voorstellen levert met Wonka",
      },
    ],
  },
  team: {
    eyebrow: "Het team",
    title: "AI-adoptie vraagt meer dan software.",
    body: "Meer dan 40 AI-consultants helpen u de juiste use cases te vinden, in productie te brengen en adoptie organisatiebreed te laten beklijven.",
    count: "40+",
    countLabel: "AI-consultants in België en Frankrijk",
    steps: [
      {
        phase: "Definiëren",
        tagline: "De juiste taken vinden",
        body: "Bepaal in welke processen AI echte waarde kan creëren.",
      },
      {
        phase: "Deployen",
        tagline: "In productie brengen",
        body: "Bouw, koppel en rol AI uit in de tools die uw teams al gebruiken.",
      },
      {
        phase: "Adopteren",
        tagline: "Adoptie borgen",
        body: "Train teams, volg op en schaal de use cases die werken.",
      },
    ],
    cta: "Spreek een consultant",
    pageCta: "Ontmoet het team",
  },
  subsidies: {
    eyebrow: "AI-strategie",
    title: "Nog geen duidelijke AI-strategie?",
    body: "Wij helpen u te bepalen waar AI waarde creëert, prioriteiten te stellen en daar een roadmap van te maken die uw teams kunnen adopteren.",
    strategyCta: "Ontdek het AI-strategieprogramma",
    subsidiesTitle: "Subsidie beschikbaar",
    cardCta: "Meer ontdekken",
    cards: [
      {
        title: "Subsidie voor Vlaamse kmo's.",
        body: "Financiële steun kan helpen om uw AI-strategietraject in Vlaanderen te financieren.",
        href: "/services/start-ai-subsidized-flanders",
      },
    ],
  },
  security: {
    eyebrow: "Beveiliging",
    title: "Uw data blijft van u.",
    points: [
      { id: "eu", title: "Gehost in de EU", body: "Uw data en de meeste AI-modellen blijven in de EU" },
      { id: "gdpr", title: "AVG-conform", body: "Gebouwd volgens de Europese privacyregels" },
      { id: "sso", title: "Single sign-on", body: "Aanmelden met Microsoft Entra ID" },
      { id: "deploy", title: "Overal te installeren", body: "Beheerde cloud, uw eigen cloud of on-premise" },
    ],
    cta: "Meer over beveiliging",
    ctaHref: "/nl/security",
  },
  finalCta: {
    title: "Start met AI-adoptie in al uw teams.",
    subtitle:
      "Verken het platform zelf, of werk met onze consultants om de juiste AI-use cases in productie te brengen.",
  },
};

export const HOME_V2_WORKSPACE_TOUR = {
  youtubeId: "gHWkKXg79_U",
  poster: {
    src: "/images/workspace/wonka-workspace-header.png",
    width: 1920,
    height: 1080,
  },
} as const;

export const HOME_V2_COPY: Record<Locale, HomeV2Copy> = { en, fr, nl };
