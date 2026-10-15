"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import type { CategoryId, Video } from "@/content/types";
import { categories } from "@/content/site";
import { EmptyState } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type Filter = CategoryId | "all";

export const chipClass = (active: boolean) =>
  cn(
    "h-9.5 rounded-full border px-4 text-sm transition-all",
    active ? "border-ink bg-ink text-white" : "text-fg-soft glass-flat hover:bg-white hover:text-fg",
  );

/**
 * Filterable, searchable video library. The topic lives in the URL (?cat=dev)
 * so filtered views can be shared. `cards` holds a pre-rendered card per video id,
 * so VideoCard stays a server component while filtering happens on the client.
 */
export function VideoLibrary({ videos, cards }: { videos: Video[]; cards: Record<string, ReactNode> }) {
  const params = useSearchParams();
  const router = useRouter();
  const initial = (params.get("cat") as Filter) ?? "all";
  const [cat, setCat] = useState<Filter>(categories.some((c) => c.id === initial) ? initial : "all");
  const [q, setQ] = useState("");

  const counts = useMemo(() => videos.reduce<Record<string, number>>((a, v) => ((a[v.cat] = (a[v.cat] ?? 0) + 1), a), {}), [videos]);
  const visible = videos.filter((v) => (cat === "all" || v.cat === cat) && (!q || v.title.toLowerCase().includes(q.toLowerCase())));

  const pick = (next: Filter) => {
    setCat(next);
    router.replace(next === "all" ? "/videos" : `/videos?cat=${next}`, { scroll: false });
  };

  return (
    <>
      <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {[{ id: "all" as const, label: "All" }, ...categories].map((c) => (
            <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => pick(c.id)} className={chipClass(cat === c.id)}>
              {c.label}
              <span className="ml-1.25 text-[11.5px] opacity-55">{c.id === "all" ? videos.length : (counts[c.id] ?? 0)}</span>
            </button>
          ))}
        </div>
        <label className="relative w-full md:w-72">
          <span className="sr-only">Search videos</span>
          <Search className="pointer-events-none absolute top-1/2 left-3.75 size-4.25 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search videos…"
            className="h-10.5 w-full rounded-full pr-4 pl-10.5 glass-flat outline-none focus:border-accent! focus:ring-4 focus:ring-accent/16"
          />
        </label>
      </div>
      <p className="-mt-4 mb-6 font-mono text-[13px] text-muted" aria-live="polite">
        {visible.length} video{visible.length === 1 ? "" : "s"}
      </p>

      {visible.length ? (
        <div className="grid gap-x-5.5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">{visible.map((v) => cards[v.id])}</div>
      ) : (
        <EmptyState title={`No videos match “${q}”`}>
          Try another word, or{" "}
          <Link href="/ask" className="text-accent">
            request this topic
          </Link>
          .
        </EmptyState>
      )}
    </>
  );
}
