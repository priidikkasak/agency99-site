'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" aria-label="agency99 - home" className={styles.logoLink}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="agency99" className={styles.logoImg} />
        </Link>
        <a href="mailto:priidik@agency99.io" className={styles.email}>
          priidik@agency99.io
        </a>
      </div>
    </footer>
  );
}
