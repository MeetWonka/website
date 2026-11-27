import type { SeoLandingPage } from "@/i18n/routes";

export interface LandingImage {
  src: string;
  width: number;
  height: number;
}

export interface LandingVisual {
  /** Full-bleed hero background, from the site's landscape set. */
  background: LandingImage;
  /** Optional product screenshot shown next to the hero copy. */
  productShot?: LandingImage;
}

const BG = {
  path: { src: "/images/hero-bg.avif", width: 2880, height: 1620 },
  fields: { src: "/images/start-ai/hero.jpg", width: 1920, height: 1080 },
  waterfall: { src: "/images/start-ai/wonka-waterfall.png", width: 1536, height: 1024 },
  wheat: { src: "/images/wonka-build/hero-bg.png", width: 1264, height: 848 },
  river: { src: "/images/wonka-build/promo-bg.avif", width: 2688, height: 1040 },
  valley: { src: "/images/CTA/cta-bg.avif", width: 3000, height: 735 },
  sky: { src: "/images/security/banner-bg.avif", width: 2848, height: 654 },
} satisfies Record<string, LandingImage>;

const SHOT = {
  workspace: { src: "/images/wonka-chat/wonka-ai-chat-header.png", width: 3840, height: 2160 },
  erpChat: { src: "/images/wonka-chat/connect-to-erp.png", width: 3200, height: 1800 },
} satisfies Record<string, LandingImage>;

/** Hero imagery per landing page (shared by every locale of the page). */
export const LANDING_VISUALS: Record<SeoLandingPage, LandingVisual> = {
  aiForBusiness: { background: BG.path },
  aiConsultancy: { background: BG.valley },
  chatgptForBusiness: { background: BG.river, productShot: SHOT.workspace },
  kmoPortefeuille: { background: BG.waterfall },
  auditIa: { background: BG.fields },
  acculturationIa: { background: BG.wheat },
  chatbotEntreprise: { background: BG.path, productShot: SHOT.erpChat },
  charteIa: { background: BG.sky },
  shadowAi: { background: BG.river },
  comparatifIa: { background: BG.fields, productShot: SHOT.workspace },
};
