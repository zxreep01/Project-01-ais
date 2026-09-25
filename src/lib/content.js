// Plain ES-module data imports (not `.json` + import attributes): Cloudflare Pages
// compiles Functions with esbuild 0.17.19, which cannot parse `with { type: 'json' }`.
// See data/content.js for details.
import content from '../../data/content.js';
import statsSnapshot from '../../data/stats-snapshot.js';

export const site = content.site;
export const pages = content.pages;
export const nav = content.nav;
export const stats = statsSnapshot;

export default content;
