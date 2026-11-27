import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Eyebrow } from "./eyebrow";

const meta = {
  title: "Data Display/Eyebrow",
  component: Eyebrow,
  args: {
    children: "Data sovereignty",
  },
  parameters: {
    docs: {
      description: {
        component:
          "A structural label that introduces a section or category. It should name the content, not decorate it.",
      },
    },
  },
} satisfies Meta<typeof Eyebrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
