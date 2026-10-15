import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-linear-to-b from-blue-500 to-accent text-white shadow-btn hover:-translate-y-px hover:shadow-btn-lg",
  ghost: "border border-line-strong bg-white/70 text-fg backdrop-blur-xl hover:border-accent/30 hover:bg-white hover:text-accent",
  dark: "bg-ink text-white shadow-[0_8px_20px_-10px_rgb(15_23_42/0.6)] hover:-translate-y-px hover:bg-slate-800 [&_.yt]:text-yt",
};

const sizes: Record<Size, string> = {
  sm: "h-9.5 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-6.5 text-base",
};

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ease-soft active:translate-y-px disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4.5 [&_svg]:shrink-0",
    variants[variant],
    sizes[size],
    className,
  );
}

type Common = { variant?: Variant; size?: Size };

export function Button({ variant, size, className, ...props }: Common & ComponentProps<"button">) {
  return <button type="button" className={buttonClasses({ variant, size, className })} {...props} />;
}

/** Internal links use next/link; external links open in a new tab. */
export function ButtonLink({ variant, size, className, href, ...props }: Common & ComponentProps<"a"> & { href: string }) {
  const cls = buttonClasses({ variant, size, className });
  if (/^(https?:|mailto:)/.test(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props} />;
  }
  return <Link href={href} className={cls} {...props} />;
}
