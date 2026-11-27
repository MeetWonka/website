import type { LocalePageDefaults } from "@/lib/page-defaults/localized";
import { getAiChatCapabilityClusters } from "@/lib/page-defaults/ai-chat-capability-grid";
import type { SecurityData } from "@/lib/types";
import type {
  IconFeatureGridData,
  ProblemBentoData,
  WorkflowStepResolved,
  WorkflowStepVisual,
} from "@/lib/types/page-sections";
import type { TestimonialsHeader } from "@/lib/testimonials-defaults";

/* ------------------------------------------------------------------ */
/* Helpers (mirroring the EN defaults files)                          */
/* ------------------------------------------------------------------ */

function bentoCard(
  _key: string,
  title: string,
  body: string,
): ProblemBentoData["largeCards"][number] {
  return { _key, title, body, image: null, fallbackImage: null };
}

function capabilityItem(
  _key: string,
  icon: string,
  title: string,
  body: string,
): IconFeatureGridData["items"][number] {
  return { _key, icon, title, body, image: null, fallbackImage: null };
}

const WORKFLOW_STEP_LAYOUT: Array<
  Pick<WorkflowStepResolved, "variant" | "mirror" | "svgFillClassName" | "divBgClassName">
> = [
  { variant: "trapezoid", mirror: false, svgFillClassName: "fill-light-gray", divBgClassName: "bg-light-gray" },
  { variant: "rectangle", mirror: false, svgFillClassName: "fill-mid-gray", divBgClassName: "bg-mid-gray" },
  { variant: "trapezoid", mirror: true, svgFillClassName: "fill-light-gray", divBgClassName: "bg-light-gray" },
];

function workflowStep(
  _key: string,
  title: string,
  body: string,
  visual: WorkflowStepVisual,
  index: number,
): WorkflowStepResolved {
  const layout = WORKFLOW_STEP_LAYOUT[index] ?? WORKFLOW_STEP_LAYOUT[0];
  return { _key, title, body, visual, image: null, fallbackImage: null, ...layout };
}

/* ------------------------------------------------------------------ */
/* Shared sections                                                    */
/* ------------------------------------------------------------------ */

const TESTIMONIALS_HEADER: TestimonialsHeader = {
  eyebrow: "Wat klanten zeggen",
  heading: "Eerlijke feedback\nvan gewaardeerde mensen.",
  body: "Echte feedback van leiders die Wonka vertrouwden om hun AI-ambitie om te zetten in een concreet plan waarmee hun teams aan de slag konden.",
};

const TESTIMONIALS_SECTION = {
  eyebrow: TESTIMONIALS_HEADER.eyebrow ?? null,
  heading: TESTIMONIALS_HEADER.heading ?? null,
  body: TESTIMONIALS_HEADER.body ?? null,
};

const SECURITY: SecurityData = {
  eyebrow: null,
  heading: "Uw data blijft altijd van u.",
  body: null,
};

const WONKA_CHAT_SECURITY: SecurityData = {
  eyebrow: "Beveiliging",
  heading: "Uw data blijft altijd van u.",
  body: "WonkaChat is ontworpen voor bedrijven die AI nodig hebben die nuttig, beheerst en veilig is. Uw team krijgt de snelheid van AI, met de controles die uw organisatie verwacht.",
};

const PROOF_LOGOS = [
  { src: "/images/hero/proof-1.svg", alt: "PwC, Engie, Buildwise, Xerius", width: 287, height: 24 },
  { src: "/images/hero/proof-2.svg", alt: "Luminus, Cambio, Zorgi, ODTH", width: 289, height: 24 },
];

const PROOF_LOGO_STRIP = {
  logos: null,
  proofLines: ["#1 Start AI-partner in België", "+150 Start AI-trajecten afgerond"],
  fallbackLogos: PROOF_LOGOS,
};

const WHY_NOW = {
  header: {
    eyebrow: "Waarom nu",
    heading: "Laat geen enkel team achter.",
    body: "AI mag niet alleen werken voor wie weet welke prompt te schrijven of welke tool te openen. Het moet de hele organisatie helpen slimmer, sneller en met meer focus te werken.",
  },
  cards: [
    {
      _key: "pioneers",
      title: "AI mag niet bij de pioniers blijven",
      body: "In veel organisaties blijft de waarde van AI bij een kleine groep early adopters. Zij vinden betere manieren van werken, maar die verspreiden zich zelden over de teams.\n\nStart AI creëert de structuur om individuele experimenten om te zetten in vooruitgang voor de hele organisatie.",
    },
    {
      _key: "repetitive",
      title: "Mensen zijn te goed voor repetitief werk",
      body: "Uw team zou zijn beste uren niet moeten besteden aan informatie kopiëren, documenten zoeken, dezelfde antwoorden herschrijven of werk tussen systemen verplaatsen.\n\nStart AI brengt in kaart met welk werk uw mensen moeten stoppen — en waar AI hen eerst kan ondersteunen.",
    },
    {
      _key: "governance",
      title: "Verantwoorde AI vraagt om gedeelde regels",
      body: "Als iedereen AI anders gebruikt, verliest de organisatie de controle. Als niemand AI gebruikt, verliest de organisatie haar momentum.\n\nStart AI helpt u de balans te vinden: duidelijke governance, praktische richtlijnen en een roadmap die AI bruikbaar maakt voor iedereen.",
    },
  ],
};

const PROMO_HEADING = "Krijg 70% korting als Vlaamse kmo.";
const PROMO_BODY =
  "We begeleiden Vlaamse kmo's door Start AI. Voor veel bedrijven is regionale ondersteuning mogelijk; in een eerste gesprek bekijken we wat op u van toepassing is.";

const TALK_TO_US_HEADER = {
  eyebrow: "Spreek met ons",
  heading: "Klaar voor AI in actie?",
  body: "Plan een kennismakingsgesprek van 30 minuten. Geen slides, geen pitch, gewoon een echt gesprek over uw bedrijf.",
};

const FAQ_HEADER = {
  eyebrow: "FAQ",
  heading: "Veelgestelde vragen",
  body: null,
};

const WONKA_CHAT_HERO_IMAGE = {
  src: "/images/wonka-chat/wonka-hero-flow-v2.png",
  alt: "WonkaChat zet binnenkomende documenten en e-mails om in gecontroleerde acties in uw tools",
  width: 1920,
  height: 694,
};

const WONKA_CHAT_CONTACT = {
  header: {
    eyebrow: "Boek een demo",
    heading: "Benieuwd wat Wonka Workspace\nvoor uw team kan doen?",
    body: "Boek een korte demo en wij tonen hoe Wonka Workspace aansluit op uw tools, uw workflows ondersteunt en AI toegankelijk maakt in heel uw organisatie.",
  },
  portrait: null,
  personName: "Jordy Callens",
  personRole: "Partner, Wonka",
  fallbackPortrait: { src: "/images/start-ai/jordy.jpg", alt: "Jordy Callens" },
};

const WONKA_CHAT_FEATURES = {
  header: {
    eyebrow: "Productfuncties",
    heading: "Alles wat uw team nodig heeft\nom met AI te werken.",
    body: "WonkaChat is gebouwd om AI nuttig te maken in de hele organisatie: eenvoudig genoeg voor elke medewerker, krachtig genoeg voor echte workflows en flexibel genoeg om te koppelen met de tools die u al gebruikt.",
  },
  showCta: true,
  features: [
    {
      _key: "chat",
      title: "Chat voor uw bedrijf",
      description:
        "Geef uw medewerkers één eenvoudige plek om vragen te stellen, informatie te vinden en hulp van AI te krijgen. WonkaChat werkt als een vertrouwde chat, maar met de context en workflows van uw bedrijf ingebouwd.",
      image: null,
      link: null,
      fallbackImage: {
        src: "/images/wonka-chat/create-ai-agents-for-specific-tasks.png",
        alt: "AI-agents maken voor specifieke taken in WonkaChat",
        width: 1200,
        height: 800,
      },
    },
    {
      _key: "models",
      title: "Kies uw eigen AI-model",
      description:
        "WonkaChat geeft uw bedrijf flexibiliteit. Gebruik het AI-model dat past bij uw noden, voorkeuren en veiligheidseisen.",
      image: null,
      link: null,
      fallbackImage: {
        src: "/images/wonka-chat/feature-models.png",
        alt: "Kies uit toonaangevende AI-modellen",
        width: 1200,
        height: 800,
      },
    },
    {
      _key: "tools",
      title: "Gekoppeld aan uw tools",
      description:
        "WonkaChat koppelt met de systemen die uw team al gebruikt, zodat medewerkers informatie opvragen en acties starten zonder tussen tools te wisselen.",
      image: null,
      link: {
        label: "Ontdek alle integraties",
        href: "/nl/integrations",
      },
      fallbackImage: {
        src: "/images/wonka-chat/feature-tools.png",
        alt: "Gekoppeld aan de tools die uw team gebruikt",
        width: 1200,
        height: 800,
      },
    },
    {
      _key: "agents",
      title: "Maak AI-agents voor specifieke taken",
      description:
        "Bouw agents die een rol, taak of workflow begrijpen. Van sales-opvolging tot financiële controles of supportsamenvattingen: agents helpen medewerkers specifiek werk sneller gedaan te krijgen.",
      image: null,
      link: null,
      fallbackImage: {
        src: "/images/wonka-chat/wonka-vis-10.png",
        alt: "AI-agents maken voor specifieke taken",
        width: 1200,
        height: 800,
      },
    },
    {
      _key: "employee",
      title: "Gebouwd voor elke medewerker",
      description:
        "WonkaChat is ontworpen zodat de hele organisatie met AI kan werken, niet alleen technische teams of early adopters. Medewerkers gebruiken eenvoudige taal, gedeelde agents en begeleide workflows.",
      image: null,
      link: null,
      fallbackImage: {
        src: "/images/wonka-chat/feature-employee.png",
        alt: "Gebouwd voor elke medewerker",
        width: 1200,
        height: 800,
      },
    },
  ],
};

/* ------------------------------------------------------------------ */
/* NL page defaults                                                   */
/* ------------------------------------------------------------------ */

export const NL_PAGE_DEFAULTS: LocalePageDefaults = {
  /* ---------------------------- Start AI ---------------------------- */
  startAi: {
    hero: {
      eyebrow: "Start AI",
      title: "Maak uw bedrijf AI‑gedreven, snel.",
      subtitle:
        "Wij evalueren uw werking, ontwerpen uw AI-strategie en bezorgen u het uitvoeringsplan, zodat uw hele team op volle kracht kan werken.",
      secondaryText: null,
      theme: "dark",
      backgroundImage: null,
      heroImage: null,
      secondaryLink: null,
      fallbackBackground: { src: "/images/start-ai/wonka-waterfall.png", alt: "" },
      fallbackHero: null,
    },
    logoStrip: PROOF_LOGO_STRIP,
    phases: {
      header: {
        eyebrow: "Het framework",
        heading: "Een bewezen framework\nvoor AI-adoptie.",
        body: "Start AI vertrekt vanuit een eenvoudige overtuiging: succesvolle AI-adoptie begint niet bij tools. Ze begint bij duidelijkheid, afstemming en de juiste prioriteiten.",
      },
      items: [
        {
          _key: "prepare",
          number: "01",
          title: "Voorbereiden",
          subtitle: "Afstemming creëren vóór actie",
          body: "We bepalen de strategische context, verduidelijken de verwachtingen en zorgen dat de juiste mensen vanaf het begin betrokken zijn. Zo wordt het programma geen generieke AI-verkenning, maar een gericht traject rond de realiteit van uw organisatie.",
        },
        {
          _key: "understand",
          number: "02",
          title: "Begrijpen & Inspireren",
          subtitle: "Een gedeeld begrip van AI opbouwen",
          body: "We brengen directie, teams en belangrijke stakeholders op één lijn. Met inspiratie, voorbeelden en het uittekenen van een toekomstvisie bepalen we wat AI voor uw organisatie kan betekenen en waar het waarde moet creëren.",
        },
        {
          _key: "analyse",
          number: "03",
          title: "Analyseren & Valideren",
          subtitle: "Echte kansen scheiden van ruis",
          body: "We analyseren uw workflows, processen en knelpunten om de AI-kansen te vinden die zowel waardevol als realistisch zijn. Elke kans wordt beoordeeld op impact, haalbaarheid, maturiteit en strategische relevantie.",
        },
        {
          _key: "activate",
          number: "04",
          title: "Activeren & Opleveren",
          subtitle: "Strategie omzetten in een praktische roadmap",
          body: "We vertalen de gevalideerde kansen naar een concrete roadmap, ondersteund door een governancebasis en praktische aanbevelingen. Het resultaat is een duidelijke weg vooruit: wat te doen, waarom het ertoe doet en hoe te starten.",
        },
      ],
    },
    deliverables: {
      heading: "Waarmee u naar huis gaat.",
      items: [
        {
          _key: "readiness",
          title: "AI-readiness assessment",
          body: "Een helder beeld van waar uw organisatie vandaag staat.",
        },
        {
          _key: "cases",
          title: "Prioritaire AI-businesscases",
          body: "De kansen met het hoogste rendement, klaar om gerealiseerd te worden.",
        },
        {
          _key: "roadmap",
          title: "Concrete AI-roadmap",
          body: "Wat te implementeren, in welke volgorde en waarom.",
        },
        {
          _key: "policy",
          title: "AI-beleid & governanceframework",
          body: "Richtlijnen zodat alles wat volgt binnen het juiste kader valt.",
        },
        {
          _key: "quickwin",
          title: "Identificatie van quick wins",
          body: "Direct uitvoerbare kansen waarmee uw team vanaf dag één aan de slag kan.",
        },
        {
          _key: "agents",
          title: "Concepten voor AI-agents",
          body: "Waar AI-assistenten op maat u de meeste waarde opleveren.",
        },
      ],
    },
    industries: {
      header: {
        eyebrow: "Onze sectoren",
        heading: "Waar Start AI\nwaarde creëert.",
        body: "Start AI is gevormd door ervaring in diverse sectoren. We vertrekken niet vanuit generieke AI-trends, maar vanuit de operationele realiteit van uw organisatie: waar tijd verloren gaat, waar kwaliteit onder druk staat en waar teams betere tools nodig hebben om te groeien.",
      },
      industries: [
        {
          _key: "logistics",
          label: "Logistiek & Transport",
          body: "Transport- en logistieke teams werken vaak onder hoge druk, waarbij groei snel knelpunten blootlegt in planning, verwerking en communicatie.",
          bullets: [
            "Operationele knelpunten opsporen die groei afremmen",
            "AI-ondersteuning verkennen voor planning, verwerking en interne communicatie",
            "Manuele opvolging en repetitief coördinatiewerk verminderen",
            "Schaalbaarheid verbeteren zonder onnodige complexiteit",
          ],
          clients: ["ODTH", "Katoen Natie"],
        },
        {
          _key: "healthcare",
          label: "Zorg",
          body: "Zorgorganisaties werken met gevoelige informatie, hoge administratieve druk en teams die snel toegang nodig hebben tot betrouwbare kennis.",
          bullets: [
            "Administratieve workflows opsporen waar AI de werkdruk kan verlagen",
            "Veilige AI-ondersteuning verkennen voor documentatie en kennistoegang",
            "Richtlijnen voor verantwoorde AI in gevoelige omgevingen bepalen",
            "Efficiëntie verbeteren met databeveiliging en controle centraal",
          ],
          clients: ["Zorgi", "Cambio"],
        },
        {
          _key: "finance",
          label: "Finance",
          body: "Financiële teams werken in documentintensieve, rapportagegedreven en compliancegevoelige omgevingen waar nauwkeurigheid en controle essentieel zijn.",
          bullets: [
            "Rapportage-, review- en compliance-intensieve workflows in kaart brengen",
            "AI-ondersteuning verkennen voor documentanalyse en het gebruik van interne kennis",
            "Kansen vinden om repetitief expertwerk te versnellen",
            "Governance bepalen voor veilige en verantwoorde AI-adoptie",
          ],
          clients: ["PwC", "Xerius"],
        },
        {
          _key: "legal",
          label: "Juridisch",
          body: "Juridische teams verliezen kostbare tijd aan repetitief opzoekwerk, opstellen, nalezen en documentintensieve workflows, terwijl menselijk oordeel centraal moet blijven.",
          bullets: [
            "Repetitief opzoekwerk en documenttaken identificeren",
            "AI-ondersteuning verkennen voor samenvatten, opstellen en nalezen",
            "Duidelijke grenzen bepalen voor verantwoord AI-gebruik",
            "Experts vrijmaken voor strategischer en waardevoller werk",
          ],
          clients: ["Eubelius", "Monard Law"],
        },
        {
          _key: "manufacturing",
          label: "Productie",
          body: "Productieomgevingen steunen vaak op proceskennis, manuele controles, rapportagestromen en operationele beslissingen over teams heen.",
          bullets: [
            "Knelpunten in kwaliteit, rapportage en processen opsporen",
            "AI-ondersteuning verkennen voor documentatie en het delen van operationele kennis",
            "Manuele controles en repetitieve rapportage verminderen",
            "AI-kansen prioriteren op basis van impact en haalbaarheid",
          ],
          clients: ["Buildwise", "Engie"],
        },
        {
          _key: "public",
          label: "Publieke sector",
          body: "Overheidsorganisaties kunnen AI inzetten om hun interne efficiëntie en dienstverlening te verbeteren, met behoud van transparantie, governance en publiek vertrouwen.",
          bullets: [
            "Knelpunten in administratie en burgerdienstverlening opsporen",
            "AI-ondersteuning verkennen voor interne kennistoegang en documentstromen",
            "Richtlijnen voor verantwoord gebruik en governanceprincipes bepalen",
            "AI-kansen met laag risico en hoge maatschappelijke waarde prioriteren",
          ],
          clients: ["Stad Gent", "VLAIO"],
        },
        {
          _key: "all",
          label: "Alle sectoren",
          body: "AI-kansen beperken zich niet tot één sector. Overal waar teams te maken hebben met repetitief werk, versnipperde kennis, trage processen of complexe informatie, helpt Start AI waarde blootleggen.",
          bullets: [
            "Ontdekken waar AI meetbare impact kan creëren",
            "Kansen valideren vóór u investeert in implementatie",
            "Het juiste platform en de juiste governance-aanpak kiezen",
            "Een roadmap op maat van uw organisatie opbouwen",
          ],
          clients: ["Luminus", "Wonka"],
        },
      ],
    },
    whyNow: WHY_NOW,
    promo: {
      eyebrow: "Start AI in Vlaanderen",
      heading: PROMO_HEADING,
      body: PROMO_BODY,
      variant: "darkImage",
      backgroundImage: null,
      showCta: true,
      ctaHref: "/services/start-ai-subsidized-flanders",
      ctaLabel: "Meer over de subsidie",
      fallbackBackground: { src: "/images/how-to-start/how-to-start-bg.avif", alt: "" },
    },
    testimonials: TESTIMONIALS_SECTION,
    contact: {
      header: TALK_TO_US_HEADER,
      portrait: null,
      personName: "Jordy Callens",
      personRole: "Partner, Wonka",
      fallbackPortrait: { src: "/images/start-ai/jordy.jpg", alt: "Jordy Callens" },
    },
    faq: {
      header: FAQ_HEADER,
      items: [
        {
          _key: "who",
          question: "Voor wie is Start AI?",
          answer:
            "Voor Belgische kmo's en scale-ups die in enkele weken willen evolueren van AI-experimenten naar een duidelijke, bedrijfsbrede strategie.",
        },
        {
          _key: "time",
          question: "Hoeveel tijd vraagt het van ons?",
          answer:
            "Ongeveer een halve dag per week voor 2 tot 3 sleutelfiguren. Wij doen het zware werk tussen de sessies.",
        },
        {
          _key: "deliverables",
          question: "Wat krijgen we op het einde?",
          answer:
            "Een geprioriteerde AI-roadmap, een uitvoeringsplan voor 90 dagen en een presentatie voor de directie, klaar om te delen.",
        },
        {
          _key: "start",
          question: "Hoe snel kunnen we starten?",
          answer: "De meeste teams starten binnen 2 weken na het eerste gesprek.",
        },
      ],
    },
    seo: {
      metaTitle: "Start AI | AI-strategie en roadmap voor uw bedrijf",
      metaDescription:
        "Een programma van 6 weken om uw kmo AI-native te maken. Vind de juiste AI-kansen voor uw bedrijf, bouw uw strategie en boek snel resultaat.",
      ogImage: null,
    },
  },

  /* --------------------------- Wonka Build -------------------------- */
  wonkaBuild: {
    hero: {
      eyebrow: "Wonka Build",
      title: "AI op maat. Gebouwd en opgeleverd door ons team.",
      subtitle:
        "Wanneer de AI die u nodig hebt niet kant-en-klaar bestaat, bouwen wij ze, ontworpen rond uw bedrijf en in productie gebracht.",
      secondaryText: null,
      theme: "dark",
      backgroundImage: null,
      heroImage: null,
      secondaryLink: null,
      fallbackBackground: { src: "/images/wonka-build/hero-bg.png", alt: "" },
      fallbackHero: null,
    },
    logoStrip: PROOF_LOGO_STRIP,
    phases: {
      header: {
        eyebrow: "Hoe het werkt",
        heading: "Van uw proces\nnaar productie.",
        body: "Een Build-traject verloopt in vier samenhangende fases. Afgebakend als engineering, niet als workshop. Opgeleverd in uw werking, niet in een slidedeck.",
      },
      items: [
        {
          _key: "map",
          number: "01",
          title: "In kaart brengen",
          subtitle: "Vertrekken vanuit uw werking, niet vanuit een sjabloon",
          body: "We duiken in uw werking en brengen in kaart hoe het werk vandaag loopt. Daarna bepalen we precies wat we bouwen en waarom het zijn plaats verdient.",
        },
        {
          _key: "connect",
          number: "02",
          title: "Koppelen",
          subtitle: "Bovenop de systemen die u al gebruikt",
          body: "We koppelen met de systemen die u al gebruikt: e-mail, ERP, CRM, documenten, databases. Het fundament waarop de oplossing rust.",
        },
        {
          _key: "build-ship",
          number: "03",
          title: "Bouwen & opleveren",
          subtitle: "Productie, geen pilot in een sandbox",
          body: "We bouwen uw agents en applicaties en brengen ze in productie. Echte workflows, echte randgevallen, van begin tot eind afgehandeld. Geen pilot in een sandbox.",
        },
        {
          _key: "tune-handover",
          number: "04",
          title: "Bijsturen & overdragen",
          subtitle: "Onafhankelijkheid hoort bij de oplevering",
          body: "We blijven na de go-live om te stabiliseren, bij te sturen en op te leiden, en we maken iemand in uw team klaar om het te beheren. Zo bent u nooit van ons afhankelijk om het draaiende te houden.",
        },
      ],
    },
    deliverables: {
      heading: "Een systeem dat draait.",
      items: [
        {
          _key: "applications",
          title: "AI-applicaties op maat",
          body: "Gebouwd rond uw data en uw team, niet rond een generiek sjabloon.",
        },
        {
          _key: "agents",
          title: "Productieklare AI-agents",
          body: "Actief in uw werking, ze handelen echt werk van begin tot eind af.",
        },
        {
          _key: "integrations",
          title: "Diepe integraties",
          body: "Gekoppeld aan de tools, data en infrastructuur die u al gebruikt.",
        },
        {
          _key: "owner",
          title: "Een eigenaar in uw team",
          body: "We leiden iemand intern op tot die het zelf kan beheren en uitbreiden.",
        },
        {
          _key: "governance",
          title: "Ingebouwde governance",
          body: "Guardrails, toegangsbeheer en een AI-beleid dat past bij uw organisatie.",
        },
        {
          _key: "hypercare",
          title: "Hypercare na de lancering",
          body: "We blijven na de go-live paraat om te stabiliseren en te verfijnen.",
        },
      ],
    },
    industries: {
      header: {
        eyebrow: "Wat we bouwen",
        heading: "Van uw moeilijkste proces\nnaar productie.",
        body: "Elk Wonka Build-traject wordt afgestemd op uw bedrijf. Hieronder de systemen die we doorgaans opleveren: agents, applicaties en de infrastructuur waarmee ze echt werk aankunnen.",
      },
      industries: [
        {
          _key: "applications",
          label: "Interne applicaties op maat",
          body: "Dashboards, portalen en tools gebouwd rond uw data, die uw team live inzicht en controle geven op één plek.",
          bullets: ["Apps", "AI-chats"],
          clients: [],
        },
      ],
    },
    whyNow: WHY_NOW,
    promo: {
      eyebrow: "Start AI in Vlaanderen",
      heading: PROMO_HEADING,
      body: PROMO_BODY,
      variant: "darkImage",
      backgroundImage: null,
      showCta: true,
      ctaHref: null,
      ctaLabel: null,
      fallbackBackground: { src: "/images/wonka-build/promo-bg.avif", alt: "" },
    },
    testimonials: TESTIMONIALS_SECTION,
    contact: {
      header: TALK_TO_US_HEADER,
      portrait: null,
      personName: "Jordy Callens",
      personRole: "Partner, Wonka",
      fallbackPortrait: { src: "/images/wonka-build/jordy.jpg", alt: "Jordy Callens" },
    },
    faq: {
      header: FAQ_HEADER,
      items: [
        {
          _key: "wonka-chat-vs-build",
          question: "Wat is het verschil tussen Wonka Build en WonkaChat?",
          answer:
            "WonkaChat is ons platform: één veilige AI-werkplek die uw hele team dagelijks gebruikt. Wonka Build is ons maatwerktraject: we ontwerpen en bouwen agents, applicaties en systemen specifiek voor uw bedrijf en brengen ze in productie. Veel klanten gebruiken beide.",
        },
        {
          _key: "agents-or-apps",
          question: "Wat kunnen jullie bouwen: agents, applicaties of beide?",
          answer:
            "Beide. Van gerichte AI-agents die een workflow van begin tot eind afhandelen tot volledige applicaties op maat, met de integraties en infrastructuur eronder.",
        },
        {
          _key: "strategy-first",
          question: "Hebben we eerst een uitgewerkte AI-strategie nodig?",
          answer:
            "Nee. Als u weet welk proces u geld kost, is dat genoeg om te starten. Weet u dat niet, dan geeft Start AI u eerst duidelijkheid, en worden de businesscases de blauwdruk voor uw build.",
        },
        {
          _key: "on-premise",
          question: "Kan het op onze eigen servers draaien?",
          answer:
            "Ja. Wonka Build kan volledig on-premise draaien, binnen uw netwerk, zonder dat er iets naar buiten gaat, of in een veilige Europese omgeving.",
        },
        {
          _key: "independence",
          question: "Zijn we afhankelijk van Wonka om het draaiende te houden?",
          answer:
            "Nee. We leiden iemand in uw team op om te beheren, te runnen en uit te breiden wat we bouwen. Onafhankelijkheid hoort bij de oplevering.",
        },
        {
          _key: "after-golive",
          question: "Wat gebeurt er na de go-live?",
          answer:
            "We blijven paraat tijdens een hypercareperiode om te stabiliseren, te verfijnen en uw team op te leiden, voordat we het volledige eigenaarschap overdragen.",
        },
      ],
    },
    seo: {
      metaTitle: "Wonka Build · AI-applicaties op maat voor uw bedrijf",
      metaDescription:
        "Wij bouwen AI-applicaties en AI-agents op maat die aansluiten op uw systemen en draaien in uw dagelijkse werking.",
      ogImage: null,
    },
  },

  /* ---------------------------- WonkaChat --------------------------- */
  wonkaChat: {
    hero: {
      eyebrow: "WonkaChat",
      title: "De AI-werkplek die uw hele team echt kan gebruiken.",
      subtitle:
        "WonkaChat koppelt met uw bedrijfstools, begrijpt uw workflows en helpt uw team het werk gedaan te krijgen via een eenvoudig gesprek.",
      secondaryText: null,
      theme: "light",
      backgroundImage: null,
      heroImage: null,
      secondaryLink: null,
      fallbackBackground: null,
      fallbackHero: WONKA_CHAT_HERO_IMAGE,
    },
    logoStrip: {
      logos: null,
      proofLines: [
        "Vertrouwd door Belgische teams van elke omvang",
        "Europese dataopslag",
      ],
      fallbackLogos: [
        { src: "/images/wonka-chat/logos/luminus.svg", alt: "Luminus", width: 120, height: 32 },
        { src: "/images/wonka-chat/logos/pwc.svg", alt: "PwC", width: 120, height: 32 },
        { src: "/images/france/logos/itzu.svg", alt: "Itzu", width: 120, height: 32 },
        { src: "/images/france/logos/engie.svg", alt: "Engie", width: 120, height: 32 },
        { src: "/images/france/logos/buildwise.svg", alt: "Buildwise", width: 120, height: 32 },
        { src: "/images/france/logos/xerius.png", alt: "Xerius", width: 120, height: 32 },
      ],
    },
    problem: {
      header: {
        eyebrow: "Het probleem vandaag",
        heading: "Uw AI werkt.\nAlleen niet voor iedereen.",
        body: "De meeste AI-tools creëren waarde voor wie er al mee overweg kan. Alle anderen blijven repetitief werk manueel doen — data kopiëren en plakken, aanvragen doorsturen, documenten controleren en systemen bijwerken.\n\nWonkaChat verandert dat. Het geeft uw hele team toegang tot AI op een manier die eenvoudig, praktisch en gemaakt is voor het dagelijkse werk.",
      },
      image: null,
      fallbackImage: {
        src: "/images/wonka-chat/wonka-problem-people.png",
        alt: "Teamleden en de repetitieve taken die WonkaChat wegneemt",
        width: 1650,
        height: 1920,
      },
    },
    overview: {
      eyebrow: "Wat is WonkaChat?",
      heading: "Eén AI-werkplek\nvoor uw hele bedrijf.",
      body: "WonkaChat brengt AI, agents, bedrijfskennis en koppelingen met uw tools samen in één veilige werkplek. Uw team kan vragen stellen, ondersteuning krijgen en het werk vooruit helpen — zonder AI-expert te moeten worden.",
    },
    features: WONKA_CHAT_FEATURES,
    security: WONKA_CHAT_SECURITY,
    testimonials: TESTIMONIALS_SECTION,
    contact: WONKA_CHAT_CONTACT,
    faq: {
      header: FAQ_HEADER,
      items: [
        {
          _key: "technical",
          question: "Is WonkaChat alleen voor technische teams?",
          answer:
            "Nee. WonkaChat is gebouwd voor elke medewerker. Iedereen kan AI gebruiken via een eenvoudige chat, gedeelde agents en begeleide workflows.",
        },
        {
          _key: "tools",
          question: "Kan WonkaChat koppelen met onze bestaande tools?",
          answer:
            "Ja. WonkaChat kan koppelen met bedrijfstools zoals CRM, ERP, e-mail, documenten, projecttools en interne databases.",
        },
        {
          _key: "model",
          question: "Moeten we één AI-model kiezen?",
          answer:
            "Nee. WonkaChat is flexibel ontworpen, zodat uw organisatie kan werken met het AI-model dat bij haar noden past.",
        },
        {
          _key: "access",
          question: "Kunnen we bepalen waartoe AI toegang heeft?",
          answer:
            "Ja. U beheert toegang, rechten en welke agents beschikbaar zijn voor welke gebruikers of teams.",
        },
        {
          _key: "approval",
          question: "Kunnen acties menselijke goedkeuring vereisen?",
          answer:
            "Ja. WonkaChat ondersteunt human-in-the-loop-workflows, zodat belangrijke acties nagekeken kunnen worden voordat ze uitgevoerd worden.",
        },
        {
          _key: "replacement",
          question: "Vervangt WonkaChat ChatGPT of Copilot?",
          answer:
            "WonkaChat is anders. Het is gebouwd als AI-werkplek voor uw bedrijf, gekoppeld aan uw tools, agents, workflows en governance.",
        },
      ],
    },
    seo: {
      metaTitle: "WonkaChat | AI-werkplek voor uw hele organisatie",
      metaDescription:
        "WonkaChat koppelt al uw tools, begrijpt wat u nodig hebt en voert taken uit met AI-agents. Veilige, beheerste AI voor bedrijven, geen zoveelste chatbot.",
      ogImage: null,
    },
  },

  /* ------------------------- WonkaChat · Odoo ----------------------- */
  wonkaChatOdoo: {
    hero: {
      eyebrow: "WonkaChat · Odoo",
      title: "AI-agents die handelen in Odoo, voor IT- en ops-teams die al met Odoo werken",
      subtitle:
        "WonkaChat koppelt met Odoo zodat uw team CRM-, verkoop-, voorraad- en boekhouddata kan opvragen — en de volgende actie kan voorbereiden zonder door modules te zoeken.",
      secondaryText: null,
      theme: "light",
      backgroundImage: null,
      heroImage: null,
      secondaryLink: null,
      fallbackBackground: null,
      fallbackHero: WONKA_CHAT_HERO_IMAGE,
    },
    logoStrip: PROOF_LOGO_STRIP,
    problem: {
      header: {
        eyebrow: "Het probleem",
        heading: "Hebt u ook het gevoel dat Odoo eenvoudiger zou moeten zijn?",
        body: "ERP's zoals Odoo zijn ontworpen om de werking te vereenvoudigen... maar het \"eenvoudige\" deel gaat vaak ergens verloren tussen implementatie en adoptie.",
      },
      largeCards: [
        bentoCard(
          "navigation",
          "Navigatie is complex",
          "Uw magazijnverantwoordelijke kent haar job door en door. Maar voorraadniveaus controleren betekent navigeren naar Voorraad -> Producten -> Voorraad -> Filteren op locatie. Ze weet wat ze nodig heeft. De interface maakt het gewoon moeilijk.",
        ),
        bentoCard(
          "experts",
          "Knelpunt bij experts",
          "Slechts 2-3 mensen begrijpen Odoo echt. Iedereen onderbreekt hen. Een eenvoudige vraag kost 30 minuten en houdt uw IT-manager weg van waardevollere taken.",
        ),
      ],
      smallCards: [
        bentoCard(
          "consultants",
          "Afhankelijk van consultants",
          "€ 100-200 per uur telkens u een aangepaste workflow nodig hebt. De kosten stijgen sneller dan de waarde die u krijgt. En niet omdat u complex maatwerk nodig hebt, maar gewoon om rapporten te krijgen die eenvoudig zouden moeten zijn.",
        ),
        bentoCard(
          "ai-tools",
          "Te veel AI-tools",
          "Generieke AI-tools zorgen voor meer verwarring dan waarde. Gevoelige informatie verspreid op plaatsen waar uw IT-directeur geen controle over heeft. En de ingebouwde AI van Odoo is te eenvoudig voor uw workflows.",
        ),
        bentoCard(
          "adoption",
          "Lage adoptiegraad",
          "Iedereen houdt zich aan de basis die ze in de opleiding leerden. De rest blijft ongebruikt, niet omdat het niet nuttig is, maar omdat het vinden ervan werk is.",
        ),
      ],
    },
    features: WONKA_CHAT_FEATURES,
    workflowSteps: {
      header: {
        eyebrow: "Hoe het werkt",
        heading: "Van vraag tot gedaan.\nNiet voorgesteld.",
        body: null,
      },
      steps: [
        workflowStep(
          "step-1",
          "Zeg het.",
          "Schrijf wat er moet gebeuren. Zoals u het aan een collega zou vragen. “Maak een opportuniteit aan in Odoo. Voeg deze samenvatting toe. Maak een verkooporder aan.”",
          "step1",
          0,
        ),
        workflowStep(
          "step-2",
          "WonkaChat handelt.",
          "WonkaChat haalt de data op, ziet wat er moet gebeuren en doet het. CRM bijgewerkt. Notities toegevoegd. Orders geregistreerd.",
          "step2",
          1,
        ),
        workflowStep(
          "step-3",
          "Zo wordt het werk voortaan gedaan.",
          "Eén keer doen. Het loopt elke keer. Werk wacht niet langer tot iemand het vooruit duwt.",
          "step3",
          2,
        ),
      ],
    },
    capabilities: {
      header: {
        eyebrow: null,
        heading: "Maak van Odoo de ruggengraat van uw bedrijf",
        body: "Enkele voorbeelden van hoe WonkaChat uw Odoo-omgeving een boost geeft:",
      },
      items: [
        capabilityItem(
          "reconcile-bank",
          "bank",
          "Bankrekeningen afpunten",
          "Automatische opvolging, slimme herinneringen en escalatie, voor 100% correcte timesheets zonder manuele opvolging of tussenkomst van een manager.",
        ),
        capabilityItem(
          "sales-quotes",
          "quote",
          "Offertes genereren",
          "Legt automatisch leads vast, laat opportuniteiten vorderen, wijst taken toe en signaleert deals die aandacht vragen, zodat manueel CRM-werk volledig verdwijnt.",
        ),
        capabilityItem(
          "ask-odoo",
          "chat",
          "Vraag Odoo alles",
          "Beantwoordt meteen vragen, legt functies uit en leidt u automatisch naar de juiste workflow, zodat Odoo intuïtief wordt voor iedereen.",
        ),
        capabilityItem(
          "customer-tickets",
          "ticket",
          "Klanttickets oplossen",
          "Haalt supporttickets uit JIRA en Odoo automatisch op, analyseert en prioriteert ze, en signaleert meteen ontbrekende informatie en patronen.",
        ),
        capabilityItem(
          "instant-quotes",
          "document",
          "Direct offertes maken",
          "Binnenkomende offerteaanvragen worden meteen volledige, geprijsde offertes, met de juiste producten, kortingen en voorwaarden automatisch toegepast.",
        ),
        capabilityItem(
          "seo-content",
          "search",
          "SEO-content schrijven",
          "Genereert automatisch zoekvriendelijke beschrijvingen, metatags en conversiegerichte teksten volgens de best practices van Google, voor elk product.",
        ),
        capabilityItem(
          "new-leads",
          "userPlus",
          "Nieuwe leads aanmaken",
          "Onderzoekt automatisch bedrijven, verrijkt contacten en maakt volledige CRM-records aan, zonder manuele data-invoer of opzoekwerk.",
        ),
        capabilityItem(
          "stock-levels",
          "boxes",
          "Voorraadniveaus bewaken",
          "Geautomatiseerde opvolging, aanpassingen en meldingen met ingebouwde veiligheidscontroles die dure fouten voorkomen voor ze gebeuren.",
        ),
        capabilityItem(
          "crm-data",
          "database",
          "CRM-data bijwerken",
          "Zet gesprekken om in gestructureerde CRM-documentatie, haalt beslissingen en actiepunten eruit en laat opportuniteiten automatisch vorderen wanneer dat past.",
        ),
        capabilityItem(
          "gitlab-tasks",
          "gitBranch",
          "GitLab-taken synchroniseren",
          "Code-commits worden meteen projectupdates en koppelen ontwikkelwerk aan taken, zonder manuele opvolging of statusrapportering.",
        ),
        capabilityItem(
          "financial-reconciliation",
          "scale",
          "Financiële afstemming automatiseren",
          "Vindt automatisch overeenkomende transacties, signaleert uitzonderingen en organiseert het dagelijkse afstemmingswerk; boekhouders keuren de matches gewoon goed.",
        ),
      ],
    },
    contact: WONKA_CHAT_CONTACT,
    seo: {
      metaTitle: "WonkaChat voor Odoo | AI-agents die handelen in uw ERP",
      metaDescription:
        "Koppel WonkaChat aan Odoo en vraag CRM-, voorraad-, boekhoud- en verkoopdata op in gewone taal. Private AI voor Odoo SaaS en self-hosted.",
      ogImage: null,
    },
  },

  /* ----------------------------- Contact ---------------------------- */
  contact: {
    general: {
      header: {
        eyebrow: "Contact",
        heading: "Neem contact op",
        body: "Vragen over AI voor uw organisatie? Neem rechtstreeks contact met ons op — we antwoorden u zo snel mogelijk.",
      },
      details: [
        { _key: "email", label: "E-mail", value: "hello@wonka.ai", href: "mailto:hello@wonka.ai" },
        {
          _key: "office",
          label: "Kantoor",
          value: "(re)space Airport\nDe Kleetlaan 2, 1831 Machelen, België",
          href:
            "https://www.google.com/maps/search/?api=1&query=(re)space+Airport,+De+Kleetlaan+2,+1831+Machelen",
        },
      ],
    },
    team: {
      header: {
        eyebrow: "Team",
        heading: "Spreek rechtstreeks met iemand",
        body: null,
      },
      people: [
        {
          _key: "jordy",
          portrait: null,
          name: "Jordy Callens",
          role: "Partner",
          email: "jordy@wonka.ai",
          fallbackPortrait: { src: "/images/wonka-build/jordy.jpg", alt: "Jordy Callens" },
        },
      ],
    },
    seo: {
      metaTitle: "Contact | Wonka",
      metaDescription:
        "Neem contact op met Wonka. E-mail en rechtstreekse contactpersonen voor al uw vragen over AI voor bedrijven.",
      ogImage: null,
    },
  },

  /* ---------------------------- Use cases --------------------------- */
  useCases: {
    eyebrow: "Use cases",
    heading: "Het werk dat vroeger bleef liggen, wacht nu niet meer. In alle teams.",
    industries: [
      {
        _key: "sales",
        label: "Sales",
        workflows: [
          {
            _key: "sales-w0",
            title: "Opvolging van leads",
            description: "Er komt een lead binnen. Die wordt geregistreerd en beantwoord voor hij afkoelt.",
            bullets: [
              "Opgevangen via formulier of e-mail",
              "Opportuniteit aangemaakt in het CRM",
              "Opvolging verstuurd met de juiste info of vergaderlink",
            ],
          },
          {
            _key: "sales-w1",
            title: "Verwerking van verkooporders",
            description: "Er komt een order binnen. Die wordt ingevoerd en bevestigd zonder overtypen.",
            bullets: [
              "Gegevens uit e-mail of bijlage gehaald",
              "Order aangemaakt in het ERP, planning bijgewerkt",
              "Team verwittigd, bevestiging verstuurd",
            ],
          },
          {
            _key: "sales-w2",
            title: "Sales intelligence-dashboard",
            description:
              "Een applicatie op maat die het salesteam live inzicht geeft in pipeline, accountactiviteit en de beste volgende acties, zonder tussen vijf tools te wisselen.",
            bullets: [
              "Gebouwd rond uw CRM en databronnen",
              "Toont prioritaire accounts en signalen",
              "Toegankelijk voor het hele team, niet alleen voor analisten",
            ],
          },
        ],
      },
      {
        _key: "ops",
        label: "Operations",
        workflows: [
          {
            _key: "ops-w0",
            title: "Orderintake",
            description: "Binnenkomende orders worden verwerkt en doorgestuurd zonder manuele invoer.",
            bullets: [
              "Uit e-mail of pdf gehaald",
              "Gecontroleerd aan de hand van regels",
              "Automatisch in het ERP gezet",
            ],
          },
          {
            _key: "ops-w1",
            title: "Planningsupdates",
            description: "Wijzigingen worden meteen in alle systemen doorgevoerd.",
            bullets: [
              "Status gesynchroniseerd over tools heen",
              "Stakeholders verwittigd",
              "Uitzonderingen gemarkeerd voor nazicht",
            ],
          },
          {
            _key: "ops-w2",
            title: "Operationeel dashboard",
            description:
              "Eén live overzicht van doorlooptijd, blokkades en volgende acties over alle teams heen.",
            bullets: [
              "Gebouwd op uw operationele data",
              "Toont knelpunten in realtime",
              "Gedeeld met operations en directie",
            ],
          },
        ],
      },
      {
        _key: "hr",
        label: "HR",
        workflows: [
          {
            _key: "hr-w0",
            title: "Antwoorden over beleid",
            description:
              "Medewerkers krijgen in enkele seconden correcte antwoorden, rechtstreeks uit uw personeelshandboek.",
            bullets: [
              "Getraind op interne HR-documenten",
              "Antwoorden vermelden de bron",
              "Complexe gevallen gaan naar HR",
            ],
          },
          {
            _key: "hr-w1",
            title: "Onboardingassistent",
            description:
              "Nieuwe medewerkers worden door hun eerste weken geloodst zonder manuele begeleiding.",
            bullets: [
              "Gepersonaliseerde checklist per functie",
              "Herinneringen voor documenten en opleidingen",
              "HR op de hoogte van de voortgang",
            ],
          },
          {
            _key: "hr-w2",
            title: "People-dashboard",
            description:
              "Een overzicht op maat dat HR live inzicht geeft in personeelsbestand, aanvragen en belangrijke mijlpalen.",
            bullets: [
              "Gebouwd rond uw HRIS-data",
              "Toont komende evaluaties en contracten",
              "Toegankelijk voor managers en HR",
            ],
          },
        ],
      },
      {
        _key: "support",
        label: "Support",
        workflows: [
          {
            _key: "support-w0",
            title: "Tickettriage",
            description: "Elke binnenkomende vraag wordt in enkele seconden geclassificeerd en doorgestuurd.",
            bullets: [
              "Opgevangen via e-mail, chat of formulier",
              "Gecategoriseerd en geprioriteerd",
              "Toegewezen aan het juiste team",
            ],
          },
          {
            _key: "support-w1",
            title: "Antwoorden opstellen",
            description: "Medewerkers starten van een concept, niet van een leeg blad.",
            bullets: [
              "Haalt antwoorden uit uw kennisbank",
              "Volgt uw tone of voice en beleid",
              "Nagekeken voor verzending",
            ],
          },
          {
            _key: "support-w2",
            title: "Support-insightsdashboard",
            description:
              "Een live overzicht van volume, tevredenheid en terugkerende problemen over alle kanalen.",
            bullets: [
              "Gebouwd op uw ticketdata",
              "Toont de belangrijkste thema's en trends",
              "Gedeeld met support en product",
            ],
          },
        ],
      },
      {
        _key: "finance",
        label: "Finance",
        workflows: [
          {
            _key: "finance-w0",
            title: "Factuurverwerking",
            description: "Binnenkomende facturen worden opgevangen, gecontroleerd en klaargezet voor goedkeuring.",
            bullets: [
              "Uit e-mail of pdf gehaald",
              "Afgetoetst aan bestellingen",
              "Automatisch doorgestuurd voor goedkeuring",
            ],
          },
          {
            _key: "finance-w1",
            title: "Onkostennota's",
            description: "Nota's worden samengesteld en gecontroleerd zonder achter bonnetjes aan te lopen.",
            bullets: [
              "Bonnetjes verwerkt en gecategoriseerd",
              "Beleidscontroles toegepast",
              "Afwijkingen gemarkeerd voor nazicht",
            ],
          },
          {
            _key: "finance-w2",
            title: "Financieel dashboard",
            description:
              "Een overzicht op maat dat finance live inzicht geeft in cash, openstaande vorderingen en belangrijke KPI's.",
            bullets: [
              "Gebouwd rond uw boekhouddata",
              "Toont achterstallige posten en risico's",
              "Toegankelijk voor finance en directie",
            ],
          },
        ],
      },
    ],
  },

  security: SECURITY,
  wonkaChatSecurity: WONKA_CHAT_SECURITY,
  testimonialsHeader: TESTIMONIALS_HEADER,

  aiChatCapabilities: getAiChatCapabilityClusters("nl"),
};
