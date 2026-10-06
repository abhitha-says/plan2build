/** Copy for the home page's crew section ("06 · The crew"). Badges come from `team`. */
export type CrewContent = {
  eyebrow: string;
  /** `|` breaks a line, `*words*` ride the yellow beam. */
  heading: string;
  subCopy: string;
  /** Team button label; empty hides the button. */
  allLabel: string;
  allLink: string;
  /** Printed after the site name at the top of every badge ("Girder · Site ID"). */
  idLabel: string;
  yearsWord: string;
  badgeWord: string;
  /** Profile button, followed by the member's first name ("Meet Marcus"). */
  meetWord: string;
};

export const crew: CrewContent = {
  eyebrow: '06 · The crew',
  heading: 'The people|*on your site.*',
  subCopy:
    'The names on the bid are the names on the job. Same superintendent from the first stake to the last walkthrough, and every one of them picks up the phone.',
  allLabel: 'Meet the team',
  allLink: '/team',
  idLabel: 'Site ID',
  yearsWord: 'yrs',
  badgeWord: 'Badge',
  meetWord: 'Meet',
};
