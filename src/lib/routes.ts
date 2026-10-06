/**
 * Where a link from the reference site lands in this app.
 *
 * Only `/` and `/services` are built. Links to the reference's other pages go to the section
 * of these two pages that covers the same thing, so nothing leads to a 404. When a page is
 * added, delete its entry here and every link to it starts resolving to the real route.
 */
const SECTION_FOR_PATH: Array<[RegExp, string]> = [
  [/^\/request-a-bid(\?.*)?$/, '/#bid'],
  [/^\/projects(\/.*)?$/, '/#built'],
  // Each service row carries its slug as an id.
  [/^\/services\/([\w-]+)$/, '/services#$1'],
  [/^\/safety$/, '/#safety'],
  [/^\/(team|about)(\/.*)?$/, '/#crew'],
  [/^\/for-homeowners$/, '/#how-it-works'],
  [/^\/for-contractors$/, '/#bid'],
  [/^\/(careers|journal|contact|privacy|terms|cookies)(\/.*)?$/, '#contact'],
];

export function resolveHref(href: string): string {
  if (!href.startsWith('/')) return href;
  for (const [pattern, target] of SECTION_FOR_PATH) if (pattern.test(href)) return href.replace(pattern, target);
  return href;
}

/** True for links that stay on this site. */
export const isInternal = (href: string) => href.startsWith('/') || href.startsWith('#');
