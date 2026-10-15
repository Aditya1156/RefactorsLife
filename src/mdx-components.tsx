import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { VideoTrigger } from "@/components/video/video-player";
import { CodeBlock } from "@/components/blog/code-block";

/* Styles and custom components available in every .mdx file. */

function A({ href = "", ...props }: ComponentProps<"a">) {
  const cls = "text-accent underline decoration-accent/35 decoration-1 underline-offset-3 hover:decoration-accent";
  if (href.startsWith("/")) return <Link href={href} className={cls} {...props} />;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props} />;
}

/** <YouTube id="…" title="…" /> — responsive embed in a white glass frame. */
function YouTube({ id, title }: { id: string; title: string }) {
  return (
    <div className="my-8 aspect-video overflow-hidden rounded-[20px] border-6 border-white/80 bg-ink shadow-glass-lg">
      <iframe
        className="size-full rounded-[14px]"
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

/** <Callout>…</Callout> — soft blue note box. */
function Callout({ children }: { children: ReactNode }) {
  return <div className="my-6 rounded-2xl border border-accent/18 bg-blue-100/60 px-5 py-4 text-base text-fg [&_p]:m-0">{children}</div>;
}

/** <VideoLink id="…" title="…">text</VideoLink> — opens a video in the site's player. */
function VideoLink({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <VideoTrigger
      id={id}
      title={title}
      className="cursor-pointer text-accent underline decoration-accent/35 underline-offset-3 hover:decoration-accent"
    >
      {children}
    </VideoTrigger>
  );
}

const components: MDXComponents = {
  h2: (p) => <h2 className="mt-14 mb-4 scroll-mt-28 text-[28px] tracking-[-0.03em]" {...p} />,
  h3: (p) => <h3 className="mt-10 mb-3 scroll-mt-28 text-[21px]" {...p} />,
  p: (p) => <p className="my-5" {...p} />,
  a: A,
  strong: (p) => <strong className="font-semibold text-fg" {...p} />,
  ul: (p) => <ul className="my-5 list-disc space-y-2 pl-5.5 marker:text-accent" {...p} />,
  ol: (p) => <ol className="my-5 list-decimal space-y-2 pl-5.5 marker:text-accent" {...p} />,
  blockquote: (p) => (
    <blockquote
      className="my-7 rounded-r-2xl border-l-3! border-l-accent! px-5.5 py-4.5 text-[19px] font-medium text-fg glass-flat [&_p]:m-0"
      {...p}
    />
  ),
  code: (p) => <code className="rounded-[7px] bg-accent/8 px-1.75 py-0.5 font-mono text-[0.85em] text-accent-strong" {...p} />,
  pre: CodeBlock,
  YouTube,
  Callout,
  VideoLink,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
