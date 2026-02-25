# www.jodieplant.com

Marketing website for Jodie Plant Marketing — an AI/tech-forward digital marketing agency targeting startups and tech companies.

**Live**: [www.jodieplant.com](https://www.jodieplant.com)

## Tech Stack

- [Astro 5](https://astro.build) — static site framework
- Tailwind CSS — utility-first styling (planned, see backlog FEAT-001)
- GitHub Pages — hosting via GitHub Actions

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview production build locally |

## Sprint Management

This project uses [aishore](https://github.com/simonweniger/aishore) for AI-assisted sprint management.

```bash
.aishore/aishore status              # View backlog overview
.aishore/aishore run                 # Run next sprint
.aishore/aishore run FEAT-001        # Run specific item
.aishore/aishore groom --backlog     # Product owner grooming
```

## Documentation

- [`docs/WEBSITE_BRIEF.md`](docs/WEBSITE_BRIEF.md) — Full design and content brief
- [`backlog/backlog.json`](backlog/backlog.json) — Feature backlog (35 items)
- [`CLAUDE.md`](CLAUDE.md) — AI coding assistant instructions
