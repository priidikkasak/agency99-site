'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import styles from './ClientQuestionnaire.module.css';

type Status = 'idle' | 'loading' | 'success' | 'error';

const initialForm = {
  name: '',
  email: '',
  company: '',
  projectTypes: [] as string[],
  otherDescription: '',
  goal: '',
  audience: '',
  contentReady: '',
  inspiration: '',
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

export function ClientQuestionnaire() {
  const { t } = useI18n();
  const c = t.webClient;
  const OTHER = c.otherOption;

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [showProjectError, setShowProjectError] = useState(false);
  const [showContentError, setShowContentError] = useState(false);

  const updateField = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleProjectType = (value: string) => {
    setForm((f) => {
      const has = f.projectTypes.includes(value);
      const nextTypes = has
        ? f.projectTypes.filter((v) => v !== value)
        : [...f.projectTypes, value];
      const stillHasOther = nextTypes.includes(OTHER);
      return {
        ...f,
        projectTypes: nextTypes,
        otherDescription: stillHasOther ? f.otherDescription : '',
      };
    });
    setShowProjectError(false);
  };

  const selectSingle = (key: 'contentReady' | 'timeline', value: string) => {
    setForm((f) => ({ ...f, [key]: f[key] === value ? '' : value }));
    if (key === 'contentReady') setShowContentError(false);
  };

  const otherSelected = form.projectTypes.includes(OTHER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let invalid = false;
    if (form.projectTypes.length === 0) {
      setShowProjectError(true);
      invalid = true;
    }
    if (!form.contentReady) {
      setShowContentError(true);
      invalid = true;
    }
    if (invalid) return;
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
              {c.success.eyebrow}
            </div>
            <h1 className={styles.headline}>{c.success.headline}</h1>
            <p className={styles.subtext}>
              {c.success.subtextBefore}
              <strong style={{ color: 'var(--text-primary)' }}>{c.success.subtextEmail}</strong>
              {c.success.subtextAfter}
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
            {c.eyebrow}
          </div>
          <h1 className={styles.headline}>{c.headline}</h1>
          <p className={styles.subtext}>{c.subtext}</p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <label className={styles.label}>
                <LabelText required>{c.labels.name}</LabelText>
                <input
                  type="text"
                  className={styles.input}
                  value={form.name}
                  onChange={updateField('name')}
                  placeholder={c.placeholders.name}
                  required
                  autoComplete="name"
                />
              </label>
              <label className={styles.label}>
                <LabelText required>{c.labels.email}</LabelText>
                <input
                  type="email"
                  className={styles.input}
                  value={form.email}
                  onChange={updateField('email')}
                  placeholder={c.placeholders.email}
                  required
                  autoComplete="email"
                />
              </label>
            </div>

            <label className={styles.label}>
              <LabelText>{c.labels.company}</LabelText>
              <input
                type="text"
                className={styles.input}
                value={form.company}
                onChange={updateField('company')}
                placeholder={c.placeholders.company}
                autoComplete="organization"
              />
            </label>

            <fieldset className={[styles.label, styles.fieldset].join(' ')}>
              <legend className={styles.legend}>
                {c.labels.projectTypes}
                <Star />
              </legend>
              <div className={styles.chipGroup} role="group">
                {c.chips.types.map((opt) => {
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
              {otherSelected && (
                <input
                  type="text"
                  className={[styles.input, styles.otherInput].join(' ')}
                  value={form.otherDescription}
                  onChange={updateField('otherDescription')}
                  placeholder={c.placeholders.otherDescription}
                  aria-label={c.labels.projectTypes}
                />
              )}
              {showProjectError && (
                <p className={styles.errorMsg}>{c.errors.pickAtLeastOne}</p>
              )}
            </fieldset>

            <label className={styles.label}>
              <LabelText required>{c.labels.goal}</LabelText>
              <textarea
                className={styles.textarea}
                value={form.goal}
                onChange={updateField('goal')}
                placeholder={c.placeholders.goal}
                required
                rows={5}
              />
            </label>

            <label className={styles.label}>
              <LabelText required>{c.labels.audience}</LabelText>
              <input
                type="text"
                className={styles.input}
                value={form.audience}
                onChange={updateField('audience')}
                placeholder={c.placeholders.audience}
                required
              />
            </label>

            <fieldset className={[styles.label, styles.fieldset].join(' ')}>
              <legend className={styles.legend}>
                {c.labels.contentReady}
                <Star />
              </legend>
              <div className={styles.chipGroup} role="radiogroup">
                {c.chips.contentReady.map((opt) => {
                  const checked = form.contentReady === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      className={[styles.chip, checked ? styles.chipChecked : ''].join(' ')}
                      aria-pressed={checked}
                      onClick={() => selectSingle('contentReady', opt)}
                    >
                      <span className={styles.chipCheck} aria-hidden="true">
                        {checked ? '✓' : ''}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {showContentError && (
                <p className={styles.errorMsg}>{c.errors.pickOne}</p>
              )}
            </fieldset>

            <label className={styles.label}>
              <LabelText>{c.labels.inspiration}</LabelText>
              <textarea
                className={styles.textarea}
                value={form.inspiration}
                onChange={updateField('inspiration')}
                placeholder={c.placeholders.inspiration}
                rows={4}
              />
            </label>

            <fieldset className={[styles.label, styles.fieldset].join(' ')}>
              <legend className={styles.legend}>{c.labels.timeline}</legend>
              <div className={styles.chipGroup} role="radiogroup">
                {c.chips.timelines.map((opt) => {
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
                {status === 'loading' ? c.submitting : c.submit}
              </button>
              <span className={styles.hint}>{c.hint}</span>
            </div>
            {status === 'error' && (
              <p className={styles.errorMsg}>{c.errors.generic}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
