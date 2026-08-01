import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { ContentStudio } from '@/components/ContentStudio';

export const metadata: Metadata = {
  title: 'Content',
  description: 'Content — Single-page studio for IG stills + reels from agency99 short copy.',
  openGraph: {
    title: 'AGENCY99',
    description: 'Content',
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

export default function ContentPage() {
  return (
    <>
      <Nav />
      <ContentStudio />
    </>
  );
}
