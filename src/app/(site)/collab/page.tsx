import type { Metadata } from "next";
import { Building2, Mic, Zap } from "lucide-react";
import { site } from "@/content/site";
import { Container, Grad, PageHero, Section, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Stats } from "@/components/home/sections";
import { CollabForm } from "@/components/forms/site-forms";

export const metadata: Metadata = {
  title: "Work with us",
  description:
    "Partner with RefactorsLife: brand integrations for developer tools and ed-tech, college talks and workshops, and podcast guest appearances.",
};

const offers = [
  {
    id: undefined,
    Icon: Zap,
    tone: "bg-accent/8 text-accent",
    title: "Brand integrations",
    text: "For developer tools, ed-tech, laptops and student offers that genuinely help.",
    items: ["Dedicated tutorial or integrated segment", "Shorts, Instagram & community posts", "Blog post + link on this site"],
  },
  {
    id: undefined,
    Icon: Building2,
    tone: "bg-cyan-600/9 text-cyan-600",
    title: "Colleges & clubs",
    text: "Talks, workshops and hackathon sessions, online or on campus.",
    items: ["Smart India Hackathon prep sessions", "Git, GitHub & dev-tools workshops", "Placement & career talks, judging"],
  },
  {
    id: "guest",
    Icon: Mic,
    tone: "bg-sky/10 text-sky-600",
    title: "Podcast guests",
    text: "Have a story worth hearing? Come on Refactoring Life with Aditya.",
    items: ["Engineers, founders, hackathon winners", "Students with an unusual journey", "Creators in tech & education"],
  },
];

export default function CollabPage() {
  return (
    <>
      <PageHero
        eyebrow="Work with us"
        title={
          <>
            Reach engineering students <Grad>who actually listen.</Grad>
          </>
        }
        text="Brands, colleges and creators: let's build something useful together for students across India."
      />

      <Container className="pb-4">
        <Stats />
        <p className="mt-5 text-center text-[14.5px] text-muted">
          Audience: engineering students and early-career developers, mostly in India. Videos in Hindi & English.
        </p>
      </Container>

      <Section>
        <Container>
          <SectionHeader eyebrow="Ways to collaborate" title="Three ways to work together." />
          <div className="grid gap-5 lg:grid-cols-3">
            {offers.map(({ id, Icon, tone, title, text, items }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div id={id} className="flex h-full scroll-mt-28 flex-col gap-3 rounded-[20px] p-7 glass">
                  <span className={`mb-2.5 grid size-11.5 place-items-center rounded-[14px] ${tone}`}>
                    <Icon className="size-5.5" />
                  </span>
                  <h3 className="text-xl tracking-[-0.025em]">{title}</h3>
                  <p className="text-[15.5px] text-muted">{text}</p>
                  <ul className="mt-1.5 grid list-disc gap-1.5 pl-4.5 text-[15px] text-fg-soft marker:text-accent">
                    {items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-7 text-[14.5px] text-muted">
            We only promote products we&apos;d use ourselves, and every sponsorship is clearly disclosed.
          </p>
        </Container>
      </Section>

      <Section id="contact">
        <Container className="max-w-[calc(820px+2.5rem)]">
          <SectionHeader
            center
            eyebrow="Get in touch"
            title="Tell us what you have in mind."
            text={
              <>
                We reply within 2–3 working days. Prefer email?{" "}
                <a href={`mailto:${site.email}`} className="text-accent">
                  {site.email}
                </a>
              </>
            }
          />
          <CollabForm />
        </Container>
      </Section>
    </>
  );
}
