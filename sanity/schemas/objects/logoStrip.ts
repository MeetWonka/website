import { defineType, defineField } from "sanity";

export const logoStrip = defineType({
  name: "logoStrip",
  title: "Logo strip",
  type: "object",
  fields: [
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "proofLines",
      title: "Proof lines",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
