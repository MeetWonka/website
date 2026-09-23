import { defineType, defineField } from 'sanity';
import { ComposeIcon } from '@sanity/icons';
import { slugUniqueByLanguage } from "@sanity/lib/slugUniqueByLanguage";

export const comparisonPage = defineType({
  name: 'comparisonPage',
  title: 'Comparison Page',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({ name: 'language', title: 'Language', type: 'string', readOnly: true, hidden: true }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Wonka AI vs ChatGPT for enterprise"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 100, isUnique: slugUniqueByLanguage },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'competitor',
      title: 'Competitor / Technology',
      type: 'string',
      description: 'e.g. "ChatGPT", "Copilot", "LLM open source"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'imageWithAlt' }],
      validation: (Rule) => Rule.required(),
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
    select: { title: 'title', subtitle: 'competitor' },
  },
});
