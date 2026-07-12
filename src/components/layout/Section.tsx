interface Props {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function Section({ id, title, children }: Props) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        <h2 id={headingId} className="font-mono text-sm uppercase tracking-widest text-trace-meta">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
