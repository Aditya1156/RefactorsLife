"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin gradient bar at the top of the window showing how far you've read. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-0.75 origin-left bg-linear-to-r from-indigo via-accent to-sky"
    />
  );
}
