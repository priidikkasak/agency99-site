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
              <span className={styles.tag} aria-hidden="true">{item.tag}</span>
              <span className={styles.category}>{item.category}</span>
            </div>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.body}>{item.body}</p>
            <span className={styles.outcome}>{item.outcome}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
