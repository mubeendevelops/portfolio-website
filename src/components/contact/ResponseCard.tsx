import { SITE } from '@/content/site';

/** The `202 Accepted` card rendered when the contact form submits successfully. */
export function ResponseCard() {
  const { responseCard } = SITE;
  return (
    <div className="max-w-xl rounded-md border border-trace-border bg-trace-surface p-5 sm:p-6">
      <p className="font-mono text-sm text-status-running">{responseCard.statusLine}</p>
      <p className="mt-3 text-base text-trace-text">{responseCard.heading}</p>
      <p className="mt-1 text-sm text-trace-text-muted">{responseCard.body}</p>
    </div>
  );
}
