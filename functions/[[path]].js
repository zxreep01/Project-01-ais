// Cloudflare Pages catch-all Function: routes every non-static request
// through the same Hono app used by the Node.js server.
import { app } from '../src/app.js';

export const onRequest = (context) => app.fetch(context.request, context.env, context);
