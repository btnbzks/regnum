"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Fade, useRuleDraw } from "@/components/motion/Reveal";

const MANIFESTO =
  "Yazılım, bir sorunu bir kere çözmek değildir. Yıllarca çalışacak bir düzeni kurmak; o düzenin gerekçelerini yazılı bırakmak ve bir sonraki ekibin de onu anlayabilmesini sağlamaktır. Biz gösterişli olanı değil, doğru olanı inşa ederiz.";

const PRINCIPLES = [
  { index: "01", title: "Önce anlamak", body: "Kod, işleyiş kavrandıktan sonra yazılır. Varsayım üzerine inşa etmeyiz." },
  { index: "02", title: "Gerekçeli karar", body: "Her mimari seçimin yazılı bir nedeni vardır. Moda değil, ihtiyaç belirler." },
  { index: "03", title: "Devredilebilir sistem", body: "Yalnızca bizim anladığımız bir sistem, bitmiş bir sistem değildir." },
];

/**
 * Manifesto: kemik zemin, kaydırdıkça kelime kelime koyulaşan tek bir paragraf.
 * Sağ üstte dikişe oturan dev "02" numarası; mürekkepten kemiğe geçişi taşıyan öğe.
 */
export function Manifesto() {
  const root = useRef<HTMLDivElement>(null);
  useRuleDraw(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");
      gsap.to(words, {
        opacity: 1,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: { trigger: "[data-words]", start: "top 78%", end: "bottom 46%", scrub: 0.5 },
      });
      gsap.to("[data-seam]", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <Section id="manifesto" tone="bone" className="py-[16vh] md:py-[20vh] overflow-hidden" labelledBy="manifesto-baslik">
      <div ref={root} className="container-x relative">
        <span
          aria-hidden="true"
          data-seam
          className="absolute right-[-3vw] -top-[22vh] md:-top-[30vh] font-display leading-none select-none pointer-events-none text-[46vw] md:text-[26vw]"
          style={{ WebkitTextStroke: "1px var(--line)", color: "transparent" }}
        >
          02
        </span>

        <SectionHeader index="02" label="Manifesto" />

        <div className="grid-12 mt-12 md:mt-24">
          <h2 id="manifesto-baslik" className="sr-only">
            Manifesto
          </h2>
          <p
            data-words
            className="col-span-12 md:col-start-2 md:col-span-10 font-display text-[clamp(30px,4.6vw,74px)] leading-[1.1]"
          >
            {MANIFESTO.split(" ").map((w, i) => (
              <span key={i} data-word className="inline-block mr-[0.26em] opacity-[0.14] [html.no-motion_&]:opacity-100">
                {w}
              </span>
            ))}
          </p>
        </div>

        <ol className="grid-12 mt-20 md:mt-36 gap-y-0">
          {PRINCIPLES.map((p, i) => (
            <Fade
              as="li"
              key={p.index}
              delay={i * 0.08}
              className="col-span-12 md:col-start-6 md:col-span-7 border-t border-line py-7 md:py-8 grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr_1.2fr] gap-x-6 gap-y-3 items-baseline"
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-accent">{p.index}</span>
              <h3 className="font-display text-[clamp(24px,2.2vw,34px)] leading-[1.1]">{p.title}</h3>
              <p className="col-start-2 md:col-start-3 text-[15px] leading-[1.65] text-muted">{p.body}</p>
            </Fade>
          ))}
        </ol>
      </div>
    </Section>
  );
}
