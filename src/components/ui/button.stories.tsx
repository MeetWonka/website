import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button, ButtonLink } from "./button";

const meta = {
  title: "Actions/Button",
  component: Button,
  args: {
    children: "Start a project",
    variant: "primary",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "underline",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Wonka’s primary action primitive. The slanted silhouette is a signature brand element and the action color is selected for WCAG AA text contrast.",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", {
      name: "Start a project",
    });

    await userEvent.tab();
    await expect(button).toHaveFocus();
    await expect(button).toBeEnabled();
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "See how it works",
  },
  decorators: [
    (Story) => (
      <div className="bg-black p-10">
        <Story />
      </div>
    ),
  ],
};

export const Underline: Story = {
  args: {
    variant: "underline",
    children: "Read the case study",
  },
};

export const Link: Story = {
  render: () => (
    <ButtonLink href="/contact" variant="primary">
      Talk to Wonka
    </ButtonLink>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("link", { name: "Talk to Wonka" }),
    ).toHaveAttribute("href", "/contact");
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "default",
    children: "Delete workspace",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "default",
    children: "Cancel",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "default",
    children: "Dismiss",
  },
};

export const LinkVariant: Story = {
  args: {
    variant: "link",
    size: "default",
    children: "Learn more",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Unavailable",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "Unavailable" }),
    ).toBeDisabled();
  },
};
