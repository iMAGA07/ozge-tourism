import { NextResponse } from "next/server";

// POST handler — accepts inquiries and (in future) forwards them to
// Google Sheets and Telegram. Right now we log on the server and
// return ok so the form has a working endpoint end-to-end.
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic shape validation
    const required = ["fullName", "contact", "email", "details", "preferred"];
    for (const k of required) {
      if (typeof body?.[k] !== "string" || body[k].trim().length === 0) {
        return NextResponse.json({ ok: false, error: "missing_field", field: k }, { status: 400 });
      }
    }

    const payload = {
      ...body,
      submittedAt: new Date().toISOString(),
      ua: req.headers.get("user-agent") ?? "",
    };

    // 1) Google Sheets — set GSHEETS_WEBAPP_URL to a deployed Apps Script Web App
    if (process.env.GSHEETS_WEBAPP_URL) {
      try {
        await fetch(process.env.GSHEETS_WEBAPP_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("[inquiry] gsheets failed", err);
      }
    }

    // 2) Telegram — set TG_BOT_TOKEN and TG_CHAT_ID
    if (process.env.TG_BOT_TOKEN && process.env.TG_CHAT_ID) {
      // Escape for HTML parse mode so special characters in user input
      // (&, <, >) never break the message or make Telegram reject it.
      const esc = (s: string) =>
        String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const text = [
        "🆕 <b>New inquiry · Ozge Tourism</b>",
        "",
        `👤 <b>Name:</b> ${esc(payload.fullName)}`,
        `📞 <b>Contact:</b> ${esc(payload.contact)}`,
        `✉️ <b>Email:</b> ${esc(payload.email)}`,
        `💬 <b>Preferred:</b> ${esc(payload.preferred)}`,
        "",
        "📝 <b>Details:</b>",
        esc(payload.details),
      ].join("\n");

      try {
        const res = await fetch(
          `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: process.env.TG_CHAT_ID,
              text,
              parse_mode: "HTML",
              disable_web_page_preview: true,
            }),
          }
        );
        if (!res.ok) {
          console.error("[inquiry] telegram non-ok", res.status, await res.text());
        }
      } catch (err) {
        console.error("[inquiry] telegram failed", err);
      }
    }

    // Always log so a developer can confirm submissions during dev
    console.info("[inquiry]", payload);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[inquiry] error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
