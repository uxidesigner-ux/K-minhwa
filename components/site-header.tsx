import Link from 'next/link';
import { LanguageToggle } from '@/components/language-toggle';

type SiteHeaderProps = {
  edition: string;
  className?: string;
  navigation?: boolean;
  wordmark?: string;
  split?: boolean;
};

function Navigation() {
  return (
    <nav>
      <Link href="/works">
        <span className="i18n-en">WORKS</span>
        <span className="i18n-ko">작품</span>
      </Link>
      <Link href="/artist">
        <span className="i18n-en">ARTIST</span>
        <span className="i18n-ko">작가</span>
      </Link>
    </nav>
  );
}

export function SiteHeader({
  edition,
  className = '',
  navigation = true,
  wordmark = 'K—MINHWA',
  split = false,
}: SiteHeaderProps) {
  const mark = (
    <Link href="/" className="wordmark">
      {wordmark}
    </Link>
  );

  if (split) {
    return (
      <div className="home-chrome">
        <header className={`site-header home-header home-header--primary ${className}`}>
          {mark}
          {navigation && <Navigation />}
        </header>
        <div className="home-header home-header--locale">
          <LanguageToggle />
        </div>
      </div>
    );
  }

  return (
    <header className={`site-header ${className}`}>
      {mark}
      {navigation && <Navigation />}
      <div className="header-meta">
        <LanguageToggle />
        {edition && <span className="edition">{edition}</span>}
      </div>
    </header>
  );
}
