"use client";

import { forwardRef, useMemo } from "react";

/**
 * Markanın imza motifi: amblemdeki merkez taçtan altı küçük taca uzanan dallar.
 * Uzmanlık ağacı, açılış sahnesi ve kapanış sahnesinde aynı motif farklı rollerde kullanılır.
 *
 * - Her yol `pathLength=1` ile normalize edilir; stroke-dashoffset ile çizdirilebilir.
 * - `active` verildiğinde ilgili dal ve düğüm vurgulanır.
 */
export const BRANCH_W = 640;
export const BRANCH_H = 220;
const NODE_X = [52, 152, 252, 388, 488, 588];
const NODE_Y = 178;
const CX = BRANCH_W / 2;
const CY = 54;

type Props = {
  active?: number | null;
  className?: string;
  /** Ağaç yolları başlangıçta çizilmemiş olsun (intro/scroll ile çizdirilecek) */
  undrawn?: boolean;
  title?: string;
};

export const Branch = forwardRef<SVGSVGElement, Props>(function Branch(
  { active = null, className, undrawn = false, title },
  ref,
) {
  const paths = useMemo(
    () =>
      NODE_X.map((x) => {
        const dx = x - CX;
        const c1y = CY + 70;
        const c2y = NODE_Y - 78;
        return `M${CX} ${CY + 18} C ${CX + dx * 0.08} ${c1y}, ${x - dx * 0.12} ${c2y}, ${x} ${NODE_Y - 12}`;
      }),
    [],
  );

  const dash = undrawn ? { strokeDasharray: 1, strokeDashoffset: 1 } : undefined;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${BRANCH_W} ${BRANCH_H}`}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      overflow="visible"
    >
      {title ? <title>{title}</title> : null}

      {/* dallar */}
      <g data-branch-paths>
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength={1}
            data-branch-path={i}
            style={{
              ...dash,
              opacity: active === null ? 1 : active === i ? 1 : 0.28,
              stroke: active === i ? "var(--accent)" : "currentColor",
              transition: "opacity .6s var(--ease-out), stroke .6s var(--ease-out)",
            }}
          />
        ))}
        {/* merkez taçtan aşağı sarkan ışıltı */}
        <path d={`M${CX} ${CY + 18} V ${CY + 72}`} pathLength={1} data-branch-path="stem" style={dash} />
      </g>

      {/* merkez taç */}
      <g data-branch-crown transform={`translate(${CX} ${CY})`}>
        <path d="M-22 14h44" pathLength={1} style={dash} />
        <path d="M-20 14 -23 -8l10 8L0 -20l13 20 10-8-3 22" pathLength={1} style={dash} />
        <path d="M0 -20v-10" pathLength={1} style={dash} />
      </g>
      <Spark x={CX} y={CY + 80} r={4} />

      {/* altı küçük taç */}
      {NODE_X.map((x, i) => (
        <g
          key={x}
          data-branch-node={i}
          transform={`translate(${x} ${NODE_Y})`}
          style={{
            color: active === i ? "var(--accent)" : "currentColor",
            opacity: active === null ? 1 : active === i ? 1 : 0.35,
            transition: "opacity .6s var(--ease-out), color .6s var(--ease-out)",
          }}
        >
          <path d="M-11 8h22" pathLength={1} style={dash} stroke="currentColor" />
          <path d="M-10 8 -12 -4l6 4L0 -10l6 10 6-4-2 12" pathLength={1} style={dash} stroke="currentColor" />
          {active === i ? <circle r="2.2" cy="-16" fill="currentColor" stroke="none" /> : null}
        </g>
      ))}
    </svg>
  );
});

function Spark({ x, y, r }: { x: number; y: number; r: number }) {
  const p = `M${x} ${y - r} L${x + r * 0.28} ${y - r * 0.28} L${x + r} ${y} L${x + r * 0.28} ${y + r * 0.28} L${x} ${y + r} L${x - r * 0.28} ${y + r * 0.28} L${x - r} ${y} L${x - r * 0.28} ${y - r * 0.28} Z`;
  return <path d={p} fill="currentColor" stroke="none" data-branch-spark />;
}

export const BRANCH_NODE_COUNT = NODE_X.length;
