'use client';

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cx } from '@/lib/cx';
import type { StyleWithVars } from '@/lib/css';
import { whenReleased } from '@/lib/hold';
import { pad2 } from '@/lib/text';
import { clamp01, onFrame } from '@/lib/ticker';
import { TYPE } from '@/lib/typography';
import {
  PLACEHOLDER_PROJECT,
  STOREY_M,
  floorFrame,
  floorGlass,
  hookPosition,
  stageAt,
  travel,
  type HeroProject,
} from './build';
import { HeroCard } from './HeroCard';

/** Pointer stillness (ms) after which the site starts building itself again. */
const IDLE_MS = 2600;
/** An automatic build from bare ground to topped out takes this long. */
const BUILD_SECONDS = 10.5;
/** Pause on the topped-out tower before moving to the next project. */
const TOPPED_HOLD_SECONDS = 2.6;
/** Share of the distance to the target the drawn progress covers each frame. */
const EASE_PER_FRAME = 0.085;
/** Longest frame step counted, so a stalled tab does not jump the build. */
const MAX_STEP_S = 0.05;
/** Progress at which the tower counts as topped out (flag and tree go up). */
const TOPPED = 0.995;
/** Picking a project counts as pointer activity this long ago, so building resumes 1.1s later. */
const PICK_IDLE_CREDIT_MS = 1500;

type BuildState = {
  /** Drawn progress 0..1, eased toward `target`. */
  progress: number;
  target: number;
  lastPointer: number;
  /** Seconds spent topped out. */
  hold: number;
  visible: boolean;
  /** Last floor count written into the text counters. */
  level: number;
  stage: number;
  topped: boolean;
};

type Settings = {
  floors: number;
  days: number;
  stageCount: number;
  projectCount: number;
  autoBuild: boolean;
  reduced: boolean;
  released: boolean;
};

const subscribeNothing = () => () => {};
/** False during server rendering and hydration, true once the page is interactive. */
const useHydrated = () =>
  useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );

/** Px value of a length custom property set by the stylesheet (e.g. `--band: 128px`). */
const readPx = (styles: CSSStyleDeclaration, name: string) => parseFloat(styles.getPropertyValue(name)) || 0;

function restartBuild(state: BuildState, reduced: boolean) {
  // Reduced motion shows every building finished, including after a project is picked.
  state.progress = state.target = reduced ? 1 : 0;
  state.level = -1;
  state.hold = 0;
  state.topped = false;
}

type HeroSceneProps = {
  /** Eyebrow and headline, rendered on the server. */
  copy: ReactNode;
  /** Sub copy and buttons, rendered on the server. */
  pitch: ReactNode;
  projects: HeroProject[];
  stages: string[];
  proof: string;
  topLabel: string;
  cursorLabel: string;
  autoBuild: boolean;
};

/**
 * The hero section and its building site. A frame loop eases build progress toward a target
 * that either climbs on its own (10.5s per tower, then the next project) or follows the
 * pointer's height over the section. Progress is written straight into CSS variables; React
 * state only changes when the stage, the topped-out flag or the project changes.
 */
export function HeroScene({ copy, pitch, projects, stages, proof, topLabel, cursorLabel, autoBuild }: HeroSceneProps) {
  const rootRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const build = useRef<BuildState>({ progress: 0, target: 0, lastPointer: 0, hold: 0, visible: true, level: -1, stage: 0, topped: false });
  const settings = useRef<Settings | null>(null);

  const hydrated = useHydrated();
  const reduced = usePrefersReducedMotion();
  const [released, setReleased] = useState(false);
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [topped, setTopped] = useState(false);

  const project = projects[index % Math.max(1, projects.length)] ?? PLACEHOLDER_PROJECT;
  const maxBays = Math.max(project.bays, ...projects.map((item) => item.bays));
  const stageCount = Math.max(1, stages.length);

  useMagnetic(rootRef);
  useEffect(() => whenReleased(() => setReleased(true)), []);

  // The frame loop reads these through a ref so it never has to restart.
  useLayoutEffect(() => {
    settings.current = {
      floors: project.floors,
      days: project.days,
      stageCount,
      projectCount: projects.length,
      autoBuild,
      reduced,
      released,
    };
  });

  const pick = (next: number) => {
    build.current.lastPointer = performance.now() - PICK_IDLE_CREDIT_MS;
    if (next === index) return;
    restartBuild(build.current, reduced);
    setTopped(false);
    setIndex(next);
  };

  useEffect(() => {
    const root = rootRef.current;
    const scene = sceneRef.current;
    if (!root || !scene) return;
    const state = build.current;
    if (reduced) state.progress = state.target = 1;

    const visibility = new IntersectionObserver(
      ([entry]) => {
        state.visible = entry?.isIntersecting ?? false;
      },
      { rootMargin: '80px' },
    );
    visibility.observe(root);

    // Ground band and nav allowance change with the breakpoint; re-read them when the hero resizes.
    let band = 0;
    let navHeight = 0;
    const measure = new ResizeObserver(() => {
      const styles = getComputedStyle(root);
      band = readPx(styles, '--band');
      navHeight = readPx(styles, '--nav-h');
    });
    measure.observe(root);

    // The pointer's height over the site sets how far the tower is built: low builds little,
    // high tops it out (the range overshoots both ends so the extremes are reachable).
    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      state.lastPointer = performance.now();
      state.target = clamp01(1.06 - ((event.clientY - rect.top - navHeight) / Math.max(1, rect.height - band - navHeight)) * 1.12);
      const cursor = cursorRef.current;
      if (!cursor) return;
      cursor.style.translate = `${event.clientX}px ${event.clientY}px`;
      cursor.classList.toggle('is-ui', !!(event.target as Element | null)?.closest?.('a,button'));
      cursor.classList.add('is-in');
    };
    const onLeave = () => cursorRef.current?.classList.remove('is-in');
    if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
      root.addEventListener('pointermove', onMove);
      root.addEventListener('pointerleave', onLeave);
    }

    const draw = ({ floors, days, stageCount: stagesShown }: Settings) => {
      const travelled = travel(state.progress, floors);
      root.style.setProperty('--p', clamp01(state.progress).toFixed(4));
      scene.querySelectorAll<HTMLElement>('.hero-fl').forEach((floor, floorIndex) => {
        floor.style.setProperty('--f', floorFrame(travelled, floorIndex).toFixed(3));
        floor.style.setProperty('--b', floorGlass(travelled, floorIndex).toFixed(3));
      });
      const hook = hookPosition(travelled, floors);
      scene.style.setProperty('--hook-floors', hook.floorsUp.toFixed(3));
      scene.style.setProperty('--hook-rising', String(hook.rising));
      scene.style.setProperty('--hook-rise', hook.rise.toFixed(4));
      scene.style.setProperty('--built-floors', Math.min(floors, travelled).toFixed(3));

      const level = Math.min(floors, Math.floor(travelled));
      if (level !== state.level) {
        state.level = level;
        const write = (selector: string, text: string) => root.querySelectorAll(selector).forEach((el) => (el.textContent = text));
        write('[data-lv]', pad2(level));
        write('[data-m]', (level * STOREY_M).toFixed(1));
        write('[data-day]', String(Math.round(days * Math.min(1, level / floors))));
        write('[data-k]', String(level));
      }
      const isTopped = state.progress > TOPPED;
      if (isTopped !== state.topped) {
        state.topped = isTopped;
        setTopped(isTopped);
      }
      const reached = stageAt(state.progress, stagesShown);
      if (reached !== state.stage) {
        state.stage = reached;
        setStage(reached);
      }
    };

    let last = performance.now();
    const stop = onFrame({
      write: (time) => {
        const step = Math.max(0, Math.min(MAX_STEP_S, (time - last) / 1000));
        last = time;
        const current = settings.current;
        if (!current || !state.visible || document.hidden) return;

        const idle = time - state.lastPointer > IDLE_MS;
        if (!current.reduced && current.released && current.autoBuild && idle) {
          if (state.target < 1) {
            state.target = Math.min(1, state.target + step / BUILD_SECONDS);
          } else {
            state.hold += step;
            if (state.hold > TOPPED_HOLD_SECONDS && current.projectCount > 1 && state.progress > TOPPED) {
              restartBuild(state, current.reduced);
              setTopped(false);
              setIndex((value) => (value + 1) % current.projectCount);
            }
          }
        } else {
          state.hold = 0;
        }
        // Nothing moves while the loader still covers the page.
        if (!current.released && !current.reduced) return;

        state.progress += (state.target - state.progress) * (current.reduced ? 1 : EASE_PER_FRAME);
        if (Math.abs(state.target - state.progress) < 4e-4) state.progress = state.target;
        draw(current);
      },
    });

    return () => {
      stop();
      visibility.disconnect();
      measure.disconnect();
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced]);

  // Server and first client render draw the bare site (progress 0), where the build starts.
  const startHook = hookPosition(0, project.floors);
  const sceneStyle: StyleWithVars = {
    '--floors': project.floors,
    '--bays': project.bays,
    '--max-bays': maxBays,
    '--glass': project.glass,
    '--hook-floors': startHook.floorsUp,
    '--hook-rising': startHook.rising,
    '--hook-rise': startHook.rise,
    '--built-floors': 0,
  };
  // Keyed by project so the card replays its entrance when the project changes.
  const card = (compact: boolean) => (
    <HeroCard key={project.slug} project={project} projects={projects} index={index} compact={compact} onPick={pick} />
  );

  return (
    <section
      ref={rootRef}
      className={cx('gd hero', (reduced || (hydrated && released)) && 'is-go', hydrated && 'is-live', topped && 'is-top')}
      data-gd-hero=""
      style={{ ...TYPE.body, '--p': 0 } as StyleWithVars}
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">{copy}</div>
      <div className="hero-pitch">{pitch}</div>

      <div ref={sceneRef} className="hero-scene" aria-hidden="true" style={sceneStyle}>
        {/* Keyed by project so a new tower fades in rather than morphing from the last one. */}
        <div key={project.slug} className="hero-tower">
          {Array.from({ length: project.floors }, (_, floorIndex) => (
            <div
              key={floorIndex}
              className="hero-fl"
              style={
                {
                  bottom: `calc(var(--storey) * ${floorIndex})`,
                  '--f': floorFrame(0, floorIndex).toFixed(3),
                  '--b': floorGlass(0, floorIndex).toFixed(3),
                } as StyleWithVars
              }
            >
              <span className="hero-fr" />
              <span className="hero-gl" />
            </div>
          ))}
          <span className="hero-sheen" />
          <span className="hero-roof">
            <span className="hero-tree" />
            <span className="hero-flag" style={TYPE.mono}>
              {topLabel}
            </span>
          </span>
        </div>
        <div className="hero-gauge" style={TYPE.mono}>
          <span className="hero-gauge-tx">
            L<i data-lv="">00</i>
            <small>
              {' · '}
              <i data-m="">0.0</i> m
            </small>
          </span>
        </div>
        <div className="hero-hoard" />
        <div className="hero-crane">
          <span className="hero-mast" />
          <span className="hero-cab" />
          <span className="hero-apex" />
          <span className="hero-jib" />
          <span className="hero-cjib" />
          <span className="hero-tie" />
          <span className="hero-trolley">
            <span className="hero-cable" />
            <span className="hero-hook" />
          </span>
        </div>
      </div>

      <div className="hero-cardwrap">{card(false)}</div>

      <div className="hero-ground">
        {card(true)}
        <ol className="hero-rail" style={TYPE.mono} aria-label="Build stages">
          {stages.map((name, stageIndex) => (
            <li
              key={stageIndex}
              className={stageIndex < stage ? 'is-done' : stageIndex === stage ? 'is-on' : undefined}
              style={{ '--i': stageIndex, '--n': stageCount } as StyleWithVars}
            >
              <span className="hero-rail-n">{pad2(stageIndex + 1)}</span>
              <span className="hero-rail-t">{name}</span>
              <i className="hero-rail-b" aria-hidden="true" />
            </li>
          ))}
        </ol>
        <p className="hero-proof" style={TYPE.mono}>
          {proof}
        </p>
      </div>

      {hydrated && (
        <div ref={cursorRef} className="hero-cur" aria-hidden="true">
          <span className="hero-cur-ring" />
          <span className="hero-cur-lbl" style={TYPE.mono}>
            <HookIcon />
            {cursorLabel}
          </span>
        </div>
      )}
    </section>
  );
}

/** Crane hook beside the cursor label. */
function HookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v7" />
      <circle cx="12" cy="11.5" r="1.6" />
      <path d="M12 13.1v2.4a3.4 3.4 0 1 1-6.2-1.9" />
    </svg>
  );
}
