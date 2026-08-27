'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { LocalizedText } from '@/components/localized-text';
import type { LocaleText } from '@/lib/content';

type WorkCardProps = {
  href: string;
  image: string;
  imageAlt: LocaleText;
  index: number;
  title: LocaleText;
  year?: string;
  medium?: string;
  dimensions?: string;
  className?: string;
  isPlaceholder?: boolean;
};

const MAX_SHIFT = 8;

export function WorkCard({
  href,
  image,
  imageAlt,
  index,
  title,
  year,
  medium,
  dimensions,
  className = '',
  isPlaceholder = false,
}: WorkCardProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const metaId = `work-meta-${index}`;
  const updatePosition = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 768 || event.pointerType !== 'mouse' || !imageRef.current) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width - 0.5) * MAX_SHIFT * 2;
    const y = ((event.clientY - box.top) / box.height - 0.5) * MAX_SHIFT * 2;
    imageRef.current.style.setProperty('--work-x', `${x.toFixed(1)}px`);
    imageRef.current.style.setProperty('--work-y', `${y.toFixed(1)}px`);
  };
  const resetPosition = () => {
    imageRef.current?.style.setProperty('--work-x', '0px');
    imageRef.current?.style.setProperty('--work-y', '0px');
  };
  const materialLine = [medium, dimensions].filter(Boolean).join(' · ');

  return (
    <Link
      href={href}
      className={`work-card ${isPlaceholder ? 'work-card--placeholder' : ''} ${className}`}
      onPointerMove={updatePosition}
      onPointerLeave={resetPosition}
      aria-describedby={materialLine || year ? metaId : undefined}
    >
      <div ref={imageRef} className={`art-image${isPlaceholder ? ' art-image--plate' : ''}`}>
        {image.endsWith('.svg') ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={imageAlt.en} />
        ) : (
          <Image
            src={image}
            alt={imageAlt.en}
            width={1200}
            height={1500}
            sizes="(max-width:700px) 90vw, 42vw"
            className="art-image__img"
          />
        )}
        <span className="sr-only">
          <LocalizedText en={imageAlt.en} ko={imageAlt.ko} />
        </span>
      </div>
      <div className="card-meta" id={metaId}>
        <span className="card-meta__index">{String(index + 1).padStart(2, '0')}</span>
        <span className="card-meta__title">
          <LocalizedText en={title.en} ko={title.ko} />
        </span>
        {year ? <span className="card-meta__year">{year}</span> : <span className="card-meta__year" />}
      </div>
      {materialLine ? <p className="card-meta__material">{materialLine}</p> : null}
    </Link>
  );
}
