"use client";

import { useMemo, useState } from "react";
import WardMap from "@/components/WardMap";
import { WARD_BY_ID } from "@/data/wardInfo";
import {
  calculateMoveInCost,
  DEFAULTS,
  estimateManagementFee,
  type CalcInput,
  type LineItem,
} from "@/lib/costEngine";
import { formatMan, formatYen } from "@/lib/format";
import { useLocale } from "@/lib/i18n";
import { STRINGS, type Strings } from "@/lib/strings";
import { LAYOUTS, type Layout, type RatesPayload } from "@/lib/types";

function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const CATEGORY_STYLE = {
  refundable: {
    cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    bar: "#34d399",
  },
  prepaid: {
    cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300",
    bar: "#38bdf8",
  },
  gone: {
    cls: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
    bar: "#fb7185",
  },
} as const;

function categoryLabel(t: Strings, c: keyof typeof CATEGORY_STYLE): string {
  return c === "refundable"
    ? t.catRefundable
    : c === "prepaid"
      ? t.catPrepaid
      : t.catGone;
}

export default function CostExplorer({
  initialRates,
}: {
  initialRates: RatesPayload;
}) {
  const { locale } = useLocale();
  const t = STRINGS[locale];

  const [layout, setLayout] = useState<Layout>("1K");
  const [selected, setSelected] = useState<string | null>("nakano");

  const [rent, setRent] = useState<number>(
    initialRates.rates.find((r) => r.wardId === "nakano")?.rents["1K"] ?? 72000
  );
  const [managementFee, setManagementFee] = useState<number>(
    estimateManagementFee(72000)
  );
  const [moveInDate, setMoveInDate] = useState<string>(todayPlus(30));
  const [shikikinMonths, setShikikinMonths] = useState(DEFAULTS.shikikinMonths);
  const [reikinMonths, setReikinMonths] = useState(DEFAULTS.reikinMonths);
  const [agencyFeeMonths, setAgencyFeeMonths] = useState(
    DEFAULTS.agencyFeeMonths
  );
  const [guarantorRate, setGuarantorRate] = useState(DEFAULTS.guarantorRate);
  const [fireInsurance, setFireInsurance] = useState(DEFAULTS.fireInsurance);
  const [keyExchange, setKeyExchange] = useState(DEFAULTS.keyExchange);
  const [sanitization, setSanitization] = useState(0);
  const [supportService, setSupportService] = useState(DEFAULTS.supportService);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const rentByWard = useMemo(() => {
    const out: Record<string, number> = {};
    for (const r of initialRates.rates) out[r.wardId] = r.rents[layout];
    return out;
  }, [initialRates, layout]);

  const selectWard = (wardId: string, nextLayout?: Layout) => {
    const ly = nextLayout ?? layout;
    setSelected(wardId);
    const avg = initialRates.rates.find((r) => r.wardId === wardId)?.rents[ly];
    if (avg) {
      setRent(avg);
      setManagementFee(estimateManagementFee(avg));
    }
  };

  const switchLayout = (ly: Layout) => {
    setLayout(ly);
    if (selected) selectWard(selected, ly);
  };

  const input: CalcInput = {
    rent,
    managementFee,
    shikikinMonths,
    reikinMonths,
    agencyFeeMonths,
    guarantorRate,
    fireInsurance,
    keyExchange,
    moveInDate,
    sanitization,
    supportService,
  };
  const inputKey = JSON.stringify(input);
  const result = useMemo(
    () => calculateMoveInCost(input),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputKey]
  );

  // "Lean" scenario: everything realistically negotiable pushed to its floor
  const lean = useMemo(
    () =>
      calculateMoveInCost({
        ...input,
        reikinMonths: 0,
        agencyFeeMonths: 0.5,
        fireInsurance: 8000,
        sanitization: 0,
        supportService: 0,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputKey]
  );
  const savings = result.total - lean.total;

  const selectedWardInfo = selected ? WARD_BY_ID[selected] : null;
  const selectedRates = selected
    ? initialRates.rates.find((r) => r.wardId === selected)
    : null;

  const updated = new Date(initialRates.updatedAt);
  const dateLocale = locale === "ja" ? "ja-JP" : "en-US";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
      {/* ── Left: map ─────────────────────────────────────────── */}
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">
            {t.mapHeading}{" "}
            <span className="text-sm font-normal text-slate-400">
              {t.mapSub}
            </span>
          </h2>
          <div className="flex rounded-lg border border-slate-200 p-0.5 text-xs dark:border-slate-700">
            {LAYOUTS.map((ly) => (
              <button
                key={ly}
                onClick={() => switchLayout(ly)}
                className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                  layout === ly
                    ? "bg-indigo-600 text-white"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {ly}
              </button>
            ))}
          </div>
        </div>

        <WardMap
          rents={rentByWard}
          layout={layout}
          selected={selected}
          onSelect={selectWard}
        />

        {/* data freshness */}
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                initialRates.source === "live"
                  ? "bg-emerald-500"
                  : "bg-amber-500"
              }`}
            />
            {initialRates.source === "live" ? (
              <span>
                <strong className="text-slate-700 dark:text-slate-200">
                  {t.liveData}
                </strong>{" "}
                {t.liveFrom(
                  initialRates.liveSources.join(" + "),
                  updated.toLocaleDateString(dateLocale, {
                    month: "short",
                    day: "numeric",
                  })
                )}
              </span>
            ) : (
              <span>
                <strong className="text-slate-700 dark:text-slate-200">
                  {t.baselineData}
                </strong>{" "}
                {t.baselineFrom(
                  updated.toLocaleDateString(dateLocale, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                )}
              </span>
            )}
          </div>
          <p className="mt-1">
            {t.dataExplain}{" "}
            {selectedRates?.homesAverage && selectedWardInfo && (
              <>
                {t.crossCheck(
                  locale === "ja"
                    ? selectedWardInfo.nameJa
                    : selectedWardInfo.nameEn
                )}{" "}
                <strong>{formatMan(selectedRates.homesAverage)}</strong>
              </>
            )}
          </p>
        </div>
      </section>

      {/* ── Right: calculator ─────────────────────────────────── */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">
          {t.calcHeading}{" "}
          <span className="text-sm font-normal text-slate-400">
            {t.calcSub}
          </span>
        </h2>

        {/* inputs */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <label className="col-span-1">
            <span className="mb-1 block text-xs font-medium text-slate-500">
              {t.rentLabel}
            </span>
            <div className="flex items-center rounded-lg border border-slate-300 bg-white px-2 focus-within:ring-2 focus-within:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800">
              <span className="text-slate-400">¥</span>
              <input
                type="number"
                step={1000}
                min={0}
                value={rent}
                onChange={(e) => setRent(Number(e.target.value) || 0)}
                className="w-full bg-transparent px-1 py-1.5 outline-none"
              />
            </div>
          </label>
          <label className="col-span-1">
            <span className="mb-1 block text-xs font-medium text-slate-500">
              {t.mgmtLabel}
            </span>
            <div className="flex items-center rounded-lg border border-slate-300 bg-white px-2 focus-within:ring-2 focus-within:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800">
              <span className="text-slate-400">¥</span>
              <input
                type="number"
                step={1000}
                min={0}
                value={managementFee}
                onChange={(e) => setManagementFee(Number(e.target.value) || 0)}
                className="w-full bg-transparent px-1 py-1.5 outline-none"
              />
            </div>
          </label>
          <label className="col-span-1">
            <span className="mb-1 block text-xs font-medium text-slate-500">
              {t.dateLabel}
            </span>
            <input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800"
            />
          </label>
          <label className="col-span-1">
            <span className="mb-1 block text-xs font-medium text-slate-500">
              {t.guarantorLabel}
            </span>
            <select
              value={guarantorRate}
              onChange={(e) => setGuarantorRate(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800"
            >
              {(["0.5", "1", "0.3", "0"] as const).map((v) => (
                <option key={v} value={v}>
                  {t.guarantorOptions[v]}
                </option>
              ))}
            </select>
          </label>

          <MonthsPicker
            label={t.shikikinLabel}
            suffix={t.monthsSuffix}
            value={shikikinMonths}
            onChange={setShikikinMonths}
          />
          <MonthsPicker
            label={t.reikinLabel}
            suffix={t.monthsSuffix}
            value={reikinMonths}
            onChange={setReikinMonths}
          />

          <label className="col-span-1">
            <span className="mb-1 block text-xs font-medium text-slate-500">
              {t.agencyLabel}
            </span>
            <select
              value={agencyFeeMonths}
              onChange={(e) => setAgencyFeeMonths(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800"
            >
              {(["1", "0.5", "0"] as const).map((v) => (
                <option key={v} value={v}>
                  {t.agencyOptions[v]}
                </option>
              ))}
            </select>
          </label>

          <div className="col-span-1">
            <span className="mb-1 block text-xs font-medium text-slate-500">
              {t.addonsLabel}
            </span>
            <div className="flex flex-col gap-1 text-xs">
              <label className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={sanitization > 0}
                  onChange={(e) =>
                    setSanitization(e.target.checked ? DEFAULTS.sanitization : 0)
                  }
                />
                {t.sanitizationAddon}
              </label>
              <label className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={supportService > 0}
                  onChange={(e) =>
                    setSupportService(
                      e.target.checked ? DEFAULTS.supportService : 0
                    )
                  }
                />
                {t.supportAddon}
              </label>
            </div>
          </div>
        </div>

        {/* total */}
        <div className="mt-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-5 text-white shadow-lg">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-indigo-200">
                {t.totalLabel}
                {selectedWardInfo &&
                  ` · ${locale === "ja" ? selectedWardInfo.nameJa : selectedWardInfo.nameEn}`}
              </div>
              <div className="text-4xl font-bold tabular-nums">
                {formatYen(result.total)}
              </div>
            </div>
            <div className="text-right text-sm text-indigo-100">
              {t.monthsOfRent(result.totalMonthsOfRent.toFixed(1))}
              <br />
              <span className="text-xs text-indigo-200">{t.typicalRange}</span>
            </div>
          </div>

          {/* stacked composition bar */}
          <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-white/20">
            {(["refundable", "prepaid", "gone"] as const).map((c) => {
              const v =
                c === "refundable"
                  ? result.refundable
                  : c === "prepaid"
                    ? result.prepaid
                    : result.gone;
              return (
                <div
                  key={c}
                  style={{
                    width: `${(v / result.total) * 100}%`,
                    background: CATEGORY_STYLE[c].bar,
                  }}
                />
              );
            })}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-indigo-100">
            {(["refundable", "prepaid", "gone"] as const).map((c) => {
              const v =
                c === "refundable"
                  ? result.refundable
                  : c === "prepaid"
                    ? result.prepaid
                    : result.gone;
              return (
                <span key={c}>
                  <span
                    className="mr-1 inline-block h-2 w-2 rounded-full"
                    style={{ background: CATEGORY_STYLE[c].bar }}
                  />
                  {categoryLabel(t, c)} {formatYen(v)}
                </span>
              );
            })}
          </div>

          {savings > 1000 && (
            <div className="mt-3 rounded-lg bg-white/15 px-3 py-2 text-xs">
              {t.leanTip}{" "}
              <strong className="tabular-nums">{formatYen(lean.total)}</strong>{" "}
              {t.leanSaving}{" "}
              <strong className="tabular-nums">{formatYen(savings)}</strong>
              {locale === "ja" ? "。" : "."}
            </div>
          )}
        </div>

        {/* line items */}
        <ul className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white dark:divide-slate-700/60 dark:border-slate-700 dark:bg-slate-800/60">
          {result.items.map((item) => (
            <LineItemRow
              key={item.key}
              item={item}
              t={t}
              locale={locale}
              proratedDays={result.proratedDays}
              daysInMonth={result.daysInMonth}
              open={openItem === item.key}
              onToggle={() =>
                setOpenItem(openItem === item.key ? null : item.key)
              }
            />
          ))}
        </ul>
        <p className="mt-2 text-right text-xs text-slate-400">
          {t.itemsFootnote(result.proratedDays, result.daysInMonth)}
        </p>
      </section>
    </div>
  );
}

function MonthsPicker({
  label,
  suffix,
  value,
  onChange,
}: {
  label: string;
  suffix: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="col-span-1">
      <span className="mb-1 block text-xs font-medium text-slate-500">
        {label}
      </span>
      <div className="flex rounded-lg border border-slate-300 p-0.5 dark:border-slate-600">
        {[0, 0.5, 1, 2].map((m) => (
          <button
            key={m}
            onClick={() => onChange(m)}
            className={`flex-1 rounded-md px-1 py-1 text-xs font-medium transition-colors ${
              value === m
                ? "bg-indigo-600 text-white"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {m}
            {suffix}
          </button>
        ))}
      </div>
    </div>
  );
}

function LineItemRow({
  item,
  t,
  locale,
  proratedDays,
  daysInMonth,
  open,
  onToggle,
}: {
  item: LineItem;
  t: Strings;
  locale: "en" | "ja";
  proratedDays: number;
  daysInMonth: number;
  open: boolean;
  onToggle: () => void;
}) {
  const style = CATEGORY_STYLE[item.category];
  const text = t.fees[item.key];
  const detail = text?.detail
    .replace("{days}", String(proratedDays))
    .replace("{total}", String(daysInMonth));

  const primary = locale === "ja" ? item.nameJa : item.nameEn;
  const secondary = locale === "ja" ? item.nameEn : item.nameJa;

  return (
    <li>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700/40"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <span className="font-medium">{primary}</span>{" "}
          <span className="text-xs text-slate-400">{secondary}</span>
        </div>
        <span
          className={`hidden shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium sm:inline ${style.cls}`}
        >
          {categoryLabel(t, item.category)}
        </span>
        <span className="shrink-0 font-mono tabular-nums">
          {formatYen(item.amount)}
        </span>
        <span
          className={`text-slate-300 transition-transform ${open ? "rotate-90" : ""}`}
        >
          ›
        </span>
      </button>
      {open && text && (
        <div className="space-y-2 px-4 pb-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          <p>{detail}</p>
          {text.negotiation && (
            <p className="rounded-lg bg-amber-50 p-2 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
              <strong>{t.negotiatePrefix}</strong> {text.negotiation}
            </p>
          )}
        </div>
      )}
    </li>
  );
}
