interface Props {
  variant: 'primary' | 'ghost';
  children: React.ReactNode;
  /** Renders an anchor styled as a button — links navigate, buttons act. */
  href?: string;
  external?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

const VARIANT_CLASSES: Record<Props['variant'], string> = {
  primary: 'bg-trace-accent text-trace-bg hover:bg-trace-accent-dim',
  ghost:
    'border border-trace-border text-trace-text hover:border-trace-meta hover:bg-trace-surface-hover',
};

export function Button({
  variant,
  children,
  href,
  external = false,
  type = 'button',
  disabled = false,
  onClick,
}: Props) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-md px-4 font-mono text-sm transition-colors duration-micro ${VARIANT_CLASSES[variant]}`;

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
}
