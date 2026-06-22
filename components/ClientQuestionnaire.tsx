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

const CONTENT_READY = [
  'I have copy and images ready',
  'I have some — need help with the rest',
  'I need help with everything',
];

const TIMELINES = [
  'ASAP',
  'Within 2 weeks',
  'Within a month',
  'Flexible',
];

const initialForm = {
  name: '',
  email: '',
  company: '',
  projectTypes: [] as string[],
  goal: '',
  audience: '',
  contentReady: '',
  inspiration: '',
  timeline: '',
};

export function ClientQuestionnaire() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [showProjectError, setShowProjectError] = useState(false);

  const updateField = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleProjectType = (value: string) => {
    setForm((f) => {
      const has = f.projectTypes.includes(value);
      return {
        ...f,
        projectTypes: has
          ? f.projectTypes.filter((v) => v !== value)
          : [...f.projectTypes, value],
      };
    });
    setShowProjectError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.projectTypes.length === 0) {
      setShowProjectError(true);
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/client-questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm(initialForm);
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
            A few quick questions. Takes about three minutes. You&rsquo;ll get a personal
            reply within 24 hours.
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <label className={[styles.label, styles.required].join(' ')}>
                Your name
                <input
                  type="text"
                  className={styles.input}
                  value={form.name}
                  onChange={updateField('name')}
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
                  onChange={updateField('email')}
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
                onChange={updateField('company')}
                placeholder="acme.com (optional)"
                autoComplete="organization"
              />
            </label>

            <fieldset className={[styles.label, styles.fieldset].join(' ')}>
              <legend className={styles.legend}>
                What do you need? (pick any)
                <span className={styles.legendStar} aria-hidden="true"> *</span>
              </legend>
              <div className={styles.chipGroup} role="group">
                {PROJECT_TYPES.map((opt) => {
                  const checked = form.projectTypes.includes(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      className={[styles.chip, checked ? styles.chipChecked : ''].join(' ')}
                      aria-pressed={checked}
                      onClick={() => toggleProjectType(opt)}
                    >
                      <span className={styles.chipCheck} aria-hidden="true">
                        {checked ? '✓' : ''}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {showProjectError && (
                <p className={styles.errorMsg}>Pick at least one.</p>
              )}
            </fieldset>

            <label className={[styles.label, styles.required].join(' ')}>
              What does success look like?
              <textarea
                className={styles.textarea}
                value={form.goal}
                onChange={updateField('goal')}
                placeholder="A few sentences on the goal — more leads, online sales, a faster site, replacing a vendor, etc."
                required
                rows={5}
              />
            </label>

            <label className={[styles.label, styles.required].join(' ')}>
              Who is it for?
              <input
                type="text"
                className={styles.input}
                value={form.audience}
                onChange={updateField('audience')}
                placeholder="e.g. B2B SaaS founders, local restaurants, designers in Tallinn"
                required
              />
            </label>

            <label className={[styles.label, styles.required].join(' ')}>
              Content readiness
              <select
                className={styles.select}
                value={form.contentReady}
                onChange={updateField('contentReady')}
                required
              >
                <option value="" disabled>Pick one</option>
                {CONTENT_READY.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </label>

            <label className={styles.label}>
              Sites or brands you like (inspiration)
              <textarea
                className={styles.textarea}
                value={form.inspiration}
                onChange={updateField('inspiration')}
                placeholder="Drop 2–3 URLs or names + a line on what you like about each (layout, vibe, copy, animation, etc.)"
                rows={4}
              />
            </label>

            <label className={styles.label}>
              Timeline
              <select
                className={styles.select}
                value={form.timeline}
                onChange={updateField('timeline')}
              >
                <option value="">Optional</option>
                {TIMELINES.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </label>

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
