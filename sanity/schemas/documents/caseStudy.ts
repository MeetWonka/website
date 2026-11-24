import { defineType, defineField } from 'sanity';
import { UsersIcon } from '@sanity/icons';
import { slugUniqueByLanguage } from "@sanity/lib/slugUniqueByLanguage";

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'language', title: 'Language', type: 'string', readOnly: true, hidden: true }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'clientName', maxLength: 100, isUnique: slugUniqueByLanguage },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'string',
      options: {
        list: [
          { title: 'Legal', value: 'legal' },
          { title: 'Finance', value: 'finance' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Retail', value: 'retail' },
          { title: 'Manufacturing', value: 'manufacturing' },
          { title: 'Public Sector', value: 'public-sector' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'e.g. "How Luminus automated 80% of customer support with Wonka AI"',
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
      name: 'results',
      title: 'Key Results',
      type: 'array',
      description: '3–5 quantified results (e.g. "80% faster response time")',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'body',
      title: 'Full Case Study',
      type: 'array',
      of: [{ type: 'block' }, { type: 'imageWithAlt' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
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
    select: { title: 'clientName', subtitle: 'headline', media: 'clientLogo' },
  },
});
