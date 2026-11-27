import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { SecurityPoints } from "@/components/sections/home-security-banner";
import type { Locale } from "@/i18n/config";
import { headingClass } from "@/lib/design-tokens";
import { PRICING_COPY, TRIAL_REGISTER_URL } from "@/lib/pricing.config";
import { cn } from "@/lib/utils";
import { HOME_V2_COPY } from "@/views/copy/home-v2";

const copy = PRICING_COPY.closing;

const ctaClassName =
  "h-[2.6875rem] min-w-[9.5rem] px-[1.125rem] type-paragraph-m-bold";

export function PricingClosingCta({
  bookingHref,
  locale = "en",
}: {
  bookingHref: string;
  locale?: Locale;
}) {
  const security = HOME_V2_COPY[locale].security;
  return (
    <Section wide className="bg-background py-20 md:py-30">
      <Surface
        variant="panel"
        className="relative overflow-hidden bg-blue-900 p-7 text-white md:p-10"
      >
        <Image
          src="/images/security/banner-bg.avif"
          alt=""
          fill
          sizes="(min-width: 84rem) 84rem, 100vw"
          className="object-cover mix-blend-luminosity"
        />
        <div className="relative">
          <div className="flex flex-col gap-6 border-b border-dashed border-white/40 pb-10 md:flex-row md:items-end md:justify-between">
            <div className="flex max-w-2xl flex-col gap-4">
              <h2 className={cn(headingClass.section, "text-white")}>{copy.title}</h2>
              <p className="type-body text-white/80">{copy.body}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink href={TRIAL_REGISTER_URL} variant="secondary" className={ctaClassName}>
                {copy.primaryCta}
              </ButtonLink>
              <div data-theme="dark" className="contents">
                <ButtonLink href={bookingHref} variant="primaryOutline" className={ctaClassName}>
                  {copy.secondaryCta}
                </ButtonLink>
              </div>
            </div>
          </div>
          <SecurityPoints
            points={security.points}
            cta={security.cta}
            ctaHref={security.ctaHref}
          />
        </div>
      </Surface>
    </Section>
  );
}
