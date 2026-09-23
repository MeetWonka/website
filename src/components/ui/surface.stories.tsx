import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Surface } from "./surface";

const meta = {
  title: "Layout/Surface",
  component: Surface,
  args: {
    variant: "card",
    children: "Surface content",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["card", "panel", "callout", "pill"],
    },
  },
  render: (args) => (
    <Surface
      {...args}
      className="border border-border bg-surface p-7 shadow-subtle"
    >
      <p className="sb-wonka-kicker mb-3">Private by design</p>
      <h2 className="type-h6 mb-3">Your knowledge stays under your control.</h2>
      <p className="type-paragraph-m max-w-lg text-text/65">
        Surface groups related content. Its variant describes the role of the
        container, not a decorative preference.
      </p>
    </Surface>
  ),
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {};

export const Callout: Story = {
  args: {
    variant: "callout",
  },
};

export const Pill: Story = {
  args: {
    variant: "pill",
  },
};
