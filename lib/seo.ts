import type { Metadata } from 'next';
import { pageMeta } from '@/lib/content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? pageMeta.siteUrl;

export function getSiteUrl() {
  return siteUrl.replace(/\/$/, '');
}

export function absoluteUrl(path = '/') {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = pageMeta.defaultOgImage,
  imageAlt = pageMeta.defaultOgAlt,
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);
  const isDefaultOg = image === pageMeta.defaultOgImage;

  return {
    title,
    description,
    applicationName: pageMeta.siteName,
    authors: [{ name: pageMeta.artistName.hanja, url: absoluteUrl('/artist') }],
    creator: pageMeta.artistName.hanja,
    publisher: pageMeta.siteName,
    keywords: [...pageMeta.keywords],
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: 'en_US',
      alternateLocale: ['ko_KR'],
      url,
      siteName: pageMeta.siteName,
      title,
      description,
      images: [
        isDefaultOg
          ? { url: ogImage, width: 1200, height: 630, alt: imageAlt }
          : { url: ogImage, alt: imageAlt },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: pageMeta.siteName,
    url: getSiteUrl(),
    description: pageMeta.home.description.en,
    inLanguage: ['en', 'ko'],
    publisher: {
      '@type': 'Person',
      name: pageMeta.artistName.hanja,
      alternateName: [pageMeta.artistName.hangul, pageMeta.artistName.en],
      url: absoluteUrl('/artist'),
      jobTitle: pageMeta.tagline.en,
      image: absoluteUrl(pageMeta.defaultOgImage),
    },
  };
}
