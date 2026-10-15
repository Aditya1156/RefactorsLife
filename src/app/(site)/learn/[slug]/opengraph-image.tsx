import { getPaths } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "RefactorsLife learning path";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return (await getPaths()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = (await getPaths()).find((p) => p.slug === slug);
  return renderOg({
    eyebrow: `Learning path · ${path?.level ?? "Free"}`,
    title: path?.title ?? "Learning paths",
    subtitle: `${path?.steps.length ?? 0} videos · free`,
  });
}
