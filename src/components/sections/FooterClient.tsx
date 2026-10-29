"use client";

import { scrollToId } from "@/lib/motion";

export function NavLink({ id, index, label }: { id: string; index: string; label: string }) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        history.replaceState(null, "", `#${id}`);
        scrollToId(id);
      }}
      className="u-link text-[14px] inline-flex items-baseline gap-2"
    >
      <span className="font-mono text-[10px] text-muted">{index}</span>
      {label}
    </a>
  );
}

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => scrollToId("hero")}
      className="u-link inline-block uppercase tracking-[0.14em] cursor-pointer min-h-[44px]"
    >
      Başa dön
    </button>
  );
}
