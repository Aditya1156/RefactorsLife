import Image from "next/image";
import { Play } from "lucide-react";
import { getTeam } from "@/lib/content";
import type { Video } from "@/content/types";
import { categoryLabel } from "@/content/site";
import { formatViews, thumbnail } from "@/lib/utils";
import { VideoTrigger } from "./video-player";

const badge = "glass-dark absolute rounded-full px-2.25 py-0.75 text-xs font-medium text-white";

export async function VideoCard({ video, priority }: { video: Video; priority?: boolean }) {
  const editor = video.editor ? (await getTeam()).find((m) => m.id === video.editor) : undefined;
  return (
    <VideoTrigger id={video.id} title={video.title} className="group grid gap-3.5 text-left">
      <div className="relative aspect-video overflow-hidden rounded-[18px] bg-slate-200 shadow-glass transition-all duration-300 ease-soft group-hover:-translate-y-1 group-hover:shadow-glass-lg">
        <Image
          src={thumbnail(video.id)}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
        />
        <span className={`${badge} top-2.5 left-2.5`}>{categoryLabel(video.cat)}</span>
        {video.duration && <span className={`${badge} right-2.5 bottom-2.5 font-mono`}>{video.duration}</span>}
        <span className="absolute inset-0 grid place-items-center bg-slate-900/18 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="grid size-14.5 scale-90 place-items-center rounded-full border border-white/90 bg-white/75 text-accent backdrop-blur-md transition-transform duration-300 group-hover:scale-100">
            <Play className="ml-0.75 size-5.5 fill-current" />
          </span>
        </span>
      </div>
      <h3 className="line-clamp-2 text-[16.5px] leading-snug font-medium tracking-[-0.015em] transition-colors group-hover:text-accent">
        {video.title}
      </h3>
      <p className="-mt-1.5 flex gap-2 text-[13.5px] text-muted">
        <span>{formatViews(video.views)}</span>
        {editor && (
          <>
            <span>·</span>
            <span className="text-fg-soft">Edited by {editor.name}</span>
          </>
        )}
      </p>
    </VideoTrigger>
  );
}

export function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="grid gap-x-5.5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v, i) => (
        <VideoCard key={v.id} video={v} priority={i < 3} />
      ))}
    </div>
  );
}
