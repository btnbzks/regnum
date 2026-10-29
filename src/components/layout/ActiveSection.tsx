"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { sections } from "@/config/site";

export type Tone = "ink" | "bone";
type Active = { id: string; index: string; label: string; tone: Tone };

const DEFAULT: Active = { id: "hero", index: "01", label: "Giriş", tone: "ink" };
const Ctx = createContext<Active>(DEFAULT);

/**
 * Görünümün ortasından geçen bölümü izler. Nav, ilerleme göstergesi ve
 * tonu (mürekkep/kemik) buradan okur; her biri kendi observer'ını kurmaz.
 */
export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Active>(DEFAULT);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          const meta = sections.find((s) => s.id === id);
          const tone = ((e.target as HTMLElement).dataset.tone as Tone) || "ink";
          setActive({ id, index: meta?.index ?? "", label: meta?.label ?? "", tone });
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return <Ctx.Provider value={active}>{children}</Ctx.Provider>;
}

export const useActiveSection = () => useContext(Ctx);
