import type { Project } from '@/content/types';
import { clamp01 } from '@/lib/ticker';

/** The fields of a project the hero draws, clamped to what the drawing can hold. */
export type HeroProject = {
  slug: string;
  name: string;
  place: string;
  type: string;
  floors: number;
  bays: number;
  value: string;
  days: number;
  glass: string;
  summary: string;
};

/** Only buildings with at least this many floors make a worthwhile tower. */
const MIN_FLOORS = 6;
const MAX_PROJECTS = 8;
const DEFAULT_GLASS = '#7FA3B8';

const clampInt = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)));

export function heroProjects(projects: Project[]): HeroProject[] {
  return projects
    .filter((project) => project.floors >= MIN_FLOORS && project.name)
    .slice(0, MAX_PROJECTS)
    .map((project) => ({
      slug: project.slug,
      name: project.name,
      place: project.place,
      type: project.type,
      floors: clampInt(project.floors || 14, 5, 24),
      bays: clampInt(project.bays || 6, 3, 9),
      value: project.value,
      days: Math.max(1, Math.round(project.daysOnSite || 240)),
      glass: /^#[0-9a-f]{3,8}$/i.test(project.glass.trim()) ? project.glass.trim() : DEFAULT_GLASS,
      summary: project.summary,
    }));
}

/**
 * Build progress `p` (0..1) is spread over the floors plus this many floors of extra travel,
 * during which the hook rises from the roof back up to the jib.
 */
export const TOPPING_TRAVEL = 1.6;
/** A floor's steel frame stands this many floors ahead of its glazing. */
const FRAME_LEAD = 2.2;
/** Metres per storey, for the level tag. */
export const STOREY_M = 3.6;

export const easeOutCubic = (value: number) => 1 - (1 - clamp01(value)) ** 3;

/** How far through the build the crane is, in floors. */
export const travel = (progress: number, floors: number) => progress * (floors + TOPPING_TRAVEL);

/** `--f` (frame raised) and `--b` (glazing lowered in) for floor `index`. */
export const floorFrame = (travelled: number, index: number) => clamp01(travelled + FRAME_LEAD - index);
export const floorGlass = (travelled: number, index: number) => easeOutCubic(travelled - index);

/**
 * Hook height above the ground. While floors go up it sits on the floor being placed, easing
 * down from one and a half floors above it (`floorsUp` floors, `rise` = 0). After the last floor
 * it rises toward the jib (`rise` eases 0..1), which the stylesheet turns into pixels.
 */
export function hookPosition(travelled: number, floors: number) {
  const level = Math.min(floors, Math.floor(travelled));
  if (level >= floors) return { floorsUp: floors, rising: 1, rise: easeOutCubic((travelled - floors) / TOPPING_TRAVEL) };
  const settle = easeOutCubic(travelled - level);
  return { floorsUp: level + 1 + (1 - settle) * 1.5, rising: 0, rise: 0 };
}

/** Index of the build stage reached at progress `p`. */
export const stageAt = (progress: number, count: number) => Math.min(count - 1, Math.floor(clamp01(progress) * count * 0.999));

/** What the drawing shows if the CMS has no tall enough project. */
export const PLACEHOLDER_PROJECT: HeroProject = {
  slug: '',
  name: '',
  place: '',
  type: '',
  floors: 14,
  bays: 6,
  value: '',
  days: 240,
  glass: DEFAULT_GLASS,
  summary: '',
};
