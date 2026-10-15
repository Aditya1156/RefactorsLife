import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageSkeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { getResources } from "@/lib/content";
import { PrintButton } from "@/components/resources/print-button";
import { ResourceDoc } from "@/components/resources/resource-doc";

const getPrintable = async (slug: string) => (await getResources()).find((r) => r.slug === slug && !r.soon && r.sections.length > 0);

export async function generateStaticParams() {
  return (await getResources()).filter((r) => !r.soon && r.sections.length > 0).map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const r = await getPrintable((await params).slug);
  return r ? { title: `${r.title} (free, printable)`, description: r.text } : {};
}

async function ResourceContent({ params }: { params: Promise<{ slug: string }> }) {
  const resource = await getPrintable((await params).slug);
  if (!resource) notFound();

  return (
    <div className="container-rl max-w-[calc(980px+2.5rem)] pb-20">
      <div className="no-print mt-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/resources" className="inline-flex items-center gap-1.5 text-[14.5px] text-muted hover:text-accent">
          <ArrowLeft className="size-4" /> All resources
        </Link>
        <PrintButton />
      </div>
      <ResourceDoc resource={resource} />
    </div>
  );
}

/* Reading the slug happens inside Suspense, so in-app navigation can show the page frame instantly. */
export default function ResourcePage({ params }: PageProps<"/resources/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ResourceContent params={params} />
    </Suspense>
  );
}
