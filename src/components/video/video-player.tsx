"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Dialog, DialogClose } from "@/components/ui/dialog";

type Current = { id: string; title: string; path: string } | null;
const VideoContext = createContext<(id: string, title: string) => void>(() => {});

/** Mounted once in the root layout: any <VideoTrigger> opens this player. */
export function VideoPlayerProvider({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState<Current>(null);
  const close = useCallback(() => setOpened(null), []);
  const pathname = usePathname();
  // The player belongs to the page it was opened on, so navigating away stops playback.
  const current = opened?.path === pathname ? opened : null;

  return (
    <VideoContext value={(id, title) => setOpened({ id, title, path: pathname })}>
      {children}
      <Dialog open={!!current} onClose={close} label="Video player" tone="dark" className="max-w-260">
        {current && (
          <div className="grid gap-3.5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-[17px] font-medium tracking-[-0.01em] text-white">{current.title}</h3>
              <DialogClose onClose={close} dark />
            </div>
            <div className="aspect-video overflow-hidden rounded-[22px] border-6 border-white/85 bg-black shadow-[0_40px_80px_-20px_rgb(15_23_42/0.6)]">
              <iframe
                className="size-full rounded-2xl"
                src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0`}
                title={current.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </Dialog>
    </VideoContext>
  );
}

export const usePlayVideo = () => useContext(VideoContext);

/** Any clickable thing that plays a video in the modal. Server components can pass children. */
export function VideoTrigger({
  id,
  title,
  className,
  children,
  ariaLabel,
}: {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const play = usePlayVideo();
  return (
    <button type="button" className={className} onClick={() => play(id, title)} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
