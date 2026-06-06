"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// The interactive map is by far the heaviest part of the page: it bundles
// ~230 KB of region geometry and builds up to ~100 SVG paths with
// animations. We code-split it into its own chunk AND only mount it once
// the user scrolls near it. On weak/old devices the rest of the page now
// loads and stays responsive; the map's cost is paid lazily, only if the
// visitor actually reaches it.
const InteractiveMap = dynamic(
  () => import("./InteractiveMap").then((m) => m.InteractiveMap),
  { ssr: false, loading: () => <MapPlaceholder /> }
);

function MapPlaceholder() {
  return (
    <div className="relative flex min-h-[520px] items-center justify-center md:min-h-[640px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(224,160,57,0.10),transparent_55%)]" />
      <div className="flex flex-col items-center gap-3 text-brand-cream/45">
        <span className="h-7 w-7 animate-spin rounded-full border-2 border-brand-cream/20 border-t-brand-saffron" />
        <span className="text-[11px] uppercase tracking-[0.3em]">Loading map…</span>
      </div>
    </div>
  );
}

export function MapSection() {
  const ref = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      // Start loading a bit before the section enters the viewport so the
      // chunk is ready by the time it's on screen.
      { rootMargin: "500px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  if (show) return <InteractiveMap />;

  return (
    <section
      id="map"
      ref={ref}
      className="relative overflow-hidden bg-brand-ink py-20 text-brand-cream md:py-28"
    >
      <MapPlaceholder />
    </section>
  );
}
