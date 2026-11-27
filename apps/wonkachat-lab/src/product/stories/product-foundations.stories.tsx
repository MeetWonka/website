import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import * as UI from "../../../../../packages/product-ui/src";
import { productDecorator } from "./product-story-layout";
const meta = {
  title: "Product/Foundations",
  decorators: [productDecorator],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primitives: Story = {
  render: () => (
    <UI.Panel title="Fondations produit">
      <div className="wp-stack">
        <div className="wp-actions">
          <UI.IdentityAvatar name="Camille Martin" />
          <UI.Tag tone="success">Connecté</UI.Tag>
          <UI.ActionButton tone="primary">Enregistrer</UI.ActionButton>
          <UI.ActionButton>Annuler</UI.ActionButton>
        </div>
        <UI.Field label="Nom">
          <input defaultValue="Brief client" />
        </UI.Field>
        <UI.Toggle label="Afficher les outils" checked onChange={() => {}} />
        <UI.SearchInput value="" onChange={() => {}} />
      </div>
    </UI.Panel>
  ),
};
export const Feedback: Story = {
  render: () => (
    <>
      <UI.StateNotice state="empty" />
      <UI.StateNotice state="error" onRetry={() => {}} />
      <UI.StateNotice state="loading" />
    </>
  ),
};
function Dialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <UI.ActionButton onClick={() => setOpen(true)}>Ouvrir</UI.ActionButton>
      <UI.ProductDialog
        title="Configuration"
        open={open}
        onClose={() => setOpen(false)}
      >
        <p>Contenu du panneau</p>
        <UI.ActionButton onClick={() => setOpen(false)}>
          Terminer
        </UI.ActionButton>
      </UI.ProductDialog>
    </>
  );
}
export const AccessibleDialog: Story = {
  render: () => <Dialog />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole("button", { name: "Ouvrir" }));
    await expect(c.getByRole("dialog")).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect(c.queryByRole("dialog")).not.toBeInTheDocument();
    await expect(c.getByRole("button", { name: "Ouvrir" })).toHaveFocus();
  },
};
