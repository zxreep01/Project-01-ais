# AI Subscription — Unified API Gateway

A Node.js web application replicating **aisubscription.shop** — a unified API gateway for a vast range of AI models — built to deploy on **Cloudflare Pages**.

## Pages included (every page from the original site)

| Route | Page |
| --- | --- |
| `/` | Home — hero, supported apps, API demo terminal, stats, feature bento, how-it-works, CTA |
| `/pricing` | Pricing — all **52 models** with input/output/cache pricing, vendor/billing filters, search, /1M↔/1K toggle, pagination, expandable details |
| `/docs` | API reference (mirrors `api.aisubscription.shop/llms-docs`) |
| `/about` | About |
| `/sign-in` · `/sign-up` · `/forgot-password` | Auth pages (demo mode — wire to your auth backend to enable) |
| `/user-agreement` · `/privacy-policy` | Legal pages |
| `/api/pricing` | JSON pricing endpoint (live upstream data or bundled snapshot) |
| * | Custom 404 |

## Live data, not hardcoding

The pricing page calls the original site's public API at request time:

```
GET https://api.aisubscription.shop/api/pricing
```

- Server-side fetch with a 5-minute in-memory TTL cache and an 8s timeout.
- If the upstream is unreachable, the app falls back to the bundled snapshot in `data/models.json` (and shows which mode is active on the page).
- Prices are derived with the same logic the original UI uses: per-request models, tiered/dynamic pricing expressions, and `model_ratio × 2` token pricing with completion/cache multipliers.
- Status/Latency/TPS figures are **not** exposed by the public API; the scraped snapshot in `data/stats-snapshot.json` is shown where available.

## Stack

- **[Hono](https://hono.dev)** — one app runs on both Node.js and Cloudflare Pages Functions
- **@hono/node-server** — local/dev server (`npm run dev`, port 3000)
- **Cloudflare Pages Functions** — `functions/[[path]].js` catch-all routes every non-asset request through the same Hono app; `_routes.json` keeps static assets on the CDN
- Server-rendered HTML (zero client frameworks), vanilla-JS scroll animations (IntersectionObserver reveals, count-ups, progress bar, spotlight cards) with `prefers-reduced-motion` support

## Project layout

```
├── data/                # scraped content + pricing snapshot (fallback data)
├── functions/[[path]].js  # Cloudflare Pages catch-all Function
├── public/              # static assets: css, js, favicon, _routes.json
├── src/
│   ├── app.js           # Hono app: all routes
│   ├── node-server.js   # Node.js entry point
│   ├── lib/             # content loader, live pricing fetch + derivation
│   └── views/           # HTML templates (layout, home, pricing, docs, auth, legal)
└── wrangler.jsonc
```

## Develop

```bash
npm install
npm run dev        # Node.js server on http://localhost:3000
npm run pages:dev  # Cloudflare Pages runtime emulation on http://localhost:8788
```

## Deploy to Cloudflare Pages

1. `npx wrangler login`
2. `npm run deploy` — deploys `public/` + Functions as the Pages project `ai-subscription`

Or connect the repo in the Cloudflare dashboard (Direct Upload or Git integration) with:

- **Build command:** *(none — no build step required)*
- **Build output directory:** `public`
- **Root directory:** *(repo root)*
- Compatibility flags: `nodejs_compat` (set via `wrangler.jsonc` / dashboard)

## Notes

- Auth forms run in demo mode and show a toast instead of submitting; point them at your real auth backend to go live.
- Design is token-driven: re-theme the entire site by editing the `:root` block in `public/css/styles.css`.
