import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { ClientQuestionnaire } from '@/components/ClientQuestionnaire';

export const metadata: Metadata = {
  title: 'Client questionnaire - AGENCY99',
  description: 'Tell us about your project. We reply within 24 hours.',
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
