import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { getVideos } from "@/lib/youtube";
import { ButtonLink } from "@/components/ui/button";
import { YouTubeIcon } from "@/components/ui/brand-icons";
import { Container, CtaPanel, Eyebrow, Grad, PageHero, Section } from "@/components/ui/primitives";
import { VideoCard, VideoGrid } from "@/components/video/video-card";
import { VideoLibrary } from "@/components/video/video-library";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Every RefactorsLife video in one place: the Refactoring Life podcast, Git & GitHub and VS Code tutorials, Google Cloud GenAI labs and career advice.",
};

export default async function VideosPage() {
  const videos = await getVideos();
  const cards = Object.fromEntries(videos.map((v, i) => [v.id, <VideoCard key={v.id} video={v} priority={i < 3} />]));

  return (
    <>
      <PageHero
        eyebrow="The library"
        title={
          <>
            Every video, <Grad>neatly sorted.</Grad>
          </>
        }
        text="Podcast episodes, setup guides, GenAI labs and career breakdowns. Filter by topic or search for exactly what you need."
      />
      <Section className="pt-6!">
        <Container>
          {/* The topic filter reads ?cat= from the URL, so it renders inside Suspense; the fallback shows every video. */}
          <Suspense fallback={<VideoGrid videos={videos} />}>
            <VideoLibrary videos={videos} cards={cards} />
          </Suspense>

          <CtaPanel className="mt-24">
            <div>
              <Eyebrow>Missing something?</Eyebrow>
              <h2 className="mt-3.5 text-[clamp(28px,3.4vw,40px)] tracking-[-0.04em]">Request the next video.</h2>
              <p className="mt-3.5 text-[17px] text-fg-soft">
                Tell us what you&apos;re stuck on. Topics that get asked the most go straight to the top of the content calendar.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 lg:justify-end">
              <ButtonLink href="/ask" size="lg">
                Request a topic <ArrowRight />
              </ButtonLink>
              <ButtonLink href={site.channel.subscribe} size="lg" variant="dark">
                <YouTubeIcon className="yt" /> Subscribe
              </ButtonLink>
            </div>
          </CtaPanel>
        </Container>
      </Section>
    </>
  );
}
