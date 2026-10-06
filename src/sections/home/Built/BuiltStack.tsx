'use client';

import { useRef } from 'react';
import type { BuiltContent } from '@/content/sections/built';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useReveal } from '@/hooks/useReveal';
import { revealDelay, type StyleWithVars } from '@/lib/css';
import { cx } from '@/lib/cx';
import { pad2 } from '@/lib/text';
import { TYPE } from '@/lib/typography';
import { BuiltSpecs } from './BuiltSpecs';
import type { BuiltProject } from './model';
import { framerPhoto } from '@/lib/images';

const PHOTO_SIZES = '(max-width: 809px) 100vw, 50vw';
/** Each card reveals on its own once 12% of it is in view. */
const CARD_REVEAL = 0.12;

type BuiltStackProps = {
  content: BuiltContent;
  projects: BuiltProject[];
  heading: string;
  projectsHref: string;
};

/** Phone and reduced-motion layout: the projects as a list of cards, two columns from 810px. */
export function BuiltStack({ content, projects, heading, projectsHref }: BuiltStackProps) {
  const level = content.levelLetter.trim() || 'L';
  return (
    <div className="gd-wrap built-stackwrap">
      <header className="built-shead">
        <Eyebrow text={content.eyebrow} />
        <h2 className="gd-sr">{heading}</h2>
        <p className="built-count gd-rv" style={{ ...TYPE.mono, ...revealDelay(120) }}>
          {level}01 – {level}
          {pad2(projects.length)}
        </p>
      </header>
      <ol className="built-cards">
        {projects.map((project, index) => (
          <BuiltCard
            key={project.slug}
            project={project}
            index={index}
            count={projects.length}
            level={level}
            primary={content.primary}
          />
        ))}
      </ol>
      {content.secondary && (
        <div className="built-all">
          <Button href={projectsHref} label={content.secondary} kind="ghost" />
        </div>
      )}
    </div>
  );
}

type BuiltCardProps = { project: BuiltProject; index: number; count: number; level: string; primary: string };

function BuiltCard({ project, index, count, level, primary }: BuiltCardProps) {
  const ref = useRef<HTMLLIElement>(null);
  const revealed = useReveal(ref, CARD_REVEAL);
  const photo = framerPhoto(project.photo, PHOTO_SIZES);
  // The photo uncovers upward and settles from 1.28x, drifting with the section's --sp at 0.6
  // of the kit's parallax.
  const photoStyle: StyleWithVars = {
    aspectRatio: '4/3',
    borderRadius: 6,
    clipPath: revealed ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
    WebkitClipPath: revealed ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
    '--par': 0.6,
  };

  return (
    <li ref={ref} className={cx('built-card', revealed && 'is-on')}>
      <div className="built-card-ph">
        <div className={cx('gd-um', revealed && 'is-on')} style={photoStyle}>
          <img
            src={photo.src}
            srcSet={photo.srcSet}
            sizes={photo.sizes}
            alt={project.name}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{ objectPosition: '50% 40%' }}
          />
        </div>
        <span className="built-tag" style={TYPE.mono}>
          {level}
          {pad2(index + 1)} / {pad2(count)}
        </span>
      </div>
      <h3 className="built-name built-rv" style={{ ...TYPE.display, ...revealDelay(120) }}>
        {project.name}
      </h3>
      <p className="built-meta built-rv" style={{ ...TYPE.mono, ...revealDelay(180) }}>
        {project.meta}
      </p>
      {project.summary && (
        <p className="built-sum built-rv" style={revealDelay(220)}>
          {project.summary}
        </p>
      )}
      <div className="built-rv" style={revealDelay(280)}>
        <BuiltSpecs project={project} />
      </div>
      {primary && (
        <div className="built-btns built-rv" style={revealDelay(340)}>
          <Button href={`/projects/${project.slug}`} label={primary} kind="solid" ariaLabel={`${primary}: ${project.name}`} />
        </div>
      )}
    </li>
  );
}
