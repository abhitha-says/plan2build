/** Copy for the site footer. Phone, email, socials, licence and the wordmark come from `site`. */

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export type FooterContent = {
  /** Lift the page off the footer as it scrolls into view (see LiftReveal). */
  reveal: boolean;
  /** Stacking order of the lift wrapper; must stay below the sections above it (10). */
  layer: number;
  officeTitle: string;
  address: string;
  hours: string;
  columns: FooterColumn[];
  newsTitle: string;
  newsLine: string;
  newsLabel: string;
  newsButton: string;
  newsDone: string;
  newsError: string;
  /** `{year}` and `{name}` are filled in. */
  legal: string;
  builtWith: string;
};

export const footer: FooterContent = {
  reveal: true,
  layer: 8,
  officeTitle: 'Office',
  address: '1200 W Fulton Market, Chicago, IL 60607',
  hours: 'Mon–Fri 7:00–17:00',
  columns: [
    {
      title: 'Build',
      links: [
        { label: 'Projects', href: '/projects' },
        { label: 'Services', href: '/services' },
        { label: 'Request a bid', href: '/request-a-bid' },
        { label: 'Safety', href: '/safety' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Team', href: '/team' },
        { label: 'Careers', href: '/careers' },
        { label: 'Journal', href: '/journal' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Cookies', href: '/cookies' },
      ],
    },
  ],
  newsTitle: 'Site letter',
  newsLine: 'Site photos and lessons, once a month.',
  newsLabel: 'Your email',
  newsButton: 'Subscribe',
  newsDone: "You're on the list. The next site letter is yours.",
  newsError: 'Please enter a valid email.',
  legal: '© {year} {name}',
  builtWith: 'Built with Framer',
};
