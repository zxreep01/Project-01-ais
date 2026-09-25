/* Pricing page interactivity: search, vendor/billing filters,
   /1M↔/1K unit toggle, details expanders, client-side pagination. */
(() => {
  const grid = document.getElementById('modelGrid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.model-card'));
  const search = document.getElementById('modelSearch');
  const vendorSel = document.getElementById('vendorFilter');
  const billingSel = document.getElementById('billingFilter');
  const unitBtns = Array.from(document.querySelectorAll('.unit-btn'));
  const countEl = document.getElementById('visibleCount');
  const pagination = document.getElementById('pagination');
  const PER_PAGE = 21;

  let unit = '1M';
  let page = 1;
  let filtered = cards.slice();

  /* ---------- price re-render for unit toggle ---------- */
  const usd = (n) => {
    if (n === null || n === undefined) return '—';
    if (n === 0) return '$0';
    let s = n < 0.001 ? n.toPrecision(3) : n.toFixed(n < 1 ? 6 : 4);
    s = s.replace(/0+$/, '').replace(/\.$/, '');
    return `$${s}`;
  };

  function renderPrices(card) {
    const box = card.querySelector('.model-pricing');
    if (!box) return;
    const data = JSON.parse(card.dataset.price || '{}');
    const u = unit;
    const div = u === '1K' ? 1000 : 1;
    if (data.t === 'request') {
      box.innerHTML = `<span class="price-badge price-badge-request">Per Request</span>
        <div class="price-line price-single">${usd(data.p)} <small>/ request</small></div>`;
      return;
    }
    const rows = [
      ['Input', data.i],
      ['Output', data.o],
      ['Cached', data.c],
      ['Cache write', data.w],
    ].filter(([, v]) => v !== null && v !== undefined);
    box.innerHTML =
      (data.d ? '<span class="price-badge price-badge-dynamic">Dynamic Pricing</span>' : '<span class="price-badge">Token-based</span>') +
      rows.map(([l, v]) => `<div class="price-line"><span>${l}</span><strong>${usd(v / div)} <small>/ ${u}</small></strong></div>`).join('');
  }

  /* ---------- filtering ---------- */
  function applyFilters() {
    const q = (search?.value || '').trim().toLowerCase();
    const v = vendorSel?.value || '';
    const b = billingSel?.value || '';
    filtered = cards.filter((c) => {
      if (q && !c.dataset.name.includes(q)) return false;
      if (v && c.dataset.vendor !== v) return false;
      if (b && c.dataset.billing !== b) return false;
      return true;
    });
    page = 1;
    renderPage();
  }

  function renderPage() {
    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    page = Math.min(page, totalPages);
    const start = (page - 1) * PER_PAGE;
    const visible = new Set(filtered.slice(start, start + PER_PAGE));
    cards.forEach((c) => c.classList.toggle('is-hidden', !visible.has(c)));
    if (countEl) countEl.textContent = filtered.length;
    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (!pagination) return;
    if (totalPages <= 1) { pagination.innerHTML = ''; return; }
    const btn = (label, target, opts = {}) =>
      `<button type="button" class="page-btn${opts.active ? ' is-active' : ''}" data-page="${target}" ${opts.disabled ? 'disabled' : ''} aria-label="${label}">${opts.text ?? label}</button>`;
    let html = btn('Previous page', page - 1, { disabled: page === 1, text: '‹' });
    for (let i = 1; i <= totalPages; i++) html += btn(`Page ${i}`, i, { active: i === page, text: i });
    html += btn('Next page', page + 1, { disabled: page === totalPages, text: '›' });
    pagination.innerHTML = html;
  }

  pagination?.addEventListener('click', (e) => {
    const b = e.target.closest('[data-page]');
    if (!b || b.disabled) return;
    page = Number(b.dataset.page);
    renderPage();
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  search?.addEventListener('input', applyFilters);
  vendorSel?.addEventListener('change', applyFilters);
  billingSel?.addEventListener('change', applyFilters);

  unitBtns.forEach((b) =>
    b.addEventListener('click', () => {
      unitBtns.forEach((x) => x.classList.toggle('is-active', x === b));
      unit = b.dataset.unit;
      cards.forEach(renderPrices);
    })
  );

  /* ---------- details expanders ---------- */
  grid.addEventListener('click', (e) => {
    const toggle = e.target.closest('.details-toggle');
    if (!toggle) return;
    const details = toggle.parentElement.querySelector('.model-details');
    const open = details.hidden;
    details.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  });

  renderPage();
})();
