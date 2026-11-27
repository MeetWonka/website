import { defineType, defineField } from "sanity";

export const useCasesSection = defineType({
  name: "useCasesSection",
  title: "Use cases section",
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
      type: "text",
      rows: 2,
      description: "Use a new line for a line break in the heading.",
    }),
    defineField({
      name: "industries",
      title: "Industries",
      description:
        "Each industry becomes a tab. The active tab's workflows are shown as cards below.",
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
              name: "workflows",
              title: "Workflows",
              description: "Up to 3 cards per industry.",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "workflow",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Title",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "description",
                      title: "Description",
                      type: "text",
                      rows: 2,
                    }),
                    defineField({
                      name: "bullets",
                      title: "Bullet points",
                      type: "array",
                      of: [{ type: "string" }],
                    }),
                  ],
                  preview: {
                    select: { title: "title", subtitle: "description" },
                  },
                },
              ],
              validation: (Rule) => Rule.max(3),
            }),
          ],
          preview: {
            select: { title: "label" },
          },
        },
      ],
      validation: (Rule) => Rule.max(5),
    }),
  ],
});
