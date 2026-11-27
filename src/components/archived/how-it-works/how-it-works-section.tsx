"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FadeIn } from "@/components/animations/fade-in";
import { TiltCard } from "@/components/ui/tilt-card";
import { ArrowRightIcon } from "@/components/ui/icons/arrow-right";
import { Step1Visual } from "./step-1-visual";
import { Step2Visual } from "./step-2-visual";
import { Step3Visual } from "./step-3-visual";
import { cn } from "@/lib/utils";

const EYEBROW = "How it works";
const HEADING = "From request to done.\nNot suggested.";

export const ARCHIVED_HOW_IT_WORKS_COPY = { eyebrow: EYEBROW, heading: HEADING };

interface Step {
  title: string;
  body: string;
  variant: "trapezoid" | "rectangle";
  mirror?: boolean;
  svgFillClassName: string;
  divBgClassName: string;
}

const STEPS: Step[] = [
  {
    title: "Say it.",
    body: "Write what needs to happen. Like you would to a colleague. “Create an opportunity in Odoo. Add this summary. Create a sales order.”",
    variant: "trapezoid",
    svgFillClassName: "fill-light-gray",
    divBgClassName: "bg-light-gray",
  },
  {
    title: "Wonka acts.",
    body: "Wonka pulls the data, sees what needs to be done, and does it. CRM updated. Notes added. Orders registered.",
    variant: "rectangle",
    svgFillClassName: "fill-mid-gray",
    divBgClassName: "bg-mid-gray",
  },
  {
    title: "It becomes how work’s done.",
    body: "Do it once. It runs every time. Work no longer waits for someone to push it forward.",
    variant: "trapezoid",
    mirror: true,
    svgFillClassName: "fill-light-gray",
    divBgClassName: "bg-light-gray",
  },
];

function StepText({ index, title, body }: { index: number; title: string; body: string }) {
  return (
    <div className="flex flex-col items-start gap-3 pr-0 lg:pr-12">
      <span className="type-eyebrow rounded-full bg-dark-brown px-2.5 py-1 text-white">
        Step {index + 1}
      </span>
      <h3 className="type-h6 text-text">{title}</h3>
      <p className="type-body text-text opacity-80">{body}</p>
    </div>
  );
}

export function ArchivedHowItWorksSection({ id }: { id?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
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

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <Section id={id} className="py-20 md:py-30" aria-labelledby="how-it-works-heading">
      <div className="flex flex-col gap-16">
        <div ref={headerRef} className="flex flex-col items-center gap-6">
          <FadeIn play={headerInView}>
            <Eyebrow>{EYEBROW}</Eyebrow>
          </FadeIn>
          <FadeIn play={headerInView} delay={0.1}>
            <h2
              id="how-it-works-heading"
              className="type-h4 max-w-[44.875rem] text-center text-text"
            >
              From request to done.
              <br />
              Not suggested.
            </h2>
          </FadeIn>
        </div>

        <ol ref={cardsRef} className="hidden w-full grid-cols-3 lg:grid">
          {STEPS.map((step, i) => (
            <li key={i} className="px-[0.4375rem] py-[0.375rem]">
              <FadeIn
                play={cardsInView}
                delay={i * 0.12}
                className="flex min-w-0 flex-col gap-6"
              >
                <TiltCard
                  variant={step.variant}
                  mirror={step.mirror}
                  fillClassName={step.variant === "trapezoid" ? step.svgFillClassName : step.divBgClassName}
                  strokeClassName="stroke-border"
                >
                  {i === 0 ? <Step1Visual /> : i === 1 ? <Step2Visual /> : <Step3Visual />}
                </TiltCard>
                <StepText index={i} title={step.title} body={step.body} />
              </FadeIn>
            </li>
          ))}
        </ol>

        <div className="flex flex-col gap-6 lg:hidden" aria-hidden="true">
          <div ref={emblaRef} className="-mx-6 overflow-hidden md:-mx-8">
            <ol className="flex sm:pl-6 md:pl-8">
              {STEPS.map((step, i) => (
                <li
                  key={i}
                  className="flex min-w-0 shrink-0 grow-0 basis-full flex-col gap-6 px-6 sm:basis-[70%] sm:px-0 sm:pr-6 md:basis-[55%] md:pr-8"
                >
                  <TiltCard
                    variant="rectangle"
                    fillClassName={step.divBgClassName}
                  >
                    {i === 0 ? <Step1Visual /> : i === 1 ? <Step2Visual /> : <Step3Visual />}
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
