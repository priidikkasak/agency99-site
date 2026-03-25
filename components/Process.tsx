'use client';

import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './Process.module.css';

function ProcessStep({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <li className={styles.step}>
      <span className={styles.num} aria-hidden="true">{num}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
    </li>
  );
}

export function Process() {
  const { t } = useI18n();

  return (
    <Section id="protsess">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{t.process.sectionLabel}</span>
        <h2 className={styles.headline}>{t.process.headline}</h2>
      </div>
      <ol className={styles.steps} role="list">
        {t.process.steps.map((step, i) => (
          <ProcessStep
            key={i}
            num={step.num}
            title={step.title}
            body={step.body}
          />
        ))}
      </ol>
    </Section>
  );
}
