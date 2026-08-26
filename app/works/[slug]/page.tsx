import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { works } from '@/lib/content';

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = works.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const work = works[index];
  const previous = works[(index - 1 + works.length) % works.length];
  const next = works[(index + 1) % works.length];

  return <main><SiteHeader edition="WORK / 雲住 金慧震"/><section className="detail"><div className="detail-image art-image" style={{ backgroundImage: `url(${work.image})` }} role="img" aria-label={work.imageAlt}/><div className="detail-copy"><p className="eyebrow">{work.year} / {work.medium}</p><h1>{work.title}</h1><p>{work.description}</p><Link href="/works" className="text-link">← BACK TO WORKS</Link></div></section><nav className="work-pagination" aria-label="Artwork pagination"><Link href={`/works/${previous.slug}`} className="work-pagination-link work-pagination-link--previous"><div className="work-pagination-thumb art-image" style={{ backgroundImage: `url(${previous.image})` }} role="img" aria-label={previous.imageAlt}/><span className="work-pagination-label">← PREVIOUS</span><strong>{previous.title}</strong></Link><Link href={`/works/${next.slug}`} className="work-pagination-link work-pagination-link--next"><div className="work-pagination-thumb art-image" style={{ backgroundImage: `url(${next.image})` }} role="img" aria-label={next.imageAlt}/><span className="work-pagination-label">NEXT →</span><strong>{next.title}</strong></Link></nav></main>;
}
