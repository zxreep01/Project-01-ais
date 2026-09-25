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
- If the upstream is unreachable, the app falls back to the bundled snapshot in `data/models.js` (and shows which mode is active on the page).
- Prices are derived with the same logic the original UI uses: per-request models, tiered/dynamic pricing expressions, and `model_ratio × 2` token pricing with completion/cache multipliers.
- Status/Latency/TPS figures are **not** exposed by the public API; the scraped snapshot in `data/stats-snapshot.js` is shown where available.

## Stack

- **[Hono](https://hono.dev)** — one app runs on both Node.js and Cloudflare Pages Functions
- **@hono/node-server** — local/dev server (`npm run dev`, port 3000)
- **Cloudflare Pages Functions** — `functions/[[path]].js` catch-all routes every non-asset request through the same Hono app; `_routes.json` keeps static assets on the CDN
- Server-rendered HTML (zero client frameworks), vanilla-JS scroll animations (IntersectionObserver reveals, count-ups, progress bar, spotlight cards) with `prefers-reduced-motion` support

## Project layout

```
├── .nvmrc               # pins Node 22.16.0 for Cloudflare Pages builds
├── data/                # scraped content + pricing snapshot, as ES modules (see below)
├── functions/[[path]].js  # Cloudflare Pages catch-all Function
├── public/              # static assets: css, js, favicon, _routes.json
├── src/
│   ├── app.js           # Hono app: all routes
│   ├── node-server.js   # Node.js entry point
│   ├── lib/             # content loader, live pricing fetch + derivation
│   └── views/           # HTML templates (layout, home, pricing, docs, auth, legal)
└── wrangler.jsonc
```

`data/*.js` are plain `export default { … }` modules rather than `.json` files — see
[Pages build constraints](#pages-build-constraints-read-before-editing-server-code).

## Develop

Requires **Node.js 22 or newer** (`wrangler` v4 enforces this). The version is pinned in [`.nvmrc`](.nvmrc) — run `nvm use` to switch.

```bash
npm install
npm run dev        # Node.js server on http://localhost:3000
npm run pages:dev  # Cloudflare Pages runtime emulation on http://localhost:8788
```

## Deploy to Cloudflare Pages

1. `npx wrangler login`
2. `npm run deploy` — deploys `public/` + Functions as the Pages project `ai-subscription`

The compatibility date and the `nodejs_compat` flag are read from [`wrangler.jsonc`](wrangler.jsonc).
Note that `wrangler pages deploy` does **not** accept `--compatibility-date` / `--compatibility-flags`
on the command line (those flags exist only for `wrangler pages dev`) — passing them fails the build
with `Unknown arguments`. Keep those settings in `wrangler.jsonc`.

Or connect the repo in the Cloudflare dashboard (Direct Upload or Git integration) with:

- **Build command:** `npm install` — **required, do not leave blank.** Pages skips the entire
  build phase (including dependency installation) when no build command is set, so `node_modules`
  never exists and bundling `functions/` dies with `Could not resolve "hono"`. There is no
  `wrangler.jsonc` key for this — the build command can only be set in the dashboard
  (*Settings → Build & deployments → Build configuration*).
- **Build output directory:** `public` (already set via `pages_build_output_dir` in `wrangler.jsonc`)
- **Root directory:** *(repo root)*
- **Node.js version:** `22.16.0` — Cloudflare Pages reads [`.nvmrc`](.nvmrc) and **ignores** the
  `engines` field in `package.json`, so the pinned file is what keeps the build off the old
  Node 18.17.1 v1 build image, where `wrangler` v4 cannot install or run.
- Compatibility flags: `nodejs_compat` (set via `wrangler.jsonc` / dashboard)

### Pages build constraints (read before editing server code)

Cloudflare Pages does **not** use this repo's `wrangler` to compile `functions/`. It uses its own
pinned **wrangler 3.x**, which bundles **esbuild 0.17.19** — far older than the esbuild in
`wrangler` 4. Syntax that builds fine locally can therefore fail on Pages with parse errors such as
`Expected ";" but found "with"`.

Anything reachable from `functions/[[path]].js` must stay parseable by esbuild 0.17.19. In
particular, **do not use ES import attributes** (`import x from './y.json' with { type: 'json' }`).
Node 22 *requires* that attribute for `.json` imports while esbuild 0.17.19 cannot parse it, so the
bundled data lives in `data/*.js` as plain `export default { … }` modules — the one form both
accept. Add new scraped/fallback data the same way.

Reproduce the real Pages compile locally before pushing:

```bash
npm run pages:preflight   # bundles functions/ with wrangler 3.114.17 / esbuild 0.17.19
```

## Notes

- Auth forms run in demo mode and show a toast instead of submitting; point them at your real auth backend to go live.
- Design is token-driven: re-theme the entire site by editing the `:root` block in `public/css/styles.css`.
