import type { BudgetContent } from '@/content/sections/budget';
import { site } from '@/content/site';
import { splitList } from '@/lib/text';
import { BudgetSection } from './BudgetSection';
import { slugify } from './estimate';

/** "Home Cost Check": the estimate sheet, on `/` and `/services`. Its choices are house types, not services. */
export function Budget({ content }: { content: BudgetContent }) {
  return (
    <BudgetSection
      content={content}
      services={splitList(content.types).map((name) => ({ slug: slugify(name), name }))}
      bidHref={site.bidHref}
      siteName={site.name}
    />
  );
}
