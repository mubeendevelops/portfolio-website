import type { Status } from '@/lib/types';

/** The single source of status → symbol/label/color mapping (claude.md §3). */
interface StatusStyle {
  symbol: string;
  label: string;
  srLabel: string;
  colorClass: string;
}

const STATUS_STYLES: Record<Status, StatusStyle> = {
  running: {
    symbol: '●',
    label: 'RUNNING',
    srLabel: 'Status: deployed and running',
    colorClass: 'text-status-running',
  },
  'in-progress': {
    symbol: '◐',
    label: 'IN PROGRESS',
    srLabel: 'Status: in progress',
    colorClass: 'text-status-progress',
  },
  planned: {
    symbol: '○',
    label: 'PLANNED',
    srLabel: 'Status: planned',
    colorClass: 'text-status-planned',
  },
  complete: {
    symbol: '✓',
    label: 'COMPLETE',
    srLabel: 'Status: complete',
    colorClass: 'text-status-complete',
  },
};

interface Props {
  status: Status;
}

export function StatusChip({ status }: Props) {
  const style = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-trace-border px-2 py-0.5 font-mono text-xs ${style.colorClass}`}
    >
      <span aria-hidden="true">{style.symbol}</span>
      <span aria-hidden="true">{style.label}</span>
      <span className="sr-only">{style.srLabel}</span>
    </span>
  );
}
