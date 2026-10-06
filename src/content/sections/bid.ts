/** Copy for the home page's "Request a bid" section (the reference's GdBid instance). */
export type BidContent = {
  eyebrow: string;
  /** `|` breaks a line, `*words*` ride the yellow beam. */
  heading: string;
  subCopy: string;
  cardLabel: string;
  cardNote: string;
  /** Question 1; its answers are the services. */
  step1: string;
  /** Question 2; its answers are `startOptions`. */
  step2: string;
  /** Answers to question 2, separated by `;`. */
  startOptions: string;
  step3: string;
  dropText: string;
  dropHint: string;
  button: string;
  /** Empty = the site's proof line. */
  proofLine: string;
  callLabel: string;
};

export const bid: BidContent = {
  eyebrow: '10 · Request a bid',
  heading: 'Send us|*the drawings.*',
  subCopy: 'A budget range in two working days. A fixed, itemised bid in ten.',
  cardLabel: 'Bid request',
  cardNote: 'Takes one minute',
  step1: 'What are you building?',
  step2: 'When do you want to start?',
  startOptions: 'This quarter; In 3–6 months; Next year; Just pricing',
  step3: 'The drawings',
  dropText: 'Drop drawings here or bring them to the meeting',
  dropHint: 'Plans, sketches or photos of the site',
  button: 'Request a bid',
  proofLine: '',
  callLabel: 'Or call',
};
