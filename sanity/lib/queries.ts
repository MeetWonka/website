import { defineQuery } from "next-sanity";

const SECURITY_SECTION_FIELDS = `
  eyebrow,
  heading,
  body
`;

const USE_CASES_SECTION_FIELDS = `
  eyebrow,
  heading,
  industries[] {
    _key,
    label,
    workflows[] {
      _key,
      title,
      description,
      bullets
    }
  }
`;

const SEO_FIELDS = `
  metaTitle,
  metaDescription,
  "ogImage": ogImage.asset->url
`;

const IMAGE_WITH_ALT_FIELDS = `
  ...,
  "alt": coalesce(alt, "")
`;

const CTA_BUTTON_FIELDS = `
  label,
  href
`;

const SECTION_HEADER_FIELDS = `
  eyebrow,
  heading,
  body,
  supplemental
`;

const PRODUCT_HERO_FIELDS = `
  eyebrow,
  title,
  subtitle,
  secondaryText,
  theme,
  backgroundImage {
    ${IMAGE_WITH_ALT_FIELDS}
  },
  heroImage {
    ${IMAGE_WITH_ALT_FIELDS}
  },
  secondaryLink {
    ${CTA_BUTTON_FIELDS}
  }
`;

const LOGO_STRIP_FIELDS = `
  logos[] {
    ${IMAGE_WITH_ALT_FIELDS}
  },
  proofLines
`;

const SPLIT_CONTENT_FIELDS = `
  eyebrow,
  heading,
  body,
  image {
    ${IMAGE_WITH_ALT_FIELDS}
  }
`;

const STICKY_FEATURES_FIELDS = `
  header {
    ${SECTION_HEADER_FIELDS}
  },
  showCta,
  features[] {
    _key,
    title,
    description,
    image {
      ${IMAGE_WITH_ALT_FIELDS}
    },
    link {
      ${CTA_BUTTON_FIELDS}
    }
  }
`;

const NUMBERED_CARDS_FIELDS = `
  eyebrow,
  heading,
  body,
  items[] {
    _key,
    number,
    title,
    subtitle,
    body
  }
`;

const DELIVERABLES_PANEL_FIELDS = `
  heading,
  items[] {
    _key,
    title,
    body
  }
`;

const INDUSTRIES_SECTION_FIELDS = `
  header {
    ${SECTION_HEADER_FIELDS}
  },
  industries[] {
    _key,
    label,
    body,
    bullets,
    clients
  }
`;

const CARD_GRID_FIELDS = `
  header {
    ${SECTION_HEADER_FIELDS}
  },
  cards[] {
    _key,
    title,
    body
  }
`;

const PROMO_PANEL_FIELDS = `
  eyebrow,
  heading,
  body,
  variant,
  backgroundImage {
    ${IMAGE_WITH_ALT_FIELDS}
  },
  showCta,
  ctaHref,
  ctaLabel
`;

const CONTACT_SECTION_FIELDS = `
  header {
    ${SECTION_HEADER_FIELDS}
  },
  portrait {
    ${IMAGE_WITH_ALT_FIELDS}
  },
  personName,
  personRole
`;

const FAQ_SECTION_FIELDS = `
  header {
    ${SECTION_HEADER_FIELDS}
  },
  items[] {
    _key,
    question,
    answer
  }
`;

const PROBLEM_BENTO_CARD_FIELDS = `
  _key,
  title,
  body,
  image {
    ${IMAGE_WITH_ALT_FIELDS}
  }
`;

const PROBLEM_BENTO_FIELDS = `
  header {
    ${SECTION_HEADER_FIELDS}
  },
  largeCards[] {
    ${PROBLEM_BENTO_CARD_FIELDS}
  },
  smallCards[] {
    ${PROBLEM_BENTO_CARD_FIELDS}
  }
`;

const ICON_FEATURE_GRID_FIELDS = `
  header {
    ${SECTION_HEADER_FIELDS}
  },
  items[] {
    _key,
    icon,
    title,
    body,
    image {
      ${IMAGE_WITH_ALT_FIELDS}
    }
  }
`;

const WORKFLOW_STEPS_FIELDS = `
  header {
    ${SECTION_HEADER_FIELDS}
  },
  steps[] {
    _key,
    title,
    body,
    visual,
    image {
      ${IMAGE_WITH_ALT_FIELDS}
    }
  }
`;

const PAGE_CONTENT_FIELDS = `
  hero {
    ${PRODUCT_HERO_FIELDS}
  },
  logoStrip {
    ${LOGO_STRIP_FIELDS}
  },
  testimonials {
    ${SECTION_HEADER_FIELDS}
  },
  contact {
    ${CONTACT_SECTION_FIELDS}
  },
  faq {
    ${FAQ_SECTION_FIELDS}
  },
  seo {
    ${SEO_FIELDS}
  }
`;

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    sharedLinks {
      meetingUrl,
      startAiMeetingUrl,
      wonkaBuildMeetingUrl,
      wonkaChatMeetingUrl,
      meetingLabel,
      startAiUrl,
      wonkaBuildUrl,
      wonkaChatUrl
    },
    navigation[] {
      _key,
      itemType,
      label,
      href,
      children[] {
        _key,
        label,
        href,
        description
      }
    },
    headerCta {
      label,
      href
    },
    footerLinkGroups[] {
      _key,
      title,
      links[] {
        _key,
        label,
        href,
        external
      }
    }
  }
`);

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(order asc, _createdAt asc) {
    _id,
    quote,
    authorName,
    authorRole,
    companyLogo {
      ...,
      "alt": coalesce(alt, ""),
      "dimensions": asset->metadata.dimensions { width, height }
    },
    portrait {
      ...,
      "alt": coalesce(alt, "")
    }
  }
`);

export const LEGAL_PAGE_QUERY = defineQuery(`
  *[_type == "legalPage" && _id == $id][0] {
    title,
    lastUpdated,
    intro,
    body,
    seo {
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
    }
  }
`);

export const HOMEPAGE_CONTENT_QUERY = defineQuery(`
  *[_type == "homepageContent"][0] {
    hero {
      awardBadge,
      title,
      subtitle
    },
    solution {
      eyebrow,
      heading,
      body,
      steps[] {
        _key,
        title,
        body
      }
    },
    whatWeDo {
      eyebrow,
      heading,
      cards[] {
        _key,
        tagline,
        body,
        cta {
          label,
          href
        }
      }
    },
    howToStart {
      eyebrow,
      heading,
      body,
      calloutHeading,
      outcomesHeading,
      outcomes
    },
    security {
      ${SECURITY_SECTION_FIELDS}
    },
    cta {
      heading,
      body
    },
    useCases {
      ${USE_CASES_SECTION_FIELDS}
    },
    seo {
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
    }
  }
`);

export const WONKA_CHAT_CONTENT_QUERY = defineQuery(`
  *[_type == "wonkaChatContent"][0] {
    ${PAGE_CONTENT_FIELDS},
    problem {
      ${SPLIT_CONTENT_FIELDS}
    },
    overview {
      ${SECTION_HEADER_FIELDS}
    },
    features {
      ${STICKY_FEATURES_FIELDS}
    },
    useCases {
      ${USE_CASES_SECTION_FIELDS}
    },
    security {
      ${SECURITY_SECTION_FIELDS}
    }
  }
`);

export const START_AI_CONTENT_QUERY = defineQuery(`
  *[_type == "startAiContent"][0] {
    ${PAGE_CONTENT_FIELDS},
    phases {
      ${NUMBERED_CARDS_FIELDS}
    },
    deliverables {
      ${DELIVERABLES_PANEL_FIELDS}
    },
    industries {
      ${INDUSTRIES_SECTION_FIELDS}
    },
    whyNow {
      ${CARD_GRID_FIELDS}
    },
    promo {
      ${PROMO_PANEL_FIELDS}
    }
  }
`);

export const WONKA_BUILD_CONTENT_QUERY = defineQuery(`
  *[_type == "wonkaBuildContent"][0] {
    ${PAGE_CONTENT_FIELDS},
    phases {
      ${NUMBERED_CARDS_FIELDS}
    },
    deliverables {
      ${DELIVERABLES_PANEL_FIELDS}
    },
    industries {
      ${INDUSTRIES_SECTION_FIELDS}
    },
    whyNow {
      ${CARD_GRID_FIELDS}
    },
    promo {
      ${PROMO_PANEL_FIELDS}
    }
  }
`);

export const WONKA_CHAT_ODOO_CONTENT_QUERY = defineQuery(`
  *[_type == "wonkaChatOdooContent"][0] {
    hero {
      ${PRODUCT_HERO_FIELDS}
    },
    logoStrip {
      ${LOGO_STRIP_FIELDS}
    },
    problem {
      ${PROBLEM_BENTO_FIELDS}
    },
    features {
      ${STICKY_FEATURES_FIELDS}
    },
    workflowSteps {
      ${WORKFLOW_STEPS_FIELDS}
    },
    capabilities {
      ${ICON_FEATURE_GRID_FIELDS}
    },
    security {
      ${SECURITY_SECTION_FIELDS}
    },
    contact {
      ${CONTACT_SECTION_FIELDS}
    },
    seo {
      ${SEO_FIELDS}
    }
  }
`);

// ─── Content Hub Queries ──────────────────────────────────────────

const CONTENT_FIELDS = `
  _id,
  language,
  slug,
  tags,
  seo {
    metaTitle,
    metaDescription,
    "ogImage": ogImage.asset->url
  }
`;

const FAQ_FIELDS = `
  faq[] {
    question,
    answer
  }
`;

const IMAGE_FIELDS = `
  ...,
  "alt": coalesce(alt, "")
`;

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && language == $language] | order(publishedAt desc) {
    ${CONTENT_FIELDS},
    title,
    publishedAt,
    excerpt,
    category,
    coverImage { ${IMAGE_FIELDS} }
  }
`);

export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug && language == $language][0] {
    ${CONTENT_FIELDS},
    title,
    publishedAt,
    excerpt,
    category,
    coverImage { ${IMAGE_FIELDS} },
    body,
    ${FAQ_FIELDS}
  }
`);

export const BLOG_SLUGS_QUERY = defineQuery(`
  *[_type == "blogPost"] { slug, language }
`);

export const GLOSSARY_TERMS_QUERY = defineQuery(`
  *[_type == "glossaryTerm" && language == $language] | order(term asc) {
    ${CONTENT_FIELDS},
    term,
    shortDefinition
  }
`);

export const GLOSSARY_TERM_QUERY = defineQuery(`
  *[_type == "glossaryTerm" && slug.current == $slug && language == $language][0] {
    ${CONTENT_FIELDS},
    term,
    shortDefinition,
    body,
    ${FAQ_FIELDS}
  }
`);

export const GLOSSARY_SLUGS_QUERY = defineQuery(`
  *[_type == "glossaryTerm"] { slug, language }
`);

export const COMPARISON_PAGES_QUERY = defineQuery(`
  *[_type == "comparisonPage" && language == $language] | order(_createdAt desc) {
    ${CONTENT_FIELDS},
    title,
    competitor,
    excerpt
  }
`);

export const COMPARISON_PAGE_QUERY = defineQuery(`
  *[_type == "comparisonPage" && slug.current == $slug && language == $language][0] {
    ${CONTENT_FIELDS},
    title,
    competitor,
    excerpt,
    body,
    ${FAQ_FIELDS}
  }
`);

export const COMPARISON_SLUGS_QUERY = defineQuery(`
  *[_type == "comparisonPage"] { slug, language }
`);

export const CONNECTOR_PAGES_QUERY = defineQuery(`
  *[_type == "connectorPage" && language == $language] | order(toolName asc) {
    ${CONTENT_FIELDS},
    toolName,
    tagline,
    description,
    toolLogo { ${IMAGE_FIELDS} }
  }
`);

export const CONNECTOR_PAGE_QUERY = defineQuery(`
  *[_type == "connectorPage" && slug.current == $slug && language == $language][0] {
    ${CONTENT_FIELDS},
    toolName,
    tagline,
    description,
    useCases[] {
      title,
      description,
      prompt
    },
    toolLogo { ${IMAGE_FIELDS} },
    ${FAQ_FIELDS}
  }
`);

export const CONNECTOR_SLUGS_QUERY = defineQuery(`
  *[_type == "connectorPage"] { slug, language }
`);

export const CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy" && language == $language] | order(publishedAt desc) {
    ${CONTENT_FIELDS},
    clientName,
    sector,
    headline,
    excerpt,
    results,
    publishedAt,
    clientLogo { ${IMAGE_FIELDS} }
  }
`);

export const CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug && language == $language][0] {
    ${CONTENT_FIELDS},
    clientName,
    sector,
    headline,
    excerpt,
    results,
    publishedAt,
    body,
    clientLogo { ${IMAGE_FIELDS} },
    ${FAQ_FIELDS}
  }
`);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(`
  *[_type == "caseStudy"] { slug, language }
`);

// ─── Related Content Queries ──────────────────────────────────────

export const RELATED_GLOSSARY_TERMS_QUERY = defineQuery(`
  *[_type == "glossaryTerm" && language == $language && slug.current != $slug && count((tags[])[@ in $tags]) > 0] | order(_createdAt desc)[0..2] {
    _id,
    term,
    slug,
    shortDefinition
  }
`);

export const RELATED_BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && language == $language && slug.current != $slug && count((tags[])[@ in $tags]) > 0] | order(publishedAt desc)[0..2] {
    _id,
    title,
    slug,
    excerpt,
    category
  }
`);

export const RELATED_CONNECTOR_PAGES_QUERY = defineQuery(`
  *[_type == "connectorPage" && language == $language && slug.current != $slug && count((tags[])[@ in $tags]) > 0] | order(toolName asc)[0..3] {
    _id,
    toolName,
    slug,
    tagline,
    toolLogo { ${IMAGE_FIELDS} }
  }
`);

export const RELATED_COMPARISON_PAGES_QUERY = defineQuery(`
  *[_type == "comparisonPage" && language == $language && slug.current != $slug && count((tags[])[@ in $tags]) > 0] | order(_createdAt desc)[0..2] {
    _id,
    title,
    slug,
    competitor,
    excerpt
  }
`);

export const MEETING_URL_QUERY = defineQuery(`
  *[_type == "siteSettings"][0].sharedLinks.meetingUrl
`);

const CONTACT_DETAIL_FIELDS = `
  _key,
  label,
  value,
  href
`;

const CONTACT_PERSON_FIELDS = `
  _key,
  portrait {
    ${IMAGE_WITH_ALT_FIELDS}
  },
  name,
  role,
  email
`;

export const CONTACT_PAGE_CONTENT_QUERY = defineQuery(`
  *[_type == "contactPageContent"][0] {
    general {
      header {
        ${SECTION_HEADER_FIELDS}
      },
      details[] {
        ${CONTACT_DETAIL_FIELDS}
      }
    },
    team {
      header {
        ${SECTION_HEADER_FIELDS}
      },
      people[] {
        ${CONTACT_PERSON_FIELDS}
      }
    },
    seo {
      ${SEO_FIELDS}
    }
  }
`);

export const CONTENT_SLUG_LOCALES_QUERY = defineQuery(`
  *[_type == $type && slug.current == $slug] { slug, language }
`);

// All slugs for sitemap generation
export const ALL_CONTENT_SLUGS_QUERY = defineQuery(`
  {
    "blogPosts": *[_type == "blogPost"] { slug, language, _updatedAt },
    "glossaryTerms": *[_type == "glossaryTerm"] { slug, language, _updatedAt },
    "comparisons": *[_type == "comparisonPage"] { slug, language, _updatedAt },
    "connectors": *[_type == "connectorPage"] { slug, language, _updatedAt },
    "caseStudies": *[_type == "caseStudy"] { slug, language, _updatedAt }
  }
`);
