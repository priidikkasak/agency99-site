'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type ItemLen } from '@/lib/content/items';
import { useContentItems } from '@/lib/content/useContentItems';
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

// Modal font-size presets per `len` (matches .qShort/.qMed/.qLong CSS).
const MODAL_FONT_PRESET: Record<ItemLen, number> = {
  short: 92,
  med: 64,
  long: 44,
};

// Approximate card-preview to modal scale (card ≈ 240–280px wide, modal frame is 1080px wide).
const CARD_SCALE = 0.27;

// Card-preview font-size presets per len (matches .cardShort/.cardMed/.cardLong CSS).
const CARD_FONT_PRESET: Record<ItemLen, number> = {
  short: 24,
  med: 18,
  long: 14,
};

// User types card-scale px in the editor; convert to modal-scale for storage/export.
function cardPxToModal(cardPx: number): number {
  return cardPx / CARD_SCALE;
}
function modalPxToCard(modalPx: number): number {
  return modalPx * CARD_SCALE;
}

const ACCENT = '#9B8BFF';
const ACCENT_RGB = '155, 139, 255';
const INK = '#F0EDE6';
const INK_DIM = '#8A8880';
const BG = '#000000';
const BRAND = 'agency99';
const BRAND_INITIALS = 'A99';

const SPEED_MIN = 0.1;
const SPEED_MAX = 10;
const SPEED_DEFAULT = 1;

// Log scale (decade): 0.1× at t=0, 1× at t=0.5, 10× at t=1.
function tToSpeed(t: number): number {
  return Math.pow(10, t * 2 - 1);
}
function speedToT(s: number): number {
  return (Math.log10(s) + 1) / 2;
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

// Word-wrap text against a max pixel width using the supplied 2D context as
// metrics. Honors explicit \n as forced breaks. Never breaks mid-word: an
// over-long single word is returned as its own line and accepted as-is.
function wrapTextForCanvas(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const out: string[] = [];
  for (const paragraph of text.split('\n')) {
    if (paragraph.length === 0) {
      out.push('');
      continue;
    }
    const tokens = paragraph.match(/\s+|\S+/g) ?? [];
    let current = '';
    for (const token of tokens) {
      const isWs = /^\s/.test(token);
      const candidate = current + token;
      if (
        !isWs &&
        current.trim().length > 0 &&
        ctx.measureText(candidate).width > maxWidth
      ) {
        out.push(current.trim());
        current = token;
      } else {
        current = candidate;
      }
    }
    const last = current.trim();
    if (last.length > 0) out.push(last);
  }
  return out.length > 0 ? out : [''];
}

type DrawOpts = {
  fmt: { w: number; h: number };
  lines: string[];
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  letterSpacing: string;
  align: Align;
  motion: Motion;
  texture: Texture;
  speed: number;
  logo: HTMLImageElement;
  logoPct: number;
};

function drawCompositeFrame(
  ctx: CanvasRenderingContext2D,
  t: number,
  opts: DrawOpts,
): void {
  const {
    fmt, lines, fontSize, lineHeight, fontFamily, letterSpacing,
    align, motion, texture, speed, logo,
  } = opts;

  const setLetterSpacing = (v: string) => {
    try {
      (ctx as unknown as { letterSpacing: string }).letterSpacing = v;
    } catch {
      // older browsers - ignore
    }
  };

  // Background
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, fmt.w, fmt.h);

  // Padding matches CSS .qWrap (8% horizontal × 9% vertical)
  const padX = fmt.w * 0.08;
  const padY = fmt.h * 0.09;
  const blockW = fmt.w - padX * 2;
  const blockH = fmt.h - padY * 2;

  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = INK;
  ctx.textBaseline = 'middle';
  setLetterSpacing(letterSpacing);

  const totalH = lines.length * lineHeight;
  let blockTop = padY + (blockH - totalH) / 2;
  blockTop = Math.max(padY, blockTop);

  // Block centering for left-align - shrink-wrap to widest line
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

  // Halo glow (warm cream + accent passes) drawn before main text
  if (texture === 'halo') {
    const haloPasses: Array<{ color: string; blur: number }> = [
      { color: 'rgba(255, 235, 200, 0.55)', blur: 60 },
      { color: `rgba(${ACCENT_RGB}, 0.65)`, blur: 36 },
    ];
    for (const pass of haloPasses) {
      ctx.save();
      ctx.shadowColor = pass.color;
      ctx.shadowBlur = pass.blur;
      ctx.fillStyle = INK;
      for (let i = 0; i < lines.length; i++) {
        const ln = lines[i];
        const yMid = blockTop + i * lineHeight + lineHeight / 2;
        const xStart = align === 'left'
          ? blockLeft
          : (fmt.w - ctx.measureText(ln).width) / 2;
        ctx.fillText(ln, xStart, yMid);
      }
      ctx.restore();
    }
  }

  const drawLine = (
    i: number,
    ln: string,
    opacity: number,
    dx = 0,
    dy = 0,
    color: string = INK,
  ) => {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    const lineW = ctx.measureText(ln).width;
    const xStart = align === 'left'
      ? blockLeft
      : (fmt.w - lineW) / 2;
    const yMid = blockTop + i * lineHeight + lineHeight / 2 + dy;
    ctx.fillText(ln, xStart + dx, yMid);
    ctx.restore();
  };

  if (motion === 'none' || motion === 'broken') {
    if (motion === 'broken') {
      const stepMs = 50 / speed;
      const stepIdx = Math.floor(t / stepMs) % 8;
      const jitterTable: Array<[number, number]> = [
        [0, 0], [-0.6, 0.4], [0.8, -0.3], [-0.4, -0.5],
        [0.5, 0.6], [-0.7, 0], [0.4, -0.6], [-0.3, 0.4],
      ];
      const [jx, jy] = jitterTable[stepIdx];

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < lines.length; i++) {
        drawLine(i, lines[i], 1, -2.5 + jx, jy, 'rgba(0, 255, 255, 0.55)');
      }
      for (let i = 0; i < lines.length; i++) {
        drawLine(i, lines[i], 1, 2.5 + jx, jy, 'rgba(255, 0, 255, 0.55)');
      }
      ctx.restore();
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
    ctx.lineWidth = Math.max(1.5, fmt.w * 0.0015);
    const inset = Math.min(fmt.w, fmt.h) * 0.05;
    ctx.strokeRect(inset, inset, fmt.w - inset * 2, fmt.h - inset * 2);
    ctx.restore();
  }

  // Sigil texture
  if (texture === 'sigil') {
    ctx.save();
    const sigilFs = Math.floor(fmt.w * 0.020);
    ctx.font = `${sigilFs}px ui-monospace, 'Fira Code', monospace`;
    ctx.fillStyle = INK;
    ctx.textBaseline = 'middle';
    const sx = fmt.w * 0.95;
    const sy = fmt.h * 0.06;
    ctx.textAlign = 'right';
    setLetterSpacing('4px');
    ctx.fillText(BRAND_INITIALS, sx, sy);
    const tickX = sx - ctx.measureText(BRAND_INITIALS).width - sigilFs * 0.7;
    const tickH = fmt.w * 0.030;
    ctx.fillStyle = ACCENT;
    ctx.fillRect(tickX, sy - tickH / 2, Math.max(1.6, fmt.w * 0.0014), tickH);
    ctx.restore();
    setLetterSpacing(letterSpacing);
  }

  // Logo bottom-center
  ctx.save();
  ctx.globalAlpha = 0.92;
  const logoW = fmt.w * (opts.logoPct / 100);
  const logoH = logoW * (logo.naturalHeight / logo.naturalWidth);
  const logoX = (fmt.w - logoW) / 2;
  const logoY = fmt.h - fmt.h * 0.05 - logoH;
  ctx.drawImage(logo, logoX, logoY, logoW, logoH);
  ctx.restore();
}

async function loadLogo(): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = '/logo.png';
  });
}

export function ContentStudio() {
  const { items, ready, add, update, remove, move, reset, exportJson, importJson } = useContentItems();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [importError, setImportError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [typeface, setTypeface] = useState<Typeface>('serif-a');
  const [align, setAlign] = useState<Align>('center');
  const [format, setFormat] = useState<Format>('4:5');
  const [motion, setMotion] = useState<Motion>('stagger');
  const [texture, setTexture] = useState<Texture>('clean');
  const [length, setLength] = useState<number>(6);
  const [speed, setSpeed] = useState<number>(SPEED_DEFAULT);

  const [playKey, setPlayKey] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [exporting, setExporting] = useState<'png' | 'mp4' | null>(null);
  const [exportProgress, setExportProgress] = useState<string>('');

  const frameRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const item = selectedIdx !== null ? items[selectedIdx] : null;
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
      el.innerHTML = '';
      if (!text) return;

      const cs = window.getComputedStyle(el);
      const fontSize = parseFloat(cs.fontSize);
      const fontFamily = cs.fontFamily;
      const fontWeight = cs.fontWeight || 'normal';
      const fontStyle = cs.fontStyle || 'normal';
      const letterSpacing =
        cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;

      // Available width = qWrap (flex container, grandparent) content box.
      // The frame's CSS scale transform doesn't affect clientWidth so this
      // tracks the un-scaled layout width.
      let maxWidth = 0;
      const wrap = el.parentElement?.parentElement;
      if (wrap) {
        const wcs = window.getComputedStyle(wrap);
        const padL = parseFloat(wcs.paddingLeft) || 0;
        const padR = parseFloat(wcs.paddingRight) || 0;
        maxWidth = wrap.clientWidth - padL - padR;
      }
      if (!Number.isFinite(maxWidth) || maxWidth <= 0) {
        maxWidth = el.clientWidth || 0;
      }

      let lines: string[];
      if (maxWidth <= 0) {
        // No layout available yet — fall back to a single line; a later
        // re-split (font-ready / resize) will produce correct wrapping.
        lines = text.split('\n').map((l) => l.replace(/^\s+|\s+$/g, ''));
      } else {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          lines = [text];
        } else {
          ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
          try {
            (ctx as unknown as { letterSpacing: string }).letterSpacing =
              letterSpacing;
          } catch {
            // older browsers - ignore
          }
          lines = wrapTextForCanvas(ctx, text, maxWidth);
        }
      }

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
    const text = item.text;
    splitIntoLines(innerRef.current, text);
    // First paint may use a fallback font; once the webfont is ready the
    // metrics change and the wrap can shift, so re-split.
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      let cancelled = false;
      document.fonts.ready.then(() => {
        if (!cancelled && innerRef.current) splitIntoLines(innerRef.current, text);
      });
      return () => {
        cancelled = true;
      };
    }
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

  // Tick elapsed time during preview playback so the meta line shows progress.
  useEffect(() => {
    if (selectedIdx === null) return;
    const durationMs = length * 1000;
    const startTs = performance.now();
    let raf = 0;
    setElapsedMs(0);
    const tick = () => {
      const t = performance.now() - startTs;
      if (t >= durationMs) {
        setElapsedMs(durationMs);
        return;
      }
      setElapsedMs(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playKey, length, selectedIdx]);

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
          idx === null ? null : Math.min(items.length - 1, idx + 1),
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
  // PNG export - via html-to-image (lazy load)
  // ============================================
  // Measure the live preview DOM at scale(1) so we can render the same
  // line wrapping + font metrics onto an offscreen canvas.
  const collectDrawOpts = useCallback(async (): Promise<DrawOpts | null> => {
    if (!frameRef.current || !innerRef.current || !item) return null;
    if (document.fonts && typeof document.fonts.ready?.then === 'function') {
      await document.fonts.ready;
    }
    const logo = await loadLogo();

    const node = frameRef.current;
    const prevTransform = node.style.transform;
    node.style.transform = 'scale(1)';
    void node.offsetWidth; // force layout

    const lineEls = Array.from(innerRef.current.children) as HTMLElement[];
    let lines = lineEls.map((el) => el.textContent ?? '');
    const cs = window.getComputedStyle(lineEls[0] ?? innerRef.current);
    const fontSize = parseFloat(cs.fontSize);
    let lineHeight = parseFloat(cs.lineHeight);
    if (!Number.isFinite(lineHeight) || lineHeight < fontSize * 0.5) {
      const multiplier = item.len === 'long' ? 1.22 : 1.16;
      lineHeight = fontSize * multiplier;
    }
    const fontFamily = cs.fontFamily;
    const fontWeight = cs.fontWeight || 'normal';
    const fontStyle = cs.fontStyle || 'normal';
    const letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;

    node.style.transform = prevTransform;

    // Safety net: regardless of what the DOM splitter produced, never let the
    // export ship a line wider than the export's safe width (qWrap padding
    // accounts for 16% horizontal). Re-wrap from item.text if needed.
    const exportMaxWidth = fmt.w * (1 - 0.08 * 2);
    const measureCanvas = document.createElement('canvas');
    const measureCtx = measureCanvas.getContext('2d');
    if (measureCtx) {
      measureCtx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
      try {
        (measureCtx as unknown as { letterSpacing: string }).letterSpacing =
          letterSpacing;
      } catch {
        // older browsers - ignore
      }
      const anyOverflow =
        lines.length === 0 ||
        lines.some((line) => measureCtx.measureText(line).width > exportMaxWidth);
      if (anyOverflow) {
        lines = wrapTextForCanvas(measureCtx, item.text, exportMaxWidth);
      }
    }

    return {
      fmt,
      lines,
      fontSize,
      lineHeight,
      fontFamily,
      letterSpacing,
      align,
      motion,
      texture,
      speed,
      logo,
      logoPct: item.logoPct ?? 14,
    };
  }, [item, fmt, align, motion, texture, speed]);

  const exportPng = useCallback(async () => {
    if (!item) return;
    setExporting('png');
    setExportProgress('Rendering…');
    try {
      const opts = await collectDrawOpts();
      if (!opts) throw new Error('Could not collect draw opts');

      // Supersample 2× internally for crisper anti-aliasing, then downscale
      // to native 1080×W. IG can't store more than 1080 anyway, but the
      // downsample step gives sharper text + cleaner curves.
      const SS = 2;
      const hi = document.createElement('canvas');
      hi.width = opts.fmt.w * SS;
      hi.height = opts.fmt.h * SS;
      const hiCtx = hi.getContext('2d');
      if (!hiCtx) throw new Error('No 2D context');
      hiCtx.imageSmoothingEnabled = true;
      hiCtx.imageSmoothingQuality = 'high';
      hiCtx.scale(SS, SS);
      // For broken motion, sample the jitter at t=0 (steady frame for PNG)
      drawCompositeFrame(hiCtx, opts.motion === 'broken' ? 0 : 100000, opts);

      const out = document.createElement('canvas');
      out.width = opts.fmt.w;
      out.height = opts.fmt.h;
      const outCtx = out.getContext('2d');
      if (!outCtx) throw new Error('No 2D context');
      outCtx.imageSmoothingEnabled = true;
      outCtx.imageSmoothingQuality = 'high';
      outCtx.drawImage(hi, 0, 0, opts.fmt.w, opts.fmt.h);

      const blob: Blob | null = await new Promise((resolve) =>
        out.toBlob((b) => resolve(b), 'image/png'),
      );
      if (!blob) throw new Error('toBlob returned null');

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${BRAND}-${String((selectedIdx ?? 0) + 1).padStart(2, '0')}-${typeface}-${format.replace(':', 'x')}-${motion}-${texture}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {
      console.error('[ContentStudio] PNG export failed', err);
      setExportProgress('Export failed');
      setTimeout(() => setExportProgress(''), 2000);
    } finally {
      setExporting(null);
      setExportProgress('');
    }
  }, [item, collectDrawOpts, selectedIdx, typeface, format, motion, texture]);

  // ============================================
  // MP4 export - canvas + MediaRecorder
  // ============================================
  const exportMp4 = useCallback(async () => {
    if (!item) return;
    setExporting('mp4');
    setExportProgress('Preparing…');

    try {
      const opts = await collectDrawOpts();
      if (!opts) throw new Error('Could not collect draw opts');

      // Offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = opts.fmt.w;
      canvas.height = opts.fmt.h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No 2D context');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Stream from canvas → MediaRecorder.
      // Higher profile H.264 first (better compression at same bitrate).
      const stream = canvas.captureStream(60);
      const mimeCandidates = [
        'video/mp4;codecs=avc1.640028', // High profile, level 4.0
        'video/mp4;codecs=avc1.4D0028', // Main profile, level 4.0
        'video/mp4;codecs=avc1.42E01F', // Baseline, level 3.1
        'video/mp4;codecs=avc1.42E01E', // Baseline, level 3.0
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

      const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 20_000_000 });
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

      const durationMs = length * 1000;
      const start = performance.now();

      const tick = () => {
        const t = performance.now() - start;
        drawCompositeFrame(ctx, t, opts);
        setExportProgress(`${(t / 1000).toFixed(1)}s / ${(durationMs / 1000).toFixed(1)}s`);
        if (t < durationMs) {
          requestAnimationFrame(tick);
        } else {
          drawCompositeFrame(ctx, durationMs, opts);
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
  }, [item, collectDrawOpts, length, speed, motion, texture, selectedIdx, typeface, format]);

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
    const onImportClick = () => fileInputRef.current?.click();
    const onImportChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setImportError('');
      try {
        await importJson(file);
      } catch (err) {
        setImportError(err instanceof Error ? err.message : 'Import failed');
      }
      e.target.value = '';
    };

    return (
      <div className={styles.root}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.inner}>
          <div className={styles.topBar}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              CONTENT STUDIO · agency99
            </div>
            <div className={styles.topBarRight}>
              <div className={styles.topMeta}>
                {items.length} ITEMS · {editMode ? 'EDITING' : 'CLICK TO OPEN'}
              </div>
              <button
                className={`${styles.editToggle} ${editMode ? styles.editToggleActive : ''}`}
                onClick={() => setEditMode((v) => !v)}
                aria-pressed={editMode}
              >
                {editMode ? 'Done' : 'Edit'}
              </button>
            </div>
          </div>
          <h1 className={styles.title}>
            Short copy. Shipped <span className={styles.titleAccent}>as stills + reels.</span>
          </h1>
          <p className={styles.sub}>
            Pick a line, dial in typeface, motion, texture. Export as PNG or MP4 for IG. All in-browser, no upload.
          </p>

          {editMode && (
            <div className={styles.editorBar}>
              <span className={styles.editorBarHint}>
                Edit cards inline · saves to this browser
              </span>
              <div className={styles.editorBarSpacer} />
              <button className={styles.editorActionBtn} onClick={exportJson}>
                Export JSON
              </button>
              <button className={styles.editorActionBtn} onClick={onImportClick}>
                Import JSON
              </button>
              <button
                className={`${styles.editorActionBtn} ${styles.editorActionBtnDanger}`}
                onClick={() => {
                  if (window.confirm('Reset to default items? Your current edits will be lost.')) {
                    reset();
                  }
                }}
              >
                Reset
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                style={{ display: 'none' }}
                onChange={onImportChange}
              />
            </div>
          )}
          {editMode && importError && (
            <div className={styles.editorError}>Import failed: {importError}</div>
          )}

          <div className={styles.cardGrid}>
            {items.map((it, i) =>
              editMode ? (
                <div
                  key={i}
                  className={`${styles.card} ${styles.cardEditing}`}
                  style={{ ['--card-font' as string]: typefaceCss }}
                >
                  <div className={styles.cardMeta}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <div className={styles.cardSizeControls}>
                      <select
                        className={styles.cardLenSelect}
                        value={it.len}
                        onChange={(e) => update(i, { len: e.target.value as ItemLen })}
                        aria-label="Size preset"
                        title="Size preset (also controls line-height)"
                      >
                        <option value="short">L</option>
                        <option value="med">M</option>
                        <option value="long">S</option>
                      </select>
                      <input
                        className={styles.cardFontSizeInput}
                        type="number"
                        inputMode="numeric"
                        min={8}
                        max={120}
                        step={1}
                        value={
                          it.fontSize !== undefined
                            ? Math.round(modalPxToCard(it.fontSize))
                            : ''
                        }
                        placeholder={String(CARD_FONT_PRESET[it.len])}
                        onChange={(e) => {
                          const v = e.target.value.trim();
                          if (v === '') {
                            update(i, { fontSize: undefined });
                          } else {
                            const cardPx = Number(v);
                            if (Number.isFinite(cardPx) && cardPx > 0) {
                              update(i, { fontSize: cardPxToModal(cardPx) });
                            }
                          }
                        }}
                        aria-label="Font size in px (as shown on this card)"
                        title="Font size in px as shown on this card. Empty = preset."
                      />
                      <span className={styles.cardFontSizeUnit}>px</span>
                    </div>
                  </div>
                  <div className={styles.cardCanvas}>
                    <textarea
                      className={`${styles.cardText} ${styles.cardTextEditable} ${lenClass(it.len, 'card')}`}
                      value={it.text}
                      onChange={(e) => update(i, { text: e.target.value })}
                      rows={4}
                      spellCheck={false}
                      placeholder="Type your line…"
                      style={
                        it.fontSize
                          ? { fontSize: `${it.fontSize * CARD_SCALE}px` }
                          : undefined
                      }
                    />
                  </div>
                  <div className={styles.cardEditActions}>
                    <button
                      className={styles.cardEditBtn}
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      aria-label="Move left"
                      title="Move left"
                    >
                      ←
                    </button>
                    <button
                      className={styles.cardEditBtn}
                      onClick={() => move(i, 1)}
                      disabled={i === items.length - 1}
                      aria-label="Move right"
                      title="Move right"
                    >
                      →
                    </button>
                    <button
                      className={`${styles.cardEditBtn} ${styles.cardEditBtnDanger}`}
                      onClick={() => {
                        if (window.confirm('Delete this item?')) remove(i);
                      }}
                      aria-label="Delete"
                      title="Delete"
                    >
                      ×
                    </button>
                  </div>
                  <div className={styles.cardLogoControls}>
                    <span className={styles.cardLogoLabel}>LOGO</span>
                    <input
                      className={styles.cardLogoInput}
                      type="number"
                      inputMode="numeric"
                      min={5}
                      max={40}
                      step={1}
                      value={it.logoPct ?? ''}
                      placeholder="14"
                      onChange={(e) => {
                        const v = e.target.value.trim();
                        if (v === '') {
                          update(i, { logoPct: undefined });
                        } else {
                          const n = Number(v);
                          if (Number.isFinite(n) && n > 0) update(i, { logoPct: n });
                        }
                      }}
                      aria-label="Logo width as % of frame width"
                      title="Logo width as % of frame width. Empty = 14%."
                    />
                    <span className={styles.cardFontSizeUnit}>%</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.png"
                    alt={BRAND}
                    className={styles.cardWordmark}
                    style={it.logoPct ? { width: `${it.logoPct}%` } : undefined}
                  />
                </div>
              ) : (
                <button
                  key={i}
                  className={styles.card}
                  style={{ ['--card-font' as string]: typefaceCss }}
                  onClick={() => setSelectedIdx(i)}
                >
                  <div className={styles.cardMeta}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      {it.fontSize
                        ? `${Math.round(modalPxToCard(it.fontSize))}px`
                        : it.len.toUpperCase()}
                    </span>
                  </div>
                  <div className={styles.cardCanvas}>
                    <div
                      className={`${styles.cardText} ${lenClass(it.len, 'card')}`}
                      style={
                        it.fontSize
                          ? { fontSize: `${it.fontSize * CARD_SCALE}px` }
                          : undefined
                      }
                    >
                      {it.text}
                    </div>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.png"
                    alt={BRAND}
                    className={styles.cardWordmark}
                    style={it.logoPct ? { width: `${it.logoPct}%` } : undefined}
                  />
                </button>
              ),
            )}
            {editMode && (
              <button
                className={`${styles.card} ${styles.cardAdd}`}
                onClick={add}
                aria-label="Add new item"
              >
                <span className={styles.cardAddPlus}>+</span>
                <span className={styles.cardAddLabel}>Add item</span>
              </button>
            )}
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
              {items.map((it, i) => {
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
              onClick={() => setSelectedIdx((i) => (i !== null && i < items.length - 1 ? i + 1 : i))}
              disabled={selectedIdx === items.length - 1}
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
            <span className={styles.frameMetaTimer}>
              {(elapsedMs / 1000).toFixed(1)}s / {length}s
            </span>
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
                      ...(item?.fontSize ? { fontSize: `${item.fontSize}px` } : {}),
                    }}
                  />
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt={BRAND}
                className={styles.wordmark}
                style={item?.logoPct ? { width: `${item.logoPct}%` } : undefined}
              />
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
