import { defineType, defineField } from "sanity";

export const industriesSection = defineType({
  name: "industriesSection",
  title: "Industries section",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "sectionHeader",
    }),
    defineField({
      name: "industries",
      title: "Industries",
      type: "array",
      of: [
        {
          type: "object",
          name: "industry",
          fields: [
            defineField({
              name: "label",
              title: "Label",
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
              name: "bullets",
              title: "Bullet points",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({
              name: "clients",
              title: "Client names",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),
  ],
});
