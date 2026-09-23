import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import { resolveImageAlt, resolveImageSrc } from "@/lib/cms-image";
import { headingClass } from "@/lib/design-tokens";
import { hasSanityImage } from "@/lib/resolve-cms";
import type {
  ProblemBentoCardResolved,
  ProblemBentoData,
} from "@/lib/types/page-sections";
import { cn } from "@/lib/utils";

interface ProblemBentoProps {
  data: ProblemBentoData;
  className?: string;
  id?: string;
}

const BENTO_VISUAL_CLASS =
  "relative w-full shrink-0 overflow-hidden bg-light-gray aspect-[16/10]";

function BentoCardVisual({ card }: { card: ProblemBentoCardResolved }) {
  const fallback = card.fallbackImage ?? { src: "", alt: "" };
  const imageSrc = resolveImageSrc(card.image, fallback);
  const imageAlt = resolveImageAlt(card.image, fallback);

  if (imageSrc) {
    return (
      <div className={BENTO_VISUAL_CLASS}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover object-center"
          unoptimized={!hasSanityImage(card.image)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(BENTO_VISUAL_CLASS, "border-b border-dashed border-border")}
      aria-hidden
    />
  );
}

function BentoCard({ card }: { card: ProblemBentoCardResolved }) {
  return (
    <Surface
      variant="card"
      className="flex h-full flex-col overflow-hidden bg-mid-gray"
    >
      <BentoCardVisual card={card} />
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className={headingClass.card}>{card.title}</h3>
        <p className="mt-3 type-paragraph-m text-text/65">{card.body}</p>
      </div>
    </Surface>
  );
}

export function ProblemBento({ data, className, id }: ProblemBentoProps) {
  const header = data.header;
  const largeCards = data.largeCards ?? [];
  const smallCards = data.smallCards ?? [];

  if (!header?.heading && largeCards.length === 0 && smallCards.length === 0) {
    return null;
  }

  return (
    <Section id={id} className={className ?? "py-18 md:py-24"}>
      {header?.heading ? (
        <SectionHeader
          align="center"
          className="mx-auto max-w-3xl"
          eyebrow={
            header.eyebrow ? <Eyebrow>{header.eyebrow}</Eyebrow> : undefined
          }
          heading={header.heading}
          body={header.body ?? undefined}
          bodyClassName="max-w-2xl type-body text-text/65 opacity-100"
        />
      ) : null}

      <div className="mt-14 flex flex-col gap-5">
        {largeCards.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {largeCards.map((card) => (
              <BentoCard key={card._key} card={card} />
            ))}
          </div>
        ) : null}
        {smallCards.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {smallCards.map((card) => (
              <BentoCard key={card._key} card={card} />
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}
