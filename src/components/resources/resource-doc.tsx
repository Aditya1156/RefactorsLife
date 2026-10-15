import { Fragment } from "react";
import type { Resource } from "@/content/types";
import { Eyebrow } from "@/components/ui/primitives";
import { LogoMark } from "@/components/layout/logo";

/** Turns "**bold** text" into <b>bold</b> text. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith("**") ? (
          <b key={i} className="font-semibold text-fg">
            {part.slice(2, -2)}
          </b>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Printable one-page resource rendered from data in src/content/resources.ts. */
export function ResourceDoc({ resource: doc }: { resource: Resource }) {
  return (
    <article className="print-plain my-6 rounded-[28px] p-5 glass md:p-11">
      <header className="mb-7 flex flex-wrap items-start justify-between gap-5 border-b border-line pb-6">
        <div>
          <Eyebrow>{doc.eyebrow}</Eyebrow>
          <h1 className="mt-3 text-[clamp(28px,4vw,40px)] tracking-[-0.04em]">{doc.title}</h1>
          <p className="mt-2 max-w-140 text-muted">{doc.intro}</p>
        </div>
        <span className="flex items-center gap-2 text-[13px] text-muted">
          <LogoMark className="size-6 rounded-[7px] text-[10px]" />
          refactorslife.in
        </span>
      </header>

      <div className="grid gap-x-9 gap-y-7 md:grid-cols-2">
        {doc.sections.map((s) => (
          <section key={s.title} className="print-avoid">
            <h3 className="mb-2.5 flex items-center gap-2 text-[15px] tracking-[-0.01em] text-accent">
              {s.title}
              {s.note && <span className="font-mono text-[11.5px] font-medium text-muted">{s.note}</span>}
            </h3>
            {s.list.discriminant === "commands" ? (
              <dl className="grid gap-1.75">
                {s.list.value.map(({ command: cmd, meaning }) => (
                  <div key={cmd} className="grid gap-1 text-sm sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] sm:items-baseline sm:gap-3">
                    <dt>
                      <code className="rounded-[7px] bg-accent/8 px-2 py-0.75 font-mono text-[12.5px] break-words text-accent-strong">{cmd}</code>
                    </dt>
                    <dd className="text-fg-soft">{meaning}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <ul className="grid gap-2 text-[14.5px] text-fg-soft">
                {s.list.value.map((item) => (
                  <li
                    key={item}
                    className="relative pl-7 before:absolute before:top-0.75 before:left-0 before:size-4 before:rounded-[5px] before:border-[1.5px] before:border-accent/45 before:bg-white"
                  >
                    <Rich text={item} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <footer className="mt-8 flex flex-wrap justify-between gap-4 border-t border-line pt-5 text-[13px] text-muted">
        <span>{doc.footLeft}</span>
        <span>{doc.footRight}</span>
      </footer>
    </article>
  );
}
