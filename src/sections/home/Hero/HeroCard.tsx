import Link from 'next/link';
import { cx } from '@/lib/cx';
import { resolveHref } from '@/lib/routes';
import { pad2 } from '@/lib/text';
import { TYPE } from '@/lib/typography';
import type { HeroProject } from './build';

type HeroCardProps = {
  project: HeroProject;
  projects: HeroProject[];
  index: number;
  /** The one-row version that sits in the ground band on phones and tablets. */
  compact?: boolean;
  onPick: (index: number) => void;
};

/**
 * "Now building" card. The floor and day counters start at zero and are rewritten by the build
 * loop in HeroScene (`data-k`, `data-day`); the bar reads the section's `--p`.
 */
export function HeroCard({ project, projects, index, compact = false, onPick }: HeroCardProps) {
  return (
    <div className={cx('hero-card gd-dark', compact && 'is-row')}>
      <p className="hero-card-top" style={TYPE.mono}>
        <span>
          <i className="hero-live" aria-hidden="true" />
          Now building
        </span>
        <span>
          {pad2(index + 1)} / {pad2(projects.length)}
        </span>
      </p>
      <Link className="hero-card-name" href={resolveHref(`/projects/${project.slug}`)} style={TYPE.display}>
        {project.name}
      </Link>
      {!compact && (
        <p className="hero-card-meta">
          {[project.type, project.place].filter(Boolean).join(' · ')}
          {project.summary && (
            <>
              <br />
              {project.summary}
            </>
          )}
        </p>
      )}
      <div className="hero-card-nums" style={TYPE.mono}>
        <span>
          <b style={TYPE.display}>
            <i data-k="">0</i>
            <small> / {project.floors}</small>
          </b>
          floors
        </span>
        <span>
          <b style={TYPE.display}>
            <i data-day="">0</i>
          </b>
          day on site
        </span>
        {!compact && project.value && (
          <span>
            <b style={TYPE.display}>{project.value}</b>
            contract
          </span>
        )}
      </div>
      <div className="hero-card-bar" aria-hidden="true">
        <i />
      </div>
      {!compact && projects.length > 1 && (
        <div className="hero-dots" role="group" aria-label="Choose a project">
          {projects.map((item, itemIndex) => (
            <button
              key={item.slug || itemIndex}
              type="button"
              className={itemIndex === index ? 'is-on' : undefined}
              aria-pressed={itemIndex === index}
              aria-label={item.name}
              onClick={() => onPick(itemIndex)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
