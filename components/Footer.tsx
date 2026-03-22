'use client';

import { useI18n } from '@/lib/i18n/context';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        {/* Top: large logo */}
        <div className={styles.logoRow}>
          <a href="#" aria-label="agency99 — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="agency99" className={styles.logoImg} />
          </a>
        </div>

        {/* Mid: email + nav */}
        <div className={styles.mid}>
          <a href="mailto:hello@agency99.ee" className={styles.email}>
            hello@agency99.ee
          </a>
          <nav aria-label="Footer navigation">
            <ul className={styles.links} role="list">
              <li><a href="#teenused" className={styles.link}>{t.footer.links.services}</a></li>
              <li><a href="#hinnad" className={styles.link}>{t.footer.links.pricing}</a></li>
              <li><a href="#protsess" className={styles.link}>{t.footer.links.process}</a></li>
              <li><a href="#kontakt" className={styles.link}>{t.footer.links.contact}</a></li>
            </ul>
          </nav>
        </div>

        {/* Bottom: legal */}
        <div className={styles.bottom}>
          <p className={styles.legal}>{t.footer.legal}</p>
        </div>

      </div>
    </footer>
  );
}
