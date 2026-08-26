import type { ReactNode } from 'react';

type LocalizedTextProps = {
  en: ReactNode;
  ko: ReactNode;
  className?: string;
};

export function LocalizedText({ en, ko, className = '' }: LocalizedTextProps) {
  return <span className={`localized-text ${className}`}><span className="localized-text__en">{en}</span><span className="localized-text__ko">{ko}</span></span>;
}
