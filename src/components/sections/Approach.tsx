"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { process } from "@/data/process";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Fade, RevealLines, useRuleDraw } from "@/components/motion/Reveal";

/**
 * Yaklaşım: tek bir düşey hat beş düğümden geçer; hat kaydırdıkça pirinçle dolar,
 * aşamalar kontrollü asimetriyle sağa-sola kayar.
 */
export function Approach() {
  const root = useRef<HTMLDivElement>(null);
  useRuleDraw(root);

  useGSAP(
    () => {
      const stages = gsap.utils.toArray<HTMLElement>("[data-stage]");
      const triggers = stages.map((s) =>
        ScrollTrigger.create({
          trigger: s,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => s.querySelector("[data-stage-node]")?.classList.toggle("is-active", self.isActive),
        }),
      );
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          "[data-rail]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-rail-wrap]", start: "top 60%", end: "bottom 60%", scrub: 0.4 },
          },
        );
      }
      return () => triggers.forEach((t) => t.kill());
    },
    { scope: root },
  );

  return (
    <Section id="yaklasim" tone="bone" className="py-[14vh] overflow-hidden" labelledBy="yaklasim-baslik">
      <div ref={root} className="container-x">
        <SectionHeader index="04" label="Çalışma yaklaşımımız" />

        <div className="grid-12 mt-12 md:mt-20 gap-y-8 items-end">
          <RevealLines
            as="h2"
            className="col-span-12 md:col-span-8 font-display text-[clamp(36px,5.4vw,84px)] leading-[1.0]"
            lines={["Beş aşama,", <em key="e" className="italic">tek sorumluluk.</em>]}
          />
          <Fade className="col-span-12 md:col-start-9 md:col-span-4 text-[15px] leading-[1.65] text-muted max-w-[38ch]">
            Keşiften sürdürülebilirliğe kadar her aşamanın adı konmuş bir çıktısı vardır. Hiçbiri atlanmaz; hiçbiri
            süs değildir.
          </Fade>
          <p id="yaklasim-baslik" className="sr-only">
            Çalışma yaklaşımımız
          </p>
        </div>

        <div data-rail-wrap className="relative mt-16 md:mt-28">
          <div
            className="absolute top-0 bottom-0 w-px left-[3px] md:left-[calc(100%/12*1.5)]"
            style={{ background: "var(--line)" }}
          >
            <div data-rail className="absolute inset-0 origin-top bg-accent" />
          </div>

          <ol>
            {process.map((s, i) => (
              <li key={s.index} data-stage className="relative grid-12 py-10 md:py-16">
                <span
                  data-stage-node
                  className="stage-node absolute left-0 md:left-[calc(100%/12*1.5-3px)] top-[calc(2.5rem+0.55em)] md:top-[calc(4rem+0.55em)] w-[7px] h-[7px] rounded-full border"
                  style={{ borderColor: "var(--line-strong)", background: "var(--bg)" }}
                  aria-hidden="true"
                />
                <Fade
                  y={26}
                  className={`col-span-12 pl-7 md:pl-0 ${
                    i % 2 === 0 ? "md:col-start-3 md:col-span-6" : "md:col-start-6 md:col-span-6"
                  }`}
                >
                  <div className="flex items-baseline gap-5 md:gap-7">
                    <span className="font-display leading-none text-[clamp(40px,6vw,92px)]" style={{ color: "var(--muted)" }}>
                      {s.index}
                    </span>
                    <h3 className="font-display text-[clamp(28px,3.2vw,50px)] leading-[1.02]">{s.title}</h3>
                  </div>
                  <p className="mt-4 font-display italic text-[clamp(19px,1.7vw,26px)]">{s.lead}</p>
                  <p className="mt-5 text-[15px] leading-[1.65] text-muted max-w-[50ch]">{s.body}</p>
                  <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-6 font-mono text-[11px] uppercase tracking-[0.12em] border-t border-line pt-4">
                    {s.outputs.map((o) => (
                      <li key={o} className="star">
                        {o}
                      </li>
                    ))}
                  </ul>
                </Fade>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
