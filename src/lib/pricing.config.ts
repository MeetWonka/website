/**
 * Single source of truth for /pricing: prices, plans, features, FAQ, logos,
 * models and page copy. Prices are per seat per month, excl. VAT, in EUR.
 */

import {
  HOME_V2_HERO_LOGOS,
  type HeroMarqueeLogo,
} from "@/lib/home-v2-hero-logos";

export type PlanId = "chat" | "workspace";
export type Billing = "monthly" | "annual";
export type ModelAccess = "included" | "byok";

export interface SeatPrice {
  monthly: number;
  annual: number;
}

export interface PriceBand extends SeatPrice {
  from: number;
  /** Last seat in the band; `null` means open-ended. */
  to: number | null;
}

export interface PlanFeature {
  text: string;
  /** Rendered after `text` as an inline link. */
  link?: { label: string; href: string };
  /** Same-page anchor; `text` is rendered as the link label. */
  textHref?: string;
  /** Replaces `text` when the team brings its own API keys. */
  byokText?: string;
}

export interface PricingPlan {
  id: PlanId;
  name: string;
  tagline: string;
  badge?: string;
  featuresIntro?: string;
  features: PlanFeature[];
  /** Graduated Standard seat bands with AI models included. */
  standardBands: PriceBand[];
  /** Flat Power seat price. Omitted when the plan has no Power seat. */
  powerSeat?: SeatPrice;
  ctaLabel: string;
}

export type ModelRegion = "eu" | "global";

export interface PricingModel {
  provider: string;
  name: string;
  bestFor: string;
  region: ModelRegion;
  featured: boolean;
}

export interface PricingFaqItem {
  question: string;
  /** `null` keeps the question out of the page until the answer is approved. */
  answer: string | null;
  link?: { label: string; href: string };
}

export const SEAT_PRESETS = [50, 250, 500] as const;
export const DEFAULT_SEATS = 50;
export const MIN_SEATS = 1;
export const MAX_SEATS = 1000;
export const DEFAULT_BILLING: Billing = "annual";
export const DEFAULT_MODEL_ACCESS: ModelAccess = "included";
export const POWER_SEAT_USAGE_MULTIPLIER = 5;

/** BYOK Standard seat is always this much below Included for the same band. */
export const MODEL_INCLUDED_DISCOUNT = {
  monthly: 7,
  annual: 5.6,
} as const;

export const VOLUME_BAND_LABELS = [
  "For the first 50",
  "For the next 200",
  "For the next 300",
  "For the next 1,000+",
] as const;

export const PRICING_SALES_CTA = "Talk to sales";
export const START_AI_HREF = "/start-ai";
export const CONNECTORS_HREF = "/integrations";
export const PRICING_MODELS_SECTION_ID = "pricing-models";
export const PLANS: Record<PlanId, PricingPlan> = {
  chat: {
    id: "chat",
    name: "AI Essentials",
    tagline: "The best AI models in one chat, for everyone in your company.",
    features: [
      { text: "Answers from your own files and company knowledge" },
      {
        text: "Agents for recurring tasks, shared with colleagues",
      },
      {
        text: "Connectors: Odoo, SharePoint, Outlook, Salesforce and",
        link: { label: "more", href: CONNECTORS_HREF },
      },
      { text: "Single sign-on with Microsoft Entra ID" },
      { text: "Workflows: 1,000 runs a month" },
      {
        text: "Apps: build dashboards and internal tools, and share each app with up to 5 people",
      },
      {
        text: "EU-hosted models",
        textHref: `#${PRICING_MODELS_SECTION_ID}`,
        byokText: "Use your own API keys and pay the model providers directly",
      },
    ],
    standardBands: [
      { from: 1, to: 50, monthly: 29, annual: 23.2 },
      { from: 51, to: 250, monthly: 24, annual: 19.2 },
      { from: 251, to: 550, monthly: 19, annual: 15.2 },
      { from: 551, to: null, monthly: 16, annual: 12.8 },
    ],
    powerSeat: { monthly: 119, annual: 99 },
    ctaLabel: PRICING_SALES_CTA,
  },
  workspace: {
    id: "workspace",
    name: "AI Workspace",
    tagline: "AI Essentials and all the controls to roll it out organisation wide.",
    badge: "Recommended",
    featuresIntro: "Everything in AI Essentials, plus:",
    features: [
      { text: "Evaluate and audit the agents your teams rely on" },
      {
        text: "Set access levels on connectors, agents and shared mailboxes",
      },
      { text: "Usage insights per team and per agent" },
      {
        text: "Unlimited app sharing: with anyone, any team or the whole company",
      },
      { text: "10× the workflow runs: 10,000 a month" },
      { text: "Premium support" },
    ],
    standardBands: [
      { from: 1, to: 50, monthly: 39, annual: 31.2 },
      { from: 51, to: 250, monthly: 32.25, annual: 25.8 },
      { from: 251, to: 550, monthly: 25.9, annual: 20.72 },
      { from: 551, to: null, monthly: 22.25, annual: 17.8 },
    ],
    powerSeat: { monthly: 129, annual: 109 },
    ctaLabel: PRICING_SALES_CTA,
  },
};

export function roundSeatPrice(amount: number) {
  return Math.round(amount * 100) / 100;
}

export function seatPriceForBand(
  band: PriceBand,
  billing: Billing,
  access: ModelAccess,
): number {
  const included = band[billing];
  if (access === "included") return included;
  return roundSeatPrice(included - MODEL_INCLUDED_DISCOUNT[billing]);
}

/** Order of the plan cards on desktop. On mobile AI Workspace stacks on top. */
export const PLAN_ORDER: PlanId[] = ["chat", "workspace"];

/** Filled-shape logos that turn into solid blocks when rendered in grey. */
const LOGOS_WITHOUT_MUTED_VERSION = new Set(["Cambio", "KRC Genk"]);

// TODO: CHECK approved list of customer logos. Homepage hero marquee set.
export const PRICING_LOGOS: HeroMarqueeLogo[] = HOME_V2_HERO_LOGOS.filter(
  (logo) => !LOGOS_WITHOUT_MUTED_VERSION.has(logo.alt),
);

const LOGO_DIR = "/images/home/logos";

/** Provider logos; providers without a file fall back to their initials. */
export const PROVIDER_LOGOS: Record<string, string | undefined> = {
  OpenAI: `${LOGO_DIR}/model-openai.svg`,
  Anthropic: `${LOGO_DIR}/model-claude.svg`,
  Google: `${LOGO_DIR}/model-gemini.png`,
  Mistral: `${LOGO_DIR}/model-mistral.png`,
  // TODO: CHECK logo files for Moonshot AI and Z.ai.
  "Moonshot AI": undefined,
  "Z.ai": undefined,
};

// "Everyday work", "Advanced reasoning", "Fast and efficient" and "European
// model" come from the app.
// TODO: CHECK the other "bestFor" descriptions.
export const MODELS: PricingModel[] = [
  { provider: "OpenAI", name: "GPT-5.6 Luna", bestFor: "Everyday work", region: "eu", featured: true },
  { provider: "OpenAI", name: "GPT-6.1 Sol", bestFor: "Advanced reasoning", region: "eu", featured: true },
  { provider: "Anthropic", name: "Claude Opus 5.5", bestFor: "Complex, demanding tasks", region: "eu", featured: true },
  { provider: "Anthropic", name: "Claude Sonnet 5.5", bestFor: "Writing and analysis", region: "eu", featured: true },
  { provider: "Anthropic", name: "Claude Haiku 5.5", bestFor: "Fast and efficient", region: "eu", featured: false },
  { provider: "Anthropic", name: "Claude Haiku 4.5", bestFor: "Fast and efficient", region: "eu", featured: false },
  { provider: "Google", name: "Gemini 3.8 Flash", bestFor: "Fast answers", region: "eu", featured: true },
  { provider: "Google", name: "Gemini 3.7 Flash", bestFor: "Fast answers", region: "eu", featured: false },
  { provider: "Google", name: "Gemini 3.1 Flash Lite", bestFor: "Light, quick tasks", region: "eu", featured: false },
  { provider: "Google", name: "Gemini 3.1 Pro", bestFor: "Advanced reasoning", region: "global", featured: false },
  { provider: "Mistral", name: "Mistral Large 4", bestFor: "European model", region: "eu", featured: true },
  { provider: "Mistral", name: "Mistral Medium", bestFor: "Fast and efficient", region: "eu", featured: false },
  { provider: "Moonshot AI", name: "Kimi K3", bestFor: "Long, complex tasks", region: "global", featured: false },
  { provider: "Moonshot AI", name: "Kimi K2.5", bestFor: "Long, complex tasks", region: "global", featured: false },
  { provider: "Z.ai", name: "GLM 5.2", bestFor: "Coding and reasoning", region: "eu", featured: false },
];

/** Prose price: "€29" for whole euros, "€23.20" otherwise. */
function proseEuro(amount: number) {
  return Number.isInteger(amount) ? `€${amount}` : `€${amount.toFixed(2)}`;
}

const chatFirstBand = PLANS.chat.standardBands[0];
const workspaceFirstBand = PLANS.workspace.standardBands[0];

export const PRICING_FAQ: PricingFaqItem[] = [
  {
    question: "How much does Wonka cost?",
    answer: `AI Essentials costs ${proseEuro(chatFirstBand.monthly)} per user per month and AI Workspace ${proseEuro(workspaceFirstBand.monthly)}, or ${proseEuro(chatFirstBand.annual)} and ${proseEuro(workspaceFirstBand.annual)} with annual billing. These are Standard seat prices for the first ${chatFirstBand.to} users, excluding VAT and with AI models included, and the price per seat drops as your team grows.`,
  },
  {
    question: "Can we try Wonka before we buy?",
    answer:
      "Yes. Book a call with our team and we'll walk you through Wonka on a real use case from your company before you commit.",
  },
  {
    question: "What is the difference between AI Essentials and AI Workspace?",
    // TODO: CHECK
    answer:
      "AI Essentials gives everyone in your company secure access to AI chat, agents and your company knowledge. AI Workspace adds governance, audit logs and admin controls, so you stay in control as AI use grows across teams.",
  },
  {
    question: "Are the AI models included in the price?",
    answer:
      "Yes, a Standard seat includes all the AI models we host, most of them in the EU, with fair usage limits and no usage-based bills.",
  },
  {
    question: "What is a Power seat, and can we mix seat types?",
    // TODO: CHECK that Power and Standard seats can be mixed.
    answer:
      "A Power seat gives one user five times more usage than a Standard seat, which suits people who work with AI all day. You can give Power seats to some users and Standard seats to everyone else.",
  },
  {
    question: "Can we use our own API keys?",
    answer:
      "Yes. When AI models are not included in your seat price, you connect your own model keys and pay providers directly, with no usage limits on our side.",
  },
  {
    question: "How do volume discounts work?",
    answer:
      "The price per Standard seat goes down in bands as your team grows, and each price only applies to the seats inside its band. The pricing breakdown shows the exact total for your team size.",
  },
  {
    question: "Which AI models can we use?",
    answer: `You can choose from ${MODELS.length} models by OpenAI, Anthropic, Google, Mistral and others, or let Auto pick the best model for every message.`,
  },
  {
    question: "Where is our data stored, and is it used to train AI models?",
    // TODO: CHECK add the sentence about model training once confirmed.
    answer:
      "Your data and most AI models are hosted in the EU and we work fully GDPR-compliant.",
  },
  {
    question: "Can we change plans or add seats later?",
    // TODO: CHECK policy for changing plans and adding seats. Hidden until approved.
    answer: null,
  },
  {
    question: "Do you help with the rollout?",
    answer:
      "Yes, besides the platform we help companies with their AI strategy and rollout through Start AI, so your team actually uses what you pay for.",
    link: { label: "Start AI", href: START_AI_HREF },
  },
];

export const PRICING_COPY = {
  seo: {
    title: "Pricing | Wonka",
    description:
      "Transparent per-seat pricing for Wonka. Choose AI Essentials or AI Workspace for your team, with EU-hosted AI models included.",
    productName: "Wonka Workspace",
  },
  hero: {
    heading: "Pricing that scales with your team.",
  },
  controls: {
    seats: "Seats",
    billing: "Billing",
    monthly: "Monthly",
    annual: "Annual",
    save: "Save 20%",
    models: "AI models",
    included: "Included",
    notIncluded: "Not included",
    includedTooltip:
      "Price includes access to all AI models we host. Fair usage limits apply.",
    notIncludedTooltip:
      "AI models aren't included. Bring your own model keys, with no usage limits.",
    viewBreakdown: "View pricing breakdown",
  },
  trial: {
    title: "See Wonka on a real use case",
    body: "Book a call with our team. We'll walk you through Wonka on a use case from your company and help you pick the right plan.",
    cta: PRICING_SALES_CTA,
  },
  card: {
    standardSeat: "Standard seat",
    powerSeat: `Power seat (${POWER_SEAT_USAGE_MULTIPLIER}x usage)`,
    perUser: "Per user / month (excl. VAT)",
    perUserAverage: "Average per user / month (excl. VAT)",
    powerIncludedOnly: "Only available when AI models are included.",
    or: "or",
    modelsNotIncludedNote:
      "You bring your own model keys and pay providers directly, with no usage limits on our side.",
    totalFor: (seats: number, total: string) =>
      `${total} per month for ${seats.toLocaleString("en")} Standard seats`,
  },
  enterprise: {
    title: "Enterprise",
    price: "Custom",
    priceNote: "For 1,000+ seats",
    body: "For organisations that need their own deployment.",
    featuresIntro: "Everything in AI Workspace, plus:",
    items: [
      "Managed cloud, your own cloud or on-premise",
      "Deployment built around your security requirements",
      "Bring your own model API keys",
      "Volume pricing",
      "Hands-on support during your rollout by a dedicated account manager",
    ],
    cta: PRICING_SALES_CTA,
  },
  breakdown: {
    title: "Pricing breakdown",
    body: "Each price applies only to the seats inside its band, so you see exactly what your team pays.",
    close: "Close",
    closeAriaLabel: "Close pricing breakdown",
    planAriaLabel: "Plan",
    billingSummary: (billing: string) =>
      `Standard seats, ${billing.toLowerCase()} billing`,
    seatsColumn: "Seats",
    priceColumn: "Price (per standard seat)",
    subtotalColumn: "Aggregated price",
    models: "AI models",
    billing: "Billing",
    total: "Total per month (excl. VAT)",
  },
  social: {
    ariaLabel: "Customer logos",
  },
  models: {
    title: "The right model for every task",
    body: "Every Standard seat includes the leading AI models, most of them hosted in the EU, so your team can pick the model that fits the job without paying for power it doesn't need.",
    autoTitle: "Auto",
    autoBody:
      "Not sure which model to pick? Auto sends every message to the best model for the job, based on cost, speed and quality.",
    eu: "EU-hosted",
    global: "Global",
    showAll: "See all models",
    hideAll: "Show fewer models",
  },
  faq: {
    title: "Frequently asked questions",
  },
  closing: {
    title: "Not sure which plan fits your team?",
    body: "Our team is happy to walk you through Wonka on a real use case.",
    primaryCta: PRICING_SALES_CTA,
  },
} as const;
