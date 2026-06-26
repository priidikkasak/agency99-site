'use client';

import { useCallback, useEffect, useState } from 'react';
import { CONTENT_ITEMS, type ContentItem, type ItemLen } from './items';

const STORAGE_KEY = 'agency99.content.items.v1';
const LENS: ReadonlyArray<ItemLen> = ['short', 'med', 'long'];

function isItem(x: unknown): x is ContentItem {
  if (!x || typeof x !== 'object') return false;
  const obj = x as Record<string, unknown>;
  return typeof obj.text === 'string'
    && typeof obj.len === 'string'
    && LENS.includes(obj.len as ItemLen);
}

function readStorage(): ContentItem[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    const cleaned = parsed.filter(isItem);
    return cleaned.length > 0 ? cleaned : null;
  } catch {
    return null;
  }
}

function writeStorage(items: ContentItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // quota / private mode - ignore
  }
}

export type UseContentItems = {
  items: ContentItem[];
  ready: boolean;
  add: () => void;
  update: (i: number, patch: Partial<ContentItem>) => void;
  remove: (i: number) => void;
  move: (i: number, dir: -1 | 1) => void;
  reset: () => void;
  exportJson: () => void;
  importJson: (file: File) => Promise<void>;
};

export function useContentItems(): UseContentItems {
  const [items, setItems] = useState<ContentItem[]>(CONTENT_ITEMS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStorage();
    if (stored) setItems(stored);
    setReady(true);
  }, []);

  const persist = useCallback((next: ContentItem[]) => {
    setItems(next);
    writeStorage(next);
  }, []);

  const add = useCallback(() => {
    persist([...items, { text: 'New line.', len: 'short' }]);
  }, [items, persist]);

  const update = useCallback(
    (i: number, patch: Partial<ContentItem>) => {
      const next = items.map((it, idx) => (idx === i ? { ...it, ...patch } : it));
      persist(next);
    },
    [items, persist],
  );

  const remove = useCallback(
    (i: number) => {
      persist(items.filter((_, idx) => idx !== i));
    },
    [items, persist],
  );

  const move = useCallback(
    (i: number, dir: -1 | 1) => {
      const j = i + dir;
      if (j < 0 || j >= items.length) return;
      const next = items.slice();
      [next[i], next[j]] = [next[j], next[i]];
      persist(next);
    },
    [items, persist],
  );

  const reset = useCallback(() => {
    persist(CONTENT_ITEMS.slice());
  }, [persist]);

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agency99-content-items-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }, [items]);

  const importJson = useCallback(
    async (file: File) => {
      const text = await file.text();
      const parsed: unknown = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error('JSON root must be an array');
      const cleaned = parsed.filter(isItem);
      if (cleaned.length === 0) throw new Error('No valid items found');
      persist(cleaned);
    },
    [persist],
  );

  return { items, ready, add, update, remove, move, reset, exportJson, importJson };
}
