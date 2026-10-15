"use client";

import { useRouter } from "next/navigation";
import { CornerDownLeft, FileText, GraduationCap, Layout, Play, Search, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { usePlayVideo } from "@/components/video/video-player";
import { cn } from "@/lib/utils";

export type SearchItem = {
  group: "Pages" | "Learn" | "Videos" | "Blog" | "Resources";
  title: string;
  hint?: string;
  href?: string;
  videoId?: string;
};

const groupIcon = { Pages: Layout, Learn: GraduationCap, Videos: Play, Blog: FileText, Resources: Sparkles };

/** ⌘K / Ctrl+K quick search across pages, videos, posts and resources. */
export function CommandMenu({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const play = usePlayVideo();
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    const hits = items.filter((it) => words.every((w) => `${it.title} ${it.hint ?? ""} ${it.group}`.toLowerCase().includes(w)));
    return (q ? hits : hits.filter((it) => it.group !== "Videos").concat(hits.filter((it) => it.group === "Videos").slice(0, 5))).slice(0, 40);
  }, [items, q]);

  const show = useCallback(() => {
    setQ("");
    setActive(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        show();
      }
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener("rl:search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("rl:search", onOpen);
    };
  }, [show]);

  const choose = (it: SearchItem) => {
    setOpen(false);
    if (it.videoId) play(it.videoId, it.title);
    else if (it.href) router.push(it.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = (active + (e.key === "ArrowDown" ? 1 : -1) + results.length) % Math.max(results.length, 1);
      setActive(next);
      listRef.current?.querySelector(`[data-i="${next}"]`)?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      choose(results[active]);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} label="Search" className="mt-[12vh] mb-auto max-w-150">
      <div className="overflow-hidden rounded-3xl bg-white/90! glass" onKeyDown={onKeyDown}>
        <label className="flex items-center gap-3 border-b border-line px-5">
          <Search className="size-4.5 text-muted" />
          <span className="sr-only">Search</span>
          <input
            autoFocus
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            placeholder="Search videos, paths, guides, resources…"
            className="h-15 flex-1 bg-transparent text-base outline-none placeholder:text-slate-400"
          />
          <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted">esc</kbd>
        </label>
        <ul ref={listRef} className="max-h-[52vh] overflow-y-auto p-2" role="listbox">
          {results.length === 0 && <li className="px-4 py-10 text-center text-muted">Nothing found for “{q}”</li>}
          {results.map((it, i) => {
            const Icon = groupIcon[it.group];
            const heading = results[i - 1]?.group !== it.group ? it.group : null;
            return (
              <li key={`${it.group}-${it.title}`}>
                {heading && <p className="px-3 pt-3 pb-1.5 text-[11.5px] font-medium tracking-wide text-muted uppercase">{heading}</p>}
                <button
                  type="button"
                  data-i={i}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => choose(it)}
                  className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left", i === active && "bg-accent/8")}
                >
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-lg bg-white shadow-glass-sm",
                      i === active ? "text-accent" : "text-muted",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-medium">{it.title}</span>
                    {it.hint && <span className="block truncate text-[13px] text-muted">{it.hint}</span>}
                  </span>
                  {i === active && <CornerDownLeft className="size-4 text-accent" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Dialog>
  );
}

/** Button that opens the command menu (used in the header). */
export function SearchButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("rl:search"))}
      aria-label="Search (Ctrl+K)"
      className={cn(
        "flex h-10 items-center gap-2 rounded-full border border-line bg-white/60 px-3 text-sm text-muted transition-colors hover:bg-white hover:text-fg",
        className,
      )}
    >
      <Search className="size-4" />
      <span className="hidden xl:inline">Search</span>
      <kbd className="hidden rounded-md border border-line bg-white px-1.5 font-mono text-[11px] xl:inline">⌘K</kbd>
    </button>
  );
}
