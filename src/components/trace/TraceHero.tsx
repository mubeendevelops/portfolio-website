import { SpanRow } from '@/components/trace/SpanRow';
import { PROFILE } from '@/content/profile';
import { PROJECTS } from '@/content/projects';

/** Static in Milestone 1 — the load-in animation sequence arrives in Milestone 2. */
export function TraceHero() {
  const projects = [...PROJECTS].sort((a, b) => a.order - b.order);
  const rootName = `${PROFILE.name.toLowerCase()} · ${PROFILE.role.toLowerCase().replace(/ /g, '-')}`;

  return (
    <section id="trace" aria-labelledby="trace-heading" className="scroll-mt-20 pb-16 pt-24 md:pb-24 md:pt-32">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        <SpanRow
          variant="hero"
          isRoot
          headingLevel="h1"
          nameId="trace-heading"
          name={rootName}
          description={PROFILE.heroLine}
          status={PROFILE.status}
        />
        <p className="mt-3 font-mono text-xs text-trace-accent">{PROFILE.statusLabel}</p>
        <ul className="mt-6 space-y-3 md:ml-6 md:border-l md:border-trace-border md:pl-6">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <SpanRow
                variant="hero"
                name={project.slug}
                description={project.tagline}
                status={project.status}
                barFraction={0.85 - index * 0.2}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
