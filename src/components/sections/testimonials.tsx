import { sanityFetch } from "@sanity/lib/live";
import { TESTIMONIALS_QUERY } from "@sanity/lib/queries";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/ui";
import type { Testimonial } from "@/lib/types";
import {
  DEFAULT_TESTIMONIALS_HEADER,
  type TestimonialsHeader,
} from "@/lib/testimonials-defaults";
import { TestimonialsCarousel } from "./testimonials-carousel";

export type { TestimonialsHeader } from "@/lib/testimonials-defaults";
export { DEFAULT_TESTIMONIALS_HEADER } from "@/lib/testimonials-defaults";

const CAROUSEL_LAYOUT =
  "flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20 xl:gap-30";

async function getTestimonials() {
  const { data } = await sanityFetch({ query: TESTIMONIALS_QUERY });
  return (data ?? []) as Testimonial[];
}

interface TestimonialsProps {
  id?: string;
  header?: TestimonialsHeader | null;
  className?: string;
  locale?: Locale;
}

/**
 * Swap header fields that still hold the EN defaults (page fallbacks) for
 * the locale's translation. CMS-authored values are left untouched.
 */
function localizeHeader(
  header: TestimonialsHeader | null | undefined,
  locale: Locale,
): TestimonialsHeader | null | undefined {
  if (!header || locale === "en") return header;
  const t = getT(locale);
  const pick = (value: string | null | undefined, key: keyof TestimonialsHeader) =>
    value != null && value === DEFAULT_TESTIMONIALS_HEADER[key]
      ? t(`sections.testimonials.header.${key}`)
      : value;
  return {
    eyebrow: pick(header.eyebrow, "eyebrow"),
    heading: pick(header.heading, "heading"),
    body: pick(header.body, "body"),
  };
}

export async function Testimonials({
  id,
  header: headerProp,
  className,
  locale = "en",
}: TestimonialsProps) {
  const header = localizeHeader(headerProp, locale);
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) {
    return <div aria-hidden className="py-8 md:py-10 lg:py-14" />;
  }

  const showHeader = Boolean(header?.heading);

  return (
    <Section
      id={id}
      className={className}
      containerClassName={
        showHeader
          ? undefined
          : cn(
              "flex flex-col gap-12 py-15 md:py-20 lg:py-30",
              CAROUSEL_LAYOUT,
            )
      }
    >
      {showHeader && header ? (
        <SectionHeader
          align="center"
          className="mx-auto max-w-2xl"
          eyebrow={
            header.eyebrow ? <Eyebrow>{header.eyebrow}</Eyebrow> : undefined
          }
          heading={header.heading ?? ""}
          body={header.body ?? undefined}
          bodyClassName="mx-auto max-w-xl type-body text-text/60 opacity-100"
        />
      ) : null}
      <div className={showHeader ? cn("mt-14", CAROUSEL_LAYOUT) : undefined}>
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </Section>
  );
}
