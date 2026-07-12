import type { Decision } from '@/lib/types';

interface Props {
  decisions: Decision[];
}

export function DecisionList({ decisions }: Props) {
  return (
    <dl className="mt-3 space-y-3">
      {decisions.map((decision) => (
        <div key={decision.title}>
          <dt className="text-sm font-semibold text-trace-text">{decision.title}</dt>
          <dd className="mt-0.5 text-sm text-trace-text-muted">{decision.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
