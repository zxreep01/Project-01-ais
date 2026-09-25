import { esc } from '../lib/utils.js';
import { site, nav } from '../lib/content.js';

const LOGO = `
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="29" height="29" rx="8" stroke="url(#lg1)" stroke-width="2"/>
    <circle cx="11" cy="16" r="3" fill="url(#lg1)"/>
    <circle cx="22" cy="10" r="2.4" fill="url(#lg1)" opacity=".85"/>
    <circle cx="22" cy="22" r="2.4" fill="url(#lg1)" opacity=".85"/>
    <path d="M13.6 14.8 19.8 10.9M13.6 17.2 19.8 21.1" stroke="url(#lg1)" stroke-width="1.8" stroke-linecap="round"/>
    <defs>
      <linearGradient id="lg1" x1="0" y1="0" x2="32" y2="32">
        <stop stop-color="#7c5cff"/><stop offset="1" stop-color="#38bdf8"/>
      </linearGradient>
    </defs>
  </svg>`;

export function layout({ title, description = '', active = '', content = '', bodyClass = '', extraHead = '' }) {
  const navLinks = nav.links
    .map(
      (l) => `<a class="nav-link${active === l.href ? ' is-active' : ''}" href="${esc(l.href)}">${esc(l.label)}</a>`
    )
    .join('');

  const footerCols = `
    <div class="footer-col">
      <h4>Product</h4>
      <a href="/pricing">Pricing</a>
      <a href="/docs">Docs</a>
      <a href="/about">About</a>
    </div>
    <div class="footer-col">
      <h4>Account</h4>
      <a href="/sign-in">Sign in</a>
      <a href="/sign-up">Sign up</a>
      <a href="/forgot-password">Forgot password</a>
    </div>
    <div class="footer-col">
      <h4>Legal</h4>
      ${nav.legal.map((l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join('')}
    </div>
    <div class="footer-col">
      <h4>Resources</h4>
      <a href="${esc(site.docsUrl)}" rel="noopener">API Reference ↗</a>
      <a href="/api/pricing">Pricing JSON</a>
      <a href="${esc(site.sourceUrl)}" rel="noopener">Original site ↗</a>
    </div>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css">
  <script src="/js/animations.js" defer></script>
  ${extraHead}
</head>
<body class="${esc(bodyClass)}">
  <div class="progress-bar" id="progressBar"></div>
  <div class="bg-scene" aria-hidden="true">
    <div class="orb orb-a"></div>
    <div class="orb orb-b"></div>
    <div class="bg-grid"></div>
  </div>

  <header class="nav" id="siteNav">
    <div class="nav-inner">
      <a class="brand" href="/" aria-label="${esc(site.name)} home">
        ${LOGO}
        <span class="brand-name">${esc(site.name)}</span>
      </a>
      <nav class="nav-links" id="navLinks" aria-label="Primary">
        ${navLinks}
      </nav>
      <div class="nav-actions">
        <a class="btn btn-ghost btn-sm" href="/sign-in">Sign in</a>
        <a class="btn btn-primary btn-sm" href="/sign-up">Get Started</a>
      </div>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
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

  <main>${content}</main>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" href="/">${LOGO}<span class="brand-name">${esc(site.name)}</span></a>
          <p>${esc(site.tagline)}. Power AI applications, manage digital assets, and connect the future.</p>
        </div>
        ${footerCols}
      </div>
      <div class="footer-bottom">
        <span>© 2026 ${esc(site.name)} · AI Application Infrastructure Foundation</span>
        <span class="footer-src">Data source: <a href="${esc(site.sourceUrl)}" rel="noopener">aisubscription.shop</a></span>
      </div>
    </div>
  </footer>
</body>
</html>`;
}
