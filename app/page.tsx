import Link from 'next/link';
import { HomeShell } from '@/components/home-shell';
import { HeroMedia } from '@/components/hero-media';
import { HeroParticles } from '@/components/hero-particles';
import { WorkCard } from '@/components/work-card';
import { works } from '@/lib/content';
export default function Home() {
  return <HomeShell><main><header className="site-header"><Link href="/" className="wordmark">K—MINHWA</Link><nav><Link href="/works">WORKS</Link><Link href="/artist">ARTIST</Link></nav><span className="edition">SEOUL / 2024—25</span></header><section className="hero"><HeroMedia /><HeroParticles /><div className="hero-copy"><p className="eyebrow">CONTEMPORARY MINHWA / ARCHIVE 01</p><h1><span>Things that</span><br/><i>remember</i> us.</h1><p className="hero-note">An evolving image archive by Korean artist K. — where old symbols find new weather.</p><Link className="hero-cta" href="/works">ENTER ARCHIVE <span>↗</span></Link></div><span className="scroll-cue">SCROLL TO ENTER <b>↓</b></span></section><section className="intro"><p className="eyebrow">SELECTED WORKS</p><h2>A living language of<br/><i>auspicious things.</i></h2><Link className="circle-link" href="/works">VIEW ALL WORKS <span>↗</span></Link></section><section className="home-grid">{works.slice(0,3).map((work,i)=><WorkCard href={`/works/${work.slug}`} image={work.image} index={i} title={work.title} year={work.year} medium={work.medium} isPlaceholder className={`home-card card-${i}`} key={work.slug}/>)}</section><footer className="site-footer"><span>K—MINHWA</span><span>SEOUL, KR<br/>© 2024—25</span><Link href="/artist">ABOUT THE ARTIST ↗</Link></footer></main></HomeShell>;
}
