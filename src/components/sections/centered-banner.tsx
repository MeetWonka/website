import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import type { SectionHeaderData } from "@/lib/types/page-sections";

interface CenteredBannerProps {
  id?: string;
  header: SectionHeaderData;
  className?: string;
  containerClassName?: string;
  bordered?: boolean;
}

export function CenteredBanner({
  id,
  header,
  className,
  containerClassName = "max-w-[900px]",
  bordered = true,
}: CenteredBannerProps) {
  if (!header.heading) {
    return null;
  }

  return (
    <section
      id={id}
      className={cn(
        "bg-mid-gray",
        bordered && "border-y border-dashed border-border",
      )}
    >
      <Section
        className={cn("py-18 md:py-24", className)}
        containerClassName={containerClassName}
      >
        <SectionHeader
          align="center"
          eyebrow={
            header.eyebrow ? <Eyebrow>{header.eyebrow}</Eyebrow> : undefined
          }
          heading={header.heading}
          body={header.body ?? undefined}
          bodyClassName="max-w-2xl type-body text-text/65 opacity-100"
        />
      </Section>
    </section>
  );
}
