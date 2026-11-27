import { defineType, defineField } from "sanity";

export const contactPageContent = defineType({
  name: "contactPageContent",
  title: "Contact page",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "team", title: "Team" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "general",
      title: "General contact",
      type: "object",
      group: "general",
      options: { collapsible: true },
      fields: [
        defineField({
          name: "header",
          title: "Header",
          type: "sectionHeader",
        }),
        defineField({
          name: "details",
          title: "Contact details",
          type: "array",
          of: [{ type: "contactDetail" }],
        }),
      ],
    }),
    defineField({
      name: "team",
      title: "Team",
      type: "object",
      group: "team",
      options: { collapsible: true },
      fields: [
        defineField({
          name: "header",
          title: "Header",
          type: "sectionHeader",
        }),
        defineField({
          name: "people",
          title: "People",
          type: "array",
          of: [{ type: "contactPerson" }],
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact page" };
    },
  },
});
