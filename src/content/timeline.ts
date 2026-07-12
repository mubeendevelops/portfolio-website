import type { TimelineColumn } from '@/lib/types';

export const TIMELINE_COLUMNS: TimelineColumn[] = [
  {
    heading: 'Shipped',
    status: 'complete',
    items: [],
    emptyNote: 'Nothing shipped yet — first deploys are on the way. The trace is still running.',
  },
  {
    heading: 'In Progress',
    status: 'in-progress',
    items: [
      {
        title: 'DispatchGo',
        detail: 'Core queue, workers, and retry logic working; dead-letter queue and metrics next.',
        status: 'in-progress',
      },
      {
        title: 'ConvoyChat',
        detail: 'Single-node rooms working; building Redis Pub/Sub fan-out across instances.',
        status: 'in-progress',
      },
    ],
    emptyNote: null,
  },
  {
    heading: 'Planned',
    status: 'planned',
    items: [
      {
        title: 'Collab Editor',
        detail: 'A CRDT-based collaborative text editor, built from first principles.',
        status: 'planned',
      },
      {
        title: 'Deploy all projects',
        detail:
          'DispatchGo and ConvoyChat live on Railway with real health checks behind their status chips.',
        status: 'planned',
      },
    ],
    emptyNote: null,
  },
];
