"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Glass modal built on the native <dialog> element:
 * focus trapping, Esc-to-close and the top layer come from the browser.
 */
export function Dialog({
  open,
  onClose,
  children,
  className,
  label,
  tone = "light",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  label: string;
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={cn(
        "m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-visible bg-transparent p-0 open:animate-pop",
        "backdrop:backdrop-blur-lg backdrop:backdrop-saturate-150",
        tone === "dark" ? "backdrop:bg-slate-900/55" : "backdrop:bg-slate-200/55",
        className,
      )}
    >
      {open && children}
    </dialog>
  );
}

export function DialogClose({ onClose, className, dark }: { onClose: () => void; className?: string; dark?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className={cn(
        "grid size-10 place-items-center rounded-full border transition-colors",
        dark ? "border-transparent bg-white/85 text-fg hover:bg-white" : "border-line bg-white/70 text-fg-soft hover:bg-white hover:text-fg",
        className,
      )}
    >
      <X className="size-4.5" />
    </button>
  );
}
