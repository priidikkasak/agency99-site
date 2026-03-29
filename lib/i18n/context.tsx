'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { et, type Translations } from './et';
import { en } from './en';

type Lang = 'ET' | 'EN';

interface I18nContextValue {
  t: Translations;
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ET');

  useEffect(() => {
    const stored = localStorage.getItem('lang');
    if (stored === 'ET' || stored === 'EN') {
      setLangState(stored);
    } else {
      // IP-based default: middleware sets ip_country cookie
      const country = document.cookie
        .split('; ')
        .find((r) => r.startsWith('ip_country='))
        ?.split('=')[1];
      setLangState(country === 'EE' ? 'ET' : 'EN');
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  const t = lang === 'ET' ? et : en;

  return (
    <I18nContext.Provider value={{ t, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
