import { defineType, defineField } from "sanity";

export const splitContentSection = defineType({
  name: "splitContentSection",
  title: "Split content section",
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
      rows: 5,
      description: "All section copy goes here. Use a new line for a paragraph break.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow" },
  },
});
