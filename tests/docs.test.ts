import { describe, expect, test } from "bun:test";
import { fetchPage, fetchStatus } from "./helpers";

describe("Documentation", () => {
  test("Getting Started page loads", async () => {
    const status = await fetchStatus("/docs/getting-started/");
    expect(status).toBe(200);
  });

  test("Getting Started has proper title", async () => {
    const doc = await fetchPage("/docs/getting-started/");
    expect(doc.title.toLowerCase()).toContain("getting started");
  });

  test("Ecosystem section loads", async () => {
    const status = await fetchStatus("/docs/ecosystem/");
    expect(status).toBe(200);
  });

  test("Community section loads", async () => {
    const status = await fetchStatus("/docs/community/");
    expect(status).toBe(200);
  });

  test("Comparison section loads", async () => {
    const status = await fetchStatus("/docs/comparison/");
    expect(status).toBe(200);
  });

  test("Resources section loads", async () => {
    const status = await fetchStatus("/docs/resources/");
    expect(status).toBe(200);
  });

  test("docs page has navigation", async () => {
    const doc = await fetchPage("/docs/getting-started/");
    const links = doc.querySelectorAll("a");
    expect(links.length).toBeGreaterThan(5);
  });
});
