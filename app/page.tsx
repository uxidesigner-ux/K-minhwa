import Link from 'next/link';
import { HomeShell } from '@/components/home-shell';
import { CustomCursor } from '@/components/custom-cursor';
import { HeroMedia } from '@/components/hero-media';
import { HeroParticles } from '@/components/hero-particles';
import { HeroWebgl } from '@/components/hero-webgl';
import { LocalizedText } from '@/components/localized-text';
import { SiteHeader } from '@/components/site-header';

export default function Home() {
  return (
    <HomeShell>
      <CustomCursor />
      <main className="home">
        <section className="hero" aria-label="Homepage introduction">
          <HeroMedia />
          <HeroWebgl />
          <HeroParticles />
          <SiteHeader wordmark="雲住" split edition="" />
          <div className="hero-copy">
            <p className="hero-artist-name">
              <span className="hanja">雲住 金慧震</span>
            </p>
            <h1>
              <LocalizedText
                en={
                  <span className="hero-remember">
                    Re<i>mem</i>ber
                  </span>
                }
                ko={<span className="hero-remember">기억</span>}
              />
            </h1>
          </div>
          <div className="hero-actions">
            <p className="hero-note">
              <LocalizedText
                en={
                  <>
                    An image archive by <strong className="hanja">雲住 金慧震</strong>, where old symbols find new weather.
                  </>
                }
                ko={
                  <>
                    <strong className="hanja">雲住 金慧震</strong>이 오래된 상징에 새로운 날씨를 더해 만드는 이미지 아카이브.
                  </>
                }
              />
            </p>
            <Link className="hero-cta" href="/works">
              <LocalizedText en="ENTER ARCHIVE" ko="작품 보기" /> <span>↗</span>
            </Link>
          </div>
          <div className="hero-work-caption">
            <span>
              <LocalizedText en="UNTITLED — DRAGON AND CLOUDS" ko="무제 — 용과 구름" />
            </span>
            <span>
              <LocalizedText en="YEAR / MATERIAL / DIMENSIONS TO BE CONFIRMED" ko="연도 / 재료 / 크기 확인 중" />
            </span>
          </div>
          <p className="sr-only">
            Hero artwork: a blue-green dragon moving through layered cream and brown clouds, by 雲住 金慧震.
          </p>
          <p className="home-colophon">© K-MINHWA UNJOO.</p>
        </section>
      </main>
    </HomeShell>
  );
}
