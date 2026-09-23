import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "./section";

const meta = {
  title: "Layout/Section",
  component: Section,
  args: {
    as: "section",
    children: "Section content",
  },
  render: (args) => (
    <Section {...args} className="bg-surface-muted py-14">
      <div className="rounded-sm border border-border bg-surface p-7">
        <p className="sb-wonka-kicker mb-3">Default container</p>
        <h2 className="type-h6">A stable rhythm across narrative pages.</h2>
      </div>
    </Section>
  ),
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Wide: Story = {
  args: {
    wide: true,
  },
};
