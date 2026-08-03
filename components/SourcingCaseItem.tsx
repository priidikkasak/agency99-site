'use client';

import { createElement, useCallback, type KeyboardEvent } from 'react';
import type { SourcingCase } from '@/lib/i18n/et';
import styles from './SourcingCaseItem.module.css';

interface Props {
  item: SourcingCase;
  isOpen: boolean;
  onToggle: () => void;
  onArrowNav?: (direction: 1 | -1 | 'first' | 'last') => void;
  titleTag?: 'h2' | 'h3';
}

export function SourcingCaseItem({
  item,
  isOpen,
  onToggle,
  onArrowNav,
  titleTag = 'h3',
}: Props) {
  const contentId = `sourcing-case-${item.tag}-content`;
  const headerId = `sourcing-case-${item.tag}-header`;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (!onArrowNav) return;
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          onArrowNav(1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          onArrowNav(-1);
          break;
        case 'Home':
          event.preventDefault();
          onArrowNav('first');
          break;
        case 'End':
          event.preventDefault();
          onArrowNav('last');
          break;
      }
    },
    [onArrowNav],
  );

  return (
    <li className={`${styles.row} ${isOpen ? styles.rowOpen : ''}`}>
      <span className={styles.ghostNum} aria-hidden="true">
        {item.tag}
      </span>

      <button
        type="button"
        id={headerId}
        className={styles.header}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className={styles.headerLeft}>
          <span className={styles.metaPill}>
            <span className={styles.metaNum} aria-hidden="true">
              {item.tag}
            </span>
            <span className={styles.metaDivider} aria-hidden="true" />
            <span className={styles.metaCategory}>{item.category}</span>
          </span>

          {createElement(
            titleTag,
            { className: styles.title },
            item.title,
            <span key="accent" className={styles.titleAccent} aria-hidden="true" />,
          )}
        </span>

        <span className={styles.chevron} aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="5 8 10 13 15 8" />
          </svg>
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        aria-hidden={!isOpen}
        className={`${styles.content} ${isOpen ? styles.contentOpen : ''}`}
      >
        <div className={styles.contentInner}>
          <p className={styles.body}>{item.body}</p>
        </div>
      </div>
    </li>
  );
}
