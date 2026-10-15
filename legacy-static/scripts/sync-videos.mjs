#!/usr/bin/env node
/**
 * Refresh the video list in assets/js/data.js from the YouTube channel.
 *
 *   node scripts/sync-videos.mjs
 *
 * - Adds new uploads (newest first) and updates titles, views and durations.
 * - Keeps your manual fields (cat, editor, featured, popular) for existing videos.
 * - Guesses a category for new videos from the title — check them after running.
 * Requires Node 18+. No API key needed.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const CHANNEL = "https://www.youtube.com/@RefactorsLife";
const DATA_FILE = fileURLToPath(new URL("../assets/js/data.js", import.meta.url));
const LIMIT = 60;

const GUESS = [
  [/podcast|speaks|ft\.|with aditya|interview/i, "podcast"],
  [/lpa|placement|job|interview|resume|intern|salary|rejected/i, "career"],
  [/gemini|gen ?ai|vertex|chatgpt|\bai\b|gsp|lab|cloud/i, "genai"],
  [/git|vs ?code|c\+\+|setup|copilot|python|java|install|github/i, "dev"],
];
const guessCat = (t) => (GUESS.find(([re]) => re.test(t)) || [, "life"])[1];

function parseViews(s = "") {
  const m = s.replace(/,/g, "").match(/([\d.]+)\s*([KM]?)/i);
  if (!m) return 0;
  return Math.round(parseFloat(m[1]) * ({ K: 1e3, M: 1e6 }[m[2].toUpperCase()] || 1));
}

function* walk(o, key) {
  if (Array.isArray(o)) for (const v of o) yield* walk(v, key);
  else if (o && typeof o === "object") {
    if (key in o) yield o[key];
    for (const v of Object.values(o)) yield* walk(v, key);
  }
}

async function fetchChannel() {
  const res = await fetch(`${CHANNEL}/videos`, { headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "en-US" } });
  if (!res.ok) throw new Error(`YouTube responded ${res.status}`);
  const html = await res.text();
  const json = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
  if (!json) throw new Error("Couldn't find video data on the page — YouTube may have changed its layout.");
  const data = JSON.parse(json[1]);

  const videos = [];
  for (const l of walk(data, "lockupViewModel")) {
    const md = l.metadata?.lockupMetadataViewModel;
    if (!l.contentId || !md) continue;
    const meta = JSON.stringify(md.metadata || {});
    const views = (meta.match(/"content":"([^"]*?views?)"/) || [])[1];
    const duration = (JSON.stringify(l.contentImage || {}).match(/"text":"(\d+(?::\d+)+)"/) || [])[1];
    videos.push({ id: l.contentId, title: md.title?.content || "", views: parseViews(views), duration });
  }
  const subs = (html.match(/([\d.,]+[KM]?) subscribers/) || [])[1];
  return { videos: videos.slice(0, LIMIT), subs };
}

const fmt = (v) => {
  const parts = [`id: ${JSON.stringify(v.id)}`, `title: ${JSON.stringify(v.title)}`, `cat: ${JSON.stringify(v.cat)}`, `views: ${v.views}`];
  if (v.duration) parts.push(`duration: ${JSON.stringify(v.duration)}`);
  if (v.featured) parts.push("featured: true");
  if (v.popular) parts.push("popular: true");
  parts.push(`editor: ${v.editor ? JSON.stringify(v.editor) : "null"}`);
  return `    { ${parts.join(", ")} },`;
};

const src = await readFile(DATA_FILE, "utf8");
const sandbox = { window: {} };
vm.runInNewContext(src, sandbox);
const existing = new Map(sandbox.window.RL_DATA.videos.map((v) => [v.id, v]));

const { videos, subs } = await fetchChannel();
if (!videos.length) throw new Error("No videos found.");

let added = 0;
const merged = videos.map((v) => {
  const old = existing.get(v.id);
  if (!old) added++;
  return {
    ...old,
    id: v.id,
    // Keep hand-edited titles; only fill in new ones.
    title: old?.title || v.title,
    views: v.views || old?.views || 0,
    duration: v.duration || old?.duration,
    cat: old?.cat || guessCat(v.title),
    editor: old?.editor ?? null,
  };
});
// Keep older videos that fell off the first page.
for (const [id, v] of existing) if (!merged.some((m) => m.id === id)) merged.push(v);

const start = src.indexOf("// <videos>");
const end = src.indexOf("    // </videos>");
if (start < 0 || end < 0) throw new Error("Markers // <videos> and // </videos> not found in data.js");
const out = src.slice(0, start) + "// <videos>\n" + merged.map(fmt).join("\n") + "\n" + src.slice(end);
await writeFile(DATA_FILE, out);

console.log(`✓ ${merged.length} videos written (${added} new).`);
if (subs) console.log(`  Channel has ${subs} subscribers — update stats in assets/js/config.js if needed.`);
if (added) console.log("  Check the `cat` of new videos in assets/js/data.js.");
