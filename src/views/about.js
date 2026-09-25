import { esc } from '../lib/utils.js';
import { pages } from '../lib/content.js';

export function aboutPage() {
  const a = pages.about;
  return `
  <section class="page-hero">
    <div class="container container-narrow">
      <h1 class="page-title" data-reveal>${esc(a.title)}</h1>
      <p class="page-sub" data-reveal data-reveal-delay="1">${esc(a.intro)}</p>
    </div>
  </section>
  <section class="section section-flush">
    <div class="container container-narrow">
      <div class="about-grid">
        ${a.highlights
          .map(
            (h, i) => `
        <article class="bento-card bento-mini" data-reveal data-reveal-delay="${i}">
          <h3>${esc(h.title)}</h3>
          <p>${esc(h.description)}</p>
        </article>`
          )
          .join('')}
      </div>
      <p class="doc-note" data-reveal>${esc(a.note)}</p>
    </div>
  </section>`;
}
