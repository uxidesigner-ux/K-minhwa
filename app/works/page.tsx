import Link from 'next/link';
import { LocalizedText } from '@/components/localized-text';
import { PublishedWorks } from '@/components/published-works';
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

export default function Works() {
  const { works: copy } = siteCopy;
  return (
    <main>
      <SiteHeader wordmark="雲住" split edition="" />
      <div className="page-intro">
        <p className="eyebrow">
          <LocalizedText en="WORKS / 雲住 金慧震" ko="작품 / 雲住 金慧震" />
        </p>
        <h1>
          <LocalizedText
            en={
              <>
                The archive,
                <br />
                <i>alive in motion.</i>
              </>
            }
            ko={<Lines text={copy.title.ko} />}
          />
        </h1>
        <p className="page-intro-body">
          <LocalizedText en={copy.introduction.en} ko={copy.introduction.ko} />
        </p>
      </div>
      <PublishedWorks />
      <footer className="site-footer">
        <span className="hanja">雲住 金慧震</span>
        <span> / K—MINHWA</span>
        <Link href="/artist">
          <LocalizedText en="ARTIST" ko="작가" /> ↗
        </Link>
      </footer>
    </main>
  );
}
