'use client';

import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './Pricing.module.css';

export function Pricing() {
  const { t } = useI18n();
  const { starter, advanced } = t.pricing;

  return (
    <Section id="hinnad">
      <div className={styles.header}>
        <span className={styles.label}>{t.pricing.sectionLabel}</span>
        <h2 className={styles.headline}>{t.pricing.headline}</h2>
        <p className={styles.subtext}>{t.pricing.subtext}</p>
      </div>

      <div className={styles.grid}>
        {/* Starter */}
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <span className={styles.planName}>{starter.name}</span>
            <div className={styles.priceRow}>
              <span className={styles.price}>{starter.price}</span>
              <span className={styles.duration}>{starter.duration}</span>
            </div>
            <p className={styles.description}>{starter.description}</p>
          </div>
          <ul className={styles.features} role="list">
            {starter.features.map((f, i) => (
              <li key={i} className={styles.feature}>
                <span className={styles.featureIcon} aria-hidden="true">—</span>
                {f}
              </li>
            ))}
          </ul>
          <a href="#kontakt" className={styles.ctaGhost}>
            {starter.cta}
          </a>
        </div>

        {/* Advanced — featured */}
        <div className={[styles.card, styles.cardFeatured].join(' ')}>
          <div className={styles.cardTop}>
            <div className={styles.planNameRow}>
              <span className={styles.planName}>{advanced.name}</span>
              <span className={styles.badge}>{advanced.badge}</span>
            </div>
            <div className={styles.priceRow}>
              <span className={styles.price}>{advanced.price}</span>
              <span className={styles.duration}>{advanced.duration}</span>
            </div>
            <p className={styles.description}>{advanced.description}</p>
          </div>
          <ul className={styles.features} role="list">
            {advanced.features.map((f, i) => (
              <li key={i} className={styles.feature}>
                <span className={styles.featureIcon} aria-hidden="true">—</span>
                {f}
              </li>
            ))}
          </ul>
          <a href="#kontakt" className={styles.ctaPrimary}>
            {advanced.cta}
          </a>
        </div>
      </div>

      <p className={styles.note}>{t.pricing.note}</p>
    </Section>
  );
}
