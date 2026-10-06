# Girder

Next.js rebuild of the Girder contractor site (originally a Framer site), covering the home page
(`/`) and the services page (`/services`). No Framer code, runtime or API is used; photos are the
only remote resources (Framer's image CDN, `framerusercontent.com`).

```bash
npm install
npm run dev        # http://localhost:3600
npm run build && npm start
npm run typecheck
npm run lint
```

Set `SITE_URL` in production so canonical and share URLs use the real origin.

## Layout

```
src/
  app/                 routes: layout (chrome + page column), page.tsx (/), services/page.tsx
  components/
    layout/            Header, Footer (+ lift reveal), Loader, PageTransition (hoist), SmoothScroll
    ui/                Section shell, Button, Eyebrow, Heading
  sections/
    home/              Hero, Board, Built, Safety, Crew, Owners, Bid
    services/          PageHero
    shared/            Trades, Schedule, Budget, Faq (used on both pages)
  content/             CMS data (site, services, projects, team, reviews, faq) + per-section copy
  hooks/               useReveal, useScrollProgress, useMagnetic, useSectionWidth, ...
  lib/                 frame ticker, text parsing, images, routes, typography, smooth scroll
  styles/              fonts.css, kit.css (styles shared by every section)
```

Each section is a server component that picks its data and copy; interactive parts are client
components beside it (`<Name>Section.tsx`, `*Shell.tsx`). Section styles sit next to the
component (`<name>.css`).

## Conventions worth knowing

- **Breakpoints are container queries** on the page column (`.site`): phone under 810px,
  tablet under 1100px of section width, matching how the original measured each section.
  Header, loader and page transition sit outside the column and use `@media`.
- **Motion runs on one frame loop** (`lib/ticker.ts`, read phase then write phase). Per-frame
  values are written as CSS variables, never as React state.
- **Reveals**: a section gets `is-in` once it scrolls into view and the loader has cleared
  (`hooks/useReveal.ts`); `.gd-rv` elements fade up with the delay set by `revealDelay()`.
- **Fonts** are self-hosted (`public/fonts`) and applied inline through `TYPE`
  (`lib/typography.ts`), because the original's inline font styles outrank some stylesheet rules.
- **Links to pages that are not built** go to the section of these two pages that covers the
  same thing (`lib/routes.ts`). Remove an entry there when its page is added.
