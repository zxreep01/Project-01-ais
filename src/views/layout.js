import { esc } from '../lib/utils.js';
import { site, nav } from '../lib/content.js';

/* Monochrome brand mark — mirrors the reference's black `rounded-md` tile.
   Kept as markup (not an SVG gradient) so it inherits the ink/white theme. */
const BRAND_MARK = `<span class="brand-mark" aria-hidden="true">AI</span>`;

const brand = (label) => `
      <a class="brand" href="/" aria-label="${esc(label || site.name)} home">
        ${BRAND_MARK}
        <span class="brand-name">${esc(site.name)}</span>
      </a>`;

/* Reference `.sticky-cta`: a glass pill with an SVG scroll-progress ring.
   Suppressed on the auth pages, where the visitor is already converting. */
function stickyCta() {
  return `
  <div class="sticky-cta" id="stickyCta">
    <a class="sticky-cta-btn" href="/sign-up">
      <span class="cta-ring">
        <svg class="cta-ring-svg" viewBox="0 0 36 36" aria-hidden="true">
          <circle class="cta-ring-track" cx="18" cy="18" r="16"></circle>
          <circle class="cta-ring-bar" id="ctaRingBar" cx="18" cy="18" r="16"></circle>
        </svg>
        <span class="cta-ring-badge" aria-hidden="true">AI</span>
      </span>
      <span class="sticky-cta-label">
        <span class="sticky-cta-title">Get started</span>
        <span class="sticky-cta-sub">Free, 2 min setup</span>
      </span>
    </a>
  </div>`;
}

export function layout({ title, description = '', active = '', content = '', bodyClass = '', extraHead = '' }) {
  const navLinks = nav.links
    .map(
      (l) => `<a class="nav-link${active === l.href ? ' is-active' : ''}" href="${esc(l.href)}">${esc(l.label)}</a>`
    )
    .join('');

  const isAuthPage = ['/sign-in', '/sign-up', '/forgot-password'].includes(active);

  const footerCols = `
    <div class="footer-col">
      <h4>Product</h4>
      <a href="/#features">Features</a>
      <a href="/#product">Console</a>
      <a href="/pricing">Pricing</a>
      <a href="/#faq">FAQ</a>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <a href="/about">About</a>
      <a href="/docs">Docs</a>
      <a href="/pricing">Status</a>
    </div>
    <div class="footer-col">
      <h4>Legal</h4>
      ${nav.legal.map((l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join('')}
    </div>
    <div class="footer-col">
      <h4>Account</h4>
      <a href="/sign-in">Sign in</a>
      <a href="/sign-up">Sign up</a>
    </div>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#EDEDED">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css">
  <script src="/js/animations.js" defer></script>
  ${extraHead}
</head>
<body class="${esc(bodyClass)}">
  <div class="progress-bar" id="progressBar"></div>

  <!-- Ambient grayscale backdrop (reference .backdrop-orbs) -->
  <div class="bg-scene" aria-hidden="true">
    <div class="orb light orb-a"></div>
    <div class="orb orb-b"></div>
    <div class="orb light orb-c"></div>
  </div>

  <header class="nav" id="siteNav">
    <div class="nav-inner">
      ${brand()}
      <nav class="nav-links" id="navLinks" aria-label="Primary">
        ${navLinks}
      </nav>
      <div class="nav-actions">
        <a class="btn btn-ghost btn-sm" href="/sign-in">Sign in</a>
        <a class="btn btn-primary btn-sm" href="/sign-up">Get Started</a>
      </div>
      <button class="nav-toggle" id="navToggle" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="navMobile">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-mobile" id="navMobile">
      ${nav.links.map((l) => `<a class="nav-link${active === l.href ? ' is-active' : ''}" href="${esc(l.href)}">${esc(l.label)}</a>`).join('')}
      <div class="nav-mobile-actions">
        <a class="btn btn-ghost btn-sm" href="/sign-in">Sign in</a>
        <a class="btn btn-primary btn-sm" href="/sign-up">Get Started</a>
      </div>
    </div>
  </header>

  ${isAuthPage ? '' : stickyCta()}

  <main>${content}</main>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          ${brand()}
          <p>${esc(site.tagline)}. Power AI applications, manage digital assets, and connect the future.</p>
        </div>
        ${footerCols}
      </div>
      <div class="footer-bottom">
        <span>© 2026 ${esc(site.name)} · AI Application Infrastructure Foundation</span>
      </div>
    </div>
  </footer>
</body>
</html>`;
}
