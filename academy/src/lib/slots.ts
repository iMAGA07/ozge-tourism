// Consultation availability, shared by the booking UI and the server check.
// Phase 2 replaces this with real instructor calendars (e.g. Google Calendar),
// which is also what prevents double-booking.
export const SLOT_CONFIG = {
  daysAhead: 14,
  /** 0 = Sunday … 6 = Saturday */
  closedWeekdays: [0],
  times: ["10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
  timezone: "Asia/Almaty",
};

/** Calendar days (YYYY-MM-DD) bookable from today, in the academy's timezone. */
export function bookableDays(now = new Date()): string[] {
  const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: SLOT_CONFIG.timezone, year: "numeric", month: "2-digit", day: "2-digit" });
  const out: string[] = [];
  for (let i = 1; i <= SLOT_CONFIG.daysAhead; i++) {
    const d = new Date(now.getTime() + i * 86_400_000);
    const iso = fmt.format(d);
    const weekday = new Date(`${iso}T12:00:00Z`).getUTCDay();
    if (!SLOT_CONFIG.closedWeekdays.includes(weekday)) out.push(iso);
  }
  return out;
}

export function isBookable(date: string, time: string, now = new Date()) {
  return bookableDays(now).includes(date) && SLOT_CONFIG.times.includes(time);
}
