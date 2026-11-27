import {
  Badge,
  Button,
  ButtonLink,
  Eyebrow,
  Section,
  Surface,
} from "@wonka/react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/ui/logo-mark";
import { Logo } from "@/components/ui/logo";
import assetCatalog from "../../../public/design-system/assets.json";
import {
  channelCatalog,
  designSystemManifest,
  patternCatalog,
  ruleCatalog,
} from "../generated/contracts";
import { tokenCatalog } from "../generated/tokens";

type ChannelContract = (typeof channelCatalog.channels)[number];
type ChannelId = ChannelContract["id"];
type PatternContract = (typeof patternCatalog.patterns)[number];
type PatternDecisionState = "candidate" | "blocked";
type PatternDecision = {
  state: PatternDecisionState;
  label: string;
  blockedAssetIds: string[];
};

const generationStages = [
  {
    marker: "01",
    label: "Brief locked",
    detail: "Audience, promise, and legal boundaries",
  },
  {
    marker: "02",
    label: "Contracts resolved",
    detail: "Channel rules, tokens, and components",
  },
  {
    marker: "03",
    label: "Reference previews rendered",
    detail: "Four editable reference previews",
  },
  {
    marker: "04",
    label: "Human publish gate",
    detail: "Claims and final files remain locked",
  },
] as const;

const visibleRuleIds = [
  "rule.no-raw-color",
  "rule.contrast-aa",
  "rule.asset-rights",
  "rule.lifecycle-approval",
  "rule.agent-traceability",
] as const;

function getChannel(id: ChannelId): ChannelContract {
  const channel = channelCatalog.channels.find((entry) => entry.id === id);

  if (!channel) {
    throw new Error(`Missing channel contract: ${id}`);
  }

  return channel;
}

function getArtifactPattern(channelId: ChannelId): PatternContract {
  const pattern = patternCatalog.patterns.find(
    (entry) =>
      entry.storyId === "compositions-artifact-lab--studio" &&
      entry.channelIds.some((id) => id === channelId),
  );

  if (!pattern) {
    throw new Error(`Missing artifact pattern for channel: ${channelId}`);
  }

  return pattern;
}

function projectPatternDecision(pattern: PatternContract): PatternDecision {
  const today = new Date().toISOString().slice(0, 10);
  const channels = pattern.channelIds.map((channelId) => getChannel(channelId));
  const blockedAssetIds = pattern.requiredAssetIds.filter((assetId) => {
    const asset = assetCatalog.assets.find((entry) => entry.id === assetId);

    if (!asset || asset.lifecycle === "superseded") {
      return true;
    }

    const expiresAt: unknown = asset.rights.expiresAt;
    if (typeof expiresAt === "string" && expiresAt < today) {
      return true;
    }

    return channels.some(
      (channel) =>
        asset.rights.license !== "verified_redistributable" &&
        !(
          String(channel.distribution) === "internal" &&
          asset.rights.license === "verified_internal"
        ),
    );
  });

  return blockedAssetIds.length > 0
    ? {
        state: "blocked",
        label: "Blocked · asset rights",
        blockedAssetIds,
      }
    : {
        state: "candidate",
        label: "Candidate · review required",
        blockedAssetIds: [],
      };
}

const productChannel = getChannel("channel.product");
const websiteChannel = getChannel("channel.website");
const campaignChannel = getChannel("channel.campaign");
const presentationChannel = getChannel("channel.presentation");
const productPattern = getArtifactPattern("channel.product");
const websitePattern = getArtifactPattern("channel.website");
const campaignPattern = getArtifactPattern("channel.campaign");
const presentationPattern = getArtifactPattern("channel.presentation");

const artifactPatterns = [
  productPattern,
  websitePattern,
  campaignPattern,
  presentationPattern,
] as const;

const blockedArtifactPatterns = artifactPatterns.filter(
  (pattern) => projectPatternDecision(pattern).state === "blocked",
);

const semanticTokenCount = tokenCatalog.tokens.filter((token) =>
  token.id.startsWith("semantic."),
).length;

function ArrowGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h13M14 7l5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CheckGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="m4.5 10.5 3.25 3.25L15.5 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function LockGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 20 20"
    >
      <rect
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        width="11"
        x="4.5"
        y="9"
      />
      <path
        d="M7 9V6.75a3 3 0 0 1 6 0V9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function DecisionBadge({
  state,
  label,
  className = "",
}: {
  state: PatternDecisionState;
  label?: string;
  className?: string;
}) {
  return (
    <Badge
      className={`gap-2 ${
        state === "blocked"
          ? "border-border bg-surface-muted text-text"
          : "border-warning/40 bg-orange-300 text-black"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${
          state === "blocked" ? "bg-text" : "bg-warning"
        }`}
      />
      {label ??
        (state === "blocked"
          ? "Blocked · asset rights"
          : "Candidate · review required")}
    </Badge>
  );
}

function ArtifactShell({
  channel,
  pattern,
  format,
  headingId,
  className = "",
  children,
}: {
  channel: ChannelContract;
  pattern: PatternContract;
  format: string;
  headingId: string;
  className?: string;
  children: ReactNode;
}) {
  const decision = projectPatternDecision(pattern);

  return (
    <article
      aria-labelledby={headingId}
      className={`relative z-10 min-w-0 ${className}`}
    >
      <Surface
        className="border-border bg-surface shadow-subtle flex h-full flex-col border"
        variant="panel"
      >
        <header className="border-border flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className={`size-2 shrink-0 rounded-full ${
                decision.state === "blocked" ? "bg-text" : "bg-warning"
              }`}
            />
            <div className="min-w-0">
              <h3
                className="truncate font-mono text-xs font-semibold tracking-[0.08em] uppercase"
                id={headingId}
              >
                {channel.name}
              </h3>
              <p className="text-text/70 mt-0.5 font-mono text-[0.625rem]">
                {pattern.id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text/70 font-mono text-[0.625rem] tracking-[0.08em] uppercase">
              {format}
            </span>
            <DecisionBadge
              className="px-2 py-1 font-mono text-[0.5625rem] tracking-[0.08em] uppercase"
              state={decision.state}
            />
          </div>
        </header>
        <div className="flex-1 p-2.5 sm:p-3">{children}</div>
        <footer className="border-border text-text/70 flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3 font-mono text-[0.625rem] sm:px-5">
          <span>{channel.exportTargets.join(" · ")}</span>
          <span>
            {decision.state === "blocked"
              ? `Blocked by ${decision.blockedAssetIds.join(" · ")}`
              : `${pattern.slots.length} slots · ${pattern.agent.humanReviewTriggers.length} review triggers`}
          </span>
        </footer>
      </Surface>
    </article>
  );
}

function WebsiteCandidate() {
  return (
    <div className="relative flex min-h-[22rem] flex-col overflow-hidden rounded-xs bg-blue-100 text-black sm:min-h-[26rem]">
      <div
        aria-label="Website candidate navigation"
        className="relative z-10 flex items-center justify-between gap-4 border-b border-black/10 px-5 py-4 sm:px-7"
      >
        <span aria-label="Wonka" role="img">
          <Logo className="h-3.5" />
        </span>
        <div className="hidden items-center gap-5 text-xs sm:flex">
          <span>Platform</span>
          <span>Security</span>
          <span>Customers</span>
        </div>
        <span className="font-mono text-[0.625rem] tracking-[0.08em] uppercase">
          Europe / EN
        </span>
      </div>

      <div className="relative z-10 grid flex-1 items-end gap-7 px-5 py-8 sm:px-7 md:grid-cols-[1.2fr_0.8fr] md:py-10">
        <div>
          <p className="mb-4 font-mono text-[0.625rem] font-semibold tracking-[0.1em] text-blue-800 uppercase">
            Wonka Control
          </p>
          <p className="max-w-[11ch] font-serif text-[clamp(2.25rem,6vw,4.75rem)] leading-[0.92] tracking-[-0.045em]">
            AI agents that work where your team does.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4 text-sm">
            <ButtonLink href="/wonka-chat">Explore the platform</ButtonLink>
            <span className="text-black/75">Private by design.</span>
          </div>
        </div>

        <div className="relative border-l border-black/15 pl-5">
          <p className="text-sm leading-6 text-black/70">
            Connect SharePoint, Odoo, Outlook, and your models in one governed
            workspace.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xs border border-black/10 bg-black/10">
            <div className="bg-white p-3">
              <dt className="font-mono text-[0.5625rem] tracking-wider text-black/75 uppercase">
                Hosting
              </dt>
              <dd className="mt-2 text-sm font-medium">EU dedicated</dd>
            </div>
            <div className="bg-white p-3">
              <dt className="font-mono text-[0.5625rem] tracking-wider text-black/75 uppercase">
                Control
              </dt>
              <dd className="mt-2 text-sm font-medium">Human in-loop</dd>
            </div>
          </dl>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute right-[-8%] bottom-[-12%] h-[18%] w-[74%] -rotate-2 bg-blue-600 [clip-path:polygon(3%_14%,100%_0,96%_88%,0_100%)]"
      />
    </div>
  );
}

function CampaignCandidate() {
  return (
    <div className="relative flex min-h-[37rem] flex-col overflow-hidden rounded-xs bg-black p-5 text-white sm:p-7 lg:min-h-full">
      <div className="relative z-10 flex items-start justify-between gap-4">
        <span aria-label="Wonka" role="img">
          <LogoMark className="h-7" variant="light" />
        </span>
        <span className="text-right font-mono text-[0.5625rem] leading-4 tracking-[0.1em] text-white/75 uppercase">
          Claim layer,
          <br />
          review pending
        </span>
      </div>

      <div className="relative z-10 my-auto py-16">
        <p className="font-mono text-[0.625rem] font-semibold tracking-[0.11em] text-blue-300 uppercase">
          Private AI · Built for Europe
        </p>
        <p className="mt-5 max-w-[8ch] font-serif text-[clamp(3.2rem,8vw,6.5rem)] leading-[0.82] tracking-[-0.055em]">
          Your data. Your models. Your move.
        </p>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-6 border-t border-white/20 pt-4">
        <p className="max-w-[18rem] text-sm leading-5 text-white/75">
          Wonka Control brings agents, tools, and approvals into one sovereign
          operating layer.
        </p>
        <span className="shrink-0 font-mono text-[0.625rem] text-blue-300">
          09.2026
        </span>
      </div>

      <div
        aria-hidden="true"
        className="absolute right-[-32%] bottom-[18%] h-[20%] w-[138%] -rotate-6 bg-blue-500 [clip-path:polygon(5%_12%,100%_0,94%_100%,0_84%)]"
      />
    </div>
  );
}

function ProductCandidate() {
  const activity = [
    {
      label: "Read vendor security pack",
      meta: "SharePoint · 24 files",
      state: "Complete",
    },
    {
      label: "Compare retention clauses",
      meta: "Policy library · EU baseline",
      state: "Complete",
    },
    {
      label: "Draft decision brief",
      meta: "Board template · English",
      state: "Review",
    },
  ] as const;

  return (
    <div className="border-border bg-background text-text min-h-[25rem] overflow-hidden rounded-xs border">
      <header className="border-border flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-xs bg-blue-600 font-mono text-[0.625rem] font-semibold text-white">
            W
          </span>
          <div>
            <p className="text-sm font-semibold">Wonka Control</p>
            <p className="text-text/70 font-mono text-[0.5625rem] tracking-wider uppercase">
              Vendor intelligence
            </p>
          </div>
        </div>
        <div className="text-text/70 flex items-center gap-2 text-xs">
          <span aria-hidden="true" className="bg-success size-2 rounded-full" />
          3 sources live
        </div>
      </header>

      <div className="grid min-h-[20rem] lg:grid-cols-[1fr_15rem]">
        <section
          aria-labelledby="product-task-title"
          className="border-border border-b p-4 sm:p-5 lg:border-r lg:border-b-0"
        >
          <p className="text-foreground font-mono text-[0.625rem] font-semibold tracking-[0.1em] uppercase">
            Agent run · VC-048
          </p>
          <h4 className="type-h6 mt-3 max-w-[20ch]" id="product-task-title">
            Prepare the vendor-risk decision brief.
          </h4>
          <p className="text-text/70 mt-2 max-w-2xl text-sm leading-6">
            Compare Acme Cloud’s terms with the EU procurement baseline. Cite
            every source and stop before recommendation.
          </p>

          <ol
            className="divide-border border-border mt-6 divide-y border-y"
            id="product-evidence"
          >
            {activity.map((item) => (
              <li
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3"
                key={item.label}
              >
                <span
                  className={`grid size-6 place-items-center rounded-full ${
                    item.state === "Complete"
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-300 text-black"
                  }`}
                >
                  {item.state === "Complete" ? (
                    <CheckGlyph className="size-4" />
                  ) : (
                    <span className="bg-warning size-1.5 rounded-full" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {item.label}
                  </span>
                  <span className="text-text/70 block truncate font-mono text-[0.5625rem]">
                    {item.meta}
                  </span>
                </span>
                <span className="text-text/70 font-mono text-[0.5625rem] tracking-wider uppercase">
                  {item.state}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <aside
          aria-label="Product candidate review gate"
          className="bg-surface-muted flex flex-col p-4 sm:p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[0.625rem] font-semibold tracking-[0.1em] uppercase">
              Review gate
            </p>
            <LockGlyph className="text-warning size-4" />
          </div>
          <p className="mt-5 text-sm font-medium">Recommendation withheld</p>
          <p className="text-text/70 mt-2 text-xs leading-5">
            A procurement owner must review cited evidence before the agent can
            propose a decision.
          </p>
          <Button
            className="mt-4 self-start text-xs"
            onClick={() =>
              document
                .getElementById("product-evidence")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            type="button"
            variant="underline"
          >
            Review cited evidence
          </Button>
          <dl className="border-border mt-auto grid gap-3 border-t pt-4 text-xs">
            <div className="flex justify-between gap-3">
              <dt className="text-text/70">Citations</dt>
              <dd className="font-mono">12 / 12</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-text/70">Policy set</dt>
              <dd className="font-mono">EU-proc-v4</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-text/70">Next owner</dt>
              <dd className="font-mono">Procurement</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

function PresentationCandidate() {
  return (
    <div className="relative aspect-video min-h-[17rem] overflow-hidden rounded-xs bg-blue-900 p-5 text-white sm:p-7">
      <div className="flex items-start justify-between gap-5">
        <span aria-label="Wonka" role="img">
          <LogoMark className="h-7" variant="light" />
        </span>
        <span className="font-mono text-[0.625rem] tracking-[0.08em] text-blue-300">
          07 / OPERATING MODEL
        </span>
      </div>

      <div className="grid h-[calc(100%-2rem)] items-end gap-5 pb-2 sm:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="max-w-[13ch] font-serif text-[clamp(1.8rem,5vw,4.25rem)] leading-[0.94] tracking-[-0.045em]">
            The AI layer should fit your systems—not replace them.
          </p>
          <p className="mt-4 max-w-md text-xs leading-5 text-white/75 sm:text-sm">
            One governed workspace coordinates models, tools, and human
            decisions while source systems stay authoritative.
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="grid gap-2">
            {["Odoo", "SharePoint", "Outlook"].map((label) => (
              <span
                className="rounded-xs border border-white/20 bg-white/10 px-2 py-2 text-center font-mono text-[0.5625rem]"
                key={label}
              >
                {label}
              </span>
            ))}
          </div>
          <ArrowGlyph className="size-5 text-blue-300" />
          <div className="rounded-xs bg-blue-400 p-3 text-black">
            <p className="font-mono text-[0.5625rem] tracking-wider uppercase">
              Control layer
            </p>
            <p className="mt-2 text-xs font-semibold">Agents + approvals</p>
          </div>
        </div>
      </div>

      <p className="absolute right-5 bottom-3 font-mono text-[0.5rem] text-white/75 sm:right-7">
        Reference architecture · editable objects
      </p>
    </div>
  );
}

function PatternBlueprints() {
  return (
    <section aria-labelledby="pattern-blueprints-title">
      <div className="border-border grid gap-8 border-t pt-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <p className="sb-wonka-kicker mb-4">
            Pattern catalog · {patternCatalog.version}
          </p>
          <h2 className="type-h4 max-w-[12ch]" id="pattern-blueprints-title">
            The composition is a contract, too.
          </h2>
          <p className="text-text/70 mt-5 max-w-md text-sm leading-6">
            Each artboard implements a cataloged pattern with named slots and
            review triggers. Agents can reuse the structure without copying a
            screenshot or inventing new metadata.
          </p>
        </div>

        <div className="grid gap-4">
          {artifactPatterns.map((pattern) => (
            <Surface
              className="border-border bg-surface border p-4 sm:p-5"
              key={pattern.id}
            >
              <article aria-labelledby={`${pattern.id}-title`}>
                <header className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-foreground font-mono text-[0.625rem]">
                      {pattern.id}
                    </p>
                    <h3 className="type-h6 mt-2" id={`${pattern.id}-title`}>
                      {pattern.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="font-mono text-[0.5625rem] tracking-wider uppercase">
                      {pattern.status}
                    </Badge>
                    <DecisionBadge
                      className="font-mono text-[0.5625rem] tracking-wider uppercase"
                      state={projectPatternDecision(pattern).state}
                    />
                  </div>
                </header>
                <p className="text-text/70 mt-3 max-w-3xl text-sm leading-6">
                  {pattern.description}
                </p>

                <div className="border-border mt-5 grid gap-5 border-t pt-5 md:grid-cols-2">
                  <div>
                    <p className="text-text/70 font-mono text-[0.5625rem] font-semibold tracking-[0.1em] uppercase">
                      Required slots
                    </p>
                    <ul className="mt-3 grid gap-2">
                      {pattern.slots.map((slot) => (
                        <li
                          className="bg-surface-muted grid grid-cols-[auto_1fr] gap-3 rounded-xs p-3"
                          key={slot.id}
                        >
                          <CheckGlyph className="text-success mt-0.5 size-4" />
                          <span>
                            <span className="flex flex-wrap items-center gap-2">
                              <code className="font-mono text-[0.625rem] font-semibold">
                                {slot.id}
                              </code>
                              <span className="text-text/70 font-mono text-[0.5rem] tracking-wider uppercase">
                                {slot.role}
                              </span>
                            </span>
                            <span className="text-text/70 mt-1 block text-xs leading-5">
                              {slot.instruction}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-text/70 font-mono text-[0.5625rem] font-semibold tracking-[0.1em] uppercase">
                      Human review triggers
                    </p>
                    <ul className="divide-border border-border mt-3 divide-y border-y">
                      {pattern.agent.humanReviewTriggers.map((trigger) => (
                        <li
                          className="text-text/70 grid grid-cols-[auto_1fr] gap-3 py-3 text-xs leading-5"
                          key={trigger}
                        >
                          <LockGlyph className="text-warning mt-0.5 size-4" />
                          {trigger}
                        </li>
                      ))}
                    </ul>
                    <p className="text-text/70 mt-4 font-mono text-[0.5625rem] leading-5 break-words">
                      Components: {pattern.requiredComponentIds.join(" · ")}
                    </p>
                  </div>
                </div>
              </article>
            </Surface>
          ))}
        </div>
      </div>
    </section>
  );
}

function PolicyLedger() {
  return (
    <section aria-labelledby="policy-title" id="policy-ledger">
      <div className="border-border grid gap-8 border-t pt-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <p className="sb-wonka-kicker mb-4">Channel policy ledger</p>
          <h2 className="type-h4 max-w-[12ch]" id="policy-title">
            Expression changes. Authority does not.
          </h2>
          <p className="text-text/70 mt-5 max-w-md text-sm leading-6">
            Every preview resolves a real channel contract. Required constraints
            travel with the artifact; review triggers stay visible until a named
            human acts.
          </p>
        </div>

        <div className="divide-border border-border divide-y border-y">
          {channelCatalog.channels.map((channel) => (
            <article
              className="grid gap-4 py-5 sm:grid-cols-[10rem_1fr]"
              key={channel.id}
            >
              <div>
                <h3 className="font-medium">{channel.name}</h3>
                <p className="text-text/70 mt-1 font-mono text-[0.625rem]">
                  {channel.id}
                </p>
                <p className="text-text/70 mt-3 font-mono text-[0.5625rem] tracking-wider uppercase">
                  {channel.lifecycle}
                </p>
              </div>
              <ul
                className="grid gap-2"
                aria-label={`${channel.name} constraints`}
              >
                {channel.constraints.map((constraint) => (
                  <li
                    className="bg-surface-muted grid grid-cols-[auto_1fr] gap-3 rounded-xs p-3"
                    key={constraint.id}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-1 size-2 rounded-full ${
                        constraint.enforcement === "automated"
                          ? "bg-success"
                          : constraint.enforcement === "human_review"
                            ? "bg-warning"
                            : "bg-info"
                      }`}
                    />
                    <span>
                      <span className="flex flex-wrap items-center justify-between gap-2">
                        <code className="font-mono text-[0.625rem] font-semibold">
                          {constraint.id}
                        </code>
                        <span className="text-text/70 font-mono text-[0.5625rem] tracking-wider uppercase">
                          {constraint.level} · {constraint.enforcement}
                        </span>
                      </span>
                      <span className="text-text/70 mt-1 block text-xs leading-5">
                        {constraint.value}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProvenancePanel() {
  const visibleRules = ruleCatalog.rules.filter((rule) =>
    visibleRuleIds.some((id) => id === rule.id),
  );

  return (
    <section aria-labelledby="provenance-title" className="mt-16">
      <Surface
        className="relative overflow-hidden bg-black p-5 text-white sm:p-8 lg:p-10"
        variant="panel"
      >
        <div className="relative z-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="font-mono text-[0.6875rem] font-semibold tracking-[0.1em] text-blue-300 uppercase">
              Reproducible by construction
            </p>
            <h2 className="type-h4 mt-4 max-w-[12ch]" id="provenance-title">
              The receipt ships with the work.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/75">
              An agent can create a candidate, but it must also report the exact
              system, channel, tokens, rules, and unresolved decisions used.
            </p>

            <DecisionBadge
              className="mt-7"
              label={`${blockedArtifactPatterns.length} patterns blocked · asset rights`}
              state={
                blockedArtifactPatterns.length > 0 ? "blocked" : "candidate"
              }
            />

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xs border border-white/15 bg-white/15">
              <div className="bg-black p-4">
                <dt className="font-mono text-[0.5625rem] tracking-wider text-white/75 uppercase">
                  Brand version
                </dt>
                <dd className="mt-2 font-mono text-xs break-all text-blue-300">
                  {designSystemManifest.brandVersionId}
                </dd>
              </div>
              <div className="bg-black p-4">
                <dt className="font-mono text-[0.5625rem] tracking-wider text-white/75 uppercase">
                  Contract versions
                </dt>
                <dd className="mt-2 font-mono text-xs text-blue-300">
                  Channels {channelCatalog.version} · Patterns{" "}
                  {patternCatalog.version}
                </dd>
              </div>
              <div className="bg-black p-4">
                <dt className="font-mono text-[0.5625rem] tracking-wider text-white/75 uppercase">
                  Token snapshot
                </dt>
                <dd className="mt-2 font-mono text-xs text-blue-300">
                  {tokenCatalog.tokens.length} total · {semanticTokenCount}{" "}
                  semantic
                </dd>
              </div>
              <div className="bg-black p-4">
                <dt className="font-mono text-[0.5625rem] tracking-wider text-white/75 uppercase">
                  Publication
                </dt>
                <dd className="mt-2 flex items-center gap-2 font-mono text-xs text-orange-300">
                  <LockGlyph className="size-3.5" />
                  Locked
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-4">
              <h3 className="font-mono text-xs font-semibold tracking-[0.1em] uppercase">
                Policy trace
              </h3>
              <span className="font-mono text-[0.625rem] text-white/75">
                {ruleCatalog.rules.length} rules loaded
              </span>
            </div>
            <ul className="divide-y divide-white/15">
              {visibleRules.map((rule) => (
                <li
                  className="grid gap-2 py-4 sm:grid-cols-[1fr_auto]"
                  key={rule.id}
                >
                  <span>
                    <code className="font-mono text-[0.6875rem] text-blue-300">
                      {rule.id}
                    </code>
                    <span className="mt-1 block text-xs leading-5 text-white/75">
                      {rule.description}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 self-start font-mono text-[0.5625rem] tracking-wider text-white/75 uppercase">
                    <span
                      aria-hidden="true"
                      className={`size-2 rounded-full ${
                        rule.validator.kind === "manual"
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                    />
                    {rule.validator.kind === "manual"
                      ? "Human gate"
                      : "Enforced"}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-l-2 border-blue-400 pl-4">
              <p className="font-mono text-[0.5625rem] tracking-wider text-white/75 uppercase">
                Agent handoff
              </p>
              <code className="mt-2 block font-mono text-xs leading-6 break-words text-white/75">
                ds:query policy --channel campaign
              </code>
              <p className="mt-2 text-xs leading-5 text-white/75">
                Returns the complete policy bundle before another agent edits or
                exports the candidate.
              </p>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute top-[-18%] right-[-22%] h-[36%] w-[58%] rotate-3 bg-blue-900 opacity-60 [clip-path:polygon(4%_12%,100%_0,94%_100%,0_86%)]"
        />
      </Surface>
    </section>
  );
}

function ArtifactLab() {
  return (
    <main className="overflow-hidden pb-16">
      <Section
        as="header"
        className="border-border relative border-b py-12 sm:py-16 lg:py-20"
      >
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>Artifact Lab · Run 024</Eyebrow>
              <DecisionBadge
                label={`${blockedArtifactPatterns.length} patterns blocked · asset rights`}
                state={
                  blockedArtifactPatterns.length > 0 ? "blocked" : "candidate"
                }
              />
            </div>
            <h1 className="type-h3 mt-7 max-w-[12ch]">
              One brief. Four governed expressions.
            </h1>
            <p className="text-text/70 mt-6 max-w-xl text-base leading-7 sm:text-lg">
              A reference studio for composing product, campaign, presentation,
              and website previews from the same machine-readable Wonka system.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                onClick={() =>
                  document
                    .getElementById("artifact-gallery")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                type="button"
              >
                Inspect previews
              </Button>
              <Button
                onClick={() =>
                  document
                    .getElementById("policy-ledger")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                type="button"
                variant="underline"
              >
                Read channel policies
              </Button>
            </div>
          </div>

          <Surface
            aria-label="Generation source brief"
            className="shadow-subtle relative overflow-hidden bg-black p-5 text-white sm:p-7"
            variant="panel"
          >
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-4">
                <p className="font-mono text-[0.625rem] font-semibold tracking-[0.1em] text-blue-300 uppercase">
                  Source brief
                </p>
                <span className="font-mono text-[0.5625rem] tracking-wider text-orange-300 uppercase">
                  Publication locked
                </span>
              </div>
              <blockquote className="mt-6 font-serif text-2xl leading-tight tracking-[-0.025em] sm:text-3xl">
                “Introduce Wonka Control as the private orchestration layer for
                European operations teams.”
              </blockquote>
              <dl className="mt-7 grid gap-3 border-t border-white/20 pt-5 text-xs sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-[0.5625rem] tracking-wider text-white/75 uppercase">
                    Audience
                  </dt>
                  <dd className="mt-2">COO + IT leaders</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.5625rem] tracking-wider text-white/75 uppercase">
                    Voice
                  </dt>
                  <dd className="mt-2">Calm, specific</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.5625rem] tracking-wider text-white/75 uppercase">
                    Boundary
                  </dt>
                  <dd className="mt-2">No unapproved claims</dd>
                </div>
              </dl>
            </div>
            <div
              aria-hidden="true"
              className="absolute right-[-20%] bottom-[-18%] h-[32%] w-[78%] -rotate-3 bg-blue-600 [clip-path:polygon(5%_12%,100%_0,94%_100%,0_84%)]"
            />
          </Surface>
        </div>
      </Section>

      <Section as="section" aria-label="Artifact generation stages">
        <ol className="border-border grid border-b sm:grid-cols-2 lg:grid-cols-4">
          {generationStages.map((stage, index) => (
            <li
              className={`relative py-5 sm:px-5 lg:px-6 ${
                index > 0
                  ? "border-border border-t sm:border-t-0 sm:border-l"
                  : ""
              }`}
              key={stage.marker}
            >
              <div className="flex items-start gap-3">
                <span className="text-foreground font-mono text-[0.625rem] font-semibold">
                  {stage.marker}
                </span>
                <span>
                  <span className="block text-sm font-medium">
                    {stage.label}
                  </span>
                  <span className="text-text/70 mt-1 block text-xs leading-5">
                    {stage.detail}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        as="section"
        className="py-14 sm:py-16 lg:py-20"
        id="artifact-gallery"
      >
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="sb-wonka-kicker mb-4">
              Cross-channel reference previews
            </p>
            <h2 className="type-h4 max-w-[13ch]">
              Same intent. Native to each surface.
            </h2>
          </div>
          <dl className="border-border flex gap-7 border-l pl-5">
            <div>
              <dt className="text-text/70 font-mono text-[0.5625rem] tracking-wider uppercase">
                Channels
              </dt>
              <dd className="mt-1 font-serif text-2xl">
                {channelCatalog.channels.length}
              </dd>
            </div>
            <div>
              <dt className="text-text/70 font-mono text-[0.5625rem] tracking-wider uppercase">
                Theme modes
              </dt>
              <dd className="mt-1 font-serif text-2xl">
                {designSystemManifest.themes.length}
              </dd>
            </div>
            <div>
              <dt className="text-text/70 font-mono text-[0.5625rem] tracking-wider uppercase">
                Patterns
              </dt>
              <dd className="mt-1 font-serif text-2xl">
                {artifactPatterns.length}
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative grid gap-5 lg:grid-cols-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[39%] right-[-12%] left-[-12%] h-28 -rotate-2 bg-blue-200 opacity-70 [clip-path:polygon(2%_18%,100%_0,97%_82%,0_100%)]"
          />

          <ArtifactShell
            channel={websiteChannel}
            className="lg:col-span-8"
            format="Responsive web"
            headingId="website-candidate-title"
            pattern={websitePattern}
          >
            <WebsiteCandidate />
          </ArtifactShell>

          <ArtifactShell
            channel={campaignChannel}
            className="lg:col-span-4 lg:row-span-2"
            format="4:5 launch"
            headingId="campaign-candidate-title"
            pattern={campaignPattern}
          >
            <CampaignCandidate />
          </ArtifactShell>

          <ArtifactShell
            channel={productChannel}
            className="lg:col-span-8"
            format="Task workspace"
            headingId="product-candidate-title"
            pattern={productPattern}
          >
            <ProductCandidate />
          </ArtifactShell>

          <ArtifactShell
            channel={presentationChannel}
            className="lg:col-span-12"
            format="16:9 slide"
            headingId="presentation-candidate-title"
            pattern={presentationPattern}
          >
            <PresentationCandidate />
          </ArtifactShell>
        </div>
      </Section>

      <Section as="section">
        <PatternBlueprints />
      </Section>

      <Section as="section" className="mt-16">
        <PolicyLedger />
        <ProvenancePanel />
      </Section>
    </main>
  );
}

const meta = {
  title: "Compositions/Artifact Lab",
  component: ArtifactLab,
  parameters: {
    docs: {
      description: {
        component:
          "An AI-native reference studio showing how one governed brief becomes product, website, campaign, and presentation previews. Candidate and blocked decisions are derived from canonical asset rights, with channel policy and provenance exposed.",
      },
    },
  },
} satisfies Meta<typeof ArtifactLab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Studio: Story = {};
