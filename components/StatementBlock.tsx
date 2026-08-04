'use client';

import { useI18n } from '@/lib/i18n/context';
import { useRef, useState, useEffect, useMemo } from 'react';
import styles from './StatementBlock.module.css';

const CELL_TARGET = 68;
const STEP_MIN = 650;
const STEP_MAX = 1050;

const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export function StatementBlock() {
  const { t } = useI18n();
  const blockRef = useRef<HTMLElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [arrow, setArrow] = useState<{
    x: number;
    y: number;
    angle: number;
  } | null>(null);

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
    const cols = Math.max(6, Math.round(size.w / CELL_TARGET));
    const rows = Math.max(3, Math.round(size.h / CELL_TARGET));
    const stepX = size.w / cols;
    const stepY = size.h / rows;
    const arr: { x: number; y: number }[] = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        arr.push({
          x: stepX * (c + 0.5),
          y: stepY * (r + 0.5),
        });
      }
    }
    return arr;
  }, [size]);

  useEffect(() => {
    if (dots.length === 0) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const d = dots[0];
      setArrow({ x: d.x, y: d.y, angle: 0 });
      return;
    }

    let fromIdx = Math.floor(Math.random() * dots.length);
    let toIdx = Math.floor(Math.random() * dots.length);
    if (toIdx === fromIdx) toIdx = (toIdx + 1) % dots.length;
    let start = performance.now();
    let duration = STEP_MIN + Math.random() * (STEP_MAX - STEP_MIN);
    let raf = 0;

    const tick = (now: number) => {
      const from = dots[fromIdx];
      const to = dots[toIdx];
      const progress = Math.min(1, (now - start) / duration);
      const eased = easeInOut(progress);
      const x = from.x + (to.x - from.x) * eased;
      const y = from.y + (to.y - from.y) * eased;
      const angle =
        Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);
      setArrow({ x, y, angle });

      if (progress >= 1) {
        fromIdx = toIdx;
        let next = Math.floor(Math.random() * dots.length);
        while (next === fromIdx) next = Math.floor(Math.random() * dots.length);
        toIdx = next;
        start = now;
        duration = STEP_MIN + Math.random() * (STEP_MAX - STEP_MIN);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dots]);

  return (
    <section ref={blockRef} className={styles.block}>
      {size.w > 0 && (
        <svg
          className={styles.network}
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          aria-hidden
        >
          {dots.map((d, i) => (
            <circle
              key={`d${i}`}
              cx={d.x}
              cy={d.y}
              r={1.2}
              className={styles.dot}
            />
          ))}
          {arrow && (
            <g
              transform={`translate(${arrow.x} ${arrow.y}) rotate(${arrow.angle})`}
            >
              <polygon
                points="-10,-7 12,0 -10,7 -5,0"
                className={styles.arrow}
              />
            </g>
          )}
        </svg>
      )}
      <div className={styles.inner}>
        <p className={styles.line}>{t.statement.line1}</p>
        {t.statement.line2 && <p className={styles.line}>{t.statement.line2}</p>}
      </div>
    </section>
  );
}
