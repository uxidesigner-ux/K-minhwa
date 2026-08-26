'use client';

import Link from 'next/link';
import { useRef } from 'react';

type WorkCardProps = { href: string; image: string; index: number; title: string; year: string; medium: string; className?: string; isPlaceholder?: boolean };
const MAX_SHIFT = 8;

export function WorkCard({ href, image, index, title, year, medium, className = '', isPlaceholder = false }: WorkCardProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const updatePosition = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 768 || event.pointerType !== 'mouse' || !imageRef.current) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width - 0.5) * MAX_SHIFT * 2;
    const y = ((event.clientY - box.top) / box.height - 0.5) * MAX_SHIFT * 2;
    imageRef.current.style.setProperty('--work-x', `${x.toFixed(1)}px`);
    imageRef.current.style.setProperty('--work-y', `${y.toFixed(1)}px`);
  };
  const resetPosition = () => { imageRef.current?.style.setProperty('--work-x', '0px'); imageRef.current?.style.setProperty('--work-y', '0px'); };
  return <Link href={href} className={`work-card ${isPlaceholder ? 'work-card--placeholder' : ''} ${className}`} onPointerMove={updatePosition} onPointerLeave={resetPosition} aria-label={isPlaceholder ? `${title}. Original artwork documentation is pending.` : `${title}, ${year}`}>
    <div ref={imageRef} className="art-image" style={{ backgroundImage: `url(${image})` }} role="img" aria-label={`${title}, ${year}`} />
    <div className="card-meta"><span>{String(index + 1).padStart(2, '0')}</span><span>{title}</span><span>{year}</span></div><p>{medium}</p>
  </Link>;
}
