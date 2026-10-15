import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades content up as it scrolls into view, using a CSS scroll-driven animation
 * (see `.reveal` in globals.css). No JavaScript is involved, so content is always
 * visible: browsers without support, reduced-motion users and slow connections
 * simply see it straight away. `delay` staggers items in a row.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Cmp = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Cmp className={cn("reveal", className)} style={delay ? ({ "--reveal-delay": `${Math.round(delay * 100)}%` } as CSSProperties) : undefined}>
      {children}
    </Cmp>
  );
}
