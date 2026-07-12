import { Tag } from '@/components/ui/Tag';
import type { StackGroup as StackGroupContent } from '@/lib/types';

interface Props {
  group: StackGroupContent;
}

export function StackGroup({ group }: Props) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-widest text-trace-meta">{group.label}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li key={item}>
            <Tag label={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
