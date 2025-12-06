# L'Artisan · Static ecommerce (Astro + React + Tailwind)

Fashion landing with catalog, live filters, instant search, cart drawer and mock checkout. Built for static Astro SSG with React islands. Default language: English; i18n en/es via central dictionary.

## Features
- Astro SSG + React islands + Tailwind + TypeScript.
- Static catalog with category filters and live local semantic search (accent normalization).
- Cart drawer and mock payment drawer (no backend), size selection and totals.
- Language dropdown using `frontend/src/lib/i18n.ts`.
- Newsletter mock with thank-you message and input reset.
- Images from any public HTTPS URL or assets in `public/`.

## Requirements
- Node.js >= 20.10
- pnpm >= 9
- Git

## Quick install
```bash
pnpm install
pnpm --dir frontend install
```

## Commands (from repo root)
- `pnpm --dir frontend dev` - dev server.
- `pnpm --dir frontend lint` - ESLint.
- `pnpm --dir frontend type-check` - `astro check` + TS.
- `pnpm --dir frontend test` - Vitest (placeholders).
- `pnpm --dir frontend build` - static build in `frontend/dist`.
- `pnpm --dir frontend preview` - serve generated build.

### Suggested quality gate
`pnpm --dir frontend lint && pnpm --dir frontend type-check && pnpm --dir frontend test && pnpm --dir frontend build`

## Structure
- `frontend/src/pages/index.astro` - mounts `Storefront` island.
- `frontend/src/components/Storefront.tsx` - catalog, filters, cart, and checkout demo.
- `frontend/src/lib/i18n.ts` - dictionary and language options.
- `frontend/src/styles/global.css` - base reset and responsive helpers.
- `docs/architecture/overview.md` - stack and flow.
- `docs/worklog/2025-12-05.md` - recent changelog.

## Deployment
- Static artifact in `frontend/dist`. Deploy to Vercel, Netlify, Cloudflare Pages, or S3+CloudFront.
- Optional image optimizer: set `ENABLE_IMAGE_OPTIMIZER=true` and run `pnpm approve-builds sharp` before the build if needed.

## Best practices / performance
- Mobile-first, fluid containers, `overflow-x: hidden`.
- Avoid extra JS outside islands; prefer optimized images.
- Keep image URLs under control (ideally move to `public/` or your CDN).

## Troubleshooting
- **Sharp / optimizer**: if it fails, disable `ENABLE_IMAGE_OPTIMIZER` or run `pnpm approve-builds sharp`.
- **Broken images**: use any valid HTTPS URL or place assets in `public/`.
- **Dependencies**: ensure Node 20.10+ and pnpm 9+.

## Next steps
- Add interaction tests (Testing Library) for search, filters, cart, and checkout drawers.
- Persist language and cart in `localStorage`.
- Connect newsletter/payment to real services if a backend is added.
