import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { WorldMap } from '@/components/WorldMap';

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

export default function MapPage() {
  return (
    <>
      <Nav />
      <WorldMap />
    </>
  );
}
