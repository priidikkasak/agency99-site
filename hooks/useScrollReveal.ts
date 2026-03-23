'use client';

import { useRef } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  return [ref, true];
}
