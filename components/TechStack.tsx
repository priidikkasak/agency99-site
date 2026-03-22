'use client';

import { useI18n } from '@/lib/i18n/context';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './TechStack.module.css';

const ITEMS = [
  'Next.js', 'React', 'TypeScript', 'Vercel', 'Stripe',
  'Supabase', 'n8n', 'Make', 'Framer Motion', 'AI-powered',
  'Next.js', 'React', 'TypeScript', 'Vercel', 'Stripe',
  'Supabase', 'n8n', 'Make', 'Framer Motion', 'AI-powered',
];

export function TechStack() {
  const { t } = useI18n();
  const reduced = useReducedMotion();

  return (
    <section className={styles.section} aria-label={t.techStack.sectionLabel}>
      <div className={`container ${styles.headerWrap}`}>
        <span className={styles.label}>{t.techStack.sectionLabel}</span>
        <h2 className={styles.headline}>{t.techStack.headline}</h2>
      </div>

      <div className={styles.marqueeWrap} aria-hidden="true">
        <div
          className={styles.track}
          style={reduced ? { animation: 'none' } : undefined}
        >
          {ITEMS.map((name, i) => (
            <span key={i} className={styles.item}>
              {name}
              <span className={styles.sep}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
