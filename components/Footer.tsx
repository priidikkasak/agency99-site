'use client';

import { useI18n } from '@/lib/i18n/context';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <a href="#" className={styles.logo} aria-label="agency99 — home">
            agency99
          </a>
          <nav aria-label="Footer navigation">
            <ul className={styles.links} role="list">
              <li>
                <a href="#teenused" className={styles.link}>
                  {t.footer.links.services}
                </a>
              </li>
              <li>
                <a href="#hinnad" className={styles.link}>
                  {t.footer.links.pricing}
                </a>
              </li>
              <li>
                <a href="#protsess" className={styles.link}>
                  {t.footer.links.process}
                </a>
              </li>
              <li>
                <a href="#kontakt" className={styles.link}>
                  {t.footer.links.contact}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.divider} />
        <div className={styles.bottom}>
          <p className={styles.legal}>{t.footer.legal}</p>
          <div className={styles.socials}>
            <a
              href="https://github.com/priidikkasak"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
