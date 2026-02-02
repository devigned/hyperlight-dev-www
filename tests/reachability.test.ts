import { describe, expect, test } from "bun:test";
import { crawlInternalLinks, fetchSitemapPaths } from "./helpers";

// Paths to exclude from reachability check (auto-generated taxonomies, etc.)
const EXCLUDED_PATHS = ["/authors/"];

describe("Page Reachability", () => {
  test("all sitemap pages are reachable from the root", async () => {
    // Get all pages from sitemap (source of truth for published pages)
    const sitemapPaths = await fetchSitemapPaths();

    // Crawl all internal links starting from root
    const reachablePaths = await crawlInternalLinks("/");

    // Find pages in sitemap that aren't reachable
    const unreachable: string[] = [];
    for (const path of sitemapPaths) {
      // Skip excluded paths
      if (EXCLUDED_PATHS.includes(path)) continue;

      // Normalize path for comparison
      const normalizedPath = path.endsWith("/") ? path : `${path}/`;
      if (!reachablePaths.has(normalizedPath)) {
        unreachable.push(path);
      }
    }

    if (unreachable.length > 0) {
      console.error("Unreachable pages:", unreachable);
    }

    expect(unreachable).toHaveLength(0);
  });

  test("root page is in the crawled set", async () => {
    const reachablePaths = await crawlInternalLinks("/");
    expect(reachablePaths.has("/")).toBe(true);
  });
});
