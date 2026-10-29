"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { expertise } from "@/data/expertise";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Branch } from "@/components/brand/Branch";
import { useRuleDraw } from "@/components/motion/Reveal";

/**
 * Uzmanlık: sol tarafta sabit kalan ağaç ve dev numara; sağda altı dal.
 * Amblemdeki altı küçük taç = altı uzmanlık alanı. Kaydırdıkça ilgili dal yanar.
 * Mobilde ağaç üstte kalır, liste düz akar.
 */
export function Expertise() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useRuleDraw(root);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-item]");
      const triggers = items.map((item, i) =>
        ScrollTrigger.create({
          trigger: item,
          start: "top 58%",
          end: "bottom 58%",
          onToggle: (self) => self.isActive && setActive(i),
        }),
      );

      if (!prefersReducedMotion()) {
        items.forEach((item) => {
          const parts = item.querySelectorAll("[data-part]");
          gsap.fromTo(
            parts,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 82%", once: true },
            },
          );
        });
      }
      return () => triggers.forEach((t) => t.kill());
    },
    { scope: root },
  );

  return (
    <Section id="uzmanlik" tone="ink" className="py-[14vh]" labelledBy="uzmanlik-baslik">
      <div ref={root} className="container-x">
        <SectionHeader index="03" label="Uzmanlık alanlarımız" />

        <div className="grid-12 mt-10 md:mt-16">
          {/* sol: sabit kompozisyon */}
          <div className="col-span-12 md:col-span-5 md:sticky md:top-[calc(var(--nav-h)+16px)] md:h-[calc(100svh-var(--nav-h)-32px)] md:pb-14 flex flex-col justify-between gap-8">
            <h2 id="uzmanlik-baslik" className="font-display text-[clamp(30px,3.2vw,46px)] leading-[1.05] max-w-[18ch]">
              Altı dal, <em className="italic">tek</em> düzen.
            </h2>

            <div className="text-bone/55 w-full max-w-[460px]">
              <Branch active={active} className="w-full" title={`Uzmanlık ağacı — aktif: ${expertise[active].title}`} />
            </div>

            <div className="hidden md:flex items-end justify-between">
              <div className="relative h-[7vw] min-h-[72px] w-[10vw]" aria-hidden="true">
                {expertise.map((e, i) => (
                  <span
                    key={e.id}
                    className="absolute left-0 bottom-0 font-display leading-none text-[7vw] transition-[opacity,transform] duration-700"
                    style={{
                      opacity: active === i ? 1 : 0,
                      transform: active === i ? "translateY(0)" : "translateY(12%)",
                      transitionTimingFunction: "var(--ease-out)",
                      color: "var(--muted)",
                    }}
                  >
                    {e.index}
                  </span>
                ))}
              </div>
              <p className="eyebrow text-right max-w-[22ch]">Amblemdeki altı taç, altı uzmanlık alanı</p>
            </div>
          </div>

          {/* sağ: akan liste */}
          <ol className="col-span-12 md:col-start-7 md:col-span-6 mt-12 md:mt-0">
            {expertise.map((e) => (
              <li
                key={e.id}
                id={e.id}
                data-item
                className="border-t border-line py-10 md:py-14 md:min-h-[62vh] flex flex-col justify-center"
              >
                <span data-part className="font-mono text-[11px] tracking-[0.18em] text-accent">
                  {e.index}
                </span>
                <h3 data-part className="mt-4 font-display text-[clamp(30px,3.4vw,54px)] leading-[1.04]">
                  {e.title}
                </h3>
                <p data-part className="mt-3 font-display italic text-[clamp(19px,1.7vw,26px)] text-muted">
                  {e.short}
                </p>
                <p data-part className="mt-6 text-[15px] leading-[1.65] text-muted max-w-[46ch]">
                  {e.body}
                </p>
                <ul data-part className="mt-8 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[11px] tracking-[0.12em] uppercase">
                  {e.stack.map((s) => (
                    <li key={s} className="star">
                      {s}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
