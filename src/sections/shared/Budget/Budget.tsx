import type { BudgetContent } from '@/content/sections/budget';
import { services } from '@/content/services';
import { site } from '@/content/site';
import { BudgetSection } from './BudgetSection';

/** "A rough budget": the estimate sheet, on `/` and `/services`. */
export function Budget({ content }: { content: BudgetContent }) {
  return (
    <BudgetSection
      content={content}
      services={services.map(({ slug, name }) => ({ slug, name }))}
      bidHref={site.bidHref}
      siteName={site.name}
    />
  );
}
