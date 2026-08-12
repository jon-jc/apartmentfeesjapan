import HomeContent from "@/components/HomeContent";
import { getMarketRates } from "@/lib/rates";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { STRINGS } from "@/lib/strings";

export const revalidate = 86400; // page re-renders with fresh market data daily

export default async function Home() {
  const rates = await getMarketRates();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      description:
        "Calculate the full move-in cost of renting an apartment in Tokyo — deposit (shikikin), key money (reikin), agency and guarantor fees — with ward-by-ward rent averages updated daily.",
      inLanguage: ["en", "ja"],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: STRINGS.en.faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent initialRates={rates} />
    </>
  );
}
