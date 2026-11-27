import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import * as UI from "../../../../../packages/product-ui/src";
import * as F from "../fixtures";
import { productDecorator } from "./product-story-layout";
const meta = {
  title: "Product/Builder",
  decorators: [productDecorator],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
function Builder({ readOnly = false }: { readOnly?: boolean }) {
  const [draft, setDraft] = useState(F.briefAgent),
    [expanded, setExpanded] = useState<UI.BuilderSectionId[]>(["basics"]),
    [state, setState] = useState<UI.SaveState>("draft");
  return (
    <UI.AgentBuilder
      draft={draft}
      onChange={(v) => {
        setDraft(v);
        setState("draft");
      }}
      expanded={expanded}
      onExpandedChange={setExpanded}
      models={F.models}
      skills={F.skills}
      connectors={F.connectors}
      state={state}
      onSave={() => setState("saved")}
      canEdit={!readOnly}
    />
  );
}
export const Editable: Story = {
  render: () => <Builder />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.clear(c.getByRole("textbox", { name: /^Nom/ }));
    await expect(c.getByRole("button", { name: "Enregistrer" })).toBeDisabled();
    await userEvent.type(c.getByRole("textbox", { name: /^Nom/ }), "Mon agent");
    await userEvent.click(c.getByRole("button", { name: "Enregistrer" }));
    await expect(c.getByRole("status")).toHaveTextContent(
      "Toutes les modifications sont enregistrées",
    );
  },
};
export const ReadOnly: Story = {
  render: () => <Builder readOnly />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole("button", { name: /Comportement/ }));
    await expect(
      c.getByRole("textbox", { name: /Instructions/ }),
    ).toBeDisabled();
    await expect(c.getByRole("button", { name: "Enregistrer" })).toBeDisabled();
  },
};
export const AllSections: Story = {
  render: () => (
    <UI.AgentBuilder
      draft={F.briefAgent}
      onChange={() => {}}
      expanded={UI.builderSections.map((s) => s.id)}
      onExpandedChange={() => {}}
      models={F.models}
      skills={F.skills}
      connectors={F.connectors}
      onSave={() => {}}
    />
  ),
};
export const Files: Story = {
  render: () => (
    <UI.KnowledgeFiles
      files={[
        ...F.briefAgent.files,
        {
          id: "progress",
          name: "Rapport.pdf",
          size: "800 Ko",
          state: "uploading",
          progress: 45,
        },
        { id: "failed", name: "Archive.pdf", size: "12 Mo", state: "error" },
      ]}
    />
  ),
};
function Schedule() {
  const [v, setV] = useState<UI.ScheduleValue>({
    enabled: true,
    frequency: "weekly",
    time: "09:00",
    timezone: "Europe/Brussels",
    days: [0],
  });
  return <UI.ScheduleEditor value={v} onChange={setV} />;
}
export const WeeklySchedule: Story = { render: () => <Schedule /> };
export const Versions: Story = {
  render: () => (
    <UI.VersionHistory
      versions={[
        {
          id: "2",
          label: "Version 2",
          date: "24 septembre 2026",
          current: true,
        },
        {
          id: "1",
          label: "Version 1",
          date: "23 septembre 2026",
          current: false,
        },
      ]}
      onRestore={() => {}}
    />
  ),
};

function DisconnectedBuilder() {
  const [draft, setDraft] = useState({ ...F.briefAgent, tools: ["gmail"] });
  return (
    <UI.AgentBuilder
      draft={draft}
      onChange={setDraft}
      expanded={["tools"]}
      onExpandedChange={() => {}}
      models={F.models}
      skills={F.skills}
      connectors={F.connectors}
      onSave={() => {}}
    />
  );
}
export const DisconnectedTools: Story = {
  render: () => <DisconnectedBuilder />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.getByRole("button", { name: "Enregistrer" })).toBeDisabled();
    await userEvent.click(c.getByRole("checkbox", { name: /Gmail/ }));
    await expect(c.getByRole("button", { name: "Enregistrer" })).toBeEnabled();
  },
};
