import { SmoothScrollProvider } from "@/app/providers/useSmoothScroll";
import { VideoScrollProvider } from "@/app/providers/VideoScrollBackground";
import { LandingPage } from "@/modules/landing";

/**
 * Wraps the landing page with its scroll/video providers.
 * Kept separate so these heavy providers don't load on auth or dashboard routes.
 */
export default function LandingLayout() {
  return (
    <SmoothScrollProvider>
      <VideoScrollProvider>
        <LandingPage />
      </VideoScrollProvider>
    </SmoothScrollProvider>
  );
}
