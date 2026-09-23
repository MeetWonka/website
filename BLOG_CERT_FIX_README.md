# Fixing SOC 2 Certification Claims in Blog Posts

## Problem

Several existing blog posts in Sanity CMS incorrectly claim "SOC 2 certified" or similar. This is forbidden.

**Locked certification phrase** (use verbatim):
> ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe (Microsoft Ireland).

## Affected Blog Posts

The following blog posts need certification claim fixes:

- `/blog/wonka-vs-dust` (EN)
- `/fr/blog/fr-wonka-vs-dust` (FR)
- `/blog/wonka-vs-langdock` (EN)
- `/fr/blog/fr-wonka-vs-langdock` (FR)
- `/fr/blog/odoo-agent-ia` (FR)
- `/blog/odoo-ai-agent` (EN)

## Solution

### Script: `scripts/fix-blog-cert-claims.ts`

This script automatically finds and fixes incorrect SOC 2 certification claims in the above blog posts.

**What it does:**
- Searches blog post body content for patterns like "SOC 2 certified", "SOC2 certified", "SOC 2 ✅"
- Replaces them with "SOC 2 Type II in progress"
- Removes any "SecNumCloud" references (also forbidden)
- Updates the blog posts in Sanity via the API

### How to Run

1. **Set up Sanity API token** in `.env` or `.env.local`:
   ```bash
   SANITY_API_TOKEN=your_token_here
   ```

   Get the token from:
   - Sanity project settings → API → Tokens
   - Create a token with "Editor" permissions

2. **Run the script:**
   ```bash
   npx tsx scripts/fix-blog-cert-claims.ts
   ```

3. **Verify changes** in Sanity Studio or by checking the live blog posts

### Important Notes

- **301 redirects are NOT a substitute** for fixing the source content
- Even though we've added redirects (`/blog/wonka-vs-dust` → `/vs/dust`), the blog posts in Sanity must still be fixed
- The blog posts remain crawlable and may still appear in search results
- This ensures all content (indexed, cached, or directly accessed) has correct claims

### Manual Alternative

If you prefer to fix manually in Sanity Studio:

1. Go to https://your-project.sanity.studio
2. Navigate to Content → Blog Posts
3. Find each affected blog post by slug
4. Search the body content for "SOC 2 certified" or similar
5. Replace with the locked phrase above
6. Remove any "SecNumCloud" references
7. Save changes

## Status

- ✅ Script created: `scripts/fix-blog-cert-claims.ts`
- ✅ 301 redirects added in `next.config.ts`
- ⏳ **ACTION REQUIRED**: Run the script with valid Sanity credentials to fix the blog posts

---

**Never claim:**
- ❌ "SOC 2 certified"
- ❌ "SOC 2 Type II certified"
- ❌ "SOC2 certified"
- ❌ "SOC 2 ✅" or "✅ SOC 2"
- ❌ "SecNumCloud"

**Always use:**
- ✅ "ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe (Microsoft Ireland)."
