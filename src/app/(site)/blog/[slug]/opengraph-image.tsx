import { getPosts } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "RefactorsLife blog post";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  return renderOg({ eyebrow: `Blog · ${post?.tag ?? "Guide"}`, title: post?.title ?? "RefactorsLife blog", subtitle: post?.read });
}
