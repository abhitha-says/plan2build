/** Copy for the home page's "Safety & quality" elevation drawing. */

export type SafetyCheck = { title: string; text: string };

export type SafetyContent = {
  eyebrow: string;
  /** `|` breaks a line, `*words*` ride the yellow beam. */
  heading: string;
  /**
   * Up to five, in drawing order: foundations, structure, envelope, roof, people. Each one is
   * tied to that part of the drawing, so the order matters.
   */
  checks: SafetyCheck[];
  /** Word before each card's number ("Check 01"). */
  checkWord: string;
  certLabel: string;
  /** Up to six plates. */
  certs: string[];
};

export const safety: SafetyContent = {
  eyebrow: '05 · Safety & quality',
  heading: 'Checked at|*every level.*',
  checks: [
    { title: 'Foundations', text: 'Every pour is cube-tested and logged before the next one.' },
    { title: 'Structure', text: 'A third-party engineer signs off each floor.' },
    { title: 'Envelope', text: 'Every window is hose-tested for leaks before the scaffold comes down.' },
    { title: 'Roof', text: 'Flood-tested for 24 hours, then warrantied for 30 years.' },
    { title: 'People', text: 'Daily briefing, tied-off above six feet, no exceptions.' },
  ],
  checkWord: 'Check',
  certLabel: 'Audited every year',
  certs: ['OSHA VPP Star', 'EMR 0.62', 'ISO 9001'],
};
