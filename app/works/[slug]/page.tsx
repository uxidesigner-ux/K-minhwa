import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LocalizedText } from '@/components/localized-text';
import { SiteHeader } from '@/components/site-header';
import { works } from '@/lib/content';

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = works.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const work = works[index];
  const previous = works[(index - 1 + works.length) % works.length];
  const next = works[(index + 1) % works.length];
  const metaParts = [work.year, work.medium].filter(Boolean);

  return (
    <main>
      <SiteHeader wordmark="雲住" split edition="" />
      <section className="detail">
        <div
          className={`detail-image art-image${work.imageConfirmed ? '' : ' art-image--plate'}`}
          style={{ backgroundImage: `url(${work.image})` }}
          role="img"
          aria-label={work.imageAlt.en}
        />
        <div className="detail-copy">
          {metaParts.length > 0 && <p className="eyebrow">{metaParts.join(' / ')}</p>}
          <h1>
            <LocalizedText en={work.title.en} ko={work.title.ko} />
          </h1>
          <p>
            <LocalizedText en={work.description.en} ko={work.description.ko} />
          </p>
          {work.sourceNote && (
            <p className="detail-source">
              <LocalizedText en={work.sourceNote.en} ko={work.sourceNote.ko} />
            </p>
          )}
          {!work.imageConfirmed && (
            <p className="detail-source">
              <LocalizedText
                en="Original artwork photography is pending. This archive plate is temporary documentation."
                ko="원본 작품 사진 확인 전입니다. 현재 이미지는 임시 아카이브 플레이트입니다."
              />
            </p>
          )}
          <Link href="/works" className="text-link">
            <LocalizedText en="← BACK TO WORKS" ko="← 작품 목록으로" />
          </Link>
        </div>
      </section>
      <nav className="work-pagination" aria-label="Artwork pagination">
        <Link href={`/works/${previous.slug}`} className="work-pagination-link work-pagination-link--previous">
          <div
            className={`work-pagination-thumb art-image${previous.imageConfirmed ? '' : ' art-image--plate'}`}
            style={{ backgroundImage: `url(${previous.image})` }}
            role="img"
            aria-label={previous.imageAlt.en}
          />
          <span className="work-pagination-label">
            <LocalizedText en="← PREVIOUS" ko="← 이전 작품" />
          </span>
          <strong>
            <LocalizedText en={previous.title.en} ko={previous.title.ko} />
          </strong>
        </Link>
        <Link href={`/works/${next.slug}`} className="work-pagination-link work-pagination-link--next">
          <div
            className={`work-pagination-thumb art-image${next.imageConfirmed ? '' : ' art-image--plate'}`}
            style={{ backgroundImage: `url(${next.image})` }}
            role="img"
            aria-label={next.imageAlt.en}
          />
          <span className="work-pagination-label">
            <LocalizedText en="NEXT →" ko="다음 작품 →" />
          </span>
          <strong>
            <LocalizedText en={next.title.en} ko={next.title.ko} />
          </strong>
        </Link>
      </nav>
    </main>
  );
}
