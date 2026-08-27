'use client';

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
  className = '',
  isPlaceholder = false,
}: WorkCardProps) {
  const imageRef = useRef<HTMLDivElement>(null);
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

  return (
    <Link
      href={href}
      className={`work-card ${isPlaceholder ? 'work-card--placeholder' : ''} ${className}`}
      onPointerMove={updatePosition}
      onPointerLeave={resetPosition}
      aria-label={isPlaceholder ? `${title.en}. Original artwork documentation is pending.` : title.en}
    >
      <div
        ref={imageRef}
        className={`art-image${isPlaceholder ? ' art-image--plate' : ''}`}
        style={{ backgroundImage: `url(${image})` }}
        role="img"
        aria-label={imageAlt.en}
      />
      <div className="card-meta">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>
          <LocalizedText en={title.en} ko={title.ko} />
        </span>
        <span>{year ?? ''}</span>
      </div>
      {medium ? <p>{medium}</p> : null}
    </Link>
  );
}
