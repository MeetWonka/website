import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import * as UI from "../../../../../packages/product-ui/src";
import * as F from "../fixtures";
import { productDecorator } from "./product-story-layout";
const meta = {
  title: "Product/Workspace",
  decorators: [productDecorator],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
function Composer() {
  const [v, setV] = useState(""),
    [sent, setSent] = useState(false);
  return (
    <>
      <UI.ChatComposer
        value={v}
        onChange={setV}
        onSend={() => setSent(true)}
        connectedCount={3}
      />
      {sent && <p role="status">Message envoyé</p>}
    </>
  );
}
export const ComposerEmpty: Story = {
  render: () => <Composer />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(
      c.getByRole("button", { name: "Envoyer le message" }),
    ).toBeDisabled();
    await userEvent.type(
      c.getByRole("textbox", { name: "Message" }),
      "Prépare mon rendez-vous.",
    );
    await userEvent.click(
      c.getByRole("button", { name: "Envoyer le message" }),
    );
    await expect(c.getByRole("status")).toHaveTextContent("Message envoyé");
  },
};
export const AgentCards: Story = {
  render: () => (
    <div className="wp-grid">
      {F.agents.map((agent) => (
        <UI.ProductAgentCard key={agent.id} agent={agent} onChat={() => {}} />
      ))}
    </div>
  ),
};
export const ToolActivity: Story = {
  render: () => (
    <UI.ExecutionTrace
      steps={F.steps.map((s, i) => ({
        ...s,
        state: i === 0 ? "complete" : i === 1 ? "running" : "pending",
      }))}
    />
  ),
};
export const ToolError: Story = {
  render: () => (
    <UI.ExecutionTrace
      steps={[
        { ...F.steps[0], state: "error", detail: "L’accès à Odoo a expiré." },
      ]}
      onRetry={() => {}}
    />
  ),
};
export const ResponseAndDocument: Story = {
  render: () => (
    <UI.ChatMessage
      message={{
        id: "answer",
        role: "assistant",
        content: "Le périmètre doit être confirmé.",
      }}
    >
      <UI.DeliverablePreview
        title="Préparer le rendez-vous Northstar"
        sections={F.outputSections}
        sources={["Odoo", "Outlook"]}
      />
    </UI.ChatMessage>
  ),
};
function Share() {
  const [grants, setGrants] = useState(F.grants),
    [state, setState] = useState<UI.SaveState>("draft");
  return (
    <UI.SharingPanel
      name="Brief client"
      grants={grants}
      onChange={setGrants}
      onShare={() => setState("saved")}
      state={state}
    />
  );
}
export const Sharing: Story = { render: () => <Share /> };
export const Shell: Story = {
  render: () => (
    <UI.ProductShell page="agents" onNavigate={() => {}}>
      <UI.AgentLibrary
        agents={F.agents}
        search=""
        onSearchChange={() => {}}
        onChat={() => {}}
        onEdit={() => {}}
        onCreate={() => {}}
        onTemplates={() => {}}
      />
    </UI.ProductShell>
  ),
};
