import { DEFAULT_TESTIMONIALS_HEADER } from "@/lib/testimonials-defaults";
import type { SeoData } from "@/lib/types";
import type {
  CardGridData,
  ContactSectionResolved,
  DeliverablesPanelData,
  FaqSectionData,
  IndustriesSectionData,
  LogoStripResolved,
  NumberedCardsData,
  ProductHeroResolved,
  PromoPanelResolved,
  SectionHeaderData,
} from "@/lib/types/page-sections";

export interface StartAiDefaults {
  hero: ProductHeroResolved;
  logoStrip: LogoStripResolved;
  phases: NumberedCardsData;
  deliverables: DeliverablesPanelData;
  industries: IndustriesSectionData;
  whyNow: CardGridData;
  promo: PromoPanelResolved;
  testimonials: SectionHeaderData;
  contact: ContactSectionResolved;
  faq: FaqSectionData;
  seo: SeoData;
}

export const START_AI_DEFAULTS: StartAiDefaults = {
  hero: {
    eyebrow: "Start AI",
    title: "Make your company AI\u2011powered, fast.",
    subtitle:
      "We evaluate your operations, design your AI strategy and hand you the execution plan, so your whole team can start working at full potential.",
    secondaryText: null,
    theme: "dark",
    backgroundImage: null,
    heroImage: null,
    secondaryLink: null,
    fallbackBackground: {
      src: "/images/start-ai/wonka-waterfall.png",
      alt: "",
    },
    fallbackHero: null,
  },
  logoStrip: {
    logos: null,
    proofLines: [
      "#1 Start AI partner in Belgium",
      "+150 Start AI's completed",
    ],
    fallbackLogos: [
      {
        src: "/images/hero/proof-1.svg",
        alt: "PwC, Engie, Buildwise, Xerius",
        width: 287,
        height: 24,
      },
      {
        src: "/images/hero/proof-2.svg",
        alt: "Luminus, Cambio, Zorgi, ODTH",
        width: 289,
        height: 24,
      },
    ],
  },
  phases: {
    header: {
      eyebrow: "The framework",
      heading: "A proven framework\nfor AI adoption.",
      body: "Start AI is built around a simple belief: successful AI adoption does not start with tools. It starts with clarity, alignment and the right priorities.",
    },
    items: [
      {
        _key: "prepare",
        number: "01",
        title: "Prepare",
        subtitle: "Create alignment before action",
        body: "We define the strategic context, clarify expectations and make sure the right people are involved from the start. This ensures the program is not a generic AI exploration, but a focused trajectory built around your organisation's reality.",
      },
      {
        _key: "understand",
        number: "02",
        title: "Understand & Inspire",
        subtitle: "Build a shared understanding of AI",
        body: "We bring leadership, teams and key stakeholders onto the same page. Through inspiration, examples and future vision mapping, we define what AI could mean for your organisation and where it should create value.",
      },
      {
        _key: "analyse",
        number: "03",
        title: "Analyse & Validate",
        subtitle: "Separate real opportunities from noise",
        body: "We analyse your workflows, processes and bottlenecks to identify the AI opportunities that are both valuable and realistic. Every opportunity is assessed through the lens of impact, feasibility, readiness and strategic relevance.",
      },
      {
        _key: "activate",
        number: "04",
        title: "Activate & Deliver",
        subtitle: "Turn strategy into a practical roadmap",
        body: "We translate the validated opportunities into a concrete roadmap, supported by governance foundations and practical recommendations. The result is a clear path forward: what to do, why it matters and how to start.",
      },
    ],
  },
  deliverables: {
    heading: "What you walk away with.",
    items: [
      {
        _key: "readiness",
        title: "AI readiness assessment",
        body: "A clear picture of where your organization stands today.",
      },
      {
        _key: "cases",
        title: "Priority AI business cases",
        body: "The opportunities with the highest return, ready to be realized.",
      },
      {
        _key: "roadmap",
        title: "Concrete AI roadmap",
        body: "What to implement, in what order, and why.",
      },
      {
        _key: "policy",
        title: "AI policy & governance framework",
        body: "Guidelines so everything that follows sits in the right frame.",
      },
      {
        _key: "quickwin",
        title: "Quick win identification",
        body: "Immediately actionable opportunities your team can start on from day one.",
      },
      {
        _key: "agents",
        title: "AI agent concepts",
        body: "Where tailor-made AI assistants will deliver the most value for you.",
      },
    ],
  },
  industries: {
    header: {
      eyebrow: "Our industries",
      heading: "Where Start AI\ncreates value.",
      body: "Start AI is shaped by experience across industries. We do not start from generic AI trends, but from the operational reality of your organisation: where time is lost, where quality is under pressure and where teams need better tools to scale.",
    },
    industries: [
      {
        _key: "logistics",
        label: "Logistics & Transport",
        body: "Transport and logistics teams often operate under high pressure, where growth quickly exposes bottlenecks in planning, processing and communication.",
        bullets: [
          "Identify operational bottlenecks slowing down growth",
          "Explore AI support for planning, processing and internal communication",
          "Reduce manual follow-up and repetitive coordination work",
          "Improve scalability without adding unnecessary complexity",
        ],
        clients: ["ODTH", "Katoen Natie"],
      },
      {
        _key: "healthcare",
        label: "Healthcare",
        body: "Healthcare organisations deal with sensitive information, high administrative pressure and teams that need fast access to reliable knowledge.",
        bullets: [
          "Identify administrative workflows where AI can reduce workload",
          "Explore safe AI support for documentation and knowledge access",
          "Define responsible AI guidelines for sensitive environments",
          "Improve efficiency while keeping data security and control central",
        ],
        clients: ["Zorgi", "Cambio"],
      },
      {
        _key: "finance",
        label: "Finance",
        body: "Finance teams work in document-heavy, reporting-driven and compliance-sensitive environments where accuracy and control are essential.",
        bullets: [
          "Map reporting, review and compliance-heavy workflows",
          "Explore AI support for document analysis and internal knowledge use",
          "Identify opportunities to speed up repetitive expert work",
          "Define governance for secure and responsible AI adoption",
        ],
        clients: ["PwC", "Xerius"],
      },
      {
        _key: "legal",
        label: "Legal",
        body: "Legal teams lose valuable time on repetitive research, drafting, review and document-heavy workflows, while human judgement must remain central.",
        bullets: [
          "Identify repetitive research and document tasks",
          "Explore AI support for summarisation, drafting and review",
          "Define clear boundaries for responsible AI use",
          "Free up experts for more strategic and high-value work",
        ],
        clients: ["Eubelius", "Monard Law"],
      },
      {
        _key: "manufacturing",
        label: "Manufacturing",
        body: "Manufacturing environments often rely on process knowledge, manual checks, reporting flows and operational decision-making across teams.",
        bullets: [
          "Identify quality, reporting and process bottlenecks",
          "Explore AI support for documentation and operational knowledge sharing",
          "Reduce manual checks and repetitive reporting tasks",
          "Prioritise AI opportunities based on impact and feasibility",
        ],
        clients: ["Buildwise", "Engie"],
      },
      {
        _key: "public",
        label: "Public Sector",
        body: "Public organisations can use AI to improve internal efficiency and service delivery, while maintaining transparency, governance and public trust.",
        bullets: [
          "Identify administrative and citizen-service bottlenecks",
          "Explore AI support for internal knowledge access and document flows",
          "Define responsible use guidelines and governance principles",
          "Prioritise low-risk, high-value AI opportunities with public impact",
        ],
        clients: ["Stad Gent", "VLAIO"],
      },
      {
        _key: "all",
        label: "All Industries",
        body: "AI opportunities are not limited to one sector. Wherever teams deal with repetitive work, scattered knowledge, slow processes or complex information, Start AI can help uncover value.",
        bullets: [
          "Discover where AI can create measurable impact",
          "Validate opportunities before investing in implementation",
          "Choose the right platform and governance approach",
          "Build a roadmap tailored to your organisation",
        ],
        clients: ["Luminus", "Wonka"],
      },
    ],
  },
  whyNow: {
    header: {
      eyebrow: "Why now",
      heading: "Leave no team behind.",
      body: "AI should not only work for the people who know which prompt to write or which tool to open. It should help the whole organisation work smarter, faster and with more focus.",
    },
    cards: [
      {
        _key: "pioneers",
        title: "AI should not stay with the pioneers",
        body: "In many organisations, AI value stays with a small group of early adopters. They find better ways to work, but those ways rarely spread across teams.\n\nStart AI creates the structure to turn individual experiments into organisational progress.",
      },
      {
        _key: "repetitive",
        title: "People are too good for repetitive work",
        body: "Your team should not spend its best hours copying information, searching documents, rewriting the same answers or moving work between systems.\n\nStart AI identifies the work your people should stop doing — and where AI can support them first.",
      },
      {
        _key: "governance",
        title: "Responsible AI needs shared rules",
        body: "If everyone uses AI differently, the organisation loses control. If nobody uses AI, the organisation loses momentum.\n\nStart AI helps you create the balance: clear governance, practical guidelines and a roadmap that makes AI usable for everyone.",
      },
    ],
  },
  promo: {
    eyebrow: "VLAIO KMO-portefeuille",
    heading: "Get 70% off as a Flemish SME.",
    body: "Wonka is a registered KMO-portefeuille service provider. Most Flemish SMEs claim back up to 70% of the program cost. We'll help you with the paperwork.",
    variant: "darkImage",
    backgroundImage: null,
    showCta: true,
    ctaHref: "/services/start-ai-subsidized-flanders",
    ctaLabel: "Learn about the subsidy",
    fallbackBackground: {
      src: "/images/how-to-start/how-to-start-bg.avif",
      alt: "",
    },
  },
  testimonials: {
    eyebrow: DEFAULT_TESTIMONIALS_HEADER.eyebrow ?? null,
    heading: DEFAULT_TESTIMONIALS_HEADER.heading ?? null,
    body: DEFAULT_TESTIMONIALS_HEADER.body ?? null,
  },
  contact: {
    header: {
      eyebrow: "Talk to us",
      heading: "Ready for AI action?",
      body: "Jump on a 30-minute discovery call. No slides, no pitch, just a real conversation about your business.",
    },
    portrait: null,
    personName: "Jordy Callens",
    personRole: "Partner, Wonka",
    fallbackPortrait: {
      src: "/images/start-ai/jordy.jpg",
      alt: "Jordy Callens",
    },
  },
  faq: {
    header: {
      eyebrow: "FAQ",
      heading: "Frequently asked questions",
      body: null,
    },
    items: [
      {
        _key: "who",
        question: "Who is Start AI for?",
        answer:
          "Belgian SMEs and scale-ups that want to move from AI experiments to a clear, company-wide strategy in weeks.",
      },
      {
        _key: "cost",
        question: "How much does it cost?",
        answer:
          "Programs start at €15,000. Flemish SMEs can claim up to 70% back through the VLAIO KMO-portefeuille.",
      },
      {
        _key: "time",
        question: "How much time is required from us?",
        answer:
          "Roughly half a day per week for 2 to 3 key people. We do the heavy lifting between sessions.",
      },
      {
        _key: "deliverables",
        question: "What do we get at the end?",
        answer:
          "A prioritized AI roadmap, a 90-day execution plan, and a leadership presentation ready to share.",
      },
      {
        _key: "start",
        question: "How soon can we start?",
        answer: "Most teams kick off within 2 weeks of the first call.",
      },
    ],
  },
  seo: {
    metaTitle: "Start AI | AI strategy and roadmap for your company",
    metaDescription:
      "A 6-week program to make your SME AI-native. Identify the right opportunities, build your strategy, ship results, fast.",
    ogImage: null,
  },
};
