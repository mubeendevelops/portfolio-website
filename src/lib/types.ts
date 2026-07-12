/**
 * All content shapes for the site. Types are the contract: change here first,
 * then content, then components (claude.md §3).
 */

export type Status = 'running' | 'in-progress' | 'planned' | 'complete';

export interface Decision {
  title: string;
  detail: string;
}

export interface ProjectLinks {
  github: string | null;
  demo: string | null;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  plainEnglish: string;
  problem: string;
  decisions: Decision[];
  stack: string[];
  status: Status;
  links: ProjectLinks;
  order: number;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface TimelineItem {
  title: string;
  detail: string;
  status: Status;
}

export interface TimelineColumn {
  heading: string;
  status: Status;
  items: TimelineItem[];
  /** Shown when a column has no items yet — honesty over hiding (plan.md §2.5). */
  emptyNote: string | null;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ProfileLinks {
  github: string | null;
  linkedin: string | null;
  email: string | null;
  resume: string | null;
}

export interface Profile {
  name: string;
  role: string;
  stack: string;
  /** null until Mubeen decides what to show — a null row simply doesn't render. */
  location: string | null;
  status: Status;
  statusLabel: string;
  /** One conversational line under the root span in the hero. */
  heroLine: string;
  about: string;
  links: ProfileLinks;
}
