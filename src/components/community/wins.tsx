"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Trophy } from "lucide-react";
import { useState } from "react";
import { winTypes } from "@/content/site";
import type { Win, WinType } from "@/content/types";
import { LinkedInIcon } from "@/components/ui/brand-icons";
import { Tag } from "@/components/ui/primitives";
import { usePlayVideo } from "@/components/video/video-player";
import { initials } from "@/lib/utils";
import { chipClass } from "@/components/video/video-library";

export function TrophyBadge({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <span
      className={
        size === "lg"
          ? "grid size-18 place-items-center rounded-[22px] bg-linear-140 from-amber-100 to-amber-300 text-amber-700 shadow-[0_16px_36px_-12px_rgb(217_119_6/0.55),inset_0_1px_0_#fff]"
          : "grid size-10 place-items-center rounded-full bg-linear-140 from-amber-100 to-amber-200 text-amber-700 shadow-[0_6px_16px_-6px_rgb(217_119_6/0.5),inset_0_1px_0_#fff]"
      }
    >
      <Trophy className={size === "lg" ? "size-8.5" : "size-4.75"} />
    </span>
  );
}

export function WinCard({ win }: { win: Win }) {
  const play = usePlayVideo();
  const label = winTypes.find((t) => t.id === win.type)?.label ?? "Win";
  return (
    <article className="spotlight relative flex flex-col gap-3 rounded-[20px] p-7 glass">
      <div className="mb-1.5 flex items-center justify-between">
        <Tag>{label}</Tag>
        <TrophyBadge />
      </div>
      <h3 className="text-[21px] leading-tight">{win.title}</h3>
      <p className="text-[15.5px] text-muted">{win.story}</p>
      {win.video && (
        <button
          type="button"
          onClick={() => play(win.video!, win.title)}
          className="inline-flex w-fit items-center gap-1.5 text-[15px] font-medium text-accent hover:text-accent-strong"
        >
          <Play className="size-3.5 fill-current" /> The video behind it
        </button>
      )}
      <div className="mt-auto flex items-center gap-3 border-t border-line pt-4.5 text-sm">
        {win.photo ? (
          <Image
            src={win.photo}
            alt=""
            width={42}
            height={42}
            className="size-10.5 rounded-full border-2 border-white object-cover shadow-glass-sm"
          />
        ) : (
          <span className="grid size-10.5 place-items-center rounded-full border-2 border-white bg-accent/8 font-semibold text-accent shadow-glass-sm">
            {initials(win.name)}
          </span>
        )}
        <div>
          <b className="block text-[15px]">{win.name}</b>
          {win.meta && <small className="text-[13px] text-muted">{win.meta}</small>}
        </div>
        {win.link && (
          <a
            href={win.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${win.name}'s profile`}
            className="ml-auto grid size-8.5 place-items-center rounded-[10px] bg-white text-[#0a66c2] shadow-glass-sm"
          >
            <LinkedInIcon className="size-3.75" />
          </a>
        )}
      </div>
    </article>
  );
}

/** Hall of Fame grid with type filters and an inviting "your win here" card. */
export function WinsBoard({ wins }: { wins: Win[] }) {
  const [type, setType] = useState<WinType | "all">("all");
  const visible = wins.filter((w) => type === "all" || w.type === type);
  return (
    <>
      <div className="mb-9 flex flex-wrap gap-2" role="group" aria-label="Filter wins">
        {[{ id: "all" as const, label: "All wins" }, ...winTypes].map((t) => (
          <button key={t.id} type="button" aria-pressed={type === t.id} onClick={() => setType(t.id)} className={chipClass(type === t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((w) => (
          <WinCard key={w.slug} win={w} />
        ))}
        <Link
          href="#share"
          className="grid content-center justify-items-center gap-2 rounded-[20px] border-dashed border-accent/25! px-6 py-12 text-center text-muted glass transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg"
        >
          <Trophy className="mb-1.5 size-7 text-accent" />
          <b className="text-[17px] text-fg">
            {visible.length ? "Your win could be here" : `No ${winTypes.find((t) => t.id === type)?.label.toLowerCase()} wins yet`}
          </b>
          <span>Internship, placement, hackathon or first PR. Share it and get featured.</span>
        </Link>
      </div>
    </>
  );
}
