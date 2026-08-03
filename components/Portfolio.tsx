'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import { SourcingCaseItem } from './SourcingCaseItem';
import styles from './Portfolio.module.css';

export function Portfolio() {
  const { t } = useI18n();
  const { sectionLabel, headline, viewAll, items } = t.sourcingCases;
  const featured = items.slice(0, 5);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const listRef = useRef<HTMLUListElement>(null);

  const focusItem = useCallback((index: number) => {
    const buttons =
      listRef.current?.querySelectorAll<HTMLButtonElement>('button[aria-expanded]');
    if (!buttons?.length) return;
    const wrapped = ((index % buttons.length) + buttons.length) % buttons.length;
    buttons[wrapped]?.focus();
  }, []);

  return (
    <Section id="portfoolio">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{sectionLabel}</span>
        <h2 className={styles.headline}>{headline}</h2>
      </div>

      <ul ref={listRef} className={styles.list} role="list">
        {featured.map((item, i) => (
          <SourcingCaseItem
            key={item.tag}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            onArrowNav={(dir) => {
              if (dir === 'first') focusItem(0);
              else if (dir === 'last') focusItem(featured.length - 1);
              else focusItem(i + dir);
            }}
            titleTag="h3"
          />
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
