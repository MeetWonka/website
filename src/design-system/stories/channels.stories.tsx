import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  channelCatalog,
  ruleCatalog,
} from "../generated/contracts";
import { FoundationHeader } from "./story-layout";

function ChannelSignal({ channelId }: { channelId: string }) {
  if (channelId === "channel.campaign") {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-black p-5 text-white">
        <div
          aria-hidden
          className="absolute right-[-16%] bottom-[-28%] h-[55%] w-[115%] rotate-[-4deg] bg-blue-400 [clip-path:polygon(5%_9%,100%_0,94%_100%,0_86%)]"
        />
        <p className="type-eyebrow relative text-blue-300">Campaign</p>
        <p className="type-h6 relative mt-8 max-w-[12ch]">
          Private AI, built for Europe.
        </p>
      </div>
    );
  }

  if (channelId === "channel.presentation") {
    return (
      <div className="aspect-video rounded-sm border border-border bg-surface p-5">
        <p className="type-eyebrow text-text">01 / Decision</p>
        <p className="type-h6 mt-5 max-w-[16ch]">
          One evidence unit per slide.
        </p>
        <div className="mt-5 h-1 w-20 bg-blue-400" aria-hidden />
      </div>
    );
  }

  if (channelId === "channel.product") {
    return (
      <div className="aspect-[4/3] rounded-sm border border-border bg-surface p-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="type-eyebrow">Agent workspace</span>
          <span className="size-2 rounded-full bg-success" />
        </div>
        <div className="mt-4 grid grid-cols-[0.45fr_1fr] gap-3">
          <div className="h-24 rounded-xs bg-surface-muted" />
          <div className="space-y-2">
            <div className="h-5 rounded-xs bg-surface-muted" />
            <div className="h-12 rounded-xs bg-surface-muted" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-blue-100 p-5">
      <p className="type-eyebrow text-blue-700">Website</p>
      <p className="type-h6 mt-7 max-w-[13ch] text-black">
        Editorial clarity, explicit action.
      </p>
      <div
        aria-hidden
        className="absolute right-[-12%] bottom-[-15%] h-[34%] w-[82%] rotate-[-3deg] bg-blue-600 [clip-path:polygon(4%_8%,100%_0,94%_100%,0_86%)]"
      />
    </div>
  );
}

function Channels() {
  return (
    <main className="sb-wonka-page py-12">
      <FoundationHeader
        eyebrow="Channel contracts"
        title="One system, explicit output policies."
        description="Each channel declares its aliases, formats, constraints, compatible components, assets, and approval state. Agents query these contracts before generating an artifact."
      />

      <section className="grid gap-5 lg:grid-cols-2">
        {channelCatalog.channels.map((channel) => (
          <article
            className="grid gap-6 rounded-sm border border-border bg-surface p-5 sm:grid-cols-[0.8fr_1.2fr]"
            key={channel.id}
          >
            <div className="min-w-0">
              <ChannelSignal channelId={channel.id} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <code className="font-mono text-xs text-text">
                  {channel.id}
                </code>
                <span className="rounded-full bg-surface-muted px-2 py-1 font-mono text-[0.625rem] uppercase tracking-wider">
                  {channel.lifecycle}
                </span>
              </div>
              <h2 className="type-h6 mt-3">{channel.name}</h2>
              <p className="type-paragraph-m mt-2 text-text/65">
                {channel.description}
              </p>
              <dl className="mt-5 grid gap-3 border-t border-border pt-4 text-sm">
                <div>
                  <dt className="type-eyebrow text-text/70">Aliases</dt>
                  <dd className="mt-1 font-mono text-xs">
                    {channel.aliases.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="type-eyebrow text-text/70">Exports</dt>
                  <dd className="mt-1 font-mono text-xs">
                    {channel.exportTargets.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="type-eyebrow text-text/70">
                    Compatible components
                  </dt>
                  <dd className="mt-1 text-xs text-text/65">
                    {channel.compatibleComponentIds.join(", ")}
                  </dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12 grid gap-8 border-t border-border pt-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="sb-wonka-kicker mb-4">Agent policy query</p>
          <h2 className="type-h5">
            Retrieve the complete contract before creating.
          </h2>
          <code className="mt-5 block rounded-sm bg-accent p-4 font-mono text-sm text-white">
            bun run ds:query -- policy --channel campaign
          </code>
        </div>
        <div>
          <p className="sb-wonka-kicker mb-4">
            {ruleCatalog.rules.length} governed rules
          </p>
          <div className="divide-y divide-border border-y border-border">
            {ruleCatalog.rules.map((rule) => (
              <div
                className="grid gap-2 py-4 sm:grid-cols-[0.65fr_1fr]"
                key={rule.id}
              >
                <code className="font-mono text-xs text-text">
                  {rule.id}
                </code>
                <p className="type-paragraph-s text-text/65">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const meta = {
  title: "Governance/Channels",
  component: Channels,
  parameters: {
    docs: {
      description: {
        component:
          "Human-readable projection of the channel and rule catalogs exposed to agents.",
      },
    },
  },
} satisfies Meta<typeof Channels>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contracts: Story = {};
