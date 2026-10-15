import type { Metadata } from "next";
import { getAnswered, getReviews } from "@/lib/content";
import { site } from "@/content/site";
import { getVideos } from "@/lib/youtube";
import { ButtonLink } from "@/components/ui/button";
import { TelegramIcon } from "@/components/ui/brand-icons";
import { Container, Eyebrow, Grad, PageHero, Section, SectionHeader } from "@/components/ui/primitives";
import { AnsweredList, ReviewWall } from "@/components/community/answered-and-reviews";
import { AskForm, ReviewForm } from "@/components/forms/site-forms";

export const metadata: Metadata = {
  title: "Ask Aditya",
  description:
    "Ask Aditya Kumar anything about college, coding, placements, hackathons or content creation, anonymously if you like. Leave a review or feedback.",
};

export default async function AskPage() {
  const [videos, answered, reviews] = await Promise.all([getVideos(), getAnswered(), getReviews()]);
  const titles = Object.fromEntries(videos.map((v) => [v.id, v.title]));

  return (
    <>
      <PageHero
        eyebrow="Ask Aditya"
        title={
          <>
            Ask anything. <Grad>Seriously.</Grad>
          </>
        }
        text="College, code, placements, hackathons, content creation, or life. Every question gets read, and the most-asked ones become videos."
      />

      <Section className="pt-6!">
        <Container className="grid items-start gap-10 lg:grid-cols-2">
          <AskForm />
          <div id="answered" className="grid gap-7">
            <div className="grid gap-3">
              <Eyebrow>Already answered</Eyebrow>
              <h2 className="text-[28px] tracking-[-0.03em]">Your question might already have a video.</h2>
            </div>
            <AnsweredList items={answered} titles={titles} />
            <div className="flex items-center gap-4 rounded-[20px] p-5 glass">
              <span className="grid size-11.5 shrink-0 place-items-center rounded-[14px] bg-sky-500/12 text-[#29a9eb]">
                <TelegramIcon className="size-5.5" />
              </span>
              <div className="flex-1">
                <b className="block">Need a faster answer?</b>
                <span className="text-[14.5px] text-muted">The Telegram group is where the community helps each other daily.</span>
              </div>
              <ButtonLink href={site.socials.telegramGroup} variant="ghost" size="sm">
                Join
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="reviews">
        <Container>
          <SectionHeader
            eyebrow="Reviews & feedback"
            eyebrowTone="sky"
            title="What the community says."
            text="Did a video help you land an internship, fix a bug or win a hackathon? Tell us, and tell us what to do better."
          />
          <ReviewWall reviews={reviews} />
          <div className="mx-auto mt-14 max-w-180">
            <ReviewForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
