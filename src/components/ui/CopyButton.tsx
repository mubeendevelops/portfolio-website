'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { DURATIONS } from '@/lib/motion';

/** Copies `value` to the clipboard; shows a check + confirmation, then reverts. */
interface Props {
  value: string;
  label: string;
  copiedLabel: string;
}

export function CopyButton({ value, label, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);
  const revertTimeout = useRef<number>();

  useEffect(() => () => window.clearTimeout(revertTimeout.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* Clipboard unavailable (permissions, http) — leave the button unchanged. */
      return;
    }
    setCopied(true);
    window.clearTimeout(revertTimeout.current);
    revertTimeout.current = window.setTimeout(() => setCopied(false), DURATIONS.copyRevert * 1000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-trace-border px-4 font-mono text-sm text-trace-text transition-colors duration-micro hover:border-trace-meta hover:bg-trace-surface-hover"
    >
      {copied ? (
        <Check size={16} aria-hidden="true" className="text-status-running" />
      ) : (
        <Copy size={16} aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
