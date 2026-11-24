import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import type { NumberedCardsData } from "@/lib/types/page-sections";

interface NumberedCardsProps {
  data: NumberedCardsData;
  className?: string;
}

export function NumberedCards({ data, className }: NumberedCardsProps) {
  const header = data.header;
  const items = data.items ?? [];

  if (!header?.heading && items.length === 0) {
    return null;
  }

  return (
    <Section className={className ?? "py-24"}>
      <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
        {header?.heading ? (
          <div className="md:sticky md:top-24 md:self-start">
            <SectionHeader
              align="left"
              eyebrow={
                header.eyebrow ? <Eyebrow>{header.eyebrow}</Eyebrow> : undefined
              }
              heading={header.heading}
              body={header.body ?? undefined}
              bodyClassName="max-w-md type-body text-text/65 opacity-100"
            />
          </div>
        ) : null}
        <div className="flex flex-col gap-6">
          {items.map((item, index) => (
            <Surface
              key={item._key}
              variant="card"
              className="bg-mid-gray p-7 md:p-8"
            >
              <div className="flex gap-5">
                <span className="shrink-0 type-h3 leading-none text-text/20">
                  {item.number ?? String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="type-h5">{item.title}</h3>
                  {item.subtitle ? (
                    <p className="mt-1 type-body text-text/50">{item.subtitle}</p>
                  ) : null}
                  {item.body ? (
                    <p className="mt-3 type-paragraph-m text-text/65">
                      {item.body}
                    </p>
                  ) : null}
                </div>
              </div>
            </Surface>
          ))}
        </div>
      </div>
    </Section>
  );
}
