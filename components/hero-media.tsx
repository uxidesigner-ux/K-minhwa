'use client';

import { useEffect, useRef, useState } from 'react';

const MAX_SHIFT = 6;
const MOVE_THRESHOLD_PX = 10;

export function HeroMedia() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canAutoplay, setCanAutoplay] = useState(false);

  useEffect(() => {
    const media = mediaRef.current;
    const video = videoRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reset = () => {
      media?.style.setProperty('--hero-x', '0px');
      media?.style.setProperty('--hero-y', '0px');
      setCanAutoplay(false);
      video?.pause();
    };
    const syncMotionPreference = () => {
      if (reduced.matches) {
        reset();
        return;
      }
      setCanAutoplay(true);
    };
    const origin = { x: Number.NaN, y: Number.NaN };
    const move = (event: PointerEvent) => {
      if (!media || window.innerWidth < 768 || reduced.matches || !finePointer.matches) return;
      if (Number.isNaN(origin.x) || Number.isNaN(origin.y)) {
        origin.x = event.clientX;
        origin.y = event.clientY;
        return;
      }
      const travel = Math.hypot(event.clientX - origin.x, event.clientY - origin.y);
      if (travel < MOVE_THRESHOLD_PX) {
        media.style.setProperty('--hero-x', '0px');
        media.style.setProperty('--hero-y', '0px');
        return;
      }
      const x = (event.clientX / window.innerWidth - 0.5) * MAX_SHIFT * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * MAX_SHIFT * 2;
      media.style.setProperty('--hero-x', `${x.toFixed(1)}px`);
      media.style.setProperty('--hero-y', `${y.toFixed(1)}px`);
    };
    syncMotionPreference();
    window.addEventListener('pointermove', move, { passive: true });
    reduced.addEventListener('change', syncMotionPreference);
    finePointer.addEventListener('change', reset);
    return () => {
      window.removeEventListener('pointermove', move);
      reduced.removeEventListener('change', syncMotionPreference);
      finePointer.removeEventListener('change', reset);
    };
  }, []);
  return <div ref={mediaRef} className="hero-image" aria-hidden="true">
    <video ref={videoRef} className="hero-video" autoPlay={canAutoplay} loop muted playsInline preload="auto" poster="/media/hero-poster.jpg">
      <source src="/media/hero.mp4" type="video/mp4" />
    </video>
  </div>;
}
