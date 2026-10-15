"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import type { Role } from "@/content/types";
import { buttonClasses } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon";
import { Tag } from "@/components/ui/primitives";

/** Expandable internship roles; "Apply" jumps to the form with the role pre-selected. */
export function RoleList({ roles }: { roles: Role[] }) {
  return (
    <div className="grid gap-3">
      {roles.map((r, i) => (
        <details key={r.id} id={r.id} open={i === 0} className="group rounded-[20px] glass transition-shadow open:shadow-glass-lg">
          <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-4.5 p-4.5 md:grid-cols-[auto_1fr_auto] md:px-6 md:py-5">
            <IconTile name={r.icon} tone={r.tone} className="hidden md:grid" />
            <div>
              <h3 className="text-lg tracking-[-0.02em]">{r.title}</h3>
              <Tag className="mt-1.5">{r.type}</Tag>
            </div>
            <span className="grid size-8.5 place-items-center rounded-full border border-line bg-white/80 text-muted transition-transform duration-300 group-open:rotate-180 group-open:text-accent">
              <ChevronDown className="size-4" />
            </span>
          </summary>
          <div className="grid gap-4.5 px-4.5 pb-5 text-fg-soft md:pr-6 md:pb-6 md:pl-22">
            <p>{r.summary}</p>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                ["// what you'll do", r.tasks],
                ["// what you need", r.need],
              ].map(([title, items]) => (
                <div key={title as string}>
                  <h4 className="mb-2 font-mono text-[12.5px] font-medium tracking-normal text-accent">{title as string}</h4>
                  <ul className="grid list-disc gap-1.5 pl-4.5 marker:text-accent">
                    {(items as string[]).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <a
              href="#apply"
              onClick={() => window.dispatchEvent(new CustomEvent("rl:pick-role", { detail: r.id }))}
              className={buttonClasses({ size: "sm", className: "w-fit" })}
            >
              Apply for this role <ArrowRight />
            </a>
          </div>
        </details>
      ))}
    </div>
  );
}
