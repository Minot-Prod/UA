export function fmt(x){ return new Intl.NumberFormat('fr-CA',{maximumFractionDigits:2}).format(x); }
export function clamp(n, min, max){ return Math.min(max, Math.max(min, n)); }