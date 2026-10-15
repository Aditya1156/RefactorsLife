import type { Metadata } from "next";
import { perks } from "@/content/site";
import { getRoles } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";
import { Container, Grad, PageHero, Section, SectionHeader } from "@/components/ui/primitives";
import { RoleList } from "@/components/community/role-list";
import { Perks, Steps } from "@/components/community/steps";
import { ApplyForm } from "@/components/forms/site-forms";

export const metadata: Metadata = {
  title: "Internships & Careers",
  description:
    "Remote internships at RefactorsLife: video editing, thumbnail design, content research, social media, web development and campus ambassadors.",
};

export default async function CareersPage() {
  const roles = (await getRoles()).filter((r) => r.open);
  return (
    <>
      <PageHero
        eyebrow="Careers · Now hiring interns"
        title={
          <>
            Build your portfolio <Grad>in public.</Grad>
          </>
        }
        text="Remote internships for students who want real, published work to show, not practice projects. Edit, design, write, grow, or build with us."
      >
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <ButtonLink href="#roles" size="lg">
            See open roles
          </ButtonLink>
          <ButtonLink href="#apply" size="lg" variant="ghost">
            Apply now
          </ButtonLink>
        </div>
      </PageHero>

      <Section className="pt-8!">
        <Container>
          <Perks perks={perks} />
        </Container>
      </Section>

      <Section id="roles">
        <Container className="max-w-[calc(900px+2.5rem)]">
          <SectionHeader
            eyebrow="Open roles"
            title="Pick where you fit."
            text="All roles are remote and part-time, designed to fit around college."
          />
          <RoleList roles={roles} />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Hiring process" title="Four steps. About a week." />
          <Steps
            steps={[
              ["Apply", "Fill the form below with your portfolio or sample work."],
              ["Small task", "A short, real task: edit a clip, design a thumbnail, write a hook."],
              ["15-min call", "A quick chat about how you work and what you want to learn."],
              ["Onboard", "Join the team channel and ship your first piece within two weeks."],
            ]}
          />
        </Container>
      </Section>

      <Section id="apply">
        <Container className="max-w-[calc(820px+2.5rem)]">
          <SectionHeader
            center
            eyebrow="Application"
            title="Apply to join the crew."
            text="Takes about 3 minutes. We reply to every application within 7 days."
          />
          <ApplyForm roles={roles.map((r) => ({ id: r.id, title: r.title }))} />
        </Container>
      </Section>
    </>
  );
}
