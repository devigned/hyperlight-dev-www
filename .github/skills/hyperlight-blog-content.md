# Skill: Populate Hyperlight Blog Content

## Purpose
Search for Hyperlight blog posts and conference talks, then create `.mdx` files in `./src/content/docs/blog/` for each piece of found content. This skill is reusable and should not create duplicates of existing blog entries.

## Sources to Search

### Blog Posts
- **Microsoft Open Source Blog**: Search `https://opensource.microsoft.com/blog/search?s=hyperlight` for all posts mentioning Hyperlight. Fetch the search results page and extract each blog post title, date, URL, and author.

### Conference Talks
Search for Hyperlight sessions at these conferences (check all years and regions):
- **KubeCon + CloudNativeCon** (NA, EU, Asia — all years). Search sched.com schedule pages, e.g., `https://kccncna2024.sched.com/?searchstring=hyperlight`, `https://kccnceu2025.sched.com/?searchstring=hyperlight`, `https://colocatedeventseu2026.sched.com/?searchstring=hyperlight`, etc.
- **WasmCon** — co-located at KubeCon events.
- **Wasm I/O** — check `https://wasm.io/sessions/` for Hyperlight sessions.
- **RustConf** — check `https://rustconf.com/schedule` or equivalent for Hyperlight talks.

### YouTube
- Search for Hyperlight conference talks on YouTube for recordings: `https://www.youtube.com/results?search_query=hyperlight+kubecon`, `https://www.youtube.com/results?search_query=hyperlight+conference+talk`, etc.

## Procedure

1. **Scan sources**: Fetch search/listing pages above and extract all Hyperlight-related content (blog posts and conference talks).

2. **Check for duplicates**: List existing files in `./src/content/docs/blog/` and read their frontmatter. Skip any content that already has a corresponding `.mdx` file (match by title or URL in the description).

3. **Create `.mdx` files**: For each new piece of content, create a file in `./src/content/docs/blog/` following the format in `./src/content/docs/blog/example.mdx`.

## File Naming Convention
Use kebab-case derived from the title, e.g.:
- `introducing-hyperlight.mdx`
- `hyperlight-kubecon-na-2024-keynote.mdx`
- `hyperlight-wasm-fast-secure-os-free.mdx`

## Frontmatter Format
Each `.mdx` file must follow this structure:

```mdx
---
title: "<Title of the blog post or talk>"
date: <YYYY-MM-DD>
---

<Brief 2-4 sentence summary of the content.>

[Read the full blog post](<URL>) or [Watch the talk](<URL>)
```

### Rules
- The `date` field must match the **publication date** (for blog posts) or the **presentation date** (for conference talks).
- The description must be a brief summary (2-4 sentences) of the content and must include a link to the original source.
- For conference talks, include the conference name, year, location, and speaker(s) in the summary.
- For blog posts, include the author name(s) in the summary.
- **Hyperlink engineer names** to their GitHub profiles using `[Name](https://github.com/username)` format. Refer to the **Engineer GitHub Accounts** table below.
- **Use correct tense based on event date**: If a conference talk has **not yet occurred** (its date is in the future), prefix the title with `Upcoming Talk:` (or `Upcoming Workshop:` for workshops), write the summary in **future tense** (e.g., "will present", "will explore", "will cover"), and frame the post as an upcoming event alert — use link text like "View the session and add it to your calendar" instead of "Watch the talk". If the event has **already occurred**, do not include the "Upcoming" prefix, use past or present tense as appropriate, and link to recordings if available. When an upcoming event passes, update the title to remove the prefix and revise the summary tense accordingly.
- Do **not** duplicate existing entries in `./src/content/docs/blog/`.

## Engineer GitHub Accounts
When mentioning engineers in blog summaries, always hyperlink their names to their GitHub profiles. If a new engineer is encountered, look up their GitHub account and add them to this table.

| Name | GitHub Profile |
|------|---------------|
| Yosh Wuyts | [yoshuawuyts](https://github.com/yoshuawuyts) |
| Danilo Chiarlone | [danbugs](https://github.com/danbugs) |
| Ludvig Liljenberg | [ludfjig](https://github.com/ludfjig) |
| Doru Blânzeanu | [dblnz](https://github.com/dblnz) |
| Rita Zhang | [ritazh](https://github.com/ritazh) |
| Pedro Henrique Penna | [ppenna](https://github.com/ppenna) |
| Lucy Menon | [syntactically](https://github.com/syntactically) |
| Ralph Squillace | [squillace](https://github.com/squillace) |
| Tomasz Andrzejak | [andreiltd](https://github.com/andreiltd) |

## Known Content Catalog

### Blog Posts (Microsoft Open Source Blog)
| Title | Date | URL |
|-------|------|-----|
| Introducing Hyperlight: Virtual machine-based security for functions at scale | 2024-11-07 | https://opensource.microsoft.com/blog/2024/11/07/introducing-hyperlight-virtual-machine-based-security-for-functions-at-scale |
| Hyperlight: Achieving 0.0009-second micro-VM execution time | 2025-02-11 | https://opensource.microsoft.com/blog/2025/02/11/hyperlight-creating-a-0-0009-second-micro-vm-execution-time |
| Build a Hyperlight C guest to securely execute JavaScript | 2025-03-10 | https://opensource.microsoft.com/blog/2025/03/10/build-a-hyperlight-c-guest-to-securely-execute-javascript |
| Hyperlight Wasm: Fast, secure, and OS-free | 2025-03-26 | https://opensource.microsoft.com/blog/2025/03/26/hyperlight-wasm-fast-secure-and-os-free |
| Hyperlight: Debugging hardware-protected guests | 2025-07-14 | https://opensource.microsoft.com/blog/2025/07/14/hyperlight-debugging-hardware-protected-guests |
| Hyperlight Nanvix: POSIX support for Hyperlight Micro-VMs | 2026-01-28 | https://opensource.microsoft.com/blog/2026/1/28/hyperlight-nanvix-bringing-multi-language-support-for-extremely-fast-hardware-isolated-micro-vms |

### Conference Talks
| Title | Date | Conference | Speakers | URL |
|-------|------|-----------|----------|-----|
| KubeCon NA 2024 Keynote Demo | 2024-11-14 | KubeCon + CloudNativeCon NA 2024, Salt Lake City | Rita Zhang | https://youtu.be/f8ornY7h2KE?feature=shared&t=290 |
| Re-Engineering Microsoft's Hyperlight in Rust | 2025-09-03 | RustConf 2025, Seattle | Danilo Chiarlone, Ludvig Liljenberg | https://rustconf2025.wpenginepowered.com/schedule |
| Running Wasmtime in Hardware-Isolated Microenvironments | 2026-03-23 | WasmCon @ KubeCon EU 2026, Amsterdam | Danilo Chiarlone | https://colocatedeventseu2026.sched.com/event/2DY28 |
| Hands-On with Hyperlight and Wasm | 2026-03-19 | Wasm I/O 2026, Barcelona | Lucy Menon, Ralph Squillace, Tomasz Andrzejak | https://wasm.io/sessions/ |
| Even More Hoops: Debugging WebAssembly across the Hardware Memory Partition Boundary | 2026-03-19 | Wasm I/O 2026, Barcelona | Doru Blânzeanu | https://wasm.io/sessions/ |

## Updating This Skill
When new Hyperlight content is discovered, add it to the **Known Content Catalog** tables above so future runs can check for completeness. Always re-search the sources above to discover any newly published content not yet in the catalog.
