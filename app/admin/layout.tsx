import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Admin — Restricted area.',
  openGraph: {
    title: 'AGENCY99',
    description: 'Admin',
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
