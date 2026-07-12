import { StatusChip } from '@/components/ui/StatusChip';
import { PROFILE } from '@/content/profile';
import { SITE } from '@/content/site';

export function MetadataCard() {
  const rows = [
    { label: SITE.aboutLabels.name, value: PROFILE.name },
    { label: SITE.aboutLabels.role, value: PROFILE.role },
    { label: SITE.aboutLabels.stack, value: PROFILE.stack },
    ...(PROFILE.location !== null
      ? [{ label: SITE.aboutLabels.location, value: PROFILE.location }]
      : []),
  ];

  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-start">
      <dl className="rounded-md border border-trace-border bg-trace-surface p-5 font-mono text-sm sm:p-6">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-trace-border py-2.5"
          >
            <dt className="text-trace-meta">{row.label}</dt>
            <dd className="text-right text-trace-text">{row.value}</dd>
          </div>
        ))}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
          <dt className="text-trace-meta">{SITE.aboutLabels.status}</dt>
          <dd className="flex items-center gap-2">
            <StatusChip status={PROFILE.status} />
            <span className="text-trace-text">{PROFILE.statusLabel}</span>
          </dd>
        </div>
      </dl>
      <p className="text-base leading-relaxed text-trace-text">{PROFILE.about}</p>
    </div>
  );
}
