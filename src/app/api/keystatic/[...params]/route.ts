import { revalidateTag } from "next/cache";
import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";
import { CONTENT_TAG } from "@/lib/content";
import { editorEnabled } from "@/lib/keystatic";

const handler = makeRouteHandler({ config });
const disabled = () => new Response("Not found", { status: 404 });

export const GET = (...args: Parameters<typeof handler.GET>) => (editorEnabled() ? handler.GET(...args) : disabled());

export async function POST(...args: Parameters<typeof handler.POST>) {
  if (!editorEnabled()) return disabled();
  const res = await handler.POST(...args);
  // A save just changed files in src/content: drop the cached copies so the site shows the edit.
  if (res.ok) revalidateTag(CONTENT_TAG, { expire: 0 });
  return res;
}
