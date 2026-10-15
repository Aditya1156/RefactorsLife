import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Content edited in Keystatic is read from these files at runtime too.
  outputFileTracingIncludes: { "/**": ["./src/content/**/*"] },
  images: {
    // YouTube thumbnails
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({
  options: {
    // Plugins are passed by name so they work with Turbopack.
    remarkPlugins: ["remark-frontmatter"],
    rehypePlugins: ["rehype-slug", ["rehype-pretty-code", { theme: "github-dark-dimmed", keepBackground: false }]],
  },
});

export default withMDX(nextConfig);
