import { defineType, defineField } from "sanity";

export const workflowStepsSection = defineType({
  name: "workflowStepsSection",
  title: "Workflow steps section",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "sectionHeader",
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [{ type: "workflowStepItem" }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
});
