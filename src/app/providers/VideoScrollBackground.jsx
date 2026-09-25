import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VIDEO_SRC = "/video/jumping-all-intra.mp4";

const VideoScrollContext = createContext(null);

/**
 * Mounts a single fixed, full-bleed <video> layer behind the entire page and
 * shares it (plus a "ready" flag once its metadata has loaded) through
 * context. `useVideoJourney` (called once, high up in the tree) locks this
 * one video's `currentTime` to the total scroll position across every
 * section it passes behind -- including the opaque ones that cover it --
 * so it can appear, get covered, and reappear further down the page as many
 * times as the layout needs while always reading as a single continuous,
 * 100% scroll-driven clip, instead of being locked to a single pinned hero.
 */
export function VideoScrollProvider({ children }) {
  const videoRef = useRef(null);
  const layerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    // No poster image is used (nothing in the brand kit matches the video's
    // actual first frame, and showing a mismatched poster is exactly the
    // "otra imagen" flash the user is trying to get rid of). Instead, as
    // soon as the video has enough data to render a frame, we explicitly
    // seek to 0 so the very first paint is the video's own opening frame --
    // matching where the hero's scrub phase starts -- rather than whatever
    // frame the browser happens to decode first.
    const markReady = () => {
      video.currentTime = 0;
      setReady(true);
    };

    if (video.readyState >= 2) {
      markReady();
      return undefined;
    }

    video.addEventListener("loadeddata", markReady, { once: true });
    return () => video.removeEventListener("loadeddata", markReady);
  }, []);

  return (
    <VideoScrollContext.Provider value={{ videoRef, layerRef, ready }}>
      <div
        ref={layerRef}
        className="pointer-events-none fixed inset-x-0 bottom-0 top-16 z-0 overflow-hidden bg-ink"
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/35 to-ink/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-transparent to-ink/25" />
      </div>
      <div className="relative z-10">{children}</div>
    </VideoScrollContext.Provider>
  );
}

/**
 * Orchestrates ONE continuous scroll-to-video mapping across the entire
 * "video journey" -- from the very top of the first phase section to the
 * very bottom of the last one -- so the shared background video's
 * `currentTime` is a strict, uninterrupted function of total scroll
 * position across that whole span, INCLUDING the opaque sections (like
 * <About /> and <Experience />) that sit between the visible video phases
 * and cover it. Those in-between sections don't render the video
 * themselves, but scrolling through them still keeps the shared clip
 * ticking forward (each is given its own small slice of the timeline), so
 * there is never a "dead" scroll range anywhere in the journey where the
 * video just sits on a frozen frame -- it is 100% locked to scroll,
 * start to finish, whether or not it happens to be visible at that exact
 * moment.
 *
 * `phases` is an ordered array (matching DOM order top-to-bottom) of
 * `{ ref }` describing every section the journey passes through, where
 * `ref` is that section's DOM ref. Only the first and last phase's
 * boundaries are used to measure the overall scroll span -- the mapping
 * from scroll position to video time is deliberately a single, pure
 * linear function of total scroll distance across that whole span, NOT a
 * set of hand-tuned per-phase durations. That's what guarantees the
 * video's velocity (seconds of footage per pixel scrolled) is
 * *mathematically identical* everywhere on the page: no phase -- visible
 * or hidden behind an opaque section -- can ever end up "eating" a
 * disproportionate amount of scroll distance relative to how much footage
 * it was allotted (which is exactly what happened when About's margin
 * grew but its fixed time slice didn't: the same footage got stretched
 * over far more scroll, so it visibly crawled). Any future layout change
 * (margins, responsive breakpoints, added/removed content) can never
 * throw the pacing off, because there is no per-section budget to fall
 * out of sync in the first place.
 */
export function useVideoJourney(phases) {
  const context = useContext(VideoScrollContext);

  useLayoutEffect(() => {
    if (!context) return undefined;

    const video = context.videoRef?.current;
    if (!video || !context.ready) return undefined;

    const firstEl = phases[0]?.ref?.current;
    const lastEl = phases[phases.length - 1]?.ref?.current;
    if (!firstEl || !lastEl) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      video.currentTime = 0;
      return undefined;
    }

    // Pixel offsets of the very start and very end of the journey,
    // remeasured whenever ScrollTrigger recalculates (initial load, window
    // resize, content reflow) so the mapping stays accurate at any
    // viewport size regardless of how tall any section in between is.
    let startY = 0;
    let endY = 0;
    const measure = () => {
      const firstRect = firstEl.getBoundingClientRect();
      const lastRect = lastEl.getBoundingClientRect();
      startY = firstRect.top + window.scrollY;
      endY = lastRect.bottom + window.scrollY;
    };

    const trigger = ScrollTrigger.create({
      trigger: firstEl,
      start: "top top",
      endTrigger: lastEl,
      end: "bottom top",
      scrub: true,
      onRefresh: measure,
      onUpdate: (self) => {
        if (endY <= startY) measure();
        const scrollY = self.scroll();
        const progress =
          endY > startY
            ? gsap.utils.clamp(0, 1, (scrollY - startY) / (endY - startY))
            : 0;
        video.currentTime = progress * video.duration;
      },
    });

    measure();
    video.currentTime = 0;

    return () => trigger.kill();
  }, [context, phases]);
}

/**
 * Cross-fades a section's caption "beats" evenly across its own scroll
 * distance. Completely independent of the shared video's `currentTime`,
 * which is now driven exclusively by `useVideoJourney` above -- this hook
 * only ever touches caption opacity/position (and, optionally, the shared
 * video layer's fade-out). Optional `beatRefs` (a `useRef([])`-style ref
 * holding one DOM node per caption) cross-fade evenly across the section's
 * own top-to-bottom scroll range. `hideAfterEnd` fades the whole shared
 * video layer to invisible over the last stretch of this section (and back
 * in if the user scrolls back up), so nothing further down the page needs
 * to worry about covering it.
 */
export function useSectionCaptions(
  sectionRef,
  { beatRefs, hideAfterEnd = false } = {}
) {
  const context = useContext(VideoScrollContext);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const beats = beatRefs?.current ?? [];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      beats.forEach((beat, index) => {
        if (beat) gsap.set(beat, { opacity: index === 0 ? 1 : 0, y: 0 });
      });
      return undefined;
    }

    const triggers = [];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    triggers.push(tl.scrollTrigger);

    const fade = 0.06;
    const stops = Array.from(
      { length: beats.length + 1 },
      (_, i) => i / Math.max(1, beats.length)
    );

    beats.forEach((beat, index) => {
      if (!beat) return;
      const isFirst = index === 0;
      const isLast = index === beats.length - 1;

      if (isFirst) {
        gsap.set(beat, { opacity: 1, y: 0 });
      } else {
        tl.fromTo(
          beat,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: fade, ease: "none" },
          stops[index]
        );
      }
      if (!isLast) {
        tl.to(
          beat,
          { opacity: 0, y: -24, duration: fade, ease: "none" },
          stops[index + 1] - fade
        );
      }
    });

    if (hideAfterEnd && context?.layerRef?.current) {
      const hideTrigger = ScrollTrigger.create({
        trigger: section,
        start: "bottom center",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(context.layerRef.current, { autoAlpha: 1 - self.progress });
        },
      });
      triggers.push(hideTrigger);
    }

    return () => {
      tl.kill();
      triggers.forEach((trigger) => trigger?.kill());
    };
  }, [context, sectionRef, beatRefs, hideAfterEnd]);
}
