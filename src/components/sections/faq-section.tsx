import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import type { FaqSectionData } from "@/lib/types/page-sections";

interface FaqSectionProps {
  data: FaqSectionData;
  className?: string;
  bordered?: boolean;
  variant?: "default" | "plain";
}

export function FaqSection({
  data,
  className,
  bordered = true,
  variant = "default",
}: FaqSectionProps) {
  const header = data.header;
  const items = data.items ?? [];

  if (!header?.heading && items.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        variant === "plain" ? "bg-background" : "bg-mid-gray",
        bordered && "border-t border-dashed border-border",
      )}
    >
      <Section
        className={cn("py-18 md:py-24", className)}
        containerClassName="max-w-2xl"
      >
        {header?.heading ? (
          <SectionHeader
            align="center"
            eyebrow={
              header.eyebrow ? <Eyebrow>{header.eyebrow}</Eyebrow> : undefined
            }
            heading={header.heading}
            headingClassName="text-center"
          />
        ) : null}
        {items.length > 0 ? (
          <div className="mt-10">
            <FaqAccordion items={items} />
          </div>
        ) : null}
      </Section>
    </section>
  );
}
