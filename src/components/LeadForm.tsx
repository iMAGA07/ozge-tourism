"use client";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type FormState = {
  fullName: string;
  contact: string;
  email: string;
  details: string;
  preferred: "WhatsApp" | "Telegram" | "Email";
};

const initial: FormState = {
  fullName: "",
  contact: "",
  email: "",
  details: "",
  preferred: "WhatsApp",
};

export function LeadForm() {
  const [data, setData] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const validate = (d: FormState) => {
    const e: typeof errors = {};
    if (d.fullName.trim().length < 2) e.fullName = "Please tell us your full name.";
    if (d.contact.trim().length < 5) e.contact = "Add a number we can reach you on.";
    if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "A valid email helps us reply faster.";
    if (d.details.trim().length < 12)
      e.details = "Share a few details — destination, dates, group size.";
    return e;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v = validate(data);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      setData(initial);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="book"
      className="relative overflow-hidden bg-brand-ink py-24 text-brand-cream md:py-36"
    >
      <div className="absolute inset-0 opacity-25">
        <Image
          src={`/photos/${photos.sunrise.src}`}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: photos.sunrise.position }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/95 via-brand-ink/85 to-brand-ink/98" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(224,160,57,0.12),transparent_55%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.34em] text-brand-saffron">
                <span className="h-[1px] w-8 bg-brand-saffron/60" />
                Book an adventure
              </span>
              <h2 className="fluid-h2 mt-5 font-display font-light text-brand-cream">
                Begin where{" "}
                <span className="font-serif italic font-normal text-brand-saffron">
                  the journey begins.
                </span>
              </h2>
              <p className="fluid-lead mt-6 max-w-[44ch] text-brand-cream/80">
                Tell us the kind of adventure you're dreaming of, the dates you have
                in mind, and any specific requirements. We will design everything
                from A to Z and reply within hours.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-md border border-brand-saffron/30 bg-gradient-to-br from-brand-saffron/12 via-transparent to-brand-terracotta/10 p-6 md:p-7">
                <div className="font-display text-xl font-light text-brand-cream">
                  100% bold guarantee
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-brand-cream/80">
                  Join with complete confidence. If you genuinely don't enjoy the
                  experience — you receive a 100% full refund. No questions asked.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 grid gap-2 text-[13.5px] text-brand-cream/75">
                <a className="hover:text-brand-saffron" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                <a className="hover:text-brand-saffron" href={site.whatsapp}>
                  WhatsApp / Telegram · {site.phone}
                </a>
                <span className="text-brand-cream/55">{site.address}</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form
                onSubmit={onSubmit}
                noValidate
                className="rounded-md border border-brand-cream/15 bg-white/[0.04] p-6 md:p-9 backdrop-blur"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Full name"
                    id="fullName"
                    error={errors.fullName}
                    value={data.fullName}
                    onChange={(v) => setData({ ...data, fullName: v })}
                    placeholder="Jane Doe"
                  />
                  <Field
                    label="Contact (WhatsApp / Telegram)"
                    id="contact"
                    error={errors.contact}
                    value={data.contact}
                    onChange={(v) => setData({ ...data, contact: v })}
                    placeholder="+1 555 123 4567"
                  />
                </div>

                <div className="mt-5">
                  <Field
                    label="Email"
                    id="email"
                    type="email"
                    error={errors.email}
                    value={data.email}
                    onChange={(v) => setData({ ...data, email: v })}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="details"
                    className="text-[10.5px] uppercase tracking-[0.32em] text-brand-cream/65"
                  >
                    Details of your adventure
                  </label>
                  <textarea
                    id="details"
                    rows={5}
                    value={data.details}
                    onChange={(e) => setData({ ...data, details: e.target.value })}
                    placeholder="Type, preferred dates, number of participants, destination, special requirements..."
                    className={cn(
                      "mt-2 block w-full resize-none rounded-md border bg-transparent px-4 py-3 text-[14px] text-brand-cream placeholder:text-brand-cream/35 transition-colors",
                      "border-brand-cream/20 focus:border-brand-saffron focus:outline-none",
                      errors.details && "border-brand-terracotta"
                    )}
                  />
                  {errors.details && (
                    <div className="mt-1.5 text-[12px] text-brand-terracotta">
                      {errors.details}
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-cream/65">
                    Preferred contact method
                  </div>
                  <div className="mt-3 inline-flex rounded-full border border-brand-cream/20 p-1">
                    {(["WhatsApp", "Telegram", "Email"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setData({ ...data, preferred: opt })}
                        className={cn(
                          "rounded-full px-4 py-1.5 text-[12.5px] transition-colors",
                          data.preferred === opt
                            ? "bg-brand-saffron text-brand-ink"
                            : "text-brand-cream/80 hover:text-brand-cream"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex items-center gap-2 rounded-full bg-brand-saffron px-7 py-3.5 text-[13.5px] font-medium text-brand-ink transition-all duration-500 hover:bg-white disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending..." : "Send inquiry"}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                  <span className="text-[12px] text-brand-cream/55">
                    We typically reply within a few hours.
                  </span>
                </div>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 rounded-md border border-brand-saffron/40 bg-brand-saffron/10 p-4 text-[13.5px] text-brand-cream"
                    >
                      Thank you. Your inquiry has been received — we will be in touch
                      shortly via your preferred channel.
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 rounded-md border border-brand-terracotta/40 bg-brand-terracotta/10 p-4 text-[13.5px] text-brand-cream"
                    >
                      Something went wrong sending your message. Please email us
                      directly at {site.email}.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[10.5px] uppercase tracking-[0.32em] text-brand-cream/65"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "mt-2 block w-full rounded-md border bg-transparent px-4 py-3 text-[14px] text-brand-cream placeholder:text-brand-cream/35 transition-colors",
          "border-brand-cream/20 focus:border-brand-saffron focus:outline-none",
          error && "border-brand-terracotta"
        )}
      />
      {error && <div className="mt-1.5 text-[12px] text-brand-terracotta">{error}</div>}
    </div>
  );
}
