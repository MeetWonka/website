export type HeroMarqueeLogoSize = "md" | "crest";

export interface HeroMarqueeLogo {
  src: string;
  alt: string;
  size: HeroMarqueeLogoSize;
  /** SVG wordmarks: CSS invert. Raster: pre-baked white PNG, no filter. */
  invert?: boolean;
  slotClassName?: string;
  /** Fixed visual height (rem). Width follows aspect ratio — this is what sets logo size. */
  imgHeightClass?: string;
  /** CSS scale on the image itself (canvas padding in source PNGs). */
  imgScaleClass?: string;
}

const MARQUEE = "/images/home/logos/hero-marquee";

/** Default wordmark height — matches ENGIE, PwC, etc. */
export const HERO_MARQUEE_IMG_HEIGHT = "h-7 max-h-7";

export const HERO_MARQUEE_IMG_BASE =
  "w-auto origin-center object-contain object-center opacity-90";

export const HERO_MARQUEE_SLOT = "w-[9rem]";

/** Regenerate white PNGs: `node scripts/build-home-v2-hero-logos.mjs` */
export const HOME_V2_HERO_LOGOS: HeroMarqueeLogo[] = [
  { src: "/images/france/logos/engie.svg", alt: "ENGIE", size: "md", invert: true },
  {
    src: `${MARQUEE}/cambio.png`,
    alt: "Cambio",
    size: "md",
    slotClassName: "w-[7.75rem]",
    imgScaleClass: "scale-[1.28]",
  },
  { src: "/images/france/logos/pwc.svg", alt: "PwC", size: "md", invert: true },
  { src: "/images/france/logos/itzu.svg", alt: "Itzu", size: "md", invert: true },
  {
    src: "/images/home/logos/clients/krc-genk.png",
    alt: "KRC Genk",
    size: "crest",
  },
  { src: "/images/france/logos/luminus.svg", alt: "Luminus", size: "md", invert: true },
  { src: `${MARQUEE}/just-russel.png`, alt: "Just Russell", size: "md" },
  { src: `${MARQUEE}/xerius.png`, alt: "Xerius", size: "md" },
  {
    src: `${MARQUEE}/tupperware.png`,
    alt: "Tupperware",
    size: "md",
    slotClassName: "w-[10.5rem]",
    imgHeightClass: "h-6 max-h-6",
  },
  {
    src: `${MARQUEE}/haelvoet.png`,
    alt: "Haelvoet",
    size: "md",
    slotClassName: "w-[11rem]",
    imgScaleClass: "scale-[0.87]",
  },
  { src: "/images/france/logos/buildwise.svg", alt: "Buildwise", size: "md", invert: true },
  {
    src: `${MARQUEE}/respace.png`,
    alt: "Re-space",
    size: "md",
    imgScaleClass: "scale-[0.94]",
  },
  {
    src: `${MARQUEE}/ingenium-group.png`,
    alt: "Ingenium Group",
    size: "md",
    imgScaleClass: "scale-[0.94]",
  },
  {
    src: `${MARQUEE}/senitas.png`,
    alt: "Senitas",
    size: "md",
    imgScaleClass: "scale-[0.94]",
  },
  { src: "/images/france/logos/zorgi.svg", alt: "Zorgi", size: "md", invert: true },
];

export const HERO_LOGO_SIZE_CLASS: Record<
  HeroMarqueeLogoSize,
  { slot: string; imgHeight: string; imgExtra?: string }
> = {
  md: {
    slot: HERO_MARQUEE_SLOT,
    imgHeight: HERO_MARQUEE_IMG_HEIGHT,
  },
  crest: {
    slot: "w-[4.75rem]",
    imgHeight: "h-9 max-h-10 max-w-[3.25rem]",
    imgExtra:
      "opacity-95 saturate-[0.85] brightness-110 contrast-105 grayscale-[0.35]",
  },
};

export function heroMarqueeImgClass(logo: HeroMarqueeLogo): string {
  const tier = HERO_LOGO_SIZE_CLASS[logo.size];
  const height = logo.imgHeightClass ?? tier.imgHeight;
  const scale = logo.imgScaleClass ?? "";

  if (logo.invert) {
    return [
      height,
      "w-auto origin-center object-contain object-center brightness-0 invert",
      scale,
    ]
      .filter(Boolean)
      .join(" ");
  }

  return [height, HERO_MARQUEE_IMG_BASE, scale, tier.imgExtra].filter(Boolean).join(" ");
}
