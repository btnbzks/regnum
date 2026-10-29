import type { SVGProps } from "react";

/**
 * Amblemdeki merkez taç, tek çizgiye indirgenmiş hâliyle.
 * Nav, favicon ve küçük işaretler için.
 */
export function Crest({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 24"
      width="32"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d="M4 20h24" />
      <path d="M5 20 3.5 8l6.5 5L16 3l6 10 6.5-5L27 20" />
      <path d="M16 3V0.6" />
    </svg>
  );
}

/** Amblemdeki küçük ışıltı — dört uçlu yıldız. */
export function Spark({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 12 12"
      width="12"
      height="12"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d="M6 0 7.4 4.6 12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4Z" />
    </svg>
  );
}
