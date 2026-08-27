import type { Metadata } from 'next';
import { CustomCursor } from '@/components/custom-cursor';
import { GoogleAnalytics } from '@/components/google-analytics';
import { pageMeta } from '@/lib/content';
import { absoluteUrl, buildWebsiteJsonLd, getSiteUrl } from '@/lib/seo';
import './globals.css';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageMeta.siteName,
    template: `%s · K-minhwa`,
  },
  description: pageMeta.home.description.en,
  applicationName: pageMeta.siteName,
  authors: [{ name: pageMeta.artistName.hanja, url: absoluteUrl('/artist') }],
  creator: pageMeta.artistName.hanja,
  publisher: pageMeta.siteName,
  keywords: [...pageMeta.keywords],
  alternates: {
    canonical: absoluteUrl('/'),
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ko_KR'],
    siteName: pageMeta.siteName,
    title: pageMeta.home.title.en,
    description: pageMeta.home.description.en,
    url: absoluteUrl('/'),
    images: [
      {
        url: absoluteUrl(pageMeta.defaultOgImage),
        width: 1200,
        height: 630,
        alt: pageMeta.defaultOgAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMeta.home.title.en,
    description: pageMeta.home.description.en,
    images: [absoluteUrl(pageMeta.defaultOgImage)],
  },
  other: {
    'theme-color': '#0B0B0B',
  },
};

const languageBootScript = `
(() => {
  try {
    const saved = window.localStorage.getItem('k-minhwa-language');
    const language = saved === 'ko' ? 'ko' : 'en';
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
  } catch (_) {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = buildWebsiteJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CustomCursor />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
