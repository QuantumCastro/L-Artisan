# Architecture and stack

- **Framework**: Astro (SSG) with React islands and TailwindCSS. Typed with TypeScript.
- **Primary UI**: `Storefront.tsx` island handles catalog, filters, cart, and mock checkout.
- **Styling**: Tailwind + `frontend/src/styles/global.css` (reset, responsive helpers, overflow-x hidden).
- **I18n**: Central dictionary in `frontend/src/lib/i18n.ts` (en/es, default en). Language dropdown in navbar.
- **Data**: In-memory catalog (`PRODUCTS` in `Storefront.tsx`). Images served via HTTPS URLs. No runtime network calls.
- **Build**: `pnpm --dir frontend build` produces static HTML in `frontend/dist`. No SSR or backend.
- **Accessibility/UX**: Real-time local search with accent normalization, category filters, cart drawer, and mock payment drawer.

# Render flow

1) `frontend/src/pages/index.astro` mounts the `Storefront` island.
2) `Storefront` loads products in memory and applies filters (category + local semantic search).
3) Interactions:
   - Sticky navbar (appears after minimal scroll) with language selector and cart counter.
   - Search panel pinned below header when open; filters results live.
   - Category buttons update `activeCategory` and show active filter chip.
   - Cart drawer shows items and opens payment drawer (no backend).
   - Payment drawer validates basic fields and shows simulated success.
4) Secondary layouts (`Hero`, `ThreeTeaser`, `FeatureGrid`, `GsapShowcase`) act as static sections.

# Decisions

- **Local data**: No backend; content versioned in repo for deterministic builds.
- **No persistence**: Cart and language live in local state (consider `localStorage` later).
- **Remote images**: Unsplash (or any HTTPS URL) for speed; optionally move to `public/` for full control.
- **Security**: No secrets handled. Payment/newsletter forms are mock with no submissions.
- **Performance**: Mobile-first, fluid containers, reduced gaps/blur; navbar and search use light transparency.

# Key commands

- `pnpm --dir frontend dev` - develop.
- `pnpm --dir frontend lint` - ESLint.
- `pnpm --dir frontend type-check` - `astro check` + TS.
- `pnpm --dir frontend test` - Vitest (placeholder).
- `pnpm --dir frontend build` - static build.

# Deployment

- Output in `frontend/dist`. Upload to static hosting (Vercel/Netlify/CF Pages/S3+CF).
- If you need image optimizer, set `ENABLE_IMAGE_OPTIMIZER=true` and run `pnpm approve-builds sharp` before `build`.

# Risks and todos

- No persistence for language or cart (lost on reload).
- No automated interaction tests yet (search, filters, mock checkout pending).
- Reliance on external image URLs (consider local/public cache).
- Accents removed in some strings to avoid Windows encoding issues; adjust if precise localization is needed.
