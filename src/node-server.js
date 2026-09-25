import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { app } from './app.js';

// Static assets (css/js/favicon) — only needed on Node; Cloudflare Pages
// serves the public/ directory natively before hitting functions.
app.use('/*', serveStatic({ root: './public' }));

const port = Number(process.env.PORT || 3000);
serve({ fetch: app.fetch, port, hostname: '0.0.0.0' }, (info) => {
  console.log(`AI Subscription gateway listening on http://${info.address}:${info.port}`);
});
