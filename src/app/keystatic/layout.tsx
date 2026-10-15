import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { editorEnabled } from "@/lib/keystatic";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = { title: "Content editor", robots: { index: false, follow: false } };

/* The Keystatic editor. Locally it edits files directly; in production it needs GitHub storage (see README). */
export default function KeystaticLayout() {
  if (!editorEnabled()) notFound();
  return <KeystaticApp />;
}
