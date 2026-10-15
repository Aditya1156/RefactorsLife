import { cn } from "@/lib/utils";

const bar = "animate-pulse rounded-full bg-slate-900/6";

/** Placeholder shown while a detail page streams in. */
export function PageSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("container-rl grid max-w-[calc(900px+2.5rem)] gap-5 pt-14 pb-24", className)} aria-busy="true" aria-label="Loading">
      <div className={cn(bar, "h-4 w-28")} />
      <div className={cn(bar, "h-12 w-4/5")} />
      <div className={cn(bar, "h-5 w-3/5")} />
      <div className="mt-6 grid gap-3">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-[20px] glass-flat" />
        ))}
      </div>
    </div>
  );
}
