import { defineType, defineField } from "sanity";

export const securitySection = defineType({
  name: "securitySection",
  title: "Security section",
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
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      description: "Optional supporting copy beside the compliance badges.",
    }),
  ],
});
