"use client";

import { Heart, Trophy } from "lucide-react";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { winTypes } from "@/content/site";
import type { Role } from "@/content/types";
import { submitForm } from "@/lib/actions";
import type { FormState } from "@/lib/forms";
import { buttonClasses } from "@/components/ui/button";
import { Check, Honeypot, Segmented, SelectField, StarRating, SubmitButton, TextArea, TextField } from "./fields";
import { FormShell } from "./form-shell";

const Row = ({ children }: { children: React.ReactNode }) => <div className="grid gap-4 md:grid-cols-2">{children}</div>;
const Note = ({ children }: { children: React.ReactNode }) => <p className="text-[13px] text-muted">{children}</p>;

export function AskForm() {
  return (
    <FormShell
      form="ask"
      successTitle="Question received!"
      successText="Thanks, it's in the queue. If you left an email, you'll hear back when it's answered."
      againLabel="Ask another"
    >
      <Segmented
        label="Topic"
        name="topic"
        options={["Placements", "Coding & dev", "Hackathons", "College life", "Content creation", "Video request", "Other"]}
      />
      <TextArea label="Your question" name="question" maxLength={1000} placeholder="Be specific: what have you tried, and where are you stuck?" />
      <Row>
        <TextField label="Name" optional="optional" name="name" autoComplete="name" />
        <TextField label="Email" optional="for a reply" name="email" type="email" autoComplete="email" />
      </Row>
      <TextField label="College & year" optional="optional" name="college" placeholder="e.g. 2nd year CSE, tier-3 college" />
      <Check name="anonymous">Keep me anonymous if this is featured in a video</Check>
      <Check name="canFeature" defaultChecked>
        It&apos;s okay to answer this publicly on the channel
      </Check>
      <SubmitButton>Send question</SubmitButton>
    </FormShell>
  );
}

export function ReviewForm() {
  return (
    <FormShell
      form="review"
      successIcon={<Heart className="size-6.5" />}
      successTitle="Thank you!"
      successText="Feedback like this keeps the channel going. Reviews appear on the wall after a quick check."
      againLabel="Write another"
    >
      <StarRating name="rating" label="Your rating" />
      <Segmented label="This is a…" name="kind" options={["Review", "Suggestion", "Bug on the site"]} />
      <TextArea label="Your words" name="text" maxLength={600} placeholder="Which video helped, and how?" />
      <Row>
        <TextField label="Name" name="name" autoComplete="name" />
        <TextField label="College / role" optional="optional" name="meta" placeholder="e.g. B.Tech CSE, 3rd year" />
      </Row>
      <Check name="publish" defaultChecked>
        You can publish this review on the site
      </Check>
      <SubmitButton>Send feedback</SubmitButton>
    </FormShell>
  );
}

export function ApplyForm({ roles }: { roles: Pick<Role, "id" | "title">[] }) {
  const ref = useRef<HTMLDivElement>(null);

  // "Apply for this role" buttons pre-select the role.
  useEffect(() => {
    const pick = (e: Event) => {
      const select = ref.current?.querySelector<HTMLSelectElement>('select[name="role"]');
      if (select) select.value = (e as CustomEvent<string>).detail;
    };
    window.addEventListener("rl:pick-role", pick);
    return () => window.removeEventListener("rl:pick-role", pick);
  }, []);

  return (
    <div ref={ref}>
      <FormShell
        form="apply"
        successTitle="Application received!"
        successText="Thanks for applying. We'll review your work and get back to you within 7 days."
        againLabel="Submit another"
      >
        <Row>
          <TextField label="Full name" name="name" autoComplete="name" />
          <TextField label="Email" name="email" type="email" autoComplete="email" />
        </Row>
        <Row>
          <TextField label="College" name="college" placeholder="e.g. NIT Patna" />
          <SelectField label="Year" name="year" placeholder="Select year" options={["1st year", "2nd year", "3rd year", "4th year", "Graduated"]} />
        </Row>
        <Row>
          <SelectField label="Role" name="role" placeholder="Choose a role" options={roles.map((r) => ({ value: r.id, label: r.title }))} />
          <SelectField label="Hours per week" name="hours" placeholder="Select" options={["Under 5", "5–8", "8–12", "12+"]} />
        </Row>
        <TextField
          label="Portfolio / sample work link"
          name="portfolio"
          type="url"
          placeholder="Drive, Behance, YouTube, GitHub…"
          hint="Make sure the link is viewable by anyone."
        />
        <TextField label="Resume link" optional="optional" name="resume" type="url" placeholder="Google Drive link" />
        <TextArea label="Why RefactorsLife?" name="why" maxLength={800} placeholder="What do you want to learn, and what will you bring?" />
        <TextField label="Phone / WhatsApp" optional="optional" name="phone" type="tel" autoComplete="tel" />
        <SubmitButton>Submit application</SubmitButton>
        <Note>By applying you agree that we can contact you about this role. We never share your details.</Note>
      </FormShell>
    </div>
  );
}

export function CollabForm() {
  return (
    <FormShell form="collab" successTitle="Thanks, we'll be in touch." successText="Expect a reply within 2–3 working days.">
      <Segmented label="I'm reaching out as a…" name="type" options={["Brand", "College / club", "Podcast guest", "Creator", "Other"]} />
      <Row>
        <TextField label="Your name" name="name" autoComplete="name" />
        <TextField label="Work email" name="email" type="email" autoComplete="email" />
      </Row>
      <Row>
        <TextField label="Organisation" optional="optional" name="organisation" placeholder="Company, college or club" />
        <TextField label="Website / profile" optional="optional" name="website" type="url" placeholder="https://" />
      </Row>
      <TextArea label="Details" name="message" maxLength={1500} placeholder="What are you planning, and when?" />
      <SubmitButton>Send enquiry</SubmitButton>
    </FormShell>
  );
}

export function WinForm() {
  return (
    <FormShell
      form="win"
      successIcon={<Trophy className="size-6.5" />}
      successTitle="Congratulations!"
      successText="We'll verify your win and let you know when you're in the Hall of Fame."
      againLabel="Share another"
    >
      <Segmented label="What did you achieve?" name="type" options={winTypes.map((t) => ({ value: t.id, label: t.label }))} />
      <TextField label="Your win in one line" name="title" maxLength={90} placeholder="e.g. Summer SDE intern at a fintech startup" />
      <TextArea label="The story" name="story" maxLength={600} placeholder="How did you get there? Which video or resource helped?" />
      <Row>
        <TextField label="Name" name="name" autoComplete="name" />
        <TextField label="Email" name="email" type="email" autoComplete="email" />
      </Row>
      <Row>
        <TextField label="College & year" optional="optional" name="meta" placeholder="e.g. B.Tech CSE, 3rd year" />
        <TextField label="Proof / profile link" name="link" type="url" placeholder="LinkedIn post, certificate, PR…" />
      </Row>
      <TextField label="Photo link" optional="optional" name="photo" type="url" placeholder="Google Drive or LinkedIn photo link" />
      <Check name="publish">You can feature this win on the site and the channel</Check>
      <SubmitButton>Submit my win</SubmitButton>
      <Note>We verify every win before it goes up. That&apos;s what makes the Hall of Fame worth being in.</Note>
    </FormShell>
  );
}

/** Inline email signup used on the home page. */
export function NewsletterForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitForm, { ok: false });
  if (state.ok) {
    return <p className="rounded-2xl px-5 py-4 font-medium text-accent glass-flat">You&apos;re in! The next issue lands in your inbox.</p>;
  }
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      className="grid gap-2"
    >
      <div className="flex flex-col gap-2 rounded-[20px] p-1.5 glass focus-within:ring-4 focus-within:ring-accent/16 sm:flex-row sm:rounded-full">
        <input type="hidden" name="form" value="newsletter" />
        <Honeypot />
        <label htmlFor="nl-email" className="sr-only">
          Email address
        </label>
        <input
          id="nl-email"
          type="email"
          name="email"
          placeholder="you@college.edu"
          autoComplete="email"
          className="h-11.5 min-w-0 flex-1 bg-transparent px-4 outline-none"
        />
        <button type="submit" disabled={pending} className={buttonClasses({})}>
          {pending ? "Joining…" : "Subscribe"}
        </button>
      </div>
      {(state.errors?.email?.[0] ?? state.message) && <p className="px-4 text-[13px] text-red-600">{state.errors?.email?.[0] ?? state.message}</p>}
    </form>
  );
}
