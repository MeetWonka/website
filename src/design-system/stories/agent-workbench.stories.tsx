import { Badge, Button, Eyebrow, Surface } from "@wonka/react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import assetCatalog from "../../../public/design-system/assets.json";
import componentCatalog from "../../../public/design-system/components.json";
import {
  channelCatalog,
  designSystemManifest,
  exceptionCatalog,
  patternCatalog,
  ruleCatalog,
  type ChannelId,
} from "../generated/contracts";
import { tokenCatalog } from "../generated/tokens";

type Channel = (typeof channelCatalog.channels)[number];
type DecisionItem = { id: string };
type DecisionState = "effective" | "candidate" | "blocked";

function projectPolicy(channel: Channel) {
  const approved =
    String(designSystemManifest.approval.status) === "approved" &&
    String(channel.lifecycle) === "active";
  const channelId = String(channel.id);
  const channelRules = ruleCatalog.rules.filter((rule) =>
    new Set<string>(rule.channelIds).has(channelId),
  );
  const rules = channelRules.filter(
    (rule) => approved && String(rule.lifecycle) === "active",
  );
  const effectiveRuleIds = new Set<string>(rules.map((rule) => rule.id));
  const candidateRules = channelRules.filter(
    (rule) =>
      !effectiveRuleIds.has(rule.id) &&
      !["deprecated", "retired"].includes(String(rule.lifecycle)),
  );
  const blockedRuleIds = new Set<string>(
    channelRules
      .filter((rule) =>
        ["deprecated", "retired"].includes(String(rule.lifecycle)),
      )
      .map((rule) => rule.id),
  );
  const blockedRules = channelRules.filter((rule) =>
    blockedRuleIds.has(rule.id),
  );

  const compatibleAssetIds = new Set<string>(channel.compatibleAssetIds);
  const compatibleAssets = assetCatalog.assets.filter((asset) =>
    compatibleAssetIds.has(asset.id),
  );
  const today = new Date().toISOString().slice(0, 10);
  const rightsExpired = (asset: (typeof assetCatalog.assets)[number]) => {
    const expiresAt: unknown = asset.rights.expiresAt;
    return typeof expiresAt === "string" && expiresAt < today;
  };
  const rightsCoverChannel = (asset: (typeof assetCatalog.assets)[number]) =>
    asset.rights.license === "verified_redistributable" ||
    (String(channel.distribution) === "internal" &&
      asset.rights.license === "verified_internal");
  const assetIsBlocked = (asset: (typeof assetCatalog.assets)[number]) =>
    String(asset.lifecycle) === "superseded" ||
    rightsExpired(asset) ||
    !rightsCoverChannel(asset);
  const assetIsIndependentlyUsable = (
    asset: (typeof assetCatalog.assets)[number],
  ) => String(asset.lifecycle) === "active" && !assetIsBlocked(asset);
  const assets = approved
    ? compatibleAssets.filter(assetIsIndependentlyUsable)
    : [];
  const effectiveAssetIds = new Set<string>(assets.map((asset) => asset.id));
  const blockedAssetIds = new Set<string>(
    compatibleAssets.filter(assetIsBlocked).map((asset) => asset.id),
  );
  const candidateAssets = compatibleAssets.filter(
    (asset) => !effectiveAssetIds.has(asset.id) && !assetIsBlocked(asset),
  );
  const blockedAssets = compatibleAssets.filter(assetIsBlocked);

  const compatibleComponentIds = new Set<string>(
    channel.compatibleComponentIds,
  );
  const compatibleComponents = componentCatalog.components.filter((component) =>
    compatibleComponentIds.has(component.id),
  );
  const componentIsBlocked = (
    component: (typeof componentCatalog.components)[number],
  ) =>
    ["deprecated", "retired"].includes(String(component.status)) ||
    (component.assets ?? []).some((assetId) => blockedAssetIds.has(assetId));
  const components = compatibleComponents.filter(
    (component) =>
      approved &&
      component.status === "stable" &&
      !componentIsBlocked(component) &&
      (component.assets ?? []).every((assetId) =>
        effectiveAssetIds.has(assetId),
      ),
  );
  const effectiveComponentIds = new Set<string>(
    components.map((component) => component.id),
  );
  const candidateComponents = compatibleComponents.filter(
    (component) =>
      !effectiveComponentIds.has(component.id) &&
      !componentIsBlocked(component),
  );
  const blockedComponents = compatibleComponents.filter(componentIsBlocked);

  const compatiblePatterns = patternCatalog.patterns.filter(
    (pattern) =>
      pattern.kind === "artifact" &&
      new Set<string>(pattern.channelIds).has(channelId),
  );
  const patternIsBlocked = (
    pattern: (typeof patternCatalog.patterns)[number],
  ) =>
    ["deprecated", "retired"].includes(String(pattern.status)) ||
    pattern.requiredAssetIds.some((assetId) => blockedAssetIds.has(assetId)) ||
    pattern.requiredRuleIds.some(
      (ruleId) =>
        blockedRuleIds.has(ruleId) ||
        !channelRules.some((rule) => rule.id === ruleId),
    ) ||
    pattern.requiredComponentIds.some((componentId) => {
      const component = compatibleComponents.find(
        (candidate) => candidate.id === componentId,
      );
      return !component || componentIsBlocked(component);
    });
  const patterns = compatiblePatterns.filter(
    (pattern) =>
      approved &&
      String(pattern.status) === "stable" &&
      !patternIsBlocked(pattern) &&
      pattern.requiredComponentIds.every((componentId) =>
        effectiveComponentIds.has(componentId),
      ) &&
      pattern.requiredAssetIds.every((assetId) =>
        effectiveAssetIds.has(assetId),
      ) &&
      pattern.requiredRuleIds.every((ruleId) => effectiveRuleIds.has(ruleId)),
  );
  const effectivePatternIds = new Set<string>(
    patterns.map((pattern) => pattern.id),
  );
  const candidatePatterns = compatiblePatterns.filter(
    (pattern) =>
      !effectivePatternIds.has(pattern.id) &&
      !patternIsBlocked(pattern) &&
      !["deprecated", "retired"].includes(String(pattern.status)),
  );
  const blockedPatterns = compatiblePatterns.filter(patternIsBlocked);

  const allowedTokens = tokenCatalog.tokens.filter((token) =>
    channel.tokenSets.some(
      (set) =>
        String(token.id) === String(set) || token.id.startsWith(`${set}.`),
    ),
  );
  const tokens = approved ? allowedTokens : [];
  const candidateTokens = approved ? [] : allowedTokens;
  const blockedTokens: typeof allowedTokens = [];

  const decisionGroups = [
    {
      label: "Tokens",
      effective: tokens,
      candidate: candidateTokens,
      blocked: blockedTokens,
    },
    {
      label: "Rules",
      effective: rules,
      candidate: candidateRules,
      blocked: blockedRules,
    },
    {
      label: "Components",
      effective: components,
      candidate: candidateComponents,
      blocked: blockedComponents,
    },
    {
      label: "Assets",
      effective: assets,
      candidate: candidateAssets,
      blocked: blockedAssets,
    },
    {
      label: "Patterns",
      effective: patterns,
      candidate: candidatePatterns,
      blocked: blockedPatterns,
    },
  ];

  return {
    approved,
    policyStatus: approved ? "effective" : "review_required",
    decisionGroups,
    counts: {
      effective: decisionGroups.reduce(
        (total, group) => total + group.effective.length,
        0,
      ),
      candidate: decisionGroups.reduce(
        (total, group) => total + group.candidate.length,
        0,
      ),
      blocked: decisionGroups.reduce(
        (total, group) => total + group.blocked.length,
        0,
      ),
    },
    patterns,
    candidatePatterns,
    blockedPatterns,
  };
}

function statusClasses(state: DecisionState) {
  if (state === "effective") {
    return "border-success/35 bg-green-100 text-green-900";
  }

  if (state === "candidate") {
    return "border-warning/35 bg-orange-300 text-black";
  }

  return "border-border bg-surface-muted text-text";
}

function traceValue(items: readonly DecisionItem[], showDecisionIds: boolean) {
  return showDecisionIds ? items.map((item) => item.id) : items.length;
}

function StatusIcon({ approved }: { approved: boolean }) {
  return approved ? (
    <svg aria-hidden className="size-5" fill="none" viewBox="0 0 24 24">
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  ) : (
    <svg aria-hidden className="size-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 8v5m0 3.5v.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CopyGlyph() {
  return (
    <svg aria-hidden className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M8 8V5.5A1.5 1.5 0 0 1 9.5 4h9A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H16m-10.5-8h9A1.5 1.5 0 0 1 16 9.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 18.5v-9A1.5 1.5 0 0 1 5.5 8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function AgentWorkbench({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [selectedChannelId, setSelectedChannelId] =
    useState<ChannelId>("channel.product");
  const [showDecisionIds, setShowDecisionIds] = useState(false);
  const selectedChannel =
    channelCatalog.channels.find(
      (channel) => channel.id === selectedChannelId,
    ) ?? channelCatalog.channels[0];
  const projection = projectPolicy(selectedChannel);
  const patternRows = [
    ...projection.patterns.map((pattern) => ({
      pattern,
      state: "effective" as const,
    })),
    ...projection.candidatePatterns.map((pattern) => ({
      pattern,
      state: "candidate" as const,
    })),
    ...projection.blockedPatterns.map((pattern) => ({
      pattern,
      state: "blocked" as const,
    })),
  ];
  const traceDecisions = Object.fromEntries(
    projection.decisionGroups.map((group) => [
      group.label.toLowerCase(),
      {
        effective: traceValue(group.effective, showDecisionIds),
        candidate: traceValue(group.candidate, showDecisionIds),
        blocked: traceValue(group.blocked, showDecisionIds),
      },
    ]),
  );
  const trace = JSON.stringify(
    {
      projection: "generated_contracts_documentation",
      canonicalCommand: `bun run ds:query -- policy --channel ${selectedChannel.aliases[0]}`,
      designSystemVersion: designSystemManifest.version,
      brandVersionId: designSystemManifest.brandVersionId,
      tokenCatalogVersion: tokenCatalog.version,
      policyStatus: projection.policyStatus,
      channel: selectedChannel.id,
      distribution: selectedChannel.distribution,
      theme,
      counts: projection.counts,
      ...traceDecisions,
      unresolvedDecisions: {
        candidate: projection.counts.candidate,
        blocked: projection.counts.blocked,
      },
      humanApprovalRequired:
        designSystemManifest.governance.humanApprovalRequired,
    },
    null,
    2,
  );

  return (
    <main className="sb-wonka-page py-8 sm:py-12 lg:py-16">
      <header className="border-border mb-10 grid gap-7 border-b pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <Eyebrow>Agent policy console</Eyebrow>
          <h1 className="type-h4 mt-6 max-w-2xl">
            Resolve the contract before you create.
          </h1>
          <p className="text-text/70 mt-5 max-w-2xl">
            Select an output channel to inspect its generated-contract
            projection. The CLI remains the canonical policy interface.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <Badge>{designSystemManifest.brandVersionId}</Badge>
          <Badge className="font-mono">
            system {designSystemManifest.version}
          </Badge>
        </div>
      </header>

      <fieldset className="mb-8">
        <legend className="sb-wonka-kicker mb-4">
          Choose an output channel
        </legend>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {channelCatalog.channels.map((channel) => {
            const selected = channel.id === selectedChannel.id;

            return (
              <label className="relative cursor-pointer" key={channel.id}>
                <input
                  checked={selected}
                  className="peer sr-only"
                  name="agent-channel"
                  onChange={() => setSelectedChannelId(channel.id)}
                  type="radio"
                  value={channel.id}
                />
                <span className="border-border bg-surface peer-checked:bg-accent peer-focus-visible:ring-offset-background block h-full rounded-sm border p-4 transition-colors duration-[var(--ds-motion-duration-fast)] peer-checked:border-blue-400 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ds-component-focus-ring-color)] peer-focus-visible:ring-offset-2 motion-reduce:transition-none">
                  <span className="flex items-start justify-between gap-4">
                    <span className="type-paragraph-m-bold">
                      {channel.name}
                    </span>
                    <span
                      aria-hidden
                      className={
                        selected
                          ? "mt-2 h-1 w-8 bg-blue-400"
                          : "bg-border mt-2 h-1 w-8"
                      }
                    />
                  </span>
                  <span
                    className={
                      selected
                        ? "mt-2 block font-mono text-xs text-white/70"
                        : "text-text/65 mt-2 block font-mono text-xs"
                    }
                  >
                    {channel.id}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <p aria-live="polite" className="sr-only">
        {selectedChannel.name} selected. {projection.counts.effective}{" "}
        effective, {projection.counts.candidate} candidate, and{" "}
        {projection.counts.blocked} blocked decisions.
      </p>

      <Surface
        className="border-border bg-surface relative mb-8 overflow-hidden border p-5 sm:p-7"
        variant="panel"
      >
        <div
          aria-hidden
          className="absolute top-0 right-0 h-2 w-40 bg-blue-400 [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)] sm:w-64"
        />
        <div className="grid gap-7 xl:grid-cols-[1.1fr_1fr] xl:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                className={
                  projection.approved
                    ? statusClasses("effective")
                    : statusClasses("candidate")
                }
              >
                <span className="mr-2">
                  <StatusIcon approved={projection.approved} />
                </span>
                {projection.approved ? "Policy effective" : "Review required"}
              </Badge>
              <span className="text-text/65 font-mono text-xs">
                generated-contract projection
              </span>
            </div>
            <h2 className="type-h5 mt-5">{selectedChannel.name} readiness</h2>
            <p className="type-paragraph-m text-text/65 mt-3 max-w-2xl">
              {projection.approved
                ? "The manifest and channel are active. Effective decisions may be used within the constraints below."
                : `No decision is effective while the manifest or ${selectedChannel.id} awaits named human approval.`}
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              {
                label: "Allowed",
                detail: "effective",
                value: projection.counts.effective,
                dotClassName: "bg-success",
              },
              {
                label: "Candidate",
                detail: "review",
                value: projection.counts.candidate,
                dotClassName: "bg-warning",
              },
              {
                label: "Blocked",
                detail: "dependency",
                value: projection.counts.blocked,
                dotClassName: "bg-text/45",
              },
            ].map((count) => (
              <div
                className="border-border bg-surface-muted rounded-xs border p-3 sm:p-4"
                key={count.label}
              >
                <dt className="text-text/60 flex items-center gap-2 font-mono text-[0.625rem] tracking-wider uppercase">
                  <span
                    aria-hidden
                    className={`size-1.5 rounded-full ${count.dotClassName}`}
                  />
                  {count.label}
                </dt>
                <dd className="mt-3">
                  <span className="font-mono text-2xl font-medium sm:text-3xl">
                    {count.value}
                  </span>
                  <span className="text-text/70 mt-1 block text-[0.625rem]">
                    {count.detail}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Surface>

      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0 space-y-8">
          <Surface className="border-border bg-surface border" variant="card">
            <div className="border-border border-b p-5 sm:p-6">
              <p className="sb-wonka-kicker">Decision inventory</p>
              <h2 className="type-h6 mt-3">
                Effective, candidate, and blocked stay separate.
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left">
                <caption className="sr-only">
                  Policy decision counts for {selectedChannel.name}
                </caption>
                <thead className="border-border text-text/70 border-b font-mono text-[0.625rem] tracking-wider uppercase">
                  <tr>
                    <th className="px-5 py-3 font-medium sm:px-6">Kind</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Effective
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      Candidate
                    </th>
                    <th className="px-5 py-3 text-right font-medium sm:px-6">
                      Blocked
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {projection.decisionGroups.map((group) => (
                    <tr key={group.label}>
                      <th className="px-5 py-3 text-sm font-medium sm:px-6">
                        {group.label}
                      </th>
                      <td className="text-success px-4 py-3 text-right font-mono text-sm">
                        {group.effective.length}
                      </td>
                      <td className="text-text px-4 py-3 text-right font-mono text-sm">
                        {group.candidate.length}
                      </td>
                      <td className="text-text/60 px-5 py-3 text-right font-mono text-sm sm:px-6">
                        {group.blocked.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Surface>

          <section aria-labelledby="constraints-heading">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="sb-wonka-kicker">Channel contract</p>
                <h2 className="type-h6 mt-3" id="constraints-heading">
                  Constraints that travel with the output
                </h2>
              </div>
              <Badge className="font-mono">
                {selectedChannel.exportTargets.join(" · ")}
              </Badge>
            </div>
            <ol className="divide-border border-border divide-y border-y">
              {selectedChannel.constraints.map((constraint, index) => (
                <li
                  className="grid gap-3 py-4 sm:grid-cols-[2.5rem_1fr_auto] sm:items-start"
                  key={constraint.id}
                >
                  <span aria-hidden className="text-text/65 font-mono text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="type-paragraph-m-bold">
                      {constraint.id.replaceAll("-", " ")}
                    </h3>
                    <p className="type-paragraph-s text-text/65 mt-1">
                      {constraint.value}
                    </p>
                    {"ruleId" in constraint ? (
                      <code className="text-text/65 mt-2 block font-mono text-[0.625rem]">
                        {constraint.ruleId}
                      </code>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <Badge>{constraint.level}</Badge>
                    <Badge className="font-mono">
                      {constraint.enforcement}
                    </Badge>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="patterns-heading">
            <div className="mb-4">
              <p className="sb-wonka-kicker">Compatible patterns</p>
              <h2 className="type-h6 mt-3" id="patterns-heading">
                Compositions resolved for this channel
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {patternRows.map(({ pattern, state }) => (
                <Surface
                  className="border-border bg-surface border p-4"
                  key={pattern.id}
                  variant="callout"
                >
                  <div className="flex items-start justify-between gap-3">
                    <code className="text-text/65 font-mono text-[0.625rem] break-all">
                      {pattern.id}
                    </code>
                    <Badge className={statusClasses(state)}>{state}</Badge>
                  </div>
                  <h3 className="type-paragraph-m-bold mt-4">{pattern.name}</h3>
                  <p className="type-paragraph-s text-text/60 mt-1">
                    {pattern.description}
                  </p>
                  <p className="text-text/65 mt-3 font-mono text-[0.625rem]">
                    inputs · {pattern.agent.requiredInputs.join(" · ")}
                  </p>
                </Surface>
              ))}
            </div>
          </section>
        </div>

        <aside className="min-w-0 space-y-6" aria-label="Policy trace">
          <Surface
            className="bg-accent overflow-hidden border border-blue-700 text-white"
            variant="panel"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 p-4">
              <div>
                <p className="font-mono text-[0.625rem] tracking-wider text-blue-300 uppercase">
                  Canonical query
                </p>
                <p className="mt-1 text-sm font-medium">CLI + JSON preview</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 font-mono text-[0.625rem] text-white/75">
                <CopyGlyph />
                Copy-ready
              </span>
            </div>
            <code className="block overflow-x-auto border-b border-white/15 bg-black/20 p-4 font-mono text-xs leading-6 text-blue-200">
              $ bun run ds:query -- policy --channel{" "}
              {selectedChannel.aliases[0]}
            </code>
            <pre
              aria-label={`${selectedChannel.name} policy JSON projection`}
              className="max-h-[34rem] overflow-auto p-4 font-mono text-xs leading-6 text-white/80 focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:outline-none focus-visible:ring-inset"
              tabIndex={0}
            >
              <code>{trace}</code>
            </pre>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 p-4">
              <p className="max-w-xs text-xs leading-5 text-white/60">
                This preview mirrors generated contracts. Run the command for
                the canonical policy result.
              </p>
              <Button
                aria-expanded={showDecisionIds}
                className="text-white"
                onClick={() => setShowDecisionIds((current) => !current)}
                type="button"
                variant="underline"
              >
                {showDecisionIds ? "Show counts" : "Show decision IDs"}
              </Button>
            </div>
          </Surface>

          <Surface
            className="border-border bg-surface border p-5"
            variant="card"
          >
            <p className="sb-wonka-kicker">Provenance</p>
            <dl className="divide-border border-border mt-5 divide-y border-y">
              {[
                ["Source", selectedChannel.provenance.source],
                ["Owner", selectedChannel.provenance.owner],
                ["Introduced", selectedChannel.introducedIn],
                ["Stability", selectedChannel.stability],
                ["Distribution", selectedChannel.distribution],
                [
                  "Approved by",
                  selectedChannel.provenance.approvedBy ??
                    "Pending human approval",
                ],
                [
                  "Exceptions",
                  `${exceptionCatalog.exceptions.length} recorded`,
                ],
              ].map(([label, value]) => (
                <div
                  className="grid grid-cols-[6.5rem_1fr] gap-4 py-3"
                  key={label}
                >
                  <dt className="text-text/70 font-mono text-[0.625rem] tracking-wider uppercase">
                    {label}
                  </dt>
                  <dd className="type-paragraph-s text-text/75 break-words">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="type-paragraph-s text-text/65 mt-4">
              Catalog lineage: {tokenCatalog.version} tokens ·{" "}
              {patternCatalog.version} patterns · {channelCatalog.version}{" "}
              channels
            </p>
          </Surface>
        </aside>
      </div>
    </main>
  );
}

const meta = {
  title: "Governance/Agent Workbench",
  component: AgentWorkbench,
  parameters: {
    docs: {
      description: {
        component:
          "Interactive generated-contract projection for agents selecting a channel and reviewing policy readiness, decision states, constraints, patterns, provenance, and the trace contract. The CLI policy command remains canonical.",
      },
    },
  },
} satisfies Meta<typeof AgentWorkbench>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Workbench: Story = {
  render: (_args, context) => (
    <AgentWorkbench
      theme={context.globals.theme === "dark" ? "dark" : "light"}
    />
  ),
};
