"use client";

import { Check } from "lucide-react";
import { startTransition, useActionState, useState, type ReactNode } from "react";
import { submitForm } from "@/lib/actions";
import type { FormName, FormState } from "@/lib/forms";
import { cn } from "@/lib/utils";
import { FieldErrors, Honeypot, Pending } from "./fields";

type ShellProps = {
  form: FormName;
  children: ReactNode;
  successTitle: string;
  successText: string;
  successIcon?: ReactNode;
  againLabel?: string;
  className?: string;
};

/**
 * Glass form card wired to the shared Server Action.
 * Shows field errors inline and swaps to a success panel when sent.
 */
export function FormShell(props: ShellProps) {
  // Bumping the key remounts the form, which resets its fields and state.
  const [round, setRound] = useState(0);
  return <FormInner key={round} {...props} onAgain={() => setRound((r) => r + 1)} />;
}

function FormInner({
  form,
  children,
  successTitle,
  successText,
  successIcon,
  againLabel = "Send another",
  className,
  onAgain,
}: ShellProps & { onAgain: () => void }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitForm, { ok: false });

  return (
    <div className={cn("rounded-[28px] p-6 shadow-glass-lg glass md:p-9", className)}>
      {state.ok ? (
        <div className="grid justify-items-center gap-3 px-3 py-10 text-center" role="status">
          <span className="grid size-15 place-items-center rounded-full bg-accent/8 text-accent ring-8 ring-accent/5">
            {successIcon ?? <Check className="size-6.5" />}
          </span>
          <h3 className="text-[22px]">{successTitle}</h3>
          <p className="max-w-95 text-muted">{successText}</p>
          <button
            type="button"
            onClick={onAgain}
            className="mt-2 rounded-full border border-line-strong bg-white/70 px-4 py-2 text-sm hover:bg-white"
          >
            {againLabel}
          </button>
        </div>
      ) : (
        <FieldErrors value={state.errors ?? {}}>
          <Pending value={pending}>
            {/* Submitting via a transition (not the `action` prop) keeps what people typed if validation fails. */}
            <form
              noValidate
              className="grid gap-4.5"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                startTransition(() => action(data));
              }}
            >
              <input type="hidden" name="form" value={form} />
              <Honeypot />
              {children}
              {state.message && (
                <p className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700" role="alert">
                  {state.message}
                </p>
              )}
            </form>
          </Pending>
        </FieldErrors>
      )}
    </div>
  );
}
