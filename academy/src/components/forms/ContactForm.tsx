"use client";
import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/i18n";
import { contactSchema } from "@/lib/schemas";
import { a11y, Checkbox, Field, FormAlert, Honeypot, inputClass, SubmitButton, SuccessPanel, useSubmission } from "./kit";

type T = Pick<Dictionary, "forms" | "contact" | "common" | "cta">;

export function ContactForm({ t, links }: { t: T; links: { privacy: string; home: string; programs: string } }) {
  const f = t.forms;
  const [honeypot, setHoneypot] = useState("");
  const [v, setV] = useState({ fullName: "", email: "", phone: "", subject: "", message: "", consentPrivacy: false });
  const set = <K extends keyof typeof v>(k: K, val: (typeof v)[K]) => setV((s) => ({ ...s, [k]: val }));
  const { status, submit, errorText } = useSubmission("contact", contactSchema, f);

  if (status.state === "success") {
    return <SuccessPanel t={f} title={t.contact.successTitle} body={t.contact.successBody} reference={status.reference} actions={[{ href: links.programs, label: t.cta.explore }, { href: links.home, label: t.common.breadcrumbHome }]} />;
  }

  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); submit(v, honeypot); }} className="card relative space-y-5 p-5 sm:p-8">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <h2 className="text-[26px] font-medium">{t.contact.formTitle}</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label={f.fields.fullName} required error={errorText("fullName")}>
          <input {...a11y("fullName", errorText("fullName"))} autoComplete="name" value={v.fullName} onChange={(e) => set("fullName", e.target.value)} className={inputClass(errorText("fullName"))} />
        </Field>
        <Field id="email" label={f.fields.email} required error={errorText("email")}>
          <input {...a11y("email", errorText("email"))} type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} className={inputClass(errorText("email"))} />
        </Field>
        <Field id="phone" label={f.fields.phone} optionalLabel={f.optional} error={errorText("phone")}>
          <input {...a11y("phone", errorText("phone"))} type="tel" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass(errorText("phone"))} />
        </Field>
        <Field id="subject" label={f.fields.subject} required error={errorText("subject")}>
          <input {...a11y("subject", errorText("subject"))} maxLength={150} value={v.subject} onChange={(e) => set("subject", e.target.value)} className={inputClass(errorText("subject"))} />
        </Field>
        <Field id="message" label={f.fields.message} required error={errorText("message")} className="sm:col-span-2">
          <textarea {...a11y("message", errorText("message"))} rows={5} maxLength={4000} value={v.message} onChange={(e) => set("message", e.target.value)} className={inputClass(errorText("message"))} />
        </Field>
      </div>
      <Checkbox id="consentPrivacy" checked={v.consentPrivacy} onChange={(x) => set("consentPrivacy", x)} error={errorText("consentPrivacy")}>
        {f.consentPrivacy} <Link href={links.privacy} target="_blank" className="font-semibold text-brand hover:underline">{f.privacyNotice}</Link>.
      </Checkbox>
      {status.state === "error" && <FormAlert message={status.message} />}
      <SubmitButton sending={status.state === "sending"} label={t.cta.submit} sendingLabel={f.sending} />
    </form>
  );
}
