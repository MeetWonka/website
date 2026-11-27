import type { Locale } from "@/i18n/config";

/**
 * Copy for the link-in-bio page (`/links`, `/fr/links`, `/nl/links`).
 * NL/FR wording follows the site's own NL/FR pages where the same line exists.
 * Client quotes keep "[Wonka AI]" where the speaker said "Wonka" (name rule).
 */

export interface LinksQuote {
  key: "itzu" | "pluo" | "krc" | "luminus";
  logo: string;
  logoAlt: string;
  name: string;
  role: string;
  quote: string;
  /** Short stat under the quote; `**x**` is shown in bold. */
  stat?: string;
}

export interface LinksAward {
  key: "bsa" | "vlaio";
  top: string;
  bottom: string;
  /** Callout shown when the badge is opened (tap on phone, hover/click on desktop). */
  title: string;
  body: string;
  meta: string;
  image: string;
  imageAlt: string;
  links: { label: string; href: string }[];
}

export interface LinksEvent {
  id: string;
  name: string;
  place: string;
  /** ISO date-time; the card hides itself after this moment. */
  ends: string;
  dateLabel: string;
  href: string;
  calendarHref: string;
  image: string;
  imageAlt: string;
}

export interface LinksCopy {
  metaTitle: string;
  metaDescription: string;
  line: string;
  awards: LinksAward[];
  closeLabel: string;
  website: string;
  trial: string;
  consultant: string;
  partnersKicker: string;
  clientsKicker: string;
  quotesLabel: string;
  quotes: LinksQuote[];
  followKicker: string;
  youAreHere: string;
  seeKicker: string;
  clipsLabel: string;
  clips: { key: "eu-data" | "agent-sharing" | "connectors"; title: string; aria: string; href: string }[];
  watchOnLinkedIn: string;
  pickerTitle: string;
  pickerTitleAccent: string;
  pickerLabel: string;
  tagEu: string;
  tagEuropean: string;
  askBefore: string;
  askAfter: string;
  modelsTitle: string;
  pickThen: string;
  tryIt: string;
  meetKicker: string;
  eventInfo: string;
  addToCalendar: string;
  noEvent: string;
  followOnLinkedIn: string;
  events: LinksEvent[];
  jobsTitle: string;
  jobsSub: string;
  jobsAll: string;
  share: string;
  copied: string;
  languageLabel: string;
  privacy: string;
}

const LINKEDIN = "https://www.linkedin.com/company/wonka-ai";

const CLIP_LINKS = {
  "eu-data":
    "https://www.linkedin.com/posts/wonka-ai_%F0%9D%90%96%F0%9D%90%A1%F0%9D%90%9E%F0%9D%90%AB%F0%9D%90%9E-%F0%9D%90%B2%F0%9D%90%A8%F0%9D%90%AE%F0%9D%90%AB-%F0%9D%90%9D%F0%9D%90%9A%F0%9D%90%AD%F0%9D%90%9A-%F0%9D%90%A5%F0%9D%90%A2%F0%9D%90%AF%F0%9D%90%9E%F0%9D%90%AC-%F0%9D%90%A6%F0%9D%90%9A%F0%9D%90%AD%F0%9D%90%AD%F0%9D%90%9E%F0%9D%90%AB%F0%9D%90%AC-activity-7523783470003814400-SzMJ",
  "agent-sharing":
    "https://www.linkedin.com/posts/wonka-ai_wonkaai-wonkachat-aiagents-activity-7521620850899611648-lw-F",
  connectors:
    "https://www.linkedin.com/posts/wonka-ai_wonka-workspace-connects-to-more-than-100-activity-7521958488667754496-WPSk",
} as const;

const AWARD_LINKS = {
  bsa: "https://www.tvl.be/nieuws/hasseltse-ai-startup-wonka-uitgeroepen-tot-beste-van-belgie-181192",
  bsaOfficial: "https://www.startupawards.be/finalists-of-the-belgium-startup-awards",
  vlaio:
    "https://www.tvl.be/nieuws/hasseltse-wonka-ai-wint-vlaio-award-voor-samenwerking-met-buildwise-183787",
  vlaioOfficial: "https://www.vlaio.be/en/node/14711",
} as const;

const AWARD_IMAGES = {
  bsa: { image: "/links/awards/bsa-2026.webp", alt: "The Wonka AI team on stage with the Belgium Startup Awards trophy" },
  vlaio: { image: "/links/awards/vlaio-2026.webp", alt: "The Wonka AI team on the VLAIO Awards stage with the award" },
} as const;

export const FOLLOW_LINKEDIN_URL = LINKEDIN;

export const LINKS_COPY: Record<Locale, LinksCopy> = {
  en: {
    metaTitle: "Wonka AI · Links",
    metaDescription:
      "Make AI work for your whole team. Website, get started, a call with a consultant, our socials and latest news.",
    line: "Make AI work for your whole team.",
    awards: [
      {
        key: "bsa", top: "#1 AI start-up of the year", bottom: "Belgium Startup Awards 2026",
        title: "Gold in the AI category",
        body: "Named the most promising AI start-up in Belgium at the Belgium Startup Awards 2026, by a jury of 30+ experts together with a public vote of more than 14,000 votes.",
        meta: "Belgium Startup Awards · June 2026",
        image: AWARD_IMAGES.bsa.image, imageAlt: AWARD_IMAGES.bsa.alt,
        links: [{ label: "Read on TVL ↗", href: AWARD_LINKS.bsa }, { label: "Belgium Startup Awards ↗", href: AWARD_LINKS.bsaOfficial }],
      },
      {
        key: "vlaio", top: "VLAIO Award 2026 winner", bottom: "“Sterk samenwerken”, with Buildwise",
        title: "Won together with Buildwise",
        body: "For Tooli, an AI assistant for quotes, site reports, specifications and technical questions in construction. Built with Buildwise, Embuild, Bouwunie and Constructiv, and available to more than 120,000 construction professionals in Belgium.",
        meta: "VLAIO Awards · Flanders Technology & Innovation Festival · October 2026",
        image: AWARD_IMAGES.vlaio.image, imageAlt: AWARD_IMAGES.vlaio.alt,
        links: [{ label: "Read on TVL ↗", href: AWARD_LINKS.vlaio }, { label: "VLAIO Awards ↗", href: AWARD_LINKS.vlaioOfficial }],
      },
    ],
    closeLabel: "Close",
    website: "Visit our website",
    trial: "Get started",
    consultant: "Talk to a consultant",
    partnersKicker: "Trusted by our partners",
    clientsKicker: "What our clients say",
    quotesLabel: "Client quotes, swipe for more",
    quotes: [
      {
        key: "itzu",
        logo: "/links/partners/itzu.png",
        logoAlt: "Itzu",
        name: "Liesbeth Enkels",
        role: "CIO, Itzu Group",
        quote:
          "“Every employee now has their own AI assistant, connected to our internal systems. It helps our teams save hours every week.”",
        stat: "**100%** of employees equipped with a personal AI assistant.",
      },
      {
        key: "pluo",
        logo: "/links/partners/pluo.png",
        logoAlt: "PLUO",
        name: "Pierre",
        role: "IT manager, PLUO",
        quote:
          "“At the start, [Wonka AI] came to us, presented the tool, helped us set up our first agents, and very quickly let us find our own way.”",
        stat: "**65** people, about **65** AI agents.",
      },
      {
        key: "krc",
        logo: "/links/partners/krc-genk.png",
        logoAlt: "KRC Genk",
        name: "Peter Croonen",
        role: "Chairman, KRC Genk",
        quote:
          "“I’m really pleased with [Wonka AI]. You are creating something very special, and I’m sure KRC Genk will benefit a lot from this cooperation.”",
      },
      {
        key: "luminus",
        logo: "/links/partners/luminus.png",
        logoAlt: "Luminus",
        name: "Luminus",
        role: "Innovation team",
        quote:
          "“You really explained it very well, with the right words: not too technical, but technical enough. All our people could understand.”",
      },
    ],
    followKicker: "Follow Wonka AI",
    youAreHere: "You’re here",
    seeKicker: "See Wonka AI in action",
    clipsLabel: "Product videos, swipe for more",
    clips: [
      { key: "eu-data", title: "Your data stays in Europe", aria: "Demo: your data stays in Europe", href: CLIP_LINKS["eu-data"] },
      { key: "agent-sharing", title: "Share an agent with your whole team", aria: "Demo: share an agent with your whole team", href: CLIP_LINKS["agent-sharing"] },
      { key: "connectors", title: "100+ connectors, one AI workspace", aria: "Demo: 100+ connectors in one AI workspace", href: CLIP_LINKS.connectors },
    ],
    watchOnLinkedIn: "Watch on LinkedIn ↗",
    pickerTitle: "The best AI models,",
    pickerTitleAccent: "one place.",
    pickerLabel: "Pick a model",
    tagEu: "EU region",
    tagEuropean: "Fully European",
    askBefore: "Ask ",
    askAfter: " · try it out here",
    modelsTitle: "All your AI tools in one place",
    pickThen: "Pick a model, then ",
    tryIt: "try it out ↗",
    meetKicker: "Meet us at",
    eventInfo: "Event info",
    addToCalendar: "Add to calendar",
    noEvent: "Our next event is coming soon.",
    followOnLinkedIn: "Follow us on LinkedIn",
    // Add upcoming events here; past ones hide themselves.
    events: [],
    jobsTitle: "We’re hiring.",
    jobsSub: "Help us make AI work for whole organisations, not just the early adopters.",
    jobsAll: "See all open roles",
    share: "Share this page",
    copied: "Link copied",
    languageLabel: "Language",
    privacy: "Privacy",
  },
  nl: {
    metaTitle: "Wonka AI · Links",
    metaDescription:
      "Laat AI werken voor uw hele team. Website, aan de slag, een gesprek met een consultant, onze socials en het laatste nieuws.",
    line: "Laat AI werken voor uw hele team.",
    awards: [
      {
        key: "bsa", top: "#1 AI-start-up van het jaar", bottom: "Belgium Startup Awards 2026",
        title: "Goud in de AI-categorie",
        body: "Uitgeroepen tot meest beloftevolle AI-start-up van België op de Belgium Startup Awards 2026, door een jury van meer dan 30 experten samen met een publieksstemming van meer dan 14.000 stemmen.",
        meta: "Belgium Startup Awards · juni 2026",
        image: AWARD_IMAGES.bsa.image, imageAlt: AWARD_IMAGES.bsa.alt,
        links: [{ label: "Lees op TVL ↗", href: AWARD_LINKS.bsa }, { label: "Belgium Startup Awards ↗", href: AWARD_LINKS.bsaOfficial }],
      },
      {
        key: "vlaio", top: "Winnaar VLAIO Award 2026", bottom: "“Sterk samenwerken”, met Buildwise",
        title: "Samen met Buildwise gewonnen",
        body: "Voor Tooli, een AI-assistent voor offertes, werfverslagen, lastenboeken en technische vragen in de bouw. Gebouwd met Buildwise, Embuild, Bouwunie en Constructiv, en beschikbaar voor meer dan 120.000 bouwprofessionals in België.",
        meta: "VLAIO Awards · Flanders Technology & Innovation Festival · oktober 2026",
        image: AWARD_IMAGES.vlaio.image, imageAlt: AWARD_IMAGES.vlaio.alt,
        links: [{ label: "Lees op TVL ↗", href: AWARD_LINKS.vlaio }, { label: "VLAIO Awards ↗", href: AWARD_LINKS.vlaioOfficial }],
      },
    ],
    closeLabel: "Sluiten",
    website: "Bezoek onze website",
    trial: "Aan de slag",
    consultant: "Spreek een consultant",
    partnersKicker: "Onze partners",
    clientsKicker: "Wat onze klanten zeggen",
    quotesLabel: "Klantgetuigenissen, swipe voor meer",
    quotes: [
      {
        key: "itzu",
        logo: "/links/partners/itzu.png",
        logoAlt: "Itzu",
        name: "Liesbeth Enkels",
        role: "CIO, Itzu Group",
        quote:
          "“Elke medewerker heeft nu een eigen AI-assistent, gekoppeld aan onze interne systemen. Zo helpen we teams elke week uren te besparen.”",
        stat: "**100%** van de medewerkers uitgerust met een persoonlijke AI-assistent.",
      },
      {
        key: "pluo",
        logo: "/links/partners/pluo.png",
        logoAlt: "PLUO",
        name: "Pierre",
        role: "IT-manager, PLUO",
        quote:
          "“In het begin kwam [Wonka AI] bij ons langs, stelde de tool voor, hielp ons de eerste agents op te zetten en liet ons heel snel zelf verder werken.”",
        stat: "**65** mensen, zo’n **65** AI-agents.",
      },
      {
        key: "krc",
        logo: "/links/partners/krc-genk.png",
        logoAlt: "KRC Genk",
        name: "Peter Croonen",
        role: "Voorzitter, KRC Genk",
        quote:
          "“Ik ben echt blij met [Wonka AI]. Jullie bouwen iets heel bijzonders, en ik ben zeker dat KRC Genk veel zal hebben aan deze samenwerking.”",
      },
      {
        key: "luminus",
        logo: "/links/partners/luminus.png",
        logoAlt: "Luminus",
        name: "Luminus",
        role: "Innovatieteam",
        quote:
          "“Jullie legden het echt goed uit, met de juiste woorden: niet te technisch, maar wel technisch genoeg. Al onze mensen konden het volgen.”",
      },
    ],
    followKicker: "Volg Wonka AI",
    youAreHere: "Je bent hier",
    seeKicker: "Wonka AI in actie",
    clipsLabel: "Productvideo’s, swipe voor meer",
    clips: [
      { key: "eu-data", title: "Uw data blijft in Europa", aria: "Demo: uw data blijft in Europa", href: CLIP_LINKS["eu-data"] },
      { key: "agent-sharing", title: "Deel een agent met uw hele team", aria: "Demo: deel een agent met uw hele team", href: CLIP_LINKS["agent-sharing"] },
      { key: "connectors", title: "100+ connectoren, één AI-werkplek", aria: "Demo: 100+ connectoren in één AI-werkplek", href: CLIP_LINKS.connectors },
    ],
    watchOnLinkedIn: "Bekijk op LinkedIn ↗",
    pickerTitle: "De beste AI-modellen,",
    pickerTitleAccent: "op één plek.",
    pickerLabel: "Kies een model",
    tagEu: "EU-regio",
    tagEuropean: "Volledig Europees",
    askBefore: "Vraag het ",
    askAfter: " · probeer het hier",
    modelsTitle: "Al uw AI-tools op één plek",
    pickThen: "Kies een model en ",
    tryIt: "probeer het ↗",
    meetKicker: "Ontmoet ons op",
    eventInfo: "Meer info",
    addToCalendar: "Zet in agenda",
    noEvent: "Ons volgende event komt eraan.",
    followOnLinkedIn: "Volg ons op LinkedIn",
    // Add upcoming events here; past ones hide themselves.
    events: [],
    jobsTitle: "We zoeken collega’s.",
    jobsSub: "Help ons AI laten werken voor hele organisaties, niet alleen voor de early adopters.",
    jobsAll: "Bekijk alle vacatures",
    share: "Deel deze pagina",
    copied: "Link gekopieerd",
    languageLabel: "Taal",
    privacy: "Privacy",
  },
  fr: {
    metaTitle: "Wonka AI · Liens",
    metaDescription:
      "Faites fonctionner l’IA pour toute votre équipe. Site, premiers pas, échange avec un consultant, nos réseaux et nos actualités.",
    line: "Faites fonctionner l’IA pour toute votre équipe.",
    awards: [
      {
        key: "bsa", top: "Start-up IA n°1 de l’année", bottom: "Belgium Startup Awards 2026",
        title: "Or dans la catégorie IA",
        body: "Désignée start-up IA la plus prometteuse de Belgique aux Belgium Startup Awards 2026, par un jury de plus de 30 experts et un vote du public de plus de 14 000 voix.",
        meta: "Belgium Startup Awards · juin 2026",
        image: AWARD_IMAGES.bsa.image, imageAlt: AWARD_IMAGES.bsa.alt,
        links: [{ label: "Lire sur TVL ↗", href: AWARD_LINKS.bsa }, { label: "Belgium Startup Awards ↗", href: AWARD_LINKS.bsaOfficial }],
      },
      {
        key: "vlaio", top: "Lauréat du VLAIO Award 2026", bottom: "« Sterk samenwerken », avec Buildwise",
        title: "Remporté avec Buildwise",
        body: "Pour Tooli, un assistant IA pour les devis, rapports de chantier, cahiers des charges et questions techniques dans la construction. Développé avec Buildwise, Embuild, Bouwunie et Constructiv, et disponible pour plus de 120 000 professionnels belges de la construction.",
        meta: "VLAIO Awards · Flanders Technology & Innovation Festival · octobre 2026",
        image: AWARD_IMAGES.vlaio.image, imageAlt: AWARD_IMAGES.vlaio.alt,
        links: [{ label: "Lire sur TVL ↗", href: AWARD_LINKS.vlaio }, { label: "VLAIO Awards ↗", href: AWARD_LINKS.vlaioOfficial }],
      },
    ],
    closeLabel: "Fermer",
    website: "Visitez notre site",
    trial: "Commencer",
    consultant: "Parler à un consultant",
    partnersKicker: "Ils nous font confiance",
    clientsKicker: "Ce que disent nos clients",
    quotesLabel: "Témoignages clients, faites défiler",
    quotes: [
      {
        key: "itzu",
        logo: "/links/partners/itzu.png",
        logoAlt: "Itzu",
        name: "Liesbeth Enkels",
        role: "DSI, Itzu Group",
        quote:
          "« Chaque collaborateur dispose désormais de son assistant IA, connecté à nos systèmes internes. Cela aide nos équipes à gagner des heures chaque semaine. »",
        stat: "**100 %** des collaborateurs équipés d’un assistant IA personnel.",
      },
      {
        key: "pluo",
        logo: "/links/partners/pluo.png",
        logoAlt: "PLUO",
        name: "Pierre",
        role: "Responsable IT, PLUO",
        quote:
          "« Au début, [Wonka AI] est venu chez nous, nous a présenté l’outil, nous a aidés à mettre en place les premiers agents et nous a très vite laissés avancer de notre côté. »",
        stat: "**65** personnes, environ **65** agents IA.",
      },
      {
        key: "krc",
        logo: "/links/partners/krc-genk.png",
        logoAlt: "KRC Genk",
        name: "Peter Croonen",
        role: "Président, KRC Genk",
        quote:
          "« Je suis vraiment content de [Wonka AI]. Vous créez quelque chose de très spécial, et je suis sûr que le KRC Genk profitera beaucoup de cette collaboration. »",
      },
      {
        key: "luminus",
        logo: "/links/partners/luminus.png",
        logoAlt: "Luminus",
        name: "Luminus",
        role: "Équipe innovation",
        quote:
          "« Vous l’avez vraiment bien expliqué, avec les bons mots : pas trop technique, mais assez technique. Tous nos collaborateurs ont pu suivre. »",
      },
    ],
    followKicker: "Suivez Wonka AI",
    youAreHere: "Vous êtes ici",
    seeKicker: "Wonka AI en action",
    clipsLabel: "Vidéos produit, faites défiler",
    clips: [
      { key: "eu-data", title: "Vos données restent en Europe", aria: "Démo : vos données restent en Europe", href: CLIP_LINKS["eu-data"] },
      { key: "agent-sharing", title: "Partagez un agent avec toute votre équipe", aria: "Démo : partagez un agent avec toute votre équipe", href: CLIP_LINKS["agent-sharing"] },
      { key: "connectors", title: "100+ connecteurs, un seul espace IA", aria: "Démo : 100+ connecteurs dans un seul espace IA", href: CLIP_LINKS.connectors },
    ],
    watchOnLinkedIn: "Voir sur LinkedIn ↗",
    pickerTitle: "Les meilleurs modèles d’IA,",
    pickerTitleAccent: "au même endroit.",
    pickerLabel: "Choisissez un modèle",
    tagEu: "Région UE",
    tagEuropean: "100 % européen",
    askBefore: "Demandez à ",
    askAfter: " · essayez ici",
    modelsTitle: "Tous vos outils IA au même endroit",
    pickThen: "Choisissez un modèle, puis ",
    tryIt: "essayez ↗",
    meetKicker: "Retrouvez-nous à",
    eventInfo: "Infos",
    addToCalendar: "Ajouter à l’agenda",
    noEvent: "Notre prochain événement arrive bientôt.",
    followOnLinkedIn: "Suivez-nous sur LinkedIn",
    // Add upcoming events here; past ones hide themselves.
    events: [],
    jobsTitle: "On recrute.",
    jobsSub:
      "Aidez-nous à faire fonctionner l’IA pour des organisations entières, pas seulement pour les pionniers.",
    jobsAll: "Voir toutes les offres",
    share: "Partager cette page",
    copied: "Lien copié",
    languageLabel: "Langue",
    privacy: "Confidentialité",
  },
};

/**
 * Only logos already shown elsewhere on the public site (plus PLUO, which approved its quote).
 * Add a partner here only once they have OK'd the use of their logo.
 */
export const LINKS_PARTNERS: { name: string; slug: string; shape?: "tall" | "wide" }[] = [
  { name: "ENGIE", slug: "engie" },
  { name: "PwC", slug: "pwc" },
  { name: "Luminus", slug: "luminus" },
  { name: "KRC Genk", slug: "krc-genk", shape: "tall" },
  { name: "Itzu", slug: "itzu" },
  { name: "Ingenium Group", slug: "ingenium-group" },
  { name: "Buildwise", slug: "buildwise", shape: "tall" },
  { name: "Cambio", slug: "cambio", shape: "tall" },
  { name: "Medi-Market", slug: "medi-market", shape: "tall" },
  { name: "PLUO", slug: "pluo" },
  { name: "PMV", slug: "pmv" },
  { name: "Zorgi", slug: "zorgi" },
];

export const LINKS_SOCIALS: { platform: "linkedin" | "instagram" | "tiktok" | "youtube"; label: string; href: string | null }[] = [
  { platform: "linkedin", label: "LinkedIn", href: LINKEDIN },
  { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/meetwonka" },
  { platform: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@meet.wonka" },
  { platform: "youtube", label: "YouTube", href: "https://www.youtube.com/@meetwonka" },
];

export const LINKS_ROLES = [
  "AI Implementation Specialist",
  "AI Business Analyst (Junior)",
  "Event & Community Coordinator",
  "Project Manager AI Implementation",
  "Customer Support Intern",
];

export const LINKS_JOBS_URL = "https://wonka-ai.odoo.com/jobs";
