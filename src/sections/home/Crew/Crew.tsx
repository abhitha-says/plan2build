import type { CrewContent } from '@/content/sections/crew';
import { site } from '@/content/site';
import { team } from '@/content/team';
import { CrewSection } from './CrewSection';

/** "The crew": the site-ID badges. */
export function Crew({ content }: { content: CrewContent }) {
  const members = team.map(({ slug, name, role, years, certs, quote, phone, email, badge, photo }) => ({
    slug, name, role, years, certs, quote, phone, email, badge, photo,
  }));
  return <CrewSection content={content} team={members} siteName={site.name} />;
}
