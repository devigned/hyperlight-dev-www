import { describe, expect, test } from "bun:test";
import { fetchPage } from "./helpers";

describe("Navigation", () => {
  test("has main navigation links", async () => {
    const doc = await fetchPage("/");
    const links = Array.from(doc.querySelectorAll("a"));
    const hrefs = links.map((a) => a.getAttribute("href") || "");

    // Check for key navigation destinations
    expect(hrefs.some((h) => h.includes("getting-started"))).toBe(true);
    expect(hrefs.some((h) => h.includes("ecosystem"))).toBe(true);
    expect(hrefs.some((h) => h.includes("community"))).toBe(true);
  });

  test("has GitHub link", async () => {
    const doc = await fetchPage("/");
    const githubLink = doc.querySelector('a[href*="github.com/hyperlight"]');
    expect(githubLink).not.toBeNull();
  });

  test("has external API docs link", async () => {
    const doc = await fetchPage("/");
    const apiLink = doc.querySelector('a[href*="docs.rs"]');
    expect(apiLink).not.toBeNull();
  });

  test("Docs link navigates to getting-started", async () => {
    const doc = await fetchPage("/");
    const docsLink = doc.querySelector('a[href*="getting-started"]');
    expect(docsLink).not.toBeNull();
  });
});
