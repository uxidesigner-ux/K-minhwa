import Link from 'next/link';
import { PublishedWorks } from '@/components/published-works';

export default function Works() {
  return <main><header className="site-header"><Link href="/" className="wordmark">K—MINHWA</Link><nav><Link href="/works">WORKS</Link><Link href="/artist">ARTIST</Link></nav><span className="edition">INDEX / ARCHIVE</span></header><div className="page-intro"><p className="eyebrow">WORKS / 2022—24</p><h1>The archive<br/><i>in motion.</i></h1></div><PublishedWorks/><footer className="site-footer"><span>K—MINHWA</span><Link href="/artist">ARTIST ↗</Link></footer></main>;
}
