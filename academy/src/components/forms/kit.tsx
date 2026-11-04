"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Check, Copy, Loader2 } from "lucide-react";
import type { ZodTypeAny } from "zod";
import type { Dictionary } from "@/i18n";
import { fieldErrors, type SubmissionKind } from "@/lib/schemas";
import { cn } from "@/lib/utils";

export type FormsDict = Dictionary["forms"];
type Status = { state: "idle" } | { state: "sending" } | { state: "success"; reference: string } | { state: "error"; message: string };

/**
 * Validates with the shared zod schema (instant feedback), then posts to the
 * API, which validates again — the server is the real gatekeeper.
 */
export function useSubmission(kind: SubmissionKind, schema: ZodTypeAny, t: FormsDict) {
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: unknown, only?: string[]) => {
    const r = schema.safeParse(data);
    let errs = r.success ? {} : fieldErrors(r.error);
    if (only) errs = Object.fromEntries(Object.entries(errs).filter(([k]) => only.includes(k)));
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
    }
    return Object.keys(errs).length === 0;
  };

  const submit = async (data: Record<string, unknown>, honeypot: string) => {
    if (!validate(data)) return;
    setStatus({ state: "sending" });
    try {
      const res = await fetch(`/api/submit/${kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot, startedAt: startedAt.current }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        setStatus({ state: "success", reference: body.reference });
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (body.error === "invalid" && body.fields) {
        setErrors(body.fields);
        setStatus({ state: "error", message: t.fixErrors });
        return;
      }
      const message = res.status === 429 ? t.errorRate : body.error === "unavailable" ? t.errorUnavailable : t.errorGeneric;
      setStatus({ state: "error", message });
    } catch {
      setStatus({ state: "error", message: t.errorGeneric });
    }
  };

  const errorText = (field: string) => {
    const key = errors[field] as keyof FormsDict["errors"] | undefined;
    return key ? t.errors[key] ?? t.errors.required : undefined;
  };

  return { status, setStatus, errors, setErrors, validate, submit, errorText };
}

/** Invisible to people, irresistible to bots. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

export function Field({ id, label, error, required, optionalLabel, hint, className, children }: {
  id: string; label: string; error?: string; required?: boolean; optionalLabel?: string; hint?: string; className?: string; children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-[13.5px] font-semibold text-ink">
        <span>{label}{required && <span aria-hidden className="ml-0.5 text-ruby">*</span>}</span>
        {!required && optionalLabel && <span className="text-[12px] font-normal text-ink/45">{optionalLabel}</span>}
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-[12.5px] text-ink/50">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-ruby">
          <AlertCircle aria-hidden className="h-3.5 w-3.5" />{error}
        </p>
      )}
    </div>
  );
}

export const inputClass = (error?: string) =>
  cn(
    "block w-full rounded-2xl border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 transition-all duration-200",
    "focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10",
    error ? "border-ruby/60 bg-ruby-100/30" : "border-ink/12 hover:border-ink/25",
  );

export function a11y(id: string, error?: string, hint?: boolean) {
  return {
    id,
    name: id,
    "aria-invalid": error ? ("true" as const) : ("false" as const),
    "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  };
}

export function Checkbox({ id, checked, onChange, error, children }: { id: string; checked: boolean; onChange: (v: boolean) => void; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="group flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-ink/75">
        <input
          type="checkbox"
          {...a11y(id, error)}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className={cn(
            "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-all peer-focus-visible:ring-4 peer-focus-visible:ring-brand/20",
            checked ? "border-brand bg-brand text-white" : error ? "border-ruby/70 bg-white" : "border-ink/25 bg-white group-hover:border-brand",
          )}
        >
          {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </span>
        <span>{children}</span>
      </label>
      {error && <p id={`${id}-error`} role="alert" className="ml-8 mt-1 text-[12.5px] font-medium text-ruby">{error}</p>}
    </div>
  );
}

export function ChoiceGroup<T extends string>({ name, legend, options, value, onChange, columns = 3, error }: {
  name: string; legend: string; options: { value: T; label: string; hint?: string; icon?: React.ReactNode }[]; value: T | undefined; onChange: (v: T) => void; columns?: 2 | 3 | 4 | 5; error?: string;
}) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4", 5: "sm:grid-cols-5" }[columns];
  return (
    <fieldset>
      <legend className="text-[13.5px] font-semibold text-ink">{legend}</legend>
      <div role="radiogroup" className={cn("mt-2 grid grid-cols-2 gap-2", cols)}>
        {options.map((o) => {
          const active = value === o.value;
          return (
            <label key={o.value} className={cn("relative flex cursor-pointer flex-col rounded-2xl border p-3.5 transition-all duration-200", active ? "border-brand bg-brand-50 shadow-[0_0_0_3px_rgba(21,89,160,0.12)]" : "border-ink/12 bg-white hover:border-ink/30")}>
              <input type="radio" name={name} value={o.value} checked={active} onChange={() => onChange(o.value)} className="peer sr-only" />
              <span className="pointer-events-none absolute inset-0 rounded-2xl peer-focus-visible:ring-4 peer-focus-visible:ring-brand/25" />
              {o.icon && <span className={cn("mb-2", active ? "text-brand" : "text-ink/45")}>{o.icon}</span>}
              <span className={cn("text-[14px] font-semibold", active ? "text-brand" : "text-ink")}>{o.label}</span>
              {o.hint && <span className="mt-0.5 text-[12px] text-ink/50">{o.hint}</span>}
            </label>
          );
        })}
      </div>
      {error && <p role="alert" className="mt-1.5 text-[12.5px] font-medium text-ruby">{error}</p>}
    </fieldset>
  );
}

export function SubmitButton({ sending, label, sendingLabel, className }: { sending: boolean; label: string; sendingLabel: string; className?: string }) {
  return (
    <button type="submit" disabled={sending} className={cn("btn-primary", className)}>
      {sending ? (<><Loader2 aria-hidden className="h-4 w-4 animate-spin" />{sendingLabel}</>) : label}
    </button>
  );
}

export function FormAlert({ message }: { message: string }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-2xl border border-ruby/25 bg-ruby-100/50 p-4 text-[14px] text-ruby-600">
      <AlertCircle aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
      {message}
    </div>
  );
}

export function SuccessPanel({ title, body, reference, t, actions }: { title: string; body: string; reference: string; t: FormsDict; actions?: { href: string; label: string }[] }) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="card relative overflow-hidden p-8 text-center sm:p-12" role="status" aria-live="polite">
      <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand via-gold to-ruby" />
      <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 14 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-white">
        <Check className="h-8 w-8" strokeWidth={2.5} />
      </motion.span>
      <h2 className="mt-6 text-[30px] font-medium text-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-ink/65">{body}</p>
      <div className="mx-auto mt-7 max-w-sm rounded-2xl border border-dashed border-brand/30 bg-brand-50 p-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand">{t.reference}</p>
        <div className="mt-1.5 flex items-center justify-center gap-2">
          <code className="font-display text-[24px] tracking-wider text-ink">{reference}</code>
          <button type="button" onClick={() => navigator.clipboard?.writeText(reference).then(() => setCopied(true))} className="grid h-8 w-8 place-items-center rounded-full text-ink/50 hover:bg-white hover:text-brand" aria-label="Copy reference">
            {copied ? <Check aria-hidden className="h-4 w-4 text-brand" /> : <Copy aria-hidden className="h-4 w-4" />}
          </button>
        </div>
        <p className="mt-2 text-[12px] text-ink/55">{t.referenceHint}</p>
      </div>
      {actions && (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {actions.map((a, i) => <Link key={a.href} href={a.href} className={i === 0 ? "btn-primary" : "btn-ghost"}>{a.label}</Link>)}
        </div>
      )}
    </motion.div>
  );
}
