'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Hero.module.css';

export function Hero() {
  const { t, lang } = useI18n();
  const reduced = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const words = t.hero.headline.split(' ');

  const stats = lang === 'ET'
    ? [
        { value: '€500+', label: 'alates' },
        { value: '7', label: 'päeva max' },
        { value: '∞', label: 'kohandatud' },
      ]
    : [
        { value: '€500+', label: 'starting from' },
        { value: '7', label: 'days max' },
        { value: '∞', label: 'custom' },
      ];

  return (
    <section className={styles.hero} aria-label="Hero">
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
                        animationDuration: '0.55s',
                        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        animationFillMode: 'both',
                        animationDelay: `${150 + i * 60}ms`,
                      }
                    : { opacity: 1 }
                }
              >
                {word}
                {i < words.length - 1 ? '\u00a0' : ''}
              </span>
            ))}
          </h1>

          <p
            className={styles.subtext}
            style={
              !reduced && started
                ? { animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.55s both' }
                : { opacity: 1 }
            }
          >
            {t.hero.subtext}
          </p>

          <div
            className={styles.ctas}
            style={
              !reduced && started
                ? { animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.7s both' }
                : { opacity: 1 }
            }
          >
            <a href="#kontakt" className={styles.ctaPrimary}>
              {t.hero.ctaPrimary}
            </a>
            <a href="#teenused" className={styles.ctaGhost}>
              {t.hero.ctaGhost} ↓
            </a>
          </div>
        </div>

        {/* Stat strip */}
        <div
          className={styles.stats}
          style={
            !reduced && started
              ? { animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.9s both' }
              : { opacity: 1 }
          }
        >
          {stats.map((s, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
