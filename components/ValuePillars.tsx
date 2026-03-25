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
    <li className={styles.row}>
      <span className={styles.num} aria-hidden="true">{num}</span>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.body}>{body}</p>
      </div>
    </li>
  );
}

export function ValuePillars() {
  const { t } = useI18n();

  return (
    <Section>
      <div className={styles.header}>
        <h2 className={styles.label}>{t.pillars.sectionLabel}</h2>
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
