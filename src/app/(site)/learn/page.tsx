import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getPaths } from "@/lib/content";
import { resolvePath } from "@/lib/learn";
import { getVideos } from "@/lib/youtube";
import { ButtonLink } from "@/components/ui/button";
import { Container, CtaPanel, Eyebrow, Grad, PageHero, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { PathCard } from "@/components/learn/path-card";

export const metadata: Metadata = {
  title: "Learning paths",
  description:
    "Short, ordered video courses from RefactorsLife: Git & GitHub from zero, coding laptop setup, Google Cloud GenAI labs and placements. Track your progress.",
};

export default async function LearnPage() {
  const [paths, videos] = await Promise.all([getPaths(), getVideos()]);
  return (
    <>
      <PageHero
        eyebrow="Learning paths"
        title={
          <>
            Stop browsing. <Grad>Start a path.</Grad>
          </>
        }
        text="Hand-picked videos in the right order, with a note on why each one matters. Tick them off as you go; your progress is saved on this device."
      />
      <Section className="pt-6!">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {paths.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05} className="h-full">
                <PathCard path={p} totalLabel={resolvePath(p, videos).totalLabel} />
              </Reveal>
            ))}
          </div>
          <CtaPanel className="mt-24">
            <div>
              <Eyebrow>Missing a path?</Eyebrow>
              <h2 className="mt-3.5 text-[clamp(28px,3.4vw,40px)] tracking-[-0.04em]">Tell us what you want to learn next.</h2>
              <p className="mt-3.5 text-[17px] text-fg-soft">
                DSA, web development, resumes, open source… The most-requested topics become the next path.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <ButtonLink href="/ask" size="lg">
                Suggest a path <ArrowRight />
              </ButtonLink>
            </div>
          </CtaPanel>
        </Container>
      </Section>
    </>
  );
}
