# mbgstar

Money Back Guarantee* official website built with Astro as a static site.

## Local development

```bash
npm install
npm run dev
```

If Astro prompts for telemetry locally, you can disable it with:

```bash
astro telemetry disable
```

## Build

```bash
npm run build
```

The generated static site is output to `dist/`.

## Cloudflare Pages

Use these settings:

- Build command: `npm run build`
- Build output directory: `dist`

## Content setup

Site content and placeholder links live in `src/data/site.ts`.

The newsletter embed uses Substack. If your final publication URL is different,
update:

- `newsletterEmbedUrl`
- `newsletterUrl`
