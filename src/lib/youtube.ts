import { cacheLife, cacheTag } from "next/cache";
import { guessCategory, site } from "@/content/site";
import type { Video } from "@/content/types";
import { CONTENT_TAG, getLocalVideos } from "./content";

/*
 * YouTube data. With YOUTUBE_API_KEY set, the site pulls the latest uploads,
 * views and channel stats from the YouTube Data API (cached for an hour) and
 * merges in your manual fields from src/content/videos.json (edited in Keystatic).
 * Without a key, everything comes from videos.json.
 */

const API = "https://www.googleapis.com/youtube/v3";

type ApiVideo = {
  id: string;
  snippet: { title: string };
  contentDetails: { duration: string };
  statistics: { viewCount?: string };
};

/** ISO 8601 "PT1H2M3S" → "1:02:03", "PT9M47S" → "9:47" */
function formatDuration(iso: string) {
  const [, h = "0", m = "0", s = "0"] = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/) ?? [];
  const pad = (x: string) => x.padStart(2, "0");
  return Number(h) > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${Number(m)}:${pad(s)}`;
}

const seconds = (iso: string) => {
  const [, h = "0", m = "0", s = "0"] = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/) ?? [];
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
};

async function api<T>(path: string, params: Record<string, string>): Promise<T> {
  const qs = new URLSearchParams({ ...params, key: process.env.YOUTUBE_API_KEY! });
  const res = await fetch(`${API}/${path}?${qs}`);
  if (!res.ok) throw new Error(`YouTube API ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getVideos(): Promise<Video[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CONTENT_TAG);

  const localVideos = await getLocalVideos();
  if (!process.env.YOUTUBE_API_KEY) return localVideos;

  try {
    // The uploads playlist id is the channel id with "UC" swapped for "UU".
    const uploads = `UU${site.channel.id.slice(2)}`;
    const list = await api<{ items: { contentDetails: { videoId: string } }[] }>("playlistItems", {
      part: "contentDetails",
      playlistId: uploads,
      maxResults: "50",
    });
    const ids = list.items.map((i) => i.contentDetails.videoId).join(",");
    const details = await api<{ items: ApiVideo[] }>("videos", { part: "snippet,contentDetails,statistics", id: ids });

    const overrides = new Map(localVideos.map((v) => [v.id, v]));
    const live: Video[] = details.items
      // Skip Shorts: they live on the Shorts tab, not in the library.
      .filter((v) => seconds(v.contentDetails.duration) > 60 && !/#shorts/i.test(v.snippet.title))
      .map((v) => {
        const local = overrides.get(v.id);
        return {
          ...local,
          id: v.id,
          title: local?.title ?? v.snippet.title,
          cat: local?.cat ?? guessCategory(v.snippet.title),
          views: Number(v.statistics.viewCount ?? local?.views ?? 0),
          duration: formatDuration(v.contentDetails.duration),
          editor: local?.editor ?? null,
        };
      });

    // Keep older local videos that fall outside the latest 50.
    const liveIds = new Set(live.map((v) => v.id));
    return [...live, ...localVideos.filter((v) => !liveIds.has(v.id))];
  } catch (err) {
    console.error("[youtube] falling back to local videos:", err);
    return localVideos;
  }
}

export type ChannelStats = { subscribers: number; videos: number; live: boolean };

export async function getChannelStats(): Promise<ChannelStats> {
  "use cache";
  cacheLife("hours");

  const fallback = { subscribers: site.stats.subscribers, videos: site.stats.videos, live: false };
  if (!process.env.YOUTUBE_API_KEY) return fallback;

  try {
    const data = await api<{ items: { statistics: { subscriberCount: string; videoCount: string } }[] }>("channels", {
      part: "statistics",
      id: site.channel.id,
    });
    const s = data.items[0]?.statistics;
    if (!s) return fallback;
    return { subscribers: Number(s.subscriberCount), videos: Number(s.videoCount), live: true };
  } catch (err) {
    console.error("[youtube] falling back to static stats:", err);
    return fallback;
  }
}
