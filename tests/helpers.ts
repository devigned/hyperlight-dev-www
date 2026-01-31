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

export { BASE_URL };
