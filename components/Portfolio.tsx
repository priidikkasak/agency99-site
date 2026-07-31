'use client';

import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './Portfolio.module.css';

export function Portfolio() {
  const { t } = useI18n();
  const { sectionLabel, headline, items } = t.sourcingCases;

  return (
    <Section id="portfoolio">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{sectionLabel}</span>
        <h2 className={styles.headline}>{headline}</h2>
      </div>

      <ul className={styles.list} role="list">
        {items.map((item) => (
          <li key={item.tag} className={styles.row}>
            <div className={styles.meta}>
              <div className={styles.metaLeft}>
                <span className={styles.tag} aria-hidden="true">{item.tag}</span>
                <span className={styles.dot} aria-hidden="true">/</span>
                <span className={styles.category}>{item.category}</span>
              </div>
              <span className={styles.outcome}>{item.outcome}</span>
            </div>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.body}>{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
