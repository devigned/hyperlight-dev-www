# Hyperlight Website

Source for the [Hyperlight project website](https://hyperlight-dev.org) — documentation for the CNCF sandbox project providing hypervisor-based micro-VMs with single-digit millisecond cold starts.

## Quick Start

```bash
# Clone with submodules
git clone --recursive https://github.com/hyperlight-dev/www.git
cd www

# Install dependencies
bun install

# Start development server
make serve
```

Visit http://127.0.0.1:1111 to preview the site.

## Prerequisites

| Tool | Installation |
|------|--------------|
| Zola | `brew install zola` (macOS) or [other methods](https://www.getzola.org/documentation/getting-started/installation/) |
| Bun | `curl -fsSL https://bun.sh/install \| bash` |

If you cloned without `--recursive`, initialize submodules:

```bash
git submodule update --init --recursive
```

## Development

### Available Commands

```bash
make help    # Show all targets
make serve   # Local dev server with hot reload
make build   # Build static site to public/
make test    # Run DOM tests
make lint    # Check spelling, markdown, and TypeScript
make clean   # Remove build output
```

### Linting

Three linters ensure code quality:

- **cspell** — Spelling checker for markdown content
- **markdownlint** — Markdown formatting and structure
- **Biome** — TypeScript and JSON linting

Run all linters:

```bash
make lint
```

To add project-specific terms to the spell checker, edit `cspell.json`:

```json
{
  "words": [
    "Hyperlight",
    "YourNewTerm"
  ]
}
```

### Testing

DOM tests verify the built site structure:

```bash
make test
```

Tests are in `tests/` and use Bun's test runner.

## Adding Content

### Documentation Pages

1. Create a new directory under `content/docs/`:

   ```bash
   mkdir content/docs/my-section
   ```

2. Add an `_index.md` with TOML frontmatter:

   ```markdown
   +++
   title = "My Section"
   description = "Description for SEO"
   weight = 50
   sort_by = "weight"

   [extra]
   toc = true
   +++

   Your content here...
   ```

3. Add sub-pages as additional `.md` files in the directory.

### Blog Posts

Blog posts go in `content/blog/`:

```markdown
+++
title = "Post Title"
date = 2024-01-15
description = "Brief description"

[taxonomies]
authors = ["Your Name"]
+++

Post content...
```

### Navigation

Main navigation is configured in `config.toml` under `[extra.menu.main]`:

```toml
[[extra.menu.main]]
name = "New Section"
section = "docs"
url = "/docs/my-section/"
weight = 50
```

## Deployment

The site deploys automatically via GitHub Actions:

| Trigger | Action |
|---------|--------|
| Push to `main` | Build and deploy to gh-pages |
| Tag `v*.*.*` | Build and deploy to gh-pages |
| Pull request | Run CI checks (lint + test) |

### Manual Deployment

Deployment only runs in CI. To trigger manually:

1. Push to `main`, or
2. Create a version tag: `git tag v1.0.0 && git push --tags`

## Project Structure

```
├── content/           # Markdown content
│   ├── _index.md      # Homepage
│   ├── blog/          # Blog posts
│   └── docs/          # Documentation
├── static/            # Static assets (images, etc.)
├── templates/         # Custom Zola templates (overrides)
├── sass/              # Custom styles
├── tests/             # DOM tests
├── themes/adidoks/    # Adidoks theme (submodule)
├── config.toml        # Zola configuration
├── Makefile           # Build commands
└── package.json       # Node dependencies (linting, testing)
```

## License

Apache 2.0 — see [LICENSE](LICENSE).
