import Link from 'next/link';
import { PublishedWorks } from '@/components/published-works';
import { SiteHeader } from '@/components/site-header';

export default function Works() {
  return <main><SiteHeader edition="INDEX / ARCHIVE"/><div className="page-intro"><p className="eyebrow">WORKS / 雲住 金慧震</p><h1>The archive<br/><i>in motion.</i></h1></div><PublishedWorks/><footer className="site-footer"><span>雲住 金慧震 / K—MINHWA</span><Link href="/artist">ARTIST ↗</Link></footer></main>;
}
