// Stylesheet order is the cascade order: fonts, then the shared kit, then document rules.
// Section stylesheets are imported by their components and land after these.
import '@/styles/fonts.css';
import '@/styles/kit.css';
import './globals.css';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Loader } from '@/components/layout/Loader';
import { PageTransition } from '@/components/layout/PageTransition';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { SITE_URL, SHARE_IMAGE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Girder',
  robots: { 'max-image-preview': 'large' },
  openGraph: { type: 'website', siteName: 'Girder', images: [SHARE_IMAGE] },
  twitter: { card: 'summary_large_image', images: [SHARE_IMAGE] },
};

export const viewport: Viewport = {
  width: 'device-width',
  themeColor: '#0d1012',
};

const PRELOADED_FONTS = [
  '/fonts/big-shoulders-display-500-900-latin.woff2',
  '/fonts/barlow-400-latin.woff2',
  '/fonts/reddit-mono-400-600-latin.woff2',
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The loader's pre-paint script adds classes to <html> before hydration.
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {PRELOADED_FONTS.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
      </head>
      <body>
        {/* First: its inline script must cover the page before anything else is parsed. */}
        <Loader />
        <Header />
        <PageTransition />
        <SmoothScroll />
        <div className="site">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
