import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { SourcingCasesPage } from '@/components/SourcingCasesPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Portfoolio - AGENCY99',
  description:
    'agency99 sourcing tulemused: tootjad, tarnijad, investorid ja kinnisvara üle maailma. Iga kontakt käsitsi verifitseeritud.',
  alternates: {
    canonical: 'https://agency99.io/portfoolio',
  },
  openGraph: {
    title: 'Portfoolio - AGENCY99',
    description:
      'Sourcing case study: tootjad, investorid, kinnisvara. Reaalsed tulemused.',
    url: 'https://agency99.io/portfoolio',
    type: 'website',
  },
};

export default function Portfolio() {
  return (
    <>
      <Nav />
      <SourcingCasesPage />
      <Footer />
    </>
  );
}
