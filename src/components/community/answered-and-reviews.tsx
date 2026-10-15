import { Heart, Play, Star } from "lucide-react";
import type { Answered, Review } from "@/content/types";
import { EmptyState, Tag } from "@/components/ui/primitives";
import { VideoTrigger } from "@/components/video/video-player";
import { cn, initials } from "@/lib/utils";

/** "Already answered" accordion: each question links to the video that answers it. */
export function AnsweredList({ items, titles }: { items: Answered[]; titles: Record<string, string> }) {
  return (
    <div className="grid gap-2.5">
      {items.map((a) => (
        <details key={a.q} className="group rounded-2xl px-5 glass-flat transition-shadow open:bg-white/85 open:shadow-glass">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-4.5 font-medium tracking-[-0.01em]">
            {a.q}
            <span className="relative size-6.5 shrink-0 rounded-full bg-accent/8 text-accent before:absolute before:top-1/2 before:left-1/2 before:h-[1.6px] before:w-2.5 before:-translate-1/2 before:bg-current after:absolute after:top-1/2 after:left-1/2 after:h-[1.6px] after:w-2.5 after:-translate-1/2 after:rotate-90 after:bg-current after:transition-transform group-open:after:rotate-0" />
          </summary>
          <div className="grid gap-3 pb-5 text-fg-soft">
            <Tag>{a.tag}</Tag>
            <p>{a.a}</p>
            <VideoTrigger
              id={a.video}
              title={titles[a.video] ?? a.q}
              className="inline-flex w-fit items-center gap-1.5 font-medium text-accent hover:text-accent-strong"
            >
              <Play className="size-3.5 fill-current" /> Watch the answer
            </VideoTrigger>
          </div>
        </details>
      ))}
    </div>
  );
}

export function ReviewWall({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) {
    return (
      <EmptyState icon={<Heart className="size-7 text-accent" />} title="The wall is waiting for its first review">
        Watched a video that helped? Leave a review below. Approved reviews show up here.
      </EmptyState>
    );
  }
  return (
    <div className="columns-[300px] gap-5">
      {reviews.map((r) => (
        <figure key={r.name + r.text} className="mb-5 grid break-inside-avoid gap-4 rounded-[20px] p-7 glass">
          <div className="flex gap-0.5" aria-label={`${r.rating} out of 5`}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className={cn("size-4", n <= r.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200")} />
            ))}
          </div>
          <blockquote className="text-fg-soft">“{r.text}”</blockquote>
          <figcaption className="flex items-center gap-3 text-sm">
            <span className="grid size-9.5 place-items-center rounded-full bg-accent/8 font-semibold text-accent">{initials(r.name)}</span>
            <span>
              {r.name}
              {r.meta && <small className="block text-[13px] text-muted">{r.meta}</small>}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
