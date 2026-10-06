/** Copy for the site header, from the layout template's GdHeader instance. */

export type NavLink = { label: string; href: string };

export type HeaderContent = {
  /** Main navigation, in order. Hrefs are the reference's paths; the header resolves them. */
  links: NavLink[];
  /** The nav link whose button opens the projects drawer instead of navigating. */
  drawerFor: string;
  ctaLabel: string;
  showCta: boolean;
  showPhone: boolean;
  drawerTitle: string;
  allLabel: string;
  servicesTitle: string;
  servicesLabel: string;
  servicesLink: string;
  cardKicker: string;
  cardTitle: string;
  cardLine: string;
  cardButton: string;
  homeLabel: string;
  newestLabel: string;
  callLabel: string;
  menuLabel: string;
  closeLabel: string;
};

export const header: HeaderContent = {
  links: [
    { label: 'Projects', href: '/projects' },
    { label: 'Services', href: '/services' },
    { label: 'Safety', href: '/safety' },
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
  ],
  drawerFor: 'Projects',
  ctaLabel: 'Request a bid',
  showCta: true,
  showPhone: true,
  drawerTitle: 'Built by Girder',
  allLabel: 'All projects',
  servicesTitle: 'What we build',
  servicesLabel: 'All services',
  servicesLink: '/services',
  cardKicker: 'Got drawings?',
  cardTitle: 'Budget range in 2 working days',
  cardLine: 'Send the drawings. A fixed, itemised bid follows in ten.',
  cardButton: 'Request a bid',
  homeLabel: 'Home',
  newestLabel: 'Latest projects',
  callLabel: 'Call the office',
  menuLabel: 'Menu',
  closeLabel: 'Close',
};
