"use client";

import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import CostExplorer from "@/components/CostExplorer";
import { WARDS } from "@/data/wardInfo";
import { LanguageToggle, useLocale } from "@/lib/i18n";
import { STRINGS } from "@/lib/strings";
import type { RatesPayload } from "@/lib/types";

export default function HomeContent({
  initialRates,
}: {
  initialRates: RatesPayload;
}) {
  const { locale } = useLocale();
  const t = STRINGS[locale];

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6">
      {/* language toggle */}
      <div className="flex justify-end pt-4">
        <LanguageToggle />
      </div>

      {/* hero */}
      <header className="py-8 text-center sm:py-12">
        <p className="mb-2 text-sm font-medium tracking-widest text-indigo-500">
          {t.tagline}
        </p>
        <h1 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
          {t.h1Pre}
          <em className="text-indigo-600 not-italic">{t.h1Em}</em>
          {t.h1Post}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
          {t.heroBody1}
          <strong>{t.heroBodyStrong}</strong>
          {t.heroBody2}
        </p>
      </header>

      <CostExplorer initialRates={initialRates} />

      <AdSlot
        slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME}
        className="mt-12"
      />

      {/* how it works / FAQ */}
      <section className="mt-16">
        <h2 className="mb-4 text-lg font-semibold">{t.faqHeading}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {t.faq.map(({ q, a }) => (
            <div
              key={q}
              className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/60"
            >
              <h3 className="mb-1.5 text-sm font-semibold">{q}</h3>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ward guide links (crawlable internal links to the SEO pages) */}
      <section className="mt-16">
        <h2 className="mb-3 text-lg font-semibold">{t.wardGuides}</h2>
        <div className="flex flex-wrap gap-2">
          {WARDS.map((w) => (
            <Link
              key={w.id}
              href={`/wards/${w.id}`}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700"
            >
              {locale === "ja"
                ? w.nameJa
                : `${w.nameEn} ${w.nameJa}`}
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs leading-relaxed text-slate-400 dark:border-slate-700">
        {t.footer1}{" "}
        <a href="/api/rates" className="underline hover:text-slate-600">
          {t.footerApi}
        </a>{" "}
        ·{" "}
        <Link href="/privacy" className="underline hover:text-slate-600">
          {t.privacy}
        </Link>
        <br />
        {t.footer2}
      </footer>
    </main>
  );
}
