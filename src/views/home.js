import { esc } from '../lib/utils.js';
import { pages } from '../lib/content.js';

export function homePage() {
  const p = pages.home;

  const hero = `
  <section class="hero">
    <div class="container hero-inner">
      <div class="invert-oval" aria-hidden="true"></div>
      <div class="hero-badge" data-reveal>
        <span class="pulse-dot"></span>${esc(p.badge)}
      </div>
      <h1 class="hero-title" data-reveal data-reveal-delay="1">
        ${esc(p.hero.title).replace('Vast Range', '<em>Vast Range</em>')}
      </h1>
      <p class="hero-sub" data-reveal data-reveal-delay="2">${esc(p.hero.subtitle)}</p>
      <div class="hero-ctas" data-reveal data-reveal-delay="3">
        ${p.hero.ctas
          .map(
            (c, i) =>
              `<a class="btn ${i === 0 ? 'btn-primary' : i === 1 ? 'btn-outline' : 'btn-ghost'}" href="${esc(c.href)}"${c.href.startsWith('http') ? ' rel="noopener" target="_blank"' : ''}>${esc(c.label)}</a>`
          )
          .join('')}
      </div>
    </div>
  </section>`;

  const apps = `
  <section class="section apps-strip">
    <div class="container" data-reveal>
      <p class="eyebrow">${esc(p.supportedApplications.eyebrow)}</p>
      <p class="apps-note">${esc(p.supportedApplications.description)}</p>
      <div class="apps-row">
        ${p.supportedApplications.apps
          .map(
            (a) => `<a class="app-chip" href="${esc(a.href)}" rel="noopener" target="_blank">${esc(a.name)} <span aria-hidden="true">↗</span></a>`
          )
          .join('')}
        <span class="app-chip app-chip-muted">More Apps</span>
      </div>
    </div>
  </section>`;

  const d = p.apiDemo;
  const apiDemo = `
  <section class="section">
    <div class="container">
      <div class="terminal" data-reveal="zoom">
        <div class="terminal-bar">
          <div class="terminal-tabs">
            ${d.tabs.map((t, i) => `<button class="terminal-tab${i === 0 ? ' is-active' : ''}" type="button">${esc(t)}</button>`).join('')}
          </div>
          <span class="terminal-status"><span class="status-dot"></span>${esc(d.status)}</span>
        </div>
        <div class="terminal-endpoint">
          <span class="method">${esc(d.method)}</span>
          <code>${esc(d.endpoint)}</code>
          <span class="stream-badge">${esc(d.streamBadge)}</span>
        </div>
        <div class="terminal-split">
          <div class="terminal-pane">
            <p class="pane-label">Request</p>
            <pre><code>${esc(d.request)}</code></pre>
          </div>
          <div class="terminal-pane">
            <p class="pane-label">Response</p>
            <pre><code>${esc(d.response)}</code></pre>
          </div>
        </div>
        <div class="terminal-meta">
          ${d.meta.map((m) => `<span class="meta-chip"><strong>${esc(m.value)}</strong> ${esc(m.label)}</span>`).join('')}
        </div>
      </div>
    </div>
  </section>`;

  const stats = `
  <section class="section stats-band">
    <div class="container">
      <div class="stats-grid">
        ${p.stats
          .map(
            (s) => `
          <div class="stat" data-reveal>
            <span class="stat-value" data-count="${esc(s.value)}">${esc(s.value)}</span>
            <span class="stat-label">${esc(s.label)}</span>
          </div>`
          )
          .join('')}
      </div>
    </div>
  </section>`;

  const f = p.features;
  const featureTags = (item) =>
    item.tags ? `<div class="tag-row">${item.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : '';

  const features = `
  <section class="section" id="features">
    <div class="container">
      <p class="eyebrow" data-reveal>${esc(f.eyebrow)}</p>
      <h2 class="section-title" data-reveal data-reveal-delay="1">${esc(f.title)}</h2>
      <div class="bento">
        ${f.items
          .map(
            (item, i) => `
        <article class="bento-card bento-card-${i + 1}" data-reveal data-reveal-delay="${i}">
          <span class="bento-index">${esc(item.index)}</span>
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.description)}</p>
          ${featureTags(item)}
        </article>`
          )
          .join('')}
        ${f.highlights
          .map(
            (h) => `
        <article class="bento-card bento-mini" data-reveal>
          <h3>${esc(h.title)}</h3>
          <p>${esc(h.description)}</p>
        </article>`
          )
          .join('')}
      </div>
    </div>
  </section>`;

  const w = p.howItWorks;
  const howItWorks = `
  <section class="section">
    <div class="container">
      <p class="eyebrow" data-reveal>${esc(w.eyebrow)}</p>
      <h2 class="section-title" data-reveal data-reveal-delay="1">${esc(w.title)}</h2>
      <div class="steps">
        ${w.steps
          .map(
            (s, i) => `
        <div class="step" data-reveal data-reveal-delay="${i}">
          <div class="step-num">${s.step}</div>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.description)}</p>
        </div>`
          )
          .join('')}
      </div>
    </div>
  </section>`;

  const cta = `
  <section class="section">
    <div class="container">
      <div class="cta-panel" data-reveal="zoom">
        <h2>${esc(p.cta.title)}</h2>
        <p>${esc(p.cta.subtitle)}</p>
        <div class="hero-ctas">
          ${p.cta.ctas
            .map((c, i) => `<a class="btn ${i === 0 ? 'btn-primary' : 'btn-outline'}" href="${esc(c.href)}">${esc(c.label)}</a>`)
            .join('')}
        </div>
      </div>
    </div>
  </section>`;

  return [hero, apps, apiDemo, stats, features, howItWorks, cta].join('\n');
}
