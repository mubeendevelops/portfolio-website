'use client';

import { useEffect, useRef, useState } from 'react';

import { ProjectPanel } from '@/components/projects/ProjectPanel';
import { SpanRow } from '@/components/trace/SpanRow';
import { PROJECTS } from '@/content/projects';

function panelId(slug: string): string {
  return `project-panel-${slug}`;
}

function triggerId(slug: string): string {
  return `project-trigger-${slug}`;
}

export function ProjectList() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  /* Focus the panel only after a user toggle, never on mount. */
  const interacted = useRef(false);

  useEffect(() => {
    if (!interacted.current || openSlug === null) return;
    document.getElementById(panelId(openSlug))?.focus();
  }, [openSlug]);

  function toggle(slug: string) {
    interacted.current = true;
    setOpenSlug((previous) => (previous === slug ? null : slug));
  }

  function closeAndRefocus(slug: string) {
    setOpenSlug(null);
    document.getElementById(triggerId(slug))?.focus();
  }

  const projects = [...PROJECTS].sort((a, b) => a.order - b.order);

  return (
    <ul className="flex flex-col gap-4">
      {projects.map((project, index) => {
        const open = openSlug === project.slug;
        return (
          <li
            key={project.slug}
            onKeyDown={(event) => {
              if (event.key === 'Escape' && open) closeAndRefocus(project.slug);
            }}
          >
            <SpanRow
              variant="list"
              headingLevel="h3"
              name={project.name}
              description={project.tagline}
              status={project.status}
              barFraction={0.85 - index * 0.2}
              expand={{
                panelId: panelId(project.slug),
                triggerId: triggerId(project.slug),
                expanded: open,
                onToggle: () => toggle(project.slug),
              }}
            />
            <ProjectPanel
              project={project}
              open={open}
              panelId={panelId(project.slug)}
              triggerId={triggerId(project.slug)}
            />
          </li>
        );
      })}
    </ul>
  );
}
