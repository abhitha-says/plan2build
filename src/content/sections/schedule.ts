/** Copy for "04 · How a job runs", the Gantt schedule shown on `/` and `/services`. */

export type SchedulePhase = {
  name: string;
  /** First week of the phase. */
  start: number;
  /** Week the phase ends (its milestone). */
  end: number;
  text: string;
};

export type ScheduleContent = {
  eyebrow: string;
  /** `|` breaks a line, `*words*` ride the ink beam. */
  heading: string;
  subCopy: string;
  /** Up to 8 phases; the chart length follows the last end week. */
  phases: SchedulePhase[];
  weekLabel: string;
  todayLabel: string;
  weeksWord: string;
  phaseWord: string;
  /** Shown on the dimension line under the chart after the total weeks. */
  note: string;
};

export const schedule: ScheduleContent = {
  eyebrow: '04 · How a job runs',
  heading: 'A schedule you can|*hold us to.*',
  subCopy:
    'Every job gets a week-by-week schedule before we break ground. You see it, we report against it every Friday, and the handover date goes in the contract.',
  phases: [
    { name: 'Preconstruction', start: 0, end: 8, text: 'Drawings, permits and a fixed, itemised price.' },
    { name: 'Groundworks', start: 6, end: 14, text: 'Excavation, foundations and services in the ground.' },
    { name: 'Structure', start: 12, end: 26, text: 'Steel and concrete frame, floor by floor.' },
    { name: 'Envelope & roof', start: 22, end: 32, text: 'Walls, glazing and a watertight roof.' },
    { name: 'Fit-out & handover', start: 28, end: 40, text: 'Interiors, inspections, punch list, keys.' },
  ],
  weekLabel: 'Wk',
  todayLabel: 'Today',
  weeksWord: 'Weeks',
  phaseWord: 'Phase',
  note: 'Permit to keys',
};
