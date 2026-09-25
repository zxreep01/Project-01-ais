import { esc } from '../lib/utils.js';
import { pages } from '../lib/content.js';

function renderSection(s) {
  let inner = '';
  if (s.code) inner += `<pre class="code-block" data-reveal><code>${esc(s.code)}</code></pre>`;
  if (s.items) {
    inner += `<ul class="doc-list">${s.items
      .map(
        (it) => `
      <li data-reveal>
        ${it.method ? `<span class="method method-${esc(it.method.toLowerCase())}">${esc(it.method)}</span>` : ''}
        <strong>${esc(it.label || it.path || '')}</strong>
        ${it.value ? `<span class="doc-val">${esc(it.value)}</span>` : ''}
      </li>`
      )
      .join('')}</ul>`;
  }
  if (s.note) inner += `<p class="doc-note">${esc(s.note)}</p>`;

  return `
  <section class="doc-section">
    <div class="doc-num" data-reveal>${esc(s.number)}</div>
    <div class="doc-body">
      <h2 data-reveal>${esc(s.title)}</h2>
      ${s.body ? `<p class="doc-lead" data-reveal>${esc(s.body)}</p>` : ''}
      ${inner}
    </div>
  </section>`;
}

export function docsPage() {
  const d = pages.docs;
  return `
  <section class="page-hero">
    <div class="container">
      <p class="eyebrow" data-reveal>${esc(d.eyebrow)}</p>
      <h1 class="page-title" data-reveal data-reveal-delay="1">${esc(d.title)}</h1>
      <p class="page-sub" data-reveal data-reveal-delay="2">${esc(d.subtitle)}</p>
      <div class="doc-stats" data-reveal data-reveal-delay="3">
        ${d.stats.map((s) => `<div class="doc-stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join('')}
      </div>
      <p class="doc-src">Live reference: <a href="${esc(d.originalUrl)}" rel="noopener" target="_blank">${esc(d.originalUrl)} ↗</a></p>
    </div>
  </section>
  <section class="section section-flush">
    <div class="container container-narrow">
      ${d.sections.map(renderSection).join('')}
      <div class="cta-panel" data-reveal="zoom">
        <h2>${esc(d.cta.title)}</h2>
        <p>${esc(d.cta.subtitle)}</p>
        <div class="hero-ctas">
          ${d.cta.ctas.map((c, i) => `<a class="btn ${i === 0 ? 'btn-primary' : 'btn-outline'}" href="${esc(c.href)}">${esc(c.label)}</a>`).join('')}
        </div>
      </div>
    </div>
  </section>`;
}
