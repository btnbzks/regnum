"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Fade, RevealLines, useRuleDraw } from "@/components/motion/Reveal";

const VALUES = [
  { index: "01", title: "Az söz, çok iş", body: "Sunum değil, çalışan sürüm gösteririz." },
  { index: "02", title: "Yazılı gerekçe", body: "Verilen her kararın neden verildiği kayıt altındadır." },
  { index: "03", title: "Sahiplenme", body: "Teslim ettiğimiz sistemin arkasında dururuz." },
  { index: "04", title: "Uzun vade", body: "Bugünü kurtaran değil, üç yıl sonra da ayakta kalan çözümler." },
];

/**
 * Hakkında: gerçek amblem, hairline çerçevede ve hafif paralaksla.
 * Metin, adın anlamından yaklaşıma geçer.
 */
export function About() {
  const root = useRef<HTMLDivElement>(null);
  useRuleDraw(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-emblem]",
        { y: 60 },
        { y: -60, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
      gsap.fromTo(
        "[data-emblem-img]",
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: "[data-emblem]", start: "top 80%", once: true } },
      );
    },
    { scope: root },
  );

  return (
    <Section id="hakkinda" tone="ink" className="py-[14vh] overflow-hidden" labelledBy="hakkinda-baslik">
      <div ref={root} className="container-x">
        <SectionHeader index="06" label="REGNUM hakkında" />

        <div className="grid-12 mt-12 md:mt-20 gap-y-14 items-start">
          <figure data-emblem className="col-span-12 md:col-span-5 md:mt-10">
            <div className="relative border border-line p-5 md:p-8 bg-ink-2">
              <div data-emblem-img>
                <Image
                  src="/brand/regnum-amblem.webp"
                  alt="REGNUM amblemi: altın taçlar ve dallarla bağlanmış serif wordmark"
                  width={1277}
                  height={577}
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </figure>

          <div className="col-span-12 md:col-start-7 md:col-span-6">
            <RevealLines
              as="h2"
              className="font-display text-[clamp(34px,4.4vw,68px)] leading-[1.02]"
              lines={["Adı Latince.", <em key="e" className="italic">Anlamı: krallık.</em>]}
            />
            <p id="hakkinda-baslik" className="sr-only">
              REGNUM hakkında
            </p>
            <Fade className="mt-8 flex flex-col gap-5 text-[15px] leading-[1.7] text-muted max-w-[52ch]">
              <p>
                Regnum, Latincede krallık demektir. Sınırları belli, sahibi belli, kendi kurallarıyla ayakta duran bir
                alan. Yazılımı da böyle kurarız: temeli sağlam, sorumluluğu üstlenilmiş, uzun ömürlü.
              </p>
              <p>
                REGNUM; yazılım mimarisi, ürün tasarımı ve mühendisliği aynı masada toplayan bağımsız bir stüdyodur.
                Az sayıda işi, uzun süre birlikte çalışarak yaparız.
              </p>
            </Fade>

            <ol className="mt-12 border-t border-line">
              {VALUES.map((v, i) => (
                <Fade
                  as="li"
                  key={v.index}
                  delay={i * 0.06}
                  className="grid grid-cols-[3rem_1fr] md:grid-cols-[3.5rem_1fr_1.3fr] gap-x-5 gap-y-1 items-baseline py-5 border-b border-line"
                >
                  <span className="font-mono text-[11px] tracking-[0.18em] text-accent">{v.index}</span>
                  <h3 className="font-display text-[clamp(22px,1.9vw,30px)] leading-[1.1]">{v.title}</h3>
                  <p className="col-start-2 md:col-start-3 text-[14px] leading-[1.6] text-muted">{v.body}</p>
                </Fade>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
