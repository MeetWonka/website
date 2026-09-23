import { defineType, defineField } from 'sanity';
import { LinkIcon } from '@sanity/icons';
import { slugUniqueByLanguage } from "@sanity/lib/slugUniqueByLanguage";

export const connectorPage = defineType({
  name: 'connectorPage',
  title: 'Connector Page',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({ name: 'language', title: 'Language', type: 'string', readOnly: true, hidden: true }),
    defineField({
      name: 'toolName',
      title: 'Tool Name',
      type: 'string',
      description: 'e.g. "SharePoint", "Salesforce", "Jira"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'toolName', maxLength: 100, isUnique: slugUniqueByLanguage },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'e.g. "AI + SharePoint for enterprise document Q&A"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      description: 'Exactly 3 use cases with title, description, and example prompt.',
      of: [
        {
          type: 'object',
          name: 'useCase',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'prompt', type: 'text', title: 'Example Prompt', description: 'Example prompt the user would type' },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
    defineField({
      name: 'toolLogo',
      title: 'Tool Logo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{ type: 'faqItem' }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'toolName', subtitle: 'tagline', media: 'toolLogo' },
  },
});
