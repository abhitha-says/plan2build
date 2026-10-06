/** Copy and settings for the page transition "hoist" (GdPageTrans instance props). */
export type HoistCopy = {
  enabled: boolean;
  /** Seconds for the plate to rise and cover the screen. Clamped to 0.3–1.2. */
  duration: number;
  /** Seconds for the plate to lift off the arriving page. Clamped to 0.3–1.2. */
  enter: number;
  /** Name shown for `/`. */
  homeLabel: string;
  kicker: string;
  /** Name shown on the plate for each destination path. */
  names: Array<{ label: string; path: string }>;
};

export const hoist: HoistCopy = {
  enabled: true,
  duration: 0.55,
  enter: 0.5,
  homeLabel: 'Home',
  kicker: 'Hoisting',
  names: [
    { label: 'Projects', path: '/projects' },
    { label: 'Services', path: '/services' },
    { label: 'Safety', path: '/safety' },
    { label: 'About', path: '/about' },
    { label: 'Team', path: '/team' },
    { label: 'Careers', path: '/careers' },
    { label: 'Journal', path: '/journal' },
    { label: 'Contact', path: '/contact' },
    { label: 'Request a bid', path: '/request-a-bid' },
    { label: 'Privacy', path: '/privacy' },
    { label: 'Terms', path: '/terms' },
    { label: 'Cookies', path: '/cookies' },
  ],
};
