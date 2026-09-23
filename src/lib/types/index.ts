// Shared CMS types

export interface SanityImageData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asset: any;
  alt: string;
}

export interface CtaButtonData {
  label: string;
  href: string;
}

export interface SectionHeaderData {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  supplemental?: string | null;
}

export interface FaqItem {
  _key?: string;
  question: string;
  answer: string;
}

export interface SeoData {
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
}

// Navigation types (from CMS siteSettings)

export interface NavDropdownChild {
  _key: string;
  label: string;
  href: string;
  description?: string;
  /** Shown in nav but not clickable until the page is live again. */
  disabled?: boolean;
  external?: boolean;
}

export interface NavItem {
  _key: string;
  itemType: "link" | "dropdown";
  label: string;
  href?: string;
  children?: NavDropdownChild[];
}

// Site Settings (fetched from Sanity)

export interface FooterLink {
  _key: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  _key: string;
  title: string;
  links: FooterLink[];
}

export interface SharedLinks {
  meetingUrl: string | null;
  startAiMeetingUrl: string | null;
  wonkaBuildMeetingUrl: string | null;
  wonkaChatMeetingUrl: string | null;
  franceMeetingUrl: string | null;
  meetingLabel: string | null;
  startAiUrl: string | null;
  wonkaBuildUrl: string | null;
  wonkaChatUrl: string | null;
}

export interface SiteSettings {
  sharedLinks: SharedLinks | null;
  navigation: NavItem[] | null;
  headerCta: CtaButtonData | null;
  footerLinkGroups: FooterLinkGroup[] | null;
}

// Homepage content

export interface SanityImageWithDimensions extends SanityImageData {
  dimensions: { width: number; height: number } | null;
}

export interface SolutionStep {
  _key: string;
  title: string;
  body: string | null;
}

export interface SolutionData {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  steps: SolutionStep[] | null;
}

export interface WhatWeDoCard {
  _key: string;
  tagline: string;
  body: string;
  cta: CtaButtonData;
}

export interface WhatWeDoData {
  eyebrow: string | null;
  heading: string | null;
  cards: WhatWeDoCard[] | null;
}

export interface HowToStartData {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  calloutHeading: string | null;
  outcomesHeading: string | null;
  outcomes: string[] | null;
}

export interface HeroData {
  awardBadge: string | null;
  title: string | null;
  subtitle: string | null;
}

export interface HomepageCtaData {
  heading: string | null;
  body: string | null;
}

export interface SecurityData {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
}

export interface UseCaseWorkflow {
  _key: string;
  title: string;
  description: string | null;
  bullets: string[] | null;
}

export interface UseCaseIndustry {
  _key: string;
  label: string;
  workflows: UseCaseWorkflow[] | null;
}

export interface UseCasesData {
  eyebrow: string | null;
  heading: string | null;
  industries: UseCaseIndustry[] | null;
}

export type {
  StartAiContent,
  WonkaBuildContent,
  WonkaChatContent,
  WonkaChatOdooContent,
} from "./page-sections";

export interface HomepageContent {
  hero: HeroData | null;
  solution: SolutionData | null;
  whatWeDo: WhatWeDoData | null;
  howToStart: HowToStartData | null;
  security: SecurityData | null;
  cta: HomepageCtaData | null;
  useCases: UseCasesData | null;
  seo: SeoData | null;
}

// Legal page (Terms / Privacy singletons)

export interface LegalPageContent {
  title: string;
  lastUpdated: string | null;
  intro: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[] | null;
  seo: SeoData | null;
}

// Testimonial collection

export interface Testimonial {
  _id: string;
  quote: string;
  authorName: string;
  authorRole: string | null;
  companyLogo: SanityImageWithDimensions | null;
  portrait: SanityImageData | null;
}

// ─── Content Hub Types ───────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  _id: string;
  language: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  coverImage: SanityImageData | null;
  category: string;
  tags: string[] | null;
  body: unknown[];
  faq: FaqItem[] | null;
  seo: SeoData | null;
}

export interface GlossaryTerm {
  _id: string;
  language: string;
  term: string;
  slug: { current: string };
  shortDefinition: string;
  body: unknown[];
  tags: string[] | null;
  faq: FaqItem[] | null;
  seo: SeoData | null;
}

export interface ComparisonPage {
  _id: string;
  language: string;
  title: string;
  slug: { current: string };
  competitor: string;
  excerpt: string;
  body: unknown[];
  tags: string[] | null;
  faq: FaqItem[] | null;
  seo: SeoData | null;
}

export interface UseCase {
  title: string;
  description: string;
  prompt: string;
}

export interface ConnectorPage {
  _id: string;
  language: string;
  toolName: string;
  slug: { current: string };
  tagline: string;
  description: string;
  useCases: UseCase[];
  toolLogo: SanityImageData | null;
  tags: string[] | null;
  faq: FaqItem[] | null;
  seo: SeoData | null;
}

export interface CaseStudy {
  _id: string;
  language: string;
  clientName: string;
  slug: { current: string };
  sector: string;
  headline: string;
  excerpt: string;
  results: string[];
  body: unknown[];
  clientLogo: SanityImageData | null;
  publishedAt: string | null;
  tags: string[] | null;
  faq: FaqItem[] | null;
  seo: SeoData | null;
}
