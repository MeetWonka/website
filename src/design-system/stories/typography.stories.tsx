import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { tokenCatalog } from "../generated/tokens";
import { FoundationHeader } from "./story-layout";

const specimens = [
  {
    id: "typography.h1",
    className: "type-h1",
    sample: "Private AI, made useful.",
  },
  {
    id: "typography.h2",
    className: "type-h2",
    sample: "Knowledge that stays yours.",
  },
  {
    id: "typography.h3",
    className: "type-h3",
    sample: "From questions to governed action.",
  },
  {
    id: "typography.h4",
    className: "type-h4",
    sample: "Built around the way your teams work.",
  },
  {
    id: "typography.h5",
    className: "type-h5",
    sample: "A clear editorial voice.",
  },
  {
    id: "typography.h6",
    className: "type-h6",
    sample: "A precise interface hierarchy.",
  },
  {
    id: "typography.body",
    className: "type-body",
    sample:
      "Wonka connects private AI agents to the tools and knowledge a company already uses.",
  },
];

function Typography() {
  const typography = new Map<
    string,
    (typeof tokenCatalog.tokens)[number]
  >(
    tokenCatalog.tokens
      .filter((token) => token.id.startsWith("typography."))
      .map((token) => [token.id, token]),
  );

  return (
    <main className="sb-wonka-page">
      <FoundationHeader
        eyebrow="Foundations · Typography"
        title="Editorial character, product discipline."
        description="GT Sectra adds a measured editorial voice to important ideas. Inter Display keeps products, explanations, and controls direct and readable."
      />

      <div className="grid gap-12">
        {specimens.map((specimen) => {
          const token = typography.get(specimen.id);
          return (
            <section
              className="grid gap-5 border-t border-border pt-7 lg:grid-cols-[14rem_1fr]"
              key={specimen.id}
            >
              <div>
                <code className="sb-wonka-token-id">{specimen.id}</code>
                <p className="sb-wonka-token-value mt-2">
                  {token ? JSON.stringify(token.values.light) : null}
                </p>
              </div>
              <p className={specimen.className}>{specimen.sample}</p>
            </section>
          );
        })}
      </div>
    </main>
  );
}

const meta = {
  title: "Foundations/Typography",
  component: Typography,
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
