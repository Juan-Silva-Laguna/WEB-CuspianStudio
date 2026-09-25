import { useEffect, useRef, useSyncExternalStore } from "react";
import { Quotes, Star } from "@phosphor-icons/react";
import gsap from "gsap";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback) {
  if (typeof window === "undefined") return () => {};

  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);

  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;

  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

const TESTIMONIALS_TOP = [
  {
    quote:
      "Llegué buscando ejercicio y encontré una comunidad que me hace querer volver cada semana.",
    name: "Laura Martinez",
    plan: "Plan Activo",
  },
  {
    quote:
      "Las clases tienen energía de show, pero los instructores siguen pendientes de tu técnica y progreso.",
    name: "Santiago Rojas",
    plan: "Plan Full",
  },
  {
    quote:
      "El espacio se siente cuidado. Desde que entras hasta que termina la clase, todo tiene intención.",
    name: "Valentina Gomez",
    plan: "Cuspian VIP",
  },
  {
    quote:
      "Jumping me devolvio las ganas de entrenar. Es intenso, divertido y nunca se siente repetitivo.",
    name: "Camila Torres",
    plan: "Plan Inicial",
  },
  {
    quote:
      "Vine por una clase suelta y me quedé por la comunidad. Cada instructor se aprende tu nombre.",
    name: "Juliana Perez",
    plan: "Clase Individual",
  },
  {
    quote:
      "Cambié tres gimnasios antes de llegar aquí. Ninguno tenía esta mezcla de exigencia y buena energía.",
    name: "Nicolas Vargas",
    plan: "Plan Activo",
  },
  {
    quote:
      "El plan fundador me dio el empujón que necesitaba. Tres meses después ya no falto a una clase.",
    name: "Manuela Cardenas",
    plan: "Plan Full",
  },
  {
    quote:
      "Bachata y funcional en el mismo estudio, con el mismo nivel de cuidado. Eso no se ve fácil.",
    name: "Sebastian Londoño",
    plan: "Plan Inicial",
  },
];

const TESTIMONIALS_BOTTOM = [
  {
    quote:
      "Empecé con la clase individual por curiosidad y en un mes ya tenía mensualidad. Se nota el nivel.",
    name: "Andres Sepulveda",
    plan: "Clase Individual",
  },
  {
    quote:
      "La coreografía para mi boda quedó tan bien que ahora vengo a las clases regulares del estudio.",
    name: "Daniela Ospina",
    plan: "Plan Activo",
  },
  {
    quote:
      "Cada Master Class trae algo nuevo. Nunca es la misma rutina y siempre salgo queriendo más.",
    name: "Mateo Restrepo",
    plan: "Plan Full",
  },
  {
    quote:
      "El seguimiento del plan Cuspian VIP con medición y alimentación cambió por completo mis resultados.",
    name: "Isabella Duque",
    plan: "Cuspian VIP",
  },
  {
    quote:
      "Traje a un amigo con el descuento y ahora entrenamos juntos cada semana. El ambiente engancha.",
    name: "Alejandro Ruiz",
    plan: "Plan Activo",
  },
  {
    quote:
      "Las fotos profesionales y las medallas por asistencia son detalles que no esperaba de un estudio de baile.",
    name: "Paula Jimenez",
    plan: "Plan Full",
  },
  {
    quote:
      "Entré con la matrícula gratis de lanzamiento y me quedé por la calidad de los profesores.",
    name: "David Zapata",
    plan: "Plan Inicial",
  },
  {
    quote:
      "Cada reto mensual me obliga a mejorar. Es la primera vez que un gimnasio me hace competir conmigo mismo.",
    name: "Sofia Herrera",
    plan: "Cuspian VIP",
  },
];

function TestimonialCard({ testimonial }) {
  return (
    <article className="w-[82vw] max-w-md shrink-0 rounded-2xl bg-surface p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] md:w-[420px] md:p-8">
      <div className="flex items-center justify-between">
        <Quotes size={28} weight="fill" className="text-ember" />
        <div className="flex gap-1 text-ember" aria-label="5 de 5 estrellas">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={14} weight="fill" />
          ))}
        </div>
      </div>
      <blockquote className="mt-8">
        <p className="text-lg leading-relaxed text-bone">
          “{testimonial.quote}”
        </p>
        <footer className="mt-7">
          <p className="font-display font-semibold text-bone">
            {testimonial.name}
          </p>
          <p className="mt-1 text-sm text-smoke">{testimonial.plan}</p>
        </footer>
      </blockquote>
    </article>
  );
}

// A row of testimonial cards that autoplay-glides back and forth between
// its two scroll edges (GSAP tween on the container's real `scrollLeft`,
// manually re-triggered on each bounce so it can reverse direction the
// instant it reaches either end). Because the animation drives genuine
// `scrollLeft` on an `overflow-x: auto` element -- rather than a CSS
// transform on a clipped track -- the row stays natively scrollable at all
// times: a visitor can drag, swipe or use the trackpad to jump straight
// from the first testimonial to the last without waiting for the autoplay.
// User interaction pauses the autoplay tween; it resumes, from wherever the
// user left it, after a short idle period. `reverse` flips the starting
// edge so the top and bottom rows travel in opposite directions.
function BounceRow({ items, keyPrefix, reverse = false, speed = 55 }) {
  const viewportRef = useRef(null);
  const tweenRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const directionRef = useRef(reverse ? -1 : 1);
  const interactingRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    if (reducedMotion) {
      viewport.scrollTo({ left: 0, behavior: "auto" });
      return undefined;
    }

    const RESUME_DELAY = 1500;
    const maxScroll = () =>
      Math.max(0, viewport.scrollWidth - viewport.clientWidth);

    // Animates a plain proxy object rather than tweening `scrollLeft`
    // directly, then applies each frame through `viewport.scrollTo(...)`.
    // Some mobile WebKit builds isolate a scrollable element into a
    // touch-only compositor layer and silently ignore direct `scrollLeft`
    // writes from JS until the user physically touches the element (the
    // value updates internally but nothing repaints) -- `scrollTo()` is the
    // documented, reliable way to make programmatic scrolling actually
    // repaint on those engines, so autoplay behaves the same on a real
    // phone as it does on desktop.
    const playFrom = (from, dir) => {
      tweenRef.current?.kill();
      if (interactingRef.current) return;

      const max = maxScroll();
      if (max <= 0) return;

      const to = dir === 1 ? max : 0;
      const distance = Math.abs(to - from);
      if (distance < 1) {
        directionRef.current = -dir;
        playFrom(from, -dir);
        return;
      }

      const proxy = { x: from };
      tweenRef.current = gsap.to(proxy, {
        x: to,
        duration: distance / speed,
        ease: "sine.inOut",
        onUpdate: () => {
          viewport.scrollTo({ left: proxy.x, behavior: "auto" });
        },
        onComplete: () => {
          directionRef.current *= -1;
          playFrom(to, directionRef.current);
        },
      });
    };

    const start = () => {
      if (interactingRef.current) return;
      tweenRef.current?.kill();
      const max = maxScroll();
      const initial = reverse ? max : 0;
      viewport.scrollTo({ left: initial, behavior: "auto" });
      directionRef.current = reverse ? -1 : 1;
      playFrom(initial, directionRef.current);
    };

    start();

    const resizeObserver = new ResizeObserver(() => start());
    resizeObserver.observe(viewport);

    const scheduleResume = () => {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        interactingRef.current = false;
        const current = viewport.scrollLeft;
        const max = maxScroll();
        const dir =
          current >= max - 1 ? -1 : current <= 1 ? 1 : directionRef.current;
        directionRef.current = dir;
        playFrom(current, dir);
      }, RESUME_DELAY);
    };

    const handleInteractionStart = () => {
      interactingRef.current = true;
      tweenRef.current?.kill();
      scheduleResume();
    };

    const handleScroll = () => {
      if (interactingRef.current) scheduleResume();
    };

    viewport.addEventListener("pointerdown", handleInteractionStart);
    viewport.addEventListener("wheel", handleInteractionStart, {
      passive: true,
    });
    viewport.addEventListener("touchstart", handleInteractionStart, {
      passive: true,
    });
    viewport.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      tweenRef.current?.kill();
      clearTimeout(resumeTimeoutRef.current);
      viewport.removeEventListener("pointerdown", handleInteractionStart);
      viewport.removeEventListener("wheel", handleInteractionStart);
      viewport.removeEventListener("touchstart", handleInteractionStart);
      viewport.removeEventListener("scroll", handleScroll);
    };
  }, [reducedMotion, reverse, speed, items]);

  return (
    <div ref={viewportRef} className="testimonial-viewport" tabIndex={0}>
      <div className="flex w-max gap-5 md:gap-6">
        {items.map((testimonial) => (
          <TestimonialCard
            key={`${keyPrefix}-${testimonial.name}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
}


export function Testimonials() {
  return (
    <section
      id="testimonios"
      className="overflow-hidden bg-surface-2 py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-bone md:text-6xl">
          La energía se comparte.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-smoke md:text-lg">
          Personas reales que encontraron una forma distinta de entrenar,
          bailar y avanzar.
        </p>
      </div>

      <div className="mt-14 space-y-5 md:space-y-6">
        <BounceRow items={TESTIMONIALS_TOP} keyPrefix="top" speed={55} />
        <BounceRow
          items={TESTIMONIALS_BOTTOM}
          keyPrefix="bottom"
          reverse
          speed={48}
        />
      </div>
    </section>
  );
}
