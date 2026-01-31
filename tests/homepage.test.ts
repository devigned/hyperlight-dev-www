import { describe, expect, test } from "bun:test";
import { fetchPage, fetchStatus } from "./helpers";

describe("Homepage", () => {
  test("loads successfully", async () => {
    const status = await fetchStatus("/");
    expect(status).toBe(200);
  });

  test("has correct title", async () => {
    const doc = await fetchPage("/");
    expect(doc.title).toContain("Hyperlight");
  });

  test("displays lead text with key information", async () => {
    const doc = await fetchPage("/");
    const lead = doc.querySelector(".lead");
    expect(lead).not.toBeNull();
    expect(lead?.textContent).toContain("Hyperlight");
    expect(lead?.textContent).toContain("micro-VM");
  });

  test("displays feature sections", async () => {
    const doc = await fetchPage("/");
    // Check for feature content in the page
    const pageText = doc.body.textContent || "";
    expect(pageText).toContain("Ultra-fast");
    expect(pageText).toContain("security");
  });

  test("has Get Started button", async () => {
    const doc = await fetchPage("/");
    const buttons = doc.querySelectorAll('a[role="button"]');
    const getStarted = Array.from(buttons).find((btn) =>
      btn.textContent?.includes("Get Started"),
    );
    expect(getStarted).not.toBeNull();
  });
});
