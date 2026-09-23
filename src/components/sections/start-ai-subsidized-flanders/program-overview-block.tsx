import type { ComponentType, ReactNode, SVGProps } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export interface ProgramStep {
  _key: string;
  title: string;
  body: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

function IconCircle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-900 md:size-14",
        className,
      )}
      aria-hidden
    >
      {children}
    </span>
  );
}

function BlockImage({
  src,
  alt,
}: {
  src?: string;
  alt?: string;
}) {
  if (!src) {
    return (
      <Surface
        variant="card"
        className="relative min-h-[18rem] bg-mid-gray md:min-h-full"
        aria-hidden
      >
        <div className="flex h-full min-h-[inherit] items-center justify-center px-6 py-12">
          <span className="type-paragraph-m text-text/35">Afbeelding volgt</span>
        </div>
      </Surface>
    );
  }

  return (
    <Surface
      variant="card"
      className="relative h-full min-h-[18rem] overflow-hidden"
    >
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes="(min-width: 768px) 42vw, 100vw"
        className="object-cover object-center"
        unoptimized
      />
    </Surface>
  );
}

export function StepList({
  steps,
  variant = "icon",
  numberStart = 1,
}: {
  steps: ProgramStep[];
  variant?: "icon" | "numbered";
  numberStart?: number;
}) {
  return (
    <ul className="flex flex-col gap-10 md:gap-12">
      {steps.map((step, index) => (
        <li
          key={step._key}
          className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3"
        >
          {variant === "numbered" ? (
            <IconCircle className="row-start-1 self-center">
              <span className="font-sans type-h6 tabular-nums">
                {numberStart + index}
              </span>
            </IconCircle>
          ) : step.Icon ? (
            <IconCircle className="row-start-1 self-center">
              <step.Icon className="size-5 md:size-6" />
            </IconCircle>
          ) : null}
          <h2
            className={cn(
              headingClass.card,
              "row-start-1 self-center text-blue-900",
            )}
          >
            {step.title}
          </h2>
          <p className="col-start-2 row-start-2 type-paragraph-m text-text/70">
            {step.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

interface ProgramOverviewBlockProps {
  steps: ProgramStep[];
  mirrored?: boolean;
  stepVariant?: "icon" | "numbered";
  numberStart?: number;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function ProgramOverviewBlock({
  steps,
  mirrored = false,
  stepVariant = "icon",
  numberStart = 1,
  imageSrc,
  imageAlt,
  className,
}: ProgramOverviewBlockProps) {
  return (
    <Section className={className}>
      <div className="grid gap-10 md:grid-cols-2 md:items-stretch md:gap-12 lg:gap-16">
        <div className={cn(mirrored ? "order-2 md:order-2" : "order-1 md:order-1")}>
          <StepList steps={steps} variant={stepVariant} numberStart={numberStart} />
        </div>
        <div
          className={cn(
            "h-full min-h-[18rem]",
            mirrored ? "order-1 md:order-1" : "order-2 md:order-2",
          )}
        >
          <BlockImage src={imageSrc} alt={imageAlt} />
        </div>
      </div>
    </Section>
  );
}
