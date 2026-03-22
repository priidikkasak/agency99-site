'use client';

import { useI18n } from '@/lib/i18n/context';
import { Section } from './Section';
import styles from './FinalCTA.module.css';

export function FinalCTA() {
  const { t, lang } = useI18n();

  return (
    <Section id="kontakt" className={styles.ctaSection}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.split}>
        <div className={styles.left}>
          <h2 className={styles.headline}>{t.finalCta.headline}</h2>
          <p className={styles.subtext}>{t.finalCta.subtext}</p>
        </div>

        <div className={styles.right}>
          <a
            href="mailto:hello@agency99.ee"
            className={styles.email}
            aria-label="Email: hello@agency99.ee"
          >
            hello@agency99.ee
          </a>

          <a href="mailto:hello@agency99.ee" className={styles.cta}>
            {t.finalCta.cta} →
          </a>

          <span className={styles.note}>
            {lang === 'ET' ? 'Vastus 24 tunni jooksul.' : 'Response within 24 hours.'}
          </span>
        </div>
      </div>
    </Section>
  );
}
