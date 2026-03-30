'use client';

import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './PortfolioPage.module.css';

export function PortfolioPage() {
  const { t } = useI18n();

  return (
    <Section id="portfoolio-page">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{t.portfolio.sectionLabel}</span>
        <h1 className={styles.headline}>{t.portfolio.headline}</h1>
      </div>

      <ul className={styles.grid} role="list">
        {t.portfolio.items.map((item, i) => (
          <li key={item.id} className={styles.card}>
            <div className={styles.visual} aria-hidden="true">
              {item.image && <img src={item.image} alt="" className={styles.visualImg} loading="lazy" decoding="async" style={item.imageWidth ? { width: item.imageWidth } : undefined} />}
              <div className={styles.visualOverlay} />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardTop}>
                <span className={styles.category}>{item.category}</span>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.arrow} aria-label={t.portfolio.viewProject}>
                    ↗
                  </a>
                ) : (
                  <span className={styles.arrowStatic} aria-hidden="true">↗</span>
                )}
              </div>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.chips}>
                {item.chips.map(chip => (
                  <span key={chip} className={styles.chip}>{chip}</span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
