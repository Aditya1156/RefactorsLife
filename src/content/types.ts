import type { IconName } from "@/components/ui/icon";

export type CategoryId = "podcast" | "dev" | "career" | "genai" | "life";

export type Video = {
  id: string;
  title: string;
  cat: CategoryId;
  views: number;
  duration?: string;
  featured?: boolean;
  popular?: boolean;
  /** slug of a team member who edited the video */
  editor?: string | null;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  order: number;
  links: Partial<Record<"linkedin" | "github" | "instagram" | "website", string>>;
};

export type Tone = "blue" | "sky" | "indigo" | "cyan";

export type Role = {
  id: string;
  title: string;
  icon: IconName;
  tone: Tone;
  type: string;
  summary: string;
  tasks: string[];
  need: string[];
  /** Label for an "open seat" card on the team page, if set */
  seat?: string;
  open: boolean;
};

export type Perk = { icon: IconName; title: string; text: string };

export type DocSection = {
  title: string;
  note?: string;
  list: { discriminant: "commands"; value: { command: string; meaning: string }[] } | { discriminant: "checklist"; value: string[] };
};

export type Resource = {
  slug: string;
  title: string;
  text: string;
  kind: string;
  icon: IconName;
  tone: Tone;
  video?: string;
  /** Not ready yet: shows "Coming soon · Notify me" and collects a waitlist */
  soon: boolean;
  eyebrow: string;
  intro: string;
  sections: DocSection[];
  footLeft: string;
  footRight: string;
};

export type WinType = "internship" | "placement" | "hackathon" | "opensource" | "other";

export type Win = {
  slug: string;
  name: string;
  meta?: string;
  photo?: string;
  type: WinType;
  title: string;
  story: string;
  video?: string;
  link?: string;
};

export type Review = { name: string; meta?: string; rating: number; text: string };

export type Answered = { q: string; a: string; video: string; tag: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  tag: string;
  video: string;
};

export type LearningPath = {
  slug: string;
  title: string;
  description: string;
  level: string;
  icon: IconName;
  tone: Tone;
  outcomes: string[];
  steps: { video: string; note: string }[];
  resource?: string;
};
