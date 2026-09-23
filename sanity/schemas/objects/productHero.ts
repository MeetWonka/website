import { defineType, defineField } from "sanity";

export const productHero = defineType({
  name: "productHero",
  title: "Product hero",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "secondaryText",
      title: "Secondary text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      options: {
        list: [
          { title: "Dark (image background)", value: "dark" },
          { title: "Light", value: "light" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "imageWithAlt",
      description: "Used for dark theme heroes.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      description: "Main visual below the copy (light theme).",
    }),
    defineField({
      name: "secondaryLink",
      title: "Secondary link",
      type: "ctaButton",
    }),
  ],
});
