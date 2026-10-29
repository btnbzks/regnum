"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type Lenis from "lenis";

/* ───────── reduced motion ───────── */
const RM_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeRM(cb: () => void) {
  const mq = window.matchMedia(RM_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeRM,
    () => window.matchMedia(RM_QUERY).matches,
    () => false,
  );
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(RM_QUERY).matches;
}

/* ───────── pointer / viewport ───────── */
export function useMediaQuery(query: string): boolean {
  const [matches, set] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => set(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ───────── lenis singleton ───────── */
let lenisRef: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenisRef = l;
};
export const getLenis = () => lenisRef;

/** Bir bölüme kaydır. Lenis yoksa yerel kaydırmaya düşer. */
export function scrollToId(id: string, offset = 0) {
  const el = document.getElementById(id);
  if (!el) return;
  const l = getLenis();
  if (l && !prefersReducedMotion()) {
    l.scrollTo(el, { offset, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}

/* ───────── intro state ───────── */
export const INTRO_KEY = "regnum:intro-seen";

export function introAlreadySeen(): boolean {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return true;
  }
}
export function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    /* private mode */
  }
}

/* ───────── intro durumu (harici depo; effect içinde setState gerekmez) ───────── */
type IntroState = "unknown" | "playing" | "done";
let introState: IntroState = "unknown";
const introListeners = new Set<() => void>();

export function setIntroState(s: IntroState) {
  introState = s;
  introListeners.forEach((l) => l());
}
export function useIntroState(): IntroState {
  return useSyncExternalStore(
    (cb) => {
      introListeners.add(cb);
      return () => introListeners.delete(cb);
    },
    () => introState,
    () => "unknown",
  );
}
/** İlk istemci çalıştırmasında karar ver: oynat mı, atla mı. Idempotent. */
export function resolveIntro(): IntroState {
  if (introState !== "unknown") return introState;
  const skip = introAlreadySeen() || prefersReducedMotion();
  setIntroState(skip ? "done" : "playing");
  if (skip) document.documentElement.classList.add("intro-done");
  return introState;
}
