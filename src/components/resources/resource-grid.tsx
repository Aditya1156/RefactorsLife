"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Play } from "lucide-react";
import { startTransition, useActionState, useEffect, useState, useSyncExternalStore } from "react";
import type { Resource } from "@/content/types";
import { submitForm } from "@/lib/actions";
import type { FormState } from "@/lib/forms";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/button";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import { IconTile } from "@/components/ui/icon";
import { Tag } from "@/components/ui/primitives";
import { usePlayVideo } from "@/components/video/video-player";
import { Honeypot } from "@/components/forms/fields";

/* One signup unlocks every resource. Only a flag is stored in the browser, never the email. */
const KEY = "rl-unlocked";
const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  window.addEventListener("rl:unlocked", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("rl:unlocked", cb);
  };
};
const readUnlocked = () => {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};
const markUnlocked = () => {
  try {
    localStorage.setItem(KEY, "1");
  } catch {}
  window.dispatchEvent(new Event("rl:unlocked"));
};
const useUnlocked = () => useSyncExternalStore(subscribe, readUnlocked, () => false);

export function ResourceGrid({ resources }: { resources: Resource[] }) {
  const unlocked = useUnlocked();
  const [open, setOpen] = useState<Resource | null>(null);
  const play = usePlayVideo();

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => (
          <div key={r.slug} className="spotlight relative flex flex-col gap-2.5 rounded-[20px] p-7 glass">
            <div className="mb-2 flex items-start justify-between gap-3">
              <IconTile name={r.icon} tone={r.tone} />
              <Tag>{r.kind}</Tag>
            </div>
            <h3 className="text-xl tracking-[-0.025em]">{r.title}</h3>
            <p className="text-[15.5px] text-muted">{r.text}</p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-4.5">
              {r.soon ? (
                <button type="button" onClick={() => setOpen(r)} className={buttonClasses({ variant: "ghost", size: "sm" })}>
                  Coming soon · Notify me
                </button>
              ) : unlocked ? (
                <Link href={`/resources/${r.slug}`} className={buttonClasses({ size: "sm" })}>
                  Open <ArrowRight />
                </Link>
              ) : (
                <button type="button" onClick={() => setOpen(r)} className={buttonClasses({ size: "sm" })}>
                  Get it free <ArrowRight />
                </button>
              )}
              {r.video && (
                <button
                  type="button"
                  onClick={() => play(r.video!, r.title)}
                  className="inline-flex items-center gap-1.5 text-[15px] font-medium text-accent hover:text-accent-strong"
                >
                  <Play className="size-3.5 fill-current" /> Video
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!open} onClose={() => setOpen(null)} label={open?.title ?? "Resource"} className="max-w-110">
        {open && <UnlockCard key={open.slug} resource={open} onClose={() => setOpen(null)} />}
      </Dialog>
    </>
  );
}

function UnlockCard({ resource, onClose }: { resource: Resource; onClose: () => void }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitForm, { ok: false });
  // Free resources unlock even if storing the email fails; only typos (validation errors) block.
  const done = state.ok || (!resource.soon && !!state.message && !state.errors);

  useEffect(() => {
    if (done && !resource.soon) markUnlocked();
  }, [done, resource.soon]);

  return (
    <div className="relative rounded-[28px] bg-white/92! p-7 shadow-glass-lg glass md:p-9">
      <DialogClose onClose={onClose} className="absolute top-3.5 right-3.5" />
      {done ? (
        <div className="grid justify-items-center gap-3 pt-3 text-center" role="status">
          <span className="grid size-15 place-items-center rounded-full bg-accent/8 text-accent ring-8 ring-accent/5">
            <Check className="size-6.5" />
          </span>
          <h3 className="text-[22px]">{resource.soon ? "You're on the list!" : "Unlocked. Enjoy!"}</h3>
          <p className="text-muted">
            {resource.soon ? "We'll email you as soon as it's ready." : "Every other free resource is unlocked for you too."}
          </p>
          {!resource.soon && (
            <Link href={`/resources/${resource.slug}`} className={buttonClasses({ className: "mt-2" })}>
              Open resource <ArrowUpRight />
            </Link>
          )}
        </div>
      ) : (
        <>
          <IconTile name={resource.icon} tone={resource.tone} className="mb-3.5" />
          <h3 className="mb-2 pr-10 text-[22px]">{resource.title}</h3>
          <p className="text-muted">
            {resource.soon ? "This one's still being made. Leave your email and we'll send it the day it's ready." : resource.text}
          </p>
          <form
            noValidate
            className="mt-5.5 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              startTransition(() => action(data));
            }}
          >
            <input type="hidden" name="form" value="resources" />
            <input type="hidden" name="resource" value={resource.slug} />
            <input type="hidden" name="waitlist" value={resource.soon ? "yes" : "no"} />
            <Honeypot />
            <label className="grid gap-2 text-sm font-medium">
              Email
              <input
                type="email"
                name="email"
                autoFocus
                autoComplete="email"
                placeholder="you@college.edu"
                aria-invalid={!!state.errors?.email || undefined}
                className="h-12 rounded-[14px] border border-line-strong bg-white px-3.5 text-[15px] font-normal outline-none focus:border-accent focus:ring-4 focus:ring-accent/16 aria-invalid:border-red-400"
              />
              {state.errors?.email && <span className="text-[13px] font-normal text-red-600">{state.errors.email[0]}</span>}
            </label>
            <label className="grid gap-2 text-sm font-medium">
              <span>
                Name <span className="font-normal text-muted">(optional)</span>
              </span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                className="h-12 rounded-[14px] border border-line-strong bg-white px-3.5 text-[15px] font-normal outline-none focus:border-accent focus:ring-4 focus:ring-accent/16"
              />
            </label>
            {resource.soon && state.message && !state.errors && <p className="text-sm text-red-600">{state.message}</p>}
            <button type="submit" disabled={pending} className={cn(buttonClasses({}), "w-full")}>
              {pending ? "Sending…" : resource.soon ? "Notify me" : "Unlock free"} {!pending && <ArrowRight />}
            </button>
            <p className="text-[13px] text-muted">You&apos;ll also get The Refactor newsletter. Unsubscribe anytime.</p>
          </form>
        </>
      )}
    </div>
  );
}
