"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion, scrollToId, useIntroState } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { Branch } from "@/components/brand/Branch";
import { Wordmark } from "@/components/brand/Wordmark";
import { Spark } from "@/components/brand/Crest";
import { Magnetic } from "@/components/ui/Magnetic";

/**
 * Hero: amblemin yapısı (merkez taç → altı dal) wordmark'ın üzerinde,
 * ifade ve çağrı çizginin altında. Açılış sahnesi bittiğinde oynar;
 * kaydırıldıkça dallar gerilir ve silinir, wordmark geri çekilir.
 */
export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const ready = useIntroState() === "done";

  useGSAP(
    () => {
      if (!ready || !root.current) return;
      const el = root.current;
      const q = gsap.utils.selector(el);
      const branch = q("[data-hero-branch]")[0];
      const paths = q("[data-branch-path], [data-branch-crown] path, [data-branch-node] path");
      const spark = q("[data-branch-spark]");
      const wordmark = q("[data-hero-wordmark]")[0];
      const letters = q("[data-letter]");
      const rule = q("[data-hero-rule]")[0];
      const lines = q("[data-hero-line]");
      const meta = q("[data-hero-meta]");
      const lower = q("[data-hero-lower]")[0];

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1 });
        gsap.set(paths, { strokeDashoffset: 0 });
        return;
      }

      gsap.set(el, { opacity: 1 });
      gsap.set(spark, { opacity: 0 });
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(paths, { strokeDashoffset: 0, duration: 1.5, stagger: { each: 0.025, from: "center" }, ease: "power2.inOut" }, 0)
        .to(spark, { opacity: 1, duration: 0.4 }, 1.1)
        .fromTo(letters, { yPercent: 112 }, { yPercent: 0, duration: 1.3, stagger: 0.05 }, 0.25)
        .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: "expo.inOut" }, 0.55)
        .fromTo(lines, { yPercent: 112 }, { yPercent: 0, duration: 1.1, stagger: 0.09 }, 0.8)
        .fromTo(meta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 }, 1.0);

      /* scroll: dallar gerilir ve çözülür, wordmark geri çekilir, alt blok hafif paralaks */
      gsap
        .timeline({
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
          defaults: { ease: "none" },
        })
        .to(branch, { yPercent: -35, scaleY: 1.35, opacity: 0, transformOrigin: "50% 100%" }, 0)
        .to(wordmark, { yPercent: -22, scale: 0.94, transformOrigin: "50% 0%" }, 0)
        .to(lower, { yPercent: -12 }, 0);

      /* mouse: çok hafif, yalnızca hassas işaretçide */
      if (isFinePointer()) {
        const bx = gsap.quickTo(branch, "x", { duration: 1.2, ease: "power3.out" });
        const by = gsap.quickTo(branch, "y", { duration: 1.2, ease: "power3.out" });
        const wx = gsap.quickTo(wordmark, "x", { duration: 1.4, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          bx(nx * 14);
          by(ny * 10);
          wx(nx * -6);
        };
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
      }
    },
    { dependencies: [ready], scope: root },
  );

  return (
    <Section id="hero" tone="ink" className="min-h-[100svh] flex flex-col pt-[var(--nav-h)] overflow-hidden grain">
      <div ref={root} className="container-x flex-1 flex flex-col" data-reveal>
        <div className="grid-12 pt-6 md:pt-10">
          <p data-hero-meta className="col-span-12 md:col-span-4 eyebrow">
            Bağımsız yazılım stüdyosu
          </p>
          <p data-hero-meta className="hidden md:block md:col-start-9 md:col-span-4 eyebrow text-right">
            Strateji · Mimari · Mühendislik
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-8 md:py-2">
          <div data-hero-branch className="w-[82%] sm:w-[56%] md:w-[36%] max-w-[520px] text-bone/70 will-change-transform">
            <Branch undrawn className="w-full" title="REGNUM amblemi: merkez taçtan altı dala uzanan düzen" />
          </div>
          <div data-hero-wordmark className="mt-2 md:-mt-2 will-change-transform">
            <Wordmark as="h1" className="text-[21vw] md:text-[12vw] leading-[0.95]" />
          </div>
        </div>

        <div data-hero-rule className="hairline origin-left" style={{ background: "var(--line-strong)" }} />

        <div data-hero-lower className="grid-12 py-8 md:py-10 gap-y-8">
          <h2 className="col-span-12 md:col-span-7 font-display text-[clamp(30px,4.4vw,60px)] leading-[1.04]">
            <span className="mask">
              <span data-hero-line className="block">Kalıcı olmak için</span>
            </span>
            <span className="mask">
              <span data-hero-line className="block">
                <em className="italic">tasarlanan</em> yazılım.
              </span>
            </span>
          </h2>
          <div className="col-span-12 md:col-start-9 md:col-span-4 flex flex-col gap-7 md:pt-3">
            <p data-hero-meta className="text-[15px] leading-[1.65] text-muted max-w-[36ch]">
              REGNUM; ürün stratejisi, yazılım mimarisi ve mühendisliği tek bir disiplin olarak ele alan bağımsız bir
              yazılım stüdyosudur.
            </p>
            <div data-hero-meta>
              <Magnetic>
                <a
                  href="#iletisim"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("iletisim");
                  }}
                  className="group inline-flex items-center gap-3 border border-line-strong px-5 py-3 text-[13px] tracking-[0.04em] transition-colors duration-500 hover:border-accent hover:text-accent"
                >
                  <Spark className="w-2.5 h-2.5 text-accent transition-transform duration-500 group-hover:rotate-90" />
                  Projenizi anlatın
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        <div data-hero-meta className="flex items-center justify-end gap-4 pb-6 eyebrow">
          <span className="relative block w-px h-10 overflow-hidden" style={{ background: "var(--line)" }}>
            <span className="absolute left-0 top-0 w-px h-3 bg-accent animate-[drip_2.2s_var(--ease-in-out)_infinite]" />
          </span>
          <span>Kaydırın</span>
        </div>
      </div>
    </Section>
  );
}
