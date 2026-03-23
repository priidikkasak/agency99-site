'use client';

import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './Process.module.css';

function ProcessStep({
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
  return (
    <li
      className={styles.step}
    >
      <span className={styles.num} aria-hidden="true">{num}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
    </li>
  );
}

export function Process() {
  const { t } = useI18n();

  return (
    <Section id="protsess" noReveal>
      <div className={styles.header}>
        <span className={styles.label}>{t.process.sectionLabel}</span>
      </div>
      <ol className={styles.steps} role="list">
        {t.process.steps.map((step, i) => (
          <ProcessStep
            key={i}
            num={step.num}
            title={step.title}
            body={step.body}
            delay={i * 100}
          />
        ))}
      </ol>
    </Section>
  );
}
