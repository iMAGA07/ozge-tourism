"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, Laptop, Shuffle, User, Users } from "lucide-react";
import type { Dictionary } from "@/i18n";
import type { FormCatalog } from "@/content";
import { registrationSchema } from "@/lib/schemas";
import { DivisionIcon } from "../DivisionIcon";
import { a11y, Checkbox, ChoiceGroup, Field, FormAlert, Honeypot, inputClass, SubmitButton, SuccessPanel, useSubmission } from "./kit";
import { cn } from "@/lib/utils";

type T = Pick<Dictionary, "forms" | "register" | "common" | "cta">;

const STEP_FIELDS = [
  ["division", "course", "package", "format", "mode", "start"],
  ["fullName", "email", "phone", "country", "guardianName", "guardianEmail", "guardianPhone", "guardianConsent"],
  ["level", "goals", "comments"],
  ["consentPrivacy", "consentTerms"],
];

export function RegisterForm({ t, catalog, initial, links }: {
  t: T;
  catalog: FormCatalog;
  initial: { division?: string; course?: string; package?: string };
  links: { privacy: string; terms: string; programs: string; home: string };
}) {
  const f = t.forms;
  const startDivision = catalog.find((d) => d.slug === initial.division);
  const startCourse = startDivision?.courses.find((c) => c.slug === initial.course);

  const [step, setStep] = useState(startCourse ? 0 : 0);
  const [dir, setDir] = useState(1);
  const [honeypot, setHoneypot] = useState("");
  const [v, setV] = useState({
    division: startDivision?.slug ?? "",
    course: startCourse?.slug ?? (startDivision?.courses.length === 1 ? startDivision.courses[0].slug : ""),
    package: initial.package ?? "",
    format: "any" as "online" | "offline" | "hybrid" | "any",
    mode: "any" as "individual" | "group" | "any",
    start: "asap" as "asap" | "month" | "later" | "flexible",
    level: undefined as undefined | "none" | "basic" | "mid" | "high" | "na",
    fullName: "", email: "", phone: "", country: "", goals: "", comments: "",
    isMinor: false, guardianName: "", guardianEmail: "", guardianPhone: "", guardianConsent: false,
    consentPrivacy: false, consentTerms: false,
  });
  const set = <K extends keyof typeof v>(k: K, val: (typeof v)[K]) => setV((s) => ({ ...s, [k]: val }));

  const { status, errors, validate, submit, errorText } = useSubmission("registration", registrationSchema, f);
  const division = catalog.find((d) => d.slug === v.division);
  const course = division?.courses.find((c) => c.slug === v.course);
  const packages = course?.packages.length ? course.packages : division?.packages ?? [];

  const data = useMemo(() => ({
    ...v,
    package: v.package || undefined,
    level: course?.asksLevel ? v.level ?? "na" : undefined,
    guardianEmail: v.isMinor ? v.guardianEmail : "",
    guardianPhone: v.isMinor ? v.guardianPhone : "",
    guardianName: v.isMinor ? v.guardianName : "",
  }), [v, course]);

  const steps = [f.steps.program, f.steps.details, f.steps.goals, f.steps.review];
  const go = (n: number) => {
    if (n > step && !validate(data, STEP_FIELDS.slice(0, n).flat())) return;
    setDir(n > step ? 1 : -1);
    setStep(n);
    document.getElementById("register-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (status.state === "success") {
    return <SuccessPanel t={f} title={t.register.successTitle} body={t.register.successBody} reference={status.reference} actions={[{ href: links.programs, label: t.cta.explore }, { href: links.home, label: t.common.breadcrumbHome }]} />;
  }

  const fmtIcons = { online: <Laptop className="h-5 w-5" />, offline: <Building2 className="h-5 w-5" />, hybrid: <Shuffle className="h-5 w-5" /> };

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 3) go(step + 1);
        else submit(data, honeypot);
      }}
      className="card relative overflow-hidden p-5 sm:p-9"
      id="register-top"
    >
      <Honeypot value={honeypot} onChange={setHoneypot} />

      {/* progress */}
      <ol className="mb-9 grid grid-cols-4 gap-2" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined}>
            <button type="button" disabled={i > step} onClick={() => go(i)} className="w-full text-left disabled:cursor-default">
              <span className="block h-1.5 overflow-hidden rounded-full bg-ink/10">
                <motion.span className="block h-full rounded-full bg-gradient-to-r from-brand to-brand-500" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
              </span>
              <span className={cn("mt-2 hidden text-[12px] font-semibold sm:block", i <= step ? "text-brand" : "text-ink/40")}>
                {i + 1}. {s}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.div
          key={step}
          custom={dir}
          initial={{ opacity: 0, x: 40 * dir }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 * dir }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          {step === 0 && (
            <>
              <fieldset>
                <legend className="text-[13.5px] font-semibold text-ink">{f.fields.division}<span aria-hidden className="ml-0.5 text-ruby">*</span></legend>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {catalog.map((d) => {
                    const active = v.division === d.slug;
                    return (
                      <label key={d.slug} className={cn("flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-all", active ? "border-brand bg-brand-50 shadow-[0_0_0_3px_rgba(21,89,160,0.12)]" : "border-ink/12 bg-white hover:border-ink/30")}>
                        <input type="radio" name="division" className="peer sr-only" checked={active} onChange={() => setV((s) => ({ ...s, division: d.slug, course: d.courses.length === 1 ? d.courses[0].slug : "", package: "" }))} />
                        <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", active ? "bg-brand text-white" : "bg-brand-100 text-brand")}><DivisionIcon name={d.icon} className="h-[18px] w-[18px]" /></span>
                        <span className={cn("text-[13.5px] font-semibold leading-tight", active ? "text-brand" : "text-ink")}>{d.title}</span>
                      </label>
                    );
                  })}
                </div>
                {errorText("division") && <p role="alert" className="mt-1.5 text-[12.5px] font-medium text-ruby">{errorText("division")}</p>}
              </fieldset>

              {division && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="course" label={f.fields.course} required error={errorText("course")}>
                    <select {...a11y("course", errorText("course"))} value={v.course} onChange={(e) => setV((s) => ({ ...s, course: e.target.value, package: "" }))} className={inputClass(errorText("course"))}>
                      <option value="">{f.choose}</option>
                      {division.courses.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
                    </select>
                  </Field>
                  {packages.length > 0 && (
                    <Field id="package" label={f.fields.package} optionalLabel={f.optional}>
                      <select {...a11y("package")} value={v.package} onChange={(e) => set("package", e.target.value)} className={inputClass()}>
                        <option value="">{f.notSure}</option>
                        {packages.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </Field>
                  )}
                </div>
              )}

              {course && (
                <>
                  <ChoiceGroup name="format" legend={f.fields.format} columns={4} value={v.format} onChange={(x) => set("format", x)}
                    options={[...course.formats.map((x) => ({ value: x, label: t.common.format[x], icon: fmtIcons[x] })), { value: "any" as const, label: f.any }]} />
                  <ChoiceGroup name="mode" legend={f.fields.mode} columns={3} value={v.mode} onChange={(x) => set("mode", x)}
                    options={[...course.modes.map((x) => ({ value: x, label: t.common.mode[x], icon: x === "individual" ? <User className="h-5 w-5" /> : <Users className="h-5 w-5" /> })), { value: "any" as const, label: f.any }]} />
                </>
              )}

              <Field id="start" label={f.fields.start} required>
                <select {...a11y("start")} value={v.start} onChange={(e) => set("start", e.target.value as typeof v.start)} className={inputClass()}>
                  {(Object.keys(f.starts) as (keyof typeof f.starts)[]).map((k) => <option key={k} value={k}>{f.starts[k]}</option>)}
                </select>
              </Field>
            </>
          )}

          {step === 1 && (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="fullName" label={f.fields.fullName} required error={errorText("fullName")} className="sm:col-span-2">
                  <input {...a11y("fullName", errorText("fullName"))} autoComplete="name" value={v.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder={f.placeholders.fullName} className={inputClass(errorText("fullName"))} />
                </Field>
                <Field id="email" label={f.fields.email} required error={errorText("email")}>
                  <input {...a11y("email", errorText("email"))} type="email" autoComplete="email" inputMode="email" value={v.email} onChange={(e) => set("email", e.target.value)} placeholder={f.placeholders.email} className={inputClass(errorText("email"))} />
                </Field>
                <Field id="phone" label={f.fields.phone} required error={errorText("phone")}>
                  <input {...a11y("phone", errorText("phone"))} type="tel" autoComplete="tel" inputMode="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} placeholder={f.placeholders.phone} className={inputClass(errorText("phone"))} />
                </Field>
                <Field id="country" label={f.fields.country} optionalLabel={f.optional} error={errorText("country")}>
                  <input {...a11y("country", errorText("country"))} autoComplete="country-name" value={v.country} onChange={(e) => set("country", e.target.value)} placeholder={f.placeholders.country} className={inputClass(errorText("country"))} />
                </Field>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-paper p-4 sm:p-5">
                <Checkbox id="isMinor" checked={v.isMinor} onChange={(x) => set("isMinor", x)}>{f.fields.isMinor}</Checkbox>
                <AnimatePresence initial={false}>
                  {v.isMinor && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="grid gap-4 pt-5 sm:grid-cols-3">
                        <Field id="guardianName" label={f.fields.guardianName} required error={errorText("guardianName")}>
                          <input {...a11y("guardianName", errorText("guardianName"))} value={v.guardianName} onChange={(e) => set("guardianName", e.target.value)} className={inputClass(errorText("guardianName"))} />
                        </Field>
                        <Field id="guardianEmail" label={f.fields.guardianEmail} required error={errorText("guardianEmail")}>
                          <input {...a11y("guardianEmail", errorText("guardianEmail"))} type="email" value={v.guardianEmail} onChange={(e) => set("guardianEmail", e.target.value)} className={inputClass(errorText("guardianEmail"))} />
                        </Field>
                        <Field id="guardianPhone" label={f.fields.guardianPhone} required error={errorText("guardianPhone")}>
                          <input {...a11y("guardianPhone", errorText("guardianPhone"))} type="tel" value={v.guardianPhone} onChange={(e) => set("guardianPhone", e.target.value)} className={inputClass(errorText("guardianPhone"))} />
                        </Field>
                      </div>
                      <div className="pt-4">
                        <Checkbox id="guardianConsent" checked={v.guardianConsent} onChange={(x) => set("guardianConsent", x)} error={errorText("guardianConsent")}>{f.fields.guardianConsent}</Checkbox>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {course?.asksLevel && (
                <ChoiceGroup name="level" legend={f.fields.level} columns={5} value={v.level} onChange={(x) => set("level", x)}
                  options={(["none", "basic", "mid", "high", "na"] as const).map((k) => ({ value: k, label: f.levels[k] }))} />
              )}
              <Field id="goals" label={f.fields.goals} optionalLabel={f.optional} error={errorText("goals")}>
                <textarea {...a11y("goals", errorText("goals"))} rows={4} maxLength={1500} value={v.goals} onChange={(e) => set("goals", e.target.value)} placeholder={f.placeholders.goals} className={inputClass(errorText("goals"))} />
              </Field>
              <Field id="comments" label={f.fields.comments} optionalLabel={f.optional} error={errorText("comments")}>
                <textarea {...a11y("comments", errorText("comments"))} rows={3} maxLength={1500} value={v.comments} onChange={(e) => set("comments", e.target.value)} placeholder={f.placeholders.comments} className={inputClass(errorText("comments"))} />
              </Field>
            </>
          )}

          {step === 3 && (
            <>
              <div className="rounded-2xl bg-paper p-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand">{t.register.summary}</p>
                <dl className="mt-3 grid gap-x-6 gap-y-3 text-[14px] sm:grid-cols-2">
                  {[
                    [f.fields.division, division?.title],
                    [f.fields.course, course?.title],
                    [f.fields.package, packages.find((p) => p.id === v.package)?.name ?? f.notSure],
                    [f.fields.format, v.format === "any" ? f.any : t.common.format[v.format]],
                    [f.fields.mode, v.mode === "any" ? f.any : t.common.mode[v.mode]],
                    [f.fields.start, f.starts[v.start]],
                    [f.fields.fullName, v.fullName],
                    [f.fields.email, v.email],
                    [f.fields.phone, v.phone],
                    ...(v.isMinor ? [[f.fields.guardianName, v.guardianName]] : []),
                  ].map(([k, val]) => (
                    <div key={k}><dt className="text-ink/50">{k}</dt><dd className="font-semibold text-ink">{val || "—"}</dd></div>
                  ))}
                </dl>
              </div>
              <div className="space-y-3">
                <Checkbox id="consentPrivacy" checked={v.consentPrivacy} onChange={(x) => set("consentPrivacy", x)} error={errorText("consentPrivacy")}>
                  {f.consentPrivacy} <Link href={links.privacy} target="_blank" className="font-semibold text-brand underline-offset-2 hover:underline">{f.privacyNotice}</Link>.
                </Checkbox>
                <Checkbox id="consentTerms" checked={v.consentTerms} onChange={(x) => set("consentTerms", x)} error={errorText("consentTerms")}>
                  {f.consentTerms} <Link href={links.terms} target="_blank" className="font-semibold text-brand underline-offset-2 hover:underline">{f.enrollmentTerms}</Link>.
                </Checkbox>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {status.state === "error" && <div className="mt-6"><FormAlert message={status.message} /></div>}
      {Object.keys(errors).length > 0 && status.state !== "error" && <p className="sr-only" role="alert">{f.fixErrors}</p>}

      <div className="mt-9 flex items-center justify-between gap-3 border-t border-ink/[0.07] pt-6">
        {step > 0 ? (
          <button type="button" onClick={() => go(step - 1)} className="btn-ghost"><ArrowLeft aria-hidden className="h-4 w-4" />{t.cta.back}</button>
        ) : <span />}
        {step < 3 ? (
          <button type="submit" className="btn-primary">{t.cta.next}<ArrowRight aria-hidden className="h-4 w-4" /></button>
        ) : (
          <SubmitButton sending={status.state === "sending"} label={t.cta.submit} sendingLabel={f.sending} />
        )}
      </div>
    </form>
  );
}
