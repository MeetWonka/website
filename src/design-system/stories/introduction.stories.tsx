import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@wonka/react";
import {
  channelCatalog,
  designSystemManifest as manifest,
  patternCatalog,
  ruleCatalog,
} from "../generated/contracts";
import { tokenCatalog } from "../generated/tokens";

const componentIds = new Set(
  channelCatalog.channels.flatMap((channel) => channel.compatibleComponentIds),
);
const systemStats = [
  { label: "Tokens", value: tokenCatalog.tokens.length },
  { label: "Components", value: componentIds.size },
  { label: "Patterns", value: patternCatalog.patterns.length },
  { label: "Channels", value: channelCatalog.channels.length },
  { label: "Rules", value: ruleCatalog.rules.length },
];

const workflow = [
  {
    label: "Declare intent",
    detail: "Select the output channel and theme.",
    command: "channel.campaign",
  },
  {
    label: "Resolve policy",
    detail: "Load compatible tokens, components, assets, and constraints.",
    command: "ds:query policy",
  },
  {
    label: "Compose",
    detail: "Build from governed primitives and channel patterns.",
    command: "candidate → review",
  },
  {
    label: "Return a trace",
    detail: "Report every version and decision used.",
    command: "artifact.trace.json",
  },
];

const machineSurfaces = [
  ["/.well-known/design-system.json", "Discovery"],
  ["/design-system/tokens.json", "Token API"],
  ["/design-system/patterns.json", "Composition API"],
  ["/design-system/channels.json", "Channel contracts"],
  ["/design-system/rules.json", "Governance"],
] as const;

function Introduction() {
  return (
    <main className="sb-wonka-page">
      <section className="sb-wonka-os-hero">
        <div className="relative z-10 flex min-h-[34rem] flex-col justify-between gap-16 p-7 md:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-green-400" aria-hidden />
              <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-white/70 uppercase">
                Wonka Brand OS
              </span>
            </div>
            <Badge className="border-white/15 bg-white/10 text-white">
              {manifest.version} · {manifest.approval.status}
            </Badge>
          </div>

          <div className="max-w-[48rem]">
            <p className="mb-5 font-mono text-xs tracking-[0.12em] text-blue-300 uppercase">
              One governed signal
            </p>
            <h1 className="type-h2 max-w-[12ch] text-white">
              A brand system that can explain itself.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
              Human-readable for teams. Machine-readable for agents.
              Deterministic across products, websites, campaigns, and slides.
            </p>
          </div>
        </div>

        <aside
          className="sb-wonka-os-console relative z-10 m-5 mt-0 md:absolute md:right-7 md:bottom-7 md:m-0 md:w-[22rem]"
          aria-label="Design system status"
        >
          <div className="flex items-center justify-between border-b border-white/15 px-4 py-3">
            <span className="font-mono text-[0.625rem] tracking-[0.12em] text-white/55 uppercase">
              System status
            </span>
            <span className="font-mono text-[0.625rem] text-green-300">
              schemas.valid
            </span>
          </div>
          <dl className="divide-y divide-white/10">
            {[
              ["Canonical source", manifest.brandVersionId],
              ["Themes", manifest.themes.map((theme) => theme.id).join(" / ")],
              ["Policy", manifest.approval.status],
              ["Interface", "JSON + CLI + Storybook"],
            ].map(([label, value]) => (
              <div
                className="grid grid-cols-[0.8fr_1.2fr] gap-3 px-4 py-3"
                key={label}
              >
                <dt className="font-mono text-[0.625rem] tracking-wider text-white/45 uppercase">
                  {label}
                </dt>
                <dd className="text-right font-mono text-[0.6875rem] text-white/85">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section
        className="border-border grid border-x border-b sm:grid-cols-2 lg:grid-cols-5"
        aria-label="Design system inventory"
      >
        {systemStats.map((stat) => (
          <div
            className="sb-wonka-stat border-border px-6 py-7"
            key={stat.label}
          >
            <p className="text-text/65 font-mono text-[0.625rem] tracking-[0.12em] uppercase">
              {stat.label}
            </p>
            <p className="type-h5 mt-3">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="py-20">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <header>
            <p className="sb-wonka-kicker mb-4">Operating model</p>
            <h2 className="type-h4 max-w-[11ch]">
              From intent to a reproducible artifact.
            </h2>
            <p className="text-text/65 mt-5 max-w-md">
              The sequence is part of the contract. An agent cannot skip policy
              resolution or silently promote a candidate decision.
            </p>
          </header>

          <ol className="border-border border-t">
            {workflow.map((step, index) => (
              <li
                className="border-border grid gap-5 border-b py-6 sm:grid-cols-[3rem_0.8fr_1fr]"
                key={step.label}
              >
                <span className="text-foreground font-mono text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-medium">{step.label}</h3>
                  <p className="type-paragraph-s text-text/65 mt-1">
                    {step.detail}
                  </p>
                </div>
                <code className="bg-surface-muted text-text h-fit rounded-xs px-3 py-2 font-mono text-xs">
                  {step.command}
                </code>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-border bg-surface grid overflow-hidden rounded-sm border lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-7 md:p-10">
          <p className="sb-wonka-kicker mb-4">Machine surface</p>
          <h2 className="type-h5 max-w-[18ch]">
            Browse the same decisions humans see.
          </h2>
          <p className="text-text/65 mt-4 max-w-xl">
            Public catalogs carry stable IDs, schemas, lifecycle state,
            provenance, compatibility, and approval boundaries.
          </p>

          <div className="divide-border border-border mt-9 divide-y border-y">
            {machineSurfaces.map(([path, label]) => (
              <div
                className="grid gap-2 py-3 sm:grid-cols-[1fr_auto]"
                key={path}
              >
                <code className="font-mono text-xs break-all">{path}</code>
                <span className="type-paragraph-s text-text/65">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sb-wonka-trace-panel p-7 text-white md:p-10">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[0.625rem] tracking-[0.12em] text-blue-300 uppercase">
              Agent trace
            </span>
            <span className="size-2 rounded-full bg-green-400" aria-hidden />
          </div>
          <pre className="mt-8 overflow-x-auto font-mono text-xs leading-6 text-white/70">
            <code>{`{
  "designSystemVersion": "${manifest.version}",
  "brandVersionId": "${manifest.brandVersionId}",
  "channel": "channel.product",
  "theme": "dark",
  "policyStatus": "review_required",
  "tokens": [
    "semantic.color.background",
    "semantic.color.text",
    "semantic.color.surface",
    "semantic.color.border"
  ],
  "components": ["component.badge"],
  "assets": [],
  "patterns": ["pattern.system.brand-os"],
  "unresolvedDecisions": [
    "manifest.approval",
    "channel.product.approval"
  ]
}`}</code>
          </pre>
        </div>
      </section>

      <section className="py-20">
        <p className="sb-wonka-kicker mb-7">Design principles</p>
        <div className="border-border grid border-t md:grid-cols-2">
          {manifest.principles.map((principle, index) => (
            <article
              className="border-border py-7 md:pr-8 md:odd:border-r md:even:pl-8"
              key={principle.id}
            >
              <div className="flex items-baseline gap-4">
                <span className="text-text/65 font-mono text-[0.625rem]">
                  P{index + 1}
                </span>
                <h3 className="type-h6">{principle.name}</h3>
              </div>
              <p className="type-paragraph-m text-text/60 mt-3 pl-8">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const meta = {
  title: "Getting Started/Introduction",
  component: Introduction,
  parameters: {
    docs: {
      description: {
        component:
          "The operating system view of the Wonka brand: canonical decisions, channel policy, machine interfaces, and traceability.",
      },
    },
  },
} satisfies Meta<typeof Introduction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
