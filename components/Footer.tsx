'use client';

import { useI18n } from '@/lib/i18n/context';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <a href="#" aria-label="agency99 - home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="agency99" className={styles.logoImg} />
        </a>
        <a href="mailto:priidik@agency99.io" className={styles.email}>
          priidik@agency99.io
        </a>
      </div>
    </footer>
  );
}
