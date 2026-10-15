import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code, Mic, TrendingUp } from "lucide-react";
import { site, topics } from "@/content/site";
import { getChannelStats } from "@/lib/youtube";
import { formatCount } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/button";
import { GitHubIcon, InstagramIcon, LinkedInIcon, TelegramIcon, YouTubeIcon } from "@/components/ui/brand-icons";
import { Tag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";

/** YouTube-style channel header card with the channel banner. */
export function ChannelCard() {
  return (
    <Reveal className="rounded-[28px] p-2 glass md:p-2.5">
      <div className="relative aspect-16/7 overflow-hidden rounded-[20px] bg-[#0b1530] md:aspect-2560/424">
        <Image
          src="/images/banner.jpg"
          alt="Refactors Life: Where Engineering Meets Life. Podcast, Engineering, Growth."
          fill
          sizes="(max-width: 1200px) 100vw, 1160px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 px-2 pt-2.5 pb-1.5 md:gap-4.5 md:px-3.5 md:pt-3.5 md:pb-2">
        <Image
          src={site.host.photo}
          alt=""
          width={96}
          height={96}
          className="relative -mt-10 size-18 shrink-0 rounded-full border-4 border-white object-cover shadow-glass-lg md:-mt-13 md:size-24 md:border-5"
        />
        <div>
          <h2 className="text-[22px] tracking-[-0.025em]">Refactors Life</h2>
          <p className="mt-0.5 text-[14.5px] text-muted">{site.channel.handle} · Podcast | Engineering | Growth</p>
        </div>
        <div className="flex w-full gap-2.5 md:ml-auto md:w-auto">
          <a
            href={site.channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "ghost", className: "flex-1 md:flex-none" })}
          >
            Visit channel
          </a>
          <a
            href={site.channel.subscribe}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "dark", className: "flex-1 md:flex-none" })}
          >
            <YouTubeIcon className="yt" /> Subscribe
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/** Channel numbers. Live from YouTube when YOUTUBE_API_KEY is set. */
export async function Stats() {
  const stats = await getChannelStats();
  const items = [
    { value: `${formatCount(stats.subscribers)}+`, label: stats.live ? "Subscribers, live" : "Subscribers & growing" },
    { value: String(stats.videos), label: "Videos published" },
    { value: site.stats.topGuideViews, label: "Views on our top guide" },
    { value: "2×", label: "SIH winner as host" },
  ];
  return (
    <Reveal className="grid grid-cols-2 overflow-hidden rounded-[28px] glass md:grid-cols-4">
      {items.map((s, i) => (
        <div
          key={s.label}
          className={`grid gap-1.5 px-5 py-5.5 md:px-7.5 md:py-7 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
        >
          <b className="bg-linear-to-b from-accent-strong to-sky bg-clip-text text-[clamp(30px,3.4vw,40px)] leading-none font-semibold tracking-[-0.04em] text-transparent">
            <CountUp value={s.value} />
          </b>
          <span className="text-sm text-muted">{s.label}</span>
        </div>
      ))}
    </Reveal>
  );
}

/** Infinite scrolling strip of topics the channel covers. */
export function TopicsMarquee() {
  const row = [...topics, ...topics];
  return (
    <div
      className="relative overflow-hidden mask-[linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] py-2"
      aria-label="Topics we cover"
    >
      <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <li key={i} aria-hidden={i >= topics.length} className="rounded-full px-4.5 py-2.5 text-[14.5px] whitespace-nowrap text-fg-soft glass-flat">
            <span className="mr-2 text-accent">#</span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

const pillars = [
  {
    href: "/videos?cat=podcast",
    Icon: Mic,
    tone: "bg-sky/10 text-sky-600",
    title: "Podcast",
    text: "Refactoring Life with Aditya: long conversations with students and engineers about hackathons, placements and the messy middle.",
    tags: ["interviews", "SIH", "stories"],
  },
  {
    href: "/videos?cat=dev",
    Icon: Code,
    tone: "bg-accent/8 text-accent",
    title: "Engineering",
    text: "Tutorials you can follow along with: Git & GitHub, VS Code, C/C++ setup, Copilot, and Google Cloud GenAI labs.",
    tags: ["git", "vs code", "gemini"],
  },
  {
    href: "/videos?cat=career",
    Icon: TrendingUp,
    tone: "bg-cyan-600/9 text-cyan-600",
    title: "Growth",
    text: "Placements, packages, rejections and comebacks: the strategy and mindset side of an engineering career.",
    tags: ["placements", "LPA", "habits"],
  },
];

export function Pillars() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {pillars.map(({ href, Icon, tone, title, text, tags }, i) => (
        <Reveal key={title} delay={i * 0.06}>
          <Link
            href={href}
            className="spotlight relative flex h-full min-h-70 flex-col rounded-[20px] p-7 glass transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-glass-lg"
          >
            <span className="absolute top-7.5 right-7 font-mono text-[12.5px] text-muted">/0{i + 1}</span>
            <span className={`mb-5.5 grid size-11.5 place-items-center rounded-[14px] ${tone}`}>
              <Icon className="size-5.5" />
            </span>
            <h3 className="mb-2 text-xl tracking-[-0.025em]">{title}</h3>
            <p className="text-[15.5px] text-muted">{text}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
              {tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function QuestionBubbles() {
  const qs = [
    ["// placements", "How do I prepare for product companies from a tier-3 college?"],
    ["// hackathons", "How do you pick a winning problem statement for SIH?"],
    ["// first year", "DSA or development first? I'm confused."],
  ];
  return (
    <div className="grid gap-3" aria-hidden>
      {qs.map(([tag, q], i) => (
        <div
          key={q}
          className={`rounded-[18px_18px_18px_6px] px-4.5 py-3.5 text-[15px] glass ${i === 1 ? "ml-4.5 md:ml-9" : i === 2 ? "ml-3.5" : ""}`}
        >
          <small className="mb-1 block font-mono text-[11.5px] text-accent">{tag}</small>
          {q}
        </div>
      ))}
    </div>
  );
}

const communities = [
  {
    href: site.socials.telegramGroup,
    Icon: TelegramIcon,
    color: "text-[#29a9eb]",
    title: "Telegram group",
    text: "Doubts, resources and announcements",
  },
  { href: site.socials.instagram, Icon: InstagramIcon, color: "text-[#e1306c]", title: "Instagram", text: "Reels, behind the scenes, polls" },
  { href: site.socials.linkedin, Icon: LinkedInIcon, color: "text-[#0a66c2]", title: "LinkedIn", text: "Career updates and opportunities" },
  { href: site.socials.github, Icon: GitHubIcon, color: "text-fg", title: "GitHub", text: "Code from the tutorials" },
];

export function CommunityLinks() {
  return (
    <div className="grid gap-3">
      {communities.map(({ href, Icon, color, title, text }) => (
        <a
          key={title}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group spotlight relative flex items-center gap-4 rounded-[20px] px-5 py-4.5 glass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glass-lg"
        >
          <span className={`grid size-11.5 shrink-0 place-items-center rounded-[14px] bg-white shadow-glass-sm ${color}`}>
            <Icon className="size-5.5" />
          </span>
          <span>
            <b className="block">{title}</b>
            <span className="text-sm text-muted">{text}</span>
          </span>
          <ArrowUpRight className="ml-auto size-4.5 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        </a>
      ))}
    </div>
  );
}
