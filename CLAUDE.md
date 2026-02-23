# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Astro 5 static site for www.jodieplant.com (Jodie Plant Marketing). Deployed to GitHub Pages via GitHub Actions on push to `main`.

## Commands

- `npm run dev` — local dev server (localhost:4321)
- `npm run build` — production build to `./dist/`
- `npm run preview` — preview production build locally
- `npm ci` — install dependencies (used in CI)

No linting or test tooling is configured.

## Architecture

Standard Astro project structure using strict TypeScript (`astro/tsconfigs/strict`):

- `src/pages/` — file-based routing (currently just `index.astro`)
- `src/layouts/Layout.astro` — base HTML shell (meta, favicon, CSS reset)
- `src/components/` — reusable `.astro` components
- `src/assets/` — imported assets (SVGs processed by Astro)
- `public/` — static files served as-is (favicons)

Pure static site — no SSR, no frontend framework integrations (React/Vue/Svelte), no content collections. Styles are scoped CSS within `.astro` files.

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) builds with Node 20 and deploys the `dist/` directory to GitHub Pages on push to `main`.

## Sprint Orchestration (aishore)

This project uses [aishore](https://github.com/simonweniger/aishore) for AI-assisted sprint management.

### Commands

```bash
# Sprints
.aishore/aishore run [count]        # Run N sprints (default: 1)
.aishore/aishore run FEAT-001       # Run specific item by ID
.aishore/aishore run --auto-commit  # Auto-commit after each sprint

# Grooming
.aishore/aishore groom              # Tech lead: groom bugs
.aishore/aishore groom --backlog    # Product owner: groom features

# Review
.aishore/aishore review             # Architecture review
.aishore/aishore review --update-docs          # Review and update docs
.aishore/aishore review --since <commit>       # Review changes since commit

# Info
.aishore/aishore metrics            # Sprint metrics
.aishore/aishore metrics --json     # Metrics as JSON

# Maintenance
.aishore/aishore update             # Update from upstream (checksum-verified)
.aishore/aishore update --dry-run   # Check for updates without applying
.aishore/aishore checksums          # Regenerate checksums after editing .aishore/ files
.aishore/aishore init               # Interactive setup wizard
```

**Important**: After modifying any files in `.aishore/` (script, agent prompts, etc.), run `.aishore/aishore checksums` before committing. This regenerates `checksums.sha256` which is used to verify integrity during `update`.
