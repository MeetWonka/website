import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import { OdooCapabilityIcon } from "@/components/sections/odoo-capability-icons";
import { resolveImageAlt, resolveImageSrc } from "@/lib/cms-image";
import { headingClass } from "@/lib/design-tokens";
import { hasSanityImage } from "@/lib/resolve-cms";
import type {
  IconFeatureGridData,
  IconFeatureItemResolved,
} from "@/lib/types/page-sections";
import { cn } from "@/lib/utils";

interface IconFeatureGridProps {
  data: IconFeatureGridData;
  className?: string;
  id?: string;
  columns?: 2 | 3;
}

function chunkItems<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

function FeatureVisual({ item }: { item: IconFeatureItemResolved }) {
  const fallback = item.fallbackImage ?? { src: "", alt: "" };
  const imageSrc = resolveImageSrc(item.image, fallback);
  const imageAlt = resolveImageAlt(item.image, fallback);

  if (imageSrc) {
    return (
      <div className="relative size-12 overflow-hidden bg-mid-gray">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="3rem"
          className="object-cover object-center"
          unoptimized={!hasSanityImage(item.image)}
        />
      </div>
    );
  }

  return (
    <Surface
      variant="card"
      className="flex size-12 items-center justify-center bg-mid-gray text-text/45"
    >
      <OdooCapabilityIcon name={item.icon} className="size-5" />
    </Surface>
  );
}

function FeatureCell({ item }: { item: IconFeatureItemResolved }) {
  return (
    <li className="flex flex-col gap-5">
      <FeatureVisual item={item} />
      <div className="flex flex-col gap-3">
        <h3 className={headingClass.card}>{item.title}</h3>
        <p className="type-paragraph-m text-text/65">{item.body}</p>
      </div>
    </li>
  );
}

export function IconFeatureGrid({
  data,
  className,
  id,
  columns = 3,
}: IconFeatureGridProps) {
  const header = data.header;
  const items = data.items ?? [];

  if (!header?.heading && items.length === 0) {
    return null;
  }

  const rows = chunkItems(items, columns);

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

      <div className="mt-14 flex flex-col">
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`}>
            {rowIndex > 0 ? (
              <div className="border-t border-dashed border-border" />
            ) : null}
            <ul
              className={cn(
                "grid gap-x-10 gap-y-12 py-12",
                columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2",
              )}
            >
              {row.map((item) => (
                <FeatureCell key={item._key} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
