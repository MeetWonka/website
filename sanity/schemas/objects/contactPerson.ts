import { defineType, defineField } from "sanity";

export const contactPerson = defineType({
  name: "contactPerson",
  title: "Contact person",
  type: "object",
  fields: [
    defineField({
      name: "portrait",
      title: "Photo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "portrait" },
  },
});
