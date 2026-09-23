import { defineType, defineField } from "sanity";

export const problemBentoSection = defineType({
  name: "problemBentoSection",
  title: "Problem bento section",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "sectionHeader",
    }),
    defineField({
      name: "largeCards",
      title: "Large cards (row 1)",
      type: "array",
      of: [{ type: "problemBentoCard" }],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: "smallCards",
      title: "Small cards (row 2)",
      type: "array",
      of: [{ type: "problemBentoCard" }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
});
