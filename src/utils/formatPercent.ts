export function formatPercent(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`;
}
