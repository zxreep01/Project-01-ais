import { esc, fmtUsd } from '../lib/utils.js';
import { pages, stats } from '../lib/content.js';

function priceBlock(model, unit) {
  const dv = model.derived;
  const div = unit === '1K' ? 1000 : 1;
  const u = unit === '1K' ? '1K' : '1M';
  if (dv.type === 'request') {
    return `
      <span class="price-badge price-badge-request">Per Request</span>
      <div class="price-line price-single">${fmtUsd(dv.perRequest)} <small>/ request</small></div>`;
  }
  const dyn = dv.dynamic ? '<span class="price-badge price-badge-dynamic">Dynamic Pricing</span>' : '<span class="price-badge">Token-based</span>';
  const rows = [
    ['Input', dv.input],
    ['Output', dv.output],
    ['Cached', dv.cached],
    ['Cache write', dv.cacheCreate],
  ]
    .filter(([, v]) => v !== null && v !== undefined)
    .map(([label, v]) => `<div class="price-line"><span>${label}</span><strong>${fmtUsd(v / div)} <small>/ ${u}</small></strong></div>`)
    .join('');
  return dyn + rows;
}

export function modelCard(model, unit = '1M') {
  const snap = (stats.models || {})[model.model_name] || null;
  const initials = (model.vendor || model.model_name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 1) || '?').slice(0, 1).toUpperCase();
  const endpoints = model.endpoints.map((e) => `<span class="tag tag-endpoint">${esc(e)}</span>`).join('');
  const groups =
    model.enable_groups && model.enable_groups.length
      ? `<span class="tag">${esc(model.primaryGroup)}</span>${model.extraGroups ? `<span class="tag tag-more">+${model.extraGroups}</span>` : ''}`
      : '<span class="tag">default</span>';

  const dv = model.derived;
  const priceData =
    dv.type === 'request'
      ? { t: 'request', p: dv.perRequest }
      : { t: 'token', d: dv.dynamic ? 1 : 0, i: dv.input, o: dv.output, c: dv.cached ?? null, w: dv.cacheCreate ?? null };

  const detailsRows = [
    ['Groups', (model.enable_groups || []).map(esc).join(', ') || 'default'],
    ['Endpoints', model.endpoints.map(esc).join(', ') || '—'],
    model.derived.cached !== null && model.derived.cached !== undefined ? ['Cache read', `${fmtUsd(model.derived.cached)} / 1M`] : null,
    model.derived.cacheCreate !== null && model.derived.cacheCreate !== undefined ? ['Cache write', `${fmtUsd(model.derived.cacheCreate)} / 1M`] : null,
    model.image_ratio !== undefined ? ['Image ratio', String(model.image_ratio)] : null,
    model.billing_expr ? ['Billing rule', esc(model.billing_expr)] : null,
  ]
    .filter(Boolean)
    .map(([k, v]) => `<div class="detail-row"><span>${k}</span><code>${v}</code></div>`)
    .join('');

  return `
  <article class="model-card" data-reveal
    data-vendor="${esc((model.vendor || '').toLowerCase())}"
    data-billing="${model.derived.type}"
    data-group="${esc(model.primaryGroup)}"
    data-name="${esc(model.model_name.toLowerCase())}"
    data-price='${JSON.stringify(priceData)}'>
    <div class="model-head">
      <span class="vendor-badge" title="${esc(model.vendor || 'Unknown vendor')}">${esc(initials)}</span>
      <div class="model-id">
        <h3 title="${esc(model.model_name)}">${esc(model.model_name)}</h3>
        <p>${esc(model.vendor || '—')}${model.owner_by ? ` · ${esc(model.owner_by)}` : ''}</p>
      </div>
    </div>
    <div class="model-pricing">${priceBlock(model, unit)}</div>
    <div class="model-meta">
      <div class="meta-group"><span class="meta-label">Groups</span><div class="tag-row">${groups}</div></div>
      <div class="meta-group"><span class="meta-label">Endpoints</span><div class="tag-row">${endpoints}</div></div>
    </div>
    ${
      snap
        ? `<div class="model-stats">
            <span><em>Status</em>${esc(snap.status)}</span>
            <span><em>Lat.</em>${esc(snap.latency)}</span>
            <span><em>TPS</em>${snap.tps ? `${esc(snap.tps)}t/s` : '—'}</span>
          </div>`
        : ''
    }
    <button class="details-toggle" type="button" aria-expanded="false">Details <span class="chev" aria-hidden="true">▾</span></button>
    <div class="model-details" hidden>
      ${detailsRows}
      <div class="detail-row"><span>Model</span><code>${esc(model.model_name)}</code></div>
    </div>
  </article>`;
}

export function pricingPage(models, info) {
  const p = pages.pricing;
  const vendors = [...new Set(models.map((m) => m.vendor).filter(Boolean))].sort();
  const live = info._source === 'live';

  return `
  <section class="page-hero">
    <div class="container">
      <h1 class="page-title" data-reveal>${esc(p.title)}</h1>
      <p class="page-sub" data-reveal data-reveal-delay="1">${esc(p.description)}</p>
      <div class="data-source ${live ? 'is-live' : ''}" data-reveal data-reveal-delay="2">
        <span class="pulse-dot"></span>
        ${
          live
            ? `Live data · refreshed ${info._fetchedAt ? esc(info._fetchedAt) : 'just now'}`
            : 'Snapshot data · upstream API unreachable right now (bundled fallback)'
        }
      </div>
    </div>
  </section>

  <section class="section section-flush">
    <div class="container">
      <div class="pricing-toolbar" data-reveal>
        <div class="filter-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <input id="modelSearch" type="search" placeholder="Filter ${models.length} models…" aria-label="Filter models">
        </div>
        <select id="vendorFilter" aria-label="Filter by vendor">
          <option value="">All vendors</option>
          ${vendors.map((v) => `<option value="${esc(v.toLowerCase())}">${esc(v)}</option>`).join('')}
        </select>
        <select id="billingFilter" aria-label="Filter by billing type">
          <option value="">All billing types</option>
          <option value="token">Token-based</option>
          <option value="request">Per Request</option>
        </select>
        <div class="unit-toggle" role="group" aria-label="Price unit">
          <button class="unit-btn is-active" data-unit="1M" type="button">/1M</button>
          <button class="unit-btn" data-unit="1K" type="button">/1K</button>
        </div>
        <span class="model-count"><strong id="visibleCount">${models.length}</strong> models</span>
      </div>

      <div class="model-grid" id="modelGrid">
        ${models.map((m) => modelCard(m, '1M')).join('')}
      </div>

      <nav class="pagination" id="pagination" aria-label="Pagination"></nav>
      <p class="pricing-footnote">Prices shown for the <strong>default</strong> group. Group multipliers: ${esc(
        Object.entries(info.group_ratio || {})
          .map(([g, r]) => `${g} ×${r}`)
          .join(' · ') || 'n/a'
      )}. ${models.length} models · pricing version ${esc((info.pricing_version || '—').slice(0, 16))}.</p>
    </div>
  </section>
  <script src="/js/pricing.js" defer></script>`;
}
