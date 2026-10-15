import Image from "next/image";
import { Play } from "lucide-react";
import type { Video } from "@/content/types";
import { ButtonLink } from "@/components/ui/button";
import { thumbnail } from "@/lib/utils";
import { VideoTrigger } from "./video-player";

/** The featured podcast episode: big thumbnail + episode details. */
export function FeaturedEpisode({ video }: { video: Video }) {
  return (
    <div className="grid gap-2.5 overflow-hidden rounded-[28px] p-2 glass md:p-2.5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <VideoTrigger
        id={video.id}
        title={video.title}
        ariaLabel={`Play: ${video.title}`}
        className="group relative aspect-video overflow-hidden rounded-[20px] bg-ink lg:aspect-auto lg:min-h-90"
      >
        <Image
          src={thumbnail(video.id, "maxresdefault")}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 680px"
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-19 place-items-center rounded-full border border-white/90 bg-white/72 text-accent shadow-[0_20px_40px_-10px_rgb(15_23_42/0.45)] backdrop-blur-md transition-transform duration-300 group-hover:scale-108">
            <Play className="ml-1 size-6.5 fill-current" />
          </span>
        </span>
      </VideoTrigger>

      <div className="flex flex-col justify-center gap-4.5 px-4 py-5.5 md:px-7 md:py-8">
        <span className="inline-flex items-center gap-2 text-[13px] font-medium text-fg-soft">
          <span className="size-1.75 rounded-full bg-sky ring-3 ring-sky/15" />
          Refactoring Life with Aditya · Podcast
        </span>
        <h3 className="text-[clamp(22px,2.2vw,28px)] leading-tight tracking-[-0.03em]">{video.title}</h3>
        <p className="text-muted">
          Long-form, honest conversations with students and engineers who&apos;ve been there: hackathons, placements, burnout, side projects and
          everything between.
        </p>
        <div className="flex h-7 items-center gap-0.75" aria-hidden>
          {Array.from({ length: 28 }, (_, i) => (
            <i
              key={i}
              className="w-0.75 animate-wave rounded-full bg-linear-to-b from-sky to-accent opacity-85"
              style={{ animationDelay: `${(i % 7) * -0.18}s` }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex flex-wrap gap-2.5">
          <VideoTrigger
            id={video.id}
            title={video.title}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-linear-to-b from-blue-500 to-accent px-5 text-[15px] font-medium text-white shadow-btn transition-all hover:-translate-y-px hover:shadow-btn-lg"
          >
            <Play className="size-4 fill-current" />
            Play episode{video.duration ? ` · ${video.duration}` : ""}
          </VideoTrigger>
          <ButtonLink href="/collab#guest" variant="ghost">
            Be a guest
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
