/** Copy for "02 · What we build", the service rows shown on `/` and `/services`. Rows come from `services`. */

export type TradesContent = {
  eyebrow: string;
  /** `|` breaks a line, `*words*` ride the yellow beam. */
  heading: string;
  /** Empty hides the button. */
  button: string;
  buttonLink: string;
  /** Stands before each service's starting price ("From $2M"). */
  fromWord: string;
  /** How many services are listed, in their CMS order. */
  rows: number;
  /** Desktop with a mouse: the hovered service's photo hangs from the cursor. */
  hoverPhoto: boolean;
};

export const trades: TradesContent = {
  eyebrow: '02 · What we build',
  heading: 'Five trades,|*one contract.*',
  button: 'All services',
  buttonLink: '/services',
  fromWord: 'From',
  rows: 5,
  hoverPhoto: true,
};
