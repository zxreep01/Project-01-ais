import { esc } from '../lib/utils.js';
import { pages } from '../lib/content.js';

export function homePage() {
  // Reference-faithful landing sections — structure/classes copied verbatim from saas-landing (5).html
  // Branding swapped NewAPI → AI Subscription where appropriate, but layout is 1:1.

  const hero = `
  <section class="hero-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 lg:pt-24 lg:pb-12">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative">
      <div class="lg:col-span-6 relative">
        <div class="invert-oval" aria-hidden="true"></div>
        <div class="inline-flex items-center gap-2 glass-pill rounded-full px-3 py-1 text-xs font-semibold text-black" data-reveal>
          <span class="h-1.5 w-1.5 rounded-full bg-black"></span>
          Version 2.4 is live
        </div>
        <h1 class="font-display font-bold text-4xl sm:text-5xl leading-[1.08] tracking-tight mt-5 max-w-lg text-black" data-reveal data-reveal-delay="1">
          One gateway for every AI model you use
        </h1>
        <p class="mt-5 text-base sm:text-[17px] leading-relaxed text-black/65 max-w-md" data-reveal data-reveal-delay="2">
          Connect OpenAI, Claude, Gemini, DeepSeek and your own models through a single API endpoint. Automatic failover and token-level billing, built in.
        </p>
        <div class="mt-8 flex flex-wrap items-center gap-3" data-reveal data-reveal-delay="3">
          <a href="/sign-up" class="btn-liquid inline-flex items-center gap-2 rounded-xl text-sm font-semibold px-5 py-3">
            Deploy your gateway
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12.293 3.293a1 1 0 011.414 0l7 7a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414L17.586 12H3a1 1 0 110-2h14.586l-5.293-5.293a1 1 0 010-1.414z"/></svg>
          </a>
          <a href="#how" class="glass inline-flex items-center gap-2 rounded-xl text-sm font-semibold px-5 py-3 text-black hover:bg-white/60 transition-colors">
            See how it works
          </a>
        </div>
        <div id="hero-stats" class="mt-10 grid grid-cols-3 divide-x divide-black/10 border-t border-black/10 pt-6" data-reveal>
          <div class="min-w-0 pr-3 sm:pr-6">
            <p class="font-display font-bold text-lg sm:text-2xl text-black tabular-nums whitespace-nowrap">
              <span class="count-up" data-target="100" data-suffix="+">0</span>
            </p>
            <p class="text-[11px] sm:text-xs text-black/55 mt-0.5 leading-snug">Models supported</p>
          </div>
          <div class="min-w-0 px-3 sm:px-6">
            <p class="font-display font-bold text-lg sm:text-2xl text-black tabular-nums whitespace-nowrap">
              <span class="count-up" data-target="99.99" data-decimals="2" data-suffix="%">0</span>
            </p>
            <p class="text-[11px] sm:text-xs text-black/55 mt-0.5 leading-snug">Uptime SLA</p>
          </div>
          <div class="min-w-0 pl-3 sm:pl-6">
            <p class="font-display font-bold text-lg sm:text-2xl text-black tabular-nums whitespace-nowrap">
              &lt;<span class="count-up" data-target="2" data-suffix=" min">0</span>
            </p>
            <p class="text-[11px] sm:text-xs text-black/55 mt-0.5 leading-snug">To first request</p>
          </div>
        </div>
      </div>
      <div class="lg:col-span-6 relative" data-reveal="zoom">
        <div class="ph glass-strong rounded-2xl aspect-[4/3] w-full">
          <svg class="art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
            <rect x="24" y="24" width="352" height="252" rx="14" fill="none" stroke="black" stroke-opacity="0.15" stroke-width="2"/>
            <rect x="24" y="24" width="352" height="34" rx="14" fill="black" fill-opacity="0.06"/>
            <circle cx="42" cy="41" r="4" fill="black" fill-opacity="0.25"/>
            <circle cx="56" cy="41" r="4" fill="black" fill-opacity="0.25"/>
            <circle cx="70" cy="41" r="4" fill="black" fill-opacity="0.25"/>
            <rect x="24" y="58" width="70" height="218" fill="black" fill-opacity="0.04"/>
            <rect x="38" y="80" width="42" height="8" rx="4" fill="black" fill-opacity="0.35"/>
            <rect x="38" y="100" width="30" height="6" rx="3" fill="black" fill-opacity="0.18"/>
            <rect x="38" y="116" width="34" height="6" rx="3" fill="black" fill-opacity="0.18"/>
            <rect x="38" y="132" width="26" height="6" rx="3" fill="black" fill-opacity="0.18"/>
            <polyline points="110,220 150,190 185,205 220,150 255,170 290,110 325,130 356,90" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.85"/>
            <circle cx="356" cy="90" r="5" fill="black"/>
            <rect x="110" y="235" width="70" height="28" rx="8" fill="black" fill-opacity="0.06"/>
            <rect x="190" y="235" width="70" height="28" rx="8" fill="black" fill-opacity="0.06"/>
            <rect x="270" y="235" width="86" height="28" rx="8" fill="black" fill-opacity="0.06"/>
          </svg>
        </div>
        <div class="hidden sm:flex absolute -bottom-6 -left-6 items-center gap-3 glass-strong rounded-xl px-4 py-3 w-56">
          <span class="h-8 w-8 rounded-md bg-black flex items-center justify-center text-white font-display font-bold text-xs">P50</span>
          <div>
            <p class="text-xs font-semibold text-black">42ms overhead</p>
            <p class="text-[11px] text-black/55">across 100+ routes</p>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  const marquee = `
  <section class="marquee-bleed py-6 border-y border-black/10">
    <p class="text-xs font-semibold text-black/55 px-6 mb-4 max-w-6xl mx-auto">Route requests to</p>
    <div class="marquee">
      <div class="marquee-track">
        <span class="logo-chip"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="6"/></svg></span> OpenAI</span>
        <span class="logo-chip"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white"><rect x="8" y="8" width="8" height="8" transform="rotate(45 12 12)"/></svg></span> Claude</span>
        <span class="logo-chip"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white"><polygon points="12,6 18,17 6,17"/></svg></span> Gemini</span>
        <span class="logo-chip"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white"><polygon points="12,5 18,8.5 18,15.5 12,19 6,15.5 6,8.5"/></svg></span> DeepSeek</span>
        <span class="logo-chip"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white" fill-rule="evenodd"><path d="M12 5a7 7 0 100 14 7 7 0 000-14zm0 3.4a3.6 3.6 0 110 7.2 3.6 3.6 0 010-7.2z"/></svg></span> Mistral</span>
        <span class="logo-chip"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white"><rect x="6.5" y="6.5" width="11" height="11" rx="3"/></svg></span> Llama</span>
        <span class="logo-chip"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white"><path d="M10.5 5h3v5.5H19v3h-5.5V19h-3v-5.5H5v-3h5.5z"/></svg></span> Grok</span>
        <span class="logo-chip"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white"><path d="M12 5a7 7 0 000 14V5z"/></svg></span> Qwen</span>
        <span class="logo-chip" aria-hidden="true"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="6"/></svg></span> OpenAI</span>
        <span class="logo-chip" aria-hidden="true"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white"><rect x="8" y="8" width="8" height="8" transform="rotate(45 12 12)"/></svg></span> Claude</span>
        <span class="logo-chip" aria-hidden="true"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white"><polygon points="12,6 18,17 6,17"/></svg></span> Gemini</span>
        <span class="logo-chip" aria-hidden="true"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white"><polygon points="12,5 18,8.5 18,15.5 12,19 6,15.5 6,8.5"/></svg></span> DeepSeek</span>
        <span class="logo-chip" aria-hidden="true"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white" fill-rule="evenodd"><path d="M12 5a7 7 0 100 14 7 7 0 000-14zm0 3.4a3.6 3.6 0 110 7.2 3.6 3.6 0 010-7.2z"/></svg></span> Mistral</span>
        <span class="logo-chip" aria-hidden="true"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white"><rect x="6.5" y="6.5" width="11" height="11" rx="3"/></svg></span> Llama</span>
        <span class="logo-chip" aria-hidden="true"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white"><path d="M10.5 5h3v5.5H19v3h-5.5V19h-3v-5.5H5v-3h5.5z"/></svg></span> Grok</span>
        <span class="logo-chip" aria-hidden="true"><span class="logo-mark"><svg viewBox="0 0 24 24" fill="white"><path d="M12 5a7 7 0 000 14V5z"/></svg></span> Qwen</span>
      </div>
    </div>
  </section>`;

  const features = `
  <section id="features" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
    <div class="flex flex-wrap items-end justify-between gap-6">
      <div class="max-w-lg">
        <h2 class="font-display font-bold text-3xl sm:text-[2.25rem] tracking-tight leading-tight text-black" data-reveal>
          Everything a production gateway needs
        </h2>
        <p class="mt-3 text-black/65 text-[15px] leading-relaxed" data-reveal data-reveal-delay="1">
          Built for teams running real traffic — not a demo wrapper around one API.
        </p>
      </div>
      <div class="hidden sm:flex items-center gap-2">
        <button type="button" data-carousel-prev="features-track" aria-label="Previous" class="glass h-10 w-10 rounded-full flex items-center justify-center text-black hover:bg-white/70 transition-colors">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M15 6l-6 6 6 6V6z"/></svg>
        </button>
        <button type="button" data-carousel-next="features-track" aria-label="Next" class="glass h-10 w-10 rounded-full flex items-center justify-center text-black hover:bg-white/70 transition-colors">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9 6l6 6-6 6V6z"/></svg>
        </button>
      </div>
    </div>
    <div class="mt-10 relative">
      <div id="features-track" class="carousel-track" data-autoplay="4200">
        <div class="carousel-spacer" aria-hidden="true"></div>
        <article class="carousel-card glass rounded-2xl overflow-hidden">
          <div class="ph aspect-[16/10] w-full">
            <svg class="art" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet">
              <circle cx="60" cy="190" r="6" fill="black"/>
              <circle cx="60" cy="190" r="34" fill="none" stroke="black" stroke-opacity="0.28" stroke-width="2"/>
              <circle cx="60" cy="190" r="64" fill="none" stroke="black" stroke-opacity="0.18" stroke-width="2"/>
              <circle cx="60" cy="190" r="96" fill="none" stroke="black" stroke-opacity="0.1" stroke-width="2"/>
              <path d="M60,190 L340,80" stroke="black" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="6 6"/>
              <circle cx="340" cy="80" r="7" fill="black"/>
            </svg>
          </div>
          <div class="p-6">
            <div class="h-10 w-10 rounded-md bg-black text-white flex items-center justify-center">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="white"><polygon points="12,2 5,14 11,14 9,22 19,9 13,9"/></svg>
            </div>
            <h3 class="font-display font-bold text-base mt-5 text-black">Low-latency routing</h3>
            <p class="mt-2 text-sm text-black/60 leading-relaxed">Edge-aware routing keeps median overhead under 50ms, even when fanning out across dozens of upstream providers.</p>
          </div>
        </article>
        <article class="carousel-card glass rounded-2xl overflow-hidden">
          <div class="ph aspect-[16/10] w-full">
            <svg class="art" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet">
              <path d="M10,60 C120,20 280,140 390,80" fill="none" stroke="black" stroke-opacity="0.7" stroke-width="3" stroke-linecap="round"/>
              <path d="M10,120 C120,80 280,200 390,140" fill="none" stroke="black" stroke-opacity="0.42" stroke-width="3" stroke-linecap="round"/>
              <path d="M10,180 C120,140 280,240 390,200" fill="none" stroke="black" stroke-opacity="0.2" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="p-6">
            <div class="h-10 w-10 rounded-md bg-black text-white flex items-center justify-center">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="white"><path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z"/><path d="M12 10l8 4.5-8 4.5-8-4.5L12 10z" opacity="0.5"/></svg>
            </div>
            <h3 class="font-display font-bold text-base mt-5 text-black">Ultra-high concurrency</h3>
            <p class="mt-2 text-sm text-black/60 leading-relaxed">Pooled channels with automatic retry on 429 and 500 errors, and instant failover to the next upstream.</p>
          </div>
        </article>
        <article class="carousel-card glass rounded-2xl overflow-hidden">
          <div class="ph aspect-[16/10] w-full">
            <svg class="art" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet">
              <g fill="black" fill-opacity="0.85">
                <rect x="60" y="170" width="30" height="50"/>
                <rect x="110" y="140" width="30" height="80"/>
                <rect x="160" y="100" width="30" height="120"/>
                <rect x="210" y="60" width="30" height="160"/>
              </g>
              <g stroke="black" stroke-opacity="0.15">
                <line x1="270" y1="70" x2="380" y2="70"/>
                <line x1="270" y1="95" x2="380" y2="95"/>
                <line x1="270" y1="120" x2="380" y2="120"/>
                <line x1="270" y1="145" x2="380" y2="145"/>
              </g>
            </svg>
          </div>
          <div class="p-6">
            <div class="h-10 w-10 rounded-md bg-black text-white flex items-center justify-center">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="white"><rect x="4" y="14" width="4" height="7"/><rect x="10" y="9" width="4" height="12"/><rect x="16" y="4" width="4" height="17"/></svg>
            </div>
            <h3 class="font-display font-bold text-base mt-5 text-black">Real-time usage ledger</h3>
            <p class="mt-2 text-sm text-black/60 leading-relaxed">Token-accurate billing with per-model pricing, custom discounts, and webhooks on every completed request.</p>
          </div>
        </article>
        <article class="carousel-card glass rounded-2xl overflow-hidden">
          <div class="ph aspect-[16/10] w-full">
            <svg class="art" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet">
              <g stroke="black" stroke-opacity="0.3" stroke-width="2">
                <line x1="150" y1="110" x2="240" y2="75"/>
                <line x1="150" y1="110" x2="240" y2="160"/>
                <line x1="240" y1="75" x2="320" y2="115"/>
                <line x1="240" y1="160" x2="320" y2="115"/>
                <line x1="150" y1="110" x2="90" y2="165"/>
              </g>
              <circle cx="150" cy="110" r="22" fill="black" fill-opacity="0.9"/>
              <circle cx="240" cy="75" r="16" fill="black" fill-opacity="0.55"/>
              <circle cx="240" cy="160" r="16" fill="black" fill-opacity="0.55"/>
              <circle cx="320" cy="115" r="14" fill="black" fill-opacity="0.32"/>
              <circle cx="90" cy="165" r="14" fill="black" fill-opacity="0.32"/>
            </svg>
          </div>
          <div class="p-6">
            <div class="h-10 w-10 rounded-md bg-black text-white flex items-center justify-center">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="white"><circle cx="9" cy="8" r="4"/><ellipse cx="9" cy="19" rx="7" ry="4.5"/><circle cx="17" cy="9" r="3" opacity="0.5"/><ellipse cx="17" cy="19.5" rx="5" ry="3.5" opacity="0.5"/></svg>
            </div>
            <h3 class="font-display font-bold text-base mt-5 text-black">Teams and permissions</h3>
            <p class="mt-2 text-sm text-black/60 leading-relaxed">Workspaces with custom roles, isolated developer keys, per-project budgets, and SSO for larger orgs.</p>
          </div>
        </article>
        <article class="carousel-card glass rounded-2xl overflow-hidden">
          <div class="ph aspect-[16/10] w-full">
            <svg class="art" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet">
              <rect x="120" y="55" width="160" height="38" rx="6" fill="black" fill-opacity="0.85"/>
              <circle cx="140" cy="74" r="4.5" fill="white"/>
              <rect x="120" y="103" width="160" height="38" rx="6" fill="black" fill-opacity="0.58"/>
              <circle cx="140" cy="122" r="4.5" fill="white"/>
              <rect x="120" y="151" width="160" height="38" rx="6" fill="black" fill-opacity="0.32"/>
              <circle cx="140" cy="170" r="4.5" fill="white"/>
            </svg>
          </div>
          <div class="p-6">
            <div class="h-10 w-10 rounded-md bg-black text-white flex items-center justify-center">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="white"><rect x="4" y="4" width="16" height="4.5" rx="1.5"/><rect x="4" y="9.5" width="16" height="4.5" rx="1.5" opacity="0.6"/><rect x="4" y="15" width="16" height="4.5" rx="1.5" opacity="0.35"/></svg>
            </div>
            <h3 class="font-display font-bold text-base mt-5 text-black">Self-hostable core</h3>
            <p class="mt-2 text-sm text-black/60 leading-relaxed">Run it on Docker, Kubernetes, or bare metal in minutes, with full control over data and downstream keys.</p>
          </div>
        </article>
        <div class="carousel-spacer" aria-hidden="true"></div>
      </div>
      <div class="carousel-dots mt-5 flex justify-center gap-2" data-carousel-dots="features-track"></div>
    </div>
  </section>`;

  const showcase = `
  <section id="product" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
    <div class="glass-strong rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center" data-reveal="zoom">
      <div class="lg:col-span-5 order-2 lg:order-1">
        <h2 class="font-display font-bold text-3xl tracking-tight leading-tight text-black">
          One console for every request
        </h2>
        <p class="mt-4 text-black/65 text-[15px] leading-relaxed max-w-sm">
          Watch traffic move across models in real time. Track latency at the p50 and p99, catch errors before your users do, and set budgets per key or per team.
        </p>
        <ul class="mt-6 space-y-3 text-sm text-black/75">
          <li class="flex items-start gap-2">
            <svg class="h-4 w-4 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="black"/><path d="M6 10.4l2.6 2.6L14.5 7" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Live latency and error-rate charts
          </li>
          <li class="flex items-start gap-2">
            <svg class="h-4 w-4 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="black"/><path d="M6 10.4l2.6 2.6L14.5 7" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Per-key and per-team spend limits
          </li>
          <li class="flex items-start gap-2">
            <svg class="h-4 w-4 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="black"/><path d="M6 10.4l2.6 2.6L14.5 7" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Exportable logs for every completion
          </li>
        </ul>
      </div>
      <div class="lg:col-span-7 order-1 lg:order-2">
        <div class="ph ph-dark glass-dark rounded-2xl aspect-[16/10] w-full">
          <svg class="art" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet">
            <g stroke="white" stroke-opacity="0.08">
              <line x1="20" y1="50" x2="380" y2="50"/>
              <line x1="20" y1="100" x2="380" y2="100"/>
              <line x1="20" y1="150" x2="380" y2="150"/>
              <line x1="20" y1="200" x2="380" y2="200"/>
            </g>
            <path d="M20,160 C60,120 90,190 130,150 C170,110 200,180 240,140 C280,100 310,170 350,120 L380,140" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <circle cx="130" cy="150" r="4" fill="white"/>
            <circle cx="240" cy="140" r="4" fill="white"/>
            <circle cx="350" cy="120" r="4" fill="white"/>
            <rect x="20" y="215" width="60" height="6" rx="3" fill="white" fill-opacity="0.35"/>
            <rect x="90" y="215" width="40" height="6" rx="3" fill="white" fill-opacity="0.2"/>
            <rect x="140" y="215" width="50" height="6" rx="3" fill="white" fill-opacity="0.2"/>
          </svg>
        </div>
      </div>
    </div>
  </section>`;

  const code = `
  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <div class="lg:col-span-5" data-reveal>
        <h2 class="font-display font-bold text-3xl tracking-tight leading-tight text-black">
          Same code, any model
        </h2>
        <p class="mt-4 text-black/65 text-[15px] leading-relaxed max-w-sm">
          Point your existing OpenAI-compatible client at the gateway URL and swap the <code class="text-black bg-black/5 rounded px-1.5 py-0.5 text-[13px]">model</code> field to route anywhere — no SDK changes, no new client library.
        </p>
        <ul class="mt-6 space-y-3 text-sm text-black/75">
          <li class="flex items-start gap-2">
            <svg class="h-4 w-4 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="black"/><path d="M6 10.4l2.6 2.6L14.5 7" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Drop-in replacement for the OpenAI SDK
          </li>
          <li class="flex items-start gap-2">
            <svg class="h-4 w-4 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="black"/><path d="M6 10.4l2.6 2.6L14.5 7" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Same request/response schema across every model
          </li>
          <li class="flex items-start gap-2">
            <svg class="h-4 w-4 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="black"/><path d="M6 10.4l2.6 2.6L14.5 7" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Streaming, tool calls, and vision all pass through
          </li>
        </ul>
      </div>
      <div class="lg:col-span-7" data-reveal data-reveal-delay="1">
        <div class="code-window">
          <div class="code-window-bar">
            <span class="code-dot"></span>
            <span class="code-dot"></span>
            <span class="code-dot"></span>
            <div class="code-tabs">
              <button type="button" class="code-tab is-active" data-code-tab="curl">cURL</button>
              <button type="button" class="code-tab" data-code-tab="js">JavaScript</button>
              <button type="button" class="code-tab" data-code-tab="python">Python</button>
            </div>
          </div>
          <pre class="code-pane is-active" data-code-pane="curl"><code><span class="tok-com"># One endpoint, any model — just change "model"</span>
<span class="tok-kw">curl</span> https://gateway.newapi.dev/v1/chat/completions \\
  -H <span class="tok-str">"Authorization: Bearer $NEWAPI_KEY"</span> \\
  -H <span class="tok-str">"Content-Type: application/json"</span> \\
  -d <span class="tok-str">'{
    "model": "claude-sonnet-5",
    "messages": [
      { "role": "user", "content": "Summarize this ticket." }
    ],
    "stream": true
  }'</span></code></pre>
          <pre class="code-pane" data-code-pane="js"><code><span class="tok-kw">import</span> OpenAI <span class="tok-kw">from</span> <span class="tok-str">"openai"</span>;

<span class="tok-kw">const</span> client = <span class="tok-kw">new</span> OpenAI({
  baseURL: <span class="tok-str">"https://gateway.newapi.dev/v1"</span>,
  apiKey: process.env.NEWAPI_KEY,
});

<span class="tok-kw">const</span> res = <span class="tok-kw">await</span> client.chat.completions.create({
  model: <span class="tok-str">"gemini-2.5-pro"</span>,
  messages: [{ role: <span class="tok-str">"user"</span>, content: <span class="tok-str">"Summarize this ticket."</span> }],
});

<span class="tok-kw">console</span>.log(res.choices[0].message.content);</code></pre>
          <pre class="code-pane" data-code-pane="python"><code><span class="tok-kw">from</span> openai <span class="tok-kw">import</span> OpenAI

client = OpenAI(
    base_url=<span class="tok-str">"https://gateway.newapi.dev/v1"</span>,
    api_key=os.environ[<span class="tok-str">"NEWAPI_KEY"</span>],
)

res = client.chat.completions.create(
    model=<span class="tok-str">"deepseek-v3"</span>,
    messages=[{<span class="tok-str">"role"</span>: <span class="tok-str">"user"</span>, <span class="tok-str">"content"</span>: <span class="tok-str">"Summarize this ticket."</span>}],
)

<span class="tok-kw">print</span>(res.choices[0].message.content)</code></pre>
        </div>
      </div>
    </div>
  </section>`;

  const how = `
  <section id="how" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
    <div class="max-w-lg" data-reveal>
      <h2 class="font-display font-bold text-3xl tracking-tight leading-tight text-black">Three steps to switch over</h2>
      <p class="mt-3 text-black/65 text-[15px] leading-relaxed">No migration project required — most teams are routing live traffic the same day.</p>
    </div>
    <div class="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="glass rounded-2xl p-7" data-reveal data-reveal-delay="0">
        <div class="flex items-center gap-4">
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white font-display font-bold text-sm">1</span>
          <div class="hidden md:block flex-1 step-line h-px"></div>
        </div>
        <h3 class="font-display font-bold text-base mt-5 text-black">Configure your channels</h3>
        <p class="mt-2 text-sm text-black/60 leading-relaxed">Add your OpenAI, Anthropic, or open-model API keys, then set priority and cost tiers.</p>
      </div>
      <div class="glass rounded-2xl p-7" data-reveal data-reveal-delay="1">
        <div class="flex items-center gap-4">
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white font-display font-bold text-sm">2</span>
          <div class="hidden md:block flex-1 step-line h-px"></div>
        </div>
        <h3 class="font-display font-bold text-base mt-5 text-black">Point to one endpoint</h3>
        <p class="mt-2 text-sm text-black/60 leading-relaxed">Send requests to the unified gateway URL — it translates each one to the right model schema.</p>
      </div>
      <div class="glass rounded-2xl p-7" data-reveal data-reveal-delay="2">
        <div class="flex items-center gap-4">
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white font-display font-bold text-sm">3</span>
        </div>
        <h3 class="font-display font-bold text-base mt-5 text-black">Monitor and scale</h3>
        <p class="mt-2 text-sm text-black/60 leading-relaxed">Watch telemetry, track p50/p99 latency, and adjust budgets as usage grows.</p>
      </div>
    </div>
  </section>`;

  const pricing = `
  <section id="pricing" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
    <div class="max-w-lg mx-auto text-center" data-reveal>
      <h2 class="font-display font-bold text-3xl tracking-tight text-black">Simple, usage-based pricing</h2>
      <p class="mt-3 text-black/65 text-[15px] leading-relaxed">Pay for what you route. No seat fees, cancel anytime. See <a href="/pricing" class="underline decoration-black/20 underline-offset-4 hover:decoration-black/40">detailed model pricing</a> for per-token rates.</p>
    </div>
    <div class="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">
      <div class="glass rounded-2xl p-8 flex flex-col" data-reveal data-reveal-delay="0">
        <h3 class="font-display font-bold text-lg text-black">Starter</h3>
        <p class="text-sm text-black/55 mt-1">For side projects and testing</p>
        <p class="mt-6 font-display font-bold text-3xl text-black">$0<span class="text-base font-medium text-black/55">/mo</span></p>
        <ul class="mt-6 space-y-2.5 text-sm text-black/70 flex-1">
          <li>5 models included</li>
          <li>10K requests / month</li>
          <li>Community support</li>
        </ul>
        <a href="/sign-up" class="mt-8 glass inline-flex justify-center rounded-xl text-sm font-semibold px-4 py-2.5 text-black hover:bg-white/60 transition-colors">Start free</a>
      </div>
      <div class="glass-strong rounded-2xl p-8 flex flex-col relative ring-1 ring-black/10" data-reveal data-reveal-delay="1">
        <span class="absolute -top-3 left-8 rounded-full bg-black text-white text-xs font-bold px-3 py-1">Most popular</span>
        <h3 class="font-display font-bold text-lg text-black">Pro</h3>
        <p class="text-sm text-black/55 mt-1">For production workloads</p>
        <p class="mt-6 font-display font-bold text-3xl text-black">$49<span class="text-base font-medium text-black/55">/mo</span></p>
        <ul class="mt-6 space-y-2.5 text-sm text-black/70 flex-1">
          <li>All 100+ models</li>
          <li>2M requests / month</li>
          <li>Team roles and budgets</li>
          <li>Priority support</li>
        </ul>
        <a href="/sign-up" class="btn-liquid mt-8 inline-flex justify-center rounded-xl text-sm font-semibold px-4 py-2.5">Get started</a>
      </div>
      <div class="glass rounded-2xl p-8 flex flex-col" data-reveal data-reveal-delay="2">
        <h3 class="font-display font-bold text-lg text-black">Enterprise</h3>
        <p class="text-sm text-black/55 mt-1">For self-hosted deployments</p>
        <p class="mt-6 font-display font-bold text-3xl text-black">Custom</p>
        <ul class="mt-6 space-y-2.5 text-sm text-black/70 flex-1">
          <li>Self-hosted core</li>
          <li>Unlimited requests</li>
          <li>SSO and audit logs</li>
          <li>Dedicated support</li>
        </ul>
        <a href="/sign-up" class="mt-8 glass inline-flex justify-center rounded-xl text-sm font-semibold px-4 py-2.5 text-black hover:bg-white/60 transition-colors">Talk to sales</a>
      </div>
    </div>
  </section>`;

  const faq = `
  <section id="faq" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
    <div class="max-w-lg" data-reveal>
      <h2 class="font-display font-bold text-3xl tracking-tight leading-tight text-black">Frequently asked questions</h2>
      <p class="mt-3 text-black/65 text-[15px] leading-relaxed">Can't find what you're looking for? Reach out and we'll get back to you within a day.</p>
    </div>
    <div class="mt-10 max-w-3xl divide-y divide-black/10 glass rounded-2xl overflow-hidden" data-reveal>
      <details class="faq-item" open>
        <summary class="faq-summary">
          How is usage billed?
          <svg class="faq-chevron h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 9l6 6 6-6H6z"/></svg>
        </summary>
        <div class="faq-body">
          Billing is metered by token, matched to each upstream provider's list price with no markup on Starter and Pro. Every request is logged in the usage ledger down to the token, so your invoice always reconciles with what you can see in the console. Enterprise plans can move to flat monthly billing on request.
        </div>
      </details>
      <details class="faq-item">
        <summary class="faq-summary">
          What's the difference between self-hosted and cloud?
          <svg class="faq-chevron h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 9l6 6 6-6H6z"/></svg>
        </summary>
        <div class="faq-body">
          Cloud runs the gateway for you — no infrastructure to manage, upgrades ship automatically. Self-hosted (Enterprise) gives you the same Go core running on your own Docker, Kubernetes, or bare-metal environment, so provider keys and request bodies never leave your network. Both share the same console, routing logic, and API surface.
        </div>
      </details>
      <details class="faq-item">
        <summary class="faq-summary">
          How long is request and usage data retained?
          <svg class="faq-chevron h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 9l6 6 6-6H6z"/></svg>
        </summary>
        <div class="faq-body">
          Usage and billing metadata is kept for 12 months by default. Full request/response bodies are retained for 30 days on Cloud to power debugging and logs export, and can be disabled entirely if you don't want prompt content stored. Self-hosted deployments control retention locally — nothing is sent back to us.
        </div>
      </details>
      <details class="faq-item">
        <summary class="faq-summary">
          Can I set spend limits per key or per team?
          <svg class="faq-chevron h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 9l6 6 6-6H6z"/></svg>
        </summary>
        <div class="faq-body">
          Yes. Pro and Enterprise support hard and soft budget caps at the workspace, team, or individual API-key level, with webhook or email alerts as usage approaches the limit. Requests are rejected once a hard cap is hit, so a runaway script can't blow through your budget.
        </div>
      </details>
      <details class="faq-item">
        <summary class="faq-summary">
          Do I need to change my existing integration code?
          <svg class="faq-chevron h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 9l6 6 6-6H6z"/></svg>
        </summary>
        <div class="faq-body">
          No — the gateway speaks the same schema as the OpenAI API, so most teams just swap the base URL and API key in their existing SDK. Streaming, tool/function calls, and vision inputs are translated automatically for models that use a different native format.
        </div>
      </details>
      <details class="faq-item">
        <summary class="faq-summary">
          What happens if a model provider has an outage?
          <svg class="faq-chevron h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 9l6 6 6-6H6z"/></svg>
        </summary>
        <div class="faq-body">
          You can configure fallback channels per model, so a 429 or 500 from your primary provider automatically retries against a backup — either the same model from a different provider or a comparable alternative you define. Failover typically adds a few hundred milliseconds and is logged as a separate event in your request history.
        </div>
      </details>
    </div>
  </section>`;

  const cta = `
  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
    <div class="glass-dark bg-black rounded-3xl p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center" data-reveal="zoom">
      <div class="lg:col-span-8">
        <h2 class="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-tight max-w-lg text-white">
          Ready to simplify your AI integration?
        </h2>
        <p class="mt-4 text-white/60 text-[15px] leading-relaxed max-w-md">
          Deploy your gateway in under two minutes and start routing to 100+ models through one API.
        </p>
      </div>
      <div class="lg:col-span-4 flex lg:justify-end">
        <a href="/sign-up" class="btn-liquid-invert inline-flex items-center gap-2 rounded-xl text-sm font-semibold px-6 py-3.5">
          Get started free
          <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12.293 3.293a1 1 0 011.414 0l7 7a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414L17.586 12H3a1 1 0 110-2h14.586l-5.293-5.293a1 1 0 010-1.414z"/></svg>
        </a>
      </div>
    </div>
  </section>`;

  return [hero, marquee, features, showcase, code, how, pricing, faq, cta].join('\n');
}
