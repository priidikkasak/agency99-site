import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { ClientQuestionnaire } from '@/components/ClientQuestionnaire';

export const metadata: Metadata = {
  title: 'Client',
  description: 'Client — Tell us about your project. We reply within 24 hours.',
  openGraph: {
    title: 'AGENCY99',
    description: 'Client',
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

export default function ClientPage() {
  return (
    <>
      <Nav />
      <ClientQuestionnaire />
    </>
  );
}
