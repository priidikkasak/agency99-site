import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { ColdEmailPage } from '@/components/ColdEmail';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Cold Email',
  description:
    'Cold Email — B2B cold email süsteemid: lead list building, copywriting ja kampaaniate haldus. Müügilead võtmed kätte.',
  alternates: {
    canonical: 'https://agency99.io/cold-email',
  },
  openGraph: {
    title: 'AGENCY99',
    description: 'Cold Email',
    url: 'https://agency99.io/cold-email',
    siteName: 'AGENCY99',
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
