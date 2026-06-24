import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { MarketingDashboard } from '@/components/MarketingDashboard';

export const metadata: Metadata = {
  title: 'Marketing',
  description: 'Ad spend admin - agency99.io.',
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

export default function MarketingPage() {
  return (
    <>
      <Nav />
      <MarketingDashboard />
    </>
  );
}
