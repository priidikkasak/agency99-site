'use client';

import { useI18n } from '@/lib/i18n/context';
import styles from './StatementBlock.module.css';

export function StatementBlock() {
  const { t } = useI18n();

  return (
    <section className={styles.block}>
      <div className={styles.inner}>
        <div className={styles.lines}>
          <p className={styles.line}>{t.statement.line1}</p>
          <p className={[styles.line, styles.lineIndent].join(' ')}>{t.statement.line2}</p>
        </div>
      </div>
    </section>
  );
}
