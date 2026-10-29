"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};
/** Yıl, istemcide hesaplanır; prerender sırasında kararsız değer üretilmez. */
export function Year() {
  const year = useSyncExternalStore(noop, () => String(new Date().getFullYear()), () => "");
  return <span suppressHydrationWarning>{year}</span>;
}
