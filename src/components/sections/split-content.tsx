import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { resolveImageAlt, resolveImageSrc } from "@/lib/cms-image";
import { hasSanityImage } from "@/lib/resolve-cms";
import type { SplitContentResolved } from "@/lib/types/page-sections";

interface SplitContentProps {
  data: SplitContentResolved;
  className?: string;
}

export function SplitContent({ data, className }: SplitContentProps) {
  const header = data.header;
  const fallback = data.fallbackImage ?? { src: "", alt: "" };
  const imageSrc = resolveImageSrc(data.image, fallback);
  const imageAlt = resolveImageAlt(data.image, fallback);

  if (!header?.heading && !imageSrc) {
    return null;
  }

  return (
    <Section className={className ?? "py-18 md:py-24"}>
      <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-start md:gap-16">
        {header?.heading ? (
          <div>
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
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={fallback.width ?? 1650}
            height={fallback.height ?? 1920}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-auto w-full"
            unoptimized={!hasSanityImage(data.image)}
          />
        ) : null}
      </div>
    </Section>
  );
}
