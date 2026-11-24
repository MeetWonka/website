"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import {
  MODELS,
  PRICING_COPY,
  PROVIDER_LOGOS,
  type ModelRegion,
  type PricingModel,
} from "@/lib/pricing.config";
import { headingClass, radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const copy = PRICING_COPY.models;

const round = (n: number) => Math.round(n * 100) / 100;

function EuFlagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="12" fill="var(--color-blue-800)" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        return (
          <circle
            key={i}
            cx={round(12 + Math.cos(a) * 7)}
            cy={round(12 + Math.sin(a) * 7)}
            r="1.1"
            fill="white"
          />
        );
      })}
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  );
}

function RegionLabel({ region }: { region: ModelRegion }) {
  return (
    <span
      className={cn(
        radius.full,
        "type-paragraph-s inline-flex shrink-0 items-center gap-1.5 border border-border px-2.5 py-0.5 text-text/70",
      )}
    >
      {region === "eu" ? (
        <EuFlagIcon className="size-3.5" />
      ) : (
        <GlobeIcon className="size-3.5 text-text/60" />
      )}
      {region === "eu" ? copy.eu : copy.global}
    </span>
  );
}

function ProviderLogo({ provider }: { provider: string }) {
  const src = PROVIDER_LOGOS[provider];
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-xs border border-border bg-white">
      {src ? (
        <Image
          src={src}
          alt={provider}
          width={24}
          height={24}
          className="size-6 object-contain"
        />
      ) : (
        <span className="type-paragraph-s text-black" aria-label={provider}>
          {provider.slice(0, 2)}
        </span>
      )}
    </span>
  );
}

function ModelCard({ model }: { model: PricingModel }) {
  return (
    <Surface
      variant="card"
      className="flex h-full items-start gap-3 border border-dashed border-border bg-background p-4"
    >
      <ProviderLogo provider={model.provider} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="type-paragraph-m-bold text-text">{model.name}</p>
        <p className="type-paragraph-s text-text/60">{model.bestFor}</p>
      </div>
      <RegionLabel region={model.region} />
    </Surface>
  );
}

function groupByProvider(models: PricingModel[]) {
  const groups = new Map<string, PricingModel[]>();
  for (const model of models) {
    groups.set(model.provider, [...(groups.get(model.provider) ?? []), model]);
  }
  return [...groups.entries()];
}

export function PricingModels() {
  const [showAll, setShowAll] = useState(false);
  const listId = useId();
  const featured = MODELS.filter((model) => model.featured);

  return (
    <Section className="bg-background py-18 md:py-24">
      <SectionHeader
        align="left"
        heading={copy.title}
        body={copy.body}
        className="max-w-3xl"
        bodyClassName="max-w-2xl"
      />

      <Surface
        variant="card"
        className="mt-10 flex flex-col gap-4 bg-mid-gray p-6 text-black md:flex-row md:items-center md:gap-6 md:p-8"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xs bg-black">
          <Image
            src="/images/home/logos/wonka-logo-mark-white-transparent.png"
            alt=""
            width={24}
            height={24}
            className="size-6 object-contain"
          />
        </span>
        <div className="flex flex-col gap-2">
          <h3 className={cn(headingClass.card, "text-black")}>{copy.autoTitle}</h3>
          <p className="type-paragraph-m max-w-2xl text-black/70">{copy.autoBody}</p>
        </div>
      </Surface>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((model) => (
          <li key={model.name}>
            <ModelCard model={model} />
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <button
          type="button"
          aria-expanded={showAll}
          aria-controls={listId}
          onClick={() => setShowAll((value) => !value)}
          className="type-paragraph-m-bold text-text underline underline-offset-4 transition-colors hover:text-text/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          {showAll ? copy.hideAll : copy.showAll}
        </button>
      </div>

      {showAll ? (
        <div id={listId} className="mt-8 flex flex-col gap-8">
          {groupByProvider(MODELS).map(([provider, models]) => (
            <div key={provider} className="border-t border-dashed border-border pt-6">
              <h3 className="type-paragraph-m-bold text-text">{provider}</h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {models.map((model) => (
                  <li key={model.name}>
                    <ModelCard model={model} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </Section>
  );
}
