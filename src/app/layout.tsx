import { Analytics } from '@vercel/analytics/react';
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

const SITE_URL = 'https://portfolio-five-vert-40.vercel.app';
const TITLE = `${PROFILE.name} — ${PROFILE.role} (Go, Distributed Systems)`;
const DESCRIPTION =
  'I build backend systems in Go — a task queue with retries and a dead-letter queue, real-time chat over Redis Pub/Sub, and a CRDT collaborative editor. Open to internships.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: `${PROFILE.name} — ${PROFILE.role}`,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
};

/* JSON-LD Person schema — sameAs links only render if the profile has them. */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFILE.name,
  jobTitle: PROFILE.role,
  url: SITE_URL,
  sameAs: [PROFILE.links.github, PROFILE.links.linkedin].filter(
    (link): link is string => link !== null,
  ),
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
