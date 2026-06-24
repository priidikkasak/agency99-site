import { BetaAnalyticsDataClient } from '@google-analytics/data';
import type { VisitorEntry } from './visitors';

let client: BetaAnalyticsDataClient | null = null;

function getClient(): BetaAnalyticsDataClient {
  if (client) return client;

  const keyRaw = process.env.GA4_SERVICE_ACCOUNT_KEY;
  if (!keyRaw) {
    throw new Error('GA4_SERVICE_ACCOUNT_KEY is not set');
  }

  const credentials = JSON.parse(keyRaw) as {
    client_email: string;
    private_key: string;
  };

  client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key.replace(/\\n/g, '\n'),
    },
  });
  return client;
}

export type VisitorMap = Record<string, VisitorEntry>;

export async function fetchVisitorsByCountry(
  daysBack = 30,
): Promise<{ visitors: VisitorMap; total: number; source: 'ga4' }> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    throw new Error('GA4_PROPERTY_ID is not set');
  }

  const analytics = getClient();
  const [response] = await analytics.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: `${daysBack}daysAgo`, endDate: 'today' }],
    dimensions: [{ name: 'countryId' }],
    metrics: [{ name: 'sessions' }],
    limit: 250,
  });

  const visitors: VisitorMap = {};
  let total = 0;
  for (const row of response.rows ?? []) {
    const alpha2 = row.dimensionValues?.[0]?.value;
    const count = Number(row.metricValues?.[0]?.value ?? 0);
    if (!alpha2 || alpha2 === '(not set)' || count <= 0) continue;
    visitors[alpha2.toUpperCase()] = { count };
    total += count;
  }

  return { visitors, total, source: 'ga4' };
}
