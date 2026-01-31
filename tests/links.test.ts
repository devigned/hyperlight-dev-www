import { describe, expect, test } from "bun:test";
import { fetchPage, fetchStatus } from "./helpers";

// Known pages that may not exist yet (work in progress)
const KNOWN_MISSING = ["/docs/how-to/", "/docs/architecture/"];

describe("Internal Links", () => {
  test("homepage internal links are valid", async () => {
    const doc = await fetchPage("/");
    const links = Array.from(doc.querySelectorAll('a[href^="/"]'));

    const brokenLinks: string[] = [];
    for (const link of links.slice(0, 15)) {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("/#") && !KNOWN_MISSING.includes(href)) {
        const status = await fetchStatus(href);
        if (status >= 400) {
          brokenLinks.push(`${href} (${status})`);
        }
      }
    }

    expect(brokenLinks).toHaveLength(0);
  });

  test("getting started page links are valid", async () => {
    const doc = await fetchPage("/docs/getting-started/");
    const links = Array.from(doc.querySelectorAll('a[href^="/"]'));

    const brokenLinks: string[] = [];
    const checked = new Set<string>();

    for (const link of links.slice(0, 20)) {
      const href = link.getAttribute("href");
      if (
        href &&
        !href.startsWith("/#") &&
        !checked.has(href) &&
        !KNOWN_MISSING.includes(href)
      ) {
        checked.add(href);
        const status = await fetchStatus(href);
        if (status >= 400) {
          brokenLinks.push(`${href} (${status})`);
        }
      }
    }

    expect(brokenLinks).toHaveLength(0);
  });
});
