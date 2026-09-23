import { defineType, defineField } from "sanity";
import { odooCapabilityIconOptions } from "./odooCapabilityIcon";

export const iconFeatureItem = defineType({
  name: "iconFeatureItem",
  title: "Icon feature item",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: odooCapabilityIconOptions },
      validation: (Rule) => Rule.required(),
    }),
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
      title: "Custom image (optional)",
      type: "imageWithAlt",
      description: "Replaces the icon when set.",
    }),
  ],
  preview: {
    select: { title: "title", icon: "icon" },
    prepare({ title, icon }) {
      return { title, subtitle: icon ?? undefined };
    },
  },
});
