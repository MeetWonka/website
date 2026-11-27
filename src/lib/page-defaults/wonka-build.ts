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

export interface WonkaBuildDefaults {
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

export const WONKA_BUILD_DEFAULTS: WonkaBuildDefaults = {
  hero: {
    eyebrow: "Wonka Build",
    title: "Custom AI. Built and shipped by our team.",
    subtitle:
      "When the AI you need doesn't exist off the shelf, we build it, engineered around your business and shipped into production.",
    secondaryText: null,
    theme: "dark",
    backgroundImage: null,
    heroImage: null,
    secondaryLink: null,
    fallbackBackground: {
      src: "/images/wonka-build/hero-bg.png",
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
      eyebrow: "How it works",
      heading: "From your process\nto production.",
      body: "A build engagement runs as four connected phases. Scoped as engineering, not a workshop. Delivered into your operations, not a slide deck.",
    },
    items: [
      {
        _key: "map",
        number: "01",
        title: "Map",
        subtitle: "Start from your operations, not a template",
        body: "We embed into your operations and map how the work runs today, then scope exactly what to build and why it earns its place.",
      },
      {
        _key: "connect",
        number: "02",
        title: "Connect",
        subtitle: "Sit on top of the systems you already run",
        body: "We plug into the systems you already run: email, ERP, CRM, documents, databases. The foundation the build sits on.",
      },
      {
        _key: "build-ship",
        number: "03",
        title: "Build & ship",
        subtitle: "Production, not a pilot in a sandbox",
        body: "We engineer your agents and applications and put them into production. Real workflows, real edge cases, handled end to end. Not a pilot in a sandbox.",
      },
      {
        _key: "tune-handover",
        number: "04",
        title: "Tune & hand over",
        subtitle: "Independence is part of the deliverable",
        body: "We stay after go-live to stabilise, adjust and train, and level up someone on your team to own it, so you're never dependent on us to keep it running.",
      },
    ],
  },
  deliverables: {
    heading: "A system that runs.",
    items: [
      {
        _key: "applications",
        title: "Custom AI applications",
        body: "Built around your data and your team, not a generic template.",
      },
      {
        _key: "agents",
        title: "Production-ready AI agents",
        body: "Live in your operations, handling real work end to end.",
      },
      {
        _key: "integrations",
        title: "Deep integrations",
        body: "Connected to the tools, data and infrastructure you already run.",
      },
      {
        _key: "owner",
        title: "An owner on your team",
        body: "We upskill someone internal until they can run and extend it.",
      },
      {
        _key: "governance",
        title: "Governance built in",
        body: "Guardrails, access control and an AI policy that fit your organisation.",
      },
      {
        _key: "hypercare",
        title: "Hypercare after launch",
        body: "We stay mobilised after go-live to stabilise and fine-tune.",
      },
    ],
  },
  industries: {
    header: {
      eyebrow: "What we build",
      heading: "From your hardest process\nto production.",
      body: "Every WonkaBuild engagement is scoped to your business. Below are the kinds of systems we typically ship, agents, applications, and the infrastructure that lets them handle real work.",
    },
    industries: [
      {
        _key: "applications",
        label: "Custom internal applications",
        body: "Dashboards, portals and tools built around your data, giving your team live visibility and control in one place.",
        bullets: ["Apps", "AI Chats"],
        clients: [],
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
    ctaHref: null,
    ctaLabel: null,
    fallbackBackground: {
      src: "/images/wonka-build/promo-bg.avif",
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
      src: "/images/wonka-build/jordy.jpg",
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
        _key: "wonka-chat-vs-build",
        question: "What's the difference between Wonka Build and WonkaChat?",
        answer:
          "WonkaChat is our platform, one secure AI workspace your whole team uses day to day. Wonka Build is our custom engineering engagement: we design and build agents, applications and systems specific to your business and ship them into production. Many clients run both.",
      },
      {
        _key: "agents-or-apps",
        question: "What can you build, agents, applications, or both?",
        answer:
          "Both. From focused AI agents that handle a workflow end to end, to full custom applications, with the integrations and infrastructure underneath.",
      },
      {
        _key: "strategy-first",
        question: "Do we need a finished AI strategy first?",
        answer:
          "No. If you know the process that's costing you, that's enough to start. If you don't, Start AI gives you the clarity first, and its business cases become the blueprint for your build.",
      },
      {
        _key: "on-premise",
        question: "Can it run on our own servers?",
        answer:
          "Yes. WonkaBuild can run entirely on-premise, inside your network, with nothing leaving your walls, or in a secure European environment.",
      },
      {
        _key: "independence",
        question: "Will we depend on Wonka to keep it running?",
        answer:
          "No. We upskill someone on your team to own, run and extend what we build. Independence is part of the deliverable.",
      },
      {
        _key: "after-golive",
        question: "What happens after go-live?",
        answer:
          "We stay mobilised through a hypercare period to stabilise, fine-tune and train your team, before handing over full ownership.",
      },
    ],
  },
  seo: {
    metaTitle: "Wonka Build · Custom AI applications for your business | Wonka",
    metaDescription:
      "We build custom AI applications that fit your systems and run in your day-to-day work.",
    ogImage: null,
  },
};
