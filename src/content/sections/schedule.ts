/** Copy for "04 · How a house gets built", the stage chart on `/` and `/services`. Units are months. */

export type SchedulePhase = {
  name: string;
  /** First month of the phase. */
  start: number;
  /** Month the phase ends (its milestone). */
  end: number;
  text: string;
};

export type ScheduleContent = {
  eyebrow: string;
  /** `|` breaks a line, `*words*` ride the ink beam. */
  heading: string;
  subCopy: string;
  /** Up to 8 phases; the chart length follows the last end month. */
  phases: SchedulePhase[];
  weekLabel: string;
  todayLabel: string;
  weeksWord: string;
  phaseWord: string;
  /** Shown on the dimension line under the chart after the total months. */
  note: string;
};

export const schedule: ScheduleContent = {
  eyebrow: '04 · How a house gets built',
  heading: 'Sixteen stages,|*one plan.*',
  subCopy:
    'The 16 construction stages fall into five phases. Your workspace tracks each one with planned and actual dates, and every decision comes up before the stage that needs it.',
  phases: [
    { name: 'Plan', start: 0, end: 3, text: 'Build Plan, drawings, approvals and quotes compared on equal scope.' },
    { name: 'Foundation', start: 3, end: 6, text: 'Excavation, footings and the plinth beam. Gates 1 and 2.' },
    { name: 'Structure', start: 5, end: 11, text: 'Columns, beams, slabs, walls, roof and staircase. Gate 3 before every slab pour.' },
    { name: 'Services & finishes', start: 10, end: 18, text: 'Wiring, plumbing and waterproofing, then plaster, doors, windows, floors and paint. Gates 4 and 5.' },
    { name: 'Handover', start: 17, end: 20, text: 'External works, the final snag check (Gate 6) and your permanent build record.' },
  ],
  weekLabel: 'Month',
  todayLabel: 'Today',
  weeksWord: 'Months',
  phaseWord: 'Phase',
  note: 'Plan to handover · 2,650 sq ft, G+1 · indicative',
};
