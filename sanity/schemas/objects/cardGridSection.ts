import { defineType, defineField } from "sanity";

export const cardGridSection = defineType({
  name: "cardGridSection",
  title: "Card grid section",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "sectionHeader",
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "card",
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
              rows: 4,
            }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
  ],
});
