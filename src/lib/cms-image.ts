import { urlFor } from "@sanity/lib/image";
import type { SanityImageData } from "@/lib/types";
import type { StaticImage } from "@/lib/types/page-sections";
import { hasSanityImage } from "@/lib/resolve-cms";

export function resolveImageSrc(
  image: SanityImageData | null | undefined,
  fallback: StaticImage,
): string {
  if (hasSanityImage(image)) {
    return urlFor(image!).url();
  }
  return fallback.src;
}

export function resolveImageAlt(
  image: SanityImageData | null | undefined,
  fallback: StaticImage,
): string {
  if (hasSanityImage(image) && image?.alt) {
    return image.alt;
  }
  return fallback.alt;
}
