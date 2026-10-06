/** The girder mark: a yellow tile with an I-beam section drawn in ink. */
export function Mark() {
  return (
    <svg className="header-mk" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="6" fill="var(--gd-brass)" />
      <path d="M8 9h16M8 23h16M16 9v14" fill="none" stroke="var(--gd-ink)" strokeWidth="3.4" strokeLinecap="square" />
    </svg>
  );
}

export function Caret() {
  return (
    <svg className="header-caret" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="square" aria-hidden="true">
      <path d="M5 9l7 7 7-7" />
    </svg>
  );
}

export function Arrow({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
