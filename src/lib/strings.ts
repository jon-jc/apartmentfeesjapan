import type { Locale } from "@/lib/i18n";

/** Per-fee explanation + negotiation tip. `{days}` / `{total}` are interpolated. */
export interface FeeText {
  detail: string;
  negotiation?: string;
}

const en = {
  tagline: "引っ越し初期費用シミュレーター",
  h1Pre: "What does it ",
  h1Em: "really",
  h1Post: " cost to rent in Tokyo?",
  heroBody1: "Japanese apartments front-load ",
  heroBodyStrong: "4.5–6 months of rent",
  heroBody2:
    " before you get the keys — deposit 敷金, key money 礼金, guarantor and agency fees. Pick a ward, tune the fees, and see exactly where every yen goes and which fees you can negotiate away.",

  mapHeading: "Where are you looking?",
  mapSub: "Tokyo 23 wards · average rent",
  mapHint:
    "Hover a ward to preview average rent — click to load it into the calculator.",
  perMonth: "/mo",
  avg: "avg",

  liveData: "Live market data",
  liveFrom: (sources: string, date: string) =>
    `from ${sources} · refreshed ${date} · auto-updates daily`,
  baselineData: "Baseline dataset",
  baselineFrom: (date: string) =>
    `(live sources unreachable) · calibrated ${date}`,
  dataExplain:
    "Studio (1R/1K/1DK) averages come straight from SUUMO's daily market page; 1LDK/2LDK figures are estimated from each ward's price structure.",
  crossCheck: (ward: string) =>
    `Cross-check — LIFULL HOME'S all-layout average for ${ward}:`,

  calcHeading: "Your move-in cost",
  calcSub: "初期費用",
  rentLabel: "Monthly rent 家賃",
  mgmtLabel: "Mgmt fee 管理費",
  dateLabel: "Move-in date 入居日",
  guarantorLabel: "Guarantor 保証会社",
  guarantorOptions: {
    "0.5": "50% of month (typical)",
    "1": "100% of month",
    "0.3": "30% (cheap plan)",
    "0": "None — I have a Japanese guarantor",
  },
  shikikinLabel: "敷金 Deposit",
  reikinLabel: "礼金 Key money",
  monthsSuffix: "mo",
  agencyLabel: "Agency fee 仲介手数料",
  agencyOptions: {
    "1": "1 month (standard)",
    "0.5": "0.5 month (negotiated)",
    "0": "Zero (direct/online agency)",
  },
  addonsLabel: "Common add-ons",
  sanitizationAddon: "室内消毒 sanitization (~¥16,500)",
  supportAddon: "24h support (~¥16,500)",

  totalLabel: "Total move-in cost",
  monthsOfRent: (x: string) => `≈ ${x}× monthly rent`,
  typicalRange: "(typical range is 4.5–6×)",
  catRefundable: "Refundable",
  catPrepaid: "Rent paid ahead",
  catGone: "Never comes back",
  leanTip: "💡 Negotiated well (zero reikin, half agency fee, own insurance, no add-ons) this drops to",
  leanSaving: "— a saving of",
  itemsFootnote: (d: number, t: number) =>
    `Move-in month: ${d}/${t} days prorated · tap a row for what it is & how to negotiate it`,
  negotiatePrefix: "💬 Negotiate:",

  wardGuides: "Ward-by-ward rent guides",
  privacy: "Privacy policy",

  faqHeading: "Renting in Japan, demystified",
  faq: [
    {
      q: "Why is moving in so expensive in Japan?",
      a: "A standard Tokyo lease stacks deposit (敷金), key money (礼金), a full month's agency fee, a guarantor-company fee, insurance, lock change and up to two months of rent paid in advance — 4.5–6× monthly rent is normal. The upside: monthly rent itself is often cheaper than comparable global cities, and much of the up-front money is deposit or rent you'd pay anyway.",
    },
    {
      q: "Do I really need a guarantor company as a foreigner?",
      a: "Almost certainly yes. Japanese leases traditionally require a personal guarantor (連帯保証人) with stable Japanese income. Without one, landlords require a guarantor company — and most now require one even if you have a guarantor. Companies like GTN, Casa and Nihon Safety work routinely with foreign residents; GTN offers support in English, Chinese, Korean and Vietnamese.",
    },
    {
      q: "What documents will I need?",
      a: "Residence card (在留カード), passport, proof of income (employment contract or recent payslips; students use enrollment proof + bank balance), a Japanese phone number, and an emergency contact in Japan. A hanko (seal) is rarely required anymore — signatures are accepted by most agencies. Applications are screened (審査) in 2–7 days.",
    },
    {
      q: "Which fees can I actually avoid?",
      a: "Key money (search 礼金なし listings), the agency's fire-insurance markup (bring your own policy), room 'sanitization' (decline it), and often half of the agency fee. UR public housing (UR賃貸) charges no reikin, no agency fee and no guarantor fee at all — but has waiting lists and income requirements.",
    },
    {
      q: "What ongoing costs should I budget after moving in?",
      a: "Rent + management fee monthly, a renewal fee (更新料, usually 1 month) every 2 years, guarantor renewal (~¥10,000/year), and fire-insurance renewal every 2 years. Utilities for a 1K run roughly ¥10,000–15,000/month.",
    },
    {
      q: "How accurate is the map data?",
      a: "Studio (1R/1K/1DK) averages are fetched daily from SUUMO's public market-rate page — Japan's largest listing site — and cross-checked against LIFULL HOME'S. 1LDK and 2LDK figures are estimated from each ward's price structure, so treat them as a starting point, not a quote. Actual listings vary heavily with building age, distance to station and floor.",
    },
  ],

  footer1:
    "Market averages via SUUMO & LIFULL HOME'S public rate pages, refreshed daily ·",
  footerApi: "raw data API",
  footer2:
    "Estimates for planning only — actual fees vary by property, landlord and agency. Not financial advice.",

  fees: {
    prorated: {
      detail:
        "{days} of {total} days × (rent + management fee). You pay only the days you occupy in your first month.",
      negotiation:
        "Moving in on the 1st makes this a clean full month; moving in late in the month keeps this small but usually adds the next month's rent up front anyway. Some landlords offer free rent (フリーレント) of 2 weeks–1 month — always worth asking.",
    },
    advance: {
      detail:
        "Japanese leases collect the following month's rent + management fee at signing. Not an extra fee — you simply pay ahead.",
    },
    shikikin: {
      detail:
        "Held by the landlord against damage and unpaid rent. Refunded at move-out minus cleaning (usually ¥30,000–50,000 for a 1K) and any repairs beyond normal wear — which by MLIT guidelines the landlord must cover.",
      negotiation:
        "Rarely waived on family-sized units, but 敷金ゼロ studios are common. Zero-deposit deals often swap in a non-refundable 'cleaning fee', so compare totals.",
    },
    reikin: {
      detail:
        "A non-refundable 'thank you' payment to the landlord — a custom dating to postwar housing shortages. Pure cost with nothing in return.",
      negotiation:
        "The most negotiable fee. Roughly a third of Tokyo listings are now 礼金ゼロ; on vacant units landlords often drop 1 month → 0.5 or 0 if you ask before applying. Filter for 礼金なし on listing sites.",
    },
    agency: {
      detail:
        "Paid to the real-estate agent. Legally capped at 1 month + tax total — and technically 0.5 month per party unless you consent to more (宅建業法46条).",
      negotiation:
        "Agencies like Able and Minimini advertise half-price fees; some online agencies charge zero when they represent the landlord too. Quoting the 0.5-month legal default sometimes works.",
    },
    guarantor: {
      detail:
        "Nearly all landlords now require a rent-guarantor company (保証会社) instead of — or on top of — a personal guarantor. Initial fee is typically 50–100% of one month (rent + management fee), then ~¥10,000/year renewal. For foreigners without a Japanese guarantor this is effectively mandatory; some companies (e.g. GTN) specialize in foreign residents and offer English support.",
      negotiation:
        "The landlord chooses the company, so the rate itself is hard to negotiate — but agencies sometimes have cheaper affiliated plans (30–50%). Ask which companies the landlord accepts.",
    },
    insurance: {
      detail:
        "Mandatory tenant insurance covering fire/water damage and personal liability. Standard agency-bundled plans run ¥15,000–20,000 for 2 years.",
      negotiation:
        "You can usually decline the agency's plan and buy an equivalent policy yourself for ¥4,000–8,000/year (e.g. 都民共済, online insurers) — the lease only requires that you carry coverage.",
    },
    key: {
      detail:
        "Re-keying the lock from the previous tenant, ~¥11,000–22,000 depending on lock grade (dimple keys cost more).",
      negotiation:
        "MLIT guidelines say this is properly the landlord's cost, but in practice tenants pay. Occasionally waived when you push back on a vacant unit.",
    },
    sanitization: {
      detail:
        "A spray-and-go 'disinfection' service of questionable value, added by agencies as profit margin.",
      negotiation:
        "Almost always declinable — say 「消毒は不要です」. If told it's mandatory, ask for that in writing; it rarely is.",
    },
    support: {
      detail:
        "A hotline for lockouts and plumbing emergencies, ~¥16,500 per 2 years. Sometimes genuinely required by the management company, often just an add-on.",
      negotiation:
        "Ask whether it is a lease condition (契約条件) or optional (任意). If optional, decline.",
    },
  } as Record<string, FeeText>,
};

const ja: typeof en = {
  tagline: "MOVE-IN COST SIMULATOR",
  h1Pre: "東京の賃貸、初期費用は",
  h1Em: "本当は",
  h1Post: "いくら？",
  heroBody1: "日本の賃貸契約では、鍵を受け取る前に",
  heroBodyStrong: "家賃の4.5〜6ヶ月分",
  heroBody2:
    "——敷金・礼金・保証会社・仲介手数料——を前払いするのが一般的です。区を選び、条件を調整して、費用の内訳と交渉できる項目を確認しましょう。",

  mapHeading: "どのエリアで探す？",
  mapSub: "東京23区・平均家賃",
  mapHint:
    "区にカーソルを合わせると平均家賃を表示。クリックすると計算機に反映されます。",
  perMonth: "/月",
  avg: "平均",

  liveData: "ライブ相場データ",
  liveFrom: (sources: string, date: string) =>
    `${sources}より取得 · ${date}更新 · 毎日自動更新`,
  baselineData: "基準データセット",
  baselineFrom: (date: string) => `（ライブ取得不可）· ${date}時点`,
  dataExplain:
    "ワンルーム/1K/1DKの平均はSUUMOの相場ページから毎日取得。1LDK/2LDKは各区の価格構造からの推計値です。",
  crossCheck: (ward: string) =>
    `参考 — LIFULL HOME'S の${ward}全間取り平均:`,

  calcHeading: "初期費用シミュレーション",
  calcSub: "Move-in cost",
  rentLabel: "家賃（月額）",
  mgmtLabel: "管理費・共益費",
  dateLabel: "入居日",
  guarantorLabel: "保証会社",
  guarantorOptions: {
    "0.5": "月額の50%（一般的）",
    "1": "月額の100%",
    "0.3": "30%（格安プラン）",
    "0": "利用しない（連帯保証人あり）",
  },
  shikikinLabel: "敷金（ヶ月）",
  reikinLabel: "礼金（ヶ月）",
  monthsSuffix: "",
  agencyLabel: "仲介手数料",
  agencyOptions: {
    "1": "1ヶ月（標準）",
    "0.5": "0.5ヶ月（交渉後）",
    "0": "無料（オンライン仲介など）",
  },
  addonsLabel: "よくある付帯費用",
  sanitizationAddon: "室内消毒（約¥16,500）",
  supportAddon: "24時間サポート（約¥16,500）",

  totalLabel: "初期費用 合計",
  monthsOfRent: (x: string) => `家賃の約${x}ヶ月分`,
  typicalRange: "（相場は4.5〜6ヶ月分）",
  catRefundable: "返金あり",
  catPrepaid: "前払い家賃",
  catGone: "戻らないお金",
  leanTip: "💡 上手に交渉できれば（礼金ゼロ・仲介半額・保険自己手配・付帯なし）",
  leanSaving: "まで下がり、節約額は",
  itemsFootnote: (d: number, t: number) =>
    `入居月：${t}日中${d}日分の日割り · 行をタップすると解説と交渉のコツ`,
  negotiatePrefix: "💬 交渉のコツ:",

  wardGuides: "区別の家賃ガイド",
  privacy: "プライバシーポリシー",

  faqHeading: "日本の賃貸、まるわかり",
  faq: [
    {
      q: "なぜ日本の引っ越しはこんなに高い？",
      a: "標準的な賃貸契約では、敷金・礼金・仲介手数料1ヶ月・保証会社・火災保険・鍵交換に加え、最大2ヶ月分の家賃前払いが重なり、月額の4.5〜6倍が相場です。一方で月々の家賃自体は世界の大都市と比べて割安なことが多く、初期費用の多くは敷金や前払い家賃——つまりいずれ戻る・どのみち払うお金です。",
    },
    {
      q: "外国人は本当に保証会社が必要？",
      a: "ほぼ必須です。従来は日本国内に安定収入のある連帯保証人が求められましたが、現在は保証人がいても保証会社の利用を求める物件が大半です。GTN・Casa・日本セーフティーなどは外国籍の入居者への対応に慣れており、GTNは英語・中国語・韓国語・ベトナム語をサポートしています。",
    },
    {
      q: "必要な書類は？",
      a: "在留カード、パスポート、収入証明（雇用契約書や直近の給与明細。学生は在学証明＋残高証明）、日本の電話番号、国内の緊急連絡先。ハンコは最近ほぼ不要で、多くの仲介店は署名で受け付けます。入居審査は2〜7日程度です。",
    },
    {
      q: "実際に避けられる費用は？",
      a: "礼金（「礼金なし」で検索）、仲介店経由の火災保険（自分で加入可）、室内消毒（断れます）、仲介手数料の半額交渉。UR賃貸なら礼金・仲介手数料・保証料がすべて不要——ただし待機リストと収入要件があります。",
    },
    {
      q: "入居後にかかる費用は？",
      a: "毎月の家賃＋管理費、2年ごとの更新料（通常1ヶ月分）、保証会社の年間更新料（約1万円）、2年ごとの火災保険更新。1Kの光熱費は月1万〜1.5万円程度です。",
    },
    {
      q: "地図のデータはどれくらい正確？",
      a: "ワンルーム/1K/1DKの平均は日本最大の物件サイトSUUMOの公開相場ページから毎日取得し、LIFULL HOME'Sと照合しています。1LDK/2LDKは各区の価格構造から推計した参考値です。実際の家賃は築年数・駅距離・階数で大きく変わります。",
    },
  ],

  footer1:
    "相場データはSUUMO・LIFULL HOME'Sの公開ページより毎日更新 ·",
  footerApi: "生データAPI",
  footer2:
    "本ツールは計画目的の概算です。実際の費用は物件・大家・仲介店により異なります。",

  fees: {
    prorated: {
      detail:
        "入居月の{days}日分（全{total}日）×（家賃＋管理費）。最初の月は入居日からの日割り計算です。",
      negotiation:
        "月初入居ならきれいに1ヶ月分、月末入居なら日割りは少額ですが、翌月分の前家賃は別途かかります。2週間〜1ヶ月のフリーレントが付く物件もあるので、必ず聞いてみましょう。",
    },
    advance: {
      detail:
        "日本の賃貸では契約時に翌月分の家賃＋管理費を前払いします。追加費用ではなく、先払いです。",
    },
    shikikin: {
      detail:
        "大家が損害や家賃滞納に備えて預かるお金。退去時にクリーニング代（1Kで通常3〜5万円）と通常損耗を超える修繕費を差し引いて返金されます。国交省ガイドラインでは通常損耗は大家負担とされています。",
      negotiation:
        "ファミリー物件では難しいものの、敷金ゼロのワンルームは多数あります。ただし敷金ゼロ物件は返金されない「クリーニング代」に置き換わっていることが多いので、総額で比較を。",
    },
    reikin: {
      detail:
        "大家への返金されない「お礼」。戦後の住宅難に由来する慣習で、支払っても対価はありません。",
      negotiation:
        "最も交渉しやすい費用です。都内の約3分の1は礼金ゼロ。空室物件なら申込前に頼めば1ヶ月→0.5〜0に下がることも。物件サイトで「礼金なし」で絞り込みましょう。",
    },
    agency: {
      detail:
        "不動産仲介への報酬。法律上の上限は合計で家賃1ヶ月＋税——本来は借主・貸主それぞれ0.5ヶ月で、借主に1ヶ月請求するには承諾が必要です（宅建業法46条）。",
      negotiation:
        "エイブルやミニミニは半額を掲げ、貸主側も兼ねるオンライン仲介は無料のことも。「法律上は0.5ヶ月では」と伝えるのが有効な場合もあります。",
    },
    guarantor: {
      detail:
        "現在はほぼ全物件で家賃保証会社の利用が必須です。初回は（家賃＋管理費）の50〜100%、以後は年間約1万円の更新料。日本人の連帯保証人がいない外国人には事実上必須で、GTNなど外国人対応に特化した会社もあります。",
      negotiation:
        "保証会社は大家が指定するため料率の交渉は困難ですが、仲介店に安い提携プラン（30〜50%）がないか確認してみましょう。",
    },
    insurance: {
      detail:
        "火災・水漏れと個人賠償をカバーする借家人保険。仲介店経由の標準プランは2年で1.5万〜2万円です。",
      negotiation:
        "契約上必要なのは「補償に加入していること」だけ。都民共済やネット保険なら年4,000〜8,000円で同等の補償があり、自分で加入すれば大きく節約できます。",
    },
    key: {
      detail:
        "前入居者からの鍵交換費用。約1.1万〜2.2万円（ディンプルキーは高め）。",
      negotiation:
        "国交省ガイドラインでは本来大家負担ですが、実務上は借主負担が慣行です。空室物件で交渉すると免除されることもあります。",
    },
    sanitization: {
      detail:
        "仲介店の利益として上乗せされがちな、効果の疑わしい簡易消毒サービスです。",
      negotiation:
        "ほぼ必ず断れます——「消毒は不要です」と伝えましょう。「必須」と言われたら書面での確認を。実際に必須なことは稀です。",
    },
    support: {
      detail:
        "鍵紛失や水回りトラブル用のホットライン。2年で約1.65万円。管理会社が本当に必須とする場合もありますが、単なるオプションのことも多いです。",
      negotiation:
        "「契約条件ですか、任意ですか」と確認し、任意なら断りましょう。",
    },
  } as Record<string, FeeText>,
};

export const STRINGS: Record<Locale, typeof en> = { en, ja };

export type Strings = typeof en;
