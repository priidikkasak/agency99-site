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

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleLang = () => setLang(lang === 'ET' ? 'EN' : 'ET');

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
          <a href="#" className={styles.logo} aria-label="agency99 — avaleht">
            agency99
          </a>

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
          <li>
            <button onClick={toggleLang} className={styles.langToggle} aria-label={`Switch to ${t.nav.langToggle}`}>
              {t.nav.langToggle}
            </button>
          </li>
          <li>
            <a href="#kontakt" className={styles.ctaBtn}>{t.nav.cta}</a>
          </li>
        </ul>

        <div className={styles.mobileRight}>
          <button onClick={toggleLang} className={styles.langToggle} aria-label={`Switch to ${t.nav.langToggle}`}>
            {t.nav.langToggle}
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
    </header>
  );
}
