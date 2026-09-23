import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { headingClass } from "@/lib/design-tokens";
import type { DeliverablesPanelData } from "@/lib/types/page-sections";

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

interface DeliverablesPanelProps {
  data: DeliverablesPanelData;
  className?: string;
}

export function DeliverablesPanel({ data, className }: DeliverablesPanelProps) {
  const items = data.items ?? [];

  if (!data.heading && items.length === 0) {
    return null;
  }

  return (
    <Section wide className={className ?? "py-8"}>
      <Surface
        variant="panel"
        className="relative"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 35%, #6e8fda 0%, #8aaae8 35%, #b5c8f8 70%, #c8d8ff 100%)",
        }}
      >
        <div className="relative px-8 py-16 md:px-14 md:py-20">
          {data.heading ? (
            <div className="text-center">
              <h2 className={`mx-auto ${headingClass.section} text-white`}>
                {data.heading}
              </h2>
            </div>
          ) : null}
          <div className="mt-10 grid gap-0 md:grid-cols-3 md:gap-x-8">
            {items.map((item, i) => (
              <div key={item._key} className="py-6">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-4 w-4 shrink-0 text-white/80" />
                  <h3 className="type-body font-medium text-white">{item.title}</h3>
                </div>
                {item.body ? (
                  <p className="mt-2 pl-7 type-paragraph-m text-white/75">
                    {item.body}
                  </p>
                ) : null}
                {i < items.length - 1 ? (
                  <div className="mt-6 border-t border-dashed border-white/30" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Surface>
    </Section>
  );
}
