"use client";

import Image from "next/image";
import { Check, Play, RotateCcw } from "lucide-react";
import { setDone, useProgress } from "@/lib/progress";
import { cn, thumbnail } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/button";
import { usePlayVideo } from "@/components/video/video-player";
import { ProgressBar } from "./path-card";

export type Step = { id: string; title: string; duration?: string; note: string };

/** Ordered list of videos in a learning path, with "done" checkboxes and a continue button. */
export function PathSteps({ steps }: { steps: Step[] }) {
  const progress = useProgress();
  const play = usePlayVideo();
  const done = steps.filter((s) => progress[s.id]).length;
  const next = steps.find((s) => !progress[s.id]);

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-5 rounded-[20px] p-5 glass md:px-6">
        <ProgressBar done={done} total={steps.length} className="min-w-55 flex-1" />
        {next ? (
          <button type="button" onClick={() => play(next.id, next.title)} className={buttonClasses({})}>
            <Play className="fill-current" />
            {done ? `Continue: step ${steps.indexOf(next) + 1}` : "Start the path"}
          </button>
        ) : (
          <button type="button" onClick={() => steps.forEach((s) => setDone(s.id, false))} className={buttonClasses({ variant: "ghost" })}>
            <RotateCcw /> Start over
          </button>
        )}
      </div>

      <ol className="grid gap-3">
        {steps.map((s, i) => {
          const isDone = !!progress[s.id];
          const isNext = next?.id === s.id;
          return (
            <li
              key={s.id + i}
              className={cn(
                "grid grid-cols-[auto_1fr] items-center gap-4 rounded-[20px] p-3.5 glass transition-shadow md:grid-cols-[auto_200px_1fr_auto] md:gap-5 md:p-4",
                isNext && "shadow-glass-lg ring-2 ring-accent/25",
              )}
            >
              <button
                type="button"
                onClick={() => setDone(s.id, !isDone)}
                aria-pressed={isDone}
                aria-label={isDone ? `Mark step ${i + 1} as not done` : `Mark step ${i + 1} as done`}
                className={cn(
                  "grid size-10 place-items-center rounded-full border-2 font-mono text-sm font-medium transition-all",
                  isDone ? "border-accent bg-accent text-white" : "border-line-strong bg-white text-muted hover:border-accent hover:text-accent",
                )}
              >
                {isDone ? <Check className="size-4.5" /> : i + 1}
              </button>

              <button
                type="button"
                onClick={() => play(s.id, s.title)}
                aria-label={`Play: ${s.title}`}
                className="group relative col-span-2 aspect-video overflow-hidden rounded-[14px] bg-slate-200 md:col-span-1"
              >
                <Image
                  src={thumbnail(s.id)}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-slate-900/15 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="grid size-11 place-items-center rounded-full bg-white/80 text-accent backdrop-blur-md">
                    <Play className="ml-0.5 size-4.5 fill-current" />
                  </span>
                </span>
                {s.duration && (
                  <span className="absolute right-2 bottom-2 rounded-full px-2 py-0.5 font-mono text-[11px] text-white glass-dark">{s.duration}</span>
                )}
              </button>

              <div className="col-span-2 grid gap-1 md:col-span-1">
                <p className="text-xs font-medium text-accent">Step {i + 1}</p>
                <h3
                  className={cn(
                    "text-[16.5px] leading-snug font-medium tracking-[-0.015em]",
                    isDone && "text-muted line-through decoration-muted/40",
                  )}
                >
                  {s.title}
                </h3>
                <p className="text-[14.5px] text-muted">{s.note}</p>
              </div>

              <button
                type="button"
                onClick={() => setDone(s.id, !isDone)}
                className={cn(buttonClasses({ variant: "ghost", size: "sm" }), "col-span-2 md:col-span-1", isDone && "border-accent/30 text-accent")}
              >
                {isDone ? (
                  <>
                    <Check /> Done
                  </>
                ) : (
                  "Mark as done"
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
