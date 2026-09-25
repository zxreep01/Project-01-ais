/* ============================================================
   Scroll animations & page micro-interactions
   - IntersectionObserver reveals (fade/slide/zoom, staggered)
   - Count-up stats (data-count legacy + reference count-up)
   - Scroll progress bar + sticky-nav state + sticky-CTA ring
   - Carousel (reference .carousel-track)
   - Code tabs (reference .code-window)
   - Bento/ carousel card spotlight
   Respects prefers-reduced-motion.
   ============================================================ */
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- reveal on scroll ---------- */
  const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
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

  /* ---------- count-up stats: legacy data-count ---------- */
  const parseTarget = (raw) => {
    const m = /^([\d.,]+)(.*)$/.exec(String(raw).trim());
    if (!m) return null;
    return { num: parseFloat(m[1].replace(/,/g, '')), suffix: m[2] || '', decimals: (m[1].split('.')[1] || '').length };
  };
  const countUpsLegacy = Array.from(document.querySelectorAll('[data-count]'));
  if (countUpsLegacy.length) {
    const animateLegacy = (el) => {
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
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { animateLegacy(e.target); cio.unobserve(e.target); } }),
        { threshold: 0.5 }
      );
      countUpsLegacy.forEach((el) => cio.observe(el));
    } else {
      countUpsLegacy.forEach((el) => el.classList.add('done'));
    }
  }

  /* ---------- count-up stats: reference .count-up (data-target / data-suffix / data-decimals) ---------- */
  (function () {
    function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
    function animateCount(el) {
      var target = parseFloat(el.dataset.target || '0');
      var decimals = parseInt(el.dataset.decimals || '0', 10);
      var suffix = el.dataset.suffix || '';
      var duration = 1400;
      var start = null;
      function step(timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = easeOutExpo(progress);
        var value = eased * target;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(step);
    }
    var counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;
    if ('IntersectionObserver' in window && !prefersReduced) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { animateCount(entry.target); observer.unobserve(entry.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { observer.observe(el); });
    } else {
      counters.forEach(animateCount);
    }
  })();

  /* ---------- progress bar + nav state + sticky CTA (reference: hide near footer) ---------- */
  const bar = document.getElementById('progressBar');
  const nav = document.getElementById('siteNav');
  const stickyCta = document.getElementById('stickyCta');
  const ctaRingBar = document.getElementById('ctaRingBar');
  const footer = document.querySelector('footer');
  const heroSection = document.querySelector('.hero-section') || document.querySelector('main section');
  const RING_LEN = 100.53;
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar) bar.style.width = `${progress * 100}%`;
      if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 12);
      if (stickyCta) {
        let pastHero = false;
        if (heroSection) pastHero = heroSection.getBoundingClientRect().bottom < 0;
        else pastHero = window.scrollY > window.innerHeight * 0.75;
        let nearFooter = false;
        if (footer) {
          const fRect = footer.getBoundingClientRect();
          nearFooter = fRect.top < window.innerHeight;
        }
        const visible = pastHero && !nearFooter;
        // fallback for pages without hero (pricing/docs) — keep old threshold
        const fallbackVisible = !heroSection && window.scrollY > window.innerHeight * 0.75 && !nearFooter;
        stickyCta.classList.toggle('is-visible', heroSection ? visible : fallbackVisible);
      }
      if (ctaRingBar) ctaRingBar.style.strokeDashoffset = String(RING_LEN * (1 - progress));
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  const toggle = document.getElementById('navToggle');
  const setNavOpen = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => setNavOpen(!nav.classList.contains('nav-open')));
    const panel = document.getElementById('navMobile');
    if (panel) {
      panel.addEventListener('click', (e) => {
        if (e.target.closest('a')) setNavOpen(false);
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setNavOpen(false);
    });
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onBreakpoint = () => { if (desktop.matches) setNavOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onBreakpoint);
    else if (desktop.addListener) desktop.addListener(onBreakpoint);
  }

  /* ---------- carousel: center-focus blur/zoom + dots + autoplay (reference) ---------- */
  (function () {
    if (prefersReduced) return;
    document.querySelectorAll('.carousel-track').forEach(function (track) {
      var cards = Array.prototype.slice.call(track.querySelectorAll('.carousel-card'));
      if (!cards.length) return;
      var dotsEl = document.querySelector('[data-carousel-dots="' + track.id + '"]');
      var dotButtons = [];
      if (dotsEl) {
        cards.forEach(function (card, i) {
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
          dot.addEventListener('click', function () {
            stopAutoplay();
            centerCard(i, true);
            scheduleAutoplayResume();
          });
          dotsEl.appendChild(dot);
          dotButtons.push(dot);
        });
      }
      var activeIndex = 0;
      function updateFocus() {
        var trackRect = track.getBoundingClientRect();
        var trackCenter = trackRect.left + trackRect.width / 2;
        var closestIndex = 0;
        var closestDist = Infinity;
        cards.forEach(function (card, i) {
          var r = card.getBoundingClientRect();
          var cardCenter = r.left + r.width / 2;
          var dist = Math.abs(cardCenter - trackCenter);
          if (dist < closestDist) { closestDist = dist; closestIndex = i; }
        });
        if (closestIndex !== activeIndex || !cards[closestIndex].classList.contains('is-focused')) {
          cards.forEach(function (card, i) { card.classList.toggle('is-focused', i === closestIndex); });
          dotButtons.forEach(function (b, i) { b.classList.toggle('is-active', i === closestIndex); });
          activeIndex = closestIndex;
        }
      }
      function centerCard(index, smooth) {
        index = Math.max(0, Math.min(cards.length - 1, index));
        var card = cards[index];
        var targetLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
        track.scrollTo({ left: targetLeft, behavior: smooth === false ? 'auto' : 'smooth' });
      }
      var ticking2 = false;
      track.addEventListener('scroll', function () {
        if (!ticking2) {
          window.requestAnimationFrame(function () { updateFocus(); ticking2 = false; });
          ticking2 = true;
        }
      }, { passive: true });
      window.addEventListener('resize', updateFocus);
      updateFocus();
      document.querySelectorAll('[data-carousel-prev="' + track.id + '"]').forEach(function (btn) {
        btn.addEventListener('click', function () { stopAutoplay(); centerCard(activeIndex - 1); scheduleAutoplayResume(); });
      });
      document.querySelectorAll('[data-carousel-next="' + track.id + '"]').forEach(function (btn) {
        btn.addEventListener('click', function () { stopAutoplay(); centerCard(activeIndex + 1); scheduleAutoplayResume(); });
      });
      var autoplayDelay = parseInt(track.getAttribute('data-autoplay') || '0', 10);
      var autoplayTimer = null;
      var resumeTimer = null;
      function startAutoplay() {
        if (!autoplayDelay || prefersReduced) return;
        stopAutoplay();
        autoplayTimer = setInterval(function () {
          var next = (activeIndex + 1) % cards.length;
          centerCard(next);
        }, autoplayDelay);
      }
      function stopAutoplay() {
        if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
        if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
      }
      function scheduleAutoplayResume() {
        if (resumeTimer) clearTimeout(resumeTimer);
        resumeTimer = setTimeout(startAutoplay, 3500);
      }
      track.addEventListener('pointerenter', stopAutoplay);
      track.addEventListener('pointerleave', startAutoplay);
      track.addEventListener('touchstart', stopAutoplay, { passive: true });
      track.addEventListener('touchend', scheduleAutoplayResume, { passive: true });
      startAutoplay();
    });
  })();

  /* ---------- code window tabs ---------- */
  (function () {
    var tabs = document.querySelectorAll('.code-tab');
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var key = tab.getAttribute('data-code-tab');
        document.querySelectorAll('.code-tab').forEach(function (t) { t.classList.toggle('is-active', t === tab); });
        document.querySelectorAll('.code-pane').forEach(function (pane) { pane.classList.toggle('is-active', pane.getAttribute('data-code-pane') === key); });
      });
    });
  })();

  /* ---------- bento/card spotlight ---------- */
  if (!prefersReduced) {
    document.querySelectorAll('.bento-card, .carousel-card, .glass, .glass-strong').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }
})();
