import { SmoothScrollProvider } from "./providers/useSmoothScroll";
import { VideoScrollProvider } from "./providers/VideoScrollBackground";
import { LandingPage } from "@/modules/landing";

/**
 * Composition root: wires the app-wide scroll/video providers around
 * whichever top-level module is active. Today that's always the landing
 * page (there's no router yet), but this is the seam where future
 * route-based module switching (auth / client / admin / coach) will land.
 */
function App() {
  return (
    <SmoothScrollProvider>
      <VideoScrollProvider>
        <LandingPage />
      </VideoScrollProvider>
    </SmoothScrollProvider>
  );
}

export default App;
