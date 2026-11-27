import Image from "next/image";
import { Section } from "@/components/ui/section";
import { resolveImageAlt, resolveImageSrc } from "@/lib/cms-image";
import { SHOW_LOGO_BANNERS } from "@/lib/feature-flags";
import { hasSanityImage } from "@/lib/resolve-cms";
import type { LogoStripResolved } from "@/lib/types/page-sections";

interface LogoStripProps {
  data: LogoStripResolved;
  logoGap?: "default" | "wide";
  logoSize?: "default" | "lg";
  marquee?: boolean;
  ariaLabel?: string;
}

function LogoStripItem({
  src,
  alt,
  width,
  height,
  logoClass,
  unoptimized,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  logoClass: string;
  unoptimized: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center px-5 md:px-7">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={logoClass}
        unoptimized={unoptimized}
      />
    </div>
  );
}

export function LogoStrip({
  data,
  logoGap = "default",
  logoSize = "default",
  marquee = false,
  ariaLabel = "Client logos",
}: LogoStripProps) {
  if (!SHOW_LOGO_BANNERS) return null;

  const cmsLogos = data.logos?.filter((logo) => hasSanityImage(logo)) ?? [];
  const logos =
    cmsLogos.length > 0
      ? cmsLogos.map((logo, i) => ({
          key: `cms-${i}`,
          src: resolveImageSrc(logo, data.fallbackLogos[i] ?? data.fallbackLogos[0]),
          alt: resolveImageAlt(logo, data.fallbackLogos[i] ?? data.fallbackLogos[0]),
          width: data.fallbackLogos[i]?.width ?? 120,
          height: data.fallbackLogos[i]?.height ?? 32,
          unoptimized: false,
        }))
      : data.fallbackLogos.map((logo, i) => ({
          key: `fallback-${i}`,
          src: logo.src,
          alt: logo.alt,
          width: logo.width ?? 120,
          height: logo.height ?? 32,
          unoptimized: true,
        }));

  const proofLines = data.proofLines?.filter(Boolean) ?? [];
  const gapClass =
    logoGap === "wide"
      ? "gap-x-14 gap-y-8"
      : "gap-x-10 gap-y-4";
  const logoClass =
    logoSize === "lg"
      ? "h-10 w-auto opacity-60 brightness-0 md:h-12"
      : logoGap === "wide"
        ? "h-7 w-auto opacity-60 brightness-0 md:h-8"
        : "h-6 w-auto opacity-60 brightness-0";

  return (
    <>
      <Section>
        <div className="border-t border-dashed border-border" />
      </Section>
      <Section containerClassName="py-10">
        {marquee ? (
          <div
            className="group/marquee -mx-6 overflow-clip md:-mx-8 lg:-mx-12"
            role="region"
            aria-label={ariaLabel}
          >
            <div className="flex w-max animate-marquee items-center motion-reduce:animate-none group-hover/marquee:[animation-play-state:paused]">
              {logos.map((logo) => (
                <LogoStripItem
                  key={`a-${logo.key}`}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  logoClass={logoClass}
                  unoptimized={logo.unoptimized}
                />
              ))}
              {logos.map((logo) => (
                <LogoStripItem
                  key={`b-${logo.key}`}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  logoClass={logoClass}
                  unoptimized={logo.unoptimized}
                />
              ))}
            </div>
          </div>
        ) : (
          <div
            className={`flex flex-wrap items-center justify-center ${gapClass}`}
          >
            {logos.map((logo) => (
              <Image
                key={logo.key}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={logoClass}
                unoptimized={logo.unoptimized}
              />
            ))}
          </div>
        )}
        {proofLines.length > 0 ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-center">
            {proofLines.map((line, i) => (
              <span key={line} className="contents">
                {i > 0 ? (
                  <span className="hidden h-1 w-1 rounded-full bg-text/30 md:inline-block" />
                ) : null}
                <span className="type-body text-text/70">{line}</span>
              </span>
            ))}
          </div>
        ) : null}
      </Section>
      <Section>
        <div className="border-t border-dashed border-border" />
      </Section>
    </>
  );
}
