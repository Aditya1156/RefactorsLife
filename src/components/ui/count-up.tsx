"use client";

import { animate } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Counts a number up when it scrolls into view ("602+" → 0…602+).
 * The real value is server-rendered; if it's already on screen at load, it doesn't animate.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)([\d.]+)(.*)$/);
    if (!el || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, prefix, num, suffix] = match;
    const target = Number(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    const render = (n: number) => (el.textContent = `${prefix}${n.toFixed(decimals)}${suffix}`);
    render(0);
    let stop: (() => void) | undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      stop = animate(0, target, { duration: 1.4, ease: [0.2, 0.7, 0.2, 1], onUpdate: render }).stop;
    });
    io.observe(el);
    return () => {
      io.disconnect();
      stop?.();
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
