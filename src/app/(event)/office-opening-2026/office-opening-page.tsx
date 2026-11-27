"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useInView,
} from "motion/react";
import { FadeIn } from "@/components/animations/fade-in";
import { ButtonLink } from "@/components/ui/button";
import { ChevronDownIcon } from "@/components/ui/icons/chevron-down";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import {
  trackOfficeOpeningRegisterClick,
  type OfficeOpeningRegisterPlacement,
} from "@/lib/analytics";
import { headingClass, radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import type {
  OfficeOpeningContent,
  ScrollPanelType,
} from "./page";

interface OfficeOpeningPageProps {
  content: OfficeOpeningContent;
  registrationUrl: string;
}

const TRIGGER_RATIO = 0.42;

const accentText = "text-light-brown";
const accentRing = "ring-light-brown/30";
const accentBorder = "border-light-brown/20";
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-brown";

function Portrait({
  src,
  alt,
  initials,
  size = "lg",
  className,
}: {
  src: string;
  alt: string;
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center bg-gradient-to-br from-dark-brown via-light-brown/50 to-black text-white",
          size === "sm" && "size-10 rounded-full type-paragraph-s font-medium",
          size === "md" &&
            "size-16 rounded-full type-paragraph-m-bold font-medium",
          size === "lg" &&
            cn(radius.sm, "aspect-[4/5] w-full max-w-[14rem] type-h5"),
          className,
        )}
      >
        {initials}
      </div>
    );
  }

  if (size === "sm") {
    return (
      <div className={cn("relative size-10 shrink-0 overflow-hidden rounded-full bg-white/10 ring-2", accentRing, className)}>
        <Image
          src={src}
          alt={alt}
          width={40}
          height={40}
          className="size-10 object-cover"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  if (size === "md") {
    return (
      <div className={cn("relative size-16 shrink-0 overflow-hidden rounded-full bg-white/10 ring-2", accentRing, className)}>
        <Image
          src={src}
          alt={alt}
          width={64}
          height={64}
          className="size-16 object-cover"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        radius.sm,
        "relative aspect-[4/5] w-full max-w-[14rem] shrink-0 overflow-hidden bg-white/10 ring-1 ring-light-brown/20",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(min-width: 768px) 224px, 60vw"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function RegisterButton({
  href,
  label,
  placement,
  className,
}: {
  href: string;
  label: string;
  placement: OfficeOpeningRegisterPlacement;
  className?: string;
}) {
  return (
    <ButtonLink
      href={href}
      variant="primary"
      target="_blank"
      rel="noopener noreferrer"
      className={cn("w-full justify-center sm:w-auto", className)}
      onClick={() => trackOfficeOpeningRegisterClick(placement)}
    >
      {label}
    </ButtonLink>
  );
}

function HighlightIcon({
  id,
  className,
}: {
  id: OfficeOpeningContent["highlights"][number]["id"];
  className?: string;
}) {
  const props = {
    className: cn("size-5 shrink-0", accentText, className),
    "aria-hidden": true as const,
  };

  switch (id) {
    case "date":
      return (
        <svg viewBox="0 0 20 20" fill="none" {...props}>
          <rect x="2.5" y="4" width="15" height="13.5" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
          <path d="M2.5 8h15M6.5 2.5v3M13.5 2.5v3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );
    case "time":
      return (
        <svg viewBox="0 0 20 20" fill="none" {...props}>
          <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.25" />
          <path d="M10 6v4.25l2.75 1.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );
    case "location":
      return (
        <svg viewBox="0 0 20 20" fill="none" {...props}>
          <path d="M10 17.5s5.5-4.75 5.5-9A5.5 5.5 0 1 0 4.5 8.5c0 4.25 5.5 9 5.5 9Z" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="10" cy="8.5" r="1.75" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      );
    case "spots":
      return (
        <svg viewBox="0 0 20 20" fill="none" {...props}>
          <path d="M4.5 7.5 10 4l5.5 3.5v6.75a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V7.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M8 11.25h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );
  }
}

function HighlightItem({
  item,
  mapsUrl,
  compact = false,
  className,
}: {
  item: OfficeOpeningContent["highlights"][number];
  mapsUrl: string;
  compact?: boolean;
  className?: string;
}) {
  const valueClass = compact
    ? "type-paragraph-s mt-0.5 break-words text-light-gray"
    : "type-paragraph-m mt-1 break-words text-light-gray";

  const value =
    item.id === "location" ? (
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          valueClass,
          "underline underline-offset-4 transition-opacity hover:opacity-80",
          focusRing,
        )}
      >
        {item.value}
      </a>
    ) : (
      <p className={valueClass}>{item.value}</p>
    );

  return (
    <li className={cn("flex min-w-0", compact ? "gap-3" : "gap-3.5", className)}>
      <HighlightIcon id={item.id} className="mt-0.5" />
      <div className="min-w-0 flex-1">
        <p className="type-eyebrow text-light-brown">{item.label}</p>
        {value}
      </div>
    </li>
  );
}

function QuickInfoPanel({
  content,
  className,
}: {
  content: OfficeOpeningContent;
  className?: string;
}) {
  return (
    <PanelShell className={className}>
      <p className="type-eyebrow text-light-brown">Quick info</p>
      <ul className="mt-5 space-y-4">
        {content.highlights.map((item) => (
          <HighlightItem
            key={item.id}
            item={item}
            mapsUrl={content.practical.mapsUrl}
            compact
          />
        ))}
      </ul>
    </PanelShell>
  );
}

function HeroBackground({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-[center_30%] sm:object-[center_35%]"
          sizes="100vw"
          priority
          onError={() => setFailed(true)}
        />
      ) : null}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/90 from-0% via-black/55 via-45% to-black/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(0,0,0,0.18),transparent_60%)]" />
    </div>
  );
}

function ScrollDownHint({
  visible,
  targetId,
}: {
  visible: boolean;
  targetId: string;
}) {
  const reduce = useReducedMotion();

  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-light-brown/70 transition-opacity duration-500 motion-reduce:animate-none md:bottom-8",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
        !reduce && "animate-bounce",
      )}
      aria-label="Scroll to event details"
    >
      <span className="type-paragraph-s">Scroll</span>
      <ChevronDownIcon className="size-3" />
    </a>
  );
}

function PanelShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Surface
      variant="card"
      className={cn(
        radius.sm,
        accentBorder,
        "border bg-gradient-to-br from-dark-brown/90 via-black/70 to-black/90 p-5 shadow-[0_0_3rem_rgba(118,118,107,0.08)] backdrop-blur-md sm:p-6 md:p-8",
        className,
      )}
    >
      {children}
    </Surface>
  );
}

function ScrollPanel({
  type,
  content,
  registrationUrl,
}: {
  type: ScrollPanelType;
  content: OfficeOpeningContent;
  registrationUrl: string;
}) {
  switch (type) {
    case "highlights":
      return (
        <PanelShell>
          <p className="type-eyebrow text-light-brown">At a glance</p>
          <ul className="mt-6 space-y-5">
            {content.highlights.map((item) => (
              <HighlightItem
                key={item.id}
                item={item}
                mapsUrl={content.practical.mapsUrl}
              />
            ))}
          </ul>
        </PanelShell>
      );

    case "speaker":
      return (
        <PanelShell>
          <Portrait
            src={content.guestSpeaker.image}
            alt={content.guestSpeaker.name}
            initials={content.guestSpeaker.initials}
            size="lg"
            className="mx-auto max-w-[11rem] ring-2 ring-light-brown/35 sm:mx-0"
          />
          <div className="text-center sm:text-left">
            <p className="type-eyebrow mt-6 text-light-brown">
              {content.guestSpeaker.label}
            </p>
            <p className={cn(headingClass.card, "mt-2 text-white")}>
              {content.guestSpeaker.name}
            </p>
            <p className="type-paragraph-m mt-1 text-light-gray/75">
              {content.guestSpeaker.role}
            </p>
          </div>
        </PanelShell>
      );

    case "programme":
      return (
        <PanelShell>
          <p className="type-eyebrow text-light-brown">Programme</p>
          <ol className="mt-6 space-y-0 divide-y divide-light-brown/15">
            {content.programme.map((item) => (
              <li
                key={item.time}
                className="grid grid-cols-[4.25rem_1fr] gap-x-3 gap-y-2 py-4 first:pt-0 last:pb-0"
              >
                <time className="type-paragraph-m-bold tabular-nums text-light-brown">
                  {item.time}
                </time>
                <div className="min-w-0">
                  <p className="type-paragraph-m text-light-gray">{item.title}</p>
                  {item.speakers?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {item.speakers.map((speaker) => (
                        <div
                          key={speaker.name}
                          className="flex items-center gap-2 rounded-full border border-light-brown/15 bg-white/5 py-1 pl-1 pr-3"
                        >
                          <Portrait
                            src={speaker.image}
                            alt={speaker.name}
                            initials={speaker.initials}
                            size="sm"
                          />
                          <span className="type-paragraph-s text-light-gray/80">
                            {speaker.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </PanelShell>
      );

    case "experience":
      return (
        <PanelShell>
          <p className="type-eyebrow text-light-brown">What you leave with</p>
          <div className="mt-6 space-y-4">
            {content.experiences.map((item) => (
              <div
                key={item.title}
                className="rounded-sm border border-light-brown/15 bg-white/[0.04] p-4"
              >
                <p className={cn(headingClass.card, "text-white")}>
                  {item.title}
                </p>
                <p className="type-paragraph-m mt-2 text-light-gray">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </PanelShell>
      );

    case "register":
      return (
        <PanelShell>
          <p className="type-eyebrow text-light-brown">Practical</p>
          <dl className="mt-5 space-y-4">
            {content.practical.items.slice(0, 4).map((item) => (
              <div key={item.label}>
                <dt className="type-eyebrow text-light-brown">{item.label}</dt>
                <dd className="type-paragraph-m mt-1 text-light-gray">
                  {item.label === "Location" ? (
                    <a
                      href={content.practical.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "underline underline-offset-4 transition-opacity hover:opacity-80",
                        accentText,
                        focusRing,
                      )}
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 border-t border-light-brown/15 pt-6">
            <RegisterButton
              href={registrationUrl}
              label={content.hero.ctaLabel}
              placement="footer"
            />
          </div>
        </PanelShell>
      );
  }
}

function StepCopy({
  title,
  body,
  stepIndex,
  totalSteps,
}: {
  title: string;
  body: string;
  stepIndex: number;
  totalSteps: number;
}) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={title}
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
      >
        <span className="type-paragraph-s tabular-nums text-light-gray/40">
          {String(stepIndex + 1).padStart(2, "0")} /{" "}
          {String(totalSteps).padStart(2, "0")}
        </span>
        <h2 className="type-h5 mt-4 text-balance text-white lg:type-h4">
          {title}
        </h2>
        <div className="mt-5 max-w-md space-y-4 max-lg:max-w-none">
          {body.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="type-body text-light-gray">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function StepPanel({
  type,
  content,
  registrationUrl,
}: {
  type: ScrollPanelType;
  content: OfficeOpeningContent;
  registrationUrl: string;
}) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={type}
        initial={reduce ? false : { opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        <ScrollPanel
          type={type}
          content={content}
          registrationUrl={registrationUrl}
        />
      </motion.div>
    </AnimatePresence>
  );
}

function ScrollyStory({
  content,
  registrationUrl,
}: {
  content: OfficeOpeningContent;
  registrationUrl: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const steps = content.scrollSteps;
  const activeStep = steps[activeIndex] ?? steps[0];

  useEffect(() => {
    let raf = 0;
    const desktopQuery = window.matchMedia("(min-width: 64rem)");

    const update = () => {
      if (!desktopQuery.matches) return;

      const target = window.innerHeight * TRIGGER_RATIO;
      let bestIdx = 0;
      let bestDistance = Infinity;

      for (let i = 0; i < stepRefs.current.length; i++) {
        const el = stepRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - target);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIdx = i;
        }
      }

      setActiveIndex((prev) => (prev !== bestIdx ? bestIdx : prev));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktopQuery.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktopQuery.removeEventListener("change", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [steps.length]);

  return (
    <section
      id="event-details"
      className="relative border-t border-light-brown/15 bg-black"
      aria-label="Event details"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(118,118,107,0.12),transparent_55%),radial-gradient(ellipse_at_80%_100%,rgba(59,41,41,0.35),transparent_50%)]" />

      <div className="relative hidden lg:block">
        <div className="sticky top-0 z-10 h-screen">
          <Section className="flex h-full items-center py-0">
            <div className="grid w-full grid-cols-2 items-center gap-16 xl:gap-24">
              <StepCopy
                title={activeStep.title}
                body={activeStep.body}
                stepIndex={activeIndex}
                totalSteps={steps.length}
              />
              <StepPanel
                type={activeStep.panel}
                content={content}
                registrationUrl={registrationUrl}
              />
            </div>
          </Section>

          <div className="absolute bottom-8 left-6 md:left-8 lg:left-12" aria-hidden>
            <div className="flex gap-1.5">
              {steps.map((step, i) => (
                <span
                  key={step.id}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    i === activeIndex ? "w-8 bg-light-brown" : "w-2 bg-white/20",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative -mt-[100vh]">
          {steps.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="min-h-screen"
              aria-hidden
            />
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        {steps.map((step, i) => (
          <article
            key={step.id}
            className="border-b border-light-brown/15 py-12 last:border-b-0 sm:py-16"
          >
            <Section>
              <StepCopy
                title={step.title}
                body={step.body}
                stepIndex={i}
                totalSteps={steps.length}
              />
              <div className="mt-10">
                <ScrollPanel
                  type={step.panel}
                  content={content}
                  registrationUrl={registrationUrl}
                />
              </div>
            </Section>
          </article>
        ))}
      </div>
    </section>
  );
}

function StickyMobileBar({
  visible,
  registrationUrl,
  content,
}: {
  visible: boolean;
  registrationUrl: string;
  content: OfficeOpeningContent["sticky"];
}) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-light-brown/15 bg-dark-brown/95 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="type-paragraph-s text-center text-light-gray/80 sm:min-w-0 sm:text-left">
          {content.deadline}
        </p>
        <RegisterButton
          href={registrationUrl}
          label={content.ctaLabel}
          placement="sticky"
          className="shrink-0 sm:w-auto"
        />
      </div>
    </div>
  );
}

export function OfficeOpeningPage({
  content,
  registrationUrl,
}: OfficeOpeningPageProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const closingRef = useRef<HTMLElement>(null);
  const closingInView = useInView(closingRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStickyVisible(!entry.isIntersecting);
        setShowScrollHint(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -1px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black pb-[calc(5rem+env(safe-area-inset-bottom))] text-light-gray lg:pb-0">
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col justify-start overflow-hidden bg-black lg:justify-center"
      >
        <HeroBackground
          src={content.hero.image}
          alt={content.hero.imageAlt}
        />

        <Section className="relative pb-24 pt-[5.25rem] md:py-20 md:pb-20">
          <FadeIn y={24} duration={0.8}>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:items-center lg:gap-12 xl:gap-16">
              <div className="flex w-full flex-col items-start text-left">
                <h1 className="type-h5 max-w-[52rem] text-balance text-white lg:type-h4">
                  {content.hero.title}
                </h1>
                <p className="type-paragraph-m mt-3 text-light-gray sm:mt-4 sm:type-h6">
                  {content.hero.subtitle}
                </p>
                <ul className="mt-5 w-full space-y-3 sm:mt-6">
                  {content.hero.supportingLines.map((line) => (
                    <li
                      key={line}
                      className="flex gap-3 type-paragraph-m text-light-gray sm:type-body"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-400"
                        aria-hidden
                      />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-9">
                  <RegisterButton
                    href={registrationUrl}
                    label={content.hero.ctaLabel}
                    placement="hero"
                    className="sm:w-auto sm:self-start"
                  />
                  <p className="type-paragraph-s text-light-gray/75">
                    {content.hero.deadlineNote}
                  </p>
                </div>
              </div>

              <QuickInfoPanel content={content} className="lg:hidden" />

              <QuickInfoPanel content={content} className="hidden lg:block" />
            </div>
          </FadeIn>
        </Section>

        <ScrollDownHint visible={showScrollHint} targetId="event-details" />
      </section>

      <ScrollyStory content={content} registrationUrl={registrationUrl} />

      <section
        ref={closingRef}
        className="relative overflow-hidden border-t border-light-brown/15 py-16 md:py-28"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-dark-brown via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(118,118,107,0.14),transparent_55%)]" />
        <Section className="relative">
          <FadeIn play={closingInView}>
            <div className="mx-auto max-w-[36rem] text-center">
              <h2 className="type-h5 text-balance text-white lg:type-h4">
                {content.closing.title}
              </h2>
              <p className="type-body mt-6 text-balance text-light-gray">
                {content.closing.subline}
              </p>
              <div className="mt-9 flex justify-center px-2 sm:px-0">
                <RegisterButton
                  href={registrationUrl}
                  label={content.closing.ctaLabel}
                  placement="footer"
                  className="sm:w-auto"
                />
              </div>
              <p className="type-paragraph-s mt-8 text-balance text-light-gray/75">
                Questions? {content.closing.contactName},{" "}
                <a
                  href={`mailto:${content.closing.contactEmail}`}
                  className={cn(
                    accentText,
                    "break-all underline underline-offset-4 transition-opacity hover:opacity-80 sm:break-normal",
                    focusRing,
                  )}
                >
                  {content.closing.contactEmail}
                </a>
              </p>
            </div>
          </FadeIn>
        </Section>
      </section>

      <StickyMobileBar
        visible={stickyVisible}
        registrationUrl={registrationUrl}
        content={content.sticky}
      />
    </div>
  );
}
