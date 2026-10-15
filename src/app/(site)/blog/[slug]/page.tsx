import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageSkeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { getPostHeadings, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { PostMetaLine } from "@/components/blog/post-card";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/toc";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

const findPost = async (slug: string) => (await getPosts()).find((p) => p.slug === slug);

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await findPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date },
  };
}

async function PostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) notFound();
  const [{ default: Content }, headings] = await Promise.all([import(`@/content/blog/${slug}.mdx`), getPostHeadings(slug)]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name, url: site.url },
    image: `${site.url}/blog/${slug}/opengraph-image`,
  };

  return (
    <>
      <ReadingProgress />
      <div className="container-rl grid max-w-[calc(1100px+2.5rem)] gap-14 pb-24 xl:grid-cols-[minmax(0,760px)_240px] xl:justify-between">
        <article className="min-w-0">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <header className="grid gap-5 pt-9 pb-6 md:pt-14 md:pb-9">
            <Link href="/blog" className="inline-flex w-fit items-center gap-1.5 text-[14.5px] text-muted hover:text-accent">
              <ArrowLeft className="size-4" /> All posts
            </Link>
            <PostMetaLine post={{ ...post, date: formatDate(post.date) }} />
            <h1 className="text-[clamp(34px,5vw,52px)] leading-[1.08] tracking-[-0.045em]">{post.title}</h1>
            <p className="text-xl text-fg-soft">{post.excerpt}</p>
          </header>

          <div className="text-[17px] leading-[1.8] text-fg-soft md:text-lg">
            <Content />
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-5 rounded-[20px] p-7 glass">
            <div>
              <b className="block text-[17px]">Still stuck?</b>
              <p className="text-[15px] text-muted">Ask your question. We&apos;ll answer it, maybe in the next video.</p>
            </div>
            <ButtonLink href="/ask">
              Ask Aditya <ArrowRight />
            </ButtonLink>
          </div>
        </article>
        <aside className="hidden pt-14 xl:block">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </>
  );
}

/* Reading the slug happens inside Suspense, so in-app navigation can show the page frame instantly. */
export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PostContent params={params} />
    </Suspense>
  );
}
