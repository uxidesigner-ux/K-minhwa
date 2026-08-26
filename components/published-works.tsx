'use client';

import { useEffect, useState } from 'react';
import { WorkCard } from '@/components/work-card';
import { works as previewWorks } from '@/lib/content';
import type { Work } from '@/lib/content-types';
import { getPublishedWorks } from '@/lib/firebase/content';

const fallbackWorks: Work[] = previewWorks.map((work, index) => ({
  id: work.slug,
  ...work,
  description: '',
    imageAlt: work.imageAlt,
  status: 'published',
  sortOrder: index,
}));

export function PublishedWorks() {
  const [works, setWorks] = useState<Work[]>(fallbackWorks);

  useEffect(() => {
    getPublishedWorks().then((published) => {
      if (published.length) setWorks(published);
    }).catch(() => {
      // Static preview content remains visible while Firestore has no public records.
    });
  }, []);

  const isPreview = works === fallbackWorks;
  return <section className="works-area" aria-label="Artwork index">
    {isPreview && <p className="archive-notice">ARTWORK PHOTOGRAPHS / CATALOGUE TITLES, DATES, MATERIALS, AND DIMENSIONS ARE BEING CONFIRMED.</p>}
    <div className="works-grid">{works.map((work, index) => <WorkCard href={`/works/${work.slug}`} image={work.image} imageAlt={work.imageAlt} index={index} title={work.title} year={work.year} medium={work.medium} key={work.id}/>)}</div>
  </section>;
}
