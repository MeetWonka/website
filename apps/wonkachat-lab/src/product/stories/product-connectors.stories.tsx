import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import * as UI from "../../../../../packages/product-ui/src";
import * as F from "../fixtures";
import { productDecorator } from "./product-story-layout";
const meta = {
  title: "Product/Connectors",
  decorators: [productDecorator],
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
function Catalog() {
  const [items, setItems] = useState(F.connectors),
    [search, setSearch] = useState(""),
    [category, setCategory] = useState("all");
  return (
    <UI.ConnectorCatalog
      connectors={items}
      search={search}
      onSearchChange={setSearch}
      category={category}
      onCategoryChange={setCategory}
      onAction={(id) =>
        setItems((v) =>
          v.map((c) =>
            c.id === id
              ? {
                  ...c,
                  state: c.state === "connected" ? "disconnected" : "connected",
                }
              : c,
          ),
        )
      }
      onFavorite={(id) =>
        setItems((v) =>
          v.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)),
        )
      }
    />
  );
}
export const CatalogAndSearch: Story = {
  render: () => <Catalog />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const search = c.getByRole("searchbox");
    await userEvent.type(search, "Gmail");
    await expect(c.getByRole("heading", { name: "Gmail" })).toBeVisible();
    await expect(
      c.queryByRole("heading", { name: "Outlook" }),
    ).not.toBeInTheDocument();
    await userEvent.click(c.getByRole("button", { name: "Se connecter" }));
    await expect(c.getByRole("button", { name: "Déconnecter" })).toBeVisible();
    await userEvent.click(c.getByRole("button", { name: "Déconnecter" }));
    await expect(c.getByRole("button", { name: "Se connecter" })).toBeVisible();
  },
};
export const AllConnectionStates: Story = {
  render: () => (
    <div className="wp-grid">
      {Object.keys(UI.connectionLabels).map((state) => (
        <UI.ConnectorCard
          key={state}
          connector={{
            ...F.connectors[0],
            id: state,
            state: state as UI.ConnectionState,
          }}
        />
      ))}
    </div>
  ),
};
export const ManagedReadOnly: Story = {
  render: () => (
    <UI.ConnectorCard connector={{ ...F.connectors[1], consumeOnly: true }} />
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.getByRole("button", { name: "Déconnecter" })).toBeDisabled();
    await expect(
      c.queryByRole("button", { name: "Configurer Odoo" }),
    ).not.toBeInTheDocument();
  },
};
function Configuration() {
  const [values, setValues] = useState<Record<string, string>>({});
  return (
    <UI.ConnectorConfiguration
      connector={F.connectors[1]}
      fields={[
        { id: "url", label: "URL de l’instance", required: true },
        { id: "key", label: "Clé API", required: true, secret: true },
      ]}
      values={values}
      onChange={(k, v) => setValues((x) => ({ ...x, [k]: v }))}
      onSubmit={() => {}}
    />
  );
}
export const ConfigurationForm: Story = { render: () => <Configuration /> };
export const Authorization: Story = {
  render: () => (
    <UI.ConnectorAuthorization
      connector={F.connectors[0]}
      onReturn={() => {}}
      onCancel={() => {}}
    />
  ),
};
export const Loading: Story = {
  render: () => (
    <UI.ConnectorCatalog
      connectors={[]}
      search=""
      onSearchChange={() => {}}
      state="loading"
    />
  ),
};
export const Error: Story = {
  render: () => (
    <UI.ConnectorCatalog
      connectors={[]}
      search=""
      onSearchChange={() => {}}
      state="error"
    />
  ),
};
