import { defineType, defineField } from "sanity";

export const numberedCardsSection = defineType({
  name: "numberedCardsSection",
  title: "Numbered cards section",
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
      name: "body",
      title: "Body",
      type: "text",
      rows: 4,
      description: "Use a new line for a line break in the body.",
    }),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "numberedCard",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "string",
              description: 'e.g. "01"',
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              rows: 4,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "number" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow" },
  },
});
