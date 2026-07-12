import type { NavItem, SiteCopy } from '@/lib/types';

export const SITE: SiteCopy = {
  identityMark: 'mubeen@portfolio:~',
  skipToContent: 'Skip to content',
  navLabel: 'Main',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  sections: {
    projects: 'Projects',
    about: 'About',
    stack: 'Stack',
    timeline: 'Timeline',
    contact: 'Contact',
  },
  decisionsHeading: 'Interesting decisions',
  stackListLabel: 'Built with',
  githubLabel: 'View on GitHub',
  demoLabel: 'Live demo',
  aboutLabels: {
    name: 'Name',
    role: 'Role',
    stack: 'Stack',
    location: 'Location',
    status: 'Status',
  },
  contactIntro:
    'Have an internship, a question about how one of these projects works, or feedback on the site itself? My inbox is open.',
  contactLinks: {
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    resume: 'Résumé',
  },
  form: {
    nameLabel: 'Name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    submitLabel: 'Send message',
    submittingLabel: 'Sending…',
    errorWithEmail: 'Request failed — email me directly instead:',
    errorWithoutEmail:
      "Request failed — this form isn't connected to a delivery service yet. Direct contact links land here soon.",
    endpoint: null,
  },
  responseCard: {
    statusLine: '202 Accepted',
    heading: 'Message queued.',
    body: "Thanks for writing — I read everything that lands here and I'll get back to you soon.",
  },
  footerLine: 'end of trace — thanks for reading',
};

/* Derived from section titles so nav labels and headings can never drift apart. */
export const NAV_ITEMS: NavItem[] = [
  { label: SITE.sections.projects, href: '#projects' },
  { label: SITE.sections.about, href: '#about' },
  { label: SITE.sections.stack, href: '#stack' },
  { label: SITE.sections.timeline, href: '#timeline' },
  { label: SITE.sections.contact, href: '#contact' },
];
