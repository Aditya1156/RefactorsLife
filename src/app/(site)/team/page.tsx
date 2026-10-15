import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { getRoles, getTeam } from "@/lib/content";
import { getVideos } from "@/lib/youtube";
import { ButtonLink } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Container, Eyebrow, Grad, PageHero, Section, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { TeamGrid } from "@/components/community/people";
import { Steps } from "@/components/community/steps";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet Aditya Kumar and the editors, designers and writers behind RefactorsLife.",
};

const highlights = [
  ["2× Smart India Hackathon winner", "and now helping the next teams prepare."],
  [`${site.stats.videos} videos`, "on dev tools, Google Cloud GenAI labs, careers and college life."],
  ["Refactoring Life podcast", "long-form conversations about engineering and life."],
  ["Learning by doing", "staying consistent, building a future step by step."],
];

export default async function TeamPage() {
  const [team, roles, videos] = await Promise.all([getTeam(), getRoles(), getVideos()]);
  const seats = roles.filter((r) => r.open && r.seat).map((r) => r.seat!);
  // How many videos each editor has cut, from the "Edited by" field on videos.
  const edited = videos.reduce<Record<string, number>>((acc, v) => (v.editor ? { ...acc, [v.editor]: (acc[v.editor] ?? 0) + 1 } : acc), {});
  return (
    <>
      <PageHero
        eyebrow="The team"
        title={
          <>
            The people behind <Grad>every frame.</Grad>
          </>
        }
        text="One host, a growing crew of editors, designers and writers, and a seat open for you."
      />

      <Section className="pt-8!">
        <Container className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="relative aspect-square w-full max-w-90 overflow-hidden rounded-[32px] border-8 border-white/70 bg-white bg-clip-padding shadow-glass-lg lg:max-w-none">
            <Image src={site.host.photo} alt={site.host.name} fill sizes="(max-width: 1024px) 360px, 440px" className="rounded-3xl object-cover" />
            <div className="absolute inset-x-3 bottom-3 grid rounded-[18px] bg-white/88! px-4 py-3 glass">
              <b>{site.host.name}</b>
              <span className="text-[13px] text-muted">Founder & host</span>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="grid gap-5">
            <Eyebrow>Founder & host</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] tracking-[-0.04em]">Hi, I&apos;m Aditya.</h2>
            <p className="text-[clamp(17px,1.6vw,19px)] leading-relaxed text-fg-soft">
              I started RefactorsLife to be the companion I wanted in college: someone who&apos;d show the actual steps, say the honest thing about
              placements, and keep showing up. Whether you&apos;re just starting college or preparing for placements, this channel is here to guide,
              inspire and help you grow.
            </p>
            <ul className="ml-1.5 border-l border-accent/20">
              {highlights.map(([b, rest]) => (
                <li
                  key={b}
                  className="relative pb-4.5 pl-5.5 text-[15.5px] text-fg-soft before:absolute before:top-1.75 before:-left-1.5 before:size-2.75 before:rounded-full before:border-2 before:border-accent before:bg-white before:ring-3 before:ring-accent/8"
                >
                  <b className="font-semibold text-fg">{b}</b>, {rest}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2.5">
              <ButtonLink href={site.socials.linkedin}>
                <LinkedInIcon /> Connect on LinkedIn
              </ButtonLink>
              <ButtonLink href={site.socials.github} variant="ghost">
                <GitHubIcon /> GitHub
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="The crew"
            title="Editors, designers & writers."
            text="Everyone who works on a video gets credited here and in the video description. Editors' cards show how many videos they've cut."
            action={
              <ButtonLink href="/careers">
                Join the crew <ArrowRight />
              </ButtonLink>
            }
          />
          <TeamGrid members={team.filter((m) => m.id !== "aditya")} seats={seats} edited={edited} />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="How a video gets made" title="From your question to a published video." />
          <Steps
            steps={[
              ["Idea", "Most topics come from your questions on the Ask page, comments and the Telegram group."],
              ["Research & script", "Our writers research the topic, outline the video and draft the hook."],
              ["Shoot & edit", "Aditya records; editors cut it tight and add captions, b-roll and Shorts."],
              ["Thumbnail & publish", "Designers test thumbnail variants, then it goes live, with a blog post here."],
            ]}
          />
        </Container>
      </Section>
    </>
  );
}
