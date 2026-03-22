'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Hero.module.css';

export function Hero() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const words = t.hero.headline.split(' ');

  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Radial accent glow */}
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <h1 className={styles.headline} aria-label={t.hero.headline}>
            {words.map((word, i) => (
              <span
                key={i}
                className={styles.word}
                style={
                  !reduced && started
                    ? {
                        animationName: 'wordReveal',
                        animationDuration: '0.5s',
                        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        animationFillMode: 'both',
                        animationDelay: `${200 + i * 55}ms`,
                      }
                    : { opacity: 1 }
                }
              >
                {word}
                {i < words.length - 1 ? '\u00a0' : ''}
              </span>
            ))}
          </h1>

          <p className={styles.subtext}>{t.hero.subtext}</p>

          <div className={styles.ctas}>
            <a href="#kontakt" className={styles.ctaPrimary}>
              {t.hero.ctaPrimary}
            </a>
            <a href="#teenused" className={styles.ctaGhost}>
              {t.hero.ctaGhost}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
