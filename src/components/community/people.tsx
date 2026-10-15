import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";
import type { TeamMember } from "@/content/types";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { initials } from "@/lib/utils";

const linkIcons = { linkedin: LinkedInIcon, github: GitHubIcon, instagram: InstagramIcon, website: Globe };

const frame = "relative aspect-square overflow-hidden rounded-[20px] transition-all duration-300 ease-soft group-hover:-translate-y-1";

/** "This could be you" card for a role that's still open. */
export function OpenSeatCard({ role }: { role: string }) {
  return (
    <Link href="/careers" className="group grid content-start gap-4">
      <div className={`${frame} grid place-items-center border-[1.5px]! border-dashed! border-accent/28! bg-white/50! glass-flat`}>
        <span className="rounded-full bg-white px-4 py-2 text-[13px] font-medium text-accent shadow-glass-sm">open seat</span>
      </div>
      <div>
        <h3 className="text-lg tracking-[-0.02em]">This could be you</h3>
        <p className="text-[14.5px] text-muted">
          {role} · <span className="text-accent">Apply →</span>
        </p>
      </div>
    </Link>
  );
}

export function PersonCard({ member, edited = 0 }: { member: TeamMember; edited?: number }) {
  return (
    <div className="group grid content-start gap-4">
      <div className={`${frame} border-6 border-white/75 bg-white shadow-glass group-hover:shadow-glass-lg`}>
        {member.photo ? (
          <Image src={member.photo} alt={member.name} fill sizes="(max-width: 768px) 100vw, 280px" className="rounded-[14px] object-cover" />
        ) : (
          <span className="grid size-full place-items-center text-[44px] font-semibold tracking-[-0.04em] text-accent">{initials(member.name)}</span>
        )}
      </div>
      <div>
        <h3 className="text-lg tracking-[-0.02em]">{member.name}</h3>
        <p className="text-[14.5px] text-muted">
          {member.role}
          {edited > 0 && ` · ${edited} video${edited > 1 ? "s" : ""} edited`}
        </p>
        {member.bio && <p className="mt-2 text-[14.5px] text-muted">{member.bio}</p>}
        {Object.keys(member.links).length > 0 && (
          <div className="mt-2.5 flex gap-1.5">
            {Object.entries(member.links).map(([k, url]) => {
              const Icon = linkIcons[k as keyof typeof linkIcons];
              return (
                <a
                  key={k}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on ${k}`}
                  className="grid size-8.5 place-items-center rounded-[10px] border border-line bg-white/70 text-muted transition-colors hover:border-accent/30 hover:bg-white hover:text-accent"
                >
                  <Icon className="size-3.75" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/** Team members followed by open-seat cards for roles we're hiring for. */
export function TeamGrid({
  members,
  seats = [],
  edited = {},
  limit,
  className = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
}: {
  members: TeamMember[];
  seats?: string[];
  edited?: Record<string, number>;
  limit?: number;
  className?: string;
}) {
  const cards = [
    ...members.map((m) => ({ key: m.id, node: <PersonCard member={m} edited={edited[m.id]} /> })),
    ...seats.map((s) => ({ key: `seat-${s}`, node: <OpenSeatCard role={s} /> })),
  ].slice(0, limit);
  return (
    <div className={className}>
      {cards.map((c, i) => (
        <Reveal key={c.key} delay={i * 0.05}>
          {c.node}
        </Reveal>
      ))}
    </div>
  );
}
