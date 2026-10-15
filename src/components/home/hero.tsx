import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Mic, Play, Trophy } from "lucide-react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** CSS entrance animation: runs before hydration, so the hero is never hidden waiting for JS. */
const Rise = ({ delay = 0, className, children }: { delay?: number; className?: string; children: React.ReactNode }) => (
  <div className={cn("animate-rise", className)} style={{ animationDelay: `${delay}s` }}>
    {children}
  </div>
);

function FloatChip({ icon, title, sub, className }: { icon: React.ReactNode; title: string; sub: string; className: string }) {
  return (
    <div
      className={`absolute z-2 hidden animate-float items-center gap-2.5 rounded-2xl bg-white/90! py-2.5 pr-3.5 pl-2.5 text-[12.5px] text-muted shadow-glass-lg glass sm:flex ${className}`}
    >
      <span className="grid size-8.5 place-items-center rounded-[10px] bg-accent/8 text-accent [&_svg]:size-4.25">{icon}</span>
      <span>
        <b className="block text-[14.5px] leading-tight text-fg">{title}</b>
        {sub}
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-8 pb-14 md:pt-14 md:pb-22">
      <div className="container-rl grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
        <div className="grid gap-6.5">
          <Rise>
            <Link
              href="#podcast"
              className="inline-flex w-fit items-center gap-2.5 rounded-full py-1.25 pr-3.5 pl-1.25 text-[13.5px] text-fg-soft glass-flat transition-transform hover:-translate-y-px hover:text-fg"
            >
              <span className="rounded-full bg-accent px-2.5 py-1 text-[11.5px] font-medium whitespace-nowrap text-white">new episode</span>
              The REAL truth about Smart India Hackathon
              <ArrowRight className="size-3.5" />
            </Link>
          </Rise>
          <Rise delay={0.05}>
            <h1 className="text-[clamp(42px,6.4vw,78px)] leading-[1.02] tracking-[-0.045em]">
              Refactor your life,
              <br />
              <span className="text-grad">one commit</span> at a time.
            </h1>
          </Rise>
          <Rise delay={0.1}>
            <p className="max-w-140 text-[clamp(17px,1.6vw,19px)] leading-relaxed text-fg-soft">
              Podcasts, hands-on tutorials and honest career talk for engineering students, from first year to first offer. Hosted by {site.host.name}
              , 2× Smart India Hackathon winner.
            </p>
          </Rise>
          <Rise delay={0.15} className="flex flex-wrap gap-3">
            <ButtonLink href="/videos" size="lg" className="flex-1 sm:flex-none">
              <Play className="fill-current" /> Watch the videos
            </ButtonLink>
            <ButtonLink href="/ask" size="lg" variant="ghost" className="flex-1 sm:flex-none">
              <MessageCircle /> Ask Aditya anything
            </ButtonLink>
          </Rise>
          <Rise delay={0.2} className="hidden gap-2.5 font-mono text-[13px] text-muted sm:flex">
            <span className="text-accent">~/refactorslife $</span>
            <span className="text-indigo">a1f3c9e</span>
            <span>refactor: college → career</span>
          </Rise>
        </div>

        <Rise delay={0.1} className="relative w-full max-w-90 justify-self-center lg:max-w-105">
          <div
            aria-hidden
            className="absolute inset-[8%_-6%_-4%_6%] -z-1 rounded-[40px] bg-linear-140 from-blue-400 via-indigo-400 to-sky-400 opacity-45 blur-[40px]"
          />
          <div className="relative aspect-4/5 overflow-hidden rounded-[32px] border-8 border-white/70 bg-white bg-clip-padding shadow-glass-lg">
            <Image
              src={site.host.photo}
              alt={`${site.host.name}, host of RefactorsLife`}
              fill
              priority
              sizes="(max-width: 1024px) 360px, 420px"
              className="rounded-3xl object-cover"
            />
            <div className="absolute inset-x-3 bottom-3 z-1 grid rounded-[18px] bg-white/88! px-4 py-3 glass">
              <b className="text-base tracking-[-0.02em]">{site.host.name}</b>
              <span className="text-[13px] text-muted">Founder & host, RefactorsLife</span>
            </div>
          </div>
          <FloatChip icon={<Trophy />} title="2× SIH Winner" sub="Smart India Hackathon" className="top-9 -left-6 lg:-left-16" />
          <FloatChip icon={<Mic />} title="Podcast" sub="Refactoring Life" className="right-[-24px] bottom-26 [animation-delay:-3s] lg:-right-13" />
        </Rise>
      </div>
    </section>
  );
}
