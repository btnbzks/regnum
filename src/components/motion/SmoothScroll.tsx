"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion, setLenis } from "@/lib/motion";

/**
 * Lenis + GSAP ScrollTrigger köprüsü.
 * - Tek RAF: Lenis, GSAP ticker'ından sürülür.
 * - Reduced motion'da Lenis kurulmaz; yerel kaydırma kalır.
 * - Dokunmatikte Lenis zaten yerel kaydırmayı korur (syncTouch kapalı).
 */
export function SmoothScroll() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    if (prefersReducedMotion()) {
      document.documentElement.classList.add("no-motion");
      return;
    }

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      smoothWheel: true,
      syncTouch: false,
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // yazı tipleri yüklendikten sonra tetikleyici ölçülerini tazele
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
