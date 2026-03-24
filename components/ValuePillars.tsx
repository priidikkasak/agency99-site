'use client';

import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './ValuePillars.module.css';

function PillarRow({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <li
      className={styles.row}
    >
      <span className={styles.num}>{num}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
    </li>
  );
}

export function ValuePillars() {
  const { t } = useI18n();

  return (
    <Section id="teenused">
      <div className={styles.header}>
        <span className={styles.label}>{t.pillars.sectionLabel}</span>
      </div>
      <ul className={styles.list} role="list">
        {t.pillars.items.map((item, i) => (
          <PillarRow
            key={i}
            num={`0${i + 1}`}
            title={item.title}
            body={item.body}
          />
        ))}
      </ul>
    </Section>
  );
}
