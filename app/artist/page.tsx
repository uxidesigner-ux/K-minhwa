import Link from 'next/link';
import { LocalizedText } from '@/components/localized-text';
import { SiteHeader } from '@/components/site-header';
import { siteCopy } from '@/lib/content';

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
      <SiteHeader wordmark="雲住" split edition="" />
      <div className="page-intro artist-intro">
        <p className="eyebrow">
          <LocalizedText en={artist.eyebrow.en} ko={artist.eyebrow.ko} />
        </p>
        <p className="artist-name-display">
          <span className="hanja">雲住 金慧震</span>
          <small>운주 김혜진</small>
        </p>
        <h1>
          <LocalizedText
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
            <LocalizedText en="SELECTED" ko="주요 이력" />
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
        </div>
      </section>
      <footer className="site-footer">
        <span className="hanja">雲住 金慧震</span>
        <span> / K—MINHWA</span>
        <Link href="/works">
          <LocalizedText en="WORKS" ko="작품" /> ↗
        </Link>
      </footer>
    </main>
  );
}
