"use client";

import { useState } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { PricingBreakdownModal } from "@/components/sections/pricing-breakdown-modal";
import {
  ControlField,
  ModelsAccessControl,
  SeatsControl,
} from "@/components/sections/pricing-seats-control";
import { SegmentedControl } from "@/components/sections/pricing-segmented-control";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import { CheckmarkIcon } from "@/components/ui/icons/checkmark-icon";
import {
  calculateBreakdown,
  getAverageStandardSeatPrice,
  getPowerSeatPrice,
} from "@/lib/pricing-calculator";
import {
  DEFAULT_BILLING,
  DEFAULT_MODEL_ACCESS,
  DEFAULT_SEATS,
  PLAN_ORDER,
  PLANS,
  PRICING_COPY,
  TRIAL_REGISTER_URL,
  type Billing,
  type ModelAccess,
  type PlanId,
} from "@/lib/pricing.config";
import { formatEuro } from "@/lib/pricing-format";
import { localizeHref } from "@/i18n/routes";
import { useUiLocale } from "@/i18n/use-t";
import { headingClass, radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const copy = PRICING_COPY;

const priceAmountClass =
  "font-sans text-[1.875rem] leading-none md:text-[2.125rem] lg:text-[2.375rem]";

const pricingCtaClassName =
  "h-[2.6875rem] min-w-[9.5rem] px-[1.125rem] type-paragraph-m-bold";

const pricingCardGridClass =
  "relative flex h-full flex-col p-6 md:p-8 lg:grid lg:row-span-3 lg:grid-rows-subgrid";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2";

interface PricingPageProps {
  bookingHref: string;
}

interface CheckListItem {
  text: string;
  link?: { label: string; href: string };
}

function PricingCheckList({
  items,
  emphasized = false,
}: {
  items: (string | CheckListItem)[];
  emphasized?: boolean;
}) {
  const locale = useUiLocale();
  return (
    <ul className="space-y-2.5">
      {items.map((entry) => {
        const item = typeof entry === "string" ? { text: entry } : entry;
        return (
          <li key={item.text} className="flex items-start gap-2.5">
            <span
              className={cn(
                "mt-1 inline-flex size-4 shrink-0 items-center justify-center",
                emphasized
                  ? cn(radius.full, "bg-white/20 text-white")
                  : "text-blue-400",
              )}
            >
              <CheckmarkIcon className="size-2.5" />
            </span>
            <span
              className={cn(
                "type-paragraph-m",
                emphasized ? "text-white/80" : "text-text/70",
              )}
            >
              {item.text}
              {item.link ? (
                <>
                  {" "}
                  <Link
                    href={localizeHref(item.link.href, locale)}
                    className={cn(
                      "underline underline-offset-4 transition-colors",
                      emphasized
                        ? "text-white hover:text-white/75"
                        : "text-text hover:text-text/70",
                    )}
                  >
                    {item.link.label}
                  </Link>
                </>
              ) : null}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function SeatPrice({
  amount,
  label,
  note,
  emphasized,
  compact = false,
}: {
  amount: number;
  label: string;
  note: string;
  emphasized: boolean;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p
        className={cn(
          compact ? "type-paragraph-s" : "type-paragraph-m-bold",
          emphasized ? "text-white" : "text-text",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          compact
            ? "font-sans text-[1.25rem] leading-none md:text-[1.375rem]"
            : priceAmountClass,
          "tabular-nums",
          emphasized ? "text-white" : "text-text",
        )}
      >
        {formatEuro(amount)}
      </p>
      <p
        className={cn(
          compact ? "type-paragraph-s" : "type-paragraph-m",
          emphasized ? "text-white/70" : "text-text/70",
        )}
      >
        {note}
      </p>
    </div>
  );
}

function PlanCard({
  planId,
  seats,
  billing,
  access,
  href,
  className,
}: {
  planId: PlanId;
  seats: number;
  billing: Billing;
  access: ModelAccess;
  href: string;
  className?: string;
}) {
  const plan = PLANS[planId];
  const emphasized = Boolean(plan.badge);
  const total = calculateBreakdown(planId, seats, billing, access).total;
  const features = plan.features.map((feature) =>
    access === "byok" && feature.byokText
      ? { text: feature.byokText }
      : { text: feature.text, link: feature.link },
  );
  const divider = emphasized ? "border-white/25" : "border-border";
  const powerPrice = getPowerSeatPrice(planId, billing);
  const powerIncluded = access === "included";

  return (
    <Surface
      variant="card"
      className={cn(
        pricingCardGridClass,
        emphasized
          ? "border border-blue-400 bg-blue-400 text-white"
          : "border-border bg-background border border-dashed",
        className,
      )}
    >
      <div>
        {plan.badge ? (
          <span
            className={cn(
              radius.full,
              "type-paragraph-s shadow-subtle absolute -top-3.5 left-1/2 -translate-x-1/2 border border-dashed border-blue-400 bg-white px-3.5 py-1 whitespace-nowrap text-blue-900",
            )}
          >
            {plan.badge}
          </span>
        ) : null}
        <h2
          className={cn(
            headingClass.card,
            emphasized ? "text-white" : "text-text",
          )}
        >
          {plan.name}
        </h2>
        <p
          className={cn(
            "type-paragraph-m mt-2 lg:min-h-12",
            emphasized ? "text-white/80" : "text-text/70",
          )}
        >
          {plan.tagline}
        </p>
      </div>

      <div
        className={cn(
          "mt-4 flex h-full flex-col border-t border-dashed pt-4 pb-5",
          divider,
        )}
      >
        <div className="flex flex-col gap-3">
          <SeatPrice
            amount={getAverageStandardSeatPrice(planId, seats, billing, access)}
            label={copy.card.standardSeat}
            note={
              access === "included" && seats > (plan.standardBands[0].to ?? seats)
                ? copy.card.perUserAverage
                : copy.card.perUser
            }
            emphasized={emphasized}
          />
          {access === "byok" ? (
            <p
              className={cn(
                "type-paragraph-m",
                emphasized ? "text-white/80" : "text-text/70",
              )}
            >
              {copy.card.modelsNotIncludedNote}
            </p>
          ) : null}
          <p
            className={cn(
              "type-paragraph-m-bold tabular-nums",
              emphasized ? "text-white" : "text-text",
            )}
            aria-live="polite"
          >
            {copy.card.totalFor(seats, formatEuro(total))}
          </p>
        </div>
        <div className="mt-auto flex justify-center pt-3">
          <ButtonLink
            href={href}
            variant="secondary"
            className={pricingCtaClassName}
          >
            {plan.ctaLabel}
          </ButtonLink>
        </div>
      </div>

      <div
        className={cn(
          "mt-6 flex flex-1 flex-col gap-3 border-t border-dashed pt-6",
          divider,
        )}
      >
        {plan.featuresIntro ? (
          <p
            className={cn(
              "type-paragraph-m-bold",
              emphasized ? "text-white" : "text-text",
            )}
          >
            {plan.featuresIntro}
          </p>
        ) : null}
        <PricingCheckList items={features} emphasized={emphasized} />
        {powerPrice !== null ? (
          <div
            className={cn(
              radius.xs,
              "mt-3 border border-dashed p-4 transition-opacity",
              powerIncluded ? "opacity-100" : "pointer-events-none opacity-40",
              emphasized
                ? "border-white/30 bg-white/10"
                : "border-border bg-surface-muted",
            )}
            aria-disabled={!powerIncluded}
          >
            <SeatPrice
              amount={powerPrice}
              label={copy.card.powerSeat}
              note={
                powerIncluded ? copy.card.powerNote : copy.card.powerIncludedOnly
              }
              emphasized={emphasized}
              compact
            />
          </div>
        ) : null}
      </div>
    </Surface>
  );
}

function EnterpriseCard({ href }: { href: string }) {
  return (
    <Surface
      variant="card"
      className={cn(
        pricingCardGridClass,
        "border border-mid-gray bg-mid-gray text-black",
      )}
    >
      <div>
        <h2 className={cn(headingClass.card, "text-black")}>
          {copy.enterprise.title}
        </h2>
        <p className="type-paragraph-m mt-2 text-black/70 lg:min-h-12">
          {copy.enterprise.body}
        </p>
      </div>

      <div className="mt-4 flex h-full flex-col border-t border-dashed border-black/20 pt-4 pb-5">
        <div className="flex flex-col gap-3">
          <p className="font-sans text-[1.375rem] leading-snug text-black md:text-[1.5rem] lg:text-[1.625rem]">
            {copy.enterprise.price}
          </p>
          <p className="type-paragraph-m text-black/70">
            {copy.enterprise.priceNote}
          </p>
        </div>
        <div className="mt-auto flex justify-center pt-3">
          <ButtonLink
            href={href}
            variant="secondary"
            className={pricingCtaClassName}
          >
            {copy.enterprise.cta}
          </ButtonLink>
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col gap-3 border-t border-dashed border-black/20 pt-6">
        <p className="type-paragraph-m-bold text-black">
          {copy.enterprise.featuresIntro}
        </p>
        <PricingCheckList items={[...copy.enterprise.items]} />
      </div>
    </Surface>
  );
}

export function PricingPage({ bookingHref }: PricingPageProps) {
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [seats, setSeats] = useState(DEFAULT_SEATS);
  const [billing, setBilling] = useState<Billing>(DEFAULT_BILLING);
  const [access, setAccess] = useState<ModelAccess>(DEFAULT_MODEL_ACCESS);

  return (
    <Section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeader
          align="center"
          heading={copy.hero.heading}
          headingAs="h1"
          headingRole="hero"
        />
      </div>

      <Surface
        variant="card"
        className="border-border bg-background mx-auto mt-10 max-w-4xl border border-dashed p-6"
      >
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-end lg:justify-center lg:gap-10">
          <SeatsControl seats={seats} onChange={setSeats} />
          <ControlField label={copy.controls.billing}>
            <SegmentedControl<Billing>
              label={copy.controls.billing}
              value={billing}
              onChange={setBilling}
              options={[
                { value: "monthly", label: copy.controls.monthly },
                {
                  value: "annual",
                  label: copy.controls.annual,
                  badge: copy.controls.save,
                },
              ]}
            />
          </ControlField>
          <ModelsAccessControl value={access} onChange={setAccess} />
        </div>
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setBreakdownOpen(true)}
            className={cn(
              "type-paragraph-m text-text/60 hover:text-text underline underline-offset-4 transition-colors",
              focusRing,
            )}
          >
            {copy.controls.viewBreakdown}
          </button>
        </div>
      </Surface>

      <PricingBreakdownModal
        open={breakdownOpen}
        onClose={() => setBreakdownOpen(false)}
        seats={seats}
        onSeatsChange={setSeats}
        billing={billing}
        access={access}
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-0">
        {PLAN_ORDER.map((planId) => (
          <PlanCard
            key={planId}
            planId={planId}
            seats={seats}
            billing={billing}
            access={access}
            href={TRIAL_REGISTER_URL}
            className={
              PLANS[planId].badge ? "order-first lg:order-none" : undefined
            }
          />
        ))}
        <EnterpriseCard href={bookingHref} />
      </div>

      <Surface
        variant="card"
        className="bg-surface-muted mt-5 flex flex-col items-start gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8"
      >
        <div className="flex max-w-2xl flex-col gap-2">
          <h2 className={cn(headingClass.card, "text-text")}>
            {copy.trial.title}
          </h2>
          <p className="type-paragraph-m text-text/70">{copy.trial.body}</p>
        </div>
        <ButtonLink
          href={TRIAL_REGISTER_URL}
          variant="primary"
          className={cn(pricingCtaClassName, "shrink-0")}
        >
          {copy.trial.cta}
        </ButtonLink>
      </Surface>
    </Section>
  );
}
