interface Props {
  label: string;
}

export function Tag({ label }: Props) {
  return (
    <span className="inline-flex items-center rounded-md border border-trace-border bg-trace-surface px-2 py-1 font-mono text-xs text-trace-text-muted">
      {label}
    </span>
  );
}
