import { defineType, defineField } from "sanity";

export const stickyFeaturesSection = defineType({
  name: "stickyFeaturesSection",
  title: "Sticky features section",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "sectionHeader",
    }),
    defineField({
      name: "showCta",
      title: "Show booking CTA",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          name: "feature",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "imageWithAlt",
            }),
            defineField({
              name: "link",
              title: "Optional link",
              type: "ctaButton",
            }),
          ],
          preview: {
            select: { title: "title", media: "image" },
          },
        },
      ],
    }),
  ],
});
