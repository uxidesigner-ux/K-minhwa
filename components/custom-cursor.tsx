'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!cursor || !fine.matches || reduced.matches) return;
    let frame = 0;
    let visible = false;
    const point = { x: -80, y: -80, targetX: -80, targetY: -80 };
    const render = () => {
      point.x += (point.targetX - point.x) * .22;
      point.y += (point.targetY - point.y) * .22;
      cursor.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
      frame = window.requestAnimationFrame(render);
    };
    const onMove = (event: PointerEvent) => {
      point.targetX = event.clientX;
      point.targetY = event.clientY;
      if (!visible) { visible = true; cursor.dataset.visible = 'true'; }
      cursor.dataset.interactive = event.target instanceof Element && Boolean(event.target.closest('a,button,input,textarea,select')) ? 'true' : 'false';
    };
    const onLeave = () => { cursor.dataset.visible = 'false'; visible = false; };
    document.documentElement.dataset.customCursor = 'true';
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    frame = window.requestAnimationFrame(render);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      delete document.documentElement.dataset.customCursor;
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef} data-visible="false" aria-hidden="true">
      <i />
      <b />
    </div>
  );
}
