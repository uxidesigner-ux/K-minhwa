'use client';

import { useEffect, useState, type CSSProperties } from 'react';

const SESSION_KEY = 'k-minhwa-entry-seen';
const INTRO_CELLS = Array.from({ length: 72 }, (_, index) => index);

type EntryExperienceProps = {
  onComplete: () => void;
};

type Phase = 'loading' | 'mark' | 'grid' | 'reveal';

function waitForImage(source: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = source;
  });
}

export function EntryExperience({ onComplete }: EntryExperienceProps) {
  const [phase, setPhase] = useState<Phase>('loading');
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const seen = window.sessionStorage.getItem(SESSION_KEY) === 'true';
    let frame = 0;
    let cancelled = false;
    const timers: number[] = [];

    const complete = () => {
      if (cancelled) return;
      window.sessionStorage.setItem(SESSION_KEY, 'true');
      window.dispatchEvent(new Event('kminhwa:entry-complete'));
      onComplete();
      setMounted(false);
    };

    const schedule = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay));
    };

    if (reduced.matches || seen) {
      setProgress(100);
      setPhase('reveal');
      schedule(complete, reduced.matches ? 80 : 180);
      return () => timers.forEach(window.clearTimeout);
    }

    const minimumLoading = 3000;
    const startedAt = performance.now();
    let assetsReady = false;
    const assetPromise = Promise.race([
      Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        waitForImage('/media/hero-poster.jpg'),
      ]),
      new Promise<void>((resolve) => schedule(resolve, 1200)),
    ]).then(() => { assetsReady = true; });

    const renderProgress = (now: number) => {
      if (cancelled) return;
      const elapsed = now - startedAt;
      const settledProgress = assetsReady ? Math.min(100, (elapsed / minimumLoading) * 100) : Math.min(96, (elapsed / minimumLoading) * 96);
      setProgress(Math.round(settledProgress));
      if (settledProgress >= 100) {
        setPhase('mark');
        schedule(() => setPhase('grid'), 480);
        schedule(() => setPhase('reveal'), 1180);
        schedule(complete, 1750);
        return;
      }
      frame = window.requestAnimationFrame(renderProgress);
    };

    void assetPromise;
    frame = window.requestAnimationFrame(renderProgress);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      timers.forEach(window.clearTimeout);
    };
  }, [onComplete]);

  if (!mounted) return null;

  return <div className={`entry-experience entry-experience--${phase}`} aria-hidden="true">
    <p className="entry-progress">{String(progress).padStart(2, '0')}<span>%</span></p>
    <div className="entry-mark"><span className="entry-mark__cells"><i/><i/><i/><i/><i/></span><span>K—MINHWA</span></div>
    <div className="entry-grid">{INTRO_CELLS.map((cell) => <i key={cell} style={{ '--cell': cell } as CSSProperties} />)}</div>
  </div>;
}
