import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { ColdEmailPage } from '@/components/ColdEmail';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Cold Email — agency99',
  description:
    'B2B cold email süsteemid: lead list building, copywriting ja kampaaniate haldus. Müügilead võtmed kätte.',
  alternates: {
    canonical: 'https://agency99.io/cold-email',
  },
  openGraph: {
    title: 'Cold Email — agency99',
    description: 'Lead list, copywriting, saatmine. B2B müügilead võtmed kätte.',
    url: 'https://agency99.io/cold-email',
    type: 'website',
  },
};

export default function ColdEmail() {
  return (
    <>
      <Nav />
      <ColdEmailPage />
      <Footer />
    </>
  );
}
