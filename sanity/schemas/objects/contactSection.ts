import { defineType, defineField } from "sanity";

export const contactSection = defineType({
  name: "contactSection",
  title: "Contact section",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "sectionHeader",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "imageWithAlt",
    }),
    defineField({
      name: "personName",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "personRole",
      title: "Role",
      type: "string",
    }),
  ],
});
