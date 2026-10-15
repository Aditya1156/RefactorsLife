import { ArrowRight } from "lucide-react";
import { getPaths, getPosts, getResources, getRoles, getTeam, getWins } from "@/lib/content";
import { resolvePath } from "@/lib/learn";
import { getVideos } from "@/lib/youtube";
import { ButtonLink } from "@/components/ui/button";
import { ArrowLink, Container, CtaPanel, Eyebrow, Section, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Hero } from "@/components/home/hero";
import { ChannelCard, CommunityLinks, Pillars, QuestionBubbles, Stats, TopicsMarquee } from "@/components/home/sections";
import { FeaturedEpisode } from "@/components/video/featured-episode";
import { VideoGrid } from "@/components/video/video-card";
import { ResourceGrid } from "@/components/resources/resource-grid";
import { WinCard } from "@/components/community/wins";
import { TeamGrid } from "@/components/community/people";
import { PostCard } from "@/components/blog/post-card";
import { NewsletterForm } from "@/components/forms/site-forms";
import { PathCard } from "@/components/learn/path-card";

export default async function HomePage() {
  const [videos, paths, resources, wins, team, roles, posts] = await Promise.all([
    getVideos(),
    getPaths(),
    getResources(),
    getWins(),
    getTeam(),
    getRoles(),
    getPosts(),
  ]);
  const seats = roles.filter((r) => r.open && r.seat).map((r) => r.seat!);
  const featured = videos.find((v) => v.featured) ?? videos[0];
  const latest = videos.filter((v) => v.id !== featured.id).slice(0, 6);

  return (
    <>
      <Hero />

      <Container className="grid gap-5 pb-10">
        <ChannelCard />
        <Stats />
      </Container>

      <TopicsMarquee />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="01 · What we make"
            title="Podcast. Engineering. Growth."
            text="Three tracks, one goal: help you get better at the craft and smarter about the career around it."
          />
          <Pillars />
        </Container>
      </Section>

      <Section id="podcast">
        <Container>
          <SectionHeader
            eyebrow="02 · Featured episode"
            eyebrowTone="sky"
            title="Refactoring Life, the podcast."
            action={<ArrowLink href="/videos?cat=podcast">All episodes</ArrowLink>}
          />
          <Reveal>
            <FeaturedEpisode video={featured} />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="03 · Latest uploads"
            title="Fresh from the channel."
            action={<ArrowLink href="/videos">Browse all videos</ArrowLink>}
          />
          <VideoGrid videos={latest} />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="04 · Learning paths"
            title="Follow a path, not a playlist."
            text="Hand-picked videos in the right order, with progress you can tick off. Pick one and start today."
            action={<ArrowLink href="/learn">All paths</ArrowLink>}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {paths.slice(0, 4).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05} className="h-full">
                <PathCard path={p} totalLabel={resolvePath(p, videos).totalLabel} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <CtaPanel>
              <div>
                <Eyebrow>05 · Ask Aditya</Eyebrow>
                <h2 className="mt-3.5 text-[clamp(28px,3.4vw,40px)] tracking-[-0.04em]">
                  Stuck on something?
                  <br />
                  Ask. The best questions become videos.
                </h2>
                <p className="mt-3.5 text-[17px] text-fg-soft">
                  College, code, placements, hackathons, content creation: send it in, anonymously if you like. Every question is read, and the
                  most-asked ones get a full video.
                </p>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  <ButtonLink href="/ask">
                    Ask a question <ArrowRight />
                  </ButtonLink>
                  <ButtonLink href="/ask#answered" variant="ghost">
                    See answered questions
                  </ButtonLink>
                </div>
              </div>
              <QuestionBubbles />
            </CtaPanel>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="06 · Free resources"
            title="Cheat sheets you'll actually use."
            text="Printable one-pagers for our most-watched topics. One email unlocks them all."
            action={<ArrowLink href="/resources">All resources</ArrowLink>}
          />
          <ResourceGrid resources={resources.filter((r) => !r.soon).slice(0, 3)} />
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <CtaPanel>
              <div>
                <Eyebrow>07 · Hall of Fame</Eyebrow>
                <h2 className="mt-3.5 text-[clamp(28px,3.4vw,40px)] tracking-[-0.04em]">
                  Landed an internship? Won a hackathon?
                  <br />
                  Get featured.
                </h2>
                <p className="mt-3.5 text-[17px] text-fg-soft">
                  The Hall of Fame celebrates real wins from students who learned with RefactorsLife: internships, placements, hackathons and
                  open-source milestones.
                </p>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  <ButtonLink href="/hall-of-fame#share">
                    Share your win <ArrowRight />
                  </ButtonLink>
                  <ButtonLink href="/hall-of-fame" variant="ghost">
                    See the Hall of Fame
                  </ButtonLink>
                </div>
              </div>
              {wins[0] && <WinCard win={wins[0]} />}
            </CtaPanel>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="08 · Behind the videos"
            title="Built by students, for students."
            text="Every video is edited, designed and researched by a small crew, most of them interns building a real portfolio. We're hiring."
            action={
              <div className="flex flex-wrap gap-2.5">
                <ButtonLink href="/team" variant="ghost">
                  Meet the team
                </ButtonLink>
                <ButtonLink href="/careers">
                  Open internships <ArrowRight />
                </ButtonLink>
              </div>
            }
          />
          <TeamGrid members={team} seats={seats} limit={4} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="09 · From the blog"
            title="Read it, then watch it."
            text="Written guides for our most-asked videos: commands you can copy, links you can click."
            action={<ArrowLink href="/blog">All posts</ArrowLink>}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {posts.slice(0, 2).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06} className="h-full">
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="newsletter">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="grid gap-4.5">
            <Eyebrow>10 · Stay in the loop</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] tracking-[-0.04em]">The Refactor: one useful email, every other week.</h2>
            <p className="text-[clamp(17px,1.6vw,19px)] text-fg-soft">
              New videos, free tools & student offers, internship openings and the questions we&apos;re answering next. No spam, unsubscribe anytime.
            </p>
            <NewsletterForm />
          </div>
          <CommunityLinks />
        </Container>
      </Section>
    </>
  );
}
