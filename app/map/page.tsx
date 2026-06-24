import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { WorldMap } from '@/components/WorldMap';
import { loadMapData } from '@/lib/map/data';
import { DEFAULT_RANGE } from '@/lib/map/ranges';

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

export default async function MapPage() {
  const { visitors, source } = await loadMapData(DEFAULT_RANGE);
  return (
    <>
      <Nav />
      <WorldMap visitors={visitors} source={source} rangeKey={DEFAULT_RANGE} />
    </>
  );
}
