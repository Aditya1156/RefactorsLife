import { site } from "@/content/site";
import { getPaths, getPosts, getResources } from "@/lib/content";
import { getVideos } from "@/lib/youtube";
import { Background } from "@/components/layout/background";
import { CommandMenu, type SearchItem } from "@/components/layout/command-menu";
import { Providers } from "@/components/layout/providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Spotlight } from "@/components/ui/spotlight";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  founder: { "@type": "Person", name: site.host.name },
  sameAs: Object.values(site.socials).filter((u) => !u.includes("/+")),
};

/** Everything the ⌘K search can find. */
async function searchIndex(): Promise<SearchItem[]> {
  const [videos, posts, resources, paths] = await Promise.all([getVideos(), getPosts(), getResources(), getPaths()]);
  return [
    { group: "Pages", title: "Home", href: "/" },
    ...site.nav.map((n) => ({ group: "Pages" as const, title: n.label, href: n.href })),
    { group: "Pages", title: "Team", hint: "The people behind the videos", href: "/team" },
    { group: "Pages", title: "Work with us", hint: "Brands, colleges, podcast guests", href: "/collab" },
    ...paths.map((p) => ({ group: "Learn" as const, title: p.title, hint: `${p.steps.length} videos · ${p.level}`, href: `/learn/${p.slug}` })),
    ...posts.map((p) => ({ group: "Blog" as const, title: p.title, hint: p.excerpt, href: `/blog/${p.slug}` })),
    ...resources.map((r) => ({
      group: "Resources" as const,
      title: r.title,
      hint: r.soon ? "Coming soon" : r.kind,
      href: r.soon ? "/resources" : `/resources/${r.slug}`,
    })),
    ...videos.map((v) => ({ group: "Videos" as const, title: v.title, hint: v.duration, videoId: v.id })),
  ];
}

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const items = await searchIndex();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Background />
      <Spotlight />
      <Providers>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <CommandMenu items={items} />
      </Providers>
    </>
  );
}
