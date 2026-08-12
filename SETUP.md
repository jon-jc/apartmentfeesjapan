# Launch checklist — ads & SEO

The code is ready; these are the account/hosting steps only you can do.

## 1. Deploy (free)

1. Push this repo to GitHub.
2. Import it at [vercel.com](https://vercel.com) (free Hobby plan) → deploys automatically.
3. Buy a domain (~$10/yr, e.g. Namecheap/Cloudflare) and add it in Vercel → Settings → Domains.
   **A real domain is required for AdSense** — `.vercel.app` subdomains are not accepted.
4. In Vercel → Settings → Environment Variables, set:
   - `NEXT_PUBLIC_SITE_URL=https://your-domain.com`

The daily data refresh needs no cron — pages revalidate automatically every 24h on Vercel.

## 2. Google Search Console (SEO)

1. Go to [search.google.com/search-console](https://search.google.com/search-console), add your domain.
2. Submit the sitemap: `https://your-domain.com/sitemap.xml` (25 URLs: home + 23 ward guides + privacy).
3. Expect indexing over 1–2 weeks. The ward pages target long-tail searches
   ("renting in Nakano", "Minato average rent", "Tokyo move-in cost calculator").

## 3. Google AdSense (revenue)

1. Apply at [adsense.google.com](https://adsense.google.com) with your deployed domain.
   Approval typically takes a few days–2 weeks and requires original content
   (this site qualifies: unique tools + per-ward guides + privacy policy ✓).
2. Once approved, copy your publisher ID (`ca-pub-…`) and set in Vercel env vars:
   - `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX`
3. Create two **Display ad** units (AdSense → Ads → By ad unit) and set their slot IDs:
   - `NEXT_PUBLIC_ADSENSE_SLOT_HOME=…` (shown between calculator and FAQ)
   - `NEXT_PUBLIC_ADSENSE_SLOT_WARD=…` (shown on ward guide pages)
4. Edit [public/ads.txt](public/ads.txt): uncomment the line and insert your real `pub-` ID.
5. In AdSense → Privacy & messaging, enable the **EU consent message** (required for EEA/UK traffic).
6. Update the contact email placeholder in [src/app/privacy/page.tsx](src/app/privacy/page.tsx).
7. Redeploy. Until these env vars are set, no ad code renders at all.

Note: ad code is intentionally **not** added inside the calculator column —
AdSense policy penalizes ads too close to interactive controls (accidental clicks).

## 4. Ranking realistically

- Ward pages + daily-fresh data + FAQ structured data are the on-site levers (done).
- Off-site: share on r/movingtojapan, r/japanlife, Tokyo expat Facebook groups —
  genuine links from those communities are what moves rankings for these queries.
- Check Search Console monthly; pages that get impressions but few clicks may need
  better titles (edit `generateMetadata` in `src/app/wards/[id]/page.tsx`).
