/**
 * Fix SOC 2 certification claims in existing blog posts
 * 
 * This script updates specific blog posts to replace incorrect "SOC 2 certified"
 * claims with the locked certification phrase.
 * 
 * Locked phrase: ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe (Microsoft Ireland).
 * 
 * Run with: npx tsx scripts/fix-blog-cert-claims.ts
 */

import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const LOCKED_CERT_PHRASE = "ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe (Microsoft Ireland).";

// Blog posts that need certification claim fixes
const BLOG_SLUGS_TO_FIX = [
  { slug: "wonka-vs-dust", language: "en" },
  { slug: "fr-wonka-vs-dust", language: "fr" },
  { slug: "wonka-vs-langdock", language: "en" },
  { slug: "fr-wonka-vs-langdock", language: "fr" },
  { slug: "odoo-agent-ia", language: "fr" },
  { slug: "odoo-ai-agent", language: "en" },
];

/**
 * Recursively search and replace text in Portable Text blocks
 */
function fixCertClaimsInBlocks(blocks: any[]): any[] {
  if (!Array.isArray(blocks)) return blocks;

  return blocks.map((block) => {
    if (block._type === "block" && Array.isArray(block.children)) {
      return {
        ...block,
        children: block.children.map((child: any) => {
          if (child._type === "span" && typeof child.text === "string") {
            let text = child.text;

            // Replace various forms of incorrect SOC 2 certification claims
            const patterns = [
              /SOC\s*2\s+certified/gi,
              /SOC\s*2\s*Type\s*II\s+certified/gi,
              /SOC2\s+certified/gi,
              /certified\s+SOC\s*2/gi,
              /SOC\s*2\s*✅/g,
              /✅\s*SOC\s*2/g,
            ];

            // Check if this text contains SOC 2 certification claims
            const hasSocClaim = patterns.some(pattern => pattern.test(text));

            if (hasSocClaim) {
              // If this is a standalone cert phrase or list, replace it entirely
              if (text.match(/^[^.]*(?:certified|compliant|SOC\s*2)[^.]*\.?\s*$/i)) {
                text = LOCKED_CERT_PHRASE;
              } else {
                // Otherwise, just fix the SOC 2 part
                text = text.replace(/SOC\s*2\s+Type\s*II\s+certified/gi, "SOC 2 Type II in progress");
                text = text.replace(/SOC\s*2\s+certified/gi, "SOC 2 Type II in progress");
                text = text.replace(/SOC2\s+certified/gi, "SOC 2 Type II in progress");
                text = text.replace(/certified\s+SOC\s*2/gi, "SOC 2 Type II in progress");
                text = text.replace(/SOC\s*2\s*✅/g, "SOC 2 Type II in progress");
                text = text.replace(/✅\s*SOC\s*2/g, "SOC 2 Type II in progress");
              }

              console.log(`  → Fixed SOC 2 claim in text: "${child.text.substring(0, 60)}..." → "${text.substring(0, 60)}..."`);
            }

            // Also check for SecNumCloud (forbidden)
            if (/SecNumCloud/i.test(text)) {
              text = text.replace(/SecNumCloud[^.]*\.\s*/gi, "");
              console.log(`  → Removed SecNumCloud reference`);
            }

            return { ...child, text };
          }
          return child;
        }),
      };
    }

    // Recursively handle nested structures
    if (block.children && Array.isArray(block.children)) {
      return { ...block, children: fixCertClaimsInBlocks(block.children) };
    }

    return block;
  });
}

async function fixBlogPost(slug: string, language: string) {
  console.log(`\nChecking blog post: ${slug} (${language})`);

  // Fetch the blog post
  const query = `*[_type == "blogPost" && slug.current == $slug && language == $language][0]`;
  const post = await client.fetch(query, { slug, language });

  if (!post) {
    console.log(`  ✗ Blog post not found: ${slug} (${language})`);
    return;
  }

  console.log(`  ✓ Found blog post: "${post.title}"`);

  // Check if body needs fixing
  let needsUpdate = false;
  const bodyString = JSON.stringify(post.body || []);
  
  const hasSocCertified = /SOC\s*2\s+(?:Type\s*II\s+)?certified/i.test(bodyString);
  const hasSecNumCloud = /SecNumCloud/i.test(bodyString);
  const hasSocCheckmark = /SOC\s*2\s*✅|✅\s*SOC\s*2/.test(bodyString);

  if (hasSocCertified || hasSecNumCloud || hasSocCheckmark) {
    needsUpdate = true;
    console.log(`  ⚠ Found incorrect claims:`);
    if (hasSocCertified) console.log(`    - SOC 2 certified claim`);
    if (hasSecNumCloud) console.log(`    - SecNumCloud reference`);
    if (hasSocCheckmark) console.log(`    - SOC 2 with checkmark`);
  }

  if (!needsUpdate) {
    console.log(`  ✓ No incorrect claims found`);
    return;
  }

  // Fix the body content
  const fixedBody = fixCertClaimsInBlocks(post.body || []);

  // Update the blog post
  try {
    await client
      .patch(post._id)
      .set({ body: fixedBody })
      .commit();

    console.log(`  ✓ Updated blog post successfully`);
  } catch (error) {
    console.error(`  ✗ Failed to update blog post:`, error);
  }
}

async function main() {
  console.log("=".repeat(60));
  console.log("Fixing SOC 2 certification claims in blog posts");
  console.log("=".repeat(60));
  console.log(`\nLocked phrase: ${LOCKED_CERT_PHRASE}\n`);

  if (!process.env.SANITY_API_TOKEN) {
    console.error("Error: SANITY_API_TOKEN environment variable is required");
    console.error("Set it in .env or .env.local");
    process.exit(1);
  }

  for (const { slug, language } of BLOG_SLUGS_TO_FIX) {
    await fixBlogPost(slug, language);
  }

  console.log("\n" + "=".repeat(60));
  console.log("Done!");
  console.log("=".repeat(60));
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
