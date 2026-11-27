import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta = {
  title: "Data Display/Badge",
  component: Badge,
  args: {
    children: "Private deployment",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Compact metadata label. Badges are non-interactive and use semantic surface colors so they remain legible in both themes.",
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Group: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>GDPR</Badge>
      <Badge>EU hosted</Badge>
      <Badge>Private cloud</Badge>
    </div>
  ),
};
