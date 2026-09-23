import type { SeoData } from "@/lib/types";
import type {
  ContactSectionResolved,
  IconFeatureGridData,
  LogoStripResolved,
  ProblemBentoData,
  ProductHeroResolved,
  StickyFeaturesResolved,
  WorkflowStepsData,
  WorkflowStepsSectionData,
  WorkflowStepResolved,
  WorkflowStepVisual,
} from "@/lib/types/page-sections";
import { START_AI_DEFAULTS } from "@/lib/page-defaults/start-ai";
import { WONKA_CHAT_DEFAULTS } from "@/lib/page-defaults/wonka-chat";

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

const WORKFLOW_STEP_LAYOUT: Array<{
  variant: WorkflowStepResolved["variant"];
  mirror: boolean;
  svgFillClassName: string;
  divBgClassName: string;
  visual: WorkflowStepVisual;
}> = [
  {
    variant: "trapezoid",
    mirror: false,
    svgFillClassName: "fill-light-gray",
    divBgClassName: "bg-light-gray",
    visual: "step1",
  },
  {
    variant: "rectangle",
    mirror: false,
    svgFillClassName: "fill-mid-gray",
    divBgClassName: "bg-mid-gray",
    visual: "step2",
  },
  {
    variant: "trapezoid",
    mirror: true,
    svgFillClassName: "fill-light-gray",
    divBgClassName: "bg-light-gray",
    visual: "step3",
  },
];

function workflowStep(
  _key: string,
  title: string,
  body: string,
  visual: WorkflowStepVisual,
  index: number,
): WorkflowStepResolved {
  const layout = WORKFLOW_STEP_LAYOUT[index] ?? WORKFLOW_STEP_LAYOUT[0];

  return {
    _key,
    title,
    body,
    visual,
    image: null,
    fallbackImage: null,
    variant: layout.variant,
    mirror: layout.mirror,
    svgFillClassName: layout.svgFillClassName,
    divBgClassName: layout.divBgClassName,
  };
}

export interface WonkaChatOdooDefaults {
  hero: ProductHeroResolved;
  logoStrip: LogoStripResolved;
  problem: ProblemBentoData;
  features: StickyFeaturesResolved;
  workflowSteps: WorkflowStepsData;
  capabilities: IconFeatureGridData;
  contact: ContactSectionResolved;
  seo: SeoData;
}

export const WONKA_CHAT_ODOO_DEFAULTS: WonkaChatOdooDefaults = {
  hero: {
    ...WONKA_CHAT_DEFAULTS.hero,
    eyebrow: "WonkaChat · Odoo",
    title: "AI agents that act in Odoo, for IT and ops teams already on Odoo",
    subtitle:
      "WonkaChat connects to Odoo so your team can query CRM, sales, inventory, and accounting data — and prepare the next action without digging through modules.",
    secondaryLink: null,
  },
  logoStrip: START_AI_DEFAULTS.logoStrip,
  problem: {
    header: {
      eyebrow: "The Problem",
      heading: "Ever Feel Like Odoo Should Be Easier than This?",
      body: 'ERPs like Odoo are designed to simplify operations... but often the "simple" part gets lost somewhere between implementation and adoption.',
    },
    largeCards: [
      bentoCard(
        "navigation",
        "Navigation is complex",
        "Your warehouse manager knows her job inside out. But checking stock levels means navigating to Inventory -> Products -> Stock -> Filter by location. She knows what she needs. The interface just makes it hard.",
      ),
      bentoCard(
        "experts",
        "Expert Bottlenecks",
        "Only 2-3 people really understand Odoo. Everyone else interrupts them. A simple question takes 30 minutes and prevent your IT Manager to focus on more valuable activities.",
      ),
    ],
    smallCards: [
      bentoCard(
        "consultants",
        "Consultant Dependency",
        "€100-200/hour every time you need a custom workflow. The costs increase faster than the value you're getting. And not because you need complex customization, just to get reports that should be simple.",
      ),
      bentoCard(
        "ai-tools",
        "Too Many AI Tools",
        "Generic AI tools creates more confusion than value. Sensible information scattered in places your IT director has no control of. And Odoo integrated AI it's too simple for your workflows.",
      ),
      bentoCard(
        "adoption",
        "Low Adoption Rates",
        "Everyone sticks to the basics they learned in training. The rest sits unused, not because it's not useful, but because finding it is work.",
      ),
    ],
  },
  features: WONKA_CHAT_DEFAULTS.features,
  workflowSteps: {
    header: {
      eyebrow: "How it works",
      heading: "From request to done.\nNot suggested.",
      body: null,
    },
    steps: [
      workflowStep(
        "step-1",
        "Say it.",
        "Write what needs to happen. Like you would to a colleague. “Create an opportunity in Odoo. Add this summary. Create a sales order.”",
        "step1",
        0,
      ),
      workflowStep(
        "step-2",
        "WonkaChat acts.",
        "WonkaChat pulls the data, sees what needs to be done, and does it. CRM updated. Notes added. Orders registered.",
        "step2",
        1,
      ),
      workflowStep(
        "step-3",
        "It becomes how work’s done.",
        "Do it once. It runs every time. Work no longer waits for someone to push it forward.",
        "step3",
        2,
      ),
    ],
  },
  capabilities: {
    header: {
      eyebrow: null,
      heading: "Turn Odoo Into the Backbone of Your Business",
      body: "Just some example on how WonkaChat can powerup your Odoo setup:",
    },
    items: [
      capabilityItem(
        "reconcile-bank",
        "bank",
        "Reconcile Bank Accounts",
        "Automatic monitoring, smart reminders and escalation, ensuring 100% timesheet compliance without manual follow-ups or manager intervention required.",
      ),
      capabilityItem(
        "sales-quotes",
        "quote",
        "Generate Sales Quotes",
        "Automatically capture leads, progress opportunities, assign tasks, and flag deals needing attention eliminating manual CRM work completely.",
      ),
      capabilityItem(
        "ask-odoo",
        "chat",
        "Ask Odoo Anything",
        "Instantly answers questions, explains features, and automatically routes you to the right workflow making Odoo intuitive for everyone.",
      ),
      capabilityItem(
        "customer-tickets",
        "ticket",
        "Resolve Customer Tickets",
        "Automatically retrieves, analyzes, and prioritizes support tickets from JIRA and Odoo flagging missing information and patterns instantly.",
      ),
      capabilityItem(
        "instant-quotes",
        "document",
        "Create Instant Quotes",
        "Incoming quote requests become complete, priced quotations instantly with correct products, discounts, and terms applied automatically.",
      ),
      capabilityItem(
        "seo-content",
        "search",
        "Write SEO Content",
        "Automatically generates search-friendly descriptions, meta tags, and conversion-focused copy following Google's best practices for every product.",
      ),
      capabilityItem(
        "new-leads",
        "userPlus",
        "Create New Leads",
        "Automatically researches companies, enriches contacts, and creates complete CRM records eliminating manual data entry and research work.",
      ),
      capabilityItem(
        "stock-levels",
        "boxes",
        "Monitor Stock Levels",
        "Automated monitoring, adjustments, and alerts with built-in safety checks preventing costly errors before they happen.",
      ),
      capabilityItem(
        "crm-data",
        "database",
        "Update CRM Data",
        "Transforms conversations into structured CRM documentation extracting decisions, action items, and automatically progressing opportunities when appropriate.",
      ),
      capabilityItem(
        "gitlab-tasks",
        "gitBranch",
        "Sync GitLab Tasks",
        "Code commits become project updates instantly, linking development work to tasks with zero manual tracking or status reporting.",
      ),
      capabilityItem(
        "financial-reconciliation",
        "scale",
        "Automate Financial Reconciliation",
        "Automatically identifies matching transactions, flags exceptions, and organizes daily reconciliation work; accountants just approve the matches.",
      ),
    ],
  },
  contact: WONKA_CHAT_DEFAULTS.contact,
  seo: {
    metaTitle: "WonkaChat for Odoo | AI agents that act in your ERP",
    metaDescription:
      "Connect WonkaChat to Odoo to query CRM, inventory, accounting, and sales data in natural language. Private AI for Odoo SaaS and self-hosted.",
    ogImage: null,
  },
};
