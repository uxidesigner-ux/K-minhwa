import Link from 'next/link';
import { HomeShell } from '@/components/home-shell';
import { CustomCursor } from '@/components/custom-cursor';
import { HeroMedia } from '@/components/hero-media';
import { HeroParticles } from '@/components/hero-particles';
import { HeroWebgl } from '@/components/hero-webgl';
import { LocalizedText } from '@/components/localized-text';
import { SiteHeader } from '@/components/site-header';
export default function Home() {
  return <HomeShell><CustomCursor/><main className="home"><section className="hero" aria-label="Homepage introduction"><HeroMedia /><HeroWebgl /><HeroParticles /><SiteHeader className="home-header" edition="SEOUL / 2024—25"/><div className="hero-copy"><p className="eyebrow"><LocalizedText en="CONTEMPORARY MINHWA / SEOUL" ko="동시대 민화 / 서울"/></p><p className="hero-artist-name"><span>雲住 金慧震</span><small>운주 김혜진</small></p><h1><LocalizedText en={<><span>Things that</span><br/><i>remember</i> us.</>} ko={<><span>우리의</span><br/><i>기억</i>이 된 것들.</>}/></h1><p className="hero-note"><LocalizedText en={<>An image archive by <strong>雲住 金慧震 (운주 김혜진)</strong>, where old symbols find new weather.</>} ko={<>운주 김혜진이 오래된 상징에 새로운 날씨를 더해 만드는 이미지 아카이브.</>}/></p><Link className="hero-cta" href="/works"><LocalizedText en="ENTER ARCHIVE" ko="작품 보기"/> <span>↗</span></Link></div><div className="hero-work-caption"><span><LocalizedText en="UNTITLED — DRAGON AND CLOUDS" ko="무제 — 용과 구름"/></span><span><LocalizedText en="YEAR / MATERIAL / DIMENSIONS TO BE CONFIRMED" ko="연도 / 재료 / 크기 확인 중"/></span></div><p className="sr-only">Hero artwork: a blue-green dragon moving through layered cream and brown clouds, by 雲住 金慧震, 운주 김혜진.</p><footer className="site-footer home-footer"><span>雲住 金慧震 / K—MINHWA</span><span>SEOUL, KR / © 2024—25</span><Link href="/artist"><LocalizedText en="ARTIST NOTE" ko="작가 노트"/> ↗</Link></footer></section></main></HomeShell>;
}
