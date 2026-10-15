import type { CategoryId, Perk, WinType } from "./types";

/* Site-wide settings that rarely change. Everyday content (videos, posts, team,
   resources, wins…) is edited in Keystatic at /keystatic and lives in this folder. */

export const site = {
  name: "RefactorsLife",
  url: "https://refactorslife.in",
  tagline: "Where Engineering Meets Life",
  description:
    "RefactorsLife by Aditya Kumar: podcasts, hands-on tutorials and honest career talk for engineering students. Free resources, a Hall of Fame, internships and more.",
  email: "hello@refactorslife.in",
  host: { name: "Aditya Kumar", photo: "/images/aditya.jpg" },

  channel: {
    id: "UCa3HtjxdgTmO2qruD4sEHdg",
    handle: "@RefactorsLife",
    url: "https://www.youtube.com/@RefactorsLife",
    subscribe: "https://www.youtube.com/@RefactorsLife?sub_confirmation=1",
  },

  socials: {
    youtube: "https://www.youtube.com/@RefactorsLife",
    instagram: "https://www.instagram.com/refactorslife",
    linkedin: "https://www.linkedin.com/in/aditya-kumar-165911339",
    github: "https://github.com/Aditya1156",
    telegram: "https://t.me/refactorslife",
    telegramGroup: "https://t.me/+H_pfNXCbt6w0Zjdl",
  },

  /* Fallback numbers. With YOUTUBE_API_KEY set, subscribers/videos come live from YouTube. */
  stats: {
    subscribers: 602,
    videos: 148,
    topGuideViews: "12K",
  },

  nav: [
    { href: "/videos", label: "Videos" },
    { href: "/learn", label: "Learn" },
    { href: "/resources", label: "Resources" },
    { href: "/blog", label: "Blog" },
    { href: "/hall-of-fame", label: "Hall of Fame" },
    { href: "/ask", label: "Ask Aditya" },
    { href: "/careers", label: "Careers" },
  ],
} as const;

export const topics = [
  "Git & GitHub",
  "VS Code",
  "C / C++",
  "DSA",
  "Smart India Hackathon",
  "Placements",
  "Internships",
  "GenAI & Gemini",
  "Google Cloud",
  "Copilot",
  "Resume",
  "College life",
  "Content creation",
  "Open source",
];

export const categories: { id: CategoryId; label: string }[] = [
  { id: "podcast", label: "Podcast" },
  { id: "dev", label: "Dev Setup" },
  { id: "career", label: "Career" },
  { id: "genai", label: "GenAI & Cloud" },
  { id: "life", label: "Engineering Life" },
];

export const categoryLabel = (id: CategoryId) => categories.find((c) => c.id === id)?.label ?? "";

const GUESS: [RegExp, CategoryId][] = [
  [/podcast|speaks|ft\.|with aditya|interview/i, "podcast"],
  [/lpa|placement|job|interview|resume|intern|salary|rejected/i, "career"],
  [/gemini|gen ?ai|vertex|chatgpt|\bai\b|gsp|lab|cloud/i, "genai"],
  [/git|vs ?code|c\+\+|setup|copilot|python|java|install|github/i, "dev"],
];

/** Best-guess category for a new upload, from its title. */
export const guessCategory = (title: string): CategoryId => GUESS.find(([re]) => re.test(title))?.[1] ?? "life";

export const winTypes: { id: WinType; label: string }[] = [
  { id: "internship", label: "Internship" },
  { id: "placement", label: "Placement" },
  { id: "hackathon", label: "Hackathon" },
  { id: "opensource", label: "Open source" },
  { id: "other", label: "Other" },
];

export const perks: Perk[] = [
  { icon: "film", title: "Credit on every video", text: "Your name in the description and on this site's team page." },
  { icon: "trophy", title: "Certificate & LOR", text: "On successful completion, with a letter that says what you actually did." },
  { icon: "briefcase", title: "A real portfolio", text: "Public, published work you can show recruiters, not practice files." },
  { icon: "users", title: "Mentorship", text: "Direct feedback from Aditya on content, career and placements." },
];
