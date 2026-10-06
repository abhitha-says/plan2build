import { hoist } from '@/content/sections/hoist';
import { site } from '@/content/site';
import { HoistPlate } from './hoist/HoistPlate';

/** The page transition "hoist" between this app's routes. Rendered once by the root layout. */
export function PageTransition() {
  if (!hoist.enabled) return null;
  return <HoistPlate copy={hoist} siteName={site.name.trim() || 'Girder'} />;
}
