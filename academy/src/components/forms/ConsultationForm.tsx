"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n";
import type { FormCatalog } from "@/content";
import { consultationSchema } from "@/lib/schemas";
import { bookableDays, SLOT_CONFIG } from "@/lib/slots";
import { a11y, Checkbox, Field, FormAlert, Honeypot, inputClass, SubmitButton, SuccessPanel, useSubmission } from "./kit";
import { cn } from "@/lib/utils";

type T = Pick<Dictionary, "forms" | "consultation" | "common" | "cta">;

export function ConsultationForm({ t, catalog, initial, links }: {
  t: T;
  catalog: FormCatalog;
  initial: { division?: string; course?: string };
  links: { privacy: string; programs: string; home: string };
}) {
  const f = t.forms;
  const startDivision = catalog.find((d) => d.slug === initial.division);
  const startCourse = startDivision?.courses.find((c) => c.slug === initial.course) ?? (startDivision?.courses.length === 1 ? startDivision.courses[0] : undefined);

  const [honeypot, setHoneypot] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [v, setV] = useState({
    pick: startDivision && startCourse ? `${startDivision.slug}/${startCourse.slug}` : "",
    date: "", time: "", fullName: "", email: "", phone: "", topic: "", consentPrivacy: false,
  });
  const set = <K extends keyof typeof v>(k: K, val: (typeof v)[K]) => setV((s) => ({ ...s, [k]: val }));
  const { status, validate, submit, errorText } = useSubmission("consultation", consultationSchema, f);

  // Days depend on "today", so compute them in the browser (avoids SSR mismatch).
  useEffect(() => setDays(bookableDays()), []);

  const [division, course] = v.pick.split("/");
  const data = { division: division ?? "", course: course ?? "", date: v.date, time: v.time, fullName: v.fullName, email: v.email, phone: v.phone, topic: v.topic, consentPrivacy: v.consentPrivacy };

  if (status.state === "success") {
    return <SuccessPanel t={f} title={t.consultation.successTitle} body={t.consultation.successBody} reference={status.reference} actions={[{ href: links.programs, label: t.cta.explore }, { href: links.home, label: t.common.breadcrumbHome }]} />;
  }

  const dayLabel = (iso: string) => {
    const d = new Date(`${iso}T12:00:00Z`);
    return {
      wd: new Intl.DateTimeFormat("en", { weekday: "short", timeZone: "UTC" }).format(d),
      day: d.getUTCDate(),
      mon: new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" }).format(d),
    };
  };

  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); if (validate(data)) submit(data, honeypot); }} className="card relative space-y-7 p-5 sm:p-9">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <Field id="course" label={f.fields.course} required error={errorText("course") ?? errorText("division")}>
        <select {...a11y("course", errorText("course"))} value={v.pick} onChange={(e) => set("pick", e.target.value)} className={inputClass(errorText("course"))}>
          <option value="">{f.choose}</option>
          {catalog.map((d) => (
            <optgroup key={d.slug} label={d.title}>
              {d.courses.map((c) => <option key={c.slug} value={`${d.slug}/${c.slug}`}>{c.title}</option>)}
            </optgroup>
          ))}
        </select>
      </Field>

      <fieldset>
        <legend className="text-[13.5px] font-semibold text-ink">{t.consultation.pickDate}<span aria-hidden className="ml-0.5 text-ruby">*</span></legend>
        <div className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
          {days.length === 0 && Array.from({ length: 7 }).map((_, i) => <span key={i} className="h-[76px] w-16 shrink-0 animate-pulse rounded-2xl bg-ink/5" />)}
          {days.map((iso) => {
            const l = dayLabel(iso);
            const active = v.date === iso;
            return (
              <label key={iso} className={cn("flex w-16 shrink-0 cursor-pointer flex-col items-center rounded-2xl border py-2.5 transition-all", active ? "border-brand bg-brand text-white shadow-[0_10px_24px_-12px_rgba(21,89,160,0.8)]" : "border-ink/12 bg-white hover:border-brand/40")}>
                <input type="radio" name="date" value={iso} checked={active} onChange={() => setV((s) => ({ ...s, date: iso, time: "" }))} className="peer sr-only" />
                <span className={cn("text-[11px] font-semibold uppercase", active ? "text-white/75" : "text-ink/45")}>{l.wd}</span>
                <span className="font-display text-[24px] leading-tight">{l.day}</span>
                <span className={cn("text-[11px]", active ? "text-white/75" : "text-ink/45")}>{l.mon}</span>
              </label>
            );
          })}
        </div>
        {errorText("date") && <p role="alert" className="mt-1 text-[12.5px] font-medium text-ruby">{errorText("date")}</p>}
      </fieldset>

      <fieldset disabled={!v.date} className="disabled:opacity-40">
        <legend className="text-[13.5px] font-semibold text-ink">{t.consultation.pickTime} <span className="font-normal text-ink/50">· {f.fields.time}</span><span aria-hidden className="ml-0.5 text-ruby">*</span></legend>
        <motion.div layout className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-7">
          {SLOT_CONFIG.times.map((time) => {
            const active = v.time === time;
            return (
              <label key={time} className={cn("cursor-pointer rounded-xl border py-2.5 text-center text-[14px] font-semibold transition-all", active ? "border-gold bg-gold text-ink" : "border-ink/12 bg-white text-ink/80 hover:border-gold")}>
                <input type="radio" name="time" value={time} checked={active} onChange={() => set("time", time)} className="sr-only" />
                {time}
              </label>
            );
          })}
        </motion.div>
        {errorText("time") && <p role="alert" className="mt-1.5 text-[12.5px] font-medium text-ruby">{errorText("time")}</p>}
        <p className="mt-2 text-[12.5px] text-ink/50">{t.consultation.note}</p>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label={f.fields.fullName} required error={errorText("fullName")}>
          <input {...a11y("fullName", errorText("fullName"))} autoComplete="name" value={v.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder={f.placeholders.fullName} className={inputClass(errorText("fullName"))} />
        </Field>
        <Field id="email" label={f.fields.email} required error={errorText("email")}>
          <input {...a11y("email", errorText("email"))} type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} placeholder={f.placeholders.email} className={inputClass(errorText("email"))} />
        </Field>
        <Field id="phone" label={f.fields.phone} optionalLabel={f.optional} error={errorText("phone")} className="sm:col-span-2">
          <input {...a11y("phone", errorText("phone"))} type="tel" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} placeholder={f.placeholders.phone} className={inputClass(errorText("phone"))} />
        </Field>
        <Field id="topic" label={f.fields.topic} optionalLabel={f.optional} error={errorText("topic")} className="sm:col-span-2">
          <textarea {...a11y("topic", errorText("topic"))} rows={3} maxLength={1000} value={v.topic} onChange={(e) => set("topic", e.target.value)} placeholder={f.placeholders.topic} className={inputClass(errorText("topic"))} />
        </Field>
      </div>

      <Checkbox id="consentPrivacy" checked={v.consentPrivacy} onChange={(x) => set("consentPrivacy", x)} error={errorText("consentPrivacy")}>
        {f.consentPrivacy} <Link href={links.privacy} target="_blank" className="font-semibold text-brand hover:underline">{f.privacyNotice}</Link>.
      </Checkbox>

      {status.state === "error" && <FormAlert message={status.message} />}
      <SubmitButton sending={status.state === "sending"} label={t.cta.consult} sendingLabel={f.sending} className="w-full sm:w-auto" />
    </form>
  );
}
