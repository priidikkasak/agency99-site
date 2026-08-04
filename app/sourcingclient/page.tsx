import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { SourcingClientQuestionnaire } from '@/components/SourcingClientQuestionnaire';

export const metadata: Metadata = {
  title: 'Sourcing client',
  description: 'Sourcing client — Tell us what you need sourced. We reply within 24 hours.',
  openGraph: {
    title: 'AGENCY99',
    description: 'Sourcing client',
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

export default function SourcingClientPage() {
  return (
    <>
      <Nav />
      <SourcingClientQuestionnaire />
    </>
  );
}
