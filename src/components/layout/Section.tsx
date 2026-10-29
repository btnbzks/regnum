import type { ReactNode } from "react";
import type { Tone } from "./ActiveSection";

/**
 * Bölüm sarmalayıcı: id, ton ve izleme işaretleri tek yerden.
 */
export function Section({
  id,
  tone,
  children,
  className = "",
  labelledBy,
}: {
  id: string;
  tone: Tone;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      data-section
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={`tone-${tone} relative bg-bg text-fg ${className}`}
    >
      {children}
    </section>
  );
}
