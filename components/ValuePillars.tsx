'use client';

import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './ValuePillars.module.css';

const PILLAR_META = [
  { icon: '◉', pill: 'GLOBAL' },
  { icon: '✦', pill: 'AI + HUMAN' },
  { icon: '⌘', pill: '10+ YEARS' },
];

export function ValuePillars() {
  const { t } = useI18n();

  return (
    <Section>
      <div className={styles.header}>
        <h2 className={styles.label}>{t.pillars.sectionLabel}</h2>
      </div>
      <ul className={styles.grid} role="list">
        {t.pillars.items.map((item, i) => {
          const meta = PILLAR_META[i] ?? PILLAR_META[0];
          return (
            <li key={i} className={styles.card}>
              <span className={styles.ghostNum} aria-hidden="true">{`0${i + 1}`}</span>
              <div className={styles.cardHead}>
                <span className={styles.num} aria-hidden="true">{`0${i + 1}`}</span>
                <span className={styles.pill}>
                  <span className={styles.pillIcon} aria-hidden="true">{meta.icon}</span>
                  <span className={styles.pillDivider} aria-hidden="true" />
                  <span className={styles.pillLabel}>{meta.pill}</span>
                </span>
              </div>
              <h3 className={styles.title}>
                {item.title}
                <span className={styles.titleAccent} aria-hidden="true" />
              </h3>
              <p className={styles.body}>{item.body}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
