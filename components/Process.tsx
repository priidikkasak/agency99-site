'use client';

import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './Process.module.css';

export function Process() {
  const { t } = useI18n();
  const steps = t.process.steps;

  return (
    <Section id="protsess">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{t.process.sectionLabel}</span>
        <h2 className={styles.headline}>{t.process.headline}</h2>
      </div>
      <ol className={styles.steps} role="list">
        {steps.map((step, i) => (
          <li key={i} className={styles.step}>
            <div className={styles.marker} aria-hidden="true">
              <span className={styles.dot} />
              {i < steps.length - 1 && <span className={styles.line} />}
            </div>
            <span className={styles.num} aria-hidden="true">{step.num}</span>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.body}>{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
