"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { site } from "@/config/site";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Branch } from "@/components/brand/Branch";
import { Magnetic } from "@/components/ui/Magnetic";
import { Fade, RevealLines, useRuleDraw } from "@/components/motion/Reveal";

/**
 * Kapanış sahnesi. Kemik zemin, tek kelime, ve sayfanın sonunda yeniden çizilen amblem ağacı.
 * İletişim bilgileri yapılandırmadan gelir; boş alan gösterilmez.
 */
export function Contact() {
  const root = useRef<HTMLDivElement>(null);
  useRuleDraw(root);
  const { contact, social } = site;
  const details = [
    contact.phone ? { k: "Telefon", v: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` } : null,
    contact.address ? { k: "Adres", v: contact.address } : null,
    contact.hours ? { k: "Çalışma saatleri", v: contact.hours } : null,
  ].filter(Boolean) as { k: string; v: string; href?: string }[];

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-closing] path", { strokeDashoffset: 0 });
        return;
      }
      const paths = gsap.utils.toArray<SVGPathElement>("[data-closing] path");
      gsap.to(paths, {
        strokeDashoffset: 0,
        ease: "none",
        stagger: { each: 0.02, from: "center" },
        scrollTrigger: { trigger: "[data-closing]", start: "top 95%", end: "bottom 70%", scrub: 0.6 },
      });
    },
    { scope: root },
  );

  return (
    <Section
      id="iletisim"
      tone="bone"
      className="min-h-[100svh] flex flex-col pt-[14vh] overflow-hidden"
      labelledBy="iletisim-baslik"
    >
      <div ref={root} className="container-x flex-1 flex flex-col">
        <SectionHeader index="07" label="İletişim" />

        <div className="grid-12 mt-14 md:mt-20 items-end gap-y-10">
          <RevealLines
            as="h2"
            className="col-span-12 md:col-span-8 font-display leading-[0.9] text-[clamp(64px,15vw,240px)] -ml-[0.04em]"
            lines={["Konuşalım."]}
          />
          <p id="iletisim-baslik" className="sr-only">
            İletişim
          </p>
          <Fade className="col-span-12 md:col-start-9 md:col-span-4 text-[15px] leading-[1.65] text-muted max-w-[36ch] md:pb-4">
            Bir projeniz, yarım kalmış bir sistem ya da yalnızca bir sorunuz varsa yazın. İlk görüşme için hazırlık
            gerekmez.
          </Fade>
        </div>

        <div className="grid-12 mt-14 md:mt-20 border-t border-line pt-8 gap-y-10">
          {contact.email ? (
            <div className="col-span-12 md:col-span-7 flex flex-col gap-3">
              <span className="eyebrow">E-posta</span>
              <Magnetic strength={0.18}>
                <a
                  href={`mailto:${contact.email}`}
                  className="u-link inline-block font-display text-[clamp(26px,3.6vw,56px)] leading-[1.1] break-all"
                >
                  {contact.email}
                </a>
              </Magnetic>
            </div>
          ) : (
            <div className="col-span-12 md:col-span-7">
              <span className="eyebrow">E-posta</span>
              <p className="mt-3 text-[15px] text-muted">İletişim adresi yapılandırmada tanımlanmadı.</p>
            </div>
          )}

          <dl className="col-span-12 md:col-start-9 md:col-span-4 flex flex-col gap-5">
            {details.map((d) => (
              <div key={d.k} className="flex flex-col gap-1">
                <dt className="eyebrow">{d.k}</dt>
                <dd className="text-[15px]">
                  {d.href ? (
                    <a href={d.href} className="u-link inline-block">
                      {d.v}
                    </a>
                  ) : (
                    d.v
                  )}
                </dd>
              </div>
            ))}
            {social.length ? (
              <div className="flex flex-col gap-1">
                <dt className="eyebrow">Sosyal</dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
                  {social.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="u-link inline-block">
                      {s.label}
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}
            {!details.length && !social.length ? (
              <div className="flex flex-col gap-1">
                <dt className="eyebrow">Yanıt süresi</dt>
                <dd className="text-[15px] text-muted">Her yazışma bir iş günü içinde yanıtlanır.</dd>
              </div>
            ) : null}
          </dl>
        </div>

        {/* kapanış: ağaç kaydırdıkça yeniden çizilir */}
        <div data-closing className="mt-auto pt-[12vh] md:pt-[16vh] text-ink/45 flex justify-center">
          <Branch undrawn className="w-[92%] md:w-[60%] max-w-[760px]" />
        </div>
      </div>
    </Section>
  );
}
