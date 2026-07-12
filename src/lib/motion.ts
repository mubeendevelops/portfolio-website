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

import { useEffect, useState } from 'react';
import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';
import type { FeatureBundle, Transition, Variants } from 'framer-motion';

/**
 * Every <LazyMotion> in the app uses this loader: the domAnimation feature
 * bundle ships as its own async chunk, keeping it out of first-load JS
 * (plan.md §17). `m` components render initial styles statically until it lands.
 */
export function loadMotionFeatures(): Promise<FeatureBundle> {
  return import('@/lib/motionFeatures').then((mod) => mod.default);
}

/** All durations in seconds. If a number isn't here, it doesn't exist. */
export const DURATIONS = {
  /**
   * Hover/micro-interactions: background lift, border brighten.
   * CSS hovers can't read this file — `--trace-duration-micro` in globals.css
   * mirrors it (surfaced as Tailwind's `duration-micro`). Change both together.
   */
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

/** How far a status chip swells during its single pulse. */
const CHIP_PULSE_SCALE = 1.15;

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

/** Child span's status chip: pulses exactly once as its row lands, then holds. */
export function chipPulseVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } };
  }
  return {
    hidden: { opacity: 0, scale: 1 },
    visible: {
      opacity: 1,
      scale: [1, CHIP_PULSE_SCALE, 1],
      transition: { duration: DURATIONS.chipPulse, ease: EASINGS.out },
    },
  };
}

/** Root span's chip: same single pulse, held back until the root bar finishes drawing. */
export function rootChipPulseVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } };
  }
  return {
    hidden: { opacity: 0, scale: 1 },
    visible: {
      opacity: 1,
      scale: [1, CHIP_PULSE_SCALE, 1],
      transition: { duration: DURATIONS.chipPulse, ease: EASINGS.out, delay: DURATIONS.heroRoot },
    },
  };
}

/*
 * Panels and the menu overlay stay mounted when closed (crawlable content —
 * plan.md §16), so the hidden state must also drop them from the a11y tree and
 * tab order. `visibility: 'hidden'` does that; on the animated path it is set
 * via `transitionEnd` so the exit animation finishes before the element vanishes,
 * and cleared immediately on entry so the element is focusable as it animates in.
 */

/*
 * Each breakpoint's variants also reset the other's animated property
 * (height on desktop, x on mobile) so a stale inline style can't survive a
 * viewport resize across the lg boundary.
 */

/** Desktop project panel: 24px slide-in + fade; exits ease in. */
export function panelDesktopVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0, x: 0, height: 'auto', visibility: 'hidden', transition: INSTANT },
      visible: { opacity: 1, x: 0, height: 'auto', visibility: 'visible', transition: INSTANT },
    };
  }
  return {
    hidden: {
      opacity: 0,
      x: DISTANCES.panelSlide,
      height: 'auto',
      transition: { duration: DURATIONS.panel, ease: EASINGS.in },
      transitionEnd: { visibility: 'hidden' },
    },
    visible: {
      visibility: 'visible',
      opacity: 1,
      x: 0,
      height: 'auto',
      transition: { duration: DURATIONS.panel, ease: EASINGS.out },
    },
  };
}

/** Mobile project panel: inline accordion, height-animated. */
export function panelMobileVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0, height: 0, x: 0, visibility: 'hidden', transition: INSTANT },
      visible: { opacity: 1, height: 'auto', x: 0, visibility: 'visible', transition: INSTANT },
    };
  }
  return {
    hidden: {
      opacity: 0,
      height: 0,
      x: 0,
      transition: { duration: DURATIONS.panelMobile, ease: EASINGS.in },
      transitionEnd: { visibility: 'hidden' },
    },
    visible: {
      visibility: 'visible',
      opacity: 1,
      height: 'auto',
      x: 0,
      transition: { duration: DURATIONS.panelMobile, ease: EASINGS.out },
    },
  };
}

/** Mirrors Tailwind's `lg` breakpoint — the point where panels move to the side. */
const DESKTOP_PANEL_QUERY = '(min-width: 1024px)';

/**
 * Picks the panel transition for the current viewport: side-panel slide on
 * desktop, inline accordion below `lg`. SSR defaults to mobile (mobile-first);
 * the client corrects on hydration.
 */
export function usePanelVariants(reducedMotion: boolean): Variants {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_PANEL_QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_PANEL_QUERY);
    const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return isDesktop ? panelDesktopVariants(reducedMotion) : panelMobileVariants(reducedMotion);
}

/** Generic fade for small reveals (ResponseCard, menu overlay). */
export function fadeVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0, visibility: 'hidden', transition: INSTANT },
      visible: { opacity: 1, visibility: 'visible', transition: INSTANT },
    };
  }
  return {
    hidden: {
      opacity: 0,
      transition: { duration: DURATIONS.micro, ease: EASINGS.in },
      transitionEnd: { visibility: 'hidden' },
    },
    visible: {
      visibility: 'visible',
      opacity: 1,
      transition: { duration: DURATIONS.micro, ease: EASINGS.out },
    },
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
