import { defineType, defineField } from 'sanity';
import { BookIcon } from '@sanity/icons';
import { slugUniqueByLanguage } from "@sanity/lib/slugUniqueByLanguage";

export const glossaryTerm = defineType({
  name: 'glossaryTerm',
  title: 'Glossary Term',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({ name: 'language', title: 'Language', type: 'string', readOnly: true, hidden: true }),
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'term', maxLength: 100, isUnique: slugUniqueByLanguage },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDefinition',
      title: 'Short Definition',
      type: 'text',
      rows: 2,
      description: '1-2 sentences. Used in listings and meta description.',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'body',
      title: 'Full Explanation',
      type: 'array',
      of: [{ type: 'block' }],
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
    select: { title: 'term' },
  },
  orderings: [{ title: 'Term A–Z', name: 'termAsc', by: [{ field: 'term', direction: 'asc' }] }],
});
