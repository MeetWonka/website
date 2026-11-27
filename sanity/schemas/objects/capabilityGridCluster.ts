import { defineType, defineField } from "sanity";

export const capabilityGridCluster = defineType({
  name: "capabilityGridCluster",
  title: "Capability cluster",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [{ type: "capabilityGridCard" }],
      validation: (Rule) => Rule.length(3).error("Each cluster needs exactly 3 cards."),
    }),
  ],
  preview: {
    select: { title: "heading" },
  },
});
