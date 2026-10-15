"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type Heading = { id: string; text: string };

/** "On this page" list that highlights the section you're reading. */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;
  return (
    <nav aria-label="On this page" className="sticky top-28 rounded-[20px] p-5 glass-flat">
      <p className="mb-3 text-[12px] font-medium tracking-wide text-muted uppercase">On this page</p>
      <ul className="grid gap-1 border-l border-line">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1 pl-3 text-[13.5px] leading-snug transition-colors",
                active === h.id ? "border-accent font-medium text-accent" : "border-transparent text-muted hover:text-fg",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
