'use client';

import { useEffect, useRef, useState } from 'react';
import { LazyMotion, m } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { NAV_ITEMS, SITE } from '@/content/site';
import { fadeVariants, loadMotionFeatures, useReducedMotion } from '@/lib/motion';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-trace-border bg-trace-bg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-16 focus:z-50 focus:rounded-md focus:bg-trace-surface focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
      >
        {SITE.skipToContent}
      </a>
      <nav
        aria-label={SITE.navLabel}
        className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-4 sm:px-6"
      >
        <a
          href="#trace"
          className="inline-flex min-h-11 items-center font-mono text-sm text-trace-accent"
        >
          {SITE.identityMark}
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="inline-flex min-h-11 items-center px-3 font-mono text-sm text-trace-text-muted hover:text-trace-text"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center text-trace-text md:hidden"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{menuOpen ? SITE.menuClose : SITE.menuOpen}</span>
        </button>
      </nav>
      <LazyMotion features={loadMotionFeatures} strict>
        <m.div
          id="mobile-menu"
          initial={false}
          animate={menuOpen ? 'visible' : 'hidden'}
          variants={fadeVariants(reducedMotion)}
          className={`fixed inset-x-0 bottom-0 top-14 bg-trace-bg md:hidden ${
            menuOpen ? '' : 'pointer-events-none'
          }`}
        >
          <ul className="flex flex-col gap-2 px-6 py-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-11 items-center font-mono text-lg text-trace-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </m.div>
      </LazyMotion>
    </header>
  );
}
