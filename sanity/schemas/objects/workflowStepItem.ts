import { defineType, defineField } from "sanity";

export const workflowStepVisualOptions = [
  { title: "Step 1 — Say it", value: "step1" },
  { title: "Step 2 — Wonka acts", value: "step2" },
  { title: "Step 3 — How work's done", value: "step3" },
];

export const workflowStepItem = defineType({
  name: "workflowStepItem",
  title: "Workflow step",
  type: "object",
  fields: [
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
      name: "visual",
      title: "Visual",
      type: "string",
      options: { list: workflowStepVisualOptions },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Custom visual (optional)",
      type: "imageWithAlt",
      description: "Replaces the default step illustration when set.",
    }),
  ],
  preview: {
    select: { title: "title", visual: "visual" },
    prepare({ title, visual }) {
      return { title, subtitle: visual ?? undefined };
    },
  },
});
