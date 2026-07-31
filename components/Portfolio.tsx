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
            <span className={styles.ghostNum} aria-hidden="true">{item.tag}</span>

            <div className={styles.metaPill}>
              <span className={styles.metaNum} aria-hidden="true">{item.tag}</span>
              <span className={styles.metaDivider} aria-hidden="true" />
              <span className={styles.metaCategory}>{item.category}</span>
            </div>

            <h3 className={styles.title}>
              {item.title}
              <span className={styles.titleAccent} aria-hidden="true" />
            </h3>

            <p className={styles.body}>{item.body}</p>

            <span className={styles.outcome}>
              <span className={styles.outcomeIcon} aria-hidden="true">→</span>
              <span className={styles.outcomeDivider} aria-hidden="true" />
              <span className={styles.outcomeText}>{item.outcome}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
