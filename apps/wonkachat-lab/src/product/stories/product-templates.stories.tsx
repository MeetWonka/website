import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import * as UI from "../../../../../packages/product-ui/src";
import * as F from "../fixtures";
import { productDecorator } from "./product-story-layout";
const meta = {
  title: "Product/Templates",
  decorators: [productDecorator],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
function Gallery() {
  const [search, setSearch] = useState(""),
    [category, setCategory] = useState("all"),
    [selected, setSelected] = useState<UI.AgentTemplate | null>(null);
  return (
    <>
      <UI.TemplateGallery
        templates={F.templates}
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        onSelect={setSelected}
      />
      {selected && <UI.TemplateDetail template={selected} onUse={() => {}} />}
    </>
  );
}
export const PublicCatalog: Story = {
  render: () => <Gallery />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.getByText("70 templates")).toBeVisible();
    await userEvent.type(c.getByRole("searchbox"), "zz-no-template-match");
    await expect(
      c.getByText("Aucun template ne correspond à votre recherche."),
    ).toBeVisible();
    await userEvent.clear(c.getByRole("searchbox"));
    await expect(
      c.getByRole("heading", { name: F.templates[0].name }),
    ).toBeVisible();
  },
};
export const Card: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <UI.TemplateCard template={F.templates[0]} onSelect={() => {}} />
    </div>
  ),
};
export const CompactCard: Story = {
  render: () => (
    <UI.TemplateCard template={F.templates[1]} compact onSelect={() => {}} />
  ),
};
export const Detail: Story = {
  render: () => (
    <UI.TemplateDetail template={F.templates[0]} onUse={() => {}} />
  ),
};
export const CreationDenied: Story = {
  render: () => (
    <UI.TemplateDetail
      template={F.templates[0]}
      canUse={false}
      onUse={() => {}}
    />
  ),
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("button", {
        name: "Utiliser ce template",
      }),
    ).toBeDisabled();
  },
};
export const CreationError: Story = {
  render: () => (
    <UI.TemplateDetail
      template={F.templates[0]}
      state="error"
      onUse={() => {}}
    />
  ),
};
