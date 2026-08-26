import Link from 'next/link';
import { HomeShell } from '@/components/home-shell';
import { CustomCursor } from '@/components/custom-cursor';
import { HeroMedia } from '@/components/hero-media';
import { HeroParticles } from '@/components/hero-particles';
import { HeroWebgl } from '@/components/hero-webgl';
import { SiteHeader } from '@/components/site-header';
export default function Home() {
  return <HomeShell><CustomCursor/><main className="home"><section className="hero" aria-label="Homepage introduction"><HeroMedia /><HeroWebgl /><HeroParticles /><SiteHeader className="home-header" edition="SEOUL / 2024—25"/><div className="hero-copy"><p className="eyebrow">雲住 金慧震 / CONTEMPORARY MINHWA</p><h1><span>Things that</span><br/><i>remember</i> us.</h1><p className="hero-note">An evolving image archive by <strong>雲住 金慧震 (운주 김혜진)</strong> — where old symbols find new weather.</p><Link className="hero-cta" href="/works">ENTER ARCHIVE <span>↗</span></Link></div><div className="hero-work-caption"><span>UNTITLED — DRAGON AND CLOUDS</span><span>YEAR / MATERIAL / DIMENSIONS TO BE CONFIRMED</span></div><p className="sr-only">Hero artwork: a blue-green dragon moving through layered cream and brown clouds, by 雲住 金慧震, 운주 김혜진.</p><footer className="site-footer home-footer"><span>雲住 金慧震 / K—MINHWA</span><span>SEOUL, KR / © 2024—25</span><Link href="/artist">ARTIST NOTE ↗</Link></footer></section></main></HomeShell>;
}
