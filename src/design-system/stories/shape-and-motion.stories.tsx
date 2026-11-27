import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { tokenCatalog } from "../generated/tokens";
import { FoundationHeader, TokenMeta } from "./story-layout";

function ShapeAndMotion() {
  const radii = tokenCatalog.tokens.filter((token) =>
    token.id.startsWith("radius."),
  );
  const shadows = tokenCatalog.tokens.filter((token) =>
    token.id.startsWith("shadow."),
  );
  const motion = tokenCatalog.tokens.filter((token) =>
    token.id.startsWith("motion."),
  );

  return (
    <main className="sb-wonka-page">
      <FoundationHeader
        eyebrow="Foundations · Shape & motion"
        title="Quiet structure, one expressive gesture."
        description="Surfaces stay disciplined. The slanted signal shape and a small set of purposeful transitions carry the distinctive movement."
      />

      <section className="mb-16">
        <h2 className="type-h6 mb-6">Radius</h2>
        <div className="sb-wonka-token-grid">
          {radii.map((token) => (
            <article className="sb-wonka-token-card p-4" key={token.id}>
              <div
                className="h-28 bg-blue-200"
                style={{ borderRadius: String(token.values.light) }}
              />
              <TokenMeta
                id={token.id}
                value={token.values.light}
                description={token.description}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="type-h6 mb-6">Elevation</h2>
        <div className="sb-wonka-token-grid">
          {shadows.map((token) => (
            <article className="sb-wonka-token-card p-4" key={token.id}>
              <div
                className="h-28 rounded-sm bg-surface"
                style={{ boxShadow: String(token.values.light) }}
              />
              <TokenMeta
                id={token.id}
                value={token.values.light}
                description={token.description}
              />
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="type-h6 mb-6">Motion</h2>
        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border">
          {motion.map((token) => (
            <div
              className="grid gap-2 bg-surface p-4 md:grid-cols-[1fr_1fr]"
              key={token.id}
            >
              <code className="sb-wonka-token-id">{token.id}</code>
              <code className="sb-wonka-token-value">
                {JSON.stringify(token.values.light)}
              </code>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const meta = {
  title: "Foundations/Shape and Motion",
  component: ShapeAndMotion,
} satisfies Meta<typeof ShapeAndMotion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tokens: Story = {};
