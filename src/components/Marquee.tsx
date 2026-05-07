"use client";
import Image from "next/image";
import { galleryStrip } from "@/data/photos";

export function Marquee() {
  const items = [...galleryStrip, ...galleryStrip];
  return (
    <section
      aria-hidden="true"
      className="relative w-full overflow-hidden border-y border-brand-mist/70 bg-brand-paper py-6"
    >
      <div className="flex w-max animate-marquee gap-3 will-change-transform">
        {items.map((src, i) => (
          <div
            key={i}
            className="relative h-[110px] w-[150px] shrink-0 overflow-hidden rounded-md sm:h-[140px] sm:w-[200px] md:h-[170px] md:w-[240px]"
          >
            <Image
              src={`/photos/${src}`}
              alt=""
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
