"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, PlaySquare } from "lucide-react";
import type { LearningPath } from "@/content/types";
import { useProgress } from "@/lib/progress";
import { cn, thumbnail } from "@/lib/utils";
import { IconTile } from "@/components/ui/icon";
import { Tag } from "@/components/ui/primitives";

export function ProgressBar({ done, total, className }: { done: number; total: number; className?: string }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className={cn("grid gap-1.5", className)}>
      <div
        className="h-1.75 overflow-hidden rounded-full bg-slate-900/6"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-accent to-sky transition-[width] duration-500 ease-soft"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-[12.5px] text-muted">
        {done === total && total > 0 ? "Completed" : `${done} of ${total} done`} · {pct}%
      </p>
    </div>
  );
}

/** Learning path summary card with live progress for this visitor. */
export function PathCard({ path, totalLabel }: { path: LearningPath; totalLabel: string }) {
  const progress = useProgress();
  const ids = path.steps.map((s) => s.video);
  const done = ids.filter((id) => progress[id]).length;
  const complete = done === ids.length && ids.length > 0;

  return (
    <Link
      href={`/learn/${path.slug}`}
      className="group spotlight relative flex h-full flex-col gap-4 rounded-[24px] p-6 glass transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-glass-lg md:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <IconTile name={path.icon} tone={path.tone} />
        <div className="flex -space-x-5">
          {ids.slice(0, 3).map((id, i) => (
            <span
              key={id}
              className="relative aspect-video w-20 overflow-hidden rounded-lg border-2 border-white shadow-glass-sm transition-transform duration-300 group-hover:translate-x-[calc(var(--i)*4px)]"
              style={{ zIndex: 3 - i, ["--i" as string]: i }}
            >
              <Image src={thumbnail(id, "mqdefault")} alt="" fill sizes="80px" className="object-cover" />
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-2">
        <Tag>{path.level}</Tag>
        <h3 className="text-[21px] leading-tight tracking-[-0.025em]">{path.title}</h3>
        <p className="text-[15px] text-muted">{path.description}</p>
      </div>
      <p className="flex flex-wrap gap-4 text-[13.5px] text-fg-soft">
        <span className="inline-flex items-center gap-1.5">
          <PlaySquare className="size-4 text-accent" /> {ids.length} videos
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-4 text-accent" /> {totalLabel}
        </span>
      </p>
      <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-4">
        <ProgressBar done={done} total={ids.length} className="flex-1" />
        <span className="inline-flex shrink-0 items-center gap-1.5 text-[14.5px] font-medium text-accent">
          {complete ? (
            <>
              <CheckCircle2 className="size-4.5" /> Review
            </>
          ) : (
            <>
              {done ? "Continue" : "Start"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.75" />
            </>
          )}
        </span>
      </div>
    </Link>
  );
}
