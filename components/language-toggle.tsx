'use client';

import { useEffect, useState } from 'react';

type Language = 'en' | 'ko';

export function LanguageToggle() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem('k-minhwa-language');
    const initial: Language = saved === 'ko' ? 'ko' : 'en';
    setLanguage(initial);
    document.documentElement.lang = initial;
    document.documentElement.dataset.language = initial;
  }, []);

  const selectLanguage = (next: Language) => {
    setLanguage(next);
    window.localStorage.setItem('k-minhwa-language', next);
    document.documentElement.lang = next;
    document.documentElement.dataset.language = next;
  };

  return <div className="language-toggle" aria-label="Language selection">
    <button type="button" className={language === 'en' ? 'is-active' : ''} onClick={() => selectLanguage('en')} aria-pressed={language === 'en'}>EN</button>
    <span aria-hidden="true">/</span>
    <button type="button" className={language === 'ko' ? 'is-active' : ''} onClick={() => selectLanguage('ko')} aria-pressed={language === 'ko'}>한</button>
  </div>;
}
