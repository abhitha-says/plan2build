import { reviews } from '@/content/reviews';
import type { OwnersContent } from '@/content/sections/owners';
import { OwnersSection } from './OwnersSection';

/** "Owners' words": the review carousel with its handover sheet. */
export function Owners({ content }: { content: OwnersContent }) {
  return <OwnersSection content={content} reviews={reviews} />;
}
