"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, EyeOff, HelpCircle, Lightbulb, MessageSquareHeart, ShieldAlert, UserRound } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { feedbackCategories, feedbackSchema } from "@/lib/schemas";
import { a11y, ChoiceGroup, Field, FormAlert, Honeypot, inputClass, SubmitButton, SuccessPanel, useSubmission } from "./kit";
import { cn } from "@/lib/utils";

type T = Pick<Dictionary, "forms" | "feedback" | "common" | "cta">;
type Category = (typeof feedbackCategories)[number];

const icons: Record<Category, React.ReactNode> = {
  complaint: <AlertTriangle className="h-5 w-5" />,
  suggestion: <Lightbulb className="h-5 w-5" />,
  concern: <ShieldAlert className="h-5 w-5" />,
  feedback: <MessageSquareHeart className="h-5 w-5" />,
  other: <HelpCircle className="h-5 w-5" />,
};

export function FeedbackForm({ t, programs, links }: { t: T; programs: { slug: string; title: string }[]; links: { home: string } }) {
  const f = t.forms;
  const [honeypot, setHoneypot] = useState("");
  const [v, setV] = useState({ category: "feedback" as Category, subject: "", message: "", relatedProgram: "", anonymous: true, name: "", email: "", phone: "" });
  const set = <K extends keyof typeof v>(k: K, val: (typeof v)[K]) => setV((s) => ({ ...s, [k]: val }));
  const { status, validate, submit, errorText } = useSubmission("feedback", feedbackSchema, f);

  // In anonymous mode identity fields are never even sent.
  const data = v.anonymous
    ? { category: v.category, subject: v.subject, message: v.message, relatedProgram: v.relatedProgram || undefined, anonymous: true }
    : { ...v, relatedProgram: v.relatedProgram || undefined };

  if (status.state === "success") {
    return <SuccessPanel t={f} title={t.feedback.successTitle} body={v.anonymous ? t.feedback.successAnon : t.feedback.successBody} reference={status.reference} actions={[{ href: links.home, label: t.common.breadcrumbHome }]} />;
  }

  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); if (validate(data)) submit(data, honeypot); }} className="card relative space-y-7 p-5 sm:p-9">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      {/* anonymous switch */}
      <div className={cn("rounded-2xl border p-4 transition-colors duration-300 sm:p-5", v.anonymous ? "border-ink bg-ink text-white" : "border-ink/10 bg-paper")}>
        <label htmlFor="anonymous" className="flex cursor-pointer items-center justify-between gap-4">
          <span className="flex items-center gap-3">
            <span className={cn("grid h-10 w-10 place-items-center rounded-xl transition-colors", v.anonymous ? "bg-gold text-ink" : "bg-white text-ink/60")}>
              {v.anonymous ? <EyeOff aria-hidden className="h-5 w-5" /> : <UserRound aria-hidden className="h-5 w-5" />}
            </span>
            <span className="text-[16px] font-semibold">{f.fields.anonymous}</span>
          </span>
          <input id="anonymous" type="checkbox" role="switch" checked={v.anonymous} onChange={(e) => set("anonymous", e.target.checked)} className="peer sr-only" />
          <span aria-hidden className={cn("relative h-7 w-12 shrink-0 rounded-full transition-colors peer-focus-visible:ring-4 peer-focus-visible:ring-gold/40", v.anonymous ? "bg-gold" : "bg-ink/20")}>
            <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 32 }} className={cn("absolute top-1 h-5 w-5 rounded-full bg-white shadow", v.anonymous ? "right-1" : "left-1")} />
          </span>
        </label>
        <p className={cn("mt-3 text-[13.5px] leading-relaxed", v.anonymous ? "text-white/70" : "text-ink/60")}>{v.anonymous ? t.feedback.anonymousOn : t.feedback.anonymousOff}</p>
      </div>

      <ChoiceGroup name="category" legend={f.fields.category} columns={5} value={v.category} onChange={(x) => set("category", x)}
        options={feedbackCategories.map((c) => ({ value: c, label: t.feedback.categories[c], icon: icons[c] }))} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="subject" label={f.fields.subject} required error={errorText("subject")}>
          <input {...a11y("subject", errorText("subject"))} maxLength={150} value={v.subject} onChange={(e) => set("subject", e.target.value)} placeholder={f.placeholders.subject} className={inputClass(errorText("subject"))} />
        </Field>
        <Field id="relatedProgram" label={f.fields.relatedProgram} optionalLabel={f.optional}>
          <select {...a11y("relatedProgram")} value={v.relatedProgram} onChange={(e) => set("relatedProgram", e.target.value)} className={inputClass()}>
            <option value="">{f.choose}</option>
            {programs.map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
          </select>
        </Field>
        <Field id="message" label={f.fields.message} required error={errorText("message")} className="sm:col-span-2">
          <textarea {...a11y("message", errorText("message"))} rows={6} maxLength={4000} value={v.message} onChange={(e) => set("message", e.target.value)} placeholder={f.placeholders.message} className={inputClass(errorText("message"))} />
          <p className="mt-1 text-right text-[12px] tabular-nums text-ink/40">{v.message.length} / 4000</p>
        </Field>
      </div>

      <AnimatePresence initial={false}>
        {!v.anonymous && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="grid gap-5 sm:grid-cols-3">
              <Field id="name" label={f.fields.fullName} optionalLabel={f.optional} error={errorText("name")}>
                <input {...a11y("name", errorText("name"))} autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} className={inputClass(errorText("name"))} />
              </Field>
              <Field id="email" label={f.fields.email} optionalLabel={f.optional} error={errorText("email")}>
                <input {...a11y("email", errorText("email"))} type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} className={inputClass(errorText("email"))} />
              </Field>
              <Field id="phone" label={f.fields.phone} optionalLabel={f.optional} error={errorText("phone")}>
                <input {...a11y("phone", errorText("phone"))} type="tel" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass(errorText("phone"))} />
              </Field>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {status.state === "error" && <FormAlert message={status.message} />}
      <SubmitButton sending={status.state === "sending"} label={t.cta.submit} sendingLabel={f.sending} className="w-full sm:w-auto" />
    </form>
  );
}
