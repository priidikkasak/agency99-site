import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { PortfolioPage } from '@/components/PortfolioPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Portfoolio — agency99',
  description:
    'agency99 tehtud tööd: veebilehed, e-poed ja platvormid. Vaata meie projekte.',
  alternates: {
    canonical: 'https://agency99.io/portfoolio',
  },
  openGraph: {
    title: 'Portfoolio — agency99',
    description: 'Veebilehed, e-pood ja platvormid. Vaata meie tehtud töid.',
    url: 'https://agency99.io/portfoolio',
    type: 'website',
  },
};

export default function Portfolio() {
  return (
    <>
      <Nav />
      <PortfolioPage />
      <Footer />
    </>
  );
}
