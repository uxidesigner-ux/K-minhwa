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
  imageAlt: `${work.title}, ${work.year}`,
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

  return <section className="works-grid" aria-label="Artwork index">{works.map((work, index) => <WorkCard href={`/works/${work.slug}`} image={work.image} index={index} title={work.title} year={work.year} medium={work.medium} key={work.id}/>)}</section>;
}
