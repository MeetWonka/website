import { defineType, defineField } from "sanity";

export const iconFeatureGridSection = defineType({
  name: "iconFeatureGridSection",
  title: "Icon feature grid section",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "sectionHeader",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "iconFeatureItem" }],
    }),
  ],
});
