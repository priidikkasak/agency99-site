'use client';

import { useI18n } from '@/lib/i18n/context';
import { useRef, useState, useCallback } from 'react';
import styles from './StatementBlock.module.css';

export function StatementBlock() {
  const { t } = useI18n();
  const blockRef = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50, active: false });

  const handleMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = blockRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  }, []);

  const handleLeave = useCallback(() => {
    setPos((p) => ({ ...p, active: false }));
  }, []);

  return (
    <section
      ref={blockRef}
      className={styles.block}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        ['--mx' as string]: `${pos.x}%`,
        ['--my' as string]: `${pos.y}%`,
        ['--spot-opacity' as string]: pos.active ? 1 : 0,
      }}
    >
      <div className={styles.spotlight} aria-hidden />
      <div className={styles.grid} aria-hidden />
      <div className={styles.inner}>
        <p className={styles.line}>{t.statement.line1}</p>
        <p className={styles.line}>{t.statement.line2}</p>
      </div>
    </section>
  );
}
