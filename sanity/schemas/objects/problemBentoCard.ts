import { defineType, defineField } from "sanity";

export const problemBentoCard = defineType({
  name: "problemBentoCard",
  title: "Problem bento card",
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
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Illustration",
      type: "imageWithAlt",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
