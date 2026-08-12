# 🏠 Tokyo Move-in Cost Calculator — 引っ越し初期費用シミュレーター

**What does it *really* cost to rent an apartment in Tokyo?**

Japanese leases front-load 4.5–6 months of rent before you get the keys: deposit (敷金), key money (礼金), agency fee (仲介手数料), guarantor company (保証会社), fire insurance, lock exchange, and rent paid in advance. This app demystifies every yen of it — built for foreigners moving to Japan, fully bilingual (English / 日本語).

## Features

- **Move-in cost calculator** — models the full Japanese 初期費用 fee stack with accurate rules (agency fee legal cap + consumption tax, prorated 日割り rent, guarantor rates). Every line item explains what it is, whether the money ever comes back, and how to negotiate it — including a "negotiated well" scenario showing your potential savings.
- **Interactive ward map** — choropleth of Tokyo's 23 wards built from government boundary data, colored by average rent (1K / 1LDK / 2LDK). Click a ward to load its market average into the calculator, with local-knowledge notes on each ward's character and train access.
- **Daily-updating market data** — studio averages are fetched once a day from SUUMO's public market-rate page (Japan's largest listing site), cross-checked against LIFULL HOME'S, with graceful fallback to a calibrated baseline dataset. Raw data exposed at `/api/rates`.
- **English / 日本語 toggle** — every UI string, fee explanation, negotiation tip, and ward guide is natively written in both languages; the choice persists and auto-detects Japanese browsers.
- **23 ward guide pages** — statically generated, SEO-optimized pages (`/wards/minato` …) with rent tables, ward rankings, and example move-in breakdowns, refreshed daily.

## Tech

Next.js (App Router) · TypeScript · Tailwind CSS. No map library — ward polygons are simplified at build time from GeoJSON into ~28 KB of precomputed SVG paths. Market data uses Next's daily ISR revalidation, so upstream sites are hit at most once per day. Optional Google AdSense integration is entirely env-var gated (see [SETUP.md](SETUP.md)).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Optional configuration — copy [.env.example](.env.example) to `.env.local`:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata/sitemap |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher ID (ads render only when set) |
| `NEXT_PUBLIC_ADSENSE_SLOT_HOME` / `_WARD` | Ad unit slot IDs |

Deployment and monetization steps: [SETUP.md](SETUP.md).

## Icons

The browser icon is an apartment block in the app's indigo-to-violet accent
gradient, shipped in three forms that Next.js picks up automatically from
`src/app/`:

| File | Purpose |
|---|---|
| `icon.svg` | Vector — crisp at any size, used by modern browsers |
| `favicon.ico` | Multi-resolution 16/32/48px raster for legacy clients and crawlers |
| `apple-icon.png` | 180×180 iOS home-screen icon, full-bleed for the iOS mask |

The 16px entry is rendered from a simplified variant with two window bands
rather than individual windows: at that size each window lands on roughly one
pixel and antialiases into grey mush.

## Disclaimer

Rent figures are aggregated estimates from public market-rate pages, for planning only — actual costs vary by property, landlord, and agency. Not financial advice.
