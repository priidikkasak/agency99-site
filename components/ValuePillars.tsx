'use client';

import { useI18n } from '@/lib/i18n/context';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Section } from './Section';
import styles from './ValuePillars.module.css';

function PillarCard({
  title,
  body,
  delay,
}: {
  title: string;
  body: string;
  delay: number;
}) {
  const [ref, inView] = useScrollReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className={['reveal', inView ? 'visible' : '', styles.card].join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.cardInner}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardBody}>{body}</p>
      </div>
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
      <ul className={styles.grid} role="list">
        {t.pillars.items.map((item, i) => (
          <PillarCard key={i} title={item.title} body={item.body} delay={i * 100} />
        ))}
      </ul>
    </Section>
  );
}
