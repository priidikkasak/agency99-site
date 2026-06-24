// Mock visitor data by ISO 3166-1 alpha-2 country code.
// Replace with GA4 Data API output once the integration lands.

export type VisitorEntry = { count: number };

export const MOCK_VISITORS: Record<string, VisitorEntry> = {
  EE: { count: 4127 },
  US: { count: 2843 },
  GB: { count: 1956 },
  DE: { count: 1234 },
  FI: { count: 987 },
  SE: { count: 876 },
  NL: { count: 654 },
  LV: { count: 543 },
  LT: { count: 487 },
  NO: { count: 432 },
  DK: { count: 398 },
  FR: { count: 367 },
  IE: { count: 312 },
  ES: { count: 287 },
  IT: { count: 245 },
  PL: { count: 234 },
  BE: { count: 198 },
  CH: { count: 187 },
  AT: { count: 156 },
  CA: { count: 145 },
  AU: { count: 132 },
  CZ: { count: 98 },
  PT: { count: 87 },
  JP: { count: 76 },
  SG: { count: 65 },
  BR: { count: 54 },
  IN: { count: 48 },
  MX: { count: 43 },
  AE: { count: 38 },
  NZ: { count: 32 },
  ZA: { count: 28 },
  TR: { count: 24 },
  RO: { count: 21 },
  HU: { count: 18 },
  GR: { count: 15 },
  IS: { count: 12 },
};

export function totalVisits(visitors: Record<string, VisitorEntry>): number {
  let n = 0;
  for (const k in visitors) n += visitors[k].count;
  return n;
}

export function rankedCountries(
  visitors: Record<string, VisitorEntry>,
): Array<{ alpha2: string; count: number }> {
  return Object.entries(visitors)
    .map(([alpha2, v]) => ({ alpha2, count: v.count }))
    .sort((a, b) => b.count - a.count);
}
