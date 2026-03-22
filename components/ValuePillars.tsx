'use client';

import { useI18n } from '@/lib/i18n/context';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Section } from './Section';
import styles from './ValuePillars.module.css';

function PillarRow({
  num,
  title,
  body,
  delay,
}: {
  num: string;
  title: string;
  body: string;
  delay: number;
}) {
  const [ref, inView] = useScrollReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className={['reveal', inView ? 'visible' : '', styles.row].join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
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
    <Section id="teenused" noReveal>
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
            delay={i * 80}
          />
        ))}
      </ul>
    </Section>
  );
}
