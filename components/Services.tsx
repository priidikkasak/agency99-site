'use client';

import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './Services.module.css';

function ServiceCard({
  tag,
  title,
  body,
  featured,
}: {
  tag: string;
  title: string;
  body: string;
  featured?: boolean;
}) {
  return (
    <li
      className={[
        styles.card,
        featured ? styles.cardFeatured : '',
      ].join(' ')}
    >
      <span className={styles.tag}>{tag}</span>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.body}>{body}</p>
      </div>
      <span className={styles.arrow} aria-hidden="true">↗</span>
    </li>
  );
}

export function Services() {
  const { t } = useI18n();

  return (
    <Section>
      <div className={styles.header}>
        <span className={styles.label}>{t.services.sectionLabel}</span>
      </div>
      <ul className={styles.grid} role="list">
        {t.services.items.map((item, i) => (
          <ServiceCard
            key={i}
            tag={item.tag}
            title={item.title}
            body={item.body}
            featured={i === 0 || i === 3}
          />
        ))}
      </ul>
    </Section>
  );
}
