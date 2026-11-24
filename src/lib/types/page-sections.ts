import type {
  CtaButtonData,
  FaqItem,
  SanityImageData,
  SeoData,
  SectionHeaderData,
  SecurityData,
  UseCasesData,
} from "@/lib/types";

export type { SectionHeaderData };

export interface StaticImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductHeroData {
  eyebrow: string | null;
  title: string | null;
  subtitle: string | null;
  secondaryText: string | null;
  theme: "dark" | "light" | null;
  backgroundImage: SanityImageData | null;
  heroImage: SanityImageData | null;
  secondaryLink: CtaButtonData | null;
}

export interface ProductHeroResolved extends ProductHeroData {
  fallbackBackground: StaticImage | null;
  fallbackHero: StaticImage | null;
}

export interface LogoStripData {
  logos: SanityImageData[] | null;
  proofLines: string[] | null;
}

export interface LogoStripResolved extends LogoStripData {
  fallbackLogos: StaticImage[];
}

export interface SplitContentData {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  image: SanityImageData | null;
}

export interface SplitContentResolved {
  header: SectionHeaderData;
  image: SanityImageData | null;
  fallbackImage: StaticImage | null;
}

export interface FeatureItem {
  _key: string;
  title: string;
  description: string | null;
  image: SanityImageData | null;
  link: CtaButtonData | null;
}

export interface StickyFeaturesData {
  header: SectionHeaderData | null;
  showCta: boolean | null;
  features: FeatureItem[] | null;
}

export interface FeatureItemResolved extends FeatureItem {
  fallbackImage: StaticImage | null;
}

export interface StickyFeaturesResolved {
  header: SectionHeaderData;
  showCta: boolean;
  features: FeatureItemResolved[];
}

export interface NumberedCardItem {
  _key: string;
  number: string | null;
  title: string;
  subtitle: string | null;
  body: string | null;
}

export interface NumberedCardsCmsData {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  items: NumberedCardItem[] | null;
}

export interface NumberedCardsData {
  header: SectionHeaderData;
  items: NumberedCardItem[];
}

export interface DeliverableItem {
  _key: string;
  title: string;
  body: string | null;
}

export interface DeliverablesPanelData {
  heading: string | null;
  items: DeliverableItem[] | null;
}

export interface IndustryTabItem {
  _key: string;
  label: string;
  body: string | null;
  bullets: string[] | null;
  clients: string[] | null;
}

export interface IndustriesSectionData {
  header: SectionHeaderData | null;
  industries: IndustryTabItem[] | null;
}

export interface CardGridItem {
  _key: string;
  title: string;
  body: string | null;
}

export interface CardGridData {
  header: SectionHeaderData | null;
  cards: CardGridItem[] | null;
}

export interface ProblemBentoCardData {
  _key: string;
  title: string;
  body: string;
  image: SanityImageData | null;
}

export interface ProblemBentoCardResolved extends ProblemBentoCardData {
  fallbackImage: StaticImage | null;
}

export interface ProblemBentoSectionData {
  header: SectionHeaderData | null;
  largeCards: ProblemBentoCardData[] | null;
  smallCards: ProblemBentoCardData[] | null;
}

export interface ProblemBentoData {
  header: SectionHeaderData;
  largeCards: ProblemBentoCardResolved[];
  smallCards: ProblemBentoCardResolved[];
}

export interface IconFeatureItemData {
  _key: string;
  icon: string;
  title: string;
  body: string;
  image: SanityImageData | null;
}

export interface IconFeatureItemResolved extends IconFeatureItemData {
  fallbackImage: StaticImage | null;
}

export interface IconFeatureGridSectionData {
  header: SectionHeaderData | null;
  items: IconFeatureItemData[] | null;
}

export interface IconFeatureGridData {
  header: SectionHeaderData;
  items: IconFeatureItemResolved[];
}

export type WorkflowStepVisual = "step1" | "step2" | "step3";

export interface WorkflowStepItemData {
  _key: string;
  title: string;
  body: string;
  visual: WorkflowStepVisual;
  image: SanityImageData | null;
}

export interface WorkflowStepsSectionData {
  header: SectionHeaderData | null;
  steps: WorkflowStepItemData[] | null;
}

export interface WorkflowStepResolved extends WorkflowStepItemData {
  fallbackImage: StaticImage | null;
  variant: "trapezoid" | "rectangle";
  mirror: boolean;
  svgFillClassName: string;
  divBgClassName: string;
}

export interface WorkflowStepsData {
  header: SectionHeaderData;
  steps: WorkflowStepResolved[];
}

export interface PromoPanelData {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  variant: "gradient" | "darkImage" | null;
  backgroundImage: SanityImageData | null;
  showCta: boolean | null;
  ctaHref: string | null;
  ctaLabel: string | null;
}

export interface PromoPanelResolved extends PromoPanelData {
  fallbackBackground: StaticImage | null;
}

export interface ContactSectionData {
  header: SectionHeaderData | null;
  portrait: SanityImageData | null;
  personName: string | null;
  personRole: string | null;
}

export interface ContactSectionResolved extends ContactSectionData {
  fallbackPortrait: StaticImage | null;
}

export interface FaqSectionData {
  header: SectionHeaderData | null;
  items: FaqItem[] | null;
}

export interface StartAiContent {
  hero: ProductHeroData | null;
  logoStrip: LogoStripData | null;
  phases: NumberedCardsCmsData | null;
  deliverables: DeliverablesPanelData | null;
  industries: IndustriesSectionData | null;
  whyNow: CardGridData | null;
  promo: PromoPanelData | null;
  testimonials: SectionHeaderData | null;
  contact: ContactSectionData | null;
  faq: FaqSectionData | null;
  seo: SeoData | null;
}

export interface WonkaBuildContent {
  hero: ProductHeroData | null;
  logoStrip: LogoStripData | null;
  phases: NumberedCardsCmsData | null;
  deliverables: DeliverablesPanelData | null;
  industries: IndustriesSectionData | null;
  whyNow: CardGridData | null;
  promo: PromoPanelData | null;
  testimonials: SectionHeaderData | null;
  contact: ContactSectionData | null;
  faq: FaqSectionData | null;
  seo: SeoData | null;
}

export interface WonkaChatContent {
  hero: ProductHeroData | null;
  logoStrip: LogoStripData | null;
  problem: SplitContentData | null;
  overview: SectionHeaderData | null;
  features: StickyFeaturesData | null;
  useCases: UseCasesData | null;
  security: SecurityData | null;
  testimonials: SectionHeaderData | null;
  contact: ContactSectionData | null;
  faq: FaqSectionData | null;
  seo: SeoData | null;
}

export interface WonkaChatOdooContent {
  hero: ProductHeroData | null;
  logoStrip: LogoStripData | null;
  problem: ProblemBentoSectionData | null;
  features: StickyFeaturesData | null;
  workflowSteps: WorkflowStepsSectionData | null;
  capabilities: IconFeatureGridSectionData | null;
  security: SecurityData | null;
  contact: ContactSectionData | null;
  seo: SeoData | null;
}

export interface ContactDetail {
  _key: string;
  label: string;
  value: string;
  href?: string | null;
}

export interface ContactPersonData {
  _key: string;
  portrait: SanityImageData | null;
  name: string;
  role: string | null;
  email: string;
}

export interface ContactPersonResolved extends ContactPersonData {
  fallbackPortrait: StaticImage | null;
}

export interface ContactPageGeneralData {
  header: SectionHeaderData | null;
  details: ContactDetail[] | null;
}

export interface ContactPageTeamData {
  header: SectionHeaderData | null;
  people: ContactPersonData[] | null;
}

export interface ContactPageContent {
  general: ContactPageGeneralData | null;
  team: ContactPageTeamData | null;
  seo: SeoData | null;
}

export interface ContactPageResolved {
  general: ContactPageGeneralData & { header: SectionHeaderData };
  team: ContactPageTeamData & {
    header: SectionHeaderData;
    people: ContactPersonResolved[];
  };
  seo: SeoData | null;
}
