import type { PageHeroContent } from '@/content/sections/pageHero';
import { site } from '@/content/site';
import { PageHeroSection } from './PageHeroSection';

/** The `/services` hero: headline, buttons and the crane hoisting the promise words. */
export function PageHero({ content }: { content: PageHeroContent }) {
  const { bidHref, licence, projectsHref, proof } = site;
  return <PageHeroSection content={content} site={{ bidHref, licence, projectsHref, proof }} />;
}
