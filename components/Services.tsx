'use client';

import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './Services.module.css';

const SERVICE_META = [
  { icon: '○', chips: ['Next.js', 'Vercel', 'SEO'] },
  { icon: '□', chips: ['Stripe', 'Ostukorv'] },
  { icon: '△', chips: ['Supabase', 'API', 'Auth'] },
  { icon: '◇', chips: ['Logo', 'Bränding', 'UI/UX'] },
] as const;

function ServiceCard({
  tag,
  title,
  body,
  featured,
  icon,
  chips,
}: {
  tag: string;
  title: string;
  body: string;
  featured?: boolean;
  icon: string;
  chips: readonly string[];
}) {
  return (
    <li className={[styles.card, featured ? styles.cardFeatured : ''].join(' ')}>
      <span className={styles.ghostNum} aria-hidden="true">{tag}</span>
      <div className={styles.cardTop}>
        <span className={styles.icon} aria-hidden="true">{icon}</span>
        <span className={styles.arrow} aria-hidden="true">↗</span>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.body}>{body}</p>
        <div className={styles.chips}>
          {chips.map(chip => (
            <span key={chip} className={styles.chip}>{chip}</span>
          ))}
        </div>
      </div>
    </li>
  );
}

export function Services() {
  const { t } = useI18n();

  return (
    <Section id="teenused">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{t.services.sectionLabel}</span>
        <h2 className={styles.headline}>{t.services.headline}</h2>
      </div>
      <ul className={styles.grid} role="list">
        {t.services.items.map((item, i) => (
          <ServiceCard
            key={i}
            tag={item.tag}
            title={item.title}
            body={item.body}
            featured={i === 0 || i === 3}
            icon={SERVICE_META[i].icon}
            chips={SERVICE_META[i].chips}
          />
        ))}
      </ul>
    </Section>
  );
}
