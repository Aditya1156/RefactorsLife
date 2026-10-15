import { readFile } from "node:fs/promises";
import { join } from "node:path";
import GithubSlugger from "github-slugger";
import { createReader } from "@keystatic/core/reader";
import { cacheLife, cacheTag } from "next/cache";
import keystaticConfig from "../../keystatic.config";
import type { Answered, CategoryId, LearningPath, Post, Resource, Review, Role, TeamMember, Tone, Video, Win, WinType } from "@/content/types";
import type { IconName } from "@/components/ui/icon";

/*
 * Reads the content edited in Keystatic (/keystatic) from src/content.
 * Everything is cached under the "content" tag; saving in Keystatic clears
 * that tag (see app/api/keystatic), so edits appear on the next refresh.
 * Edited a file by hand or ran `npm run sync:videos`? Restart `npm run dev`.
 */

export const CONTENT_TAG = "content";

const reader = createReader(process.cwd(), keystaticConfig);
const life = () => {
  cacheLife("max");
  cacheTag(CONTENT_TAG);
};
const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;
const opt = (v: string | null | undefined) => v || undefined;

export async function getLocalVideos(): Promise<Video[]> {
  "use cache";
  life();
  const data = await reader.singletons.videos.read();
  return (data?.videos ?? []).map((v) => ({
    id: v.id,
    title: v.title,
    cat: v.cat as CategoryId,
    views: v.views ?? 0,
    duration: opt(v.duration),
    featured: v.featured,
    popular: v.popular,
    editor: v.editor,
  }));
}

export async function getTeam(): Promise<TeamMember[]> {
  "use cache";
  life();
  const all = await reader.collections.team.all();
  return all
    .map(({ slug, entry }) => ({
      id: slug,
      name: entry.name,
      role: entry.role,
      photo: opt(entry.photo),
      bio: opt(entry.bio),
      order: entry.order ?? 10,
      links: Object.fromEntries(
        (["linkedin", "github", "instagram", "website"] as const).filter((k) => entry[k]).map((k) => [k, entry[k] as string]),
      ),
    }))
    .sort(byOrder);
}

export async function getRoles(): Promise<Role[]> {
  "use cache";
  life();
  const all = await reader.collections.roles.all();
  return all
    .map(({ slug, entry }) => ({
      id: slug,
      title: entry.title,
      icon: entry.icon as IconName,
      tone: entry.tone as Tone,
      type: entry.type,
      summary: entry.summary,
      tasks: [...entry.tasks],
      need: [...entry.need],
      seat: opt(entry.seat),
      open: entry.open,
      order: entry.order ?? 10,
    }))
    .sort(byOrder);
}

export async function getResources(): Promise<Resource[]> {
  "use cache";
  life();
  const all = await reader.collections.resources.all();
  return all
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      text: entry.text,
      kind: entry.kind,
      icon: entry.icon as IconName,
      tone: entry.tone as Tone,
      video: opt(entry.video),
      soon: entry.soon,
      eyebrow: entry.eyebrow,
      intro: entry.intro,
      sections: entry.sections.map((s) => ({
        title: s.title,
        note: opt(s.note),
        list:
          s.list.discriminant === "commands"
            ? { discriminant: "commands" as const, value: s.list.value.map((c) => ({ ...c })) }
            : { discriminant: "checklist" as const, value: [...s.list.value] },
      })),
      footLeft: entry.footLeft,
      footRight: entry.footRight,
      order: entry.order ?? 10,
    }))
    .sort(byOrder);
}

export async function getWins(): Promise<Win[]> {
  "use cache";
  life();
  const all = await reader.collections.wins.all();
  return all
    .map(({ slug, entry }) => ({
      slug,
      name: entry.name,
      meta: opt(entry.meta),
      photo: opt(entry.photo),
      type: entry.type as WinType,
      title: entry.title,
      story: entry.story,
      video: opt(entry.video),
      link: opt(entry.link),
      order: entry.order ?? 10,
    }))
    .sort(byOrder);
}

export async function getReviews(): Promise<Review[]> {
  "use cache";
  life();
  const all = await reader.collections.reviews.all();
  return all.map(({ entry }) => ({ name: entry.name, meta: opt(entry.meta), rating: entry.rating ?? 5, text: entry.text }));
}

export async function getAnswered(): Promise<Answered[]> {
  "use cache";
  life();
  const data = await reader.singletons.answered.read();
  return (data?.items ?? []).map((a) => ({ ...a }));
}

export async function getPaths(): Promise<LearningPath[]> {
  "use cache";
  life();
  const all = await reader.collections.paths.all();
  return all
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      description: entry.description,
      level: entry.level,
      icon: entry.icon as IconName,
      tone: entry.tone as Tone,
      outcomes: [...entry.outcomes],
      steps: entry.steps.map((s) => ({ ...s })),
      resource: entry.resource ?? undefined,
      order: entry.order ?? 10,
    }))
    .sort(byOrder);
}

export async function getPosts(): Promise<Post[]> {
  "use cache";
  life();
  const all = await reader.collections.posts.all();
  return all
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      excerpt: entry.excerpt,
      date: entry.date ?? "",
      read: entry.read,
      tag: entry.tag,
      video: entry.video,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** "## " headings of a blog post, with the same ids rehype-slug gives them (for the table of contents). */
export async function getPostHeadings(slug: string): Promise<{ id: string; text: string }[]> {
  "use cache";
  life();
  const source = await readFile(join(process.cwd(), "src/content/blog", `${slug}.mdx`), "utf8").catch(() => "");
  const slugger = new GithubSlugger();
  let inCode = false;
  const headings: { id: string; text: string }[] = [];
  for (const line of source.split("\n")) {
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    // rehype-slug numbers every heading level, so h3s must advance the slugger too.
    const m = line.match(/^(#{2,3})\s+(.+)$/);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "").trim();
    const id = slugger.slug(text);
    if (m[1] === "##") headings.push({ id, text });
  }
  return headings;
}
