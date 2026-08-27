import type { MetadataRoute } from 'next';
import { works } from '@/lib/content';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/works'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/artist'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const workRoutes: MetadataRoute.Sitemap = works.map((work) => ({
    url: absoluteUrl(`/works/${work.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes];
}
