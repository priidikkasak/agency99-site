'use client';

import { useI18n } from '@/lib/i18n/context';
import { useRef, useState, useEffect, useMemo } from 'react';
import styles from './StatementBlock.module.css';

const COLS = 22;
const ROWS = 7;
const MAX_PACKETS = 9;
const SPAWN_INTERVAL = 150;
const PACKET_DURATION_MIN = 420;
const PACKET_DURATION_MAX = 780;

type Packet = {
  id: number;
  fromIdx: number;
  toIdx: number;
  start: number;
  duration: number;
};

export function StatementBlock() {
  const { t } = useI18n();
  const blockRef = useRef<HTMLElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [packets, setPackets] = useState<Packet[]>([]);
  const [nowMs, setNowMs] = useState(0);

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

  useEffect(() => {
    if (dots.length === 0) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const live: Packet[] = [];
    let idCounter = 0;
    let lastSpawn = 0;
    let raf = 0;

    const tick = (now: number) => {
      for (let i = live.length - 1; i >= 0; i--) {
        if (now - live[i].start >= live[i].duration) live.splice(i, 1);
      }
      if (live.length < MAX_PACKETS && now - lastSpawn > SPAWN_INTERVAL) {
        lastSpawn = now;
        const fromIdx = Math.floor(Math.random() * dots.length);
        let toIdx = Math.floor(Math.random() * dots.length);
        if (toIdx === fromIdx) toIdx = (toIdx + 1) % dots.length;
        live.push({
          id: idCounter++,
          fromIdx,
          toIdx,
          start: now,
          duration:
            PACKET_DURATION_MIN +
            Math.random() * (PACKET_DURATION_MAX - PACKET_DURATION_MIN),
        });
      }
      setPackets(live.slice());
      setNowMs(now);
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
              r={1.5}
              className={styles.dot}
            />
          ))}
          {packets.map((p) => {
            const from = dots[p.fromIdx];
            const to = dots[p.toIdx];
            if (!from || !to) return null;
            const progress = Math.min(1, Math.max(0, (nowMs - p.start) / p.duration));
            const trailProgress = Math.max(0, progress - 0.28);
            const headX = from.x + (to.x - from.x) * progress;
            const headY = from.y + (to.y - from.y) * progress;
            const tailX = from.x + (to.x - from.x) * trailProgress;
            const tailY = from.y + (to.y - from.y) * trailProgress;
            const fadeIn = Math.min(1, progress / 0.08);
            const fadeOut = progress > 0.9 ? (1 - progress) / 0.1 : 1;
            const alpha = fadeIn * fadeOut;
            return (
              <g key={p.id} style={{ opacity: alpha }}>
                <line
                  x1={tailX}
                  y1={tailY}
                  x2={headX}
                  y2={headY}
                  className={styles.trail}
                />
                <circle cx={headX} cy={headY} r={2.6} className={styles.head} />
              </g>
            );
          })}
        </svg>
      )}
      <div className={styles.inner}>
        <p className={styles.line}>{t.statement.line1}</p>
        <p className={styles.line}>{t.statement.line2}</p>
      </div>
    </section>
  );
}
