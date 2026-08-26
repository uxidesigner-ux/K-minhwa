'use client';

import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number; size: number; alpha: number; born: number; life: number };

const MAX_PARTICLES = 56;
const MAX_DPR = 1.5;

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest<HTMLElement>('.hero');
    if (!canvas || !hero) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const context = canvas.getContext('2d');
    if (!context) return;

    let active = window.sessionStorage.getItem('k-minhwa-entry-seen') === 'true';
    let visible = !document.hidden;
    let frame = 0;
    let running = false;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastPoint = { x: 0, y: 0 };
    let anchor = { x: 0, y: 0 };
    let hasPointer = false;
    let particles: Particle[] = [];

    const resize = () => {
      const bounds = hero.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = Math.round(bounds.width);
      height = Math.round(bounds.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const canRun = () => active && visible && finePointer.matches && !reducedMotion.matches;
    const draw = (now: number) => {
      if (!canRun()) { running = false; return; }
      context.clearRect(0, 0, width, height);
      particles = particles.filter((particle) => now - particle.born < particle.life);
      for (const particle of particles) {
        const age = (now - particle.born) / particle.life;
        const fade = (1 - age) * particle.alpha;
        const x = particle.x + particle.vx * age;
        const y = particle.y + particle.vy * age;
        context.beginPath();
        context.fillStyle = `rgba(244,243,239,${fade.toFixed(3)})`;
        context.arc(x, y, particle.size * (1 - age * 0.35), 0, Math.PI * 2);
        context.fill();
      }
      if (particles.length) frame = window.requestAnimationFrame(draw);
      else running = false;
    };

    const requestDraw = () => {
      if (!running && canRun()) { running = true; frame = window.requestAnimationFrame(draw); }
    };

    const addParticles = (x: number, y: number) => {
      const isFirstPoint = !hasPointer;
      if (isFirstPoint) {
        hasPointer = true;
        anchor = { x, y };
        lastPoint = { x, y };
      }
      anchor.x += (x - anchor.x) * 0.22;
      anchor.y += (y - anchor.y) * 0.22;
      const distance = isFirstPoint ? 20 : Math.hypot(x - lastPoint.x, y - lastPoint.y);
      if (distance < 5) return;
      lastPoint = { x, y };
      const count = Math.min(5, Math.max(2, Math.ceil(distance / 20)));
      for (let index = 0; index < count; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * 88;
        particles.push({
          x: anchor.x + Math.cos(angle) * radius,
          y: anchor.y + Math.sin(angle) * radius,
          vx: Math.cos(angle) * (8 + Math.random() * 18),
          vy: Math.sin(angle) * (8 + Math.random() * 18),
          size: 1.2 + Math.random() * 2.4,
          alpha: 0.18 + Math.random() * 0.24,
          born: performance.now(),
          life: 360 + Math.random() * 300,
        });
      }
      particles = particles.slice(-MAX_PARTICLES);
      requestDraw();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!canRun()) return;
      const bounds = hero.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) return;
      addParticles(event.clientX - bounds.left, event.clientY - bounds.top);
    };
    const onVisibility = () => {
      visible = !document.hidden;
      if (!visible) { window.cancelAnimationFrame(frame); running = false; context.clearRect(0, 0, width, height); }
    };
    const onEntryComplete = () => { active = true; };
    const disable = () => { particles = []; window.cancelAnimationFrame(frame); running = false; context.clearRect(0, 0, width, height); };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(hero);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('kminhwa:entry-complete', onEntryComplete);
    document.addEventListener('visibilitychange', onVisibility);
    finePointer.addEventListener('change', disable);
    reducedMotion.addEventListener('change', disable);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('kminhwa:entry-complete', onEntryComplete);
      document.removeEventListener('visibilitychange', onVisibility);
      finePointer.removeEventListener('change', disable);
      reducedMotion.removeEventListener('change', disable);
    };
  }, []);

  return <canvas className="hero-particles" ref={canvasRef} aria-hidden="true" />;
}
