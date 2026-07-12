'use client';

import { LazyMotion, m } from 'framer-motion';

import { SpanRow } from '@/components/trace/SpanRow';
import { PROFILE } from '@/content/profile';
import { PROJECTS } from '@/content/projects';
import {
  heroChildVariants,
  heroChildrenContainerVariants,
  heroConnectorVariants,
  loadMotionFeatures,
  useReducedMotion,
} from '@/lib/motion';

/**
 * The one orchestrated moment (plan.md §18): root bar draws → connector draws
 * down → child spans cascade in → chips pulse once. ≤1.4s, plays once on load,
 * never loops. Under reduced motion every variant collapses to a static render.
 */
export function TraceHero() {
  const reducedMotion = useReducedMotion();
  const projects = [...PROJECTS].sort((a, b) => a.order - b.order);
  const rootName = `${PROFILE.name.toLowerCase()} · ${PROFILE.role.toLowerCase().replace(/ /g, '-')}`;

  return (
    <section
      id="trace"
      aria-labelledby="trace-heading"
      className="scroll-mt-20 pb-16 pt-24 md:pb-24 md:pt-32"
    >
      <LazyMotion features={loadMotionFeatures} strict>
        <m.div
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-[1100px] px-4 sm:px-6"
        >
          <SpanRow
            variant="hero"
            isRoot
            heroAnimation="root"
            headingLevel="h1"
            nameId="trace-heading"
            name={rootName}
            description={PROFILE.heroLine}
            status={PROFILE.status}
          />
          <p className="mt-3 font-mono text-xs text-trace-accent">{PROFILE.statusLabel}</p>
          <div className="relative mt-6 md:ml-6">
            <m.div
              aria-hidden="true"
              variants={heroConnectorVariants(reducedMotion)}
              className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-trace-border md:block"
            />
            <m.ul
              variants={heroChildrenContainerVariants(reducedMotion)}
              className="space-y-3 md:pl-6"
            >
              {projects.map((project, index) => (
                <m.li key={project.slug} variants={heroChildVariants(reducedMotion)}>
                  <SpanRow
                    variant="hero"
                    heroAnimation="child"
                    name={project.slug}
                    description={project.tagline}
                    status={project.status}
                    barFraction={0.85 - index * 0.2}
                  />
                </m.li>
              ))}
            </m.ul>
          </div>
        </m.div>
      </LazyMotion>
    </section>
  );
}
