import type { BuiltContent } from '@/content/sections/built';
import type { Project } from '@/content/types';
import { PHOTO_PLACEHOLDER } from '@/lib/images';

export type BuiltSpec = { label: string; value: string };

/** What the showcase needs from one project, prepared on the server. */
export type BuiltProject = {
  slug: string;
  name: string;
  /** "Commercial · West Loop · 2026" */
  meta: string;
  summary: string;
  status: string;
  size: string;
  /** Size, contract value and days on site, skipping empty ones. Each value counts up. */
  specs: BuiltSpec[];
  result: BuiltSpec | null;
  /** Photo URL without query; a drawn placeholder when the project has none. */
  photo: string;
};


/** The first `floors` named projects (at most six), in collection order. */
export function toBuiltProjects(projects: Project[], content: BuiltContent): BuiltProject[] {
  const count = Math.min(6, Math.max(1, Math.round(content.floors) || 6));
  const labels = content.specLabels;
  return projects
    .filter((project) => project.name)
    .slice(0, count)
    .map((project) => ({
      slug: project.slug,
      name: project.name,
      meta: [project.type, project.place, project.year].filter(Boolean).join(' · '),
      summary: project.summary,
      status: project.status,
      size: project.size,
      specs: [
        { label: labels.size, value: project.size },
        { label: labels.value, value: project.value },
        { label: labels.days, value: String(project.daysOnSite) },
      ].filter((spec) => spec.value),
      result: project.result ? { label: labels.result, value: project.result } : null,
      photo: project.photo?.src.split('?')[0] || PHOTO_PLACEHOLDER,
    }));
}
