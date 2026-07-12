import Link from 'next/link';

import { SITE } from '@/content/site';

export default function NotFound() {
  const { notFound } = SITE;
  return (
    <main className="flex min-h-screen items-center px-4 sm:px-6">
      <div className="mx-auto w-full max-w-[1100px]">
        <p className="font-mono text-sm text-trace-meta">{notFound.code}</p>
        <h1 className="mt-3 max-w-xl rounded-md border border-trace-border bg-trace-surface p-4 font-mono text-base text-trace-accent md:text-lg">
          {notFound.message}
        </h1>
        <p className="mt-4 max-w-xl text-sm text-trace-text-muted">{notFound.body}</p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-md border border-trace-border px-4 font-mono text-sm text-trace-text transition-colors duration-micro hover:border-trace-meta hover:bg-trace-surface-hover"
        >
          {notFound.linkLabel}
        </Link>
      </div>
    </main>
  );
}
