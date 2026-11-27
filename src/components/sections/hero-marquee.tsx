import Image from "next/image";
import { getT } from "@/i18n/ui";

const LOGO_HEIGHT_PX = 24;

interface ProofItemData {
  logoSrc: string;
  logoAlt: string;
  logoIntrinsicWidth: number;
  logoIntrinsicHeight: number;
}

const PROOF_ITEMS: ProofItemData[] = [
  {
    logoSrc: "/images/hero/proof-1.svg",
    logoAlt: "PWC, Engie, Buildwise, Xerius",
    logoIntrinsicWidth: 287,
    logoIntrinsicHeight: 21,
  },
  {
    logoSrc: "/images/hero/proof-2.svg",
    logoAlt: "Luminus, Cambio, Zorgi, ODTH",
    logoIntrinsicWidth: 289,
    logoIntrinsicHeight: 24,
  },
  {
    logoSrc: "/images/hero/proof-3.svg",
    logoAlt: "Luminus, Cambio, Zorgi, ODTH",
    logoIntrinsicWidth: 320,
    logoIntrinsicHeight: 26,
  },
];

function ProofItem({ item, message }: { item: ProofItemData; message: string }) {
  const width = Math.round(
    (item.logoIntrinsicWidth / item.logoIntrinsicHeight) * LOGO_HEIGHT_PX,
  );

  return (
    <div className="flex h-full shrink-0 items-center gap-5 border-r border-dashed border-border px-7 py-4">
      <p className="type-eyebrow whitespace-nowrap text-text/90">{message}</p>
      <Image
        src={item.logoSrc}
        alt={item.logoAlt}
        width={width}
        height={LOGO_HEIGHT_PX}
        className="block h-6 w-auto shrink-0"
        unoptimized
      />
    </div>
  );
}

/** `messages` are the localized captions, in PROOF_ITEMS order. */
export function HeroMarquee({
  messages = getT("en").raw("home.hero.marquee") as string[],
  ariaLabel = "Customer proof",
}: {
  messages?: string[];
  ariaLabel?: string;
}) {
  return (
    <div
      className="group/marquee relative w-full overflow-clip border-t border-dashed border-border bg-text/[0.06]"
      role="region"
      aria-label={ariaLabel}
    >
      <div className="flex w-max animate-marquee items-stretch motion-reduce:animate-none group-hover/marquee:[animation-play-state:paused]">
        {PROOF_ITEMS.map((item, i) => (
          <ProofItem key={`a-${i}`} item={item} message={messages[i] ?? ""} />
        ))}
        {PROOF_ITEMS.map((item, i) => (
          <ProofItem key={`b-${i}`} item={item} message={messages[i] ?? ""} />
        ))}
      </div>
    </div>
  );
}
