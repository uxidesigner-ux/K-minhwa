import type { Metadata } from 'next';
import Link from 'next/link';
import { HomeShell } from '@/components/home-shell';
import { HeroMedia } from '@/components/hero-media';
import { HeroParticles } from '@/components/hero-particles';
import { HeroWebgl } from '@/components/hero-webgl';
import { LocalizedText } from '@/components/localized-text';
import { SiteHeader } from '@/components/site-header';
import { pageMeta, siteCopy } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: pageMeta.home.title.en,
  description: pageMeta.home.description.en,
  path: '/',
});

function Lines({ text }: { text: string }) {
  return text.split('\n').map((line, index) => (
    <span key={`${line}-${index}`}>
      {index > 0 && <br />}
      {line}
    </span>
  ));
}

export default function Home() {
  const { home } = siteCopy;
  return (
    <HomeShell>
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
                block
                en={
                  <span className="hero-headline">
                    Old symbols,
                    <br />
                    <i>newly alive.</i>
                  </span>
                }
                ko={
                  <span className="hero-headline">
                    <Lines text={home.headline.ko} />
                  </span>
                }
              />
            </h1>
          </div>
          <div className="hero-actions">
            <p className="hero-note">
              <LocalizedText en={home.introduction.en} ko={home.introduction.ko} />
            </p>
            <p className="hero-support">
              <LocalizedText en={home.support.en} ko={home.support.ko} />
            </p>
            <Link className="hero-cta" href="/works">
              <LocalizedText en={home.cta.en} ko={home.cta.ko} />
              <span aria-hidden="true"> ↗</span>
            </Link>
          </div>
          <div className="hero-work-caption">
            <span>
              <LocalizedText en={home.heroCaption.en} ko={home.heroCaption.ko} />
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
