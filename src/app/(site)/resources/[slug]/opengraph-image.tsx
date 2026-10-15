import { getResources } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free resource from RefactorsLife";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return (await getResources()).filter((r) => !r.soon && r.sections.length > 0).map((r) => ({ slug: r.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = (await getResources()).find((x) => x.slug === slug);
  return renderOg({
    eyebrow: `Free ${r?.kind.split(" ·")[0].toLowerCase() ?? "resource"}`,
    title: r?.title ?? "Free resources",
    subtitle: "Printable · free forever",
  });
}
