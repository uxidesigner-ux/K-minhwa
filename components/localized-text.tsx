import type { ReactNode } from 'react';

type LocalizedTextProps = {
  en: ReactNode;
  ko: ReactNode;
  className?: string;
  block?: boolean;
};

export function LocalizedText({ en, ko, className = '', block = false }: LocalizedTextProps) {
  return (
    <span className={`localized-text${block ? ' localized-text--block' : ''} ${className}`.trim()}>
      <span className="localized-text__en">{en}</span>
      <span className="localized-text__ko" lang="ko">
        {ko}
      </span>
    </span>
  );
}
