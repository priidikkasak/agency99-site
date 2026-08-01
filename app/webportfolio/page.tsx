import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { PortfolioPage } from '@/components/PortfolioPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Web portfoolio',
  description:
    'Web portfoolio — agency99 tehtud veebitööd: veebilehed, e-poed ja platvormid. Vaata meie varasemaid projekte.',
  alternates: {
    canonical: 'https://agency99.io/webportfolio',
  },
  openGraph: {
    title: 'AGENCY99',
    description: 'Web portfoolio',
    url: 'https://agency99.io/webportfolio',
    siteName: 'AGENCY99',
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
