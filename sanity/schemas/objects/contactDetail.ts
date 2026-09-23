import { defineType, defineField } from "sanity";

export const contactDetail = defineType({
  name: "contactDetail",
  title: "Contact detail",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Optional link (e.g. mailto:hello@wonka.ai, tel:+32…). Leave empty for plain text.",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
