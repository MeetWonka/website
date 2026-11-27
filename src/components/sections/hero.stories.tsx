import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Hero } from "./hero";

const meta = {
  title: "Compositions/Homepage Hero Experiment",
  component: Hero,
  args: {
    meetingUrl: "/contact",
    meetingLabel: "Book a 30 min call",
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

async function expectSingleCta(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await expect(
    canvas.getAllByRole("link", { name: "Book a 30 min call" }),
  ).toHaveLength(1);
  return canvas;
}

export const Control: Story = {
  play: async ({ canvasElement }) => {
    const canvas = await expectSingleCta(canvasElement);
    await expect(
      canvas.queryByAltText(/WonkaChat interface/i),
    ).not.toBeInTheDocument();
  },
};

export const ProductSide: Story = {
  args: {
    variant: "product-side",
  },
  play: async ({ canvasElement }) => {
    const canvas = await expectSingleCta(canvasElement);
    await expect(
      canvas.getByAltText(/WonkaChat interface/i),
    ).toBeInTheDocument();
  },
};

export const ProductBelow: Story = {
  args: {
    variant: "product-below",
  },
  play: async ({ canvasElement }) => {
    const canvas = await expectSingleCta(canvasElement);
    await expect(
      canvas.getByAltText(/WonkaChat interface/i),
    ).toBeInTheDocument();
  },
};

export const VoiceAction: Story = {
  args: {
    variant: "voice-action",
  },
  play: async ({ canvasElement }) => {
    const canvas = await expectSingleCta(canvasElement);
    await expect(
      canvas.getByText("Create an opportunity in Odoo."),
    ).toBeInTheDocument();
  },
};

export const CustomerProof: Story = {
  args: {
    variant: "customer-proof",
  },
  play: async ({ canvasElement }) => {
    const canvas = await expectSingleCta(canvasElement);
    await expect(canvas.getByText("AI in production")).toBeInTheDocument();
    await expect(
      canvas.getByText("From a first workflow to company-wide adoption."),
    ).toBeInTheDocument();
  },
};
