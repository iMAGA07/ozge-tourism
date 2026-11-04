import "server-only";

// Delivers a submission to the academy's staff. Today: Telegram (the channel
// the Ozge team already uses). Phase 2: write to a database first, then
// notify — see README "Roadmap".
//
// Confidential submissions (complaints & feedback) go to a separate chat so
// only designated staff can read them.

export type Delivery = "sent" | "logged" | "unconfigured" | "failed";

const esc = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function deliver(opts: {
  title: string;
  reference: string;
  fields: [label: string, value: unknown][];
  confidential?: boolean;
}): Promise<Delivery> {
  const token = process.env.TG_BOT_TOKEN;
  const chat = opts.confidential ? process.env.TG_COMPLAINTS_CHAT_ID || process.env.TG_CHAT_ID : process.env.TG_CHAT_ID;

  if (!token || !chat) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`\n[academy] ${opts.title} · ${opts.reference}`);
      for (const [k, v] of opts.fields) if (v !== undefined && v !== "") console.info(`  ${k}: ${v}`);
      return "logged";
    }
    return "unconfigured";
  }

  const lines = [
    `${opts.confidential ? "🔒" : "🆕"} <b>${esc(opts.title)}</b>`,
    `<code>${esc(opts.reference)}</code>`,
    "",
    ...opts.fields
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => {
        const val = String(v);
        return val.includes("\n") || val.length > 80 ? `<b>${esc(k)}:</b>\n${esc(val)}` : `<b>${esc(k)}:</b> ${esc(val)}`;
      }),
  ];

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text: lines.join("\n").slice(0, 4000), parse_mode: "HTML", disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      // Log status only — never the message body, which contains personal data.
      console.error(`[academy] delivery failed ${res.status} for ${opts.reference}`);
      return "failed";
    }
    return "sent";
  } catch {
    console.error(`[academy] delivery error for ${opts.reference}`);
    return "failed";
  }
}
