#!/usr/bin/env node
/**
 * Refresh src/content/videos.json (the "Videos" screen in Keystatic) from the YouTube channel page.
 * No API key needed.
 *
 *   npm run sync:videos
 *
 * - Adds new uploads (newest first) and updates views and durations.
 * - Keeps your manual fields (title edits, cat, editor, featured, popular).
 * - Guesses a category for new videos from the title. Check them after running.
 *
 * With YOUTUBE_API_KEY set, the site already fetches new uploads live, so this
 * script is only needed when you don't use an API key.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const CHANNEL = "https://www.youtube.com/@RefactorsLife";
const FILE = fileURLToPath(new URL("../src/content/videos.json", import.meta.url));
const LIMIT = 60;

// Keep in sync with guessCategory() in src/content/site.ts
const GUESS = [
  [/podcast|speaks|ft\.|with aditya|interview/i, "podcast"],
  [/lpa|placement|job|interview|resume|intern|salary|rejected/i, "career"],
  [/gemini|gen ?ai|vertex|chatgpt|\bai\b|gsp|lab|cloud/i, "genai"],
  [/git|vs ?code|c\+\+|setup|copilot|python|java|install|github/i, "dev"],
];
const guessCat = (t) => (GUESS.find(([re]) => re.test(t)) ?? [, "life"])[1];

function parseViews(s = "") {
  const m = s.replace(/,/g, "").match(/([\d.]+)\s*([KM]?)/i);
  if (!m) return 0;
  return Math.round(parseFloat(m[1]) * ({ K: 1e3, M: 1e6 }[m[2].toUpperCase()] ?? 1));
}

function* walk(o, key) {
  if (Array.isArray(o)) for (const v of o) yield* walk(v, key);
  else if (o && typeof o === "object") {
    if (key in o) yield o[key];
    for (const v of Object.values(o)) yield* walk(v, key);
  }
}

const res = await fetch(`${CHANNEL}/videos`, { headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "en-US" } });
if (!res.ok) throw new Error(`YouTube responded ${res.status}`);
const html = await res.text();
const json = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
if (!json) throw new Error("Couldn't find video data on the page. YouTube may have changed its layout.");

const fetched = [];
for (const l of walk(JSON.parse(json[1]), "lockupViewModel")) {
  const md = l.metadata?.lockupMetadataViewModel;
  if (!l.contentId || !md) continue;
  const views = (JSON.stringify(md.metadata ?? {}).match(/"content":"([^"]*?views?)"/) ?? [])[1];
  const duration = (JSON.stringify(l.contentImage ?? {}).match(/"text":"(\d+(?::\d+)+)"/) ?? [])[1];
  fetched.push({ id: l.contentId, title: md.title?.content ?? "", views: parseViews(views), duration });
}
if (!fetched.length) throw new Error("No videos found.");

const existing = JSON.parse(await readFile(FILE, "utf8")).videos;
const byId = new Map(existing.map((v) => [v.id, v]));
let added = 0;

const merged = fetched.slice(0, LIMIT).map((v) => {
  const old = byId.get(v.id);
  if (!old) added++;
  const out = {
    id: v.id,
    title: old?.title ?? v.title,
    cat: old?.cat ?? guessCat(v.title),
    views: v.views || old?.views || 0,
    duration: v.duration ?? old?.duration ?? "",
    featured: old?.featured ?? false,
    popular: old?.popular ?? false,
    editor: old?.editor ?? null,
  };
  return Object.fromEntries(Object.entries(out).filter(([, x]) => x !== undefined));
});
// Keep older videos that fell off the first page.
for (const v of existing) if (!merged.some((m) => m.id === v.id)) merged.push(v);

await writeFile(FILE, `${JSON.stringify({ videos: merged }, null, 2)}\n`);
console.log(`✓ ${merged.length} videos written (${added} new).`);
const subs = (html.match(/([\d.,]+[KM]?) subscribers/) ?? [])[1];
if (subs) console.log(`  Channel has ${subs} subscribers. Update stats in src/content/site.ts if needed.`);
if (added) console.log("  Check the `cat` of new videos in src/content/videos.json.");
