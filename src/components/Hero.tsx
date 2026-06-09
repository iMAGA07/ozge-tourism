"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Compass, Mountain, Plane, BedDouble, X, Sparkles } from "lucide-react";
import { RevealText } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { useLowPower } from "@/lib/useLowPower";

// The four things Ozge does, shown as glass chips under the hero copy.
// Each one is tap-to-open: the description appears in a minimal popup.
const offerings = [
  {
    icon: Compass,
    label: "Tours",
    description: [
      "We organize all kinds of tours across Central Asia with professional, experienced guides fluent in 20+ languages — including English, French, Chinese, Arabic, Turkish, Russian, and many more — from individual and family trips to group, corporate, organizational, embassy, university, and school tours.",
      "Our experiences include city tours, nature and adventure tours, cultural and historical journeys, educational programs, summer trips, business delegations, and fully customized travel experiences. Whether you are a solo traveler, a family, a company, an embassy, or an institution, we design memorable journeys tailored to your needs.",
    ],
  },
  {
    icon: Mountain,
    label: "Outdoor Adventures",
    description: [
      "We organize outdoor adventures of all kinds across Central Asia for individuals, families, groups, corporate teams, embassies, universities, and organizations.",
      "Our activities include horse riding, quad biking, hiking, camping, skiing, skating, archery, trekking, mountain adventures, and many more exciting experiences designed for all levels of adventure seekers.",
      "We also have a Professional Horse Riding and Archery School for beginners, intermediate learners, and advanced students interested in developing their skills through professional training and guided practice.",
      "All our experiences are led by experienced instructors, guides, and local experts, ensuring both safety and unforgettable memories in the heart of Central Asia’s natural beauty.",
    ],
  },
  {
    icon: Plane,
    label: "Logistics & Transport",
    description: [
      "We also provide logistics and transportation services of all kinds across Central Asia, helping travelers, organizations, companies, and delegations enjoy smooth and comfortable journeys from start to finish.",
      "Our services include flight bookings, airport pickup and drop-off, guest welcoming and assistance, intercity transportation, private transfers, and on-the-ground travel coordination. We offer transportation options in Economy, Comfort, Business, and Premium classes based on your needs and preferences.",
      "Whether for individual travelers, families, corporate groups, embassies, events, or official delegations, we provide reliable and professional logistics support tailored to every journey.",
    ],
  },
  {
    icon: BedDouble,
    label: "Accommodation & Bookings",
    description: [
      "We also assist with bookings of different services across Central Asia for individuals, families, groups, companies, embassies, and organizations.",
      "Our booking services include flight tickets, hotel and accommodation reservations, transportation arrangements, event and conference hall bookings, restaurant reservations, activity and excursion bookings, and many other travel and hospitality services based on your needs.",
      "Whether you are planning a personal trip, a business visit, a group tour, or a large-scale event, we help make the entire process smooth, convenient, and professionally organized.",
    ],
  },
];

// Eight cinematic frames that crossfade slowly in the background. Each
// has its own object-position so the strongest part of the photo stays
// in view (smaller Y = show more of the top).
const heroFrames = [
  { src: "hero-01.jpg", position: "center 35%", label: "Mountain pass · Central Asia" },
  { src: "hero-02.jpg", position: "center 30%", label: "Ancient mosaic · Samarkand" },
  { src: "hero-03.jpg", position: "center 40%", label: "Lake shore · Tian Shan" },
  { src: "hero-04.jpg", position: "center 35%", label: "Old town · Bukhara" },
  { src: "hero-05.jpg", position: "center 30%", label: "Snow ridge · Almaty" },
  { src: "hero-06.jpg", position: "center 35%", label: "Sunset desert · Mangystau" },
  { src: "hero-07.jpg", position: "center 40%", label: "Nomad valley · Kyrgyzstan" },
  { src: "hero-08.jpg", position: "center 35%", label: "Historic gate · Khiva" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const labelY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  // Cross-fade between hero frames every 6s. On weak devices we keep a
  // single static frame — periodically decoding a new full-viewport image
  // was a source of the "freezing" some visitors saw.
  const lowPower = useLowPower();
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (lowPower) return;
    const id = setInterval(() => setFrame((i) => (i + 1) % heroFrames.length), 6000);
    return () => clearInterval(id);
  }, [lowPower]);
  const active = heroFrames[frame];

  // Scroll-linked parallax / fade. On weak devices the hero is fully static
  // (no per-frame transform of the full-screen image), which removes a real
  // scroll-lag source. Capable devices keep the cinematic parallax.
  const imgStyle = lowPower ? undefined : { y, scale };
  const fadeStyle = lowPower ? undefined : { opacity: fade };
  const headlineStyle = lowPower ? undefined : { y: headlineY, opacity: fade };
  const labelStyle = lowPower ? undefined : { y: labelY };

  // Popup state: which offering is open (null = closed).
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeOffering = openIndex !== null ? offerings[openIndex] : null;

  // Lock body scroll while the popup is open.
  useEffect(() => {
    if (activeOffering) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [activeOffering]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[calc(100svh+15px)] min-h-[655px] w-full overflow-hidden bg-brand-ink"
    >
      {/* Cross-fading photo layers */}
      <motion.div style={imgStyle} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={frame}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={`/photos/${active.src}`}
              alt=""
              fill
              priority={frame === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: active.position }}
              quality={78}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Cinematic overlays — darker so the cream + saffron typography always
          reads cleanly. pointer-events-none ensures they never intercept taps. */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/85" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.65)_90%)]" />

      {/* Frame-progress dots */}
      <motion.div
        style={fadeStyle}
        className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-2 md:flex"
      >
        {heroFrames.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Hero frame ${i + 1}`}
            onClick={() => setFrame(i)}
            className="h-6 w-[2px] overflow-hidden rounded-full bg-white/25"
            data-cursor="hover"
          >
            <motion.span
              animate={{
                height: i === frame ? "100%" : "30%",
                backgroundColor: i === frame ? "#e0a039" : "rgba(255,255,255,0.6)",
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block w-full"
            />
          </button>
        ))}
      </motion.div>

      {/* Headline */}
      <motion.div
        style={headlineStyle}
        className="relative z-10 flex h-full flex-col items-center justify-center px-3 text-center sm:px-6"
      >
        {/* Headline — all three words stay on one line on mobile thanks
            to the smaller-on-mobile size + inline Connect span + tight
            tracking. ~15% larger than the previous mobile size. */}
        <h1 className="font-display font-light text-white text-[1.875rem] leading-[1.05] tracking-[-0.045em] sm:text-[3rem] md:text-[4rem] lg:text-[5.5rem] xl:text-[6.5rem] 2xl:text-[7rem] sm:leading-[0.95] sm:tracking-[-0.035em] sm:max-w-[18ch]">
          <RevealText text="Explore. Enjoy." delay={0.05} />{" "}
          <span className="font-serif italic font-semibold text-brand-saffron">
            <RevealText text="Connect." delay={0.18} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-[52ch] text-[12px] leading-[1.45] text-white/90 sm:mt-7 sm:text-[17px] sm:leading-[1.55] md:text-[18px] lg:text-[20px] xl:text-[22px]"
        >
          Join us to experience and enjoy the very best of{" "}
          <span className="whitespace-nowrap font-serif italic font-bold text-brand-saffron">
            Kazakhstan &amp; Central Asia
          </span>{" "}
          — from majestic landscapes and thrilling outdoor adventures to rich
          history and vibrant cultures.
        </motion.p>

        {/* Four offerings as glass chips. Each chip is a tap-target that
            opens the description popup. Labels get a fixed 88px width on
            mobile so the icon+text group is the same size for every
            chip — that lets justify-center anchor every icon at the same
            x-offset whether the label wraps to two lines or not. */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 grid w-full max-w-[520px] grid-cols-2 gap-2.5 sm:mt-7 sm:max-w-none sm:flex sm:flex-wrap sm:justify-center sm:gap-3"
        >
          {offerings.map((o, i) => {
            const Icon = o.icon;
            return (
              <motion.button
                key={o.label}
                type="button"
                onClick={() => setOpenIndex(i)}
                data-cursor="hover"
                data-cursor-label="Open"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.05 + i * 0.08,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex h-full min-h-[52px] items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-saffron/60 hover:bg-white/15 active:scale-[0.98] sm:min-h-[60px] sm:gap-3 sm:px-3.5 sm:py-2.5"
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-saffron/90 text-brand-ink sm:h-8 sm:w-8">
                  <Icon strokeWidth={1.8} className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </span>
                <span className="w-[88px] text-center text-[12px] font-medium leading-tight tracking-wide text-white sm:w-auto sm:text-left sm:text-[12.5px]">
                  {o.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row sm:flex-wrap"
        >
          <Magnetic strength={0.18} className="w-full max-w-[280px] sm:w-auto sm:max-w-none">
            <a
              href="#book"
              data-cursor="hover"
              data-cursor-label="Book"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-brand-saffron px-7 py-3.5 text-[13.5px] font-medium tracking-wide text-brand-ink transition-all duration-500 hover:bg-white sm:w-[240px]"
            >
              <span>Book an adventure</span>
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.18} className="w-full max-w-[280px] sm:w-auto sm:max-w-none">
            <a
              href="#map"
              data-cursor="hover"
              data-cursor-label="Map"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-[13.5px] font-medium tracking-wide text-white backdrop-blur-md transition-all duration-500 hover:bg-white hover:text-brand-ink sm:w-[240px]"
            >
              Discover the map
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        style={fadeStyle}
        className="absolute inset-x-0 bottom-7 z-10 mx-auto flex max-w-[1400px] items-end justify-between px-6 md:px-10"
      >
        <motion.div
          style={labelStyle}
          className="hidden md:block text-white/75"
        >
          <div className="text-[10.5px] uppercase tracking-[0.32em]">In frame</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-1 text-sm"
            >
              {active.label}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex flex-col items-end text-white/75"
        >
          <div className="text-[10.5px] uppercase tracking-[0.32em]">Since 2025</div>
          <div className="mt-1 text-sm">Kazakhstan &amp; Central Asia</div>
        </motion.div>
      </motion.div>

      {/* Offering popup — compact glass card with icon, title and
          description paragraphs. Closes on backdrop tap or the X button. */}
      <AnimatePresence>
        {activeOffering && openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setOpenIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="offering-title"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-brand-ink/70 backdrop-blur-md" />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex max-h-[72vh] w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-brand-paper text-brand-ink shadow-2xl sm:max-h-[78vh] sm:max-w-md"
            >
              {/* Header strip — compact, single line of metadata */}
              <div className="relative flex items-center justify-between gap-3 border-b border-brand-charcoal/10 px-4 py-3 sm:px-5 sm:py-4">
                {/* Subtle saffron glow behind the icon for a touch of warmth */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-brand-saffron/10 to-transparent"
                />
                <div className="relative flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-saffron text-brand-ink shadow-sm">
                    <activeOffering.icon strokeWidth={1.7} className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 text-[9px] uppercase tracking-[0.28em] text-brand-terracotta">
                      <Sparkles strokeWidth={1.8} className="h-2.5 w-2.5" />
                      What we do
                    </div>
                    <h3
                      id="offering-title"
                      className="mt-0.5 font-display text-[15.5px] font-medium leading-tight text-brand-ink sm:text-[17px]"
                    >
                      {activeOffering.label}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenIndex(null)}
                  aria-label="Close"
                  className="relative shrink-0 rounded-full p-1.5 text-brand-charcoal/55 transition-colors hover:bg-brand-charcoal/5 hover:text-brand-ink"
                >
                  <X strokeWidth={1.7} className="h-[18px] w-[18px]" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
                <div className="space-y-2.5 text-[12.5px] leading-[1.55] text-brand-charcoal/80 sm:text-[13.5px]">
                  {activeOffering.description.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Fixed footer with CTAs */}
              <div className="flex flex-wrap items-center gap-2 border-t border-brand-charcoal/10 bg-brand-paper px-4 py-3 sm:px-5 sm:py-4">
                <a
                  href="#book"
                  onClick={() => setOpenIndex(null)}
                  className="group inline-flex items-center gap-1.5 rounded-full bg-brand-ink px-4 py-2 text-[12px] font-medium text-brand-cream transition-all hover:bg-brand-terracotta"
                >
                  Inquire
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
                <a
                  href="https://wa.me/77757145327"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-charcoal/15 px-4 py-2 text-[12px] font-medium text-brand-ink transition-all hover:border-brand-terracotta/40 hover:text-brand-terracotta"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
