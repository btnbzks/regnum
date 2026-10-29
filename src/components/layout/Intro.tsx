"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Branch } from "@/components/brand/Branch";
import { Wordmark } from "@/components/brand/Wordmark";
import { getLenis, markIntroSeen, resolveIntro, setIntroState, useIntroState } from "@/lib/motion";

/**
 * Açılış sahnesi. Oturumda bir kez oynar (sessionStorage), reduced-motion'da hiç oynamaz.
 * Sahte yükleme yüzdesi yoktur; içerik arkada hazır, perde ~2.3 sn sonra kalkar.
 * Kaydırma, sahne boyunca Lenis ile durdurulur.
 */
export function Intro() {
  const state = useIntroState();
  const play = state === "playing";
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resolveIntro();
  }, []);

  useGSAP(
    () => {
      if (!play || !root.current) return;
      const el = root.current;
      getLenis()?.stop();
      document.documentElement.classList.add("intro-playing");

      const paths = el.querySelectorAll<SVGPathElement>("[data-branch-path], [data-branch-crown] path, [data-branch-node] path");
      const letters = el.querySelectorAll<HTMLElement>("[data-letter]");
      const rule = el.querySelector<HTMLElement>("[data-intro-rule]");
      const spark = el.querySelector<SVGElement>("[data-branch-spark]");

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          markIntroSeen();
          getLenis()?.start();
          document.documentElement.classList.remove("intro-playing");
          document.documentElement.classList.add("intro-done");
          setIntroState("done"); // React perdeyi kaldırır
        },
      });

      tl.set(spark, { opacity: 0 })
        .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "expo.inOut" }, 0.1)
        .to(paths, { strokeDashoffset: 0, duration: 1.1, stagger: { each: 0.03, from: "center" }, ease: "power2.inOut" }, 0.35)
        .to(spark, { opacity: 1, duration: 0.3 }, 1.0)
        .fromTo(letters, { yPercent: 110 }, { yPercent: 0, duration: 1.0, stagger: 0.045 }, 0.75)
        .to({}, { duration: 0.35 })
        .to(el, { yPercent: -100, duration: 1.0, ease: "expo.inOut" }, ">")
        .to([rule, letters], { yPercent: -40, duration: 1.0, ease: "expo.inOut" }, "<");
    },
    { dependencies: [play], scope: root },
  );

  if (!play) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] bg-ink text-bone flex items-center justify-center container-x"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-[880px] flex flex-col items-center gap-10 md:gap-14">
        <Branch undrawn className="w-[78%] md:w-[66%] text-bone/80" />
        <Wordmark className="text-[20vw] md:text-[9rem]" />
        <div data-intro-rule className="hairline w-full origin-center" style={{ background: "var(--line-strong)" }} />
      </div>
    </div>
  );
}
