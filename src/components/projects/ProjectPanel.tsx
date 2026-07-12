import { DecisionList } from '@/components/projects/DecisionList';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { SITE } from '@/content/site';
import type { Project } from '@/lib/types';

/**
 * Expandable project detail. Stays in the DOM when closed (`hidden`, not
 * unmounted) so the content is crawlable (plan.md §16). tabIndex={-1} lets
 * ProjectList move focus in on open.
 */
interface Props {
  project: Project;
  open: boolean;
  panelId: string;
  triggerId: string;
}

export function ProjectPanel({ project, open, panelId, triggerId }: Props) {
  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      hidden={!open}
      tabIndex={-1}
      className="mt-2 rounded-md border border-trace-border bg-trace-surface p-4 sm:p-6"
    >
      <p className="text-base text-trace-text">{project.plainEnglish}</p>
      <p className="mt-3 text-sm leading-relaxed text-trace-text-muted">{project.problem}</p>
      <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-trace-meta">
        {SITE.decisionsHeading}
      </h4>
      <DecisionList decisions={project.decisions} />
      <ul aria-label={SITE.stackListLabel} className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li key={item}>
            <Tag label={item} />
          </li>
        ))}
      </ul>
      {(project.links.github !== null || project.links.demo !== null) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.github !== null && (
            <Button variant="ghost" href={project.links.github} external>
              {SITE.githubLabel}
            </Button>
          )}
          {project.links.demo !== null && (
            <Button variant="primary" href={project.links.demo} external>
              {SITE.demoLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
