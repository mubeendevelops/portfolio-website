import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import { PROFILE } from '@/content/profile';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.role} (Go, Distributed Systems)`,
  description:
    'I build backend systems in Go — a task queue with retries and a dead-letter queue, real-time chat over Redis Pub/Sub, and a CRDT collaborative editor. Open to internships.',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
