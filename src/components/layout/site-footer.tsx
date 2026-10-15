import Link from "next/link";
import { cacheLife } from "next/cache";
import { site } from "@/content/site";
import { GitHubIcon, InstagramIcon, LinkedInIcon, TelegramIcon, YouTubeIcon } from "@/components/ui/brand-icons";
import { Logo } from "./logo";

const columns = [
  {
    title: "Watch & read",
    links: [
      { href: "/videos", label: "All videos" },
      { href: "/videos?cat=podcast", label: "Podcast" },
      { href: "/blog", label: "Blog" },
      { href: "/resources", label: "Free resources" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/ask", label: "Ask a question" },
      { href: "/ask#reviews", label: "Reviews & feedback" },
      { href: "/hall-of-fame", label: "Hall of Fame" },
      { href: site.socials.telegramGroup, label: "Telegram group" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { href: "/careers", label: "Internships" },
      { href: "/team", label: "Team" },
      { href: "/collab", label: "Brands & colleges" },
      { href: `mailto:${site.email}`, label: site.email },
    ],
  },
];

export const socialLinks = [
  { href: site.socials.youtube, label: "YouTube", Icon: YouTubeIcon },
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: site.socials.github, label: "GitHub", Icon: GitHubIcon },
  { href: site.socials.telegram, label: "Telegram", Icon: TelegramIcon },
];

/** Cached so the year can be computed during prerendering; refreshes daily. */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);

export function SiteFooter() {
  return (
    <footer className="no-print py-6">
      <div className="container-rl">
        <div className="overflow-hidden rounded-[24px] px-5.5 pt-9 pb-5.5 glass md:rounded-[32px] md:px-12 md:pt-14 md:pb-7">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-10">
            <div className="col-span-2 lg:col-span-1">
              <Logo />
              <p className="mt-3.5 max-w-80 text-[15px] text-muted">
                {site.tagline}. Podcasts, tutorials and honest career talk for engineering students, one commit at a time.
              </p>
              <div className="mt-5 flex gap-2">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-xl bg-white text-fg-soft shadow-glass-sm transition-all hover:-translate-y-0.5 hover:text-accent"
                  >
                    <Icon className="size-4.25" />
                  </a>
                ))}
              </div>
            </div>
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-3.5 text-[13px] font-semibold tracking-normal">{col.title}</h4>
                <ul className="grid gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {isExternal(l.href) ? (
                        <a
                          href={l.href}
                          target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="text-[15px] break-all text-muted transition-colors hover:text-accent"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="text-[15px] text-muted transition-colors hover:text-accent">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            aria-hidden
            className="mt-12 overflow-hidden bg-linear-to-b from-accent/18 to-accent/2 bg-clip-text text-[clamp(52px,12vw,168px)] leading-[0.95] font-semibold tracking-[-0.06em] whitespace-nowrap text-transparent select-none"
          >
            RefactorsLife
          </div>
          <div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-line pt-5.5 text-[13.5px] text-muted">
            <span>
              © <CurrentYear /> RefactorsLife. Refactor your life.
            </span>
            <span className="font-mono">git commit -m &quot;keep going&quot;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
