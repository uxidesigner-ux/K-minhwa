import Link from 'next/link';
import { LanguageToggle } from '@/components/language-toggle';

type SiteHeaderProps = {
  edition: string;
  className?: string;
  navigation?: boolean;
};

export function SiteHeader({ edition, className = '', navigation = true }: SiteHeaderProps) {
  return <header className={`site-header ${className}`}><Link href="/" className="wordmark">K—MINHWA</Link>{navigation && <nav><Link href="/works"><span className="i18n-en">WORKS</span><span className="i18n-ko">작품</span></Link><Link href="/artist"><span className="i18n-en">ARTIST</span><span className="i18n-ko">작가</span></Link></nav>}<div className="header-meta"><LanguageToggle/><span className="edition">{edition}</span></div></header>;
}
