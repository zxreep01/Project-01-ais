import fallbackPricing from '../../data/models.json' with { type: 'json' };

export const UPSTREAM_API = 'https://api.aisubscription.shop';
const PRICING_ENDPOINT = `${UPSTREAM_API}/api/pricing`;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const FETCH_TIMEOUT_MS = 8000;

/** In-memory TTL cache (per isolate on CF, per process on Node). */
let cache = { value: null, ts: 0 };

/**
 * Fetch the live pricing dataset from the original site's public API.
 * Falls back to the bundled snapshot (data/models.json) when the upstream
 * is unreachable (e.g. sandboxed/offline environments).
 */
export async function getPricing({ forceFresh = false } = {}) {
  const now = Date.now();
  if (!forceFresh && cache.value && now - cache.ts < CACHE_TTL_MS) {
    return cache.value;
  }
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(PRICING_ENDPOINT, {
      signal: ctrl.signal,
      headers: { accept: 'application/json', 'user-agent': 'ai-subscription-gateway/1.0' },
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`upstream responded ${res.status}`);
    const json = await res.json();
    if (!json || !Array.isArray(json.data) || json.data.length === 0) {
      throw new Error('upstream returned an empty dataset');
    }
    cache = { value: { ...json, _source: 'live', _fetchedAt: new Date().toISOString() }, ts: now };
    return cache.value;
  } catch {
    if (cache.value) return cache.value; // serve stale cache before the snapshot
    return { ...fallbackPricing, _source: 'snapshot', _fetchedAt: null };
  }
}

/* ------------------------------------------------------------------ */
/* Price derivation (mirrors the logic the original UI uses)           */
/* ------------------------------------------------------------------ */

/**
 * NewAPI-style pricing semantics:
 *  - quota_type 1            -> per-request: model_price is USD per request
 *  - billing_mode tiered_expr-> coefficients of p/c in billing_expr are USD per 1M tokens
 *  - otherwise               -> input USD/1M = model_ratio * 2; output = input * completion_ratio
 */
export function derivePricing(model) {
  const out = { type: 'token', input: null, output: null, cached: null, cacheCreate: null, perRequest: null, dynamic: false };

  if (model.quota_type === 1) {
    out.type = 'request';
    out.perRequest = model.model_price ?? 0;
    return out;
  }

  if (model.billing_mode === 'tiered_expr' && typeof model.billing_expr === 'string') {
    const p = /p\s*\*\s*([\d.]+)/.exec(model.billing_expr);
    const c = /(?<![a-zA-Z])c\s*\*\s*([\d.]+)/.exec(model.billing_expr);
    const cr = /cr\s*\*\s*([\d.]+)/.exec(model.billing_expr);
    const cc = /(?<![a-zA-Z])cc\s*\*\s*([\d.]+)/.exec(model.billing_expr);
    out.dynamic = true;
    out.input = p ? parseFloat(p[1]) : 0;
    out.output = c ? parseFloat(c[1]) : 0;
    out.cached = cr ? parseFloat(cr[1]) : null;
    out.cacheCreate = cc ? parseFloat(cc[1]) : null;
    return out;
  }

  const input = (model.model_ratio ?? 0) * 2;
  out.input = input;
  out.output = input * (model.completion_ratio ?? 1);
  if (model.cache_ratio !== undefined) out.cached = input * model.cache_ratio;
  if (model.create_cache_ratio !== undefined) out.cacheCreate = input * model.create_cache_ratio;
  return out;
}

/** Vendor id -> display name (built from the vendors list in the API payload). */
export function vendorMap(pricing) {
  const map = new Map();
  for (const v of pricing.vendors || []) map.set(v.id, v.name);
  return map;
}

/** Enrich the raw pricing payload for rendering. */
export function enrichModels(pricing) {
  const vendors = vendorMap(pricing);
  return (pricing.data || []).map((m) => {
    const derived = derivePricing(m);
    const groups = m.enable_groups || [];
    return {
      ...m,
      vendor: m.vendor_id ? vendors.get(m.vendor_id) || 'Unknown' : null,
      derived,
      primaryGroup: groups[0] || 'default',
      extraGroups: Math.max(0, groups.length - 1),
      endpoints: m.supported_endpoint_types || [],
    };
  });
}
