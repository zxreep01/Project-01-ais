import { esc } from '../lib/utils.js';
import { pages } from '../lib/content.js';

const GITHUB_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.64 1.58.24 2.75.12 3.04.74.8 1.19 1.82 1.19 3.07 0 4.4-2.69 5.36-5.25 5.65.41.35.77 1.04.77 2.1v3.12c0 .3.21.67.8.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>`;

function shell(inner, wide = false) {
  return `
  <section class="auth-wrap">
    <div class="auth-card${wide ? ' auth-card-wide' : ''}" data-reveal>
      <a class="auth-logo" href="/" aria-label="AI Subscription home">
        <img src="https://api.aisubscription.shop/logo.png" alt="AI Subscription logo" width="40" height="40" loading="lazy"
             onerror="this.outerHTML='<span class=&quot;auth-logo-fallback&quot;>AI</span>'">
        <strong>AI Subscription</strong>
      </a>
      ${inner}
    </div>
    <script src="/js/auth.js" defer></script>
  </section>`;
}

const oauthBlock = (divider) => `
  <div class="oauth-divider"><span>${esc(divider)}</span></div>
  <button class="btn btn-oauth" type="button" data-demo-oauth>${GITHUB_ICON} Continue with GitHub</button>`;

export function signInPage() {
  const p = pages.signIn;
  return shell(`
    <h1>${esc(p.title)}</h1>
    <p class="auth-switch">${esc(p.subtitle)} <a href="${esc(p.subtitleLink.href)}">${esc(p.subtitleLink.label)}</a>.</p>
    <form class="auth-form" data-demo-form>
      ${p.fields
        .map(
          (f) => `
      <label class="field">
        <span>${esc(f.label)}</span>
        <input type="${f.type}" name="${esc(f.label.toLowerCase().replace(/\s+/g, '-'))}" required autocomplete="${f.type === 'password' ? 'current-password' : 'username'}">
      </label>`
        )
        .join('')}
      <div class="field-row"><a class="link-sm" href="${esc(p.forgotPassword.href)}">${esc(p.forgotPassword.label)}</a></div>
      <button class="btn btn-primary btn-block" type="submit">${esc(p.submit)}</button>
    </form>
    ${oauthBlock(p.oauth.divider)}
    <p class="auth-consent">${esc(p.consentNote.replace('User Agreement', '<a href="/user-agreement">User Agreement</a>').replace('Privacy Policy', '<a href="/privacy-policy">Privacy Policy</a>'))}</p>`);
}

export function signUpPage() {
  const p = pages.signUp;
  return shell(`
    <h1>${esc(p.title)}</h1>
    <p class="auth-switch">${esc(p.subtitle)} <a href="${esc(p.subtitleLink.href)}">${esc(p.subtitleLink.label)}</a>.</p>
    <form class="auth-form" data-demo-form>
      ${p.fields
        .map(
          (f) => `
      <label class="field">
        <span>${esc(f.label)}</span>
        <input type="${f.type}" name="${esc(f.label.toLowerCase().replace(/\s+/g, '-'))}" required autocomplete="${f.type === 'password' ? 'new-password' : 'username'}">
      </label>`
        )
        .join('')}
      <label class="checkbox">
        <input type="checkbox" required>
        <span>${esc(p.agreementCheckbox).replace('User Agreement', '<a href="/user-agreement">User Agreement</a>').replace('Privacy Policy', '<a href="/privacy-policy">Privacy Policy</a>')}</span>
      </label>
      <button class="btn btn-primary btn-block" type="submit">${esc(p.submit)}</button>
    </form>
    ${oauthBlock(p.oauth.divider)}
    <p class="auth-consent">${esc(p.consentNote).replace('User Agreement', '<a href="/user-agreement">User Agreement</a>').replace('Privacy Policy', '<a href="/privacy-policy">Privacy Policy</a>')}</p>`, true);
}

export function forgotPasswordPage() {
  const p = pages.forgotPassword;
  return shell(`
    <h1>${esc(p.title)}</h1>
    <p class="auth-switch">${esc(p.description)}</p>
    <p class="auth-switch">${esc(p.subtitle)} <a href="${esc(p.subtitleLink.href)}">${esc(p.subtitleLink.label)}</a>.</p>
    <form class="auth-form" data-demo-form>
      <label class="field">
        <span>${esc(p.fields[0].label)}</span>
        <input type="email" name="email" required autocomplete="email">
      </label>
      <button class="btn btn-primary btn-block" type="submit">${esc(p.submit)}</button>
    </form>`);
}
