import { useMemo, useRef } from "react";
import { useVideoJourney } from "@/app/providers/VideoScrollBackground";
import { Nav } from "../components/Nav";
import {
  CinematicReveal,
  EnergyBridge,
  MovementBridge,
} from "../components/CinematicReveal";
import { About } from "../components/About";
import { Experience } from "../components/Experience";
import { WorksWheelSection } from "../components/WorksWheelSection";
import { DetrasDeEscena } from "../components/TimelineSections";
import { Differentiators } from "../components/Differentiators";
import { Events } from "../components/Events";
import { Membership } from "../components/Membership";
import { Launch } from "../components/Launch";
import { AppControl } from "../components/AppControl";
import { Testimonials } from "../components/Testimonials";
import { Contact } from "../components/Contact";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";

/**
 * The Cuspian Studio landing page. Rendered inside <VideoScrollProvider> so
 * it can reach the shared video's context. Owns the refs for every section
 * the background video's journey passes through -- Hero, About,
 * EnergyBridge, Experience, MovementBridge, in DOM order -- and hands them
 * to `useVideoJourney`, which locks the video's `currentTime` to total
 * scroll position across that entire span (including the opaque
 * About/Experience sections in between) via a single pure linear mapping,
 * so the clip never sits frozen -- or crawls at a different pace -- no
 * matter which section is currently on screen or how tall any of them
 * happen to be.
 */
export function LandingPage() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const energyRef = useRef(null);
  const experienceRef = useRef(null);
  const movementRef = useRef(null);

  const journeyPhases = useMemo(
    () => [
      { ref: heroRef },
      { ref: aboutRef },
      { ref: energyRef },
      { ref: experienceRef },
      { ref: movementRef },
    ],
    []
  );

  useVideoJourney(journeyPhases);

  return (
    <>
      <div className="grain-overlay" />
      <Nav />
      <main>
        <CinematicReveal sectionRef={heroRef} />
        <About sectionRef={aboutRef} />
        <EnergyBridge sectionRef={energyRef} />
        <Experience sectionRef={experienceRef} />
        <MovementBridge sectionRef={movementRef} />
        <DetrasDeEscena />
        <WorksWheelSection />
        <Differentiators />
        <Events />
        <Membership />
        <Launch />
        <AppControl />
        <Testimonials />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
