/* ============================================================
   Scroll animations & page micro-interactions
   - IntersectionObserver reveals (fade/slide/zoom, staggered)
   - Count-up stats
   - Scroll progress bar + sticky-nav state
   - Bento card cursor spotlight
   Respects prefers-reduced-motion.
   ============================================================ */
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- reveal on scroll ---------- */
  const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));

  // Auto-stagger siblings that appear together (same parent, no explicit delay)
  const byParent = new Map();
  revealEls.forEach((el) => {
    if (el.hasAttribute('data-reveal-delay')) return;
    const key = el.parentElement;
    const idx = (byParent.get(key) ?? 0);
    byParent.set(key, idx + 1);
    el.style.setProperty('--reveal-delay', Math.min(idx, 6));
  });
  revealEls.forEach((el) => {
    if (el.hasAttribute('data-reveal-delay')) {
      el.style.setProperty('--reveal-delay', el.getAttribute('data-reveal-delay'));
    }
  });

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- count-up stats ---------- */
  const parseTarget = (raw) => {
    const m = /^([\d.,]+)(.*)$/.exec(String(raw).trim());
    if (!m) return null;
    return { num: parseFloat(m[1].replace(/,/g, '')), suffix: m[2] || '', decimals: (m[1].split('.')[1] || '').length };
  };

  const countUps = Array.from(document.querySelectorAll('[data-count]'));
  if (countUps.length) {
    const animate = (el) => {
      const t = parseTarget(el.dataset.count);
      if (!t) { el.textContent = el.dataset.count; return; }
      if (prefersReduced) { el.textContent = el.dataset.count; return; }
      const dur = 1300;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = t.num * eased;
        el.textContent = val.toFixed(t.decimals) + t.suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = el.dataset.count;
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window && !prefersReduced) {
      const cio = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { animate(e.target); cio.unobserve(e.target); } }),
        { threshold: 0.5 }
      );
      countUps.forEach((el) => cio.observe(el));
    } else {
      countUps.forEach((el) => el.classList.add('done'));
    }
  }

  /* ---------- progress bar + nav state ---------- */
  const bar = document.getElementById('progressBar');
  const nav = document.getElementById('siteNav');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
      if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 12);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  const toggle = document.getElementById('navToggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---------- bento spotlight ---------- */
  if (!prefersReduced) {
    document.querySelectorAll('.bento-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }
})();
