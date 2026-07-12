import { StatusChip } from '@/components/ui/StatusChip';
import type { Status } from '@/lib/types';

/**
 * The workhorse trace row, shared by the hero and the projects list (claude.md §3).
 * `variant` switches context; never fork this into two near-identical components.
 * List rows that control a panel receive `expand`; the button stretches over the
 * whole row via an ::after overlay so the accessible name stays just the project name.
 */
interface ExpandControls {
  panelId: string;
  triggerId: string;
  expanded: boolean;
  onToggle: () => void;
}

interface Props {
  variant: 'hero' | 'list';
  name: string;
  description: string;
  status: Status;
  /** Hero root span: amber identity styling. */
  isRoot?: boolean;
  headingLevel?: 'h1' | 'h3';
  /** id for the name element, for aria-labelledby from outside. */
  nameId?: string;
  /** Width of the decorative duration bar, 0–1. */
  barFraction?: number;
  expand?: ExpandControls;
}

export function SpanRow({
  variant,
  name,
  description,
  status,
  isRoot = false,
  headingLevel,
  nameId,
  barFraction = 1,
  expand,
}: Props) {
  const NameTag: 'h1' | 'h3' | 'span' = headingLevel ?? 'span';
  const isList = variant === 'list';

  return (
    <div
      className={`relative rounded-md border bg-trace-surface p-4 ${
        isRoot ? 'border-trace-accent-dim' : 'border-trace-border'
      } ${isList ? 'hover:bg-trace-surface-hover' : ''}`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <NameTag
          id={nameId}
          className={`font-mono ${
            isRoot ? 'text-base font-semibold text-trace-accent md:text-lg' : 'text-sm text-trace-text'
          }`}
        >
          {expand ? (
            <button
              type="button"
              id={expand.triggerId}
              aria-expanded={expand.expanded}
              aria-controls={expand.panelId}
              onClick={expand.onToggle}
              className="text-left after:absolute after:inset-0 after:content-['']"
            >
              {name}
            </button>
          ) : (
            name
          )}
        </NameTag>
        <StatusChip status={status} />
      </div>
      <div
        aria-hidden="true"
        className={`mt-3 h-1 rounded-sm ${isRoot ? 'bg-trace-accent-dim' : 'bg-trace-border'}`}
        style={{ width: `${barFraction * 100}%` }}
      />
      <p className="mt-2 text-sm text-trace-text-muted">{description}</p>
    </div>
  );
}
