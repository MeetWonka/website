import { defineType, defineField } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';
import { slugUniqueByLanguage } from "@sanity/lib/slugUniqueByLanguage";

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 100, isUnique: slugUniqueByLanguage },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown in listings and meta description. 120–160 chars.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI Strategy', value: 'ai-strategy' },
          { title: 'Use Cases', value: 'use-cases' },
          { title: 'Product Updates', value: 'product-updates' },
          { title: 'Security & Compliance', value: 'security-compliance' },
          { title: 'Tutorials', value: 'tutorials' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Used for internal linking. Use entity names: sharepoint, rgpd, finance...',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'imageWithAlt' },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout',
          fields: [
            { name: 'content', type: 'text', title: 'Content' },
            { name: 'type', type: 'string', title: 'Type', options: { list: ['info', 'warning', 'tip'] } },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{ type: 'faqItem' }],
      description: 'Shown at the bottom of the article. Also injected as FAQPage JSON-LD for GEO.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' },
    prepare({ title, subtitle }: { title: string; subtitle: string }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'No date',
      };
    },
  },
  orderings: [{ title: 'Published At, New', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
});
