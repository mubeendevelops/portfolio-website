import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        trace: {
          bg: 'var(--trace-bg)',
          surface: 'var(--trace-surface)',
          'surface-hover': 'var(--trace-surface-hover)',
          border: 'var(--trace-border)',
          accent: 'var(--trace-accent)',
          'accent-dim': 'var(--trace-accent-dim)',
          meta: 'var(--trace-meta)',
          text: 'var(--trace-text)',
          'text-muted': 'var(--trace-text-muted)',
        },
        status: {
          running: 'var(--status-running)',
          progress: 'var(--status-progress)',
          planned: 'var(--status-planned)',
          complete: 'var(--status-complete)',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
