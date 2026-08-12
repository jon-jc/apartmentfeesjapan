import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the Tokyo Move-in Cost Calculator: what data we do and don't collect, and how advertising cookies are used.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-xs text-slate-400">Last updated: July 5, 2026</p>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <section>
          <h2 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
            What this site does
          </h2>
          <p>
            The Tokyo Move-in Cost Calculator is a free tool that estimates
            apartment move-in costs in Japan. All calculations run in your
            browser — the rent figures, dates and options you enter are never
            sent to or stored on our servers.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
            Data we collect
          </h2>
          <p>
            We do not require accounts and do not collect names, email
            addresses or any personally identifying information. Your language
            preference is stored locally in your browser (localStorage) and
            never transmitted.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
            Advertising and cookies
          </h2>
          <p>
            This site is supported by advertising served by Google AdSense.
            Google and its partners may use cookies and similar technologies to
            serve ads based on your prior visits to this and other websites,
            and to measure ad performance. You can opt out of personalized
            advertising at{" "}
            <a
              href="https://adssettings.google.com"
              className="underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google Ads Settings
            </a>
            . Users in regions requiring consent (e.g. the EEA and UK) are
            shown a consent prompt before any advertising cookies are set. See{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              className="underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              how Google uses data from partner sites
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
            Market data sources
          </h2>
          <p>
            Average rent figures are aggregated from publicly available
            market-rate pages (SUUMO, LIFULL HOME&apos;S) and refreshed at most
            once per day. They are estimates for planning purposes, not quotes
            or financial advice.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
            Contact
          </h2>
          <p>
            Questions about this policy? Contact the site operator at{" "}
            <span className="font-mono">contact@your-domain.com</span>.
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm">
        <Link href="/" className="text-indigo-600 underline">
          ← Back to the calculator
        </Link>
      </p>
    </main>
  );
}
