"use server";

import { z } from "zod";
import { site } from "@/content/site";
import { formSchemas, type FormName, type FormState } from "./forms";

/**
 * One Server Action for every form. It validates the fields, then forwards the
 * submission to FORMS_ENDPOINT (a Google Apps Script web app or Formspree).
 * The endpoint stays on the server, so it never ships to the browser.
 */
export async function submitForm(_prev: FormState, formData: FormData): Promise<FormState> {
  const form = String(formData.get("form")) as FormName;
  const schema: z.ZodType<Record<string, unknown>> | undefined = formSchemas[form];
  if (!schema) return { ok: false, message: "Unknown form." };

  // Honeypot field: real people never fill it in.
  if (formData.get("_gotcha")) return { ok: true };

  const raw = Object.fromEntries([...formData.entries()].filter(([k]) => !k.startsWith("$") && k !== "form" && k !== "_gotcha"));
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: "Please fix the highlighted fields.", errors: z.flattenError(parsed.error).fieldErrors };
  }

  const payload = { form, ...parsed.data, submittedAt: new Date().toISOString() };
  const endpoint = process.env.FORMS_ENDPOINT;

  if (!endpoint) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[forms] ${form} submission (set FORMS_ENDPOINT to store it):`, payload);
      return { ok: true };
    }
    return { ok: false, message: `Forms aren't connected yet. Please email us at ${site.email}.` };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Endpoint responded ${res.status}`);
    return { ok: true };
  } catch (err) {
    console.error(`[forms] ${form} failed:`, err);
    return { ok: false, message: `Couldn't send that. Please try again, or email ${site.email}.` };
  }
}
