import { Icon } from "@/components/ui/icon";
import type { Perk } from "@/content/types";
import { Reveal } from "@/components/ui/reveal";

/** Numbered process steps (01, 02, …). */
export function Steps({ steps }: { steps: [title: string, text: string][] }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map(([title, text], i) => (
        <Reveal as="li" key={title} delay={i * 0.06} className="spotlight relative rounded-[20px] p-6.5 glass">
          <span className="mb-4.5 grid size-9 place-items-center rounded-xl bg-accent/8 font-mono text-[12.5px] font-medium text-accent">
            0{i + 1}
          </span>
          <h3 className="mb-1.5 text-[17px] tracking-[-0.02em]">{title}</h3>
          <p className="text-[14.5px] text-muted">{text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function Perks({ perks }: { perks: Perk[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {perks.map((p, i) => (
        <Reveal key={p.title} delay={i * 0.05} className="spotlight relative rounded-[20px] p-7 glass">
          <span className="mb-5.5 grid size-11.5 place-items-center rounded-[14px] bg-accent/8 text-accent">
            <Icon name={p.icon} className="size-5.5" />
          </span>
          <h3 className="mb-2 text-xl tracking-[-0.025em]">{p.title}</h3>
          <p className="text-[15.5px] text-muted">{p.text}</p>
        </Reveal>
      ))}
    </div>
  );
}
