"use client";

import { useId, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { PricingBreakdownModal } from "@/components/sections/pricing-breakdown-modal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import { CheckmarkIcon } from "@/components/ui/icons/checkmark-icon";
import { calculatePricing } from "@/lib/pricing-calculator";
import { formatEuro } from "@/lib/pricing-format";
import { radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const MIN_SEATS = 1;
const MAX_SEATS = 1000;
const SEAT_PRESETS = [25, 100, 250] as const;

function clampSeats(value: number) {
  if (!Number.isFinite(value)) return MIN_SEATS;
  return Math.min(MAX_SEATS, Math.max(MIN_SEATS, Math.round(value)));
}

const TOGGLE_GRADIENT =
  "radial-gradient(ellipse 70% 110% at 65% 115%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 65%)";

const priceAmountClass =
  "font-sans text-[1.875rem] leading-none md:text-[2.125rem] lg:text-[2.375rem]";

const pricingCtaClassName =
  "h-[2.6875rem] min-w-[9.5rem] px-[1.125rem] type-paragraph-m-bold";

const TRIAL_REGISTER_URL = "https://wonka.chat/register";

interface PricingPageProps {
  bookingHref: string;
}

function PriceDisplay({
  amount,
  className,
  inverted = false,
}: {
  amount: number;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <p
      className={cn(
        priceAmountClass,
        "tabular-nums",
        inverted ? "text-white" : "text-text",
        className,
      )}
    >
      {formatEuro(amount)}
    </p>
  );
}

function PricingTierBlock({
  amount,
  seatLabel,
  billingNote,
  description,
  inverted = false,
}: {
  amount: number;
  seatLabel: string;
  billingNote: string;
  description?: React.ReactNode;
  inverted?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <PriceDisplay amount={amount} inverted={inverted} />
      <p
        className={cn(
          "type-paragraph-m-bold",
          inverted ? "text-white" : "text-text",
        )}
      >
        {seatLabel}
      </p>
      {description ? (
        <p
          className={cn(
            "type-paragraph-m",
            inverted ? "text-white/70" : "text-text/70",
          )}
        >
          {description}
        </p>
      ) : null}
      <p
        className={cn(
          "type-paragraph-m",
          inverted ? "text-white/70" : "text-text/70",
        )}
      >
        {billingNote}
      </p>
    </div>
  );
}

function Toggle({
  id,
  label,
  checked,
  onChange,
  inverted = false,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  inverted?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <label
        id={`${id}-label`}
        htmlFor={id}
        className={cn(
          "type-paragraph-m",
          inverted ? "text-white/70" : "text-text/70",
        )}
      >
        {label}
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          inverted
            ? checked
              ? "bg-white focus-visible:ring-white focus-visible:ring-offset-blue-400"
              : "bg-mid-gray focus-visible:ring-white/50 focus-visible:ring-offset-blue-400"
            : "bg-light-gray focus-visible:ring-blue-400 focus-visible:ring-offset-2",
        )}
      >
        {checked && !inverted ? (
          <>
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-blue-400"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{ background: TOGGLE_GRADIENT }}
            />
          </>
        ) : null}
        <span
          aria-hidden
          className={cn(
            "relative inline-block size-4 rounded-full shadow-subtle transition-transform",
            inverted
              ? checked
                ? "translate-x-6 bg-dark-gray"
                : "translate-x-1 bg-white"
              : checked
                ? "translate-x-6 bg-white"
                : "translate-x-1 bg-white",
          )}
        />
      </button>
    </div>
  );
}

function SeatPresetButtons({
  seats,
  onSelect,
}: {
  seats: number;
  onSelect: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {SEAT_PRESETS.map((preset) => {
        const selected = seats === preset;

        return (
          <button
            key={preset}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(preset)}
            className={cn(
              radius.full,
              "min-w-[2.25rem] px-2 py-1 type-paragraph-s tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
              selected
                ? "bg-text text-white"
                : "bg-light-gray text-text/60 hover:text-text",
            )}
          >
            {preset}
          </button>
        );
      })}
    </div>
  );
}

function BillingCycleToggle({
  annual,
  onChange,
}: {
  annual: boolean;
  onChange: (annual: boolean) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Billing cycle"
      className={cn(
        radius.full,
        "inline-flex border bg-light-gray p-1 transition-colors",
        annual ? "border-blue-400" : "border-transparent",
      )}
    >
      <button
        type="button"
        aria-pressed={!annual}
        onClick={() => onChange(false)}
        className={cn(
          radius.full,
          "px-4 py-1.5 type-paragraph-m transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
          !annual ? "bg-white text-text shadow-subtle" : "text-text/60",
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        aria-pressed={annual}
        onClick={() => onChange(true)}
        className={cn(
          radius.full,
          "flex items-center gap-1.5 px-3 py-1.5 type-paragraph-m transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
          annual ? "bg-white text-text shadow-subtle" : "text-text/60",
        )}
      >
        Annual
        <span
          className={cn(
            radius.full,
            "type-paragraph-s bg-blue-100 px-1.5 py-0.5 text-blue-900",
          )}
        >
          Save 20%
        </span>
      </button>
    </div>
  );
}

function PricingCheckList({
  items,
  variant = "default",
}: {
  items: string[];
  variant?: "default" | "emphasized" | "inverted";
}) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span
            className={cn(
              "mt-0.5 inline-flex size-4 shrink-0 items-center justify-center",
              variant === "default" && "text-blue-400",
              variant === "emphasized" &&
                cn(radius.full, "bg-white/20 text-white"),
              variant === "inverted" &&
                cn(radius.full, "bg-white/10 text-white/80"),
            )}
          >
            <CheckmarkIcon className="size-2.5" />
          </span>
          <span
            className={cn(
              "type-paragraph-m",
              variant === "default" ? "text-text/70" : "text-white/75",
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PricingFeatureSection({
  title,
  children,
  variant = "default",
}: {
  title: string;
  children: React.ReactNode;
  variant?: "default" | "emphasized" | "inverted";
}) {
  return (
    <div
      className={cn(
        "border-t border-dashed pt-4",
        variant === "default" && "border-border",
        (variant === "emphasized" || variant === "inverted") &&
          "border-white/25",
      )}
    >
      <p
        className={cn(
          "type-eyebrow",
          variant === "default" && "text-text/45",
          variant === "emphasized" && "text-white/55",
          variant === "inverted" && "text-white/45",
        )}
      >
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function PricingCard({
  title,
  badge,
  children,
  className,
  emphasized = false,
  inverted = false,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
  emphasized?: boolean;
  inverted?: boolean;
}) {
  return (
    <Surface
      variant="card"
      className={cn(
        "flex h-full flex-col p-6",
        emphasized &&
          "border border-blue-400 bg-blue-400 text-white",
        inverted && "border border-black bg-black text-white",
        !emphasized &&
          !inverted &&
          "border border-dashed border-border bg-background",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h2
          className={cn(
            "type-paragraph-m-bold",
            emphasized || inverted ? "text-white" : "text-text",
          )}
        >
          {title}
        </h2>
        {badge ? (
          <span
            className={cn(
              radius.full,
              "type-eyebrow shrink-0 px-2.5 py-1",
              emphasized && "bg-white/20 text-white",
              inverted && "bg-white/10 text-white/70",
              !emphasized &&
                !inverted &&
                "bg-blue-100 text-blue-900",
            )}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <div className="mt-5 flex flex-1 flex-col gap-4">{children}</div>
    </Surface>
  );
}

export function PricingPage({ bookingHref }: PricingPageProps) {
  const seatsInputId = useId();
  const aiModelsToggleId = useId();
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [seats, setSeats] = useState(MIN_SEATS);
  const [seatsInput, setSeatsInput] = useState(String(MIN_SEATS));
  const [annual, setAnnual] = useState(true);
  const [aiModelsIncluded, setAiModelsIncluded] = useState(true);

  const pricing = calculatePricing(seats, annual, aiModelsIncluded);

  const workspaceItems = aiModelsIncluded
    ? [
        "Secure AI chat grounded in company knowledge",
        "Approved tools and data connections",
        "Governance and audit logs",
        "EU-hosted AI models with no usage bills",
      ]
    : [
        "Secure AI chat grounded in company knowledge",
        "Approved tools and data connections",
        "Governance and audit logs",
        "Use your own model API key and provider billing",
      ];

  return (
    <Section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeader
          align="center"
          heading="One workspace. Pricing that scales with your team."
          body="Choose your team size and usage level. Every paid seat includes the controls needed to use AI safely at work."
          headingAs="h1"
          headingRole="hero"
        />
      </div>

      <Surface
        variant="card"
        className="mx-auto mt-10 max-w-3xl border border-dashed border-border bg-white p-6"
      >
        <div className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
          <p className="type-paragraph-m-bold text-text">Build your plan</p>
          <button
            type="button"
            onClick={() => setBreakdownOpen(true)}
            className="type-paragraph-m text-text/60 underline underline-offset-4 transition-colors hover:text-text"
          >
            View pricing breakdown
          </button>
        </div>
        <div className="mt-5 flex flex-col items-center gap-6 lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-10 lg:gap-y-4">
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 md:justify-start">
              <label
                htmlFor={seatsInputId}
                className="type-paragraph-m text-text/70"
              >
                Seats
              </label>
              <input
                id={seatsInputId}
                type="text"
                inputMode="numeric"
                value={seatsInput}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value !== "" && !/^\d+$/.test(value)) return;

                  setSeatsInput(value);
                  if (value !== "") {
                    setSeats(clampSeats(Number(value)));
                  }
                }}
                onBlur={() => {
                  if (seatsInput === "") {
                    setSeats(MIN_SEATS);
                    setSeatsInput(String(MIN_SEATS));
                    return;
                  }

                  const parsed = clampSeats(Number(seatsInput));
                  setSeats(parsed);
                  setSeatsInput(String(parsed));
                }}
                className={cn(
                  radius.sm,
                  "w-24 border border-dashed border-border bg-background px-2 py-1.5 text-center type-paragraph-m tabular-nums text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
                )}
              />
              <SeatPresetButtons
                seats={seats}
                onSelect={(value) => {
                  const next = clampSeats(value);
                  setSeats(next);
                  setSeatsInput(String(next));
                }}
              />
            </div>

          <div className="flex shrink-0 justify-center lg:justify-start">
              <BillingCycleToggle annual={annual} onChange={setAnnual} />
            </div>
        </div>
      </Surface>

      <PricingBreakdownModal
        open={breakdownOpen}
        onClose={() => setBreakdownOpen(false)}
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <PricingCard
          title="Free trial"
          badge="7 DAYS"
          className="order-1 bg-light-gray"
        >
          <p className={cn(priceAmountClass, "text-text")}>Free</p>
          <p className="type-paragraph-m text-text/70">
            Test Wonka with a real company use case. No credit card required.
          </p>
          <PricingFeatureSection title="Included in your trial">
            <PricingCheckList
              variant="default"
              items={[
                "Full AI Workspace access",
                "Secure AI chat with company knowledge",
                "€5 in included AI usage",
              ]}
            />
          </PricingFeatureSection>
          <div className="mt-auto flex justify-center pt-2">
            <ButtonLink
              href={TRIAL_REGISTER_URL}
              variant="secondary"
              className={pricingCtaClassName}
            >
              Get started
            </ButtonLink>
          </div>
        </PricingCard>

        <PricingCard
          title="AI Workspace"
          badge="RECOMMENDED"
          emphasized
          className="order-2"
        >
          <PricingTierBlock
            amount={pricing.perSeatMonth}
            seatLabel="Standard seat"
            billingNote="Per user / month (excl. VAT)"
            inverted
          />

          <div className="mt-6">
            <Toggle
              id={aiModelsToggleId}
              label="AI models included"
              checked={aiModelsIncluded}
              onChange={setAiModelsIncluded}
              inverted
            />
          </div>

          <PricingFeatureSection title="Everything your team needs" variant="emphasized">
            <PricingCheckList items={workspaceItems} variant="emphasized" />
          </PricingFeatureSection>

          <div className="mt-auto flex justify-center pt-2">
            <ButtonLink
              href={bookingHref}
              variant="secondary"
              className={pricingCtaClassName}
            >
              Get started
            </ButtonLink>
          </div>
        </PricingCard>

        <PricingCard title="Enterprise" badge="1,000+ SEATS" inverted className="order-3">
          <p className={cn(priceAmountClass, "text-white")}>Custom</p>
          <p className="type-paragraph-m text-white/70">
            Dedicated infrastructure and deployment for complex organisations.
          </p>
          <PricingFeatureSection title="Built for your environment" variant="inverted">
            <PricingCheckList
              variant="inverted"
              items={[
                "Everything in AI Workspace",
                "Managed cloud, own cloud, or on-premise",
                "Deployment tailored to security requirements",
                "Volume pricing for large teams",
              ]}
            />
          </PricingFeatureSection>
          <div className="mt-auto flex justify-center pt-2">
            <ButtonLink
              href={bookingHref}
              variant="secondary"
              className={pricingCtaClassName}
            >
              Talk to sales
            </ButtonLink>
          </div>
        </PricingCard>
      </div>
    </Section>
  );
}
