import { NAV_ITEMS, PROFILE } from '@/content/profile';
import { PROJECTS } from '@/content/projects';
import { STACK_GROUPS } from '@/content/stack';
import { TIMELINE_COLUMNS } from '@/content/timeline';

/**
 * Milestone 0: every content file rendered as unstyled HTML to prove the
 * types and data are wired. Real components replace this in Milestone 1.
 */
export default function Page() {
  const projects = [...PROJECTS].sort((a, b) => a.order - b.order);

  return (
    <main>
      <header>
        <nav aria-label="Main">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <h1>{PROFILE.name}</h1>
        <p>{PROFILE.role}</p>
        <p>
          {PROFILE.statusLabel} ({PROFILE.status})
        </p>
        <p>{PROFILE.heroLine}</p>
      </header>

      <section id="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.slug}>
              <h3>{project.name}</h3>
              <p>
                {project.tagline} ({project.status})
              </p>
              <p>{project.plainEnglish}</p>
              <p>{project.problem}</p>
              <h4>Interesting decisions</h4>
              <ul>
                {project.decisions.map((decision) => (
                  <li key={decision.title}>
                    <strong>{decision.title}</strong>: {decision.detail}
                  </li>
                ))}
              </ul>
              <p>{project.stack.join(', ')}</p>
              {project.links.github !== null && <a href={project.links.github}>GitHub</a>}
              {project.links.demo !== null && <a href={project.links.demo}>Demo</a>}
            </li>
          ))}
        </ul>
      </section>

      <section id="about" aria-labelledby="about-heading">
        <h2 id="about-heading">About</h2>
        <dl>
          <dt>Name</dt>
          <dd>{PROFILE.name}</dd>
          <dt>Role</dt>
          <dd>{PROFILE.role}</dd>
          <dt>Stack</dt>
          <dd>{PROFILE.stack}</dd>
          {PROFILE.location !== null && (
            <>
              <dt>Location</dt>
              <dd>{PROFILE.location}</dd>
            </>
          )}
          <dt>Status</dt>
          <dd>{PROFILE.statusLabel}</dd>
        </dl>
        <p>{PROFILE.about}</p>
      </section>

      <section id="stack" aria-labelledby="stack-heading">
        <h2 id="stack-heading">Stack</h2>
        {STACK_GROUPS.map((group) => (
          <div key={group.label}>
            <h3>{group.label}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section id="timeline" aria-labelledby="timeline-heading">
        <h2 id="timeline-heading">Timeline</h2>
        {TIMELINE_COLUMNS.map((column) => (
          <div key={column.heading}>
            <h3>{column.heading}</h3>
            {column.items.length === 0 && column.emptyNote !== null ? (
              <p>{column.emptyNote}</p>
            ) : (
              <ul>
                {column.items.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong> ({item.status}): {item.detail}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      <section id="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact</h2>
        {PROFILE.links.email !== null && (
          <p>
            <a href={`mailto:${PROFILE.links.email}`}>Email</a>
          </p>
        )}
        {PROFILE.links.github !== null && (
          <p>
            <a href={PROFILE.links.github}>GitHub</a>
          </p>
        )}
        {PROFILE.links.linkedin !== null && (
          <p>
            <a href={PROFILE.links.linkedin}>LinkedIn</a>
          </p>
        )}
        {PROFILE.links.resume !== null && (
          <p>
            <a href={PROFILE.links.resume}>Résumé</a>
          </p>
        )}
      </section>
    </main>
  );
}
