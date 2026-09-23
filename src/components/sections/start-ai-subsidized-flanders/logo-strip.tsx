import Image from "next/image";
import { Section } from "@/components/ui/section";

const CLIENT_LOGOS = [
  { src: "/images/start-ai-subsidized-flanders/logos/kijzer.png", alt: "Kijzer" },
  { src: "/images/start-ai-subsidized-flanders/logos/cambio.png", alt: "Cambio" },
  { src: "/images/start-ai-subsidized-flanders/logos/tupperware.png", alt: "Tupperware" },
  { src: "/images/start-ai-subsidized-flanders/logos/medi-market.png", alt: "Medi-Market" },
  { src: "/images/start-ai-subsidized-flanders/logos/odth.png", alt: "ODTH First Class Logistics" },
  { src: "/images/start-ai-subsidized-flanders/logos/pmv.png", alt: "PMV" },
  { src: "/images/start-ai-subsidized-flanders/logos/senitas.png", alt: "Senitas" },
  { src: "/images/start-ai-subsidized-flanders/logos/consenso.png", alt: "Consenso Advocaten" },
  { src: "/images/start-ai-subsidized-flanders/logos/just-russel.png", alt: "Just Russel" },
  { src: "/images/start-ai-subsidized-flanders/logos/am-norman.png", alt: "am norman" },
] as const;

const PROOF_LINES = [
  "#1 Start AI-partner in België",
  "+150 Start AI-trajecten afgerond",
] as const;

function LogoItem({ logo }: { logo: (typeof CLIENT_LOGOS)[number] }) {
  return (
    <div className="flex shrink-0 items-center px-5 md:px-7">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={180}
        height={52}
        className="h-10 w-auto opacity-75 md:h-12"
        unoptimized
      />
    </div>
  );
}

export function StartAiSubsidizedFlandersLogoStrip() {
  return (
    <>
      <Section>
        <div className="border-t border-dashed border-border" />
      </Section>
      <Section containerClassName="py-10">
        <div
          className="group/marquee -mx-6 overflow-clip md:-mx-8 lg:-mx-12"
          role="region"
          aria-label="Klantenlogo's"
        >
          <div className="flex w-max animate-marquee items-center motion-reduce:animate-none group-hover/marquee:[animation-play-state:paused]">
            {CLIENT_LOGOS.map((logo, i) => (
              <LogoItem key={`a-${i}`} logo={logo} />
            ))}
            {CLIENT_LOGOS.map((logo, i) => (
              <LogoItem key={`b-${i}`} logo={logo} />
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-center">
          {PROOF_LINES.map((line, i) => (
            <span key={line} className="contents">
              {i > 0 ? (
                <span className="hidden h-1 w-1 rounded-full bg-text/30 md:inline-block" />
              ) : null}
              <span className="type-body text-text/70">{line}</span>
            </span>
          ))}
        </div>
      </Section>
      <Section>
        <div className="border-t border-dashed border-border" />
      </Section>
    </>
  );
}
