import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import * as UI from "../../../../../packages/product-ui/src";
import * as F from "../fixtures";
import { productDecorator } from "./product-story-layout";
const meta = {
  title: "Product/Resources",
  decorators: [productDecorator],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Skills: Story = {
  render: () => (
    <UI.SkillLibrary
      skills={F.skills}
      search=""
      onSearchChange={() => {}}
      onOpen={() => {}}
      onToggle={() => {}}
    />
  ),
};
export const SkillInstructions: Story = {
  render: () => <UI.SkillDetail skill={F.skills[0]} onChange={() => {}} />,
};
function Approval() {
  const [state, setState] = useState<"pending" | "approved" | "rejected">(
    "pending",
  );
  return (
    <UI.ApprovalCard
      tool="Odoo"
      action="Mettre à jour la proposition"
      details="Client : Northstar. Périmètre proposé : trois sites."
      state={state}
      onApprove={() => setState("approved")}
      onReject={() => setState("rejected")}
    />
  );
}
export const ToolApproval: Story = {
  render: () => <Approval />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole("button", { name: "Refuser" }));
    await expect(c.getByText("Action refusée")).toBeVisible();
    await expect(
      c.queryByRole("button", { name: "Autoriser cette action" }),
    ).not.toBeInTheDocument();
  },
};
export const Onboarding: Story = {
  render: () => (
    <UI.OnboardingChecklist
      steps={[
        {
          id: "tools",
          title: "Connecter vos outils",
          description: "Outlook et Odoo sont connectés.",
          complete: true,
        },
        {
          id: "agent",
          title: "Créer votre agent",
          description: "Décrivez son objectif.",
          complete: false,
        },
      ]}
      onOpen={() => {}}
    />
  ),
};
export const ScheduledRuns: Story = {
  render: () => (
    <UI.WorkflowRuns
      runs={[
        {
          id: "1",
          name: "Brief client",
          date: "Chaque lundi, 09:00",
          state: "complete",
        },
        {
          id: "2",
          name: "Synthèse",
          date: "Chaque jour, 08:00",
          state: "error",
        },
      ]}
      onOpen={() => {}}
    />
  ),
};
export const Prompts: Story = {
  render: () => (
    <UI.PromptLibrary
      prompts={[{ id: "1", title: "Préparer un rendez-vous", body: F.request }]}
      search=""
      onSearchChange={() => {}}
      onUse={() => {}}
    />
  ),
};
export const Notification: Story = {
  render: () => (
    <UI.NotificationToast message="Agent enregistré." onDismiss={() => {}} />
  ),
};
