'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import styles from './admin.module.css';

const PASSWORD = 'million';
const STORAGE_KEY = 'a99_admin';

const LINKS = [
  { href: '/content', title: 'Content', description: 'Content editor and page copy management.', icon: '✎' },
  { href: '/map', title: 'Map', description: 'Live traffic map with country-level visitor data.', icon: '◉' },
  { href: '/webclient', title: 'Web client', description: 'Web / product project intake form.', icon: '⌘' },
  { href: '/sourcingclient', title: 'Sourcing client', description: 'Sourcing project intake form.', icon: '⟶' },
] as const;

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') {
        setAuthed(true);
      }
    } catch {}
    setReady(true);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      setAuthed(true);
      setError(false);
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {}
    } else {
      setError(true);
      setValue('');
    }
  };

  const handleSignOut = () => {
    setAuthed(false);
    setValue('');
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  if (!ready) return null;

  return (
    <main className={styles.wrap}>
      <div className={styles.container}>
        {!authed ? (
          <form className={styles.gate} onSubmit={handleSubmit}>
            <div className={styles.header}>
              <span className={styles.eyebrow}>Admin</span>
              <h1 className={styles.title}>Restricted area</h1>
              <p className={styles.sub}>Enter password to continue.</p>
            </div>

            <div className={styles.field}>
              <input
                type="password"
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                placeholder="Password"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (error) setError(false);
                }}
                autoFocus
                autoComplete="current-password"
                aria-label="Password"
                aria-invalid={error}
              />
              <button type="submit" className={styles.submit}>
                Enter →
              </button>
            </div>

            {error && <p className={styles.errorMsg}>Wrong password.</p>}
          </form>
        ) : (
          <>
            <div className={styles.header}>
              <span className={styles.eyebrow}>Admin</span>
              <h1 className={styles.title}>Dashboard</h1>
              <p className={styles.sub}>Pick a section to jump in.</p>
            </div>

            <ul className={styles.grid} role="list">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.card}>
                    <span className={styles.icon} aria-hidden="true">{link.icon}</span>
                    <span className={styles.cardTitle}>{link.title}</span>
                    <span className={styles.cardDesc}>{link.description}</span>
                    <span className={styles.cardArrow} aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            <button type="button" className={styles.signOut} onClick={handleSignOut}>
              Sign out
            </button>
          </>
        )}
      </div>
    </main>
  );
}
