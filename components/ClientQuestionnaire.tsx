'use client';

import { useState } from 'react';
import styles from './ClientQuestionnaire.module.css';

type Status = 'idle' | 'loading' | 'success' | 'error';

const PROJECT_TYPES = [
  'Website',
  'E-commerce',
  'Platform / web app',
  'Cold email system',
  'Design / branding',
  'Something else',
];

const BUDGETS = [
  'Under €2,000',
  '€2,000 – €5,000',
  '€5,000 – €10,000',
  '€10,000+',
  'Not sure yet',
];

const TIMELINES = [
  'ASAP',
  'Within 2 weeks',
  'Within a month',
  'Flexible',
];

export function ClientQuestionnaire() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    goal: '',
    budget: '',
    timeline: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/client-questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({
        name: '',
        email: '',
        company: '',
        projectType: '',
        goal: '',
        budget: '',
        timeline: '',
      });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className={styles.wrap}>
        <div className={styles.glow} aria-hidden="true" />
        <div className="container">
          <div className={styles.inner}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Received
            </div>
            <h1 className={styles.headline}>Thanks — we&rsquo;ve got it.</h1>
            <p className={styles.subtext}>
              Priidik will read this personally and reply within 24 hours from{' '}
              <strong style={{ color: 'var(--text-primary)' }}>priidik@agency99.io</strong>.
              If it&rsquo;s urgent, ping us on WhatsApp.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrap}>
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Client intake
          </div>
          <h1 className={styles.headline}>Tell us about your project.</h1>
          <p className={styles.subtext}>
            Seven quick questions. Takes about two minutes. You&rsquo;ll get a personal reply
            within 24 hours.
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <label className={[styles.label, styles.required].join(' ')}>
                Your name
                <input
                  type="text"
                  className={styles.input}
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Jane Smith"
                  required
                  autoComplete="name"
                />
              </label>
              <label className={[styles.label, styles.required].join(' ')}>
                Email
                <input
                  type="email"
                  className={styles.input}
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@company.com"
                  required
                  autoComplete="email"
                />
              </label>
            </div>

            <label className={styles.label}>
              Company or current website
              <input
                type="text"
                className={styles.input}
                value={form.company}
                onChange={update('company')}
                placeholder="acme.com (optional)"
                autoComplete="organization"
              />
            </label>

            <label className={[styles.label, styles.required].join(' ')}>
              What do you need?
              <select
                className={styles.select}
                value={form.projectType}
                onChange={update('projectType')}
                required
              >
                <option value="" disabled>Pick one</option>
                {PROJECT_TYPES.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </label>

            <label className={[styles.label, styles.required].join(' ')}>
              What does success look like?
              <textarea
                className={styles.textarea}
                value={form.goal}
                onChange={update('goal')}
                placeholder="A few sentences on the goal — more leads, online sales, a faster site, replacing a vendor, etc."
                required
                rows={5}
              />
            </label>

            <div className={styles.row}>
              <label className={styles.label}>
                Budget
                <select
                  className={styles.select}
                  value={form.budget}
                  onChange={update('budget')}
                >
                  <option value="">Optional</option>
                  {BUDGETS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
              <label className={styles.label}>
                Timeline
                <select
                  className={styles.select}
                  value={form.timeline}
                  onChange={update('timeline')}
                >
                  <option value="">Optional</option>
                  {TIMELINES.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className={styles.submitRow}>
              <button
                type="submit"
                className={styles.submit}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending…' : 'Send to Priidik'}
              </button>
              <span className={styles.hint}>
                Goes straight to priidik@agency99.io
              </span>
            </div>
            {status === 'error' && (
              <p className={styles.errorMsg}>
                Something went wrong. Email priidik@agency99.io directly and we&rsquo;ll sort it.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
