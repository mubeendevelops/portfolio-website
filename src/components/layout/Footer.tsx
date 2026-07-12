import { SITE } from '@/content/site';

export function Footer() {
  return (
    <footer className="border-t border-trace-border py-8">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        <p className="font-mono text-xs text-trace-meta">{SITE.footerLine}</p>
      </div>
    </footer>
  );
}
