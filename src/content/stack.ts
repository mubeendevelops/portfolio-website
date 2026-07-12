import type { StackGroup } from '@/lib/types';

export const STACK_GROUPS: StackGroup[] = [
  {
    label: 'Languages',
    items: ['Go', 'TypeScript'],
  },
  {
    label: 'Databases',
    items: ['PostgreSQL', 'Redis'],
  },
  {
    label: 'Infrastructure',
    items: ['Docker', 'Vercel', 'Railway'],
  },
  {
    label: 'Currently Learning',
    items: ['CI/CD', 'Prometheus', 'Grafana'],
  },
];
