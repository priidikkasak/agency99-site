'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/context';
import styles from './Nav.module.css';

const NAV_LINKS = [
  { key: 'services' as const, href: '#teenused' },
  { key: 'pricing' as const, href: '#hinnad' },
  { key: 'process' as const, href: '#protsess' },
  { key: 'contact' as const, href: '#kontakt' },
] as const;

const LANGS = [
  { code: 'ET' as const, flag: '🇪🇪', label: 'Eesti' },
  { code: 'EN' as const, flag: '🇬🇧', label: 'English' },
];

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-50% 0px -45% 0px' },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-lang-container]')) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [langOpen]);

  const currentLang = LANGS.find((l) => l.code === lang)!;
  const toggleLang = () => setLang(lang === 'ET' ? 'EN' : 'ET');

  return (
    <>
      <header className={[styles.header, scrolled ? styles.headerScrolled : ''].join(' ')}>
        <nav className={styles.nav} aria-label="Main navigation">
          {/* Logo */}
          <a href="#" className={styles.logoLink} aria-label="agency99 — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="agency99" className={styles.logoImg} />
          </a>

          {/* Center links */}
          <ul className={styles.links} role="list">
            {NAV_LINKS.map(({ key, href }) => {
              const id = href.slice(1);
              return (
                <li key={key}>
                  <a
                    href={href}
                    className={[styles.link, activeSection === id ? styles.active : ''].join(' ')}
                  >
                    {t.nav[key]}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right: lang dropdown + CTA */}
          <div className={styles.right}>
            <div className={styles.langContainer} data-lang-container>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={styles.langToggle}
                aria-label="Change language"
                aria-expanded={langOpen}
              >
                <span className={styles.langFlag}>{currentLang.flag}</span>
                <span className={styles.langCode}>{currentLang.code}</span>
                <span className={[styles.chevron, langOpen ? styles.chevronOpen : ''].join(' ')}>▾</span>
              </button>
              {langOpen && (
                <div className={styles.langDropdown}>
                  {LANGS.map(({ code, flag, label }) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangOpen(false); }}
                      className={[styles.langOption, lang === code ? styles.langOptionActive : ''].join(' ')}
                    >
                      <span className={styles.langFlag}>{flag}</span>
                      <span className={styles.langLabel}>{label}</span>
                      {lang === code && <span className={styles.langCheck}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href="#kontakt" className={styles.ctaBtn}>{t.nav.cta}</a>
          </div>

          {/* Mobile controls */}
          <div className={styles.mobileRight}>
            <button onClick={toggleLang} className={styles.langToggleMobile} aria-label="Toggle language">
              {currentLang.flag}
            </button>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Sulge menüü' : 'Ava menüü'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={[styles.bar, menuOpen ? styles.barOpen1 : ''].join(' ')} />
              <span className={[styles.bar, menuOpen ? styles.barOpen2 : ''].join(' ')} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay — outside header so z-index works correctly */}
      <div
        id="mobile-menu"
        className={[styles.overlay, menuOpen ? styles.overlayVisible : ''].join(' ')}
        aria-hidden={!menuOpen}
      >
        <ul className={styles.overlayLinks} role="list">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <a href={href} className={styles.overlayLink} onClick={() => setMenuOpen(false)}>
                {t.nav[key]}
              </a>
            </li>
          ))}
        </ul>
        <a href="#kontakt" className={styles.overlayCtaBtn} onClick={() => setMenuOpen(false)}>
          {t.nav.cta} →
        </a>
      </div>
    </>
  );
}
