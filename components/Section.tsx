'use client';

import { type ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  fullBleed?: boolean;
}

export function Section({
  children,
  id,
  className,
  fullBleed,
}: SectionProps) {
  const classes = [styles.section, className]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={classes}>
      {fullBleed ? children : <div className="container">{children}</div>}
    </section>
  );
}
