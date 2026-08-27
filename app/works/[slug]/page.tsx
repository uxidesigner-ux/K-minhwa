import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LocalizedText } from '@/components/localized-text';
import { SiteHeader } from '@/components/site-header';
import { works, pageMeta } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((item) => item.slug === slug);
  if (!work) return {};
  return buildPageMetadata({
    title: `${work.title.en} · 雲姝`,
    description: work.description.en.slice(0, 160),
    path: `/works/${work.slug}`,
    image: work.imageConfirmed ? work.image : undefined,
    imageAlt: work.imageConfirmed ? work.imageAlt.en : pageMeta.defaultOgAlt,
    type: 'article',
  });
}

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
      <SiteHeader wordmark="雲姝" split edition="" />
      <section className="detail">
        <div className={`detail-image art-image${work.imageConfirmed ? '' : ' art-image--plate'}`}>
          {work.image.endsWith('.svg') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={work.image} alt={work.imageAlt.en} />
          ) : (
            <Image src={work.image} alt={work.imageAlt.en} width={1400} height={1800} sizes="(max-width:700px) 100vw, 60vw" priority />
          )}
        </div>
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
          <div className="detail-nav">
            <Link href="/works" className="text-link">
              <LocalizedText en="← BACK TO WORKS" ko="← 작품 목록으로" />
            </Link>
            <Link href={`/works/${previous.slug}`} className="text-link">
              <LocalizedText en="← Previous" ko="← 이전 작품" />
            </Link>
            <Link href={`/works/${next.slug}`} className="text-link">
              <LocalizedText en="Next →" ko="다음 작품 →" />
            </Link>
          </div>
        </div>
      </section>
      <nav className="work-pagination" aria-label="Artwork pagination">
        <Link href={`/works/${previous.slug}`} className="work-pagination-link work-pagination-link--previous">
          <div className={`work-pagination-thumb art-image${previous.imageConfirmed ? '' : ' art-image--plate'}`}>
            {previous.image.endsWith('.svg') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previous.image} alt={previous.imageAlt.en} />
            ) : (
              <Image src={previous.image} alt={previous.imageAlt.en} width={800} height={1000} sizes="40vw" />
            )}
          </div>
          <span className="work-pagination-label">
            <LocalizedText en="← PREVIOUS" ko="← 이전 작품" />
          </span>
          <strong>
            <LocalizedText en={previous.title.en} ko={previous.title.ko} />
          </strong>
        </Link>
        <Link href={`/works/${next.slug}`} className="work-pagination-link work-pagination-link--next">
          <div className={`work-pagination-thumb art-image${next.imageConfirmed ? '' : ' art-image--plate'}`}>
            {next.image.endsWith('.svg') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={next.image} alt={next.imageAlt.en} />
            ) : (
              <Image src={next.image} alt={next.imageAlt.en} width={800} height={1000} sizes="40vw" />
            )}
          </div>
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
