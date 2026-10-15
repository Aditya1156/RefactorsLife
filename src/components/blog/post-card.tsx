import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/content/types";
import { formatDate, thumbnail } from "@/lib/utils";

export function PostMetaLine({ post }: { post: Pick<Post, "tag" | "read"> & { date?: string } }) {
  return (
    <p className="flex flex-wrap items-center gap-2.5 text-[13px] text-muted">
      <span className="font-medium text-accent">{post.tag}</span>
      <span className="size-0.75 rounded-full bg-slate-300" />
      {post.date && (
        <>
          <span>{post.date}</span>
          <span className="size-0.75 rounded-full bg-slate-300" />
        </>
      )}
      <span>{post.read}</span>
    </p>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group spotlight relative flex h-full flex-col gap-3.5 overflow-hidden rounded-[20px] p-2.5 glass transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-glass-lg"
    >
      <div className="relative aspect-video overflow-hidden rounded-[14px] bg-slate-200">
        <Image
          src={thumbnail(post.video, "maxresdefault")}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
        />
      </div>
      <div className="grid gap-2.5 px-4 pt-1.5 pb-4.5">
        <PostMetaLine post={{ ...post, date: formatDate(post.date) }} />
        <h3 className="text-[19px] leading-snug">{post.title}</h3>
        <p className="text-[15.5px] text-muted">{post.excerpt}</p>
      </div>
    </Link>
  );
}
