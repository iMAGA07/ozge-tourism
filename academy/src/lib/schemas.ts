import { z } from "zod";

// One set of rules, used by the forms (instant feedback) and the API (the
// real gatekeeper — never trust the browser). Error messages are keys into
// dictionary.forms.errors so they can be translated.

const name = z.string().trim().min(2, "required").max(120, "tooLong");
const email = z.string().trim().min(1, "required").max(254, "tooLong").email("email");
const phone = z
  .string()
  .trim()
  .min(1, "required")
  .max(24, "tooLong")
  .regex(/^\+?[0-9][0-9\s\-()]{6,22}$/, "phone");
const optionalEmail = z.union([z.literal(""), email]).optional();
const optionalPhone = z.union([z.literal(""), phone]).optional();
const text = (max: number) => z.string().trim().max(max, "tooLong").optional();
const slug = z.string().trim().min(1, "required").max(80, "tooLong").regex(/^[a-z0-9-]+$/, "required");
const consent = z.literal(true, { errorMap: () => ({ message: "consent" }) });

/** Bot traps: a hidden field humans leave empty, and the time the form was opened. */
export const antiSpam = z.object({
  website: z.string().optional(),
  startedAt: z.number().int().nonnegative(),
});

const registrationBase = z.object({
  division: slug,
  course: slug,
  package: z.string().trim().max(60).optional(),
  format: z.enum(["online", "offline", "hybrid", "any"]),
  mode: z.enum(["individual", "group", "any"]),
  start: z.enum(["asap", "month", "later", "flexible"]),
  level: z.enum(["none", "basic", "mid", "high", "na"]).optional(),
  fullName: name,
  email,
  phone,
  country: text(80),
  goals: text(1500),
  comments: text(1500),
  guardianName: z.string().trim().max(120, "tooLong").optional(),
  guardianEmail: optionalEmail,
  guardianPhone: optionalPhone,
  guardianConsent: z.boolean().optional(),
  consentPrivacy: consent,
  consentTerms: consent,
});

// A discriminated union rather than .superRefine(): refinements only run once
// every other field is valid, so guardian errors would stay hidden until the
// final step. Here the "minor" branch validates guardian fields on its own.
export const registrationSchema = z.discriminatedUnion("isMinor", [
  registrationBase.extend({ isMinor: z.literal(false) }),
  registrationBase.extend({
    isMinor: z.literal(true),
    guardianName: name,
    guardianEmail: email,
    guardianPhone: phone,
    guardianConsent: consent,
  }),
]);

export const consultationSchema = z.object({
  division: slug,
  course: slug,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "time"),
  fullName: name,
  email,
  phone: optionalPhone,
  topic: text(1000),
  consentPrivacy: consent,
});

export const feedbackCategories = ["complaint", "suggestion", "concern", "feedback", "other"] as const;

export const feedbackSchema = z
  .object({
    category: z.enum(feedbackCategories),
    subject: z.string().trim().min(3, "tooShort").max(150, "tooLong"),
    message: z.string().trim().min(10, "tooShort").max(4000, "tooLong"),
    relatedProgram: z.string().trim().max(80).optional(),
    anonymous: z.boolean(),
    name: z.string().trim().max(120, "tooLong").optional(),
    email: optionalEmail,
    phone: optionalPhone,
  })
  // Anonymous means anonymous: identity fields are dropped here, on the
  // server, even if a modified browser sends them.
  .transform((v) => (v.anonymous ? { ...v, name: undefined, email: undefined, phone: undefined } : v));

export const contactSchema = z.object({
  fullName: name,
  email,
  phone: optionalPhone,
  subject: z.string().trim().min(3, "tooShort").max(150, "tooLong"),
  message: z.string().trim().min(10, "tooShort").max(4000, "tooLong"),
  consentPrivacy: consent,
});

export type RegistrationInput = z.input<typeof registrationSchema>;
export type ConsultationInput = z.input<typeof consultationSchema>;
export type FeedbackInput = z.input<typeof feedbackSchema>;
export type ContactInput = z.input<typeof contactSchema>;

export const submissionKinds = ["registration", "consultation", "feedback", "contact"] as const;
export type SubmissionKind = (typeof submissionKinds)[number];

/** Flatten zod issues into { field: errorKey } for the UI. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
