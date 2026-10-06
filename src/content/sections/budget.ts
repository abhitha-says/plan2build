/** Copy for "08 · A rough budget", the estimate sheet on `/` and `/services`. Job types come from `services`. */

export type BudgetContent = {
  eyebrow: string;
  /** `|` breaks a line, `*words*` ride the yellow beam. */
  heading: string;
  subCopy: string;
  /** The big number on the beam. Empty hides the fact. */
  factNumber: string;
  factLabel: string;
  cardTitle: string;
  typeLabel: string;
  sizeLabel: string;
  unitLabel: string;
  finishLabel: string;
  /** `Name:price factor; …` */
  finishes: string;
  /**
   * One per service: `slug:price per unit:smallest size:largest size:base weeks:weeks pace; …`.
   * Weeks = base + pace × √size.
   */
  rates: string;
  /** Plus and minus around the estimate, in percent (0–45). */
  spread: number;
  resultLabel: string;
  scheduleLabel: string;
  /** `{n}` = the number of weeks. */
  weeksText: string;
  lowLabel: string;
  highLabel: string;
  note: string;
  /** Links to the site's bid page with the answers added. Empty hides the button. */
  cta: string;
};

export const budget: BudgetContent = {
  eyebrow: '08 · A rough budget',
  heading: 'Know the number|*before the meeting.*',
  subCopy: 'Three answers give you a range and a schedule. A fixed bid takes ten working days.',
  factNumber: '10',
  factLabel: 'working days to a fixed, itemised bid',
  cardTitle: 'Estimate sheet',
  typeLabel: 'Job type',
  sizeLabel: 'Size',
  unitLabel: 'sq ft',
  finishLabel: 'Finish level',
  finishes: 'Standard:1; High:1.25; Premium:1.6',
  rates:
    'construction:310:5000:200000:6:0.18; renovation:180:400:20000:3:0.14; roofing:14:1000:60000:0.5:0.02; design-build:340:2000:80000:14:0.2; fit-out:140:1000:60000:4:0.09',
  spread: 12,
  resultLabel: 'Rough budget',
  scheduleLabel: 'Schedule',
  weeksText: 'about {n} weeks',
  lowLabel: 'Low',
  highLabel: 'High',
  note: 'Rough range from our last 40 jobs',
  cta: 'Get a fixed bid',
};
