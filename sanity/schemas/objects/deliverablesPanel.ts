import { defineType, defineField } from "sanity";

export const deliverablesPanel = defineType({
  name: "deliverablesPanel",
  title: "Deliverables panel",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "deliverable",
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
              rows: 2,
            }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
  ],
});
