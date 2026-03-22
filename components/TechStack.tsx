'use client';

import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './TechStack.module.css';

const TECH = [
  'Next.js',
  'React',
  'TypeScript',
  'Vercel',
  'Stripe',
  'Supabase',
  'n8n',
  'Make',
  'Framer Motion',
  'AI-powered',
] as const;

export function TechStack() {
  const { t } = useI18n();

  return (
    <Section>
      <div className={styles.header}>
        <span className={styles.label}>{t.techStack.sectionLabel}</span>
        <h2 className={styles.headline}>{t.techStack.headline}</h2>
      </div>
      <div className={styles.badges} role="list" aria-label="Technologies used">
        {TECH.map((name) => (
          <span key={name} className={styles.badge} role="listitem">
            {name}
          </span>
        ))}
      </div>
    </Section>
  );
}
