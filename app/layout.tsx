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
    'Inimese loovus ja AI kiirus. Veebilehed, e-poed ja platvormid alates €500.',
  keywords: 'veebileht, e-pood, Next.js, Vercel, Eesti, web studio, agency',
  openGraph: {
    title: 'AGENCY99 – Inimese loovus ja AI kiirus',
    description:
      'Inimese loovus ja AI kiirus. Veebilehed, e-poed ja platvormid alates €500.',
    type: 'website',
    locale: 'et_EE',
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
      lang="et"
      className={`${cabinetGrotesk.variable} ${dmSans.variable} ${geistMono.variable}`}
    >
      <body>
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
