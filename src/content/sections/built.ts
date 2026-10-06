/** Copy for the home page's "Sample build plans" showcase. The houses come from content/projects. */

export type BuiltContent = {
  eyebrow: string;
  /** Hidden section heading for screen readers and search. Empty = "Built by <site name>". */
  title: string;
  /** How many projects to show (the first of the collection), one floor each. 1 to 6. */
  floors: number;
  /** Stands before the floor number on the level rail ("L" -> "L01"). */
  levelLetter: string;
  /** Opens the project page. Empty = no button. */
  primary: string;
  /** Second button. Empty = no button. */
  secondary: string;
  /** Where the second button goes. Empty = the site's projects page. */
  secondaryLink: string;
  /** Labels for the project's size, contract value, days on site and result. */
  specLabels: { size: string; value: string; days: string; result: string };
};

export const built: BuiltContent = {
  eyebrow: '03 · Sample build plans',
  title: 'Sample build plans',
  floors: 4,
  levelLetter: 'P',
  primary: '',
  secondary: 'Start your build plan',
  secondaryLink: '/request-a-bid',
  specLabels: { size: 'Built-up area', value: 'Likely cost', days: 'Months to build', result: 'Per sq ft' },
};
