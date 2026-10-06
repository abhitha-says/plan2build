/** Copy for the home page's "By the numbers" site board. The ticker lists handed-over projects. */

export type BoardStat = { value: string; label: string };

export type BoardContent = {
  eyebrow: string;
  /** `|` breaks a line, `*words*` ride the yellow beam. */
  heading: string;
  subCopy: string;
  /** Title in the board's top bar. Empty = "<site name> · Site board". */
  boardTitle: string;
  boardNote: string;
  /** Up to six. */
  stats: BoardStat[];
  /** 1-based position of the stat shown on the yellow split-flap counter; 0 = none. */
  yellowCell: number;
  showTicker: boolean;
  /** Unit after each project's days on site in the ticker. */
  daysWord: string;
  /** Seconds for one full loop of the ticker (at least 12). */
  tickerSpeed: number;
};

export const board: BoardContent = {
  eyebrow: '01 · By the numbers',
  heading: 'The date and the budget,|*kept.*',
  subCopy: 'Counted from our own job files and checked every quarter. Nothing rounded up.',
  boardTitle: '',
  boardNote: 'Updated every morning at 6:00',
  stats: [
    { value: '412', label: 'projects handed over' },
    { value: '96%', label: 'delivered on or before the date' },
    { value: '1,204', label: 'days without a lost-time injury' },
    { value: '$0', label: 'average overrun on fixed-price bids' },
  ],
  yellowCell: 3,
  showTicker: true,
  daysWord: 'days',
  tickerSpeed: 60,
};
