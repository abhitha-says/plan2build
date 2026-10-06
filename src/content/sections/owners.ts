/** Copy for the home page's reviews section ("07 · Owners' words"). Reviews come from `reviews`. */
export type OwnersContent = {
  eyebrow: string;
  /** `|` breaks a line, `*words*` ride the yellow beam. */
  heading: string;
  /** Handover-sheet checklist, separated by `;` (first six are used). */
  checks: string;
  /** Sheet title, followed by the review's project ("Handover · Depot 9"). */
  cardLabel: string;
  /** Sheet number label ("Sheet 01 / 04"). */
  sheetLabel: string;
  resultLabel: string;
  /** Pressed onto the sheet on hover; empty = no stamp. */
  stampText: string;
  prevLabel: string;
  nextLabel: string;
};

export const owners: OwnersContent = {
  eyebrow: "07 · Owners' words",
  heading: 'Signed off|*by owners.*',
  checks: 'On the date; On the budget; Zero open defects; Site left clean',
  cardLabel: 'Handover',
  sheetLabel: 'Sheet',
  resultLabel: 'Result',
  stampText: 'Signed off',
  prevLabel: 'Previous review',
  nextLabel: 'Next review',
};
