import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { cabinetGrotesk, dmSans, geistMono } from '@/lib/fonts';
import { I18nProvider } from '@/lib/i18n/context';
import './globals.css';

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: '#0f0f0d',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://agency99.io'),
  title: 'AGENCY99',
  description:
    'Engineered for speed. Built with AI.',
  keywords: 'website, e-commerce, platform, Next.js, Vercel, web studio, agency, conversion design',
  alternates: {
    canonical: 'https://agency99.io',
  },
  openGraph: {
    title: 'AGENCY99',
    description:
      'Engineered for speed. Built with AI.',
    url: 'https://agency99.io',
    siteName: 'AGENCY99',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cabinetGrotesk.variable} ${dmSans.variable} ${geistMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'AGENCY99',
              url: 'https://agency99.io',
            }),
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C6E3CYETET"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C6E3CYETET');
          `}
        </Script>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
