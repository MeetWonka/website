"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { Step1Visual } from "@/components/archived/how-it-works/step-1-visual";
import { Step2Visual } from "@/components/archived/how-it-works/step-2-visual";
import { Step3Visual } from "@/components/archived/how-it-works/step-3-visual";
import { FadeIn } from "@/components/animations/fade-in";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowRightIcon } from "@/components/ui/icons/arrow-right";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TiltCard } from "@/components/ui/tilt-card";
import { resolveImageAlt, resolveImageSrc } from "@/lib/cms-image";
import { headingClass } from "@/lib/design-tokens";
import { hasSanityImage } from "@/lib/resolve-cms";
import type {
  WorkflowStepResolved,
  WorkflowStepsData,
} from "@/lib/types/page-sections";
import { cn } from "@/lib/utils";

interface WorkflowStepsProps {
  data: WorkflowStepsData;
  id?: string;
  className?: string;
}

function StepVisual({
  step,
}: {
  step: WorkflowStepResolved;
}) {
  const fallback = step.fallbackImage ?? { src: "", alt: "" };
  const imageSrc = resolveImageSrc(step.image, fallback);

  if (imageSrc) {
    return (
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={resolveImageAlt(step.image, fallback)}
          fill
          sizes="(min-width: 1024px) 33vw, 80vw"
          className="object-cover object-center"
          unoptimized={!hasSanityImage(step.image)}
        />
      </div>
    );
  }

  if (step.visual === "step2") return <Step2Visual />;
  if (step.visual === "step3") return <Step3Visual />;
  return <Step1Visual />;
}

function StepText({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col items-start gap-3 pr-0 lg:pr-12">
      <span className="type-eyebrow rounded-full bg-dark-brown px-2.5 py-1 text-white">
        Step {index + 1}
      </span>
      <h3 className={headingClass.card}>{title}</h3>
      <p className="type-body text-text opacity-80">{body}</p>
    </div>
  );
}

export function WorkflowSteps({ data, id, className }: WorkflowStepsProps) {
  const headingId = id ? `${id}-heading` : "workflow-steps-heading";
  const header = data.header;
  const steps = data.steps ?? [];
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const cardsRef = useRef<HTMLOListElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!emblaApi) return;
    const handler = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    queueMicrotask(handler);
    emblaApi.on("select", handler);
    emblaApi.on("reInit", handler);
    return () => {
      emblaApi.off("select", handler);
      emblaApi.off("reInit", handler);
    };
  }, [emblaApi]);

  if (!header?.heading && steps.length === 0) {
    return null;
  }

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <Section
      id={id}
      className={className ?? "py-20 md:py-30"}
      aria-labelledby={headingId}
    >
      <div className="flex flex-col gap-16">
        <div ref={headerRef} className="flex flex-col items-center gap-6">
          {header?.heading ? (
          <FadeIn play={headerInView}>
            <SectionHeader
              align="center"
              className="mx-auto max-w-3xl"
              eyebrow={
                header.eyebrow ? (
                  <Eyebrow>{header.eyebrow}</Eyebrow>
                ) : undefined
              }
              heading={header.heading}
              body={header.body ?? undefined}
              headingId={headingId}
              bodyClassName="max-w-2xl type-body text-text/65 opacity-100"
            />
          </FadeIn>
        ) : null}
        </div>

        <ol ref={cardsRef} className="hidden w-full grid-cols-3 lg:grid">
          {steps.map((step, i) => (
            <li key={step._key} className="px-[0.4375rem] py-[0.375rem]">
              <FadeIn
                play={cardsInView}
                delay={i * 0.12}
                className="flex min-w-0 flex-col gap-6"
              >
                <TiltCard
                  variant={step.variant}
                  mirror={step.mirror}
                  fillClassName={
                    step.variant === "trapezoid"
                      ? step.svgFillClassName
                      : step.divBgClassName
                  }
                  strokeClassName="stroke-border"
                >
                  <StepVisual step={step} />
                </TiltCard>
                <StepText index={i} title={step.title} body={step.body} />
              </FadeIn>
            </li>
          ))}
        </ol>

        <div className="flex flex-col gap-6 lg:hidden">
          <div ref={emblaRef} className="-mx-6 overflow-hidden md:-mx-8">
            <ol className="flex sm:pl-6 md:pl-8">
              {steps.map((step, i) => (
                <li
                  key={step._key}
                  className="flex min-w-0 shrink-0 grow-0 basis-full flex-col gap-6 px-6 sm:basis-[70%] sm:px-0 sm:pr-6 md:basis-[55%] md:pr-8"
                >
                  <TiltCard
                    variant="rectangle"
                    fillClassName={step.divBgClassName}
                  >
                    <StepVisual step={step} />
                  </TiltCard>
                  <StepText index={i} title={step.title} body={step.body} />
                </li>
              ))}
            </ol>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canPrev}
              aria-label="Previous step"
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-full border border-border text-text transition-opacity",
                !canPrev && "opacity-30",
              )}
            >
              <ArrowRightIcon className="h-2.5 w-3.5 -scale-x-100" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canNext}
              aria-label="Next step"
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-full border border-border text-text transition-opacity",
                !canNext && "opacity-30",
              )}
            >
              <ArrowRightIcon className="h-2.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
