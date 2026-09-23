import Image from "next/image";
import { Section } from "@/components/ui/section";
import { resolveImageAlt, resolveImageSrc } from "@/lib/cms-image";
import { hasSanityImage } from "@/lib/resolve-cms";
import type { LogoStripResolved } from "@/lib/types/page-sections";

interface LogoStripProps {
  data: LogoStripResolved;
  logoGap?: "default" | "wide";
}

export function LogoStrip({ data, logoGap = "default" }: LogoStripProps) {
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

  return (
    <>
      <Section>
        <div className="border-t border-dashed border-border" />
      </Section>
      <Section containerClassName="py-10">
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
              className={
                logoGap === "wide"
                  ? "h-7 w-auto opacity-60 brightness-0 md:h-8"
                  : "h-6 w-auto opacity-60 brightness-0"
              }
              unoptimized={logo.unoptimized}
            />
          ))}
        </div>
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
