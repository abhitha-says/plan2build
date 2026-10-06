/** Copy for the home page's "Built by Girder" project showcase. Projects come from content/projects. */

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
  /** Links to the projects page. Empty = no button. */
  secondary: string;
  /** Labels for the project's size, contract value, days on site and result. */
  specLabels: { size: string; value: string; days: string; result: string };
};

export const built: BuiltContent = {
  eyebrow: '03 · Built by Girder',
  title: '',
  floors: 6,
  levelLetter: 'L',
  primary: 'See the project',
  secondary: 'All projects',
  specLabels: { size: 'Size', value: 'Contract', days: 'Days on site', result: 'Result' },
};
