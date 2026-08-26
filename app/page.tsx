import Link from 'next/link';
import { HomeShell } from '@/components/home-shell';
import { CustomCursor } from '@/components/custom-cursor';
import { HeroMedia } from '@/components/hero-media';
import { HeroParticles } from '@/components/hero-particles';
import { HeroWebgl } from '@/components/hero-webgl';
export default function Home() {
  return <HomeShell><CustomCursor/><main className="home"><section className="hero"><HeroMedia /><HeroWebgl /><HeroParticles /><header className="site-header home-header"><Link href="/" className="wordmark">K—MINHWA</Link><nav><Link href="/works">WORKS</Link><Link href="/artist">ARTIST</Link></nav><span className="edition">SEOUL / 2024—25</span></header><div className="hero-copy"><p className="eyebrow">CONTEMPORARY MINHWA / ARCHIVE 01</p><h1><span>Things that</span><br/><i>remember</i> us.</h1><p className="hero-note">An evolving image archive by Korean artist K. — where old symbols find new weather.</p><Link className="hero-cta" href="/works">ENTER ARCHIVE <span>↗</span></Link></div><span className="scroll-cue">ARCHIVE / ENTER <b>↓</b></span><footer className="site-footer home-footer"><span>K—MINHWA / 01</span><span>SEOUL, KR<br/>© 2024—25</span><Link href="/artist">ARTIST NOTE ↗</Link></footer></section></main></HomeShell>;
}
