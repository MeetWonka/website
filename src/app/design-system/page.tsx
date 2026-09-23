import type { Metadata } from "next";
import Link from "next/link";
import manifest from "../../../design-system/manifest.json";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "Wonka’s shared visual language for products, websites, campaigns, presentations, and agents.",
  robots: {
    index: false,
    follow: true,
  },
};

const catalogs = [
  {
    label: "Manifest",
    href: "/design-system/manifest.json",
    description: "Version, themes, channels, governance, and entry points.",
  },
  {
    label: "Tokens",
    href: "/design-system/tokens.json",
    description: "Resolved primitive, semantic, and component decisions.",
  },
  {
    label: "Components",
    href: "/design-system/components.json",
    description: "Stable IDs, variants, accessibility, and usage contracts.",
  },
  {
    label: "Assets",
    href: "/design-system/assets.json",
    description: "Candidate files, hashes, usage rules, and review status.",
  },
  {
    label: "Rules",
    href: "/design-system/rules.json",
    description: "Stable policy IDs, enforcement modes, scope, and provenance.",
  },
  {
    label: "Patterns",
    href: "/design-system/patterns.json",
    description:
      "Composition slots, dependencies, review triggers, and agent traces.",
  },
  {
    label: "Channels",
    href: "/design-system/channels.json",
    description: "Product, website, campaign, and presentation contracts.",
  },
  {
    label: "Exceptions",
    href: "/design-system/exceptions.json",
    description: "Exact, expiring deviations from approved rules.",
  },
  {
    label: "Agent guide",
    href: "/design-system/llms.txt",
    description: "Read order and required behavior for AI-generated work.",
  },
];

export default function DesignSystemPage() {
  return (
    <main className="bg-background text-text min-h-screen px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <section className="relative isolate overflow-hidden rounded-sm bg-black px-7 py-16 text-white md:px-12 md:py-24">
          <div
            aria-hidden
            className="absolute right-[-8%] bottom-[-42%] -z-10 h-[68%] w-[90%] rotate-[-2deg] bg-gradient-to-r from-blue-900 via-blue-400 to-green-400 opacity-90 [clip-path:polygon(4%_8%,100%_0,94%_100%,0_86%)]"
          />
          <p className="type-eyebrow mb-5 font-mono text-blue-300">
            v{manifest.version} · {manifest.brandVersionId} · {manifest.status}
          </p>
          <h1 className="type-h3 mb-7 max-w-4xl">
            One Wonka, across every surface.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-white/75">
            The canonical brand and interface system for products, websites,
            campaigns, presentations, and agent-generated artifacts.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              className="focus-visible:ring-info rounded-sm bg-white px-5 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none"
              href={manifest.interfaces.storybook.publicUrl}
            >
              Open Storybook
            </a>
            <a
              className="focus-visible:ring-info rounded-sm border border-white/30 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:outline-none"
              href="#catalogs"
            >
              Browse contracts
            </a>
          </div>
        </section>

        <section
          className="grid gap-10 py-16 lg:grid-cols-[1fr_1.25fr]"
          id="catalogs"
        >
          <div>
            <p className="type-eyebrow mb-4 text-blue-700">
              Machine-readable by default
            </p>
            <h2 className="type-h5">
              Humans browse the system. Agents query the same contracts.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {catalogs.map((catalog) => (
              <Link
                className="group border-border bg-surface hover:shadow-subtle-hover focus-visible:ring-info rounded-sm border p-5 transition-shadow focus-visible:ring-2 focus-visible:outline-none"
                href={catalog.href}
                key={catalog.href}
              >
                <h3 className="type-h6 mb-2">{catalog.label}</h3>
                <p className="type-paragraph-m text-text/65">
                  {catalog.description}
                </p>
                <span className="type-paragraph-s mt-5 block text-blue-700 group-hover:underline">
                  Open JSON
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
