'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function CleanAnchorScroll() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }

      const target = e.target as Element | null;
      const a = target?.closest?.('a');
      if (!a) return;
      if (a.getAttribute('target') === '_blank') return;

      const href = a.getAttribute('href');
      if (!href) return;

      if (/^#[\w-]+$/.test(href)) {
        const el = document.getElementById(href.slice(1));
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      if (/^\/#[\w-]+$/.test(href) && pathname === '/') {
        const el = document.getElementById(href.slice(2));
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.location.hash) return;
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    const tid = window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }, 60);
    return () => window.clearTimeout(tid);
  }, [pathname]);

  return null;
}
