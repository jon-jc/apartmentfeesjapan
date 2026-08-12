import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import { WARD_BY_ID, WARDS } from "@/data/wardInfo";
import { calculateMoveInCost, DEFAULTS, estimateManagementFee } from "@/lib/costEngine";
import { formatMan, formatYen } from "@/lib/format";
import { getMarketRates } from "@/lib/rates";
import { SITE_URL } from "@/lib/site";
import { STRINGS } from "@/lib/strings";
import { LAYOUTS, LAYOUT_LABELS } from "@/lib/types";

export const revalidate = 86400; // refresh with the daily market data

export function generateStaticParams() {
  return WARDS.map((w) => ({ id: w.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const ward = WARD_BY_ID[id];
  if (!ward) return {};
  const rates = await getMarketRates();
  const r = rates.rates.find((x) => x.wardId === id);
  const studio = r ? formatMan(r.rents["1K"]) : "";
  return {
    title: `Renting in ${ward.nameEn} (${ward.nameJa}): Average Rent & Move-in Costs`,
    description: `Average rent in ${ward.nameEn}, Tokyo: ${studio}円/month for a studio (1R/1K). See what a full move-in really costs — deposit, key money, agency and guarantor fees — updated daily.`,
    alternates: { canonical: `/wards/${id}` },
    openGraph: {
      title: `Renting in ${ward.nameEn} ${ward.nameJa} — real move-in costs`,
      description: ward.blurb,
      url: `/wards/${id}`,
    },
  };
}

export default async function WardPage({ params }: Props) {
  const { id } = await params;
  const ward = WARD_BY_ID[id];
  if (!ward) notFound();

  const rates = await getMarketRates();
  const wardRates = rates.rates.find((r) => r.wardId === id);
  if (!wardRates) notFound();

  // rank by studio rent, 1 = cheapest
  const sorted = [...rates.rates].sort((a, b) => a.rents["1K"] - b.rents["1K"]);
  const rank = sorted.findIndex((r) => r.wardId === id) + 1;
  const avg1K =
    rates.rates.reduce((s, r) => s + r.rents["1K"], 0) / rates.rates.length;
  const vsAvgPct = Math.round((wardRates.rents["1K"] / avg1K - 1) * 100);

  // Example move-in cost on standard terms for a studio at this ward's average
  const rent = wardRates.rents["1K"];
  const managementFee = estimateManagementFee(rent);
  const example = calculateMoveInCost({
    rent,
    managementFee,
    shikikinMonths: DEFAULTS.shikikinMonths,
    reikinMonths: DEFAULTS.reikinMonths,
    agencyFeeMonths: DEFAULTS.agencyFeeMonths,
    guarantorRate: DEFAULTS.guarantorRate,
    fireInsurance: DEFAULTS.fireInsurance,
    keyExchange: DEFAULTS.keyExchange,
    moveInDate: new Date().toISOString().slice(0, 10),
    sanitization: 0,
    supportService: DEFAULTS.supportService,
  });

  const updated = new Date(rates.updatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: `${ward.nameEn} Ward`,
        item: `${SITE_URL}/wards/${id}`,
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="pt-6 text-xs text-slate-400">
        <Link href="/" className="underline hover:text-slate-600">
          Tokyo Move-in Cost Calculator
        </Link>{" "}
        / {ward.nameEn}
      </nav>

      <header className="py-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Renting in {ward.nameEn}{" "}
          <span className="text-slate-400">{ward.nameJa}</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {ward.blurb}
        </p>
        <p className="mt-1 text-xs text-slate-400">🚉 {ward.access}</p>
      </header>

      {/* rent table */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">
          Average rent in {ward.nameEn}
        </h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs text-slate-500 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-2 font-medium">Layout</th>
                <th className="px-4 py-2 font-medium">Average rent / month</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {LAYOUTS.map((ly) => (
                <tr key={ly}>
                  <td className="px-4 py-2">
                    {ly}{" "}
                    <span className="text-xs text-slate-400">
                      {LAYOUT_LABELS[ly]}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-mono">
                    {formatYen(wardRates.rents[ly])}{" "}
                    <span className="text-xs text-slate-400">
                      ({formatMan(wardRates.rents[ly])}円)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">
          {ward.nameEn} ranks <strong>#{rank} of 23 wards</strong> by studio
          rent —{" "}
          {vsAvgPct === 0
            ? "right at the 23-ward average"
            : `${Math.abs(vsAvgPct)}% ${vsAvgPct > 0 ? "above" : "below"} the 23-ward average`}
          . Studio figures{" "}
          {rates.source === "live"
            ? `updated ${updated} from SUUMO's public market data`
            : `from our baseline dataset (${updated})`}
          ; 1LDK/2LDK estimated from the ward&apos;s price structure.
        </p>
      </section>

      <AdSlot
        slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_WARD}
        className="my-8"
      />

      {/* example move-in cost */}
      <section className="mt-10">
        <h2 className="mb-2 text-lg font-semibold">
          What moving into a {ward.nameEn} studio really costs
        </h2>
        <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
          Example on standard terms — 1 month deposit (敷金), 1 month key money
          (礼金), full agency fee, 50% guarantor fee — for a{" "}
          {formatMan(rent)}円 studio:
        </p>
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {example.items.map((item) => (
                <tr key={item.key}>
                  <td className="px-4 py-2">
                    {item.nameEn}{" "}
                    <span className="text-xs text-slate-400">
                      {item.nameJa}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right font-mono">
                    {formatYen(item.amount)}
                  </td>
                </tr>
              ))}
              <tr className="bg-indigo-50 font-semibold dark:bg-indigo-950/40">
                <td className="px-4 py-2">Total move-in cost</td>
                <td className="px-4 py-2 text-right font-mono">
                  {formatYen(example.total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm">
          <Link
            href="/"
            className="font-medium text-indigo-600 underline dark:text-indigo-400"
          >
            → Adjust every fee and see what&apos;s negotiable in the
            interactive calculator
          </Link>
        </p>
      </section>

      {/* quick FAQ context, unique-ish framing per ward via numbers */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400">
        <h2 className="mb-1.5 font-semibold text-slate-900 dark:text-slate-100">
          Budget rule of thumb
        </h2>
        <p>
          {STRINGS.en.faq[0].a} For {ward.nameEn}, that means budgeting roughly{" "}
          <strong>
            {formatYen(rent * 4.5)}–{formatYen(rent * 6)}
          </strong>{" "}
          up front for a studio, before furniture and moving costs.
        </p>
      </section>

      {/* internal links to every other ward */}
      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold text-slate-500">
          Compare with other Tokyo wards
        </h2>
        <div className="flex flex-wrap gap-2">
          {WARDS.filter((w) => w.id !== id).map((w) => (
            <Link
              key={w.id}
              href={`/wards/${w.id}`}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700"
            >
              {w.nameEn} {w.nameJa}
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs leading-relaxed text-slate-400 dark:border-slate-700">
        Estimates for planning only — actual fees vary by property, landlord
        and agency. ·{" "}
        <Link href="/privacy" className="underline">
          Privacy
        </Link>
      </footer>
    </main>
  );
}
