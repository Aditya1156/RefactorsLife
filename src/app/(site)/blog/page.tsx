import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";
import { Container, CtaPanel, Eyebrow, Grad, PageHero, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { PostCard } from "@/components/blog/post-card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Step-by-step written guides from RefactorsLife: Git & GitHub, VS Code, the GitHub Student Developer Pack, hackathons and placements.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero
        eyebrow="The blog"
        title={
          <>
            Read it, <Grad>then build it.</Grad>
          </>
        }
        text="Written companions to our videos. Every command, every link, in one place you can bookmark."
      />
      <Section className="pt-6!">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05} className="h-full">
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
          <CtaPanel className="mt-24">
            <div>
              <Eyebrow>Write for RefactorsLife</Eyebrow>
              <h2 className="mt-3.5 text-[clamp(28px,3.4vw,40px)] tracking-[-0.04em]">Good at explaining things?</h2>
              <p className="mt-3.5 text-[17px] text-fg-soft">
                Our Content Research interns turn videos into guides like these, and get a byline for it.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <ButtonLink href="/careers#research-writer" size="lg">
                See the role <ArrowRight />
              </ButtonLink>
            </div>
          </CtaPanel>
        </Container>
      </Section>
    </>
  );
}
