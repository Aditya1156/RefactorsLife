import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getWins } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";
import { Container, Grad, PageHero, Section, SectionHeader } from "@/components/ui/primitives";
import { TrophyBadge, WinsBoard } from "@/components/community/wins";
import { WinForm } from "@/components/forms/site-forms";

export const metadata: Metadata = {
  title: "Hall of Fame",
  description:
    "Internships, placements, hackathon wins and open-source milestones from the RefactorsLife community. Share your win and get featured.",
};

export default async function HallOfFamePage() {
  const wins = await getWins();
  return (
    <>
      <PageHero
        eyebrow={<TrophyBadge size="lg" />}
        title={
          <>
            The <Grad>Hall of Fame.</Grad>
          </>
        }
        text="Internships landed, placements cracked, hackathons won. Real wins from students who learned alongside RefactorsLife."
      >
        <ButtonLink href="#share" size="lg" className="mt-2">
          Share your win <ArrowRight />
        </ButtonLink>
      </PageHero>

      <Section className="pt-6!">
        <Container>
          <WinsBoard wins={wins} />
        </Container>
      </Section>

      <Section id="share">
        <Container className="max-w-[calc(820px+2.5rem)]">
          <SectionHeader
            center
            eyebrow="Get featured"
            title="Share your win."
            text="Big or small: first internship, first open-source PR, a hackathon round you cleared. If a video helped, we want to celebrate it."
          />
          <WinForm />
        </Container>
      </Section>
    </>
  );
}
