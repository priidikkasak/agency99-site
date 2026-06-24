import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { WorldMap } from '@/components/WorldMap';
import { fetchVisitorsByCountry } from '@/lib/map/ga4';
import { MOCK_VISITORS } from '@/lib/map/visitors';

export const metadata: Metadata = {
  title: 'World map — AGENCY99',
  description: 'Where the world finds agency99.io.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const revalidate = 900;

export default async function MapPage() {
  let visitors = MOCK_VISITORS;
  let source: 'ga4' | 'mock' = 'mock';

  if (process.env.GA4_PROPERTY_ID && process.env.GA4_SERVICE_ACCOUNT_KEY) {
    try {
      const result = await fetchVisitorsByCountry(30);
      if (Object.keys(result.visitors).length > 0) {
        visitors = result.visitors;
        source = 'ga4';
      }
    } catch (err) {
      console.error('[map] GA4 fetch failed, falling back to mock:', err);
    }
  }

  return (
    <>
      <Nav />
      <WorldMap visitors={visitors} source={source} rangeLabel="last 30 days" />
    </>
  );
}
