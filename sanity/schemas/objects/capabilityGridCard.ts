import { defineType, defineField } from "sanity";

export const capabilityGridCard = defineType({
  name: "capabilityGridCard",
  title: "Capability card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "bodyLinks",
      title: "Inline links in body",
      type: "array",
      of: [{ type: "ctaButton" }],
      description: "Link labels must match text in the body exactly.",
    }),
    defineField({
      name: "footerLink",
      title: "Footer link",
      type: "ctaButton",
    }),
    defineField({
      name: "cardType",
      title: "Card type",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Connector grid", value: "connectors" },
        ],
        layout: "radio",
      },
      initialValue: "standard",
    }),
    defineField({
      name: "connectors",
      title: "Connector logos",
      type: "array",
      of: [{ type: "capabilityGridConnector" }],
      hidden: ({ parent }) => parent?.cardType !== "connectors",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "body" },
  },
});
