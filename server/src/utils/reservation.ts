export function calculateDatesBetween(first: Date, second: Date) {
  return Math.round((second.getTime() - first.getTime()) / (1000 * 60 * 60 * 24));
}
