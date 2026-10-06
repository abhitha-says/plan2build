/** Content model for the site, as captured from the reference CMS. */

export type Photo = { src: string; width: number | null; height: number | null };

export type SiteInfo = {
  name: string;
  descriptor: string;
  tagline: string;
  email: string;
  phone: string;
  bidHref: string;
  projectsHref: string;
  area: string;
  proof: string;
  socials: Array<{ label: string; href: string }>;
  projectsBuilt: number;
  licence: string;
  office: string;
  hours: string;
  photo: Photo | null;
};

export type Service = {
  slug: string;
  name: string;
  /** One-line description shown in lists. */
  line: string;
  includes: string[];
  /** Starting price, e.g. "$2M". */
  from: string;
  timeline: string;
  detail: string;
  steps: string[];
  /** Markdown. */
  body: string;
  /** "96%:delivered on or before the date". */
  stat: { value: string; label: string } | null;
  photo: Photo | null;
};

export type ProjectStatus = 'On site' | 'Topped out' | 'Handed over';

export type Project = {
  slug: string;
  name: string;
  place: string;
  type: string;
  floors: number;
  bays: number;
  /** Contract value, e.g. "$48.6M". */
  value: string;
  daysOnSite: number;
  status: ProjectStatus;
  /** Tint used for the building's glass in drawings. */
  glass: string;
  summary: string;
  service: string;
  size: string;
  year: string;
  result: string;
  /** Markdown. */
  body: string;
  scope: string[];
  /** Team member slug. */
  lead: string;
  client: string;
  photo: Photo | null;
  gallery: Photo[];
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  years: number;
  certs: string[];
  quote: string;
  phone: string;
  email: string;
  badge: string;
  /** Markdown. */
  bio: string;
  projects: string[];
  languages: string[];
  photo: Photo | null;
};

export type Review = {
  slug: string;
  name: string;
  role: string;
  quote: string;
  project: string;
  result: string;
  rating: number;
  portrait: Photo | null;
  projectPhoto: Photo | null;
};

export type Faq = { slug: string; question: string; answer: string; group: string };
