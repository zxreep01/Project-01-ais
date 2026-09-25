/* ============================================================
   Scroll animations & page micro-interactions
   - IntersectionObserver reveals (fade/slide/zoom, staggered)
   - Count-up stats
   - Scroll progress bar + sticky-nav state
   - Features carousel (native swipe + snap, arrows, dots, keys)
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

  // `.is-revealing` carries the entrance transition only for its duration, so
  // afterwards the component's own transitions (hover lifts…) apply again.
  const reveal = (el) => {
    el.classList.add('in-view', 'is-revealing');
    const delay = Number(el.style.getPropertyValue('--reveal-delay')) || 0;
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      el.classList.remove('is-revealing');
    };
    el.addEventListener('transitionend', function onEnd(e) {
      if (e.target !== el || e.propertyName !== 'opacity') return;
      el.removeEventListener('transitionend', onEnd);
      done();
    });
    setTimeout(done, 700 + delay * 70 + 200); // fallback if transitionend never fires
  };

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
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
    // Values like "24/7" aren't quantities: tweening the leading digits
    // renders nonsense fractions ("3/7", "22/7") mid-animation. Only count
    // plain numbers with a unit-style suffix ("42+", "99.9%", "142ms").
    if (/[\d/]/.test(m[2])) return null;
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

  /* ---------- progress bar + nav state + sticky CTA ---------- */
  const bar = document.getElementById('progressBar');
  const nav = document.getElementById('siteNav');
  const stickyCta = document.getElementById('stickyCta');
  const ctaRingBar = document.getElementById('ctaRingBar');
  const RING_LEN = 100.53; // 2πr for r=16, matches stroke-dasharray in CSS
  let ticking = false;
  let footerInView = false; // maintained by the footer observer below

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar) bar.style.width = `${progress * 100}%`;
      if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 12);
      // reveal the mini-CTA once the visitor is past the fold
      if (stickyCta) stickyCta.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.75 && !footerInView);
      if (ctaRingBar) ctaRingBar.style.strokeDashoffset = String(RING_LEN * (1 - progress));
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  // Park the floating CTA while the footer is on screen: it sits bottom-right,
  // exactly where "Data source: …" lives, and covered that link at 1024–1366px.
  const footer = document.querySelector('.footer');
  if (stickyCta && footer && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      footerInView = entries[0].isIntersecting;
      onScroll();
    }).observe(footer);
  }

  /* ---------- mobile nav ---------- */
  const toggle = document.getElementById('navToggle');
  const setNavOpen = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => setNavOpen(!nav.classList.contains('nav-open')));

    // close the panel after navigating, on Escape, or when growing to desktop
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
    const onBreakpoint = () => {
      if (desktop.matches) setNavOpen(false);
    };
    if (desktop.addEventListener) desktop.addEventListener('change', onBreakpoint);
    else if (desktop.addListener) desktop.addListener(onBreakpoint);
  }

  /* ---------- features carousel (home) ---------- */
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const track = root.querySelector('.carousel-track');
    const slides = track ? Array.from(track.querySelectorAll('.feature-card')) : [];
    if (!slides.length) return;
    const prevBtn = root.querySelector('[data-carousel-prev]');
    const nextBtn = root.querySelector('[data-carousel-next]');
    const dots = Array.from(root.querySelectorAll('[data-carousel-dot]'));
    let stops = [0]; // scrollLeft of each resting position
    let perView = 1; // cards fully in view at a time (1 / 2 / 3 by breakpoint)
    let active = -1; // current stop = index of the first card in view

    // Layout offsets (relative to the track, its offsetParent) ignore both
    // scrolling and the dimming transforms. Card k rests flush with the
    // content edge; the last few share the end stop, so there are
    // `slides.length - perView + 1` stops and as many visible dots.
    const measure = () => {
      const origin = slides[0].offsetLeft;
      const contentRight = track.clientWidth - origin;
      perView = Math.max(1, slides.filter((s) => s.offsetLeft + s.offsetWidth <= contentRight + 1).length);
      const max = track.scrollWidth - track.clientWidth;
      stops = slides.slice(0, slides.length - perView + 1).map((s) => Math.min(s.offsetLeft - origin, max));
      dots.forEach((d, k) => {
        d.hidden = k >= stops.length;
      });
      active = -1; // repaint the state on the next sync
    };

    const setActive = (i) => {
      if (i === active) return;
      active = i;
      slides.forEach((s, k) => s.classList.toggle('is-active', k >= i && k < i + perView));
      dots.forEach((d, k) => {
        d.classList.toggle('is-active', k === i);
        if (k === i) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
      if (prevBtn) prevBtn.disabled = i === 0;
      if (nextBtn) nextBtn.disabled = i === stops.length - 1;
    };

    const nearest = () => {
      const x = track.scrollLeft;
      let best = 0;
      stops.forEach((stop, k) => {
        if (Math.abs(stop - x) < Math.abs(stops[best] - x)) best = k;
      });
      return best;
    };

    // Scroll the track only — scrollIntoView would drag the page along too.
    const goTo = (i) => {
      track.scrollTo({
        left: stops[Math.max(0, Math.min(stops.length - 1, i))],
        behavior: prefersReduced ? 'auto' : 'smooth',
      });
    };

    let frame = 0;
    let stale = false;
    const sync = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (stale) {
          stale = false;
          measure();
        }
        setActive(nearest());
      });
    };
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener(
      'resize',
      () => {
        stale = true;
        sync();
      },
      { passive: true }
    );

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(active - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(active + 1));
    dots.forEach((d, k) => d.addEventListener('click', () => goTo(k)));

    // a click on a dimmed card scrolls just far enough to bring it into view
    track.addEventListener('click', (e) => {
      const k = slides.indexOf(e.target.closest('.feature-card'));
      if (k < 0) return;
      if (k < active) goTo(k);
      else if (k >= active + perView) goTo(k - perView + 1);
    });

    // ← → move one card, Home / End jump to either end, while the track has focus
    track.addEventListener('keydown', (e) => {
      const to = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: stops.length - 1 }[e.key];
      if (to === undefined || e.altKey || e.ctrlKey || e.metaKey) return;
      e.preventDefault();
      goTo(to);
    });

    root.querySelectorAll('[data-carousel-controls]').forEach((el) => {
      el.hidden = false;
    });
    root.classList.add('is-ready');
    measure();
    setActive(nearest());
  });

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
