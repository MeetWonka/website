import { defineType, defineField } from "sanity";

export const promoPanel = defineType({
  name: "promoPanel",
  title: "Promo panel",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Gradient", value: "gradient" },
          { title: "Dark image", value: "darkImage" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "imageWithAlt",
      description: "Used for the dark image variant.",
    }),
    defineField({
      name: "showCta",
      title: "Show booking CTA",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "ctaHref",
      title: "CTA link",
      type: "string",
      description: "Optional. Overrides the default meeting link when set.",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      description: "Optional. Overrides the default meeting button label when set.",
    }),
  ],
});
