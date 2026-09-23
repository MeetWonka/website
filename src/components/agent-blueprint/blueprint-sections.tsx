import { BadgeGdpr } from "@/components/ui/icons/badge-gdpr";
import { BadgeIso } from "@/components/ui/icons/badge-iso";
import { BadgeNis2 } from "@/components/ui/icons/badge-nis2";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { FaqSchema } from "@/components/json-ld";
import { FaqSection } from "@/components/sections/faq-section";
import type { FaqItem } from "@/lib/types";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { BlueprintScrollButton } from "./blueprint-scroll-button";

const valueStack = [
  {
    title: "Your company, mapped",
    detail: "Offerings, value chain and the processes where work repeats",
  },
  {
    title: "Benchmark against 570 AI projects",
    detail: "Each process matched to patterns that already work",
  },
  {
    title: "Three agents, designed for you",
    detail: "A copilot, a human-in-the-loop and an autonomous agent",
  },
  {
    title: "Workflow for every agent",
    detail: "Trigger, steps and where a human stays in control",
  },
  {
    title: "The tools each agent plugs into",
    detail: "Outlook, SharePoint, Teams, Odoo, Salesforce and more",
  },
  {
    title: "Hours saved and build effort",
    detail: "So you know which agent to build first",
  },
];

/** What the free blueprint contains, stacked like a receipt. */
export function BlueprintValueStack() {
  return (
    <Section containerClassName="grid gap-12 py-18 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
      <div className="flex flex-col items-start gap-6">
        <Eyebrow>What you get</Eyebrow>
        <h2 className={cn(headingClass.section, "max-w-[16ch]")}>
          A consultant-grade AI plan. Free, in a minute.
        </h2>
        <p className="type-body text-text/65 max-w-md">
          The same use-case prioritisation we run with clients in our Start AI
          programs, as a first version. Enter a website and it is yours.
        </p>
        <BlueprintScrollButton className="mt-2">
          Build my blueprint
        </BlueprintScrollButton>
      </div>

      <div className="border-border overflow-hidden rounded-sm border bg-white">
        <div className="border-border flex items-center justify-between border-b border-dashed px-5 py-4 md:px-6">
          <span className="type-eyebrow text-text/45">
            Your AI agent blueprint
          </span>
          <span className="type-eyebrow text-blue-700">Included</span>
        </div>
        <ol>
          {valueStack.map((item, index) => (
            <li
              key={item.title}
              className="border-border flex items-center gap-4 border-b border-dashed px-5 py-4 last:border-b-0 md:px-6"
            >
              <span className="type-paragraph-s flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 tabular-nums">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="type-paragraph-m-bold">{item.title}</p>
                <p className="type-paragraph-s text-text/55 mt-0.5">
                  {item.detail}
                </p>
              </div>
              <span aria-hidden className="text-green-600">
                ✓
              </span>
            </li>
          ))}
        </ol>
        <div className="bg-light-gray border-border grid gap-4 border-t px-5 py-5 sm:grid-cols-2 sm:items-end md:px-6">
          <div>
            <p className="type-paragraph-s text-text/50">
              No call. No sign-up. No credit card.
            </p>
            <p className="type-paragraph-s text-text/40 mt-1">
              Copy any agent straight into WonkaChat.
            </p>
          </div>
          <div className="sm:text-right">
            <p className="type-eyebrow text-text/45">Your blueprint</p>
            <p className="type-h3 text-blue-700">Free</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/** Shows what happens after the blueprint: the agents run in WonkaChat. */
export function BlueprintToWonkaChat({
  wonkaChatUrl,
  meetingUrl,
}: {
  wonkaChatUrl: string;
  meetingUrl: string;
}) {
  const cards = [
    {
      src: "/images/wonka-chat/create-ai-agents-for-specific-tasks.png",
      alt: "WonkaChat board where AI agents move tasks from to do to done",
      title: "Agents that move work forward",
      body: "Each agent in your blueprint becomes a WonkaChat agent that picks up the task, runs the steps and hands back the result.",
    },
    {
      src: "/images/wonka-chat/feature-tools.png",
      alt: "Tools WonkaChat connects to, including Outlook, SharePoint, Odoo and Salesforce",
      title: "Plugged into your tools",
      body: "Outlook, SharePoint, Teams, Odoo, Salesforce, Notion and more, so agents work where your data already lives.",
    },
  ];

  return (
    <Section containerClassName="py-18 md:py-24">
      <SectionHeader
        eyebrow={<Eyebrow>After the blueprint</Eyebrow>}
        heading={"Your blueprint doesn't\nstay a slide."}
        body="Turn the agents you like into working agents in WonkaChat, the AI workspace Itzu rolled out to every employee."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <figure
            key={card.title}
            className="border-border bg-light-gray overflow-hidden rounded-sm border"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(min-width: 768px) 42rem, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="border-border border-t border-dashed bg-white p-5 md:p-6">
              <p className={headingClass.card}>{card.title}</p>
              <p className="type-paragraph-m text-text/60 mt-2">{card.body}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center gap-3">
        <ButtonLink href={wonkaChatUrl} data-track="wonkachat_start">
          Start with WonkaChat
        </ButtonLink>
        <a
          href={meetingUrl}
          data-track="meeting"
          data-meeting-type="general"
          data-blueprint-cta="wonkachat_section_call"
          className="type-paragraph-m text-text/60 hover:text-text underline underline-offset-4"
        >
          Or book a 30 min call
        </a>
      </div>
    </Section>
  );
}

const steps = [
  {
    title: "We read your website",
    body: "Services, products, sectors, careers and customer pages, plus public sources like job posts and news. We map what you sell, how work flows and where it repeats.",
  },
  {
    title: "We match 570 real use cases",
    body: "Each high-potential process is matched separately against an anonymised benchmark of enterprise AI projects, so every agent builds on a pattern that already works.",
  },
  {
    title: "Get three agents, then build one",
    body: "Pick the agent with the best return. A Wonka engineer validates the scope with you and ships it in weeks.",
  },
];

export function BlueprintSteps() {
  return (
    <section className="bg-mid-gray border-border border-y border-dashed">
      <Section containerClassName="py-18 md:py-24">
        <SectionHeader
          eyebrow={<Eyebrow>How it works</Eyebrow>}
          heading={"From website to agent team\nin three steps."}
        />
        <ol className="border-border mt-12 grid rounded-sm border border-dashed md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={cn(
                "flex min-h-[14rem] flex-col gap-10 p-7.5",
                index > 0 &&
                  "border-border border-t border-dashed md:border-t-0 md:border-l",
              )}
            >
              <span className="type-h4 text-blue-600 tabular-nums">
                0{index + 1}
              </span>
              <div>
                <h3 className={headingClass.card}>{step.title}</h3>
                <p className="type-paragraph-m text-text/65 mt-3">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </section>
  );
}

const BLUEPRINT_FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is the blueprint really free?",
    answer:
      "Yes. No sign-up, no email and no credit card. Enter a website and you get the full blueprint on screen.",
  },
  {
    question: "What information do you use about my company?",
    answer:
      "Only public web information about the domain you enter. We never ask for internal documents, and the result never shows your company name or any benchmark client name.",
  },
  {
    question: "Where do the 570 use cases come from?",
    answer:
      "From an anonymised benchmark of enterprise AI projects. Client names and mission details are removed before any pattern is used.",
  },
  {
    question: "How reliable are the time-saving estimates?",
    answer:
      "They are directional, based on recurring tasks in comparable projects. On a scoping call we validate them against your real volumes before anything is built.",
  },
  {
    question: "Which tools can the agents connect to?",
    answer:
      "Microsoft 365 (Outlook, SharePoint, Teams), Odoo, SAP, Dynamics, Salesforce, HubSpot, Jira and more. Every blueprint lists the integrations each agent needs.",
  },
  {
    question: "What happens after I get my blueprint?",
    answer:
      "Nothing, unless you want it to. If an agent looks worth building, book a 30-minute call and a Wonka engineer turns it into a scoped delivery plan.",
  },
];

/**
 * Light trust strip. The page already has one blue panel (stats); a second
 * one right after it reads as a wall of blue, so security stays compact.
 */
export function BlueprintTrust() {
  return (
    <Section>
      <div className="border-border flex flex-col gap-6 rounded-sm border border-dashed px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <h2 className={headingClass.subsection}>
            Your data is always yours.
          </h2>
        </div>
        {/* The badge artwork is white; invert it for the light background. */}
        <ul className="flex items-center gap-4 invert md:gap-6">
          <li>
            <BadgeGdpr className="size-16 opacity-70 md:size-20" />
          </li>
          <li>
            <BadgeIso className="size-16 opacity-70 md:size-20" />
          </li>
          <li>
            <BadgeNis2 className="size-16 opacity-70 md:size-20" />
          </li>
        </ul>
      </div>
    </Section>
  );
}

export function BlueprintFaq() {
  return (
    <>
      <FaqSchema items={BLUEPRINT_FAQ_ITEMS} />
      <FaqSection
        data={{
          header: {
            eyebrow: "FAQ",
            heading: "Questions before you try it",
            body: null,
          },
          items: BLUEPRINT_FAQ_ITEMS,
        }}
      />
    </>
  );
}
