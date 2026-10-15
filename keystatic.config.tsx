import { collection, config, fields, singleton } from "@keystatic/core";
import { block, mark, wrapper } from "@keystatic/core/content-components";
import { Clapperboard, Info, PlaySquare } from "lucide-react";

/*
 * Keystatic: the content editor at /keystatic.
 * Locally it saves straight to these files. In production, set the
 * KEYSTATIC_GITHUB_* env vars (see README) and edits become GitHub commits.
 */

const iconOptions = [
  { label: "Code", value: "code" },
  { label: "Trophy", value: "trophy" },
  { label: "Lightning", value: "zap" },
  { label: "Briefcase", value: "briefcase" },
  { label: "Trending up", value: "trending" },
  { label: "Mail", value: "mail" },
  { label: "Scissors", value: "scissors" },
  { label: "Image", value: "image" },
  { label: "Pen", value: "pen" },
  { label: "Smartphone", value: "smartphone" },
  { label: "Megaphone", value: "megaphone" },
  { label: "Microphone", value: "mic" },
  { label: "Film", value: "film" },
  { label: "Users", value: "users" },
  { label: "Building", value: "building" },
  { label: "Message", value: "message" },
] as const;

const toneOptions = [
  { label: "Blue", value: "blue" },
  { label: "Sky", value: "sky" },
  { label: "Indigo", value: "indigo" },
  { label: "Cyan", value: "cyan" },
] as const;

const icon = () => fields.select({ label: "Icon", options: iconOptions, defaultValue: "code" });
const tone = () => fields.select({ label: "Colour", options: toneOptions, defaultValue: "blue" });
const order = () => fields.integer({ label: "Order", description: "Lower numbers show first.", defaultValue: 10 });
const videoId = (label = "YouTube video ID") =>
  fields.text({ label, description: "The part after watch?v= in the URL, e.g. 9nb-YxETdqo", validation: { length: { min: 11, max: 11 } } });

const githubRepo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as `${string}/${string}` | undefined;

export default config({
  storage: githubRepo ? { kind: "github", repo: githubRepo } : { kind: "local" },
  ui: {
    brand: { name: "RefactorsLife" },
    navigation: {
      Channel: ["videos", "paths"],
      Writing: ["posts", "resources", "answered"],
      Community: ["wins", "reviews"],
      Team: ["team", "roles"],
    },
  },

  singletons: {
    videos: singleton({
      label: "Videos",
      path: "src/content/videos",
      format: { data: "json" },
      schema: {
        videos: fields.array(
          fields.object({
            id: videoId(),
            title: fields.text({ label: "Title" }),
            cat: fields.select({
              label: "Category",
              options: [
                { label: "Podcast", value: "podcast" },
                { label: "Dev Setup", value: "dev" },
                { label: "Career", value: "career" },
                { label: "GenAI & Cloud", value: "genai" },
                { label: "Engineering Life", value: "life" },
              ],
              defaultValue: "dev",
            }),
            views: fields.integer({ label: "Views", defaultValue: 0 }),
            duration: fields.text({ label: "Duration", description: "e.g. 9:47" }),
            featured: fields.checkbox({ label: "Featured podcast episode (home page)" }),
            popular: fields.checkbox({ label: "Popular" }),
            editor: fields.relationship({ label: "Edited by", collection: "team" }),
          }),
          {
            label: "Videos (newest first)",
            itemLabel: (p) => p.fields.title.value || p.fields.id.value,
          },
        ),
      },
    }),

    answered: singleton({
      label: "Already-answered questions",
      path: "src/content/answered",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            q: fields.text({ label: "Question" }),
            a: fields.text({ label: "Short answer", multiline: true }),
            video: videoId("Video that answers it"),
            tag: fields.text({ label: "Tag", defaultValue: "Dev Setup" }),
          }),
          { label: "Questions", itemLabel: (p) => p.fields.q.value },
        ),
      },
    }),
  },

  collections: {
    posts: collection({
      label: "Blog posts",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "date"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        excerpt: fields.text({ label: "Excerpt", multiline: true }),
        date: fields.date({ label: "Published", validation: { isRequired: true } }),
        read: fields.text({ label: "Reading time", defaultValue: "5 min read" }),
        tag: fields.text({ label: "Tag", defaultValue: "Dev Setup" }),
        video: videoId("Companion video ID (used for the cover)"),
        content: fields.mdx({
          label: "Content",
          components: {
            YouTube: block({
              label: "YouTube video",
              icon: <PlaySquare />,
              schema: { id: videoId(), title: fields.text({ label: "Title" }) },
            }),
            Callout: wrapper({ label: "Callout", icon: <Info />, schema: {} }),
            VideoLink: mark({
              label: "Video link (opens the site player)",
              icon: <Clapperboard />,
              schema: { id: videoId(), title: fields.text({ label: "Video title" }) },
              className: "text-blue-600 underline",
            }),
          },
        }),
      },
    }),

    paths: collection({
      label: "Learning paths",
      slugField: "title",
      path: "src/content/paths/*",
      format: { data: "json" },
      columns: ["title", "order"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        level: fields.select({
          label: "Level",
          options: [
            { label: "Beginner", value: "Beginner" },
            { label: "Intermediate", value: "Intermediate" },
            { label: "All levels", value: "All levels" },
          ],
          defaultValue: "Beginner",
        }),
        icon: icon(),
        tone: tone(),
        order: order(),
        outcomes: fields.array(fields.text({ label: "Outcome" }), { label: "By the end you can…", itemLabel: (p) => p.value }),
        steps: fields.array(
          fields.object({
            video: videoId(),
            note: fields.text({ label: "Why this step", multiline: true }),
          }),
          { label: "Steps (in order)", itemLabel: (p) => p.fields.video.value },
        ),
        resource: fields.relationship({ label: "Companion resource", collection: "resources" }),
      },
    }),

    resources: collection({
      label: "Free resources",
      slugField: "title",
      path: "src/content/resources/*",
      format: { data: "json" },
      columns: ["title", "order"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        text: fields.text({ label: "Card description", multiline: true }),
        kind: fields.text({ label: "Type label", description: "e.g. Cheat sheet · 1 page" }),
        icon: icon(),
        tone: tone(),
        order: order(),
        video: fields.text({ label: "Companion video ID (optional)" }),
        soon: fields.checkbox({ label: "Coming soon (collects a waitlist instead)" }),
        eyebrow: fields.text({ label: "Printable page: label", defaultValue: "Checklist" }),
        intro: fields.text({ label: "Printable page: intro", multiline: true }),
        sections: fields.array(
          fields.object({
            title: fields.text({ label: "Section title" }),
            note: fields.text({ label: "Side note (optional)", description: "e.g. // once per laptop" }),
            list: fields.conditional(
              fields.select({
                label: "Section type",
                options: [
                  { label: "Checklist", value: "checklist" },
                  { label: "Commands", value: "commands" },
                ],
                defaultValue: "checklist",
              }),
              {
                checklist: fields.array(fields.text({ label: "Item", description: "Wrap words in **double asterisks** for bold." }), {
                  label: "Items",
                  itemLabel: (p) => p.value,
                }),
                commands: fields.array(
                  fields.object({ command: fields.text({ label: "Command" }), meaning: fields.text({ label: "What it does" }) }),
                  { label: "Commands", itemLabel: (p) => p.fields.command.value },
                ),
              },
            ),
          }),
          { label: "Printable page: sections", itemLabel: (p) => p.fields.title.value },
        ),
        footLeft: fields.text({ label: "Footer (left)" }),
        footRight: fields.text({ label: "Footer (right)", defaultValue: "youtube.com/@RefactorsLife" }),
      },
    }),

    wins: collection({
      label: "Hall of Fame",
      slugField: "title",
      path: "src/content/wins/*",
      format: { data: "json" },
      columns: ["title", "name"],
      schema: {
        title: fields.slug({ name: { label: "The win, in one line" } }),
        name: fields.text({ label: "Student name" }),
        meta: fields.text({ label: "College & year" }),
        photo: fields.image({ label: "Photo", directory: "public/images/wins", publicPath: "/images/wins" }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Internship", value: "internship" },
            { label: "Placement", value: "placement" },
            { label: "Hackathon", value: "hackathon" },
            { label: "Open source", value: "opensource" },
            { label: "Other", value: "other" },
          ],
          defaultValue: "internship",
        }),
        story: fields.text({ label: "Story", multiline: true }),
        video: fields.text({ label: "Video that helped (ID, optional)" }),
        link: fields.url({ label: "Proof / profile link" }),
        order: order(),
      },
    }),

    reviews: collection({
      label: "Reviews",
      slugField: "name",
      path: "src/content/reviews/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        meta: fields.text({ label: "College / role" }),
        rating: fields.integer({ label: "Rating (1–5)", defaultValue: 5, validation: { min: 1, max: 5 } }),
        text: fields.text({ label: "Review", multiline: true }),
      },
    }),

    team: collection({
      label: "Team",
      slugField: "name",
      path: "src/content/team/*",
      format: { data: "json" },
      columns: ["name", "role"],
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        role: fields.text({ label: "Role" }),
        photo: fields.image({ label: "Photo", directory: "public/images/team", publicPath: "/images/team" }),
        bio: fields.text({ label: "Short bio", multiline: true }),
        order: order(),
        linkedin: fields.url({ label: "LinkedIn" }),
        github: fields.url({ label: "GitHub" }),
        instagram: fields.url({ label: "Instagram" }),
        website: fields.url({ label: "Portfolio / website" }),
      },
    }),

    roles: collection({
      label: "Internship roles",
      slugField: "title",
      path: "src/content/roles/*",
      format: { data: "json" },
      columns: ["title", "order"],
      schema: {
        title: fields.slug({ name: { label: "Role title" } }),
        type: fields.text({ label: "Type", description: "e.g. Remote · 8–10 hrs/week · 2–3 months" }),
        icon: icon(),
        tone: tone(),
        order: order(),
        summary: fields.text({ label: "Summary", multiline: true }),
        tasks: fields.array(fields.text({ label: "Task" }), { label: "What you'll do", itemLabel: (p) => p.value }),
        need: fields.array(fields.text({ label: "Requirement" }), { label: "What you need", itemLabel: (p) => p.value }),
        seat: fields.text({
          label: "Open-seat card label (optional)",
          description: "Shows an 'open seat' card on the team page, e.g. Video Editor. Clear it once filled.",
        }),
        open: fields.checkbox({ label: "Accepting applications", defaultValue: true }),
      },
    }),
  },
});
