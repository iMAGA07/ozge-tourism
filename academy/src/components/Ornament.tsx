// A stylised "qoshqar müiz" (ram's horn) curl — the classic Kazakh ornament
// echoed in the ZGE wordmark — used as a divider and accent.
export function Ornament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 24" fill="none" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M0 12h48" opacity=".5" />
        <path d="M112 12h48" opacity=".5" />
        <path d="M80 4c-7 0-12 4-12 8s3 6 6 6 4-2 4-4-1.5-3-3-3" />
        <path d="M80 4c7 0 12 4 12 8s-3 6-6 6-4-2-4-4 1.5-3 3-3" />
        <path d="M68 12c-4 0-8 2-12 0M92 12c4 0 8 2 12 0" />
        <circle cx="80" cy="20" r="1.4" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
