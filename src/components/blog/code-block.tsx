"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Dark code block with a language label and a copy button. */
export function CodeBlock({ className, children, ...props }: ComponentProps<"pre"> & { "data-language"?: string }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const language = props["data-language"];

  const copy = async () => {
    await navigator.clipboard.writeText(ref.current?.innerText.trim() ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="group relative my-6">
      <pre
        ref={ref}
        className={cn(
          "overflow-x-auto rounded-[18px] bg-ink py-5.5 font-mono text-[14.5px] leading-[1.7] text-slate-200 shadow-glass-lg [&_code]:rounded-none [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[length:inherit] [&_code]:text-slate-200",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
      <div className="absolute top-2.5 right-2.5 flex items-center gap-2">
        {language && <span className="font-mono text-[11px] tracking-wide text-slate-500 uppercase">{language}</span>}
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 opacity-70 transition group-hover:opacity-100 hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
        </button>
      </div>
    </div>
  );
}
