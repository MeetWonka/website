import type { Meta, StoryObj } from "@storybook/react-vite";
import { productDecorator } from "./product-story-layout";
import { CaptureExperience } from "../CaptureExperience";
const meta = {
  title: "Product/Motion",
  component: CaptureExperience,
  args: { scenario: "creation", frame: 0 },
  argTypes: {
    frame: { control: { type: "range", min: 0, max: 150, step: 1 } },
    scenario: {
      control: "select",
      options: ["creation", "connection", "execution", "sharing"],
    },
  },
  decorators: [productDecorator],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CaptureExperience>;
export default meta;
type Story = StoryObj<typeof meta>;
export const CreationBefore: Story = {
  render: () => <CaptureExperience scenario="creation" frame={0} />,
};
export const CreationAction: Story = {
  render: () => <CaptureExperience scenario="creation" frame={60} />,
};
export const CreationAfter: Story = {
  render: () => <CaptureExperience scenario="creation" frame={150} />,
};
export const Connection: Story = {
  render: () => <CaptureExperience scenario="connection" frame={100} />,
};
export const Execution: Story = {
  render: () => <CaptureExperience scenario="execution" frame={150} />,
};
export const Sharing: Story = {
  render: () => <CaptureExperience scenario="sharing" frame={150} />,
};

export const Timeline: Story = {};
