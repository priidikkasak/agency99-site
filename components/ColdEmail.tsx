'use client';

import { useI18n } from '@/lib/i18n/context';
import styles from './ColdEmail.module.css';

const WHATSAPP_URL = 'https://wa.me/3725100017';
const TELEGRAM_URL = 'https://t.me/agency99io';

export function ColdEmailPage() {
  const { t, lang } = useI18n();
  const c = t.coldEmailPage;

  return (
    <main className={styles.main}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <a href="/" className={styles.back}>← agency99.io</a>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h1 className={styles.headline}>
            {c.headline.split('\n').map((line, i) => (
              <span key={i} className={styles.headlineLine}>{line}</span>
            ))}
          </h1>
          <p className={styles.sub}>{c.sub}</p>
          <div className={styles.heroCtas}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
              {c.cta}
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaGhost}>
              Telegram
            </a>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className={styles.featuresSec}>
        <div className="container">
          <ul className={styles.grid} role="list">
            {c.features.map((f, i) => (
              <li key={i} className={styles.card}>
                <span className={styles.ghostNum} aria-hidden="true">{f.num}</span>
                <span className={styles.cardNum}>{f.num}</span>
                <h3 className={styles.cardTitle}>{f.title}</h3>
                <p className={styles.cardBody}>{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className={styles.ctaSec}>
        <div className={`container ${styles.ctaInner}`}>
          <div className={styles.ctaLeft}>
            <p className={styles.ctaHeadline}>
              {lang === 'ET' ? 'Valmis alustama?' : 'Ready to start?'}
            </p>
            <p className={styles.ctaNote}>{c.note}</p>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaLg}>
            {c.cta} →
          </a>
        </div>
      </section>

    </main>
  );
}
