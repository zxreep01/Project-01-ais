import { esc } from '../lib/utils.js';

export function legalPage(page) {
  return `
  <section class="page-hero">
    <div class="container container-narrow">
      <h1 class="page-title" data-reveal>${esc(page.title)}</h1>
    </div>
  </section>
  <section class="section section-flush">
    <div class="container container-narrow">
      <div class="prose">
        <p class="doc-lead" data-reveal>${esc(page.intro)}</p>
        ${page.sections.map((s, i) => `<p data-reveal data-reveal-delay="${i}">${esc(s)}</p>`).join('')}
        <p class="doc-note" data-reveal>Last updated: 2026-09-22 · Source: <a href="https://aisubscription.shop${esc(page.path)}" rel="noopener">aisubscription.shop${esc(page.path)}</a></p>
      </div>
    </div>
  </section>`;
}

export function notFoundPage() {
  return `
  <section class="page-hero not-found">
    <div class="container container-narrow">
      <p class="nf-code" data-reveal>404</p>
      <h1 class="page-title" data-reveal data-reveal-delay="1">Route not found</h1>
      <p class="page-sub" data-reveal data-reveal-delay="2">This request could not be routed to any upstream service. Try the homepage or browse available models.</p>
      <div class="hero-ctas" data-reveal data-reveal-delay="3">
        <a class="btn btn-primary" href="/">Back to home</a>
        <a class="btn btn-outline" href="/pricing">View Pricing</a>
      </div>
    </div>
  </section>`;
}
