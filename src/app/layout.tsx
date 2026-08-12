import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { LanguageProvider } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ADS_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Tokyo Apartment Move-in Cost Calculator — Key Money, Deposit & Guarantor Fees Explained",
    template: "%s | Tokyo Move-in Cost Calculator",
  },
  description:
    "How much does it really cost to rent an apartment in Tokyo? Calculate your full move-in cost — 敷金 deposit, 礼金 key money, agency and guarantor fees — with ward-by-ward average rents updated daily from Japan's largest listing sites.",
  keywords: [
    "Tokyo rent calculator",
    "Japan apartment move-in cost",
    "key money reikin",
    "shikikin deposit",
    "guarantor company Japan",
    "renting in Tokyo as a foreigner",
    "Tokyo rent by ward",
    "初期費用 計算",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Tokyo Move-in Cost Calculator",
    title: "What does it really cost to rent in Tokyo?",
    description:
      "Demystify Japanese renting: deposit, key money, guarantor and agency fees, with daily-updated ward-by-ward rent data on an interactive map.",
    url: "/",
    locale: "en_US",
    alternateLocale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tokyo Apartment Move-in Cost Calculator",
    description:
      "敷金・礼金・guarantor fees demystified — with live ward-by-ward Tokyo rent data.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
        {ADS_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
