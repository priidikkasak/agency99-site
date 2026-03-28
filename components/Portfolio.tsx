'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './Portfolio.module.css';

const PREVIEW_COUNT = 3;

export function Portfolio() {
  const { t } = useI18n();
  const preview = t.portfolio.items.slice(0, PREVIEW_COUNT);

  return (
    <Section id="portfoolio">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{t.portfolio.sectionLabel}</span>
        <h2 className={styles.headline}>{t.portfolio.headline}</h2>
      </div>

      <ul className={styles.grid} role="list">
        {preview.map((item, i) => (
          <li key={item.id} className={[styles.card, i === 0 ? styles.cardFeatured : ''].join(' ')}>
            <div className={[styles.visual, styles[`visual${i + 1}` as keyof typeof styles]].join(' ')} aria-hidden="true" />
            <div className={styles.cardBody}>
              <div className={styles.cardTop}>
                <span className={styles.category}>{item.category}</span>
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.arrow} aria-label={t.portfolio.viewProject}>
                    ↗
                  </a>
                )}
                {!item.url && <span className={styles.arrowStatic} aria-hidden="true">↗</span>}
              </div>
              <h3 className={styles.title}>{item.title}</h3>
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

      <div className={styles.footer}>
        <Link href="/portfoolio" className={styles.viewAllBtn}>
          {t.portfolio.viewAll} →
        </Link>
      </div>
    </Section>
  );
}
