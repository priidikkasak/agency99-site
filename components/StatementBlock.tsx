'use client';

import { useI18n } from '@/lib/i18n/context';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import styles from './StatementBlock.module.css';

const COLS = 22;
const ROWS = 7;
const CONNECT_RADIUS = 200;

export function StatementBlock() {
  const { t } = useI18n();
  const blockRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const nextPosRef = useRef<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!blockRef.current) return;
    const el = blockRef.current;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const dots = useMemo(() => {
    if (size.w === 0 || size.h === 0) return [];
    const arr: { x: number; y: number }[] = [];
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        arr.push({
          x: ((c + 0.5) / COLS) * size.w,
          y: ((r + 0.5) / ROWS) * size.h,
        });
      }
    }
    return arr;
  }, [size]);

  const handleMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = blockRef.current?.getBoundingClientRect();
    if (!rect) return;
    nextPosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      if (nextPosRef.current) setCursor(nextPosRef.current);
      rafRef.current = null;
    });
  }, []);

  const handleLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setCursor(null);
  }, []);

  return (
    <section
      ref={blockRef}
      className={styles.block}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {size.w > 0 && (
        <svg
          className={styles.network}
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          aria-hidden
        >
          {dots.map((d, i) => {
            const dist = cursor
              ? Math.hypot(d.x - cursor.x, d.y - cursor.y)
              : Infinity;
            const strength =
              cursor && dist < CONNECT_RADIUS ? 1 - dist / CONNECT_RADIUS : 0;
            return (
              <circle
                key={`d${i}`}
                cx={d.x}
                cy={d.y}
                r={1.5 + strength * 2.5}
                className={styles.dot}
                style={{ opacity: 0.35 + strength * 0.6 }}
              />
            );
          })}
          {cursor &&
            dots.map((d, i) => {
              const dist = Math.hypot(d.x - cursor.x, d.y - cursor.y);
              if (dist >= CONNECT_RADIUS) return null;
              const strength = 1 - dist / CONNECT_RADIUS;
              return (
                <line
                  key={`l${i}`}
                  x1={cursor.x}
                  y1={cursor.y}
                  x2={d.x}
                  y2={d.y}
                  className={styles.link}
                  style={{
                    opacity: strength * 0.55,
                    strokeWidth: 0.6 + strength * 0.6,
                  }}
                />
              );
            })}
          {cursor && (
            <>
              <circle
                cx={cursor.x}
                cy={cursor.y}
                r={16}
                className={styles.cursorRing}
              />
              <circle
                cx={cursor.x}
                cy={cursor.y}
                r={4}
                className={styles.cursorDot}
              />
            </>
          )}
        </svg>
      )}
      <div className={styles.inner}>
        <p className={styles.line}>{t.statement.line1}</p>
        <p className={styles.line}>{t.statement.line2}</p>
      </div>
    </section>
  );
}
