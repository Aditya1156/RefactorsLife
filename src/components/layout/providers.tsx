"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { VideoPlayerProvider } from "@/components/video/video-player";

export function Providers({ children }: { children: ReactNode }) {
  return (
    // Animations switch off for visitors who prefer reduced motion.
    <MotionConfig reducedMotion="user">
      <VideoPlayerProvider>{children}</VideoPlayerProvider>
    </MotionConfig>
  );
}
