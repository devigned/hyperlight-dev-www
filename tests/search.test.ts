import { describe, expect, test } from "bun:test";
import { fetchPage, fetchStatus } from "./helpers";

describe("Search", () => {
  test("search index file exists", async () => {
    const status = await fetchStatus("/search_index.en.js");
    expect(status).toBe(200);
  });

  test("search index contains site content", async () => {
    const response = await fetch(
      `${process.env.BASE_URL || "http://127.0.0.1:1111"}/search_index.en.js`,
    );
    const content = await response.text();
    expect(content).toContain("Hyperlight");
  });

  test("docs pages have search functionality reference", async () => {
    const doc = await fetchPage("/docs/getting-started/");
    const html = doc.documentElement.innerHTML;
    // Check for search-related elements or scripts
    const hasSearch =
      html.includes("search") ||
      html.includes("elasticlunr") ||
      doc.querySelector('input[type="search"]') !== null;
    expect(hasSearch).toBe(true);
  });
});
