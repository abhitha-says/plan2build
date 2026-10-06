'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import type { ScheduleContent, SchedulePhase } from '@/content/sections/schedule';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useReveal } from '@/hooks/useReveal';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { cx } from '@/lib/cx';
import { revealDelay, type StyleWithVars } from '@/lib/css';
import { pad2, plainHeadline } from '@/lib/text';
import { clamp01, onFrame } from '@/lib/ticker';
import { TYPE } from '@/lib/typography';
import './schedule.css';

/** Where "today" stands before scrolling takes over (server render, first frame). */
const RESTING_PROGRESS = 0.55;
/**
 * The schedule runs from week 0 to the end while the section's pass progress goes from 0.15
 * to 0.6, i.e. roughly while the chart crosses the middle of the viewport.
 */
const SCROLL_START = 0.15;
const SCROLL_SPAN = 0.45;
/** Fraction of the remaining distance the TODAY line covers each frame. */
const LINE_EASE = 0.14;

/** Chart length: the last end week rounded up to a multiple of 4 (at least 4). */
const chartWeeks = (phases: SchedulePhase[]) =>
  Math.max(4, Math.ceil(Math.max(0, ...phases.map((phase) => phase.end)) / 4) * 4);

/** Axis tick spacing: every 2 weeks up to 24, every 4 up to 48, then every 8. */
const tickStep = (weeks: number) => (weeks <= 24 ? 2 : weeks <= 48 ? 4 : 8);

/** The last phase that has started by `week`. */
function phaseAt(phases: SchedulePhase[], week: number): number {
  let index = 0;
  phases.forEach((phase, i) => {
    if (phase.start <= week + 0.001) index = i;
  });
  return index;
}

/** Week numbers with at most one decimal: 7.25 -> "7.3". */
const formatWeek = (week: number) => String(Math.round(week * 10) / 10);

type Motion = {
  /** Scroll-driven schedule progress, 0..1. */
  progress: number;
  /** Eased TODAY position, 0..1. */
  line: number;
  writtenProgress: number;
  writtenLine: number;
  writtenWeek: number;
  active: number;
  hovered: number;
};

export function Schedule({ content }: { content: ScheduleContent }) {
  const { eyebrow, heading, subCopy, phases: allPhases, weekLabel, todayLabel, weeksWord, phaseWord, note } = content;
  const phases = useMemo(() => allPhases.filter((phase) => phase.name && phase.end > phase.start).slice(0, 8), [allPhases]);
  const count = phases.length;
  const weeks = chartWeeks(phases);
  const step = tickStep(weeks);
  const ticks = Array.from({ length: Math.floor(weeks / step) + 1 }, (_, i) => i * step);

  const sectionRef = useRef<HTMLElement>(null);
  const weekRef = useRef<HTMLElement>(null);
  const revealed = useReveal(sectionRef);
  const reduced = usePrefersReducedMotion();
  const resting = reduced ? 1 : RESTING_PROGRESS;

  const [scrollActive, setScrollActive] = useState(-1);
  const [hovered, setHovered] = useState(-1);
  const motion = useRef<Motion>({
    progress: RESTING_PROGRESS,
    line: RESTING_PROGRESS,
    writtenProgress: -1,
    writtenLine: -1,
    writtenWeek: -1,
    active: -1,
    hovered: -1,
  });

  useEffect(() => {
    motion.current.hovered = hovered;
  }, [hovered]);

  const onProgress = useCallback((pass: number) => {
    motion.current.progress = clamp01((pass - SCROLL_START) / SCROLL_SPAN);
  }, []);
  useScrollProgress(sectionRef, { onProgress });

  // Per frame: publish --t, ease the TODAY line toward the progress (or the hovered bar's
  // midpoint), print its week, and switch the active phase when the progress crosses a start.
  useEffect(() => {
    const section = sectionRef.current;
    if (reduced || !section) return;
    return onFrame({
      write: () => {
        const state = motion.current;
        const hoveredPhase = phases[state.hovered];
        const target = hoveredPhase ? (hoveredPhase.start + hoveredPhase.end) / 2 / weeks : state.progress;
        state.line += (target - state.line) * LINE_EASE;
        if (Math.abs(target - state.line) < 5e-4) state.line = target;
        if (state.progress !== state.writtenProgress) {
          state.writtenProgress = state.progress;
          section.style.setProperty('--t', state.progress.toFixed(4));
        }
        if (state.line !== state.writtenLine) {
          state.writtenLine = state.line;
          section.style.setProperty('--tl', state.line.toFixed(4));
        }
        const week = Math.round(state.line * weeks);
        if (week !== state.writtenWeek && weekRef.current) {
          state.writtenWeek = week;
          weekRef.current.textContent = String(week);
        }
        const active = phaseAt(phases, state.progress * weeks);
        if (active !== state.active) {
          state.active = active;
          setScrollActive(active);
        }
      },
    });
  }, [reduced, phases, weeks]);

  const current = count
    ? Math.min(count - 1, hovered >= 0 ? hovered : scrollActive >= 0 ? scrollActive : phaseAt(phases, resting * weeks))
    : -1;
  // Without the frame loop (reduced motion) the line jumps straight to the hovered bar.
  const restingLine = reduced && phases[hovered] ? (phases[hovered].start + phases[hovered].end) / 2 / weeks : resting;
  const phase = phases[current];
  const sectionStyle: StyleWithVars = {
    ...TYPE.body,
    background: 'var(--gd-brass)',
    color: 'var(--gd-ink)',
    '--t': resting,
    '--tl': restingLine,
  };
  const percent = (week: number) => `${(week / weeks) * 100}%`;
  const barRate = (item: SchedulePhase): StyleWithVars => ({
    '--s': (item.start / weeks).toFixed(4),
    '--k': (weeks / (item.end - item.start)).toFixed(4),
  });

  return (
    <section
      ref={sectionRef}
      className={cx('gd gd-sec schedule', revealed && 'is-in')}
      style={sectionStyle}
    >
      <span className="schedule-haz" aria-hidden="true" />
      <span className="schedule-haz is-b" aria-hidden="true" />
      <div className="gd-wrap schedule-wrap">
        <header className="schedule-top">
          <div className="schedule-ttl">
            <Eyebrow text={eyebrow} />
            <Heading text={heading} size="clamp(44px,4.4vw,64px)" lineHeight={0.9} delay={80} />
          </div>
          {subCopy.trim() && (
            <p className="schedule-sub gd-rv" style={revealDelay(320)}>
              {subCopy}
            </p>
          )}
        </header>
        {count > 0 && (
          <>
            <div className="schedule-main gd-rv" style={revealDelay(380)}>
              <div className="schedule-chart">
                <div className="schedule-plot">
                  <div className="schedule-axis" style={TYPE.mono} aria-hidden="true">
                    {ticks.map((week, i) => {
                      const edge = i === 0 ? 'is-a' : i === ticks.length - 1 ? 'is-z' : undefined;
                      return (
                        <span key={week} className={edge} style={{ left: percent(week) }}>
                          {edge ? `${weekLabel} ${week}` : week}
                        </span>
                      );
                    })}
                  </div>
                  <div className="schedule-rows" role="group" aria-label={plainHeadline(heading)}>
                    <div className="schedule-grid" aria-hidden="true">
                      {ticks.map((week) => (
                        <i key={week} style={{ left: percent(week) }} />
                      ))}
                    </div>
                    {phases.map((item, i) => (
                      <div key={item.name} className={cx('schedule-row', i === current && 'is-act')}>
                        <span className="schedule-ix" style={TYPE.mono} aria-hidden="true">
                          {pad2(i + 1)}
                        </span>
                        <button
                          type="button"
                          className="schedule-bar"
                          aria-pressed={i === current}
                          aria-label={`${item.name}, ${weeksWord.toLowerCase()} ${formatWeek(item.start)} to ${formatWeek(item.end)}. ${item.text}`}
                          style={{ left: percent(item.start), width: percent(item.end - item.start), ...barRate(item) }}
                          onMouseEnter={() => setHovered(i)}
                          onMouseLeave={() => setHovered((last) => (last === i ? -1 : last))}
                          onFocus={() => setHovered(i)}
                          onBlur={() => setHovered((last) => (last === i ? -1 : last))}
                        >
                          <span className="schedule-ghost" style={TYPE.mono} aria-hidden="true">
                            <span>{item.name}</span>
                          </span>
                          <span className="schedule-fill" style={TYPE.mono} aria-hidden="true">
                            <span>{item.name}</span>
                          </span>
                          <i className="schedule-ms" aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="schedule-now" aria-hidden="true">
                    <span className="schedule-flag" style={TYPE.mono}>
                      <i />
                      {todayLabel} · {weekLabel} <b ref={weekRef}>{Math.round(restingLine * weeks)}</b>
                    </span>
                  </div>
                </div>
                <p className="schedule-dim" style={TYPE.mono}>
                  <span>
                    {weeks} {weeksWord.toLowerCase()}
                    {note.trim() ? ` · ${note}` : ''}
                  </span>
                </p>
              </div>
              {phase && (
                <aside className="schedule-panel gd-dark" aria-live="off">
                  <div key={current} className="schedule-panel-in">
                    <p className="schedule-pn" style={TYPE.mono}>
                      <span>
                        <i aria-hidden="true" />
                        {phaseWord} {pad2(current + 1)}
                      </span>
                      <span>
                        {pad2(current + 1)} / {pad2(count)}
                      </span>
                    </p>
                    <h3 className="schedule-ph" style={TYPE.display}>
                      {phase.name}
                    </h3>
                    {phase.text && <p className="schedule-pt">{phase.text}</p>}
                    <p className="schedule-pw">
                      <b style={TYPE.display}>
                        {weeksWord} {formatWeek(phase.start)}–{formatWeek(phase.end)}
                      </b>
                      <span style={TYPE.mono}>
                        {formatWeek(phase.end - phase.start)} {weeksWord.toLowerCase()}
                      </span>
                    </p>
                  </div>
                  <div className="schedule-steps" aria-hidden="true">
                    {phases.map((item, i) => (
                      <i key={item.name} className={cx(i === current && 'is-on', i < current && 'is-done')} />
                    ))}
                  </div>
                </aside>
              )}
            </div>
            {/* Phone: the same phases as a list, each with a short bar that fills with --t. */}
            <ol className="schedule-list gd-rv" style={revealDelay(380)}>
              {phases.map((item, i) => (
                <li key={item.name} className="schedule-li" style={barRate(item)}>
                  <p className="schedule-li-top" style={TYPE.mono}>
                    <span>{pad2(i + 1)}</span>
                    <span>
                      {weeksWord} {formatWeek(item.start)}–{formatWeek(item.end)}
                    </span>
                  </p>
                  <h3 className="schedule-li-h" style={TYPE.display}>
                    {item.name}
                  </h3>
                  <div className="schedule-mini" aria-hidden="true">
                    <span className="schedule-mini-b" style={{ left: percent(item.start), width: percent(item.end - item.start) }}>
                      <i />
                    </span>
                  </div>
                  {item.text && <p className="schedule-li-p">{item.text}</p>}
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </section>
  );
}
