import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import * as UI from "../../../../../packages/product-ui/src";
import * as F from "../fixtures";
import { productDecorator } from "./product-story-layout";
import { SettingsDemo } from "../SettingsDemo";
const meta = {
  title: "Product/Settings",
  decorators: [productDecorator],
  component: SettingsDemo,
  args: { initialTab: "general", onNavigate: () => {}, onNotice: () => {} },
  argTypes: {
    initialTab: { control: "select", options: Object.keys(UI.settingsLabels) },
  },
} satisfies Meta<typeof SettingsDemo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Workspace: Story = {
  render: () => <SettingsDemo onNavigate={() => {}} onNotice={() => {}} />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole("button", { name: "Membres" }));
    await expect(c.getByRole("table")).toBeVisible();
    await userEvent.click(c.getByRole("button", { name: "Inviter un membre" }));
    const dialog = within(c.getByRole("dialog"));
    await userEvent.type(
      dialog.getByRole("textbox", { name: /Adresse email/ }),
      "new@example.com",
    );
    await userEvent.click(dialog.getByRole("button", { name: "Inviter" }));
    await expect(c.getByText("new@example.com")).toBeVisible();
  },
};
export const PersonalNavigation: Story = {
  render: () => <UI.SettingsNavigation active="general" onChange={() => {}} />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(
      c.queryByRole("button", { name: "Membres" }),
    ).not.toBeInTheDocument();
    await expect(
      c.queryByRole("button", { name: "Organisations" }),
    ).not.toBeInTheDocument();
  },
};
export const MembersReadOnly: Story = {
  render: () => <UI.MembersTable members={F.members} />,
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("button", { name: "Inviter un membre" }),
    ).toBeDisabled();
  },
};
export const ForbiddenPanel: Story = {
  render: () => (
    <UI.SettingsWorkspace
      active="members"
      onTabChange={() => {}}
      access={UI.defaultSettingsAccess}
    >
      <p>Contenu réservé</p>
    </UI.SettingsWorkspace>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.getByRole("alert")).toBeVisible();
    await expect(c.queryByText("Contenu réservé")).not.toBeInTheDocument();
  },
};
export const Usage: Story = {
  render: () => (
    <UI.UsageOverview
      metrics={[
        { label: "Conversations", value: "128" },
        { label: "Exécutions", value: "42" },
        { label: "Membres actifs", value: "8" },
      ]}
      rows={[
        {
          id: "1",
          name: "Brief client",
          detail: "24 septembre 2026",
          status: "Terminé",
        },
      ]}
    />
  ),
};

export const General: Story = {
  args: { initialTab: "general" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const Account: Story = {
  args: { initialTab: "account" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const Speech: Story = {
  args: { initialTab: "speech" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const Data: Story = {
  args: { initialTab: "data" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const Memories: Story = {
  args: { initialTab: "memories" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const APIKeys: Story = {
  args: { initialTab: "api-keys" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const Files: Story = {
  args: { initialTab: "files" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const Onboarding: Story = {
  args: { initialTab: "onboarding" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const PersonalStats: Story = {
  args: { initialTab: "my-stats" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const OrganizationStats: Story = {
  args: { initialTab: "org-stats" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const AgentActivity: Story = {
  args: { initialTab: "llm-ops" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const Organization: Story = {
  args: { initialTab: "organization" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const Members: Story = {
  args: { initialTab: "members" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const Security: Story = {
  args: { initialTab: "security" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const OrganizationInstructions: Story = {
  args: { initialTab: "system-prompt" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const Groups: Story = {
  args: { initialTab: "groups" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const ToolPolicies: Story = {
  args: { initialTab: "tool-policies" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const Tags: Story = {
  args: { initialTab: "tags" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const Subscription: Story = {
  args: { initialTab: "subscription" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const Organizations: Story = {
  args: { initialTab: "organizations" },
  render: (args) => <SettingsDemo key={args.initialTab} {...args} />,
};

export const OrganizationReadOnly: Story = {
  render: () => (
    <UI.SettingsPanel
      tab="organization"
      values={{
        organization: "Wonka Demo",
        domain: "example.com",
        orgLanguage: "Français",
      }}
      onChange={() => {}}
      onAction={() => {}}
    />
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(
      c.getByRole("textbox", { name: "Nom de l’organisation" }),
    ).toBeDisabled();
    await expect(c.getByRole("button", { name: "Enregistrer" })).toBeDisabled();
  },
};
