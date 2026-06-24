'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CONTENT_ITEMS, type ContentItem, type ItemLen } from '@/lib/content/items';
import styles from './ContentStudio.module.css';

type Typeface = 'serif-a' | 'serif-b' | 'sans';
type Align = 'center' | 'left';
type Format = '4:5' | '1:1' | '9:16';
type Motion = 'none' | 'stagger' | 'bloom' | 'type' | 'broken';
type Texture = 'clean' | 'frame' | 'halo' | 'sigil';

const FORMATS: Record<Format, { w: number; h: number; label: string }> = {
  '4:5': { w: 1080, h: 1350, label: 'IG 4:5' },
  '1:1': { w: 1080, h: 1080, label: 'IG 1:1' },
  '9:16': { w: 1080, h: 1920, label: 'IG 9:16' },
};

const TYPEFACES: Array<{ key: Typeface; label: string; cssVar: string }> = [
  { key: 'serif-a', label: 'Instrument Serif', cssVar: 'var(--font-instrument-serif)' },
  { key: 'serif-b', label: 'Cormorant Garamond', cssVar: 'var(--font-cormorant)' },
  { key: 'sans', label: 'System Sans', cssVar: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" },
];

const MOTIONS: Array<{ key: Motion; label: string }> = [
  { key: 'none', label: 'None' },
  { key: 'stagger', label: 'Stagger' },
  { key: 'bloom', label: 'Bloom' },
  { key: 'type', label: 'Type' },
  { key: 'broken', label: 'Broken' },
];

const TEXTURES: Array<{ key: Texture; label: string }> = [
  { key: 'clean', label: 'Clean' },
  { key: 'frame', label: 'Frame' },
  { key: 'halo', label: 'Halo' },
  { key: 'sigil', label: 'Sigil' },
];

const LENGTHS: number[] = [4, 6, 8];
const ALIGNS: Align[] = ['center', 'left'];
const FORMAT_KEYS: Format[] = ['4:5', '1:1', '9:16'];

const ACCENT = '#9B8BFF';
const ACCENT_RGB = '155, 139, 255';
const INK = '#F0EDE6';
const INK_DIM = '#8A8880';
const BG = '#000000';
const BRAND = 'agency99';
const BRAND_INITIALS = 'A99';

const SPEED_MIN = 0.25;
const SPEED_MAX = 4;
const SPEED_DEFAULT = 1;

// Log scale: speed = 2^(t * 4 - 2)
function tToSpeed(t: number): number {
  return Math.pow(2, t * 4 - 2);
}
function speedToT(s: number): number {
  return (Math.log2(s) + 2) / 4;
}
function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}
function formatSpeed(s: number): string {
  return `${s.toFixed(2).replace(/\.?0+$/, '')}×`;
}

function lenClass(len: ItemLen, prefix: 'card' | 'q'): string {
  if (len === 'short') return styles[`${prefix}Short`];
  if (len === 'med') return styles[`${prefix}Med`];
  return styles[`${prefix}Long`];
}

export function ContentStudio() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const [typeface, setTypeface] = useState<Typeface>('serif-a');
  const [align, setAlign] = useState<Align>('center');
  const [format, setFormat] = useState<Format>('4:5');
  const [motion, setMotion] = useState<Motion>('stagger');
  const [texture, setTexture] = useState<Texture>('clean');
  const [length, setLength] = useState<number>(6);
  const [speed, setSpeed] = useState<number>(SPEED_DEFAULT);

  const [playKey, setPlayKey] = useState(0);
  const [exporting, setExporting] = useState<'png' | 'mp4' | null>(null);
  const [exportProgress, setExportProgress] = useState<string>('');

  const frameRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const item = selectedIdx !== null ? CONTENT_ITEMS[selectedIdx] : null;
  const fmt = FORMATS[format];
  const typefaceCss = TYPEFACES.find((t) => t.key === typeface)?.cssVar ?? TYPEFACES[0].cssVar;

  // ============================================
  // Preview scaling
  // ============================================
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!frameRef.current || selectedIdx === null) return;
    const updateScale = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const availW = rect.width - 48;
      const availH = rect.height - 48;
      const sx = availW / fmt.w;
      const sy = availH / fmt.h;
      setScale(Math.max(0.05, Math.min(sx, sy)));
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [selectedIdx, fmt.w, fmt.h]);

  // ============================================
  // Line splitting
  // ============================================
  const splitIntoLines = useCallback(
    (el: HTMLElement, text: string) => {
      el.textContent = text;
      const range = document.createRange();
      const textNode = el.firstChild;
      if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;

      const rects: DOMRectList[] = [];
      const breaks: number[] = [];
      let lastTop = -Infinity;
      for (let i = 0; i < text.length; i++) {
        range.setStart(textNode, i);
        range.setEnd(textNode, i + 1);
        const r = range.getBoundingClientRect();
        if (r.top - lastTop > 4) {
          if (i !== 0) breaks.push(i);
          lastTop = r.top;
        }
        rects.push(rects[rects.length - 1]);
      }
      breaks.push(text.length);

      const lines: string[] = [];
      let cursor = 0;
      for (const b of breaks) {
        lines.push(text.slice(cursor, b).replace(/^\s+|\s+$/g, ''));
        cursor = b;
      }

      el.innerHTML = '';
      let cumChars = 0;
      lines.forEach((lineText, i) => {
        const span = document.createElement('span');
        span.className = styles.line;
        span.style.setProperty('--i', String(i));
        span.style.setProperty('--len', String(lineText.length));
        span.style.setProperty('--cum', String(cumChars));
        span.textContent = lineText;
        el.appendChild(span);
        cumChars += lineText.length;
      });
    },
    [],
  );

  // Re-split whenever item / typeface / format / align changes
  useEffect(() => {
    if (!innerRef.current || !item) return;
    splitIntoLines(innerRef.current, item.text);
  }, [item, typeface, format, align, splitIntoLines, playKey]);

  // ============================================
  // Play / replay
  // ============================================
  const previewPlay = useCallback(() => {
    if (!innerRef.current) return;
    setPlayKey((k) => k + 1);
    void innerRef.current.offsetWidth;
  }, []);

  useEffect(() => {
    previewPlay();
  }, [motion, texture, align, format, typeface, item, previewPlay]);

  // ============================================
  // Keyboard
  // ============================================
  useEffect(() => {
    if (selectedIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIdx(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIdx((idx) => (idx === null ? null : Math.max(0, idx - 1)));
      } else if (e.key === 'ArrowRight') {
        setSelectedIdx((idx) =>
          idx === null ? null : Math.min(CONTENT_ITEMS.length - 1, idx + 1),
        );
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        previewPlay();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedIdx, previewPlay]);

  // ============================================
  // Lock scroll while modal open
  // ============================================
  useEffect(() => {
    if (selectedIdx === null) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = orig;
    };
  }, [selectedIdx]);

  // ============================================
  // PNG export — via html-to-image (lazy load)
  // ============================================
  const exportPng = useCallback(async () => {
    if (!frameRef.current || !item) return;
    setExporting('png');
    setExportProgress('Rendering…');
    try {
      const { toPng } = await import('html-to-image');
      const node = frameRef.current;
      const prev = node.style.transform;
      node.style.transform = 'scale(1)';
      const dataUrl = await toPng(node, {
        cacheBust: true,
        width: fmt.w,
        height: fmt.h,
        pixelRatio: 1,
        backgroundColor: BG,
      });
      node.style.transform = prev;

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${BRAND}-${String((selectedIdx ?? 0) + 1).padStart(2, '0')}-${typeface}-${format.replace(':', 'x')}.png`;
      a.click();
    } catch (err) {
      console.error('[ContentStudio] PNG export failed', err);
      setExportProgress('Failed');
    } finally {
      setExporting(null);
      setExportProgress('');
    }
  }, [item, fmt.w, fmt.h, selectedIdx, typeface, format]);

  // ============================================
  // MP4 export — canvas + MediaRecorder
  // ============================================
  const exportMp4 = useCallback(async () => {
    if (!innerRef.current || !item) return;
    setExporting('mp4');
    setExportProgress('Preparing…');

    try {
      // Preload logo for canvas drawing
      const logo = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = '/logo.png';
      });
      // Use the live DOM to extract lines + measurements at scale(1).
      const node = frameRef.current!;
      const prevTransform = node.style.transform;
      node.style.transform = 'scale(1)';

      const lineEls = Array.from(innerRef.current.children) as HTMLElement[];
      const lines = lineEls.map((el) => el.textContent ?? '');

      // Capture font sizes from the current preview computation.
      const cs = window.getComputedStyle(lineEls[0] ?? innerRef.current);
      const fontSize = parseFloat(cs.fontSize);
      const lineHeight = parseFloat(cs.lineHeight) || fontSize * 1.16;
      const fontFamily = cs.fontFamily;
      const letterSpacing = cs.letterSpacing;

      node.style.transform = prevTransform;

      // Offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = fmt.w;
      canvas.height = fmt.h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No 2D context');

      // Stream from canvas → MediaRecorder
      const stream = canvas.captureStream(60);
      const mimeCandidates = [
        'video/mp4;codecs=avc1.42E01E',
        'video/mp4;codecs=avc1',
        'video/mp4',
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm',
      ];
      const mime = mimeCandidates.find((m) =>
        typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m),
      );
      if (!mime) throw new Error('No supported codec');
      const isMp4Native = mime.startsWith('video/mp4');

      const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 12_000_000 });
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      const recordDone = new Promise<Blob>((resolve) => {
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: mime });
          resolve(blob);
        };
      });

      recorder.start(100);

      // Animation timing
      const durationMs = length * 1000;
      const start = performance.now();

      const drawText = (t: number) => {
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, fmt.w, fmt.h);

        // Padding (matches CSS .qWrap padding 9% x / 8% y)
        const padX = fmt.w * 0.08;
        const padY = fmt.h * 0.09;
        const blockW = fmt.w - padX * 2;
        const blockH = fmt.h - padY * 2;

        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = INK;
        ctx.textBaseline = 'middle';
        // letterSpacing if supported
        try {
          (ctx as unknown as { letterSpacing: string }).letterSpacing = letterSpacing;
        } catch {
          // not supported in older browsers, ignore
        }

        const totalH = lines.length * lineHeight;
        let blockTop = padY + (blockH - totalH) / 2;
        blockTop = Math.max(padY, blockTop);

        // For LEFT alignment we still center the block visually (shrink-wrap)
        // Compute widest line width
        let maxLineW = 0;
        for (const ln of lines) {
          const w = ctx.measureText(ln).width;
          if (w > maxLineW) maxLineW = w;
        }
        const blockLeft = padX + (blockW - maxLineW) / 2;

        const cumChars: number[] = [];
        {
          let c = 0;
          for (const ln of lines) {
            cumChars.push(c);
            c += ln.length;
          }
        }

        // Halo glow under text
        if (texture === 'halo') {
          ctx.save();
          ctx.shadowColor = `rgba(${ACCENT_RGB}, 0.45)`;
          ctx.shadowBlur = 36;
          ctx.fillStyle = INK;
          // Drawn below regular pass to seed glow
          for (let i = 0; i < lines.length; i++) {
            const ln = lines[i];
            const yMid = blockTop + i * lineHeight + lineHeight / 2;
            let xStart: number;
            if (align === 'left') xStart = blockLeft;
            else xStart = (fmt.w - ctx.measureText(ln).width) / 2;
            ctx.fillText(ln, xStart, yMid);
          }
          ctx.restore();
        }

        const drawLine = (i: number, ln: string, opacity: number, dx = 0, dy = 0) => {
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.fillStyle = INK;
          const lineW = ctx.measureText(ln).width;
          let xStart: number;
          if (align === 'left') xStart = blockLeft;
          else xStart = (fmt.w - lineW) / 2;
          const yMid = blockTop + i * lineHeight + lineHeight / 2 + dy;
          ctx.fillText(ln, xStart + dx, yMid);
          ctx.restore();
        };

        if (motion === 'none' || motion === 'broken') {
          // For broken, render the chromatic aberration trio + jitter
          if (motion === 'broken') {
            // Jitter pattern 8-step ~ every 50ms / speed
            const stepMs = 50 / speed;
            const stepIdx = Math.floor(t / stepMs) % 8;
            const jitterTable: Array<[number, number]> = [
              [0, 0], [-0.6, 0.4], [0.8, -0.3], [-0.4, -0.5],
              [0.5, 0.6], [-0.7, 0], [0.4, -0.6], [-0.3, 0.4],
            ];
            const [jx, jy] = jitterTable[stepIdx];

            // Cyan offset -2.5 in screen blend
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            ctx.fillStyle = 'rgba(0, 255, 255, 0.55)';
            for (let i = 0; i < lines.length; i++) {
              drawLine(i, lines[i], 1, -2.5 + jx, jy);
            }
            // Magenta offset +2.5
            ctx.fillStyle = 'rgba(255, 0, 255, 0.55)';
            for (let i = 0; i < lines.length; i++) {
              drawLine(i, lines[i], 1, 2.5 + jx, jy);
            }
            ctx.restore();

            // White on top
            for (let i = 0; i < lines.length; i++) {
              drawLine(i, lines[i], 1, jx, jy);
            }
          } else {
            for (let i = 0; i < lines.length; i++) drawLine(i, lines[i], 1);
          }
        } else if (motion === 'stagger') {
          const lineDurMs = 620 / speed;
          const staggerMs = 130 / speed;
          for (let i = 0; i < lines.length; i++) {
            const localT = (t - i * staggerMs) / lineDurMs;
            const tt = clamp01(localT);
            const eased = 1 - Math.pow(1 - tt, 3);
            const rise = (1 - eased) * 14;
            drawLine(i, lines[i], eased, 0, rise);
          }
        } else if (motion === 'bloom') {
          const dur = 880 / speed;
          const tt = clamp01(t / dur);
          const eased = 1 - Math.pow(1 - tt, 3);
          const blurAmount = (1 - eased) * 14;
          ctx.save();
          ctx.filter = blurAmount > 0.1 ? `blur(${blurAmount}px)` : 'none';
          for (let i = 0; i < lines.length; i++) drawLine(i, lines[i], eased);
          ctx.restore();
        } else if (motion === 'type') {
          // ~25 cps per line, scaled by speed
          const charsPerMs = 25 / 1000;
          for (let i = 0; i < lines.length; i++) {
            const ln = lines[i];
            const startMs = cumChars[i] * (16 / speed);
            const visMs = Math.max(0, t - startMs);
            const charsVisible = Math.min(ln.length, Math.floor(visMs * charsPerMs * speed));
            if (charsVisible <= 0) continue;
            const visText = ln.slice(0, charsVisible);
            drawLine(i, visText, 1);
          }
        }

        // Frame texture
        if (texture === 'frame') {
          ctx.save();
          ctx.strokeStyle = `rgba(${ACCENT_RGB}, 0.7)`;
          ctx.lineWidth = 1.5;
          const inset = Math.min(fmt.w, fmt.h) * 0.05;
          ctx.strokeRect(inset, inset, fmt.w - inset * 2, fmt.h - inset * 2);
          ctx.restore();
        }

        // Sigil texture
        if (texture === 'sigil') {
          ctx.save();
          ctx.font = `${Math.floor(fmt.w * 0.018)}px ui-monospace, 'Fira Code', monospace`;
          ctx.fillStyle = INK;
          ctx.textBaseline = 'middle';
          const sx = fmt.w * 0.95;
          const sy = fmt.h * 0.06;
          ctx.textAlign = 'right';
          // letter spacing approximation via canvas letterSpacing
          try {
            (ctx as unknown as { letterSpacing: string }).letterSpacing = '4px';
          } catch {
            // ignore
          }
          ctx.fillText(BRAND_INITIALS, sx, sy);
          // Tick
          const tickX = sx - ctx.measureText(BRAND_INITIALS).width - 14;
          ctx.fillStyle = ACCENT;
          ctx.fillRect(tickX, sy - 12, 1.5, 24);
          ctx.restore();
          try {
            (ctx as unknown as { letterSpacing: string }).letterSpacing = letterSpacing;
          } catch {
            // ignore
          }
        }

        // Logo bottom-center
        ctx.save();
        ctx.globalAlpha = 0.92;
        const logoW = fmt.w * 0.14;
        const logoH = logoW * (logo.naturalHeight / logo.naturalWidth);
        const logoX = (fmt.w - logoW) / 2;
        const logoY = fmt.h - fmt.h * 0.05 - logoH;
        ctx.drawImage(logo, logoX, logoY, logoW, logoH);
        ctx.restore();
        try {
          (ctx as unknown as { letterSpacing: string }).letterSpacing = letterSpacing;
        } catch {
          // ignore
        }
      };

      const tick = () => {
        const t = performance.now() - start;
        drawText(t);
        setExportProgress(`${(t / 1000).toFixed(1)}s / ${(durationMs / 1000).toFixed(1)}s`);
        if (t < durationMs) {
          requestAnimationFrame(tick);
        } else {
          // Final frame
          drawText(durationMs);
          setTimeout(() => recorder.stop(), 80);
        }
      };

      requestAnimationFrame(tick);

      const blob = await recordDone;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const ext = isMp4Native ? 'mp4' : 'webm';
      a.download = `${BRAND}-${String((selectedIdx ?? 0) + 1).padStart(2, '0')}-${typeface}-${format.replace(':', 'x')}-${motion}-${texture}-${length}s-${speed.toFixed(2)}x.${ext}`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);

      if (!isMp4Native) {
        setExportProgress('Saved as .webm (browser limit)');
        setTimeout(() => setExportProgress(''), 2500);
      }
    } catch (err) {
      console.error('[ContentStudio] MP4 export failed', err);
      setExportProgress('Export failed');
      setTimeout(() => setExportProgress(''), 2000);
    } finally {
      setExporting(null);
    }
  }, [item, fmt, length, speed, motion, texture, align, selectedIdx, typeface, format]);

  // ============================================
  // Speed slider interactions
  // ============================================
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const setSpeedFromX = useCallback((clientX: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const t = clamp01((clientX - r.left) / r.width);
    setSpeed(tToSpeed(t));
  }, []);

  const onSliderDown = useCallback(
    (e: React.PointerEvent) => {
      draggingRef.current = true;
      (e.target as Element).setPointerCapture?.(e.pointerId);
      setSpeedFromX(e.clientX);
    },
    [setSpeedFromX],
  );
  const onSliderMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      setSpeedFromX(e.clientX);
    },
    [setSpeedFromX],
  );
  const onSliderUp = useCallback((e: React.PointerEvent) => {
    draggingRef.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  }, []);

  const onSliderWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setSpeed((s) => {
      const delta = e.deltaY > 0 ? -0.06 : 0.06;
      const next = clamp01(speedToT(s) + delta);
      return tToSpeed(next);
    });
  }, []);

  const onSliderKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const delta = e.key === 'ArrowRight' ? 0.10 : -0.10;
      setSpeed((s) => tToSpeed(clamp01(speedToT(s) + delta)));
    }
  }, []);

  const onSliderDouble = useCallback(() => {
    setSpeed(SPEED_DEFAULT);
  }, []);

  const sliderT = speedToT(speed);
  const fillStyle = useMemo(() => {
    const center = 50;
    const handle = sliderT * 100;
    const left = Math.min(center, handle);
    const right = Math.max(center, handle);
    return { left: `${left}%`, width: `${right - left}%` };
  }, [sliderT]);

  // ============================================
  // Card grid view
  // ============================================
  if (selectedIdx === null) {
    return (
      <div className={styles.root}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.inner}>
          <div className={styles.topBar}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              CONTENT STUDIO · agency99
            </div>
            <div className={styles.topMeta}>
              {CONTENT_ITEMS.length} ITEMS · CLICK TO OPEN
            </div>
          </div>
          <h1 className={styles.title}>
            Short copy. Shipped <span className={styles.titleAccent}>as stills + reels.</span>
          </h1>
          <p className={styles.sub}>
            Pick a line, dial in typeface, motion, texture. Export as PNG or MP4 for IG. All in-browser, no upload.
          </p>

          <div className={styles.cardGrid}>
            {CONTENT_ITEMS.map((it, i) => (
              <button
                key={i}
                className={styles.card}
                style={{ ['--card-font' as string]: typefaceCss }}
                onClick={() => setSelectedIdx(i)}
              >
                <div className={styles.cardMeta}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span>{it.len.toUpperCase()}</span>
                </div>
                <div className={styles.cardCanvas}>
                  <div className={`${styles.cardText} ${lenClass(it.len, 'card')}`}>{it.text}</div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt={BRAND} className={styles.cardWordmark} />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // Modal studio
  // ============================================
  const motionClass = motion === 'none' ? '' : styles[`motion${capitalize(motion)}`];
  const textureClass = texture === 'clean' ? '' : styles[`texture${capitalize(texture)}`];

  return (
    <div className={styles.modal} role="dialog" aria-modal="true">
      <div className={styles.modalInner}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          {/* Items */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>Items</div>
            <div className={styles.itemList}>
              {CONTENT_ITEMS.map((it, i) => {
                const active = i === selectedIdx;
                return (
                  <button
                    key={i}
                    className={`${styles.itemRow} ${active ? styles.itemRowActive : ''}`}
                    onClick={() => setSelectedIdx(i)}
                  >
                    <span className={styles.itemTag}>
                      {String(i + 1).padStart(2, '0')} · {it.len.toUpperCase()}
                    </span>
                    <span className={styles.itemText}>{it.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Typeface */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>Typeface</div>
            <div className={styles.optList}>
              {TYPEFACES.map((tf) => (
                <button
                  key={tf.key}
                  className={`${styles.optRow} ${typeface === tf.key ? styles.optRowActive : ''}`}
                  onClick={() => setTypeface(tf.key)}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Align */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>Align</div>
            <div className={styles.btnRow}>
              {ALIGNS.map((a) => (
                <button
                  key={a}
                  className={`${styles.rowBtn} ${align === a ? styles.rowBtnActive : ''}`}
                  onClick={() => setAlign(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>Format</div>
            <div className={styles.btnRow}>
              {FORMAT_KEYS.map((f) => (
                <button
                  key={f}
                  className={`${styles.rowBtn} ${format === f ? styles.rowBtnActive : ''}`}
                  onClick={() => setFormat(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Motion */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>Motion</div>
            <div className={styles.optList}>
              {MOTIONS.map((m) => (
                <button
                  key={m.key}
                  className={`${styles.optRow} ${motion === m.key ? styles.optRowActive : ''}`}
                  onClick={() => setMotion(m.key)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Texture */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>Texture</div>
            <div className={styles.optList}>
              {TEXTURES.map((tx) => (
                <button
                  key={tx.key}
                  className={`${styles.optRow} ${texture === tx.key ? styles.optRowActive : ''}`}
                  onClick={() => setTexture(tx.key)}
                >
                  {tx.label}
                </button>
              ))}
            </div>
          </div>

          {/* Length */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>Length</div>
            <div className={styles.btnRow}>
              {LENGTHS.map((l) => (
                <button
                  key={l}
                  className={`${styles.rowBtn} ${length === l ? styles.rowBtnActive : ''}`}
                  onClick={() => setLength(l)}
                >
                  {l}s
                </button>
              ))}
            </div>
          </div>

          {/* Speed */}
          <div className={styles.section}>
            <div className={styles.speedHeader}>
              <span className={styles.sectionHeader} style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>Speed</span>
              <span className={styles.speedValue}>{formatSpeed(speed)}</span>
            </div>
            <div
              ref={sliderRef}
              className={styles.sliderWrap}
              onPointerDown={onSliderDown}
              onPointerMove={onSliderMove}
              onPointerUp={onSliderUp}
              onWheel={onSliderWheel}
              onKeyDown={onSliderKey}
              onDoubleClick={onSliderDouble}
              tabIndex={0}
              role="slider"
              aria-valuemin={SPEED_MIN}
              aria-valuemax={SPEED_MAX}
              aria-valuenow={speed}
            >
              <div className={styles.sliderTrack} />
              <div className={styles.sliderCenter} />
              <div className={styles.sliderFill} style={fillStyle} />
              <div className={styles.sliderHandle} style={{ left: `${sliderT * 100}%` }} />
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className={styles.main}>
          <div className={styles.actionBar}>
            <button className={styles.actionBtn} onClick={() => setSelectedIdx(null)}>← Back</button>
            <button className={styles.actionBtn} onClick={previewPlay}>▶ Play</button>
            <div className={styles.actionSpacer} />
            <button
              className={styles.actionBtn}
              onClick={() => setSelectedIdx((i) => (i !== null && i > 0 ? i - 1 : i))}
              disabled={selectedIdx === 0}
            >
              Prev
            </button>
            <button
              className={styles.actionBtn}
              onClick={() => setSelectedIdx((i) => (i !== null && i < CONTENT_ITEMS.length - 1 ? i + 1 : i))}
              disabled={selectedIdx === CONTENT_ITEMS.length - 1}
            >
              Next
            </button>
            <button
              className={`${styles.actionBtn} ${styles.actionAccent}`}
              onClick={exportPng}
              disabled={!!exporting}
            >
              {exporting === 'png' ? exportProgress || 'Saving…' : 'Save PNG'}
            </button>
            <button
              className={`${styles.actionBtn} ${styles.actionAccent}`}
              onClick={exportMp4}
              disabled={!!exporting}
            >
              {exporting === 'mp4' ? exportProgress || 'Recording…' : 'Save MP4'}
            </button>
          </div>

          <div className={styles.frameMeta}>
            {fmt.w} × {fmt.h} · {fmt.label}
          </div>

          <div className={styles.previewWrap} ref={wrapRef}>
            <div
              className={styles.frameOuter}
              style={{ width: fmt.w * scale, height: fmt.h * scale }}
            >
            <div
              ref={frameRef}
              className={`${styles.frame} ${textureClass}`}
              style={{
                width: fmt.w,
                height: fmt.h,
                transform: `scale(${scale})`,
              }}
            >
              {texture === 'sigil' && (
                <div className={styles.sigil}>
                  <span className={styles.sigilTick} />
                  {BRAND_INITIALS}
                </div>
              )}
              <div className={`${styles.qWrap} ${motionClass}`} key={playKey}>
                <div
                  className={`${styles.qInner} ${align === 'left' ? styles.qInnerLeft : styles.qInnerCenter}`}
                  style={{
                    ['--vspeed' as string]: speed,
                    ['--quote-font' as string]: typefaceCss,
                  }}
                >
                  <div
                    ref={innerRef}
                    className={`${styles.qText} ${item ? lenClass(item.len, 'q') : ''}`}
                    style={{
                      fontFamily: typefaceCss,
                    }}
                  />
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt={BRAND} className={styles.wordmark} />
            </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
