'use client';

import { useEffect, useState } from 'react';
import { WorkCard } from '@/components/work-card';
import { LocalizedText } from '@/components/localized-text';
import { siteCopy, works as previewWorks } from '@/lib/content';
import type { Work } from '@/lib/content-types';
import { getPublishedWorks } from '@/lib/firebase/content';

type IndexWork = {
  id: string;
  slug: string;
  title: { ko: string; en: string };
  year?: string;
  medium?: string;
  image: string;
  imageAlt: { ko: string; en: string };
  imageConfirmed: boolean;
  presentation?: 'artwork' | 'installation';
};

const fallbackWorks: IndexWork[] = previewWorks.map((work) => ({
  id: work.slug,
  slug: work.slug,
  title: work.title,
  year: work.year,
  medium: work.medium,
  image: work.image,
  imageAlt: work.imageAlt,
  imageConfirmed: work.imageConfirmed,
  presentation: work.presentation,
}));

function toIndexWork(work: Work): IndexWork {
  return {
    id: work.id,
    slug: work.slug,
    title: { ko: work.title, en: work.title },
    year: work.year || undefined,
    medium: work.medium || undefined,
    image: work.image,
    imageAlt: { ko: work.imageAlt, en: work.imageAlt },
    imageConfirmed: Boolean(work.image && !work.image.includes('archive-placeholder')),
  };
}

export function PublishedWorks() {
  const [works, setWorks] = useState<IndexWork[]>(fallbackWorks);
  const [usingPreview, setUsingPreview] = useState(true);

  useEffect(() => {
    getPublishedWorks()
      .then((published) => {
        if (published.length) {
          setWorks(published.map(toIndexWork));
          setUsingPreview(false);
        }
      })
      .catch(() => {
        // Static preview content remains visible while Firestore has no public records.
      });
  }, []);

  return (
    <section className="works-area" aria-label="Artwork index">
      {usingPreview && (
        <p className="archive-notice">
          <LocalizedText en={siteCopy.works.notice.en} ko={siteCopy.works.notice.ko} />
        </p>
      )}
      <div className="works-grid">
        {works.map((work, index) => (
          <WorkCard
            key={work.id}
            href={`/works/${work.slug}`}
            image={work.image}
            imageAlt={work.imageAlt}
            index={index}
            title={work.title}
            year={work.year}
            medium={work.medium}
            isPlaceholder={!work.imageConfirmed}
            className={work.presentation === 'installation' ? 'work-card--installation' : ''}
          />
        ))}
      </div>
    </section>
  );
}
