import { MetadataCard } from '@/components/about/MetadataCard';
import { ContactForm } from '@/components/contact/ContactForm';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Section } from '@/components/layout/Section';
import { ProjectList } from '@/components/projects/ProjectList';
import { StackGroup } from '@/components/stack/StackGroup';
import { TimelineColumn } from '@/components/timeline/TimelineColumn';
import { TraceHero } from '@/components/trace/TraceHero';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { PROFILE } from '@/content/profile';
import { SITE } from '@/content/site';
import { STACK_GROUPS } from '@/content/stack';
import { TIMELINE_COLUMNS } from '@/content/timeline';

export default function Page() {
  const directLinks = [
    {
      href: PROFILE.links.email !== null ? `mailto:${PROFILE.links.email}` : null,
      label: SITE.contactLinks.email,
      external: false,
    },
    { href: PROFILE.links.github, label: SITE.contactLinks.github, external: true },
    { href: PROFILE.links.linkedin, label: SITE.contactLinks.linkedin, external: true },
    { href: PROFILE.links.resume, label: SITE.contactLinks.resume, external: false },
  ].filter(
    (link): link is { href: string; label: string; external: boolean } => link.href !== null,
  );

  return (
    <>
      <Navbar />
      <main id="main" className="pt-14">
        <TraceHero />
        <Section id="projects" title={SITE.sections.projects}>
          <ProjectList />
        </Section>
        <Section id="about" title={SITE.sections.about}>
          <MetadataCard />
        </Section>
        <Section id="stack" title={SITE.sections.stack}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STACK_GROUPS.map((group) => (
              <StackGroup key={group.label} group={group} />
            ))}
          </div>
        </Section>
        <Section id="timeline" title={SITE.sections.timeline}>
          <div className="grid gap-4 md:grid-cols-3">
            {TIMELINE_COLUMNS.map((column) => (
              <TimelineColumn key={column.heading} column={column} />
            ))}
          </div>
        </Section>
        <Section id="contact" title={SITE.sections.contact}>
          <p className="max-w-xl text-base leading-relaxed text-trace-text">{SITE.contactIntro}</p>
          {(directLinks.length > 0 || PROFILE.links.email !== null) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {directLinks.map((link) => (
                <Button key={link.label} variant="ghost" href={link.href} external={link.external}>
                  {link.label}
                </Button>
              ))}
              {PROFILE.links.email !== null && (
                <CopyButton
                  value={PROFILE.links.email}
                  label={SITE.contactLinks.copyEmail}
                  copiedLabel={SITE.contactLinks.copyEmailDone}
                />
              )}
            </div>
          )}
          <div className="mt-8">
            <ContactForm />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
