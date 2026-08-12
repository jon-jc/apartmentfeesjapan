"use client";

import { useMemo, useState } from "react";
import wardGeo from "@/data/tokyoWards.json";
import { WARD_BY_ID } from "@/data/wardInfo";
import { useLocale } from "@/lib/i18n";
import { STRINGS } from "@/lib/strings";
import type { Layout } from "@/lib/types";
import { formatMan } from "@/lib/format";

interface WardShape {
  id: string;
  nameEn: string;
  nameJa: string;
  path: string;
  cx: number;
  cy: number;
}

interface Props {
  /** rent in yen per wardId for the currently selected layout */
  rents: Record<string, number>;
  layout: Layout;
  selected: string | null;
  onSelect: (wardId: string) => void;
}

/** Interpolate a sequential blue→indigo scale by t ∈ [0,1] */
function scaleColor(t: number): string {
  const h = 210 + t * 30;
  const s = 45 + t * 40;
  const l = 88 - t * 55;
  return `hsl(${h} ${s}% ${l}%)`;
}

export default function WardMap({ rents, layout, selected, onSelect }: Props) {
  const shapes = (wardGeo as { viewBox: string; wards: WardShape[] }).wards;
  const viewBox = (wardGeo as { viewBox: string }).viewBox;
  const [hovered, setHovered] = useState<string | null>(null);
  const { locale } = useLocale();
  const t9 = STRINGS[locale];

  const [min, max] = useMemo(() => {
    const vals = Object.values(rents);
    return [Math.min(...vals), Math.max(...vals)];
  }, [rents]);

  const t = (wardId: string) => {
    const v = rents[wardId];
    if (v == null || max === min) return 0.5;
    // sqrt eases the skew from Minato/Chiyoda outliers
    return Math.sqrt((v - min) / (max - min));
  };

  const active = hovered ?? selected;
  const activeWard = active ? WARD_BY_ID[active] : null;

  return (
    <div className="relative">
      <svg
        viewBox={viewBox}
        role="img"
        aria-label="Map of Tokyo's 23 wards colored by average rent"
        className="w-full h-auto select-none"
      >
        {shapes.map((w) => {
          const isActive = w.id === selected;
          const isHover = w.id === hovered;
          return (
            <path
              key={w.id}
              d={w.path}
              fill={scaleColor(t(w.id))}
              stroke={isActive ? "#f59e0b" : "#ffffff"}
              strokeWidth={isActive ? 3 : isHover ? 2 : 1}
              className="cursor-pointer transition-[fill-opacity] duration-150"
              fillOpacity={isHover ? 0.75 : 1}
              onMouseEnter={() => setHovered(w.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(w.id)}
            >
              <title>{`${w.nameEn} ${w.nameJa}`}</title>
            </path>
          );
        })}
        {/* label the active ward at its centroid */}
        {active &&
          (() => {
            const s = shapes.find((x) => x.id === active);
            if (!s) return null;
            return (
              <g pointerEvents="none">
                <text
                  x={s.cx}
                  y={s.cy}
                  textAnchor="middle"
                  className="fill-white font-bold"
                  fontSize="22"
                  paintOrder="stroke"
                  stroke="#1e293b"
                  strokeWidth="4"
                >
                  {locale === "ja" ? s.nameJa : s.nameEn}
                </text>
              </g>
            );
          })()}
      </svg>

      {/* legend */}
      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span>{formatMan(min)}</span>
        <div
          className="h-2 flex-1 rounded-full"
          style={{
            background: `linear-gradient(to right, ${scaleColor(0)}, ${scaleColor(
              0.5
            )}, ${scaleColor(1)})`,
          }}
        />
        <span>{formatMan(max)}</span>
        <span className="ml-1 whitespace-nowrap">
          {t9.avg} {layout}
        </span>
      </div>

      {/* hover/selection info card */}
      <div className="mt-3 min-h-[5.5rem] rounded-xl border border-slate-200 bg-white/70 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/70">
        {activeWard ? (
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-semibold">
                {locale === "ja" ? (
                  <>
                    {activeWard.nameJa}{" "}
                    <span className="text-slate-400">{activeWard.nameEn}</span>
                  </>
                ) : (
                  <>
                    {activeWard.nameEn}{" "}
                    <span className="text-slate-400">{activeWard.nameJa}</span>
                  </>
                )}
              </span>
              <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-300">
                {rents[activeWard.id] != null
                  ? formatMan(rents[activeWard.id])
                  : "—"}
                <span className="text-xs text-slate-400">
                  {" "}
                  {t9.perMonth} · {layout}
                </span>
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {locale === "ja" ? activeWard.blurbJa : activeWard.blurb}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              🚉 {locale === "ja" ? activeWard.accessJa : activeWard.access}
            </p>
          </div>
        ) : (
          <p className="text-xs text-slate-400">{t9.mapHint}</p>
        )}
      </div>
    </div>
  );
}
