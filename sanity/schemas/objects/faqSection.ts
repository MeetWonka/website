import { defineType, defineField } from "sanity";

export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ section",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "sectionHeader",
    }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
  ],
});
