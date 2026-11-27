"use client";

import { useId, useState, type ReactNode } from "react";
import { SegmentedControl } from "@/components/sections/pricing-segmented-control";
import { clampSeats } from "@/lib/pricing-calculator";
import {
  PRICING_COPY,
  SEAT_PRESETS,
  type ModelAccess,
} from "@/lib/pricing.config";
import { radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export function ControlField({
  label,
  labelFor,
  className,
  children,
}: {
  label: ReactNode;
  labelFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const LabelTag = labelFor ? "label" : "p";
  return (
    <div className={cn("flex flex-col items-center gap-2 lg:items-start", className)}>
      <LabelTag
        {...(labelFor ? { htmlFor: labelFor } : {})}
        className="type-paragraph-s text-text/60"
      >
        {label}
      </LabelTag>
      {children}
    </div>
  );
}

function ModelsAccessInfo({ access }: { access: ModelAccess }) {
  const tooltipId = useId();
  const controls = PRICING_COPY.controls;
  const tooltip =
    access === "included"
      ? controls.includedTooltip
      : controls.notIncludedTooltip;

  return (
    <span className="group/info relative inline-flex align-middle">
      <button
        type="button"
        aria-describedby={tooltipId}
        className="text-text/45 hover:text-text/70 inline-flex size-4 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
      >
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
          <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.25" />
          <path
            fill="currentColor"
            d="M7.25 7h1.5v4.75H7.25V7Zm0-2.5h1.5V6.5H7.25V4.5Z"
          />
        </svg>
      </button>
      <span
        id={tooltipId}
        role="tooltip"
        className={cn(
          radius.sm,
          "border-border bg-background pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-[max(16rem,18vw)] -translate-x-1/2 border border-dashed p-3 text-left opacity-0 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-opacity group-focus-within/info:pointer-events-auto group-focus-within/info:opacity-100 group-hover/info:pointer-events-auto group-hover/info:opacity-100",
        )}
      >
        <span className="type-paragraph-s text-text/80 block">{tooltip}</span>
      </span>
    </span>
  );
}

export function ModelsAccessControl({
  value,
  onChange,
  className,
}: {
  value: ModelAccess;
  onChange: (value: ModelAccess) => void;
  className?: string;
}) {
  const controls = PRICING_COPY.controls;
  return (
    <ControlField
      label={
        <span className="inline-flex items-center gap-1.5">
          {controls.models}
          <ModelsAccessInfo access={value} />
        </span>
      }
      className={className}
    >
      <SegmentedControl<ModelAccess>
        label={controls.models}
        value={value}
        onChange={onChange}
        options={[
          { value: "included", label: controls.included },
          { value: "byok", label: controls.notIncluded },
        ]}
      />
    </ControlField>
  );
}

export function SeatsControl({
  seats,
  onChange,
  className,
}: {
  seats: number;
  onChange: (seats: number) => void;
  className?: string;
}) {
  const inputId = useId();
  const [draft, setDraft] = useState(String(seats));
  const [prevSeats, setPrevSeats] = useState(seats);
  if (seats !== prevSeats) {
    setPrevSeats(seats);
    setDraft(String(seats));
  }

  return (
    <ControlField
      label={PRICING_COPY.controls.seats}
      labelFor={inputId}
      className={className}
    >
      <div className="flex items-center gap-2">
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          value={draft}
          onChange={(event) => {
            const value = event.target.value;
            if (value !== "" && !/^\d+$/.test(value)) return;
            setDraft(value);
            if (value !== "") onChange(clampSeats(Number(value)));
          }}
          onBlur={() => setDraft(String(seats))}
          className={cn(
            radius.sm,
            "border-border bg-background type-paragraph-m text-text h-[2.375rem] w-20 border border-dashed px-2 text-center tabular-nums focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:outline-none",
          )}
        />
        <SegmentedControl<string>
          label={PRICING_COPY.controls.seats}
          value={String(seats)}
          options={SEAT_PRESETS.map((preset) => ({
            value: String(preset),
            label: String(preset),
          }))}
          onChange={(value) => onChange(Number(value))}
        />
      </div>
    </ControlField>
  );
}
