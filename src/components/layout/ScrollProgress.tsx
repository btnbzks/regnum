"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useActiveSection } from "./ActiveSection";
import { sections } from "@/config/site";

/**
 * Sağ kenarda düşey bir hat ve üzerinde ilerleyen tek bir düğüm;
 * sol altta aktif bölümün künyesi. Çubuk ya da yüzde yok.
 */
export function ScrollProgress() {
  const active = useActiveSection();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>("[data-track]");
      const node = ref.current?.querySelector<HTMLElement>("[data-node]");
      const fill = ref.current?.querySelector<HTMLElement>("[data-fill]");
      if (!track || !node || !fill) return;
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const travel = track.clientHeight - node.offsetHeight;
          gsap.set(node, { y: self.progress * travel });
          gsap.set(fill, { scaleY: self.progress });
        },
      });
      return () => st.kill();
    },
    { scope: ref },
  );

  const total = sections.length;

  return (
    <div
      ref={ref}
      className={`tone-${active.tone} pointer-events-none fixed inset-0 z-[80]`}
      style={{ color: "var(--fg)" }}
      aria-hidden="true"
    >
      <div
        data-track
        className="absolute top-[calc(var(--nav-h)+12px)] bottom-7 right-[14px] sm:right-[18px] w-px"
        style={{ background: "var(--line)" }}
      >
        <div data-fill className="absolute inset-0 origin-top" style={{ background: "var(--line-strong)", transform: "scaleY(0)" }} />
        <div data-node className="absolute -left-[3px] top-0 w-[7px] h-[7px] rounded-full bg-accent" />
      </div>

      <div
        className="absolute left-[var(--gutter)] bottom-6 hidden sm:flex items-baseline gap-3 font-mono text-[10px] tracking-[0.18em] uppercase transition-opacity duration-500"
        style={{ opacity: active.label ? 1 : 0 }}
      >
        <span className="text-accent">{active.index}</span>
        <span style={{ color: "var(--muted)" }}>/ 0{total}</span>
        <span className="hidden md:inline" style={{ color: "var(--muted)" }}>
          — {active.label}
        </span>
      </div>
    </div>
  );
}
