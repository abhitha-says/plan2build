import type { Metadata } from 'next';

/** Public origin used for canonical URLs and absolute share links. Set SITE_URL in production. */
export const SITE_URL = process.env.SITE_URL ?? 'http://localhost:3600';

/** The share card: the home page hero, 1200 × 630. */
export const SHARE_IMAGE = '/images/og.jpg';

/** Title, description, canonical path and the matching Open Graph / Twitter fields. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: 'Plan2Build', url: path, title, description, images: [SHARE_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [SHARE_IMAGE] },
  };
}
