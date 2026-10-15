import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getResources } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";
import { Container, CtaPanel, Eyebrow, Grad, PageHero, Section } from "@/components/ui/primitives";
import { ResourceGrid } from "@/components/resources/resource-grid";

export const metadata: Metadata = {
  title: "Free Resources",
  description:
    "Free cheat sheets, checklists and templates for engineering students: Git & GitHub cheat sheet, Smart India Hackathon prep checklist, dev setup checklist and more.",
};

export default async function ResourcesPage() {
  const resources = await getResources();
  return (
    <>
      <PageHero
        eyebrow="Free resources"
        title={
          <>
            Cheat sheets & checklists, <Grad>free forever.</Grad>
          </>
        }
        text="Printable, one-page companions to our most-watched videos. Enter your email once and every resource unlocks."
      />
      <Section className="pt-6!">
        <Container>
          <ResourceGrid resources={resources} />
          <CtaPanel className="mt-24">
            <div>
              <Eyebrow>Request a resource</Eyebrow>
              <h2 className="mt-3.5 text-[clamp(28px,3.4vw,40px)] tracking-[-0.04em]">Want a cheat sheet for something else?</h2>
              <p className="mt-3.5 text-[17px] text-fg-soft">
                Tell us what you&apos;d print and stick on your wall. The most-requested ones get made next.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <ButtonLink href="/ask" size="lg">
                Request it <ArrowRight />
              </ButtonLink>
            </div>
          </CtaPanel>
        </Container>
      </Section>
    </>
  );
}
