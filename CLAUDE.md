# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Money Back Guarantee* (mbgstar) — a band website built with Astro 6, server-rendered via Cloudflare Workers.

## Commands

- `make dev` — local dev server (telemetry disabled)
- `make build` — production build (output: `dist/`)
- `make preview` — preview production build locally
- `make clean` — remove `dist/` and `.astro/`
- `npm run deploy` — deploy to Cloudflare Workers via Wrangler
- `npm run generate-types` — generate Cloudflare Worker types

## Architecture

- **Astro 6** with `output: 'server'` and `@astrojs/cloudflare` adapter for SSR on Cloudflare Workers
- **Single page**: `src/pages/index.astro` uses `src/layouts/BaseLayout.astro`
- **Styling**: plain CSS in `src/styles/global.css` with CSS custom properties (`--bg`, `--ink`, `--paper`)
- **Deployment**: Wrangler config in `wrangler.jsonc`; static assets served from `dist/` via the ASSETS binding
- **TypeScript**: strict mode extending `astro/tsconfigs/strict`
