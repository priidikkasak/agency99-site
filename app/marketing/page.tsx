import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { MarketingDashboard } from '@/components/MarketingDashboard';

export const metadata: Metadata = {
  title: 'Marketing',
  description: 'Marketing — Ad spend admin.',
  openGraph: {
    title: 'AGENCY99',
    description: 'Marketing',
    siteName: 'AGENCY99',
    type: 'website',
  },
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
