'use client';

import { useI18n } from '@/lib/i18n/context';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Section } from './Section';
import styles from './Services.module.css';

function ServiceCard({
  tag,
  title,
  body,
  delay,
}: {
  tag: string;
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
      <span className={styles.tag}>{tag}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
    </li>
  );
}

export function Services() {
  const { t } = useI18n();

  return (
    <Section noReveal>
      <div className={styles.header}>
        <span className={styles.label}>{t.services.sectionLabel}</span>
        <h2 className={styles.headline}>{t.services.headline}</h2>
      </div>
      <ul className={styles.grid} role="list">
        {t.services.items.map((item, i) => (
          <ServiceCard
            key={i}
            tag={item.tag}
            title={item.title}
            body={item.body}
            delay={i * 100}
          />
        ))}
      </ul>
    </Section>
  );
}
