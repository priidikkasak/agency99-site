import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { ContentStudio } from '@/components/ContentStudio';

export const metadata: Metadata = {
  title: 'Content',
  description: 'Single-page studio for IG stills + reels from agency99 short copy.',
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
