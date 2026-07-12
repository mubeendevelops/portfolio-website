'use client';

import { m } from 'framer-motion';

import { StatusChip } from '@/components/ui/StatusChip';
import {
  chipPulseVariants,
  heroRootVariants,
  rootChipPulseVariants,
  useReducedMotion,
} from '@/lib/motion';
import type { Status } from '@/lib/types';

/**
 * The workhorse trace row, shared by the hero and the projects list (claude.md §3).
 * `variant` switches context; never fork this into two near-identical components.
 * List rows that control a panel receive `expand`; the button stretches over the
 * whole row via an ::after overlay so the accessible name stays just the project name.
 *
 * `heroAnimation` opts a row into the hero load-in sequence: 'root' draws the
 * duration bar and delays its chip pulse until the bar lands; 'child' pulses the
 * chip as the row cascades in (the row's slide + fade is orchestrated by TraceHero).
 * Both require a framer-motion parent driving the hidden → visible labels.
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
  heroAnimation?: 'root' | 'child';
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
  heroAnimation,
}: Props) {
  const reducedMotion = useReducedMotion();
  const NameTag: 'h1' | 'h3' | 'span' = headingLevel ?? 'span';
  const isList = variant === 'list';

  const chip = <StatusChip status={status} />;
  const bar = (
    <div
      aria-hidden="true"
      className={`mt-3 h-1 rounded-sm ${
        isRoot
          ? 'bg-trace-accent-dim'
          : `bg-trace-border ${isList ? 'transition-colors duration-micro group-hover:bg-trace-meta' : ''}`
      }`}
      style={{ width: `${barFraction * 100}%` }}
    />
  );

  return (
    <div
      className={`relative rounded-md border bg-trace-surface p-4 ${
        isRoot ? 'border-trace-accent-dim' : 'border-trace-border'
      } ${isList ? 'group transition-colors duration-micro hover:bg-trace-surface-hover' : ''}`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <NameTag
          id={nameId}
          className={`font-mono ${
            isRoot
              ? 'text-base font-semibold text-trace-accent md:text-lg'
              : 'text-sm text-trace-text'
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
        {heroAnimation ? (
          <m.span
            className="inline-flex"
            variants={
              heroAnimation === 'root'
                ? rootChipPulseVariants(reducedMotion)
                : chipPulseVariants(reducedMotion)
            }
          >
            {chip}
          </m.span>
        ) : (
          chip
        )}
      </div>
      {heroAnimation === 'root' ? (
        <m.div className="origin-left" variants={heroRootVariants(reducedMotion)}>
          {bar}
        </m.div>
      ) : (
        bar
      )}
      <p className="mt-2 text-sm text-trace-text-muted">{description}</p>
    </div>
  );
}
