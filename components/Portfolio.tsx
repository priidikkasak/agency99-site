'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './Portfolio.module.css';

export function Portfolio() {
  const { t } = useI18n();
  const { sectionLabel, headline, viewAll, items } = t.sourcingCases;
  const featured = items.slice(0, 5);

  return (
    <Section id="portfoolio">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{sectionLabel}</span>
        <h2 className={styles.headline}>{headline}</h2>
      </div>

      <ul className={styles.list} role="list">
        {featured.map((item) => (
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
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <Link href="/portfoolio" className={styles.footerLink}>
          {viewAll} →
        </Link>
      </div>
    </Section>
  );
}
