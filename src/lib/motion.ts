/**
 * The site's entire motion personality lives here (claude.md §8, plan.md §18).
 * Components import variants from this file and NEVER define inline timing values.
 *
 * Every variant factory takes `reducedMotion` and returns an instant, opacity-only
 * (or fully static) counterpart when true — the reduced path can't be forgotten
 * because there is no way to get a variant without answering the question.
 *
 * The hero sequence (root draw → connectors → child stagger → single chip pulse)
 * is the only orchestrated animation: ≤1.4s total, plays once, never loops.
 */

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';
import type { Transition, Variants } from 'framer-motion';

/** All durations in seconds. If a number isn't here, it doesn't exist. */
export const DURATIONS = {
  /** Hover/micro-interactions: background lift, border brighten. */
  micro: 0.12,
  /** Desktop side-panel slide + fade. */
  panel: 0.2,
  /** Mobile accordion height animation. */
  panelMobile: 0.25,
  /** Hero root span bar draws left → right. */
  heroRoot: 0.5,
  /** Hero connector lines draw down. */
  heroConnector: 0.2,
  /** Stagger gap between hero child spans. */
  heroStagger: 0.12,
  /** Each hero child span's slide + fade. */
  heroChild: 0.25,
  /** Status chip's single pulse. */
  chipPulse: 0.4,
  /** CopyButton icon reverts from check to copy. */
  copyRevert: 1.5,
} as const;

export const EASINGS = {
  /** Entrances. */
  out: 'easeOut',
  /** Exits. */
  in: 'easeIn',
} as const;

/** Distances in px. Precision tooling: small, deliberate movements only. */
export const DISTANCES = {
  heroChildSlide: 8,
  panelSlide: 24,
} as const;

const INSTANT: Transition = { duration: 0 };

/** Root span bar: draws left → right on load. */
export function heroRootVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return { hidden: { opacity: 1, scaleX: 1 }, visible: { opacity: 1, scaleX: 1 } };
  }
  return {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: DURATIONS.heroRoot, ease: EASINGS.out },
    },
  };
}

/** Connector lines: draw downward after the root bar lands. */
export function heroConnectorVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return { hidden: { opacity: 1, scaleY: 1 }, visible: { opacity: 1, scaleY: 1 } };
  }
  return {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: DURATIONS.heroConnector,
        ease: EASINGS.out,
        delay: DURATIONS.heroRoot,
      },
    },
  };
}

/** Parent orchestrator for the child spans: staggers children in after connectors. */
export function heroChildrenContainerVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return { hidden: { opacity: 1 }, visible: { opacity: 1, transition: INSTANT } };
  }
  return {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: DURATIONS.heroRoot + DURATIONS.heroConnector,
        staggerChildren: DURATIONS.heroStagger,
      },
    },
  };
}

/** Each child span: 8px slide up + fade, driven by the container's stagger. */
export function heroChildVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: DISTANCES.heroChildSlide },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATIONS.heroChild, ease: EASINGS.out },
    },
  };
}

/** Status chip pulses exactly once at the end of the hero sequence, then holds. */
export function chipPulseVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } };
  }
  return {
    hidden: { opacity: 0, scale: 1 },
    visible: {
      opacity: 1,
      scale: [1, 1.15, 1],
      transition: { duration: DURATIONS.chipPulse, ease: EASINGS.out },
    },
  };
}

/** Desktop project panel: 24px slide-in + fade; exits ease in. */
export function panelDesktopVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0, x: 0, transition: INSTANT },
      visible: { opacity: 1, x: 0, transition: INSTANT },
    };
  }
  return {
    hidden: {
      opacity: 0,
      x: DISTANCES.panelSlide,
      transition: { duration: DURATIONS.panel, ease: EASINGS.in },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: DURATIONS.panel, ease: EASINGS.out },
    },
  };
}

/** Mobile project panel: inline accordion, height-animated. */
export function panelMobileVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0, height: 0, transition: INSTANT },
      visible: { opacity: 1, height: 'auto', transition: INSTANT },
    };
  }
  return {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: DURATIONS.panelMobile, ease: EASINGS.in },
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: DURATIONS.panelMobile, ease: EASINGS.out },
    },
  };
}

/** Generic fade for small reveals (ResponseCard, menu overlay). */
export function fadeVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0, transition: INSTANT },
      visible: { opacity: 1, transition: INSTANT },
    };
  }
  return {
    hidden: { opacity: 0, transition: { duration: DURATIONS.micro, ease: EASINGS.in } },
    visible: { opacity: 1, transition: { duration: DURATIONS.micro, ease: EASINGS.out } },
  };
}

/**
 * Shared reduced-motion hook. Framer returns `null` while unknown (SSR);
 * we treat unknown as reduced so the first paint never animates for someone
 * who asked it not to.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? true;
}
