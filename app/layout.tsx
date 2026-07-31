import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { cabinetGrotesk, dmSans, geistMono, instrumentSerif, cormorantGaramond } from '@/lib/fonts';
import { I18nProvider } from '@/lib/i18n/context';
import { CleanAnchorScroll } from '@/components/CleanAnchorScroll';
import './globals.css';

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: '#0f0f0d',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://agency99.io'),
  title: 'AGENCY99',
  description:
    'AI-powered sourcing, agents and automation. Manufacturers, suppliers, investors, real estate - globally. Every contact human-verified. 10+ years of sourcing experience. From €1,490.',
  keywords: 'AI sourcing, AI agents, AI automation, lead generation, manufacturer sourcing, supplier sourcing, custom AI, chatbots',
  alternates: {
    canonical: 'https://agency99.io',
  },
  openGraph: {
    title: 'AGENCY99',
    description:
      'AI-powered sourcing, agents and automation. Manufacturers, suppliers, investors, real estate - globally. Every contact human-verified. 10+ years of sourcing experience. From €1,490.',
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
      className={`${cabinetGrotesk.variable} ${dmSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${cormorantGaramond.variable}`}
    >
      <body>
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`
            if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
            try {
              var nav = performance.getEntriesByType('navigation')[0];
              if (nav && nav.type === 'reload' && location.hash) {
                history.replaceState(null, '', location.pathname + location.search);
                window.scrollTo(0, 0);
              }
            } catch (e) {}
          `}
        </Script>
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
        <I18nProvider>
          <CleanAnchorScroll />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
