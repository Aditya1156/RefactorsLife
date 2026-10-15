import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getPaths, getPosts, getResources } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, resources, paths] = await Promise.all([getPosts(), getResources(), getPaths()]);
  const pages = ["", "/videos", "/learn", "/resources", "/blog", "/hall-of-fame", "/ask", "/team", "/careers", "/collab"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  return [
    ...pages,
    ...paths.map((p) => ({ url: `${site.url}/learn/${p.slug}`, priority: 0.8 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date, priority: 0.8 })),
    ...resources.filter((r) => !r.soon && r.sections.length > 0).map((r) => ({ url: `${site.url}/resources/${r.slug}`, priority: 0.8 })),
  ];
}
