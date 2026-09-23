import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import type { CardGridData } from "@/lib/types/page-sections";

interface CardGridProps {
  data: CardGridData;
  className?: string;
}

export function CardGrid({ data, className }: CardGridProps) {
  const header = data.header;
  const cards = data.cards ?? [];

  if (!header?.heading && cards.length === 0) {
    return null;
  }

  return (
    <Section className={className ?? "py-24"}>
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
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {cards.map((card) => (
          <Surface
            key={card._key}
            variant="card"
            className="group flex h-full flex-col bg-mid-gray p-7 transition-colors hover:bg-black hover:text-white md:min-h-[280px] md:p-8"
          >
            <h3 className="type-h6">{card.title}</h3>
            {card.body ? (
              <p className="mt-4 type-paragraph-m whitespace-pre-line text-text/65 group-hover:text-white/70">
                {card.body}
              </p>
            ) : null}
          </Surface>
        ))}
      </div>
    </Section>
  );
}
