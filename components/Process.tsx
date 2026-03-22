'use client';

import { useI18n } from '@/lib/i18n/context';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Section } from './Section';
import styles from './Process.module.css';

function ProcessStep({
  num,
  title,
  body,
  delay,
  isLast,
}: {
  num: string;
  title: string;
  body: string;
  delay: number;
  isLast: boolean;
}) {
  const [ref, inView] = useScrollReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className={['reveal', inView ? 'visible' : '', styles.step].join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.stepTop}>
        <span className={styles.num}>{num}</span>
        {!isLast && <div className={styles.connector} aria-hidden="true" />}
      </div>
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
        <h2 className={styles.headline}>{t.process.headline}</h2>
      </div>
      <ol className={styles.steps} role="list">
        {t.process.steps.map((step, i) => (
          <ProcessStep
            key={i}
            num={step.num}
            title={step.title}
            body={step.body}
            delay={i * 100}
            isLast={i === t.process.steps.length - 1}
          />
        ))}
      </ol>
    </Section>
  );
}
