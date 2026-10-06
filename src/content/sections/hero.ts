/** Copy for the home page hero (instance props of the reference's GdHero). */
export type HeroContent = {
  /** Empty = "Descriptor · Area" from the site row (descriptor only on phones). */
  eyebrow: string;
  /** `|` breaks a line, `*word*` rides the yellow beam. */
  heading: string;
  /** Empty = the site tagline. */
  subCopy: string;
  /** Main button label; it links to the site's bid link. */
  primary: string;
  secondary: string;
  secondaryLink: string;
  /** Label beside the crane-hook cursor. */
  cursorLabel: string;
  /** Flag raised on the roof when the building tops out. */
  topLabel: string;
  /** Build stages, separated by `;` (at most six are shown). */
  stages: string;
  /** Build the tower and move through projects while nobody is moving the pointer. */
  autoBuild: boolean;
};

export const hero: HeroContent = {
  eyebrow: '',
  heading: 'Built|to *last.*',
  subCopy: '',
  primary: 'Request a bid',
  secondary: 'See our projects',
  secondaryLink: '/projects',
  cursorLabel: 'Lift',
  topLabel: 'Topped out',
  stages: 'Groundworks; Steel frame; Envelope; Fit-out; Handover',
  autoBuild: true,
};
