'use client';

import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './FinalCTA.module.css';

export function FinalCTA() {
  const { t } = useI18n();

  return (
    <Section id="kontakt" className={styles.ctaSection}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <h2 className={styles.headline}>{t.finalCta.headline}</h2>
        <p className={styles.subtext}>{t.finalCta.subtext}</p>
        <a href="mailto:hello@agency99.ee" className={styles.cta}>
          {t.finalCta.cta}
        </a>
      </div>
    </Section>
  );
}
