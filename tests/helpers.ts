import { parseHTML } from "linkedom";

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:1111";

export async function fetchPage(path: string): Promise<Document> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }
  const html = await response.text();
  const { document } = parseHTML(html);
  return document;
}

export async function fetchStatus(path: string): Promise<number> {
  const response = await fetch(`${BASE_URL}${path}`);
  return response.status;
}

/**
 * Fetches sitemap.xml and extracts all page paths.
 * Returns paths relative to the site root (e.g., "/docs/getting-started/").
 */
export async function fetchSitemapPaths(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap.xml: ${response.status}`);
  }
  const xml = await response.text();
  const { document } = parseHTML(xml);

  const urls: string[] = [];
  const locElements = document.querySelectorAll("loc");
  for (const loc of locElements) {
    const fullUrl = loc.textContent?.trim();
    if (fullUrl) {
      // Extract path from full URL (e.g., "https://hyperlight-dev.org/docs/" -> "/docs/")
      try {
        const url = new URL(fullUrl);
        urls.push(url.pathname);
      } catch {
        // If URL parsing fails, try to extract path directly
        const match = fullUrl.match(/https?:\/\/[^/]+(\/.*)/);
        if (match) {
          urls.push(match[1]);
        }
      }
    }
  }
  return urls;
}

/**
 * Crawls internal links starting from a given path.
 * Returns a set of all reachable paths.
 */
export async function crawlInternalLinks(
  startPath: string,
  maxDepth = 10,
): Promise<Set<string>> {
  const visited = new Set<string>();
  const queue: Array<{ path: string; depth: number }> = [
    { path: startPath, depth: 0 },
  ];

  // Known site hostnames to treat as internal links
  const internalHosts = ["hyperlight-dev.org", "127.0.0.1", "localhost"];

  while (queue.length > 0) {
    const item = queue.shift();
    if (!item) break;

    const { path, depth } = item;

    // Normalize path to end with / for consistency
    const normalizedPath =
      path.endsWith("/") || path === "/" ? path : `${path}/`;

    if (visited.has(normalizedPath) || depth > maxDepth) {
      continue;
    }

    visited.add(normalizedPath);

    try {
      const doc = await fetchPage(normalizedPath);
      const links = Array.from(doc.querySelectorAll("a[href]"));

      for (const link of links) {
        const href = link.getAttribute("href");
        if (!href) continue;

        let pathOnly: string | null = null;

        // Handle relative paths starting with /
        if (href.startsWith("/")) {
          // Skip anchor-only links on root (e.g., "/#features")
          if (href.startsWith("/#")) continue;
          pathOnly = href.split("#")[0];
        }
        // Handle absolute URLs that point to the same site
        else if (href.startsWith("http://") || href.startsWith("https://")) {
          try {
            const url = new URL(href);
            const hostname = url.hostname.replace(/^www\./, "");
            if (
              internalHosts.some(
                (h) => hostname.includes(h) || h.includes(hostname),
              )
            ) {
              pathOnly = url.pathname;
            }
          } catch {
            // Invalid URL, skip
          }
        }

        // Skip if not an internal link
        if (!pathOnly) continue;

        // Skip empty paths (just a fragment on current page)
        if (!pathOnly || pathOnly === "") continue;
        const normalizedHref = pathOnly.endsWith("/")
          ? pathOnly
          : `${pathOnly}/`;

        if (!visited.has(normalizedHref)) {
          queue.push({ path: normalizedHref, depth: depth + 1 });
        }
      }
    } catch {
      // Page might not exist; skip it
    }
  }

  return visited;
}

export { BASE_URL };
