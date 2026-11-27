import assert from "node:assert/strict";
import test from "node:test";
import {
  extractLinks,
  extractPage,
  isSameSite,
  scorePath,
} from "@/lib/agent-blueprint-crawl";

test("keeps the submitted domain and its subdomains only", () => {
  assert.equal(isSameSite("www.example.com", "example.com"), true);
  assert.equal(isSameSite("example.com", "example.com"), true);
  assert.equal(isSameSite("evilexample.com", "example.com"), false);
  assert.equal(isSameSite("example.com.evil.io", "example.com"), false);
});

test("ranks operational pages above legal and blog pages", () => {
  assert.ok(scorePath("/fr/nos-services") > scorePath("/fr/blog/post-1"));
  assert.ok(scorePath("/werken-bij") > 0);
  assert.equal(scorePath("/privacy-policy"), -1);
  assert.equal(scorePath("/brochure.pdf"), -1);
});

test("extracts same-site links without query strings or fragments", () => {
  const links = extractLinks(
    `<a href="/about?utm=x#team">About</a>
     <a href="https://shop.example.com/products">Shop</a>
     <a href="https://other.com/">Other</a>
     <a href="mailto:hi@example.com">Mail</a>`,
    "https://example.com",
    "example.com",
  );
  assert.deepEqual(links.sort(), [
    "https://example.com/about",
    "https://shop.example.com/products",
  ]);
});

test("extracts readable text and drops scripts", () => {
  const page = extractPage(
    `<html><head><title>Acme &amp; Co</title>
     <meta name="description" content="Timber frame homes"></head>
     <body><script>alert(1)</script><h1>Our services</h1>
     <p>We build prefabricated modules.</p></body></html>`,
    "https://example.com/services",
  );
  assert.equal(page.title, "Acme & Co");
  assert.equal(page.description, "Timber frame homes");
  assert.deepEqual(page.headings, ["Our services"]);
  assert.match(page.text, /prefabricated modules/);
  assert.doesNotMatch(page.text, /alert/);
});

test("ignores keywords inside long article slugs", () => {
  assert.ok(
    scorePath("/fr/services") >
      scorePath("/fr/help-center/faq/quelles-solutions-mobiles-existe-t-il"),
  );
});
