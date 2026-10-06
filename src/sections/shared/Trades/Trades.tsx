import type { TradesContent } from '@/content/sections/trades';
import { services } from '@/content/services';
import { TradesSection } from './TradesSection';

/** "What we build": the service rows, on `/` and `/services`. */
export function Trades({ content }: { content: TradesContent }) {
  const rows = services
    .filter((service) => service.name.trim())
    .slice(0, content.rows)
    .map(({ slug, name, line, includes, from, timeline, photo }) => ({ slug, name, line, includes, from, timeline, photo }));
  return <TradesSection content={content} services={rows} />;
}
