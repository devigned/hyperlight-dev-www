# Copilot Instructions

This repository contains the source for the Hyperlight project website (hyperlight-dev.org).

## Project Overview

A **Zola**-based static website using the **Adidoks** theme. The site documents Hyperlight, a CNCF sandbox project providing hypervisor-based micro-VMs with single-digit millisecond cold starts.

## Build Commands

All commands are available via `make`:

```bash
make help    # Show all available targets
make clean   # Remove build output (public/)
make build   # Build the site with Zola
make serve   # Start local development server
make test    # Run DOM tests with Bun
make lint    # Run linters (spelling, markdown, TypeScript)
make deploy  # Deploy to gh-pages (CI only)
```

### Prerequisites

- **Zola** — `brew install zola` (macOS) or see [Zola installation](https://www.getzola.org/documentation/getting-started/installation/)
- **Bun** — `curl -fsSL https://bun.sh/install | bash` or see [Bun installation](https://bun.sh/)
- Git submodules initialized: `git submodule update --init --recursive`

## Architecture

- **Static site generator:** Zola (Rust-native)
- **Theme:** Adidoks (Git submodule at `themes/adidoks/`)
- **Hosting:** GitHub Pages with custom domain (hyperlight-dev.org)
- **Content:** Markdown files in `content/` with TOML frontmatter

### Directory Structure

```
content/
├── _index.md              # Homepage
├── blog/                  # Blog posts (hidden until enabled)
└── docs/                  # Documentation sections
    ├── getting-started/   # Quick start guide
    ├── architecture/      # Technical architecture
    ├── comparison/        # Performance & security comparisons
    ├── ecosystem/         # hyperlight-wasm, hyperlight-nanvix
    ├── resources/         # External links, blog posts, talks
    └── community/         # CNCF Slack, meetings
```

## Linting

Three linters are configured:

| Tool | Config | Checks |
|------|--------|--------|
| cspell | `cspell.json` | Spelling in markdown content |
| markdownlint | `.markdownlint.json` | Markdown formatting/structure |
| Biome | `biome.json` | TypeScript/JSON syntax and formatting |

Custom dictionary terms for the project are in `cspell.json` under the `words` array.

## Testing

DOM tests are in `tests/` and run against a local Zola server:

```bash
make test  # Starts server, runs tests, stops server
```

Tests use Bun's test runner with `linkedom` for DOM parsing.

## CI/CD

- **CI workflow** (`.github/workflows/ci.yml`): Runs on PRs to `main` — executes `make lint` and `make test`
- **Deploy workflow** (`.github/workflows/deploy.yml`): Runs on push to `main` or version tags (`v*.*.*`) — builds and deploys to `gh-pages` branch

## Conventions

### Content Files

- Use TOML frontmatter (`+++` delimiters) for page metadata
- Follow Adidoks documentation structure conventions
- External links should include source citations where applicable

### Configuration

- Site config lives in `config.toml`
- Theme customization via `[extra]` section
- Navigation and footer defined in config, not templates (unless overriding)

## Reference

- [README.md](../README.md) — Getting started guide
- [Zola Documentation](https://www.getzola.org/documentation/)
- [Adidoks Theme](https://github.com/aaranxu/adidoks)
