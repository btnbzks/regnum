"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion, scrollToId } from "@/lib/motion";
import { projects } from "@/data/projects";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Fade, RevealLines, useRuleDraw } from "@/components/motion/Reveal";
import { Spark } from "@/components/brand/Crest";

/**
 * Seçilmiş işler.
 * - projects boşsa: dürüst, tasarlanmış bir "yer ayrıldı" durumu. Sahte iş gösterilmez.
 * - projects doluysa: editoryal satır listesi; masaüstünde imleci izleyen önizleme.
 */
export function Works() {
  const root = useRef<HTMLDivElement>(null);
  useRuleDraw(root);

  return (
    <Section id="isler" tone="ink" className="py-[14vh]" labelledBy="isler-baslik">
      <div ref={root} className="container-x">
        <SectionHeader index="05" label="Seçilmiş işler" />
        {projects.length === 0 ? <Reserved /> : <ProjectList />}
      </div>
    </Section>
  );
}

function Reserved() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const frames = gsap.utils.toArray<HTMLElement>("[data-frame]");
      frames.forEach((f, i) => {
        gsap.fromTo(
          f,
          { y: i === 0 ? 40 : 90 },
          { y: i === 0 ? -20 : -50, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <div className="grid-12 mt-12 md:mt-20 gap-y-8 items-end">
        <RevealLines
          as="h2"
          className="col-span-12 md:col-span-8 font-display text-[clamp(36px,5.4vw,84px)] leading-[1.0]"
          lines={["Yayınlanacak işler,", <em key="e" className="italic">onay sırasında.</em>]}
        />
        <p id="isler-baslik" className="sr-only">
          Seçilmiş işler
        </p>
        <Fade className="col-span-12 md:col-start-9 md:col-span-4 flex flex-col gap-5 text-[15px] leading-[1.65] text-muted max-w-[38ch]">
          <p>
            Tamamlanan projeler, müşteri onayı alındıkça burada yer alacak. Temsilî örnek ya da uydurma sonuç
            göstermiyoruz.
          </p>
          <a
            href="#iletisim"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("iletisim");
            }}
            className="u-link self-start text-bone text-[13px] tracking-[0.04em]"
          >
            Referans için yazın
          </a>
        </Fade>
      </div>

      <div className="grid-12 mt-16 md:mt-28 gap-y-10" aria-hidden="true">
        {[0, 1].map((i) => (
          <div
            key={i}
            data-frame
            className={`relative aspect-[4/3] md:aspect-[5/4] border border-line ${
              i === 0 ? "col-span-12 md:col-span-6" : "col-span-12 md:col-start-8 md:col-span-5 md:mt-[18vh]"
            }`}
          >
            <Corner className="top-0 left-0" />
            <Corner className="top-0 right-0 rotate-90" />
            <Corner className="bottom-0 right-0 rotate-180" />
            <Corner className="bottom-0 left-0 -rotate-90" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
              <Spark className="w-2.5 h-2.5 text-accent" />
              <span>Yer ayrıldı — 0{i + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <span className={`absolute w-3 h-3 ${className}`} style={{ borderTop: "1px solid var(--line-strong)", borderLeft: "1px solid var(--line-strong)" }} />
  );
}

function ProjectList() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isFinePointer() || prefersReducedMotion()) return;
      const preview = ref.current!.querySelector<HTMLElement>("[data-preview]");
      const imgs = ref.current!.querySelectorAll<HTMLElement>("[data-preview-img]");
      if (!preview) return;
      const x = gsap.quickTo(preview, "x", { duration: 0.8, ease: "power3.out" });
      const y = gsap.quickTo(preview, "y", { duration: 0.8, ease: "power3.out" });
      const rows = ref.current!.querySelectorAll<HTMLElement>("[data-row]");
      const move = (e: PointerEvent) => {
        x(e.clientX + 24);
        y(e.clientY - preview.offsetHeight / 2);
      };
      rows.forEach((row, i) => {
        row.addEventListener("pointerenter", () => {
          gsap.to(preview, { opacity: 1, scale: 1, duration: 0.5 });
          imgs.forEach((im, j) => gsap.set(im, { opacity: i === j ? 1 : 0 }));
        });
        row.addEventListener("pointerleave", () => gsap.to(preview, { opacity: 0, scale: 0.96, duration: 0.4 }));
      });
      window.addEventListener("pointermove", move, { passive: true });
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="mt-12 md:mt-20">
      <h2 id="isler-baslik" className="sr-only">
        Seçilmiş işler
      </h2>
      <ol>
        {projects.map((p, i) => {
          const Row = p.href ? "a" : "div";
          return (
            <li key={p.slug} data-row className="border-t border-line">
              <Row
                {...(p.href ? { href: p.href, target: "_blank", rel: "noreferrer" } : {})}
                className="grid-12 py-8 md:py-10 items-baseline gap-y-4 group"
              >
                <span className="col-span-2 md:col-span-1 font-mono text-[11px] tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 md:col-span-6 font-display text-[clamp(28px,3.4vw,56px)] leading-[1.04] group-hover:italic transition-all">
                  {p.client} <span className="text-muted">— {p.title}</span>
                </span>
                <span className="col-span-6 md:col-start-9 md:col-span-2 font-mono text-[11px] tracking-[0.12em] uppercase text-muted">
                  {p.sector}
                </span>
                <span className="col-span-6 md:col-span-2 md:text-right font-mono text-[11px] tracking-[0.12em] text-muted">
                  {p.year}
                </span>
                <p className="col-span-12 md:col-start-2 md:col-span-6 text-[15px] leading-[1.65] text-muted max-w-[52ch]">
                  {p.summary}
                </p>
                {p.image ? (
                  <div className="col-span-12 md:hidden border border-line">
                    <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} className="w-full h-auto" />
                  </div>
                ) : null}
              </Row>
            </li>
          );
        })}
      </ol>
      <div className="border-t border-line" />

      {/* masaüstü imleç önizlemesi */}
      <div
        data-preview
        aria-hidden="true"
        className="hidden md:block pointer-events-none fixed top-0 left-0 z-[70] w-[22vw] aspect-[4/3] opacity-0 scale-95 border border-line bg-ink-2 overflow-hidden"
      >
        {projects.map((p) =>
          p.image ? (
            <Image
              key={p.slug}
              data-preview-img
              src={p.image.src}
              alt=""
              width={p.image.width}
              height={p.image.height}
              className="absolute inset-0 w-full h-full object-cover opacity-0"
            />
          ) : (
            <span key={p.slug} data-preview-img className="absolute inset-0 opacity-0" />
          ),
        )}
      </div>
    </div>
  );
}
