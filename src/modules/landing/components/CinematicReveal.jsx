import { useRef } from "react";
import { ArrowRight, PlayCircle } from "@phosphor-icons/react";
import { useSectionCaptions } from "@/app/providers/VideoScrollBackground";

/**
 * Phase 1 of the shared video journey: the hero. Its own `currentTime`
 * mapping is handled globally by `useVideoJourney` (see App.jsx); this
 * component only owns its caption fade-in via `useSectionCaptions` and its
 * own markup. Scrolls away like an ordinary hero (no pin), letting <About />
 * naturally cover the video right after.
 */
export function CinematicReveal({ sectionRef }) {
  const beatRefs = useRef([]);
  const setBeatRef = (index) => (element) => {
    beatRefs.current[index] = element;
  };

  useSectionCaptions(sectionRef, { beatRefs });

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-[100dvh] w-full items-end overflow-hidden px-6 pb-12 pt-16 md:px-10 md:pb-16"
    >
      <div ref={setBeatRef(0)} className="mx-auto w-full max-w-[1400px]">
        <h1 className="max-w-4xl font-display text-4xl font-semibold uppercase leading-[0.94] tracking-[-0.035em] text-bone sm:text-5xl md:text-7xl lg:text-[5.75rem]">
          Muévete. Conecta.
          <br />
          <span className="text-ember">Evoluciona.</span>
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-bone/75 md:text-lg">
          Baile, jumping y bienestar en un estudio que convierte cada clase
          en una experiencia.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#membresias"
            className="button-press group flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-sm font-semibold text-ink hover:bg-ember-dim"
          >
            Reservar clase
            <ArrowRight size={18} weight="bold" />
          </a>
          <a
            href="#nosotros"
            className="button-press flex items-center gap-2 rounded-full border border-bone/30 bg-ink/30 px-6 py-3.5 text-sm font-semibold text-bone backdrop-blur-md hover:border-bone/60"
          >
            <PlayCircle size={18} />
            Conocer el estudio
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Phase 2 of the shared video journey: a "bridge" between <About /> and
 * <Experience />. The video re-surfaces here; its `currentTime` is driven
 * globally by `useVideoJourney` (see App.jsx), this component only owns its
 * caption fade-in via `useSectionCaptions`. The outer section is taller
 * than one viewport so the inner `sticky` wrapper has room to hold the
 * caption glued to the screen for the whole scrub -- without it, a plain
 * `h-[100dvh]` section would only ever align with the viewport for a single
 * instant, and the caption would slide off almost immediately.
 */
export function EnergyBridge({ sectionRef }) {
  const beatRefs = useRef([]);
  const setBeatRef = (index) => (element) => {
    beatRefs.current[index] = element;
  };

  useSectionCaptions(sectionRef, { beatRefs });

  return (
    <section ref={sectionRef} className="relative min-h-[120vh] w-full">
      <div className="sticky top-0 flex h-[100dvh] w-full items-center overflow-hidden px-6 md:px-20">
        <div ref={setBeatRef(0)} className="ml-auto max-w-xl text-left">
          <h3 className="mb-4 font-display text-3xl font-bold uppercase text-bone md:text-6xl">
            Energía que se siente
          </h3>
          <p className="text-base font-light leading-relaxed text-smoke md:text-xl">
            Jumping, dance fitness y funcional grabados tal cual se viven en
            el estudio. Ritmo, sudor y una comunidad que avanza junta.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Phase 3 of the shared video journey: the final and longest reveal
 * window, placed right after <Experience />. Its `currentTime` is driven
 * globally by `useVideoJourney` (see App.jsx) all the way to the clip's
 * end; this component owns its two cross-fading captions via
 * `useSectionCaptions`, and `hideAfterEnd` fades the whole shared video
 * layer out once this section ends, so nothing further down the page needs
 * an opaque background just to hide it.
 */
export function MovementBridge({ sectionRef }) {
  const beatRefs = useRef([]);
  const setBeatRef = (index) => (element) => {
    beatRefs.current[index] = element;
  };

  useSectionCaptions(sectionRef, {
    beatRefs,
    hideAfterEnd: true,
  });

  return (
    <section ref={sectionRef} className="relative flex min-h-[260vh] w-full flex-col">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <div
          ref={setBeatRef(0)}
          className="absolute inset-0 flex items-center justify-start px-6 text-left md:px-20"
        >
          <div className="max-w-xl">
            <h3 className="mb-4 font-display text-3xl font-bold uppercase text-bone md:text-6xl">
              Cuerpo y disciplina
            </h3>
            <p className="text-base font-light leading-relaxed text-smoke md:text-xl">
              Cada instructor coreografía la sesión como un show en vivo. Tu
              progreso queda registrado clase tras clase.
            </p>
          </div>
        </div>

        <div
          ref={setBeatRef(1)}
          className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-center opacity-0"
        >
          <h3 className="font-display text-4xl font-bold uppercase text-bone md:text-7xl">
            Únete al movimiento
          </h3>
          <a
            href="#membresias"
            className="button-press group flex items-center gap-2 rounded-full bg-ember px-8 py-4 text-sm font-semibold uppercase tracking-widest text-ink hover:bg-ember-dim"
          >
            Reservar clase
            <ArrowRight
              size={18}
              weight="bold"
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
