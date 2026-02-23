# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Astro 5 static site for www.jodieplant.com — Jodie Plant Marketing, an AI/tech-forward digital marketing agency targeting startups and tech companies. Deployed to GitHub Pages via GitHub Actions on push to `main`.

The full design and content brief is at `docs/WEBSITE_BRIEF.md` (v2.0). The sprint backlog is at `backlog/backlog.json`.

## Commands

- `npm run dev` — local dev server (localhost:4321)
- `npm run build` — production build to `./dist/`
- `npm run preview` — preview production build locally
- `npm ci` — install dependencies (used in CI)

No linting or test tooling is configured. Validation command for aishore sprints is `npm run build`.

## Architecture

Standard Astro project structure using strict TypeScript (`astro/tsconfigs/strict`):

- `src/pages/` — file-based routing (MVP: index, about, services, results, contact)
- `src/layouts/Layout.astro` — base HTML shell (meta, favicon, fonts, CSS)
- `src/components/` — reusable `.astro` components (Header, Footer, ServiceCard, etc.)
- `src/assets/` — imported assets (SVGs processed by Astro)
- `public/` — static files served as-is (favicons, OG images)
- `docs/` — project documentation (website brief)
- `backlog/` — aishore sprint backlog and bugs

Pure static site — no SSR, no frontend framework integrations (React/Vue/Svelte). Tailwind CSS for styling (to be added in FEAT-001). Forms handled by Formspree or similar static-compatible service.

## Key Design Decisions (from brief v2.0)

- **Brand colors**: Dark navy `#0F172A`, orange accent `#FF6B35`, indigo secondary `#6366F1`
- **Typography**: Cabinet Grotesk (headlines), Inter (body), Space Grotesk (stats/callouts)
- **Pages**: / (homepage), /about, /services, /results, /contact
- **CTA strategy**: Contact form (primary) + email (jodie@jodieplant.com) + calendar booking (Phase 2)
- **Lead magnet**: "Free Marketing Audit" framing on contact page
- **Tone**: Bold, confident, direct — "we get results" energy
- **Social proof**: Real credentials only — never fake case studies or fabricated metrics
- **Analytics**: PostHog (product analytics, session recording, funnels) — requires cookie consent banner
- **Cookie consent**: PostHog must NOT load until user consents; `localStorage` key `analytics_consent`

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
.aishore/aishore status             # Backlog overview and sprint readiness
.aishore/aishore metrics            # Sprint metrics
.aishore/aishore metrics --json     # Metrics as JSON

# Maintenance
.aishore/aishore update             # Update from upstream (checksum-verified)
.aishore/aishore update --dry-run   # Check for updates without applying
.aishore/aishore checksums          # Regenerate checksums after editing .aishore/ files
.aishore/aishore init               # Interactive setup wizard
```

**Important**: After modifying any files in `.aishore/` (script, agent prompts, etc.), run `.aishore/aishore checksums` before committing. This regenerates `checksums.sha256` which is used to verify integrity during `update`.
