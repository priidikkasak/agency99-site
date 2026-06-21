'use client';

import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './Pricing.module.css';

export function Pricing() {
  const { t } = useI18n();
  const { tiers, sectionLabel, headline, subtext, note } = t.pricing;

  return (
    <Section id="hinnad">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{sectionLabel}</span>
        <h2 className={styles.headline}>{headline}</h2>
        {subtext && <p className={styles.subtext}>{subtext}</p>}
      </div>

      <div className={styles.grid}>
        {tiers.map((tier) => {
          const cardClass = [styles.card, tier.featured && styles.cardFeatured]
            .filter(Boolean)
            .join(' ');
          const tickClass = [styles.tick, tier.featured && styles.tickAccent]
            .filter(Boolean)
            .join(' ');
          return (
            <div key={tier.name} className={cardClass}>
              <div className={styles.cardHeader}>
                <div className={styles.nameRow}>
                  <span className={styles.planName}>{tier.name}</span>
                  {tier.badge && (
                    <span className={styles.badge}>{tier.badge}</span>
                  )}
                </div>
                <span className={styles.duration}>{tier.duration}</span>
              </div>

              <div className={styles.priceBlock}>
                <div className={styles.preRow}>
                  {tier.oldPrice && (
                    <span className={styles.oldPrice}>{tier.oldPrice}</span>
                  )}
                </div>
                <span className={styles.price}>{tier.price}</span>
                <div className={styles.postRow}>
                  {tier.oldPriceSuffix && (
                    <span className={styles.oldPriceSuffix}>
                      {tier.oldPriceSuffix}
                    </span>
                  )}
                  {tier.priceSuffix && (
                    <span className={styles.priceSuffix}>
                      {tier.priceSuffix}
                    </span>
                  )}
                </div>
              </div>

              <p className={styles.description}>{tier.description}</p>

              <div className={styles.divider} />

              {tier.featuresLabel && (
                <span className={styles.featuresLabel}>
                  {tier.featuresLabel}
                </span>
              )}

              <ul className={styles.features} role="list">
                {tier.features.map((f, i) => (
                  <li key={i} className={styles.feature}>
                    <span className={tickClass} aria-hidden="true">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#kontakt" className={styles.ctaPrimary}>
                {tier.cta}
              </a>
            </div>
          );
        })}
      </div>

      <p className={styles.note}>{note}</p>
    </Section>
  );
}
