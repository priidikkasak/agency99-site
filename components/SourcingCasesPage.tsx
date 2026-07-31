'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './SourcingCasesPage.module.css';

export function SourcingCasesPage() {
  const { t } = useI18n();
  const { sectionLabel, headline, items, webPortfolioLabel, webPortfolioLink } =
    t.sourcingCases;

  return (
    <Section id="portfoolio-page">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{sectionLabel}</span>
        <h1 className={styles.headline}>{headline}</h1>
      </div>

      <ul className={styles.list} role="list">
        {items.map((item) => (
          <li key={item.tag} className={styles.row}>
            <div className={styles.meta}>
              <span className={styles.tag} aria-hidden="true">{item.tag}</span>
              <span className={styles.category}>{item.category}</span>
            </div>
            <h2 className={styles.title}>{item.title}</h2>
            <p className={styles.body}>{item.body}</p>
            <span className={styles.outcome}>{item.outcome}</span>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <span className={styles.footerLabel}>{webPortfolioLabel}</span>
        <Link href="/webportfolio" className={styles.footerLink}>
          {webPortfolioLink} →
        </Link>
      </div>
    </Section>
  );
}
