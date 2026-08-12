/** ¥1,234,567 */
export function formatYen(n: number): string {
  return "¥" + Math.round(n).toLocaleString("en-US");
}

/** 12.3万 (Japanese-style 10-thousands unit, as listing sites show rent) */
export function formatMan(n: number): string {
  return (n / 10000).toLocaleString("en-US", { maximumFractionDigits: 1 }) + "万";
}
