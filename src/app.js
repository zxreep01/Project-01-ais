import { Hono } from 'hono';
import { layout } from './views/layout.js';
import { homePage } from './views/home.js';
import { pricingPage } from './views/pricing.js';
import { docsPage } from './views/docs.js';
import { aboutPage } from './views/about.js';
import { signInPage, signUpPage, forgotPasswordPage } from './views/auth.js';
import { legalPage, notFoundPage } from './views/legal.js';
import { getPricing, enrichModels } from './lib/pricing.js';
import { pages, site } from './lib/content.js';

export const app = new Hono();

const html = (c, body, opts = {}) => {
  c.header('Content-Type', 'text/html; charset=utf-8');
  if (opts.cache) c.header('Cache-Control', opts.cache);
  return c.body(body);
};

/* ---------------- Pages ---------------- */

app.get('/', (c) =>
  html(
    c,
    layout({
      title: 'AI Subscription — Unified API Gateway for AI Models',
      description: pages.home.hero.subtitle,
      active: '/',
      content: homePage(),
    }),
    { cache: 'public, max-age=60, s-maxage=300' }
  )
);

app.get('/pricing', async (c) => {
  const data = await getPricing();
  const models = enrichModels(data);
  return html(
    c,
    layout({
      title: 'Pricing — AI Subscription',
      description: pages.pricing.description,
      active: '/pricing',
      content: pricingPage(models, { ...data, _endpoint: `${site.apiBaseUrl}/api/pricing` }),
    }),
    { cache: 'public, max-age=30, s-maxage=120' }
  );
});

app.get('/docs', (c) =>
  html(
    c,
    layout({
      title: 'Docs — AI Subscription API Reference',
      description: pages.docs.subtitle,
      active: '/docs',
      content: docsPage(),
    }),
    { cache: 'public, max-age=60, s-maxage=300' }
  )
);

app.get('/about', (c) =>
  html(
    c,
    layout({
      title: 'About — AI Subscription',
      description: pages.about.intro,
      active: '/about',
      content: aboutPage(),
    }),
    { cache: 'public, max-age=60, s-maxage=300' }
  )
);

app.get('/sign-in', (c) =>
  html(c, layout({ title: 'Sign in — AI Subscription', description: 'Sign in to AI Subscription.', active: '/sign-in', bodyClass: 'page-auth', content: signInPage() }), {
    cache: 'no-store',
  })
);

app.get('/sign-up', (c) =>
  html(c, layout({ title: 'Sign up — AI Subscription', description: 'Create an AI Subscription account.', active: '/sign-up', bodyClass: 'page-auth', content: signUpPage() }), {
    cache: 'no-store',
  })
);

app.get('/forgot-password', (c) =>
  html(
    c,
    layout({ title: 'Forgot password — AI Subscription', description: 'Reset your AI Subscription password.', active: '', bodyClass: 'page-auth', content: forgotPasswordPage() }),
    { cache: 'no-store' }
  )
);

app.get('/user-agreement', (c) =>
  html(
    c,
    layout({ title: 'User Agreement — AI Subscription', description: pages.userAgreement.intro, active: '', content: legalPage(pages.userAgreement) }),
    { cache: 'public, max-age=300' }
  )
);

app.get('/privacy-policy', (c) =>
  html(
    c,
    layout({ title: 'Privacy Policy — AI Subscription', description: pages.privacyPolicy.intro, active: '', content: legalPage(pages.privacyPolicy) }),
    { cache: 'public, max-age=300' }
  )
);

/* ---------------- API ---------------- */

app.get('/api/pricing', async (c) => {
  const data = await getPricing();
  c.header('Cache-Control', 'public, max-age=60, s-maxage=300');
  c.header('Access-Control-Allow-Origin', '*');
  return c.json(data);
});

app.get('/healthz', (c) => c.json({ ok: true, service: 'ai-subscription', time: new Date().toISOString() }));

/* ---------------- 404 ---------------- */

app.notFound((c) => {
  if (c.req.path.startsWith('/api/')) return c.json({ error: 'not found' }, 404);
  c.status(404);
  return html(c, layout({ title: '404 — AI Subscription', description: 'Page not found.', active: '', content: notFoundPage() }), { cache: 'no-store' });
});

export default app;
