"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Satır maskesiyle açılan başlık. Satırlar yazar tarafından verilir;
 * böylece kırılımlar tasarım kararıdır, ölçüm gerektirmez.
 */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
  start = "top 80%",
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const inner = ref.current!.querySelectorAll<HTMLElement>("[data-line]");
      gsap.set(ref.current, { opacity: 1 });
      gsap.fromTo(
        inner,
        { yPercent: 110, rotate: 0.6 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.09,
          delay,
          scrollTrigger: { trigger: ref.current, start, once: true },
        },
      );
    },
    { scope: ref },
  );

  const Comp = Tag as "h2";
  return (
    <Comp ref={ref as never} className={className} data-reveal>
      {lines.map((l, i) => (
        <span key={i} className="mask">
          <span data-line className={`block origin-left ${lineClassName}`}>
            {l}
          </span>
        </span>
      ))}
    </Comp>
  );
}

/** Yumuşak giriş: küçük y + opacity. Paragraf ve küçük bloklar için. */
export function Fade({
  children,
  className = "",
  delay = 0,
  y = 18,
  start = "top 85%",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay,
          scrollTrigger: { trigger: ref.current, start, once: true },
        },
      );
    },
    { scope: ref },
  );
  const Comp = Tag as "div";
  return (
    <Comp ref={ref as never} className={className} data-reveal>
      {children}
    </Comp>
  );
}

/** Bölüm künyesindeki çizgileri ve hairline'ları görünürken 0→1 çizer. */
export function useRuleDraw(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });
    },
    { scope },
  );
}
