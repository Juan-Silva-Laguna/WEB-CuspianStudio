import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

/**
 * Wires Lenis (inertial smooth scroll) into GSAP's ScrollTrigger ticker so
 * every scrub / pin animation on the page reads frame-perfect scroll
 * position instead of the native, less predictable scroll event. No-ops
 * under prefers-reduced-motion so the page falls back to native scrolling
 * with instant, non-inertial behaviour.
 *
 * Exposes the live Lenis instance through context (via `useLenis()`) so
 * anything that opens a full-screen overlay on top of the page -- like the
 * mobile nav menu -- can call `lenis.stop()`/`lenis.start()` to freeze the
 * background scroll (and, with it, the scroll-scrubbed video) while the
 * overlay is up, instead of leaving it free to keep scrolling invisibly
 * behind a fixed panel.
 */
export function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return undefined;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    });

    instance.on("scroll", ScrollTrigger.update);

    const rafId = gsap.ticker.add((time) => {
      instance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Lenis owns the scroll position each frame, so native anchor jumps
    // (nav links, footer links) get snapped back unless routed through
    // lenis.scrollTo. Intercept in-page hash links here.
    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href").slice(1);
      event.preventDefault();
      if (id === "top" || id === "") {
        instance.scrollTo(0);
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      instance.scrollTo(target, { offset: -88 });
    };
    document.addEventListener("click", handleAnchorClick);

    setLenis(instance);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

/**
 * Returns the shared Lenis instance (or `null` if it hasn't mounted yet, or
 * if the user has `prefers-reduced-motion` and Lenis was never created).
 */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Locks the page's scroll position while `locked` is true, for full-screen
 * overlays (like the mobile nav menu) that sit on top of the page and must
 * not let it keep scrolling invisibly underneath.
 *
 * Deliberately does NOT use the classic "pin body with `position: fixed`
 * and a negative `top` offset" trick: that technique takes `<body>` out of
 * normal flow, which collapses the document's scrollable height and
 * forces `window.scrollY` to snap to 0 for as long as it's applied. Since
 * this page's background video is scrubbed by a GSAP ScrollTrigger that
 * reads `window.scrollY` every update, that snap-to-0 would reset the
 * video to its very first frame the instant the menu opens, then jump it
 * back to the correct frame the instant it closes -- exactly the kind of
 * visible flash/flicker this hook exists to prevent. Using `overflow:
 * hidden` on the root elements instead blocks further scrolling without
 * ever touching `scrollY`, so the video (and everything else driven by
 * scroll position) stays completely inert and frame-accurate while the
 * overlay is up. A `touchmove` guard (scoped to outside the overlay,
 * tagged with `data-scroll-lock-scope`) covers iOS Safari, where
 * `overflow: hidden` alone doesn't fully stop rubber-band touch scrolling.
 *
 * Returns a `release()` function that undoes the lock immediately and
 * synchronously, rather than waiting for React to re-render with
 * `locked = false` and run the effect cleanup on its own schedule. This
 * matters for in-page anchor links rendered *inside* the locked overlay
 * itself (e.g. the mobile menu's own nav links): clicking one both closes
 * the menu (`locked` -> false, handled asynchronously by React) AND asks
 * Lenis to scroll to the target section (handled synchronously, by a
 * `click` listener on `document` that runs a moment later in the same
 * bubble phase). Since `lenis.scrollTo()` is a silent no-op while
 * `lenis.isStopped` is true, and the effect cleanup that calls
 * `lenis.start()` again hasn't run yet at that point, the scroll would
 * otherwise be swallowed. Call `release()` in the same click handler that
 * closes the menu to guarantee Lenis is already running by the time that
 * later listener fires.
 */
export function useScrollLock(locked) {
  const lenis = useLenis();
  const releaseRef = useRef(null);

  const release = useCallback(() => {
    const state = releaseRef.current;
    if (!state) return;
    releaseRef.current = null;
    document.documentElement.style.overflow = state.previousHtmlOverflow;
    document.body.style.overflow = state.previousBodyOverflow;
    document.removeEventListener("touchmove", state.handleTouchMove);
    lenis?.start();
  }, [lenis]);

  useEffect(() => {
    if (!locked) return undefined;

    lenis?.stop();

    const { documentElement, body } = document;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const handleTouchMove = (event) => {
      if (event.target.closest("[data-scroll-lock-scope]")) return;
      event.preventDefault();
    };
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    releaseRef.current = {
      previousHtmlOverflow,
      previousBodyOverflow,
      handleTouchMove,
    };

    return release;
  }, [locked, lenis, release]);

  return release;
}
