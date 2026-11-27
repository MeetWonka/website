import type { SlugIsUniqueValidator } from "sanity";

/**
 * Validates slug uniqueness scoped to the document's language.
 * Without this, Sanity treats slugs as unique across ALL languages,
 * which prevents EN/FR/NL versions from sharing the same slug (e.g. "outlook").
 */
export const slugUniqueByLanguage: SlugIsUniqueValidator = async (
  slug,
  { document, getClient },
) => {
  if (!document) return true;

  const client = getClient({ apiVersion: "2026-03-01" });
  const id = document._id.replace(/^drafts\./, "");

  const result = await client.fetch<boolean>(
    `!defined(*[
      _type == $type &&
      slug.current == $slug &&
      language == $language &&
      !(_id in [$draft, $published])
    ][0]._id)`,
    {
      draft: `drafts.${id}`,
      published: id,
      type: document._type,
      language: document.language,
      slug,
    },
  );

  return result;
};
