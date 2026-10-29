import { forwardRef } from "react";

/**
 * Tipografik wordmark. Amblemdeki geniş aralıklı serif büyük harfleri,
 * Instrument Serif ile yorumlar. Harfler ayrı sarmalanır; açılış ve hero
 * animasyonları harf bazında maskeyle çalışır.
 */
type Props = {
  as?: "h1" | "div" | "span";
  className?: string;
  letterClassName?: string;
  split?: boolean;
};

const LETTERS = ["R", "E", "G", "N", "U", "M"];

export const Wordmark = forwardRef<HTMLElement, Props>(function Wordmark(
  { as: Tag = "div", className = "", letterClassName = "", split = true },
  ref,
) {
  const Comp = Tag as "div";
  return (
    <Comp
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`font-display uppercase leading-none select-none ${split ? "flex justify-center" : ""} ${className}`}
      aria-label="REGNUM"
      style={{ letterSpacing: "0.06em" }}
    >
      {split ? (
        LETTERS.map((l, i) => (
          <span key={i} className="mask" aria-hidden="true">
            <span data-letter className={`inline-block ${letterClassName}`}>
              {l}
            </span>
          </span>
        ))
      ) : (
        <span aria-hidden="true">REGNUM</span>
      )}
    </Comp>
  );
});
