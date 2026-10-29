import { Spark } from "@/components/brand/Crest";

/**
 * Her bölümün üst künyesi: indeks, etiket, uzayan çizgi.
 * Çizgi ScrollTrigger ile 0→1 ölçeklenir (data-rule).
 */
export function SectionHeader({
  index,
  label,
  className = "",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="eyebrow flex items-center gap-3 shrink-0" style={{ color: "var(--fg)" }}>
        <span className="font-mono">{index}</span>
        <Spark className="w-2 h-2 text-accent" />
        <span>{label}</span>
      </span>
      <span data-rule className="hairline flex-1 origin-left" />
    </div>
  );
}
