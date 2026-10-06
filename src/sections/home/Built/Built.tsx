import { projects } from '@/content/projects';
import type { BuiltContent } from '@/content/sections/built';
import { site } from '@/content/site';
import { BuiltSection } from './BuiltSection';
import { toBuiltProjects } from './model';
import './built.css';

/** Home page section 03: the first projects as floors of a pinned, scroll-driven showcase. */
export function Built({ content }: { content: BuiltContent }) {
  return (
    <BuiltSection
      content={content}
      projects={toBuiltProjects(projects, content)}
      heading={content.title.trim() || `Built by ${site.name}`}
      projectsHref={site.projectsHref}
    />
  );
}
