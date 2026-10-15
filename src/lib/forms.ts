import { z } from "zod";

/* Validation for every form on the site. Field names match the `name` attributes. */

const optionalText = (max: number) => z.string().trim().max(max).optional();
const optionalEmail = z.union([z.literal(""), z.email("Enter a valid email")]).optional();
const optionalUrl = z.union([z.literal(""), z.url("Enter a full link starting with https://")]).optional();
const checkbox = z.literal("yes").optional();

export const formSchemas = {
  ask: z.object({
    topic: z.string().max(40),
    question: z.string().trim().min(10, "Add a bit more detail (at least 10 characters)").max(1000),
    name: optionalText(80),
    email: optionalEmail,
    college: optionalText(120),
    anonymous: checkbox,
    canFeature: checkbox,
  }),
  review: z.object({
    rating: z.enum(["1", "2", "3", "4", "5"], "Pick a rating"),
    kind: z.string().max(40),
    text: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(600),
    name: z.string().trim().min(1, "Add your name").max(80),
    meta: optionalText(120),
    publish: checkbox,
  }),
  apply: z.object({
    name: z.string().trim().min(1, "Add your name").max(80),
    email: z.email("Enter a valid email"),
    college: z.string().trim().min(2, "Add your college").max(120),
    year: z.string().min(1, "Pick your year"),
    role: z.string().min(1, "Pick a role"),
    hours: z.string().min(1, "Pick your hours"),
    portfolio: z.url("Enter a full link starting with https://"),
    resume: optionalUrl,
    why: z.string().trim().min(20, "Tell us a bit more (at least 20 characters)").max(800),
    phone: optionalText(20),
  }),
  collab: z.object({
    type: z.string().max(40),
    name: z.string().trim().min(1, "Add your name").max(80),
    email: z.email("Enter a valid email"),
    organisation: optionalText(120),
    website: optionalUrl,
    message: z.string().trim().min(20, "Tell us a bit more (at least 20 characters)").max(1500),
  }),
  win: z.object({
    type: z.enum(["internship", "placement", "hackathon", "opensource", "other"]),
    title: z.string().trim().min(5, "Add your win in one line").max(90),
    story: z.string().trim().min(20, "Tell the story in a few lines (at least 20 characters)").max(600),
    name: z.string().trim().min(1, "Add your name").max(80),
    email: z.email("Enter a valid email"),
    meta: optionalText(120),
    link: z.url("Add a proof link starting with https://"),
    photo: optionalUrl,
    publish: z.literal("yes", "Please confirm we can feature your win"),
  }),
  newsletter: z.object({
    email: z.email("Enter a valid email"),
  }),
  resources: z.object({
    email: z.email("Enter a valid email"),
    name: optionalText(80),
    resource: z.string().max(60),
    waitlist: z.enum(["yes", "no"]),
  }),
};

export type FormName = keyof typeof formSchemas;

export type FormState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};
