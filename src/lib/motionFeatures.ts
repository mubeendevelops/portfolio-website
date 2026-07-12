import { domAnimation } from 'framer-motion';

/*
 * Loaded asynchronously by every <LazyMotion> so the animation feature bundle
 * stays out of first-load JS (plan.md §17 budget). Until it arrives, `m`
 * components render their initial styles statically — no animation, no flash.
 */
export default domAnimation;
