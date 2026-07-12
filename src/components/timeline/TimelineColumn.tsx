import { StatusChip } from '@/components/ui/StatusChip';
import type { TimelineColumn as TimelineColumnContent } from '@/lib/types';

interface Props {
  column: TimelineColumnContent;
}

export function TimelineColumn({ column }: Props) {
  return (
    <div className="rounded-md border border-trace-border bg-trace-surface p-5">
      <h3 className="font-mono text-xs uppercase tracking-widest text-trace-meta">{column.heading}</h3>
      {column.items.length === 0 ? (
        column.emptyNote !== null && (
          <p className="mt-4 text-sm text-trace-text-muted">{column.emptyNote}</p>
        )
      ) : (
        <ul className="mt-4 space-y-4">
          {column.items.map((item) => (
            <li key={item.title}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm text-trace-text">{item.title}</span>
                <StatusChip status={item.status} />
              </div>
              <p className="mt-1 text-sm text-trace-text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
