# UI Audit — AI Subscription Gateway vs `saas-landing (5).html` Reference

Date: 2026-09-25  
Scope: `src/views/*`, `public/css/styles.css`, `public/js/*`, `data/content.js`, `src/lib/content.js` compared pixel-by-pixel against `saas-landing (5).html` (NewAPI monochrome liquid-glass template).

---

## 1) Executive Summary

The app uses the correct **design tokens** (background `#EDEDED`, ink `#0A0A0A`, Sora+Inter, glass blur 22–28px) and replicates the ambient `orb` backdrop and `invert-oval` blob. However the **landing page layout is not identical** to the reference: hero is single-column, the scrolling logo marquee is missing, the feature section is a bento grid instead of a blurred carousel, the dark product showcase and tabbed code window are missing, pricing is a filtered model grid rather than the marketing 3-tier on the reference, FAQ and dark CTA are absent, and footer columns differ. Multiple interaction pieces from the reference (carousel focus, nav scroll-spy, sticky-CTA footer-hide & ring progress, code-tab switching) are not implemented. Several external `aisubscription.shop` / `api.aisubscription.shop` links leak the upstream source.

**Verdict: ≈60% visual parity — tokens correct, components divergent.**

---

## 2) Reference Structure (saas-landing)

```
header (glass-pill, fixed top-3)
sticky mini-CTA (glass-strong + SVG ring)
hero 2-col (badge + title + subtitle + 2 CTAs + 3 stats | graphic ph + P50 badge)
marquee full-bleed (8 logo chips, duplicated, CSS scroll 28s, pause on hover)
features carousel (5 cards, blur 3px / scale 0.92 unfocused, 1.0 focused, dots, autoplay 4.2s, arrows)
product showcase (glass-strong rounded-3xl, text + chart)
code window (black #0A0A0A, tabs cURL/JS/Python, token colors)
how it works (3 glass cards, dashed step-line)
pricing (3 tiers, Pro "Most popular" ring)
FAQ (glass accordion, 6 items, chevron rotate 180deg)
CTA dark (glass-dark bg-black, btn-liquid-invert)
footer (glass rounded-3xl, 3 nav cols, centered copyright)
```

JS behaviors: count-up on stats (expo ease), marquee CSS, carousel focus/scroll/dots/autoplay+pause, nav scroll-spy + mobile CTA label swap, sticky-CTA visible past hero + hidden near footer + ring progress, code tabs.

---

## 3) Detailed Gap Analysis

### 3.1 Header / Navigation
| Reference | Current | Severity | Fix |
|-----------|---------|----------|-----|
| Fixed pill `top-3 inset-x-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` with `glass-pill rounded-2xl h-16 px-5` | `.nav` + `.nav-inner` using `max-width:1152px` and `--glass-pill-bg` — close but inner padding `16px` vs `20px`, border-radius `16px` same, shadow differs | Low | Match padding & shadow exactly; keep `inset-x` centering |
| Brand: black 32×32 `rounded-md` “N” + `NewAPI` Sora 17px | Brand: same 32×32 `rounded-sm` “AI” + `AI Subscription` — visual size/weight identical but `rounded-sm` (6px) vs `rounded-md` (6–8px) slight diff | Low | Keep AI but use `rounded-md` 8px |
| Nav links: `Features | Console | How it works | Pricing` with `nav-link` underline animation `right:100%→0` | Links: `Home | Pricing | Docs | About` — semantic mismatch; underline animation missing `right` transition on some breakpoints | Medium | Add `Features/Console/How` anchor links on home; keep Home/Pricing/Docs/About for multi-page but add underline animation consistency |
| Actions: `Log in` text + `Get started` `btn-liquid` solid black | `Sign in` ghost + `Get Started` `btn-primary` black — label case differs, but intent same; hover `translateY(-1px)` + shadow `14px 34px -12px rgba(0,0,0,.45)` identical | Low | Normalize label “Log in” / “Get started” capitalization |
| Mobile: hamburger 3 spans rotate 45° with `nav-open` panel `glass` rounded-2xl | Same — but panel `border-radius:16px` vs `22px` on desktop, missing `display:none !important` on lg | Low | Align breakpoint: hide toggle at `min-width:1024px` |

### 3.2 Hero
| Reference | Current | Severity |
|-----------|---------|----------|
| 2-col grid `lg:grid-cols-12 gap-12` — left `lg:col-span-6` with badge `Version 2.4 is live`, title `One gateway for every AI model`, subtitle `Connect OpenAI, Claude, Gemini…`, 2 CTAs `Deploy your gateway` + `See how it works`, 3 stats `100+ / 99.99% / <2 min` inline with `divide-x` + `border-t` | Single centered column `hero-inner flex column`, badge `AI Application Infrastructure Foundation`, title `Unified API Gateway for a Vast Range…` with `<em>` highlight, 3 CTAs including external Docs, no graphic | **High** — missing right graphic `ph glass-strong aspect-[4/3]` with wireframe SVG + floating `-bottom-6 -left-6` P50 card `glass-strong rounded-xl px-4 py-3 w-56` |
| Stats: inside hero, 3-col `divide-x`, tabular-nums, count-up `data-target` + `data-suffix`/`data-decimals`, values `100`, `99.99`, `2` with “<” prefix | Stats: separate `.stats-band` 4-col glass cards, values `42+ / 52+ / 9+ / 24/7` with `data-count` generic | Medium — sane stats but not reference fidelity |
| `invert-oval` 520×260 white difference blend, `oval-drift` 14s | Same size/animation — but placed inside centered hero, may clip on mobile if container not `overflow-x:clip` | Low — ensure `position:absolute top:-40 right:-90` not clipped |

### 3.3 Model Strip / Supported Apps
| Reference | Current | Severity |
|-----------|---------|----------|
| Full-bleed `marquee-bleed width:100vw left:50% margin-left:-50vw` + `border-y border-black/10` + mask gradient + `marquee-track` flex `width:max-content gap:12px` with duplicated 8 chips, `marquee-scroll 28s linear infinite` pause on hover, chips `logo-chip` `bg rgba(255,255,255,.55) border white/.85 rounded-full px-16px gap10px` + `logo-mark` 24×24 black circle with SVG | `.apps-strip border-block` + static `.apps-row flex-wrap` 2 chips `Cherry Studio / CC Switch` + muted `More Apps` — no marquee, no animation, chips styled via `app-chip` with `--glass-pill-bg` but not duplicated, no mask | **High** |

### 3.4 Features Carousel vs Bento
| Reference | Current | Severity |
|-----------|---------|----------|
| Horizontal scroll-snap carousel: `carousel-track --card-w 82% / 48% / 32%`, `carousel-card blur 3px opacity .55 scale .92` unfocused, `is-focused blur0 opacity1 scale1`, spacers `calc((100% - var(--card-w))/2)`, dots `8px bg black/.18 → black scale1.25`, arrows `glass h-10 w-10 rounded-full`, autoplay 4200ms loop, pause on hover/touch | Static `bento grid` 1→2→4 cols, cards `bento-card` with hover lift + spotlight radial gradient, `bento-index` 34×34 black, tags row | **High** — completely different component, no scroll, no focus effect |

### 3.5 Product Showcase
| Reference | Current |
|-----------|---------|
| `glass-strong rounded-3xl p-6 sm:p-10 grid lg:grid-cols-12 gap-10` left text “One console for every request” + 3 check items, right `ph-dark glass-dark aspect-[16/10]` chart SVG white on dark | **Missing entirely** — no showcase section. |

### 3.6 Code Snippet
| Reference | Current |
|-----------|---------|
| Grid text left + right `code-window bg #0A0A0A rounded-16 overflow-hidden shadow 24px 60px` with bar 3 dots + tabs `code-tab is-active bg white/10`, panes `code-pane is-active display:block` monospace 12.5px token colors `tok-kw white 600, tok-str 60%, tok-com 38% italic` | `.terminal` similar dark window but uses `.terminal-bar/.terminal-tabs/.terminal-tab` + split request/response panes, meta chips — not tabbed cURL/JS/Python; tabs non-functional (no pane switching) |

### 3.7 How It Works
| Reference | Current | Notes |
|-----------|---------|-------|
| 3 `glass rounded-2xl p-7` cards with numbered 36px black circles `01 02 03` + hidden md `step-line` dashed `8px black/25% 16px repeat-x` | Same 3 cards `step` with `step-num 40px` + no `step-line` visible (CSS defines `.step-line display:none` until md) — missing dashed connector on md+ | Medium |

### 3.8 Pricing
| Reference | Current |
|-----------|---------|
| `max-w-4xl mx-auto grid md:grid-cols-3 gap-6` marketing tiers Starter $0 / Pro $49 “Most popular” / Enterprise Custom with `glass / glass-strong` + ring | `/pricing` page: live data grid `model-card` 52 models with search/vendor/billing filters, unit toggle /1M↔/1K, pagination 21 per page, expandable details — **not comparable**. Home has no marketing tiers. |

### 3.9 FAQ
| Reference | Current |
|-----------|---------|
| `max-w-3xl divide-y black/10 glass rounded-2xl` 6 `<details. faq-item open>` with `faq-summary 18px 22px font 14.5 600` + chevron rotate 180°, body `13.5px black/62` | **Missing** |

### 3.10 CTA
| Reference | Current |
|-----------|---------|
| `glass-dark bg-black rounded-3xl p-10 lg:p-14 grid lg:grid-cols-12` white title `Ready to simplify…` + subtitle white/60 + `btn-liquid-invert white black` | `cta-panel` light glass centered, `btn-primary` black — wrong surface (light vs dark) and layout (centered vs 2-col) |

### 3.11 Footer
| Reference | Current | Issue |
|-----------|---------|-------|
| `glass rounded-3xl p-10 grid md:grid-cols-5 gap-8` col1 brand + `Enterprise AI model routing…` col2 Product (Features/Console/Pricing/FAQ) col3 Company (About/Docs/Status) col4 Legal (Privacy/Terms) + centered `© 2026 NewAPI` | `footer-grid` 1→2→5 cols col1 brand + `Unified API Gateway… Power AI…` col2 Product (Pricing/Docs/About) col3 Account (Sign in/Sign up/Forgot) col4 Legal col5 Resources (`API Reference ↗ / Pricing JSON / Original site ↗`) + bottom `© 2026 AI Subscription · … + Data source: aisubscription.shop` | Extra Account/Resources cols, missing Status, extra leaked link, bottom not centered |

### 3.12 Animations / JS
| Expected | Actual | Bug |
|----------|--------|-----|
| Count-up `data-target` + suffix/decimals, IntersectionObserver threshold 0.4, expo ease, duration 1400ms | `data-count` + parse suffix via regex, duration 1300ms, threshold 0.5 — functional but inconsistent attribute naming | Medium — stats in hero won’t animate if markup uses `count-up` |
| Carousel center-focus blur/opacity/scale, scroll-sync dots, autoplay 4200 pause on enter/touch | **Not implemented** | High |
| Nav scroll-spy `is-active` via `getBoundingClientRect top ≤ innerHeight*0.35`, mobile CTA label swap to section name | Not implemented | Medium |
| Sticky CTA: past hero (`hero bottom <0` or `scrollY > 0.6vh`) + hidden near footer (`footer top < viewport`), ring `strokeDashoffset = 100.53*(1-progress)` | Simple `scrollY > 0.75vh` toggle, no footer hide, ring same math but no footer logic | Medium — CTA overlaps footer |
| Code tabs: `data-code-tab` / `data-code-pane` toggle `is-active` | `.terminal-tabs` exist but no click handler — inert | Medium |
| Marquee pause on hover via CSS `animation-play-state:paused` | No marquee | High |
| Progress bar | Exists but reference has none — extra not harmful |

### 3.13 Styling Tokens — Mismatch List
- `.nav-inner` border/shadow: ours `0 18px 44px -18px rgba(0,0,0,.35)` vs reference `0 20px 56px -20px rgba(0,0,0,.28)` — slightly heavier.
- `.btn-primary` radius `12px` vs reference `rounded-xl` `12px` same — ok.
- `.glass-pill` on header missing `box-shadow 0 1px 1px white/.9 inset` on initial (only on scrolled) — reference always white/.9 inset.
- `.invert-oval` max-width 90vw correct, but ours inside `.hero-inner` flex may need `overflow-x:clip` on hero.
- Missing `.glass-dark` correct for code/product/CTA dark — ours exists but product missing.
- Missing `.marquee-bleed`, `.marquee`, `.marquee-track`, `.logo-chip`, `.logo-mark`, `.carousel-*`, `.faq-*`, `.code-window*`.
- Typography: reference `h1 tracking-tight -0.02em` same; ours adds `text-wrap:balance` — good, not identical but acceptable.
- Spacing: reference `main pt-20` (80px) vs ours `calc(var(--nav-top)+var(--nav-h)+16px)` = 92px — 12px taller.
- Horizontal overflow: both set `overflow-x:clip` but inner `.hero` + `.invert-oval` may cause scroll if `width:100vw` marquee added without proper bleed handling — already handled with `left:50% margin: -50vw`.

### 3.14 Responsive Bugs Found (Manual viewport test)
1. **320–399px**: hero invert-oval 520×260 clips right edge (expected) but may cause horizontal scroll if parent not `overflow-x:clip` — currently body has `clip` so safe. Model strip missing so no test.
2. **Pricing toolbar**: at 320px `.filter-search input font-size 16px` prevents zoom (good) but `select` font 16px, grid `minmax(0,1fr)` stacks ok; at 480–640 `grid-template-columns:1fr 1fr` causes search spanning 2 cols correctly, but at 768+ `2fr 1fr 1fr auto auto` may overflow if vendor names long (e.g., “阿里巴巴”) — we clamp.
3. **Model card**: long `model_name` like `/data/Models/MiniMax-H3` with `overflow-wrap:anywhere` + `word-break:break-word` fixed overflow (good). `billing_expr` long wraps.
4. **Auth card**: `max-width:420/480` + padding `28px 22px → 36px 30px` at 640 good, but on 320 padding reduced to `22 16` — ok.
5. **Footer**: `grid 1fr → 2fr @640 → 1.6fr 1fr×4 @1024` correct but bottom flex at <480 stacks column (good) — but `Data source` link external breaks a11y focus.
6. **Sticky CTA**: at <480 `.sticky-cta-sub display:none` ok, but FAB `right:16px` may overlap scrollbar on 320.
7. **Terminal**: `terminal-split` stacks 1 col <768, 2 cols ≥768 with left border — correct, but tab buttons wrap on 320 causing height growth — ok.

### 3.15 Accessibility Bugs
- **Focus ring**: `:focus-visible 2px solid ink offset 3px border-radius 4px` present — good.
- **Carousel arrows**: reference uses `aria-label="Previous/Next"` — ours carousel missing so no a11y.
- **Details FAQ**: uses native `<details>` which is keyboard accessible — but SVG chevron `aria-hidden` missing? Reference uses `fill currentColor` without hidden — minor.
- **Color contrast**: monochrome `#0A0A0A` on `#EDEDED` + white glass satisfies WCAG AA (ratio ~15:1). Glass text `rgba(10,10,10,.65)` ~ 7:1? Actually 65% opacity on white ~ #7a7a7a on #ededed fails AA small text? Check: #595959? Might be borderline — but reference uses same, so keep.
- **Images**: decorative `.orb` `aria-hidden`, `invert-oval` `aria-hidden` good; auth logo `alt="AI Subscription logo"` good but external.
- **Reduced motion**: reference disables orb animation, marquee animation, carousel autoplay — ours disables orb + invert-oval but not marquee/carousel (since not present).
- **Button sizes**: `.btn` `min-height` not set but padding 12px 20px yields ~44px touch target — ok. Pagination `page-btn` `44×44` good.

### 3.16 Performance / SEO
- **Font preload**: `preconnect` to fonts.gstatic.com + Google Fonts with `display=swap` implicit? Missing `display=swap` param — actually URL includes `family=Sora…&display=swap` not ? Check: link `https://fonts.googleapis.com/css2?family=Sora…display=swap` — has display=swap — good.
- **Tailwind CDN**: reference loads `https://cdn.tailwindcss.com` + config `tailwind.config` — our app does NOT load Tailwind CDN; relies on custom CSS — lighter, faster, no CLS from config.
- **Meta**: `theme-color #EDEDED`, `description` from `pages.home.hero.subtitle`, OG tags present — good.
- **Cache headers**: home/pricing 60/300, docs 60/300, auth no-store, API 60/300 — sensible.
- **Images**: no `<img>` in hero (SVG only) — no layout shift.
- **JS**: `animations.js` + `pricing.js` + `auth.js` all `defer` — good; no blocking Tailwind.
- **Inline critical**: no critical CSS inline — okay.

### 3.17 External Link Leak (`aisubscription.shop`)
Found 14 occurrences across 6 files:
- `data/content.js` `site.*` + `docs.*` + hero CTA `Docs`
- `src/views/layout.js` footer `Data source` + Resources `Original site`
- `src/views/auth.js` logo `img src`
- `src/views/legal.js` source line
- `src/views/pricing.js` live data link
- `src/views/docs.js` rendered doc-src

These should be removed / replaced with internal links to keep branding self-contained and avoid confusion (user explicitly requested removal).

---

## 4) Bug Priority Matrix

| Priority | Bug |
|----------|-----|
| **P0** | Hero not 2-col, missing graphic & P50 badge & inline stats |
| **P0** | Marquee missing / static apps-strip |
| **P0** | Carousel missing / bento mismatch |
| **P0** | External `aisubscription.shop` links leak |
| **P1** | Product showcase missing |
| **P1** | Code window tabs missing (terminal not identical) |
| **P1** | FAQ missing |
| **P1** | CTA light vs dark mismatch |
| **P1** | Carousel/nav scroll-spy/code-tabs/sticky footer-hide JS missing |
| **P2** | Footer columns extra / centered copyright |
| **P2** | Pricing tiers vs model grid confusion (home vs /pricing) |
| **P2** | Nav link underline animation inconsistent |

---

## 5) Recommended Fixes (Implemented in this branch)

1. Rewrite `src/views/home.js` to match reference section order & markup (hero 2-col, marquee, carousel, showcase, code-window tabs, how-it-works with step-line, 3-tier pricing preview, FAQ accordion, dark CTA).
2. Append missing reference CSS (`.marquee-bleed`, `.marquee`, `.logo-chip`, `.carousel-track/card/dots`, `.code-window`, `.faq-*`, dark pricing tiers) to `public/css/styles.css` and ensure identical values (blur, radii, shadows, timings).
3. Enhance `public/js/animations.js` with carousel focus/autoplay/dots, code-tab switching, nav scroll-spy (future) and footer-aware sticky CTA.
4. Replace external `aisubscription.shop` hrefs with internal `/`, `/docs`, `/api/pricing`, generic `https://gateway.newapi.dev` placeholders and remove Data source / Original site rows.
5. Update `src/views/layout.js` footer/header to match reference pixel-perfect and swap external logo for inline SVG fallback.
6. Keep dedicated `/pricing` model grid but ensure its toolbar styling matches reference glass tokens.

---

*Audit generated by Arena AI — professional UI designer review.*
