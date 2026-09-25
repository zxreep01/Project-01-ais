/** Escape a string for safe interpolation into HTML. */
export function esc(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** Format a number of dollars nicely (strip trailing zeros, keep small values precise). */
export function fmtUsd(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  if (n === 0) return '$0';
  if (n < 0.001) return `$${n.toPrecision(3).replace(/0+$/, '').replace(/\.$/, '')}`;
  const s = n.toFixed(n < 1 ? 6 : 4).replace(/0+$/, '').replace(/\.$/, '');
  return `$${s}`;
}

/** Compact large-ish counts (e.g. 52 -> "52"). */
export function fmtCount(n) {
  return Number.isFinite(n) ? String(n) : '—';
}

/** Join class names, skipping falsy values. */
export function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
