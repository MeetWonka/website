import { defineType, defineField } from "sanity";

/**
 * @deprecated Legacy lead type from PR #57. New leads use `siteLead`.
 * Kept so existing documents remain visible in Studio until migrated.
 * Run: bun run scripts/migrate-start-ai-leads.ts
 */
export const startAiLead = defineType({
  name: "startAiLead",
  title: "Start AI Lead (legacy)",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "submittedAt",
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? "Legacy lead",
        subtitle: subtitle
          ? `Legacy · ${new Date(subtitle).toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "short",
            })}`
          : "Legacy",
      };
    },
  },
});
