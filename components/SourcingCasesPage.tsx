'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import { SourcingCaseItem } from './SourcingCaseItem';
import styles from './SourcingCasesPage.module.css';

export function SourcingCasesPage() {
  const { t } = useI18n();
  const { sectionLabel, headline, items, webPortfolioLabel, webPortfolioLink } =
    t.sourcingCases;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const focusItem = useCallback((index: number) => {
    const buttons =
      listRef.current?.querySelectorAll<HTMLButtonElement>('button[aria-expanded]');
    if (!buttons?.length) return;
    const wrapped = ((index % buttons.length) + buttons.length) % buttons.length;
    buttons[wrapped]?.focus();
  }, []);

  return (
    <Section id="portfoolio-page">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{sectionLabel}</span>
        <h1 className={styles.headline}>{headline}</h1>
      </div>

      <ul ref={listRef} className={styles.list} role="list">
        {items.map((item, i) => (
          <SourcingCaseItem
            key={item.tag}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            onArrowNav={(dir) => {
              if (dir === 'first') focusItem(0);
              else if (dir === 'last') focusItem(items.length - 1);
              else focusItem(i + dir);
            }}
            titleTag="h2"
          />
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
