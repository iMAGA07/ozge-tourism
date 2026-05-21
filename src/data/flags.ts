// Maps a region or country name to its flag (2-letter code → /public/flags/<code>.svg).
// Kazakhstan's own regions all resolve to the Kazakhstan flag.
export const flagFor: Record<string, string> = {
  // Kazakhstan + its regions
  Kazakhstan: "kz",
  Mangystau: "kz",
  Almaty: "kz",
  "South Kazakhstan": "kz",
  "East Kazakhstan": "kz",
  // Central Asia & neighbours
  Uzbekistan: "uz",
  Kyrgyzstan: "kg",
  Tajikistan: "tj",
  Turkmenistan: "tm",
  Afghanistan: "af",
  Iran: "ir",
};

export function flagSrc(name: string): string {
  const code = flagFor[name] ?? "kz";
  return `/flags/${code}.svg`;
}
