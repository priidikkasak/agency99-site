'use client';

import { useState } from 'react';
import styles from './ClientQuestionnaire.module.css';

type Status = 'idle' | 'loading' | 'success' | 'error';

const SOURCING_TYPES = [
  'Manufacturers / factories',
  'Suppliers / wholesalers',
  'Investors / funds',
  'Off-market real estate',
  'Decision-makers (people)',
  'Private-label / OEM production',
  'Something else',
];

const OTHER = 'Something else';

const SCOPES = [
  'One tight shortlist (5-15 contacts)',
  'Medium sweep (30-100 contacts)',
  'Broad map (100+ contacts)',
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
  sourcingTypes: [] as string[],
  otherDescription: '',
  targetMarkets: '',
  goal: '',
  idealContact: '',
  criteria: '',
  scope: '',
  tried: '',
  timeline: '',
};

const Star = () => (
  <span className={styles.star} aria-hidden="true"> *</span>
);

const LabelText = ({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) => (
  <span className={styles.labelText}>
    {children}
    {required && <Star />}
  </span>
);

export function SourcingClientQuestionnaire() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [showTypeError, setShowTypeError] = useState(false);
  const [showScopeError, setShowScopeError] = useState(false);

  const updateField = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleSourcingType = (value: string) => {
    setForm((f) => {
      const has = f.sourcingTypes.includes(value);
      const nextTypes = has
        ? f.sourcingTypes.filter((v) => v !== value)
        : [...f.sourcingTypes, value];
      const stillHasOther = nextTypes.includes(OTHER);
      return {
        ...f,
        sourcingTypes: nextTypes,
        otherDescription: stillHasOther ? f.otherDescription : '',
      };
    });
    setShowTypeError(false);
  };

  const selectSingle = (key: 'scope' | 'timeline', value: string) => {
    setForm((f) => ({ ...f, [key]: f[key] === value ? '' : value }));
    if (key === 'scope') setShowScopeError(false);
  };

  const otherSelected = form.sourcingTypes.includes(OTHER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let invalid = false;
    if (form.sourcingTypes.length === 0) {
      setShowTypeError(true);
      invalid = true;
    }
    if (!form.scope) {
      setShowScopeError(true);
      invalid = true;
    }
    if (invalid) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/sourcing-questionnaire', {
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
            <h1 className={styles.headline}>Thanks - we&rsquo;ve got it.</h1>
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
            Sourcing intake
          </div>
          <h1 className={styles.headline}>Tell us what you&rsquo;re sourcing.</h1>
          <p className={styles.subtext}>
            A few quick questions. Takes about three minutes. You&rsquo;ll get a personal
            reply within 24 hours with a rough scope, timeline and price.
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <label className={styles.label}>
                <LabelText required>Your name</LabelText>
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
              <label className={styles.label}>
                <LabelText required>Email</LabelText>
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
              <LabelText>Company or website</LabelText>
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
                What are you sourcing? (pick any)
                <Star />
              </legend>
              <div className={styles.chipGroup} role="group">
                {SOURCING_TYPES.map((opt) => {
                  const checked = form.sourcingTypes.includes(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      className={[styles.chip, checked ? styles.chipChecked : ''].join(' ')}
                      aria-pressed={checked}
                      onClick={() => toggleSourcingType(opt)}
                    >
                      <span className={styles.chipCheck} aria-hidden="true">
                        {checked ? '✓' : ''}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {otherSelected && (
                <input
                  type="text"
                  className={[styles.input, styles.otherInput].join(' ')}
                  value={form.otherDescription}
                  onChange={updateField('otherDescription')}
                  placeholder="Tell us what - one line is fine"
                  aria-label="What is the something else?"
                />
              )}
              {showTypeError && (
                <p className={styles.errorMsg}>Pick at least one.</p>
              )}
            </fieldset>

            <label className={styles.label}>
              <LabelText required>Target market or geography</LabelText>
              <input
                type="text"
                className={styles.input}
                value={form.targetMarkets}
                onChange={updateField('targetMarkets')}
                placeholder="e.g. Germany + Austria, Baltics, Southeast Asia, EU-wide"
                required
              />
            </label>

            <label className={styles.label}>
              <LabelText required>What does success look like?</LabelText>
              <textarea
                className={styles.textarea}
                value={form.goal}
                onChange={updateField('goal')}
                placeholder="A few sentences on the outcome - closing X supply contracts, raising €Y, buying a property, finding OEM for a new SKU, etc."
                required
                rows={5}
              />
            </label>

            <label className={styles.label}>
              <LabelText>Ideal contact / role at the target company</LabelText>
              <input
                type="text"
                className={styles.input}
                value={form.idealContact}
                onChange={updateField('idealContact')}
                placeholder="e.g. Head of Procurement, GP at Series-A fund, Sales Director"
              />
            </label>

            <label className={styles.label}>
              <LabelText>Must-have criteria (certs, size, price band)</LabelText>
              <textarea
                className={styles.textarea}
                value={form.criteria}
                onChange={updateField('criteria')}
                placeholder="e.g. ENplus A1 cert, MOQ under 500 units, cheque size €200-500k, GMP certified, revenue €5-50M"
                rows={4}
              />
            </label>

            <fieldset className={[styles.label, styles.fieldset].join(' ')}>
              <legend className={styles.legend}>
                Scope
                <Star />
              </legend>
              <div className={styles.chipGroup} role="radiogroup">
                {SCOPES.map((opt) => {
                  const checked = form.scope === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      className={[styles.chip, checked ? styles.chipChecked : ''].join(' ')}
                      aria-pressed={checked}
                      onClick={() => selectSingle('scope', opt)}
                    >
                      <span className={styles.chipCheck} aria-hidden="true">
                        {checked ? '✓' : ''}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {showScopeError && (
                <p className={styles.errorMsg}>Pick one.</p>
              )}
            </fieldset>

            <label className={styles.label}>
              <LabelText>What have you already tried?</LabelText>
              <textarea
                className={styles.textarea}
                value={form.tried}
                onChange={updateField('tried')}
                placeholder="LinkedIn Sales Nav, Alibaba, Apollo, a previous agency - and what did or didn't work. Helps us skip the dead ends."
                rows={4}
              />
            </label>

            <fieldset className={[styles.label, styles.fieldset].join(' ')}>
              <legend className={styles.legend}>Timeline</legend>
              <div className={styles.chipGroup} role="radiogroup">
                {TIMELINES.map((opt) => {
                  const checked = form.timeline === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      className={[styles.chip, checked ? styles.chipChecked : ''].join(' ')}
                      aria-pressed={checked}
                      onClick={() => selectSingle('timeline', opt)}
                    >
                      <span className={styles.chipCheck} aria-hidden="true">
                        {checked ? '✓' : ''}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </fieldset>

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
