import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/** 12000 → "12K", 1700 → "1.7K" */
export function formatCount(n: number) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export const formatViews = (n: number) => `${formatCount(n)} views`;

export const thumbnail = (id: string, quality: "hqdefault" | "maxresdefault" | "mqdefault" = "hqdefault") =>
  `https://i.ytimg.com/vi/${id}/${quality}.jpg`;

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** "1:02:03" or "9:47" → seconds */
export function durationSeconds(d?: string) {
  if (!d) return 0;
  return d.split(":").reduce((total, part) => total * 60 + Number(part), 0);
}

/** 4500 → "1h 15m", 1500 → "25 min" */
export function formatTotal(seconds: number) {
  const m = Math.round(seconds / 60);
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}
