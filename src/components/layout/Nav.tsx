"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/config/site";
import { Crest } from "@/components/brand/Crest";
import { useActiveSection } from "./ActiveSection";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis, prefersReducedMotion, scrollToId } from "@/lib/motion";

/**
 * Tipografik üst navigasyon.
 * - Tonu (mürekkep/kemik) aktif bölümden alır.
 * - Kaydırıldığında incelir ve zemin kazanır.
 * - Mobilde tam ekran menü; odak tuzağı, Escape, kaydırma kilidi.
 */
export function Nav() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 48);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback(
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setOpen(false);
      history.replaceState(null, "", `#${id}`);
      // menü kapanırken kaydırma kilidi kalksın, sonra git
      requestAnimationFrame(() => scrollToId(id));
    },
    [],
  );

  /* mobil menü: kilit, odak, escape */
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    const toggle = toggleRef.current;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const f = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a, button")).filter(
        (n) => !n.hasAttribute("disabled"),
      );
      if (!f.length) return;
      const firstEl = f[0];
      const lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
      toggle?.focus();
    };
  }, [open]);

  useGSAP(
    () => {
      if (!open || !menuRef.current || prefersReducedMotion()) return;
      const items = menuRef.current.querySelectorAll("[data-menu-item]");
      const foot = menuRef.current.querySelectorAll("[data-menu-foot]");
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(menuRef.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.inOut" })
        .fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.06 }, 0.25)
        .fromTo(foot, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.6);
    },
    { dependencies: [open], scope: menuRef },
  );

  const tone = open ? "ink" : active.tone;

  return (
    <>
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[120] focus:bg-bone focus:text-ink focus:px-3 focus:py-2 font-mono text-xs"
      >
        İçeriğe atla
      </a>

      <header
        className={`tone-${tone} fixed inset-x-0 top-0 z-[90] transition-[height,background-color] duration-500`}
        style={{
          height: scrolled ? 56 : "var(--nav-h)",
          backgroundColor: scrolled && !open ? "color-mix(in srgb, var(--bg) 92%, transparent)" : "transparent",
          color: "var(--fg)",
          transitionTimingFunction: "var(--ease-out)",
        }}
      >
        <div className="container-x h-full flex items-center justify-between">
          <a
            href="#hero"
            onClick={go("hero")}
            className="flex items-center gap-3 group"
            aria-label="REGNUM — başa dön"
          >
            <Crest className="w-7 h-5 text-accent transition-transform duration-500 group-hover:-translate-y-0.5" />
            <span className="font-display text-[22px] tracking-[0.12em] leading-none pt-[2px]">REGNUM</span>
          </a>

          <nav aria-label="Ana menü" className="hidden md:flex items-center gap-8">
            {nav.map((n) => {
              const current = active.id === n.id;
              return (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  aria-current={current ? "true" : undefined}
                  className="u-link inline-flex items-baseline gap-2 text-[13px] tracking-[0.02em] py-2"
                >
                  <span className="font-mono text-[10px]" style={{ color: current ? "var(--accent)" : "var(--muted)" }}>
                    {n.index}
                  </span>
                  <span>{n.label}</span>
                </a>
              );
            })}
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="md:hidden font-mono text-[11px] tracking-[0.18em] uppercase px-1 py-3 min-w-[44px] text-right"
            aria-expanded={open}
            aria-controls="mobil-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Kapat" : "Menü"}
          </button>
        </div>
        <div
          className="hairline absolute inset-x-0 bottom-0 transition-opacity duration-500"
          style={{ opacity: scrolled && !open ? 1 : 0 }}
        />
      </header>

      {open ? (
        <div
          ref={menuRef}
          id="mobil-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menü"
          className="tone-ink fixed inset-0 z-[85] bg-ink text-bone flex flex-col container-x pt-[calc(var(--nav-h)+24px)] pb-10"
          data-lenis-prevent
        >
          <nav aria-label="Mobil menü" className="flex-1 flex flex-col justify-center gap-1">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={go(n.id)}
                aria-current={active.id === n.id ? "true" : undefined}
                className="mask py-1"
              >
                <span data-menu-item className="flex items-baseline gap-4 font-display text-[11.5vw] leading-[1.05]">
                  <span className="font-mono text-[11px] text-muted w-6">{n.index}</span>
                  <span className={active.id === n.id ? "text-accent" : ""}>{n.label}</span>
                </span>
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pt-6 border-t border-line">
            {site.contact.email ? (
              <a data-menu-foot href={`mailto:${site.contact.email}`} className="u-link inline-block self-start text-sm">
                {site.contact.email}
              </a>
            ) : null}
            <p data-menu-foot className="eyebrow">Bağımsız yazılım stüdyosu</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
