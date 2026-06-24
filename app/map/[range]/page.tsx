import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { WorldMap } from '@/components/WorldMap';
import { loadMapData } from '@/lib/map/data';
import { DEFAULT_RANGE, RANGES, type RangeKey } from '@/lib/map/ranges';

export const metadata: Metadata = {
  title: 'Map',
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

const VALID_RANGES = new Set<string>(RANGES.map((r) => r.key));

export default async function MapRangePage({
  params,
}: {
  params: Promise<{ range: string }>;
}) {
  const { range: slug } = await params;
  if (slug === DEFAULT_RANGE) redirect('/map');
  if (!VALID_RANGES.has(slug)) notFound();
  const range = slug as RangeKey;
  const { visitors, source } = await loadMapData(range);
  return (
    <>
      <Nav />
      <WorldMap visitors={visitors} source={source} rangeKey={range} />
    </>
  );
}
