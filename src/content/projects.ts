import type { Project } from '@/lib/types';

export const PROJECTS: Project[] = [
  {
    slug: 'dispatchgo',
    name: 'DispatchGo',
    tagline: 'A task queue that retries, backs off, and never loses a job.',
    plainEnglish:
      'Manages background work reliably — enqueue a task, workers process it asynchronously, failures retry automatically, and nothing gets silently dropped.',
    problem:
      'Every real backend eventually needs to do work outside the request cycle — send an email, resize an image, call a flaky third-party API. I wanted to understand what actually happens when that work fails at 2am: how retries avoid hammering a struggling dependency, where permanently failed jobs go, and how you know any of it is happening. So I built the queue instead of installing one.',
    decisions: [
      {
        title: 'Exponential backoff with jitter',
        detail:
          'Failed jobs retry at 2^n intervals with random jitter, so a failing dependency gets breathing room instead of a synchronized stampede of retries.',
      },
      {
        title: 'Dead-letter queue',
        detail:
          'Jobs that exhaust their retries land in a dead-letter queue for inspection and manual replay — failures are captured, never silently dropped.',
      },
      {
        title: 'Redis sorted sets for scheduling',
        detail:
          'Delayed and retrying jobs live in a sorted set scored by run-at timestamp, so "what is due now" is a single cheap range query instead of a polling scan.',
      },
      {
        title: 'At-least-once delivery, idempotent handlers',
        detail:
          'The queue guarantees at-least-once delivery and the docs push handlers to be idempotent — the honest trade-off, since exactly-once is a lie somewhere.',
      },
      {
        title: 'Prometheus metrics from day one',
        detail:
          'Queue depth, job latency, and retry counts are exported as Prometheus metrics — a queue you cannot observe is a queue you cannot trust.',
      },
    ],
    stack: ['Go', 'Redis', 'PostgreSQL', 'Prometheus'],
    status: 'in-progress',
    links: { github: null, demo: null },
    order: 1,
  },
  {
    slug: 'convoychat',
    name: 'ConvoyChat',
    tagline: 'Real-time chat that scales past a single server.',
    plainEnglish:
      'A chat service where messages arrive instantly for everyone in a room — even when the people in that room are connected to different server instances.',
    problem:
      'WebSocket chat on one server is a tutorial. The interesting problem starts at server number two: a message arriving on instance A has to reach a user connected to instance B, dead connections have to be noticed and cleaned up, and history has to survive restarts. ConvoyChat is my working answer to those three problems.',
    decisions: [
      {
        title: 'Redis Pub/Sub for cross-instance fan-out',
        detail:
          'Each instance publishes room messages to Redis channels and subscribes for its connected users, so instances stay stateless about each other and horizontal scaling is just adding a node.',
      },
      {
        title: 'Heartbeats and dead-connection reaping',
        detail:
          'Ping/pong heartbeats with deadlines detect silently dropped connections — TCP will happily keep a dead phone connection "open" for minutes if you let it.',
      },
      {
        title: 'PostgreSQL persistence with cursor pagination',
        detail:
          'Messages are persisted with monotonic IDs, and history loads through cursor-based pagination — offset pagination breaks the moment new messages arrive mid-scroll.',
      },
      {
        title: 'Presence via Redis TTL keys',
        detail:
          'Online status is a key with a short TTL refreshed by heartbeats, so a crashed client goes offline by expiry — no cleanup job, no stale green dots.',
      },
    ],
    stack: ['Go', 'WebSockets', 'Redis', 'PostgreSQL'],
    status: 'in-progress',
    links: { github: null, demo: null },
    order: 2,
  },
  {
    slug: 'collab-editor',
    name: 'Collab Editor',
    tagline: 'A collaborative text editor where conflicts resolve themselves.',
    plainEnglish:
      'Multiple people type into the same document at once, and everyone ends up seeing the same text — without a server deciding whose keystroke wins.',
    problem:
      'Concurrent edits are the hardest state problem I know of that fits in a side project: two users insert at the same position, packets arrive out of order, someone edits offline for an hour. I want to build the merge logic myself — a CRDT from first principles — rather than importing a library and calling it done.',
    decisions: [
      {
        title: 'CRDT over operational transformation',
        detail:
          'CRDTs guarantee convergence without a central server ordering operations, which fits a peer-friendly architecture and is the approach I most want to understand deeply.',
      },
      {
        title: 'Sequence CRDT with tombstones (planned)',
        detail:
          'Characters get stable unique IDs and deletions become tombstones, so concurrent inserts at the same spot converge deterministically on every replica.',
      },
      {
        title: 'WebSocket sync layer reused from ConvoyChat',
        detail:
          'The connection lifecycle work from ConvoyChat — heartbeats, reconnection, fan-out — carries over, so this project spends its complexity budget on the CRDT itself.',
      },
    ],
    stack: ['Go', 'TypeScript', 'WebSockets', 'CRDTs'],
    status: 'planned',
    links: { github: null, demo: null },
    order: 3,
  },
];
