import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { tokenCatalog } from "../generated/tokens";
import { FoundationHeader, TokenMeta } from "./story-layout";

type CatalogToken = (typeof tokenCatalog.tokens)[number];

function ColorTokenCard({
  token,
}: {
  token: CatalogToken;
}) {
  const value =
    token.values.light === token.values.dark
      ? token.values.light
      : `${token.values.light} / ${token.values.dark}`;

  return (
    <article className="sb-wonka-token-card">
      <div
        className="h-28 border-b border-black/8"
        style={{ background: `var(${token.cssVariable})` }}
      />
      <TokenMeta
        id={token.id}
        value={value}
        description={token.description}
      />
    </article>
  );
}

function Colors() {
  const colors = tokenCatalog.tokens.filter(
    (token) =>
      token.type === "color" &&
      !token.id.startsWith("component.") &&
      !token.id.startsWith("semantic."),
  );
  const semanticColors = tokenCatalog.tokens.filter((token) =>
    token.id.startsWith("semantic.color."),
  );

  return (
    <main className="sb-wonka-page">
      <FoundationHeader
        eyebrow="Foundations · Color"
        title="Color has a job."
        description="Primitive colors preserve the Wonka palette. Semantic colors express intent and resolve through the active theme. Products and generated artifacts should prefer the semantic layer."
      />

      <section className="mb-16">
        <h2 className="type-h6 mb-6">Semantic color palette</h2>
        <div className="sb-wonka-token-grid">
          {semanticColors.map((token) => (
            <ColorTokenCard key={token.id} token={token} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="type-h6 mb-6">Primitive color palette</h2>
        <div className="sb-wonka-token-grid">
          {colors.map((token) => (
            <ColorTokenCard key={token.id} token={token} />
          ))}
        </div>
      </section>
    </main>
  );
}

const meta = {
  title: "Foundations/Colors",
  component: Colors,
  parameters: {
    docs: {
      description: {
        component:
          "Canonical primitive and semantic colors, generated from the token source rather than duplicated in documentation.",
      },
    },
  },
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {};
