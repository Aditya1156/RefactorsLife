import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-8 place-items-center rounded-[10px] bg-linear-140 from-accent to-indigo font-mono text-[13px] font-semibold text-white shadow-[0_6px_16px_-6px_rgb(37_99_235/0.6),inset_0_1px_0_rgb(255_255_255/0.35)]",
        className,
      )}
      aria-hidden
    >
      R/
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="RefactorsLife home"
      className={cn("inline-flex shrink-0 items-center gap-2.5 text-[17px] font-semibold tracking-[-0.02em]", className)}
    >
      <LogoMark />
      <span>
        Refactors<span className="font-medium text-accent">Life</span>
      </span>
    </Link>
  );
}
