import { defineType, defineField } from "sanity";

export const sectionHeader = defineType({
  name: "sectionHeader",
  title: "Section header",
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
      name: "supplemental",
      title: "Supplemental paragraph",
      type: "text",
      rows: 3,
      description: "Optional extra copy shown below the main body.",
    }),
  ],
});
