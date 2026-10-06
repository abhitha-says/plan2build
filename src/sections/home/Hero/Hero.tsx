import { Button } from '@/components/ui/Button';
import type { HeroContent } from '@/content/sections/hero';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import type { StyleWithVars } from '@/lib/css';
import { parseHeadline, plainHeadline, splitList } from '@/lib/text';
import { TYPE } from '@/lib/typography';
import { heroProjects } from './build';
import { HeroScene } from './HeroScene';
import './hero.css';

const MAX_STAGES = 6;

/**
 * Home page hero: a building site where a tower crane lifts floors onto a tower that builds
 * itself, the "Now building" card for that project, and the build-stage rail. The headline and
 * pitch are rendered here on the server; the animated site around them is HeroScene.
 */
export function Hero({ content }: { content: HeroContent }) {
  const descriptor = site.descriptor || 'Contractor & builder';
  const area = site.area || 'Chicago';
  const tagline = content.subCopy.trim() || site.tagline || 'Construction, renovation and roofing, built on the date and the budget we signed.';
  const towers = heroProjects(projects);

  const copy = (
    <>
      <p className="hero-eb" style={TYPE.mono}>
        <span className="hero-live" aria-hidden="true" />
        {content.eyebrow.trim() || (
          <>
            {descriptor}
            {/* Phones show the descriptor alone. */}
            <span className="hero-eb-area"> · {area}</span>
          </>
        )}
      </p>
      <h1 className="hero-h1" aria-label={plainHeadline(content.heading)} style={TYPE.display}>
        {parseHeadline(content.heading).map((line, lineIndex) => (
          <span key={lineIndex} className="hero-ln" aria-hidden="true">
            {/* Lines rise 130ms apart; each line's beam drops in 120ms after the one above. */}
            <span className="hero-lni" style={{ transitionDelay: `${200 + lineIndex * 130}ms` }}>
              {line.map((word, wordIndex) =>
                word.accent ? (
                  <span key={wordIndex} className="hero-acc" style={{ '--sd': `${850 + lineIndex * 120}ms` } as StyleWithVars}>
                    <span className="hero-beam" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                    <span className="hero-acct">
                      {word.text}
                      {word.tail}
                    </span>
                  </span>
                ) : (
                  <span key={wordIndex}>
                    {word.text}
                    {word.tail}{' '}
                  </span>
                ),
              )}
            </span>
          </span>
        ))}
      </h1>
    </>
  );

  const pitch = (
    <>
      <p className="hero-sub">{tagline}</p>
      <div className="hero-btns">
        <Button href={site.bidHref || '/request-a-bid'} label={content.primary} kind="solid" />
        <Button href={content.secondaryLink} label={content.secondary} kind="ghost" />
      </div>
    </>
  );

  return (
    <HeroScene
      copy={copy}
      pitch={pitch}
      projects={towers}
      stages={splitList(content.stages).slice(0, MAX_STAGES)}
      proof={site.proof}
      topLabel={content.topLabel}
      cursorLabel={content.cursorLabel}
      autoBuild={content.autoBuild}
    />
  );
}
