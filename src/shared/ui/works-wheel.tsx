"use client";

import * as React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/shared/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface WorksWheelItem {
  title: string;
  image: string;
  href?: string;
}

export interface WorksWheelProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "children"> {
  items: WorksWheelItem[];
  label?: string;
  action?: string;
}

const CARD_H = 0.38;
const CARD_MAX_W = 0.34;
const CARD_RATIO = 1.45;
const STEP = 40;
const DRUM = 2.22;
const LENS = 2.7;
const RING_R = 1.14;
const BOW = 1.82;
const TITLE = 0.124;
const INDEX = 0.04;
const CULL = 1.6;
const DRAG_UNITS = 420;
const EASE = 0.12;
// Extra scroll distance (in viewport-heights) the sticky stage consumes per
// item so the wheel is 100% driven by the page's real scroll position --
// same "tall wrapper + sticky pane + scrub" recipe as the journey timeline
// section -- instead of a separate `wheel` listener that used to hijack and
// `preventDefault()` mouse-wheel input on top of it. That second, competing
// scroll system is what made handoff to/from the surrounding page feel
// disjointed: the section never actually moved through the document's own
// scroll range while spinning, so the instant it released, real/Lenis
// scrolling would resume from wherever the page happened to be frozen,
// producing a visible jump instead of a continuous scroll.
const SCROLL_VH_PER_ITEM = 42;

const clamp = (value: number, low: number, high: number) =>
  Math.min(high, Math.max(low, value));
const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;
const radians = (degrees: number) => (degrees * Math.PI) / 180;
const bowAt = (drumDegrees: number, bow: number) =>
  -bow * (1 - Math.cos(radians(drumDegrees)));

function place(
  ringDegrees: number,
  drumDegrees: number,
  ringRadius: number,
  drumRadius: number,
  bow: number,
  morph: number,
) {
  return (
    `translateX(${morph * bowAt(drumDegrees, bow)}px)` +
    ` rotateZ(${(1 - morph) * ringDegrees}deg)` +
    ` translateY(${-(1 - morph) * ringRadius}px)` +
    ` rotateX(${morph * drumDegrees}deg)` +
    ` translateZ(${morph * drumRadius}px)`
  );
}

type Stage = { width: number; height: number };

export function WorksWheel({
  items,
  label = "Tu ritmo",
  action = "Explorar",
  className,
  ...props
}: WorksWheelProps) {
  const wrapperRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);
  const turn = React.useRef(0);
  const target = React.useRef(0);
  const drag = React.useRef<number | null>(null);
  const [active, setActive] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [stage, setStage] = React.useState<Stage>({
    width: 0,
    height: 0,
  });
  const [reduced, setReduced] = React.useState(false);

  const count = items.length;
  const last = Math.max(count - 1, 0);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const readPreference = () => setReduced(query.matches);
    readPreference();
    query.addEventListener("change", readPreference);
    return () => query.removeEventListener("change", readPreference);
  }, []);

  React.useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const readSize = () =>
      setStage({
        width: element.clientWidth,
        height: element.clientHeight,
      });
    readSize();
    const observer = new ResizeObserver(readSize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const compact = stage.width < 640;
    const cardWidth = Math.min(
      stage.height * (compact ? 0.34 : CARD_H) * CARD_RATIO,
      stage.width * (compact ? 0.68 : CARD_MAX_W),
    );
    const cardHeight = cardWidth / CARD_RATIO;
    const drumRadius = cardHeight * DRUM;
    const ringRadius = cardHeight * RING_R;
    const ringScale = count
      ? clamp(
          (((2 * Math.PI * ringRadius) / count) * 0.82) / (cardWidth || 1),
          0.16,
          1,
        )
      : 1;

    return {
      cardWidth,
      cardHeight,
      drumRadius,
      ringRadius,
      ringScale,
      bow: cardHeight * BOW,
      depth: cardHeight * LENS,
      title: cardHeight * TITLE,
      index: cardHeight * INDEX,
    };
  }, [stage, count]);

  React.useEffect(() => {
    if (!stage.height || !visible) return;
    let frame = 0;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      turn.current =
        Math.abs(gap) < 0.0005
          ? target.current
          : turn.current + gap * (reduced ? 1 : EASE);

      const position = turn.current;
      const morph = clamp(position, 0, 1);
      const selectedPosition = Math.max(0, position - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-morph * metrics.drumRadius}px)`;
      }

      for (let index = 0; index < count; index += 1) {
        const distance = index - selectedPosition;
        const drumDegrees = distance * STEP;
        const card = cardRefs.current[index];

        if (card) {
          card.style.transform = place(
            distance * (360 / count),
            drumDegrees,
            metrics.ringRadius,
            metrics.drumRadius,
            metrics.bow,
            morph,
          );
          card.style.opacity =
            morph > 0.5 && Math.abs(distance) > CULL ? "0" : "1";
          card.style.zIndex = String(
            Math.round(100 - Math.abs(distance) * 2),
          );
        }

        const face = card?.firstElementChild as HTMLElement | null;
        if (face) {
          face.style.transform = `scale(${lerp(
            metrics.ringScale,
            1,
            morph,
          )})`;
        }
      }

      if (labelRef.current) {
        labelRef.current.style.opacity = String(1 - morph);
      }
      if (titleRef.current) {
        titleRef.current.style.opacity = String(morph);
      }

      const nearest = clamp(Math.round(selectedPosition), 0, last);
      setActive((previous) =>
        previous === nearest ? previous : nearest,
      );
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.height, count, last, reduced, visible]);

  const moveTo = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      // Other pinned/scrubbed sections earlier on the page (the hero's
      // scroll-scrubbed video, the journey timeline) may add their own
      // pin-spacing after this trigger has already measured its position;
      // deferring this trigger's layout math until every default-priority
      // trigger has settled keeps it accurate regardless of mount order.
      refreshPriority: -1,
      onUpdate: (self) => {
        // The wrapper's own height IS the scroll range for the whole
        // journey through every card -- `self.progress` (0 to 1 across
        // that range) maps directly onto the wheel's 0..last+1 position,
        // so the wheel is a pure function of the page's real scroll
        // position, exactly like the sticky journey timeline section.
        target.current = self.progress * (last + 1);
      },
    });

    return () => trigger.kill();
  }, [last]);

  return (
    <section
      ref={wrapperRef}
      aria-label={label}
      className={cn(
        "relative w-full min-h-[34rem] bg-ink",
        className,
      )}
      style={{
        // Extra scroll runway proportional to the item count: scrolling
        // through this whole height is what drives the wheel from its
        // first card to its last (see the ScrollTrigger above). The runway
        // remains identical when iOS reports reduced motion: the wheel then
        // follows the scroll without interpolation, rather than becoming a
        // disconnected one-screen carousel.
        height: `calc(100svh + ${(last + 1) * SCROLL_VH_PER_ITEM}svh)`,
      }}
      {...props}
    >
      <div className="sticky top-0 h-svh min-h-[34rem] w-full select-none overflow-hidden bg-ink text-bone">
        <div
          ref={stageRef}
          tabIndex={0}
          role="listbox"
          aria-label={label}
          aria-activedescendant={`works-wheel-${active}`}
          className="absolute inset-0 cursor-grab touch-pan-y outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ember active:cursor-grabbing"
          style={{ perspective: `${metrics.depth}px` }}
          onPointerDown={(event) => {
            if (event.pointerType === "touch") return;
            drag.current = event.clientY;
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (event.pointerType === "touch") return;
            if (drag.current === null) return;
            moveTo(
              target.current + (drag.current - event.clientY) / DRAG_UNITS,
            );
            drag.current = event.clientY;
          }}
          onPointerUp={(event) => {
            if (event.pointerType === "touch") return;
            drag.current = null;
            if (target.current > 1) moveTo(Math.round(target.current));
          }}
          onPointerCancel={(event) => {
            if (event.pointerType === "touch") return;
            drag.current = null;
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              moveTo(Math.round(target.current) + 1);
            } else if (event.key === "ArrowUp") {
              moveTo(Math.round(target.current) - 1);
            } else {
              return;
            }
            event.preventDefault();
          }}
        >
          <div
            ref={wheelRef}
            className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
          >
            {items.map((item, index) => {
              const Tag = (item.href ? "a" : "div") as React.ElementType;
              return (
                <Tag
                  key={item.title}
                  id={`works-wheel-${index}`}
                  role="option"
                  aria-selected={index === active}
                  href={item.href}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[index] = node;
                  }}
                  className="group absolute [backface-visibility:hidden]"
                  style={{
                    width: metrics.cardWidth,
                    height: metrics.cardHeight,
                    marginLeft: -metrics.cardWidth / 2,
                    marginTop: -metrics.cardHeight / 2,
                  }}
                >
                  <span className="relative block size-full overflow-hidden rounded-2xl bg-surface shadow-[0_20px_55px_-20px_rgba(0,0,0,0.65)]">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover"
                    />
                    {action && item.href ? (
                      <span className="pointer-events-none absolute bottom-3 right-3 flex translate-y-1 items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-[0.7rem] font-semibold text-bone opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        {action}
                        <ArrowUpRight size={12} weight="bold" />
                      </span>
                    ) : null}
                  </span>
                </Tag>
              );
            })}
          </div>
        </div>

        <div
          ref={labelRef}
          className="pointer-events-none absolute inset-0 grid place-items-center font-display font-semibold tracking-[-0.03em] text-bone"
          style={{ fontSize: metrics.title }}
        >
          {label}
        </div>

        <div
          ref={titleRef}
          className="pointer-events-none absolute left-1/2 top-[76%] max-w-[82%] -translate-x-1/2 -translate-y-1/2 text-center font-display font-semibold leading-[0.95] tracking-[-0.03em] text-bone opacity-0 md:left-[6%] md:top-1/2 md:max-w-[34%] md:translate-x-0 md:text-left"
          style={{ fontSize: metrics.title }}
        >
          {items[active]?.title}
        </div>

        <ol
          className="absolute right-[3%] top-[8%] hidden text-right leading-[1.8] text-smoke md:block"
          style={{ fontSize: metrics.index }}
        >
          {items.map((item, index) => (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => moveTo(index + 1)}
                className={cn(
                  "cursor-pointer outline-none transition-colors duration-200 focus-visible:text-bone",
                  index === active && "font-semibold text-ember",
                )}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ol>

        <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs text-smoke md:bottom-8">
          <span className="md:hidden">Desliza para recorrer</span>
          <span className="hidden md:inline">
            Gira, arrastra o usa las flechas
          </span>
        </p>
      </div>
    </section>
  );
}

export default WorksWheel;
