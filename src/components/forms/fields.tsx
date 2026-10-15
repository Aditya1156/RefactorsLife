"use client";

import { Star } from "lucide-react";
import { createContext, useContext, useId, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/button";

/* Validation errors from the Server Action, keyed by field name. */
export const FieldErrors = createContext<Record<string, string[] | undefined>>({});
/* Whether the surrounding form is currently submitting. */
export const Pending = createContext(false);

const control =
  "w-full rounded-[14px] border border-line-strong bg-white/85 px-3.5 py-3 text-[15px] outline-none transition placeholder:text-slate-400 hover:border-accent/30 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/16 aria-invalid:border-red-400";

export function Field({
  label,
  name,
  optional,
  hint,
  children,
  className,
}: {
  label: ReactNode;
  name: string;
  optional?: string;
  hint?: ReactNode;
  children: (id: string, invalid: boolean) => ReactNode;
  className?: string;
}) {
  const id = useId();
  const error = useContext(FieldErrors)[name]?.[0];
  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted">({optional})</span>}
      </label>
      {children(id, !!error)}
      {error ? <p className="text-[13px] text-red-600">{error}</p> : hint && <p className="text-[13px] text-muted">{hint}</p>}
    </div>
  );
}

export function TextField({
  label,
  optional,
  hint,
  className,
  ...props
}: { label: ReactNode; optional?: string; hint?: ReactNode; name: string } & ComponentProps<"input">) {
  return (
    <Field label={label} name={props.name} optional={optional} hint={hint} className={className}>
      {(id, invalid) => <input id={id} type="text" aria-invalid={invalid || undefined} className={control} {...props} />}
    </Field>
  );
}

export function TextArea({
  label,
  optional,
  maxLength = 1000,
  ...props
}: { label: ReactNode; optional?: string; name: string } & ComponentProps<"textarea">) {
  const [count, setCount] = useState(0);
  return (
    <Field label={label} name={props.name} optional={optional} hint={`${count} / ${maxLength}`}>
      {(id, invalid) => (
        <textarea
          id={id}
          maxLength={maxLength}
          aria-invalid={invalid || undefined}
          onChange={(e) => setCount(e.target.value.length)}
          className={cn(control, "min-h-32 resize-y leading-normal")}
          {...props}
        />
      )}
    </Field>
  );
}

export function SelectField({
  label,
  options,
  placeholder,
  ...props
}: { label: ReactNode; options: (string | { value: string; label: string })[]; placeholder: string; name: string } & ComponentProps<"select">) {
  return (
    <Field label={label} name={props.name}>
      {(id, invalid) => (
        <select
          id={id}
          defaultValue=""
          aria-invalid={invalid || undefined}
          className={cn(
            control,
            "appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2216%22_height=%2216%22_fill=%22none%22_stroke=%22%2364748b%22_stroke-width=%222%22_viewBox=%220_0_24_24%22%3E%3Cpath_d=%22m6_9_6_6_6-6%22/%3E%3C/svg%3E')] bg-position-[right_14px_center] bg-no-repeat pr-10",
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => {
            const opt = typeof o === "string" ? { value: o, label: o } : o;
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      )}
    </Field>
  );
}

/** Pill-style radio group. */
export function Segmented({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: (string | { value: string; label: string })[];
  defaultValue?: string;
}) {
  const id = useId();
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <fieldset className="grid gap-2">
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {opts.map((o, i) => (
          <label key={o.value} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.value}
              defaultChecked={(defaultValue ?? opts[0].value) === o.value}
              id={`${id}-${i}`}
              className="peer sr-only"
            />
            <span className="inline-block rounded-full border border-line-strong bg-white/70 px-3.75 py-2 text-sm text-fg-soft transition-all peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-checked:shadow-[0_6px_14px_-6px_rgb(37_99_235/0.6)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-accent/35">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Check({
  name,
  children,
  defaultChecked,
  required,
}: {
  name: string;
  children: ReactNode;
  defaultChecked?: boolean;
  required?: boolean;
}) {
  const error = useContext(FieldErrors)[name]?.[0];
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-2.5 text-[14.5px] text-fg-soft">
        <input
          type="checkbox"
          name={name}
          value="yes"
          defaultChecked={defaultChecked}
          required={required}
          className="mt-0.5 size-4.5 shrink-0 accent-accent"
        />
        {children}
      </label>
      {error && <p className="mt-1 text-[13px] text-red-600">{error}</p>}
    </div>
  );
}

export function StarRating({ name, label }: { name: string; label: string }) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);
  const error = useContext(FieldErrors)[name]?.[0];
  const shown = hover || value;
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div className="flex w-fit gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className="cursor-pointer" onMouseEnter={() => setHover(n)}>
            <input type="radio" name={name} value={n} className="peer sr-only" onChange={() => setValue(n)} />
            <span className="sr-only">
              {n} star{n > 1 && "s"}
            </span>
            <Star
              className={cn(
                "size-7.5 transition-all peer-focus-visible:outline-2 peer-focus-visible:outline-accent hover:scale-110",
                n <= shown ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200",
              )}
            />
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-[13px] text-red-600">{error}</p>}
    </fieldset>
  );
}

export function SubmitButton({ children, className, size = "lg" }: { children: ReactNode; className?: string; size?: "md" | "lg" }) {
  const pending = useContext(Pending);
  return (
    <button type="submit" disabled={pending} className={buttonClasses({ size, className: cn("justify-self-start", className) })}>
      {pending ? "Sending…" : children}
    </button>
  );
}

/** Hidden honeypot input — bots fill it, people never see it. */
export const Honeypot = () => <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />;
