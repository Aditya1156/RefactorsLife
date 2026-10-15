import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageSkeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight, Check, Clock, PlaySquare } from "lucide-react";
import { getPaths, getResources } from "@/lib/content";
import { resolvePath } from "@/lib/learn";
import { getVideos } from "@/lib/youtube";
import { IconTile } from "@/components/ui/icon";
import { Container, Section, Tag } from "@/components/ui/primitives";
import { PathSteps } from "@/components/learn/path-steps";
import { PathCard } from "@/components/learn/path-card";

export async function generateStaticParams() {
  return (await getPaths()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/learn/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const path = (await getPaths()).find((p) => p.slug === slug);
  return path ? { title: `${path.title} · Learning path`, description: path.description } : {};
}

async function PathContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [paths, videos, resources] = await Promise.all([getPaths(), getVideos(), getResources()]);
  const index = paths.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const path = paths[index];
  const { steps, totalLabel } = resolvePath(path, videos);
  const resource = resources.find((r) => r.slug === path.resource && !r.soon);
  const nextPath = paths[(index + 1) % paths.length];

  return (
    <Section className="pt-8! md:pt-12!">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="grid gap-8">
          <div className="grid gap-5">
            <Link href="/learn" className="inline-flex w-fit items-center gap-1.5 text-[14.5px] text-muted hover:text-accent">
              <ArrowLeft className="size-4" /> All paths
            </Link>
            <div className="flex items-center gap-3">
              <IconTile name={path.icon} tone={path.tone} />
              <Tag>{path.level}</Tag>
            </div>
            <h1 className="text-[clamp(34px,4.6vw,52px)] leading-[1.06] tracking-[-0.045em]">{path.title}</h1>
            <p className="max-w-170 text-lg text-fg-soft">{path.description}</p>
            <p className="flex flex-wrap gap-5 text-[14.5px] text-fg-soft">
              <span className="inline-flex items-center gap-1.5">
                <PlaySquare className="size-4.5 text-accent" /> {steps.length} videos
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4.5 text-accent" /> {totalLabel}
              </span>
            </p>
          </div>
          <PathSteps steps={steps} />
        </div>

        <aside className="grid gap-5 lg:sticky lg:top-28">
          {path.outcomes.length > 0 && (
            <div className="rounded-[20px] p-6 glass">
              <h2 className="mb-3.5 text-[17px] tracking-[-0.02em]">By the end you can</h2>
              <ul className="grid gap-2.5 text-[14.5px] text-fg-soft">
                {path.outcomes.map((o) => (
                  <li key={o} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4.5 shrink-0 text-accent" /> {o}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {resource && (
            <Link
              href={`/resources/${resource.slug}`}
              className="group spotlight relative grid gap-2 rounded-[20px] p-6 glass transition-all hover:-translate-y-0.5 hover:shadow-glass-lg"
            >
              <p className="text-xs font-medium tracking-wide text-accent uppercase">Companion resource</p>
              <h3 className="text-[17px] tracking-[-0.02em]">{resource.title}</h3>
              <p className="text-[14px] text-muted">{resource.text}</p>
              <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Open & print <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.75" />
              </span>
            </Link>
          )}
          {nextPath && nextPath.slug !== path.slug && (
            <div className="grid gap-2.5">
              <p className="px-1 text-xs font-medium tracking-wide text-muted uppercase">Next path</p>
              <PathCard path={nextPath} totalLabel={resolvePath(nextPath, videos).totalLabel} />
            </div>
          )}
        </aside>
      </Container>
    </Section>
  );
}

/* Reading the slug happens inside Suspense, so in-app navigation can show the page frame instantly. */
export default function PathPage({ params }: PageProps<"/learn/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PathContent params={params} />
    </Suspense>
  );
}
