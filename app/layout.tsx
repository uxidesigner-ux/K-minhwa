import type { Metadata } from 'next';
import { CustomCursor } from '@/components/custom-cursor';
import { GoogleAnalytics } from '@/components/google-analytics';
import { pageMeta } from '@/lib/content';
import { absoluteUrl } from '@/lib/seo';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? pageMeta.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageMeta.siteName,
    template: `%s · K-minhwa`,
  },
  description: pageMeta.home.description.en,
  applicationName: pageMeta.siteName,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png' }],
  },
  openGraph: {
    type: 'website',
    siteName: pageMeta.siteName,
    title: pageMeta.home.title.en,
    description: pageMeta.home.description.en,
    url: absoluteUrl('/'),
    images: [{ url: absoluteUrl(pageMeta.defaultOgImage), width: 1200, height: 630, alt: pageMeta.siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMeta.home.title.en,
    description: pageMeta.home.description.en,
    images: [absoluteUrl(pageMeta.defaultOgImage)],
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageBootScript }} />
      </head>
      <body>
        <CustomCursor />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
