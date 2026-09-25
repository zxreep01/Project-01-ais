import content from '../../data/content.json' with { type: 'json' };
import statsSnapshot from '../../data/stats-snapshot.json' with { type: 'json' };

export const site = content.site;
export const pages = content.pages;
export const nav = content.nav;
export const stats = statsSnapshot;

export default content;
