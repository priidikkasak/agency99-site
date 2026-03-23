'use client';

import { type ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Section.module.css';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  fullBleed?: boolean;
  noReveal?: boolean;
}

export function Section({
  children,
  id,
  className,
  fullBleed,
  noReveal,
}: SectionProps) {
  const [ref, inView] = useScrollReveal<HTMLElement>();

  const classes = [styles.section, className]
    .filter(Boolean)
    .join(' ');

  return (
    <section ref={ref} id={id} className={classes}>
      {fullBleed ? children : <div className="container">{children}</div>}
    </section>
  );
}
