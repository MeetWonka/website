import { DEFAULT_TESTIMONIALS_HEADER } from "@/lib/testimonials-defaults";
import { DEFAULT_WONKA_CHAT_SECURITY } from "@/lib/cms-sections";
import type { SecurityData, SeoData } from "@/lib/types";
import type {
  ContactSectionResolved,
  FaqSectionData,
  LogoStripResolved,
  ProductHeroResolved,
  SectionHeaderData,
  SplitContentResolved,
  StickyFeaturesResolved,
} from "@/lib/types/page-sections";

export interface WonkaChatDefaults {
  hero: ProductHeroResolved;
  logoStrip: LogoStripResolved;
  problem: SplitContentResolved;
  overview: SectionHeaderData;
  features: StickyFeaturesResolved;
  security: SecurityData;
  testimonials: SectionHeaderData;
  contact: ContactSectionResolved;
  faq: FaqSectionData;
  seo: SeoData;
}

export const WONKA_CHAT_DEFAULTS: WonkaChatDefaults = {
  hero: {
    eyebrow: "WonkaChat",
    title: "The AI workspace your whole team can actually use.",
    subtitle:
      "WonkaChat connects to your company tools, understands your workflows and helps your team get work done through simple conversation.",
    secondaryText: null,
    theme: "light",
    backgroundImage: null,
    heroImage: null,
    secondaryLink: null,
    fallbackBackground: null,
    fallbackHero: {
      src: "/images/wonka-chat/wonka-hero-flow-v2.png",
      alt: "WonkaChat turning incoming documents and emails into reviewed actions across your tools",
      width: 1920,
      height: 694,
    },
  },
  logoStrip: {
    logos: null,
    proofLines: [
      "Trusted by Belgian teams of every size",
      "European data storage",
    ],
    fallbackLogos: [
      {
        src: "/images/wonka-chat/logos/luminus.svg",
        alt: "Luminus",
        width: 120,
        height: 32,
      },
      {
        src: "/images/wonka-chat/logos/pwc.svg",
        alt: "PwC",
        width: 120,
        height: 32,
      },
      {
        src: "/images/france/logos/itzu.svg",
        alt: "Itzu",
        width: 120,
        height: 32,
      },
      {
        src: "/images/france/logos/engie.svg",
        alt: "Engie",
        width: 120,
        height: 32,
      },
      {
        src: "/images/france/logos/buildwise.svg",
        alt: "Buildwise",
        width: 120,
        height: 32,
      },
      {
        src: "/images/france/logos/xerius.png",
        alt: "Xerius",
        width: 120,
        height: 32,
      },
    ],
  },
  problem: {
    header: {
      eyebrow: "The problem today",
      heading: "Your AI works.\nJust not for everyone.",
      body:
        "Most AI tools create value for the people who already know how to use them. Everyone else keeps doing repetitive work manually — copy-pasting data, forwarding requests, checking documents and updating systems.\n\nWonkaChat changes that. It gives your whole team access to AI in a way that is simple, practical and built for daily work.",
    },
    image: null,
    fallbackImage: {
      src: "/images/wonka-chat/wonka-problem-people.png",
      alt: "Team members and the repetitive jobs WonkaChat removes",
      width: 1650,
      height: 1920,
    },
  },
  overview: {
    eyebrow: "What is WonkaChat?",
    heading: "One AI workspace\nfor your entire company.",
    body: "WonkaChat brings AI, agents, company knowledge and tool connections together in one secure workspace. Your team can ask questions, get support and move work forward — without needing to become AI experts.",
  },
  features: {
    header: {
      eyebrow: "Product features",
      heading: "Everything your team needs\nto work with AI.",
      body: "WonkaChat is built to make AI useful across the organisation: simple enough for every employee, powerful enough for real workflows, and flexible enough to connect with the tools you already use.",
    },
    showCta: true,
    features: [
      {
        _key: "chat",
        title: "Chat for your company",
        description:
          "Give your employees one simple place to ask questions, find information and get support from AI. WonkaChat works like a familiar chat experience, but with your company context and workflows built in.",
        image: null,
        link: null,
        fallbackImage: {
          src: "/images/wonka-chat/create-ai-agents-for-specific-tasks.png",
          alt: "Create AI agents for specific tasks in WonkaChat",
          width: 1200,
          height: 800,
        },
      },
      {
        _key: "models",
        title: "Choose your own AI model",
        description:
          "WonkaChat gives your company flexibility. Use the AI model that fits your needs, preferences and security requirements.",
        image: null,
        link: null,
        fallbackImage: {
          src: "/images/wonka-chat/feature-models.png",
          alt: "Choose between leading AI models",
          width: 1200,
          height: 800,
        },
      },
      {
        _key: "tools",
        title: "Connected to your tools",
        description:
          "WonkaChat connects to the systems your team already uses, so employees can access information and trigger actions without switching between tools.",
        image: null,
        link: {
          label: "Discover all integrations",
          href: "/integrations",
        },
        fallbackImage: {
          src: "/images/wonka-chat/feature-tools.png",
          alt: "Connected to the tools your team uses",
          width: 1200,
          height: 800,
        },
      },
      {
        _key: "agents",
        title: "Create AI agents for specific tasks",
        description:
          "Build agents that understand a role, task or workflow. From sales follow-up to finance checks or support summaries, agents help employees get specific work done faster.",
        image: null,
        link: null,
        fallbackImage: {
          src: "/images/wonka-chat/wonka-vis-10.png",
          alt: "Create AI agents for specific tasks",
          width: 1200,
          height: 800,
        },
      },
      {
        _key: "employee",
        title: "Built for every employee",
        description:
          "WonkaChat is designed so the whole organisation can work with AI, not just technical teams or early adopters. Employees use simple language, shared agents and guided workflows.",
        image: null,
        link: null,
        fallbackImage: {
          src: "/images/wonka-chat/feature-employee.png",
          alt: "Built for every employee",
          width: 1200,
          height: 800,
        },
      },
    ],
  },
  security: DEFAULT_WONKA_CHAT_SECURITY,
  testimonials: {
    eyebrow: DEFAULT_TESTIMONIALS_HEADER.eyebrow ?? null,
    heading: DEFAULT_TESTIMONIALS_HEADER.heading ?? null,
    body: DEFAULT_TESTIMONIALS_HEADER.body ?? null,
  },
  contact: {
    header: {
      eyebrow: "Book a demo",
      heading: "Want to see what WonkaChat\ncould do for your team?",
      body: "Book a short demo and we'll show how WonkaChat can connect to your tools, support your workflows and make AI accessible across your organisation.",
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
        _key: "technical",
        question: "Is WonkaChat only for technical teams?",
        answer:
          "No. WonkaChat is built for every employee. People can use AI through simple chat, shared agents and guided workflows.",
      },
      {
        _key: "tools",
        question: "Can WonkaChat connect to our existing tools?",
        answer:
          "Yes. WonkaChat can connect to company tools such as CRM, ERP, email, documents, project tools and internal databases.",
      },
      {
        _key: "model",
        question: "Do we need to choose one AI model?",
        answer:
          "No. WonkaChat is designed to be flexible, so your organisation can work with the AI model that fits your needs.",
      },
      {
        _key: "access",
        question: "Can we control what AI can access?",
        answer:
          "Yes. You can manage access, permissions and which agents are available to which users or teams.",
      },
      {
        _key: "approval",
        question: "Can actions require human approval?",
        answer:
          "Yes. WonkaChat supports human-in-the-loop workflows, so important actions can be reviewed before they are executed.",
      },
      {
        _key: "replacement",
        question: "Is WonkaChat a replacement for ChatGPT or Copilot?",
        answer:
          "WonkaChat is different. It is built as a company AI workspace, connected to your tools, agents, workflows and governance.",
      },
    ],
  },
  seo: {
    metaTitle: "WonkaChat | AI workspace for your entire organization",
    metaDescription:
      "WonkaChat connects all your tools, understands what you need and executes tasks automatically. Secure, governed and useful — not just another chatbot.",
    ogImage: null,
  },
};
