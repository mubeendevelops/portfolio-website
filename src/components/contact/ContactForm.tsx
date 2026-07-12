'use client';

import { useState } from 'react';
import { LazyMotion, m } from 'framer-motion';

import { ResponseCard } from '@/components/contact/ResponseCard';
import { Button } from '@/components/ui/Button';
import { PROFILE } from '@/content/profile';
import { SITE } from '@/content/site';
import { fadeVariants, loadMotionFeatures, useReducedMotion } from '@/lib/motion';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const FIELD_CLASSES =
  'mt-1.5 w-full rounded-md border border-trace-border bg-trace-surface px-3 py-2.5 text-sm text-trace-text';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const reducedMotion = useReducedMotion();
  const { form } = SITE;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.endpoint === null) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    try {
      const response = await fetch(form.endpoint, {
        method: 'POST',
        body: new FormData(event.currentTarget),
        headers: { Accept: 'application/json' },
      });
      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const errorMessage =
    PROFILE.links.email !== null
      ? `${form.errorWithEmail} ${PROFILE.links.email}`
      : form.errorWithoutEmail;

  return (
    <div className="max-w-xl">
      <div aria-live="polite">
        {status === 'success' && (
          <LazyMotion features={loadMotionFeatures} strict>
            <m.div initial="hidden" animate="visible" variants={fadeVariants(reducedMotion)}>
              <ResponseCard />
            </m.div>
          </LazyMotion>
        )}
        {status === 'error' && <p className="mb-4 text-sm text-trace-accent">{errorMessage}</p>}
      </div>
      {status !== 'success' && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="contact-name" className="font-mono text-sm text-trace-text-muted">
              {form.nameLabel}
            </label>
            <input id="contact-name" name="name" type="text" required className={FIELD_CLASSES} />
          </div>
          <div>
            <label htmlFor="contact-email" className="font-mono text-sm text-trace-text-muted">
              {form.emailLabel}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className={FIELD_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="font-mono text-sm text-trace-text-muted">
              {form.messageLabel}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              className={FIELD_CLASSES}
            />
          </div>
          <Button variant="primary" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? form.submittingLabel : form.submitLabel}
          </Button>
        </form>
      )}
    </div>
  );
}
