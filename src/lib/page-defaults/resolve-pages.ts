import { DEFAULT_TESTIMONIALS_HEADER } from "@/lib/testimonials-defaults";
import {
  DEFAULT_USE_CASES,
  DEFAULT_WONKA_CHAT_SECURITY,
  resolveSecuritySection,
  resolveUseCasesSection,
} from "@/lib/cms-sections";
import { START_AI_DEFAULTS } from "@/lib/page-defaults/start-ai";
import { WONKA_BUILD_DEFAULTS } from "@/lib/page-defaults/wonka-build";
import { WONKA_CHAT_DEFAULTS } from "@/lib/page-defaults/wonka-chat";
import { WONKA_CHAT_ODOO_DEFAULTS } from "@/lib/page-defaults/wonka-chat-odoo";
import {
  hasSanityImage,
  resolveItems,
  resolveOptionalString,
  resolveSectionHeader,
} from "@/lib/resolve-cms";
import type { CtaButtonData, SeoData, UseCasesData } from "@/lib/types";
import type {
  CardGridData,
  ContactSectionData,
  ContactSectionResolved,
  DeliverablesPanelData,
  FaqSectionData,
  FeatureItem,
  FeatureItemResolved,
  IndustriesSectionData,
  IconFeatureGridData,
  IconFeatureGridSectionData,
  IconFeatureItemData,
  IconFeatureItemResolved,
  LogoStripData,
  LogoStripResolved,
  NumberedCardsCmsData,
  NumberedCardsData,
  ProductHeroData,
  ProductHeroResolved,
  ProblemBentoCardData,
  ProblemBentoCardResolved,
  ProblemBentoData,
  ProblemBentoSectionData,
  PromoPanelData,
  PromoPanelResolved,
  SectionHeaderData,
  SplitContentData,
  SplitContentResolved,
  StickyFeaturesData,
  StickyFeaturesResolved,
  StartAiContent,
  WonkaBuildContent,
  WorkflowStepsData,
  WorkflowStepsSectionData,
  WorkflowStepItemData,
  WorkflowStepResolved,
  WorkflowStepVisual,
  WonkaChatContent,
  WonkaChatOdooContent,
} from "@/lib/types/page-sections";

export interface StartAiResolvedContent {
  hero: ProductHeroResolved;
  logoStrip: LogoStripResolved;
  phases: NumberedCardsData;
  deliverables: DeliverablesPanelData & { heading: string | null };
  industries: IndustriesSectionData & { header: SectionHeaderData };
  whyNow: CardGridData & { header: SectionHeaderData };
  promo: PromoPanelResolved;
  testimonials: SectionHeaderData;
  contact: ContactSectionResolved;
  faq: FaqSectionData & { header: SectionHeaderData };
  seo: SeoData;
}

export interface WonkaBuildResolvedContent {
  hero: ProductHeroResolved;
  logoStrip: LogoStripResolved;
  phases: NumberedCardsData;
  deliverables: DeliverablesPanelData & { heading: string | null };
  industries: IndustriesSectionData & { header: SectionHeaderData };
  whyNow: CardGridData & { header: SectionHeaderData };
  promo: PromoPanelResolved;
  testimonials: SectionHeaderData;
  contact: ContactSectionResolved;
  faq: FaqSectionData & { header: SectionHeaderData };
  seo: SeoData;
}

export interface WonkaChatOdooResolvedContent {
  hero: ProductHeroResolved;
  logoStrip: LogoStripResolved;
  problem: ProblemBentoData;
  features: StickyFeaturesResolved;
  workflowSteps: WorkflowStepsData;
  capabilities: IconFeatureGridData;
  contact: ContactSectionResolved;
  seo: SeoData;
}

export interface WonkaChatResolvedContent {
  hero: ProductHeroResolved;
  logoStrip: LogoStripResolved;
  problem: SplitContentResolved;
  overview: SectionHeaderData;
  features: StickyFeaturesResolved;
  useCases: UseCasesData;
  security: ReturnType<typeof resolveSecuritySection>;
  testimonials: SectionHeaderData;
  contact: ContactSectionResolved;
  faq: FaqSectionData & { header: SectionHeaderData };
  seo: SeoData;
}

function resolveHeroTheme(
  cms: ProductHeroData | null | undefined,
  defaults: ProductHeroResolved,
): "dark" | "light" {
  const defaultTheme = defaults.theme ?? "light";
  const cmsTheme = cms?.theme;

  if (!cmsTheme) return defaultTheme;

  if (cmsTheme === "light") {
    const hasLightHero =
      hasSanityImage(cms?.heroImage) || Boolean(defaults.fallbackHero?.src);
    return hasLightHero ? "light" : defaultTheme;
  }

  return cmsTheme;
}

function resolveSecondaryLink(
  cms: ProductHeroData | null | undefined,
): CtaButtonData | null {
  const label = cms?.secondaryLink?.label?.trim();
  const href = cms?.secondaryLink?.href?.trim();
  if (label && href) {
    return { label, href };
  }
  return null;
}

function resolveHero(
  cms: ProductHeroData | null | undefined,
  defaults: ProductHeroResolved,
): ProductHeroResolved {
  return {
    eyebrow: resolveOptionalString(cms?.eyebrow, defaults.eyebrow),
    title: resolveOptionalString(cms?.title, defaults.title),
    subtitle: resolveOptionalString(cms?.subtitle, defaults.subtitle),
    secondaryText: resolveOptionalString(cms?.secondaryText, null),
    theme: resolveHeroTheme(cms, defaults),
    backgroundImage: cms?.backgroundImage ?? null,
    heroImage: cms?.heroImage ?? null,
    secondaryLink: resolveSecondaryLink(cms),
    fallbackBackground: defaults.fallbackBackground,
    fallbackHero: defaults.fallbackHero,
  };
}

function resolvePromoVariant(
  cms: PromoPanelData | null | undefined,
  defaults: PromoPanelResolved,
): "gradient" | "darkImage" {
  const defaultVariant = defaults.variant ?? "gradient";
  const cmsVariant = cms?.variant;

  if (!cmsVariant) return defaultVariant;

  if (cmsVariant === "gradient" && defaultVariant === "darkImage") {
    const hasDarkImage =
      hasSanityImage(cms?.backgroundImage) ||
      Boolean(defaults.fallbackBackground?.src);
    if (hasDarkImage) return "darkImage";
  }

  return cmsVariant;
}

function resolvePromo(
  cms: PromoPanelData | null | undefined,
  defaults: PromoPanelResolved,
): PromoPanelResolved {
  return {
    eyebrow: resolveOptionalString(cms?.eyebrow, defaults.eyebrow),
    heading: resolveOptionalString(cms?.heading, defaults.heading),
    body: resolveOptionalString(cms?.body, defaults.body),
    variant: resolvePromoVariant(cms, defaults),
    backgroundImage: cms?.backgroundImage ?? null,
    showCta: cms?.showCta ?? defaults.showCta,
    ctaHref: resolveOptionalString(cms?.ctaHref, defaults.ctaHref),
    ctaLabel: resolveOptionalString(cms?.ctaLabel, defaults.ctaLabel),
    fallbackBackground: defaults.fallbackBackground,
  };
}

function resolveLogoStrip(
  cms: LogoStripData | null | undefined,
  defaults: LogoStripResolved,
): LogoStripResolved {
  return {
    logos: cms?.logos ?? null,
    proofLines: resolveItems(cms?.proofLines, defaults.proofLines ?? []),
    fallbackLogos: defaults.fallbackLogos,
  };
}

function resolveFeatures(
  cms: StickyFeaturesData | null | undefined,
  defaults: StickyFeaturesResolved,
): StickyFeaturesResolved {
  const cmsFeatures = cms?.features;
  const features: FeatureItemResolved[] = cmsFeatures?.length
    ? cmsFeatures.map((item) => attachFeatureFallback(item, defaults.features))
    : defaults.features;

  return {
    header: resolveSectionHeader(cms?.header, defaults.header),
    showCta: cms?.showCta ?? defaults.showCta,
    features,
  };
}

function attachFeatureFallback(
  item: FeatureItem,
  defaults: FeatureItemResolved[],
): FeatureItemResolved {
  const fallback =
    defaults.find((d) => d._key === item._key) ??
    defaults.find((d) => d.title === item.title);

  return {
    ...item,
    fallbackImage: fallback?.fallbackImage ?? null,
  };
}

function resolveSeo(
  cms: SeoData | null | undefined,
  defaults: SeoData,
): SeoData {
  return {
    metaTitle: resolveOptionalString(cms?.metaTitle, defaults.metaTitle),
    metaDescription: resolveOptionalString(
      cms?.metaDescription,
      defaults.metaDescription,
    ),
    ogImage: cms?.ogImage ?? defaults.ogImage,
  };
}

function resolveContact(
  cms: ContactSectionData | null | undefined,
  defaults: ContactSectionResolved,
): ContactSectionResolved {
  return {
    header: resolveSectionHeader(cms?.header, defaults.header!),
    portrait: cms?.portrait ?? null,
    personName: resolveOptionalString(
      cms?.personName,
      defaults.personName,
    ),
    personRole: resolveOptionalString(cms?.personRole, defaults.personRole),
    fallbackPortrait: defaults.fallbackPortrait,
  };
}

function resolveNumberedCards(
  cms: NumberedCardsCmsData | null | undefined,
  defaults: NumberedCardsData,
): NumberedCardsData {
  const legacyHeader = (
    cms as (NumberedCardsCmsData & { header?: SectionHeaderData | null }) | null
  )?.header;

  return {
    header: resolveSectionHeader(
      {
        eyebrow: cms?.eyebrow ?? legacyHeader?.eyebrow ?? null,
        heading: cms?.heading ?? legacyHeader?.heading ?? null,
        body: cms?.body ?? legacyHeader?.body ?? null,
        supplemental: null,
      },
      defaults.header,
    ),
    items: resolveItems(cms?.items, defaults.items),
  };
}

export function resolveStartAiContent(
  cms: StartAiContent | null,
): StartAiResolvedContent {
  const d = START_AI_DEFAULTS;

  return {
    hero: resolveHero(cms?.hero, d.hero),
    logoStrip: resolveLogoStrip(cms?.logoStrip, d.logoStrip),
    phases: resolveNumberedCards(cms?.phases, d.phases),
    deliverables: {
      heading: resolveOptionalString(
        cms?.deliverables?.heading,
        d.deliverables.heading,
      ),
      items: resolveItems(
        cms?.deliverables?.items,
        d.deliverables.items ?? [],
      ),
    },
    industries: {
      header: resolveSectionHeader(
        cms?.industries?.header,
        d.industries.header!,
      ),
      industries: resolveItems(
        cms?.industries?.industries,
        d.industries.industries ?? [],
      ),
    },
    whyNow: {
      header: resolveSectionHeader(cms?.whyNow?.header, d.whyNow.header!),
      cards: resolveItems(cms?.whyNow?.cards, d.whyNow.cards ?? []),
    },
    promo: resolvePromo(cms?.promo, d.promo),
    testimonials: resolveSectionHeader(
      cms?.testimonials,
      d.testimonials ?? DEFAULT_TESTIMONIALS_HEADER,
    ),
    contact: resolveContact(cms?.contact, d.contact),
    faq: {
      header: resolveSectionHeader(cms?.faq?.header, d.faq.header!),
      items: resolveItems(cms?.faq?.items, d.faq.items ?? []),
    },
    seo: resolveSeo(cms?.seo, d.seo),
  };
}

export function resolveWonkaBuildContent(
  cms: WonkaBuildContent | null,
): WonkaBuildResolvedContent {
  const d = WONKA_BUILD_DEFAULTS;

  return {
    hero: resolveHero(cms?.hero, d.hero),
    logoStrip: resolveLogoStrip(cms?.logoStrip, d.logoStrip),
    phases: resolveNumberedCards(cms?.phases, d.phases),
    deliverables: {
      heading: resolveOptionalString(
        cms?.deliverables?.heading,
        d.deliverables.heading,
      ),
      items: resolveItems(
        cms?.deliverables?.items,
        d.deliverables.items ?? [],
      ),
    },
    industries: {
      header: resolveSectionHeader(
        cms?.industries?.header,
        d.industries.header!,
      ),
      industries: resolveItems(
        cms?.industries?.industries,
        d.industries.industries ?? [],
      ),
    },
    whyNow: {
      header: resolveSectionHeader(cms?.whyNow?.header, d.whyNow.header!),
      cards: resolveItems(cms?.whyNow?.cards, d.whyNow.cards ?? []),
    },
    promo: resolvePromo(cms?.promo, d.promo),
    testimonials: resolveSectionHeader(
      cms?.testimonials,
      d.testimonials ?? DEFAULT_TESTIMONIALS_HEADER,
    ),
    contact: resolveContact(cms?.contact, d.contact),
    faq: {
      header: resolveSectionHeader(cms?.faq?.header, d.faq.header!),
      items: resolveItems(cms?.faq?.items, d.faq.items ?? []),
    },
    seo: resolveSeo(cms?.seo, d.seo),
  };
}

function resolveProblemBentoCards(
  cms: ProblemBentoCardData[] | null | undefined,
  defaults: ProblemBentoCardResolved[],
): ProblemBentoCardResolved[] {
  const source = cms?.length ? cms : defaults;

  return source.map((card, index) => {
    const fallback = defaults[index] ?? defaults[0];

    return {
      _key: card._key,
      title: resolveOptionalString(card.title, fallback?.title ?? "") ?? "",
      body: resolveOptionalString(card.body, fallback?.body ?? "") ?? "",
      image: cms?.length ? (card.image ?? null) : null,
      fallbackImage: fallback?.fallbackImage ?? null,
    };
  });
}

function resolveProblemBento(
  cms: ProblemBentoSectionData | null | undefined,
  defaults: ProblemBentoData,
): ProblemBentoData {
  return {
    header: resolveSectionHeader(cms?.header, defaults.header),
    largeCards: resolveProblemBentoCards(cms?.largeCards, defaults.largeCards),
    smallCards: resolveProblemBentoCards(cms?.smallCards, defaults.smallCards),
  };
}

function resolveIconFeatureItems(
  cms: IconFeatureItemData[] | null | undefined,
  defaults: IconFeatureItemResolved[],
): IconFeatureItemResolved[] {
  const source = cms?.length ? cms : defaults;

  return source.map((item, index) => {
    const fallback = defaults[index] ?? defaults[0];

    return {
      _key: item._key,
      icon: resolveOptionalString(item.icon, fallback?.icon ?? "") ?? "",
      title: resolveOptionalString(item.title, fallback?.title ?? "") ?? "",
      body: resolveOptionalString(item.body, fallback?.body ?? "") ?? "",
      image: cms?.length ? (item.image ?? null) : null,
      fallbackImage: fallback?.fallbackImage ?? null,
    };
  });
}

function resolveIconFeatureGrid(
  cms: IconFeatureGridSectionData | null | undefined,
  defaults: IconFeatureGridData,
): IconFeatureGridData {
  return {
    header: resolveSectionHeader(cms?.header, defaults.header),
    items: resolveIconFeatureItems(cms?.items, defaults.items),
  };
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

function resolveWorkflowSteps(
  cms: WorkflowStepsSectionData | null | undefined,
  defaults: WorkflowStepsData,
): WorkflowStepsData {
  const source = cms?.steps?.length ? cms.steps : defaults.steps;

  return {
    header: resolveSectionHeader(cms?.header, defaults.header),
    steps: source.map((step, index) => {
      const fallback = defaults.steps[index] ?? defaults.steps[0];
      const layout = WORKFLOW_STEP_LAYOUT[index] ?? WORKFLOW_STEP_LAYOUT[0];
      const visual = (cms?.steps?.length
        ? step.visual
        : fallback.visual) as WorkflowStepVisual;

      return {
        _key: step._key,
        title: resolveOptionalString(step.title, fallback?.title ?? "") ?? "",
        body: resolveOptionalString(step.body, fallback?.body ?? "") ?? "",
        visual: visual ?? layout.visual,
        image: cms?.steps?.length ? (step.image ?? null) : null,
        fallbackImage: fallback?.fallbackImage ?? null,
        variant: fallback?.variant ?? layout.variant,
        mirror: fallback?.mirror ?? layout.mirror,
        svgFillClassName:
          fallback?.svgFillClassName ?? layout.svgFillClassName,
        divBgClassName: fallback?.divBgClassName ?? layout.divBgClassName,
      };
    }),
  };
}

function resolveSplitContent(
  cms: SplitContentData | null | undefined,
  defaults: SplitContentResolved,
): SplitContentResolved {
  const legacyHeader = (
    cms as (SplitContentData & { header?: SectionHeaderData | null }) | null
  )?.header;

  const eyebrow = cms?.eyebrow ?? legacyHeader?.eyebrow ?? null;
  const heading = cms?.heading ?? legacyHeader?.heading ?? null;
  let body = cms?.body ?? legacyHeader?.body ?? null;

  if (legacyHeader?.supplemental?.trim()) {
    const supplemental = legacyHeader.supplemental.trim();
    if (body?.trim() && !body.includes(supplemental)) {
      body = `${body.trim()}\n\n${supplemental}`;
    } else if (!body?.trim()) {
      body = supplemental;
    }
  }

  return {
    header: resolveSectionHeader(
      { eyebrow, heading, body, supplemental: null },
      defaults.header,
    ),
    image: cms?.image ?? null,
    fallbackImage: defaults.fallbackImage,
  };
}

export function resolveWonkaChatContent(
  cms: WonkaChatContent | null,
  homepageUseCases?: UseCasesData | null,
): WonkaChatResolvedContent {
  const d = WONKA_CHAT_DEFAULTS;

  return {
    hero: resolveHero(cms?.hero, d.hero),
    logoStrip: resolveLogoStrip(cms?.logoStrip, d.logoStrip),
    problem: resolveSplitContent(cms?.problem, d.problem),
    overview: resolveSectionHeader(cms?.overview, d.overview),
    features: resolveFeatures(cms?.features, d.features),
    useCases: resolveUseCasesSection(
      cms?.useCases,
      homepageUseCases,
      DEFAULT_USE_CASES,
    ),
    security: resolveSecuritySection(
      cms?.security,
      DEFAULT_WONKA_CHAT_SECURITY,
    ),
    testimonials: resolveSectionHeader(
      cms?.testimonials,
      d.testimonials ?? DEFAULT_TESTIMONIALS_HEADER,
    ),
    contact: resolveContact(cms?.contact, d.contact),
    faq: {
      header: resolveSectionHeader(cms?.faq?.header, d.faq.header!),
      items: resolveItems(cms?.faq?.items, d.faq.items ?? []),
    },
    seo: resolveSeo(cms?.seo, d.seo),
  };
}

export function resolveWonkaChatOdooContent(
  cms: WonkaChatOdooContent | null,
): WonkaChatOdooResolvedContent {
  const d = WONKA_CHAT_ODOO_DEFAULTS;

  return {
    hero: resolveHero(cms?.hero, d.hero),
    logoStrip: resolveLogoStrip(cms?.logoStrip, d.logoStrip),
    problem: resolveProblemBento(cms?.problem, d.problem),
    features: resolveFeatures(cms?.features, d.features),
    workflowSteps: resolveWorkflowSteps(cms?.workflowSteps, d.workflowSteps),
    capabilities: resolveIconFeatureGrid(cms?.capabilities, d.capabilities),
    contact: resolveContact(cms?.contact, d.contact),
    seo: resolveSeo(cms?.seo, d.seo),
  };
}
