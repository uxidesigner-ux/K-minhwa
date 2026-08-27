import type { Metadata } from 'next';
import Link from 'next/link';
import { LocalizedText } from '@/components/localized-text';
import { SiteHeader } from '@/components/site-header';
import { pageMeta, siteCopy } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: pageMeta.artist.title.en,
  description: pageMeta.artist.description.en,
  path: '/artist',
});

function Lines({ text }: { text: string }) {
  return text.split('\n').map((line, index) => (
    <span key={`${line}-${index}`}>
      {index > 0 && <br />}
      {line}
    </span>
  ));
}

export default function Artist() {
  const { artist } = siteCopy;
  return (
    <main>
      <SiteHeader wordmark="雲姝" split edition="" />
      <div className="page-intro artist-intro">
        <p className="eyebrow">
          <LocalizedText en={artist.eyebrow.en} ko={artist.eyebrow.ko} />
        </p>
        <p className="artist-name-display">
          <span className="hanja">雲姝 金慧震</span>
          <small>운주 김혜진</small>
        </p>
        <h1>
          <LocalizedText
            block
            en={
              <>
                The spirit of old paintings,
                <br />
                <i>in the colors of today.</i>
              </>
            }
            ko={<Lines text={artist.headline.ko} />}
          />
        </h1>
        <p className="artist-statement">
          <LocalizedText en={artist.statement.en} ko={artist.statement.ko} />
        </p>
        <p className="artist-practice">
          <LocalizedText en={artist.practice.en} ko={artist.practice.ko} />
        </p>
      </div>
      <section className="artist-columns">
        <div>
          <p className="eyebrow">
            <LocalizedText en="BIOGRAPHY" ko="약력" />
          </p>
          <div className="artist-bio">
            {artist.biography.en.map((_, index) => (
              <p key={`bio-${index}`}>
                <LocalizedText en={artist.biography.en[index]} ko={artist.biography.ko[index]} />
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">
            <LocalizedText en="EXHIBITIONS / AWARDS / COLLECTIONS" ko="전시 · 수상 · 소장" />
          </p>
          <ul className="artist-career-list">
            {artist.careers.en.map((_, index) => (
              <li key={`career-${index}`}>
                <LocalizedText en={artist.careers.en[index]} ko={artist.careers.ko[index]} />
              </li>
            ))}
          </ul>
          <p className="artist-career-note">
            <LocalizedText en={artist.careers.note.en} ko={artist.careers.note.ko} />
          </p>
          <div className="artist-contact">
            <p className="eyebrow">
              <LocalizedText en={artist.contact.label.en} ko={artist.contact.label.ko} />
            </p>
            <p>
              <LocalizedText en={artist.contact.body.en} ko={artist.contact.body.ko} />
            </p>
            <a href={`mailto:${artist.contact.email}`}>{artist.contact.email}</a>
            <p className="artist-career-note">
              <LocalizedText en={artist.contact.emailNote.en} ko={artist.contact.emailNote.ko} />
            </p>
          </div>
        </div>
      </section>
      <footer className="site-footer">
        <span className="hanja">雲姝 金慧震</span>
        <span> / K—MINHWA</span>
        <Link href="/works">
          <LocalizedText en="WORKS" ko="작품" /> ↗
        </Link>
      </footer>
    </main>
  );
}
