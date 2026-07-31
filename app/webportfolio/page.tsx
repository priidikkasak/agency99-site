import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { PortfolioPage } from '@/components/PortfolioPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Web portfoolio - AGENCY99',
  description:
    'agency99 tehtud veebitööd: veebilehed, e-poed ja platvormid. Vaata meie varasemaid projekte.',
  alternates: {
    canonical: 'https://agency99.io/webportfolio',
  },
  openGraph: {
    title: 'Web portfoolio - AGENCY99',
    description: 'Veebilehed, e-poed ja platvormid. Vaata meie tehtud töid.',
    url: 'https://agency99.io/webportfolio',
    type: 'website',
  },
};

export default function WebPortfolio() {
  return (
    <>
      <Nav />
      <PortfolioPage />
      <Footer />
    </>
  );
}
