import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Frosted glass card. Pass `hover` for the lift effect on interactive cards. */
export function Card({ className, hover, ...props }: ComponentProps<"div"> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "relative rounded-[20px] p-7 glass",
        hover && "spotlight transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-glass-lg",
        className,
      )}
      {...props}
    />
  );
}

/** Small glass pill label above headings. */
export function Eyebrow({ children, tone = "blue", className }: { children: ReactNode; tone?: "blue" | "sky"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full py-1.5 pr-3.5 pl-3 text-[13px] font-medium text-fg-soft glass-flat",
        className,
      )}
    >
      <span className={cn("size-1.75 rounded-full", tone === "blue" ? "bg-accent ring-3 ring-accent/10" : "bg-sky ring-3 ring-sky/15")} />
      {children}
    </span>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex w-fit rounded-full border border-line bg-white/80 px-2.75 py-1 text-[12.5px] text-fg-soft", className)}>
      {children}
    </span>
  );
}

/** Page section with consistent vertical rhythm. */
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("relative py-18 md:py-26", className)} {...props} />;
}

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("container-rl", className)} {...props} />;
}

export function SectionHeader({
  eyebrow,
  title,
  text,
  action,
  center,
  eyebrowTone,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  text?: ReactNode;
  action?: ReactNode;
  center?: boolean;
  eyebrowTone?: "blue" | "sky";
}) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-11", center && "justify-center text-center")}>
      <div className={cn("grid max-w-160 gap-3.5", center && "justify-items-center")}>
        <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
        <h2 className="text-[clamp(30px,4vw,46px)] tracking-[-0.04em]">{title}</h2>
        {text && <p className="text-[17px] text-muted">{text}</p>}
      </div>
      {action}
    </div>
  );
}

export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-1.5 text-[15px] font-medium text-accent hover:text-accent-strong", className)}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.75" aria-hidden />
    </Link>
  );
}

/** Centered hero for inner pages, with a faded blue grid behind it. */
export function PageHero({ eyebrow, title, text, children }: { eyebrow?: ReactNode; title: ReactNode; text?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative pt-12 pb-7 md:pt-18 md:pb-12">
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" aria-hidden />
      <div className="relative container-rl grid max-w-[calc(860px+2.5rem)] justify-items-center gap-4.5 text-center">
        {eyebrow && (typeof eyebrow === "string" ? <Eyebrow>{eyebrow}</Eyebrow> : eyebrow)}
        <h1 className="text-[clamp(38px,5.4vw,62px)] tracking-[-0.045em]">{title}</h1>
        {text && <p className="max-w-155 text-[clamp(17px,1.6vw,19px)] text-fg-soft">{text}</p>}
        {children}
      </div>
    </section>
  );
}

/** Highlighted gradient words inside headings. */
export const Grad = ({ children }: { children: ReactNode }) => <span className="text-grad">{children}</span>;

/** Soft blue glass call-to-action panel. */
export function CtaPanel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative grid items-center gap-10 overflow-hidden rounded-[28px] p-7.5 glass md:p-14 lg:grid-cols-[1.1fr_0.9fr]",
        "bg-[radial-gradient(90%_120%_at_0%_0%,rgb(96_165_250/0.22),transparent_55%),radial-gradient(80%_120%_at_100%_100%,rgb(129_140_248/0.2),transparent_55%),linear-gradient(180deg,rgb(255_255_255/0.82),rgb(255_255_255/0.58))]",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyState({ icon, title, children, className }: { icon?: ReactNode; title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid justify-items-center gap-2 rounded-[20px] border-dashed border-accent/25! px-6 py-14 text-center text-muted glass",
        className,
      )}
    >
      {icon}
      <b className="text-[17px] text-fg">{title}</b>
      {children && <span>{children}</span>}
    </div>
  );
}
