import { fetchVisitorsByCountry } from './ga4';
import { MOCK_VISITORS, type VisitorEntry } from './visitors';
import type { RangeKey } from './ranges';

export type MapData = {
  visitors: Record<string, VisitorEntry>;
  source: 'ga4' | 'mock';
};

export async function loadMapData(range: RangeKey): Promise<MapData> {
  if (process.env.GA4_PROPERTY_ID && process.env.GA4_SERVICE_ACCOUNT_KEY) {
    try {
      const result = await fetchVisitorsByCountry(range);
      return { visitors: result.visitors, source: 'ga4' };
    } catch (err) {
      console.error('[map] GA4 fetch failed, falling back to mock:', err);
    }
  }
  return { visitors: MOCK_VISITORS, source: 'mock' };
}
