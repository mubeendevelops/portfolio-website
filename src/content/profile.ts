import type { Profile } from '@/lib/types';

export const PROFILE: Profile = {
  name: 'Mubeen',
  role: 'Backend Engineer',
  stack: 'Go · PostgreSQL · Redis',
  location: null,
  status: 'running',
  statusLabel: 'Open to internships',
  heroLine: 'I build backend systems in Go and care about what happens when they fail.',
  about:
    "I'm a fourth-year engineering student who builds backend systems in Go. I started building a task queue and a real-time chat service because CRUD clones didn't teach me how real systems behave — what happens when a job fails at 2am, when two servers need to share a WebSocket room, or when two people type into the same document at once. Right now I'm learning to run what I build: CI/CD pipelines, Prometheus metrics, Grafana dashboards. If you're hiring backend interns, I'd like to hear from you.",
  links: {
    github: null,
    linkedin: null,
    email: null,
    resume: null,
  },
};
