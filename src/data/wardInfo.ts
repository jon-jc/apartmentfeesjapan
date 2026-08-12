import type { WardInfo } from "@/lib/types";

/**
 * Baseline average rents (yen/month) for Tokyo's 23 special wards.
 * 1K figures calibrated against SUUMO 賃貸相場 (July 2026); 1LDK/2LDK are
 * curated market estimates. These are the fallback when live fetches fail,
 * and the source of per-ward layout ratios applied to live studio averages.
 */
export const WARDS: WardInfo[] = [
  {
    id: "chiyoda",
    nameEn: "Chiyoda",
    nameJa: "千代田区",
    blurb:
      "The Imperial Palace, Marunouchi offices and Akihabara. Tiny residential population, premium rents, ultra-central.",
    blurbJa:
      "皇居・丸の内・秋葉原。住宅は少なく家賃は都内最高水準の超都心。",
    access: "Tokyo Sta., Otemachi — nearly every JR & metro line",
    accessJa: "東京駅・大手町 — ほぼ全てのJR・地下鉄路線",
    baseline: { "1K": 110000, "1LDK": 200000, "2LDK": 310000 },
  },
  {
    id: "chuo",
    nameEn: "Chuo",
    nameJa: "中央区",
    blurb:
      "Ginza and Nihonbashi. Riverside tower apartments in Tsukishima/Kachidoki are popular with dual-income households.",
    blurbJa:
      "銀座・日本橋。月島・勝どきのタワーマンションは共働き世帯に人気。",
    access: "Ginza, Nihonbashi — Ginza, Hibiya, Oedo lines",
    accessJa: "銀座・日本橋 — 銀座線・日比谷線・大江戸線",
    baseline: { "1K": 107000, "1LDK": 175000, "2LDK": 250000 },
  },
  {
    id: "minato",
    nameEn: "Minato",
    nameJa: "港区",
    blurb:
      "Roppongi, Azabu, Akasaka. Embassy district, most expat-friendly landlords and English-speaking agencies — at Tokyo's highest prices.",
    blurbJa:
      "六本木・麻布・赤坂。大使館が集まり、外国人対応の物件と英語可の仲介が最多——ただし家賃は都内トップ。",
    access: "Shinagawa, Roppongi — Yamanote, Namboku, Oedo lines",
    accessJa: "品川・六本木 — 山手線・南北線・大江戸線",
    baseline: { "1K": 117000, "1LDK": 220000, "2LDK": 350000 },
  },
  {
    id: "shinjuku",
    nameEn: "Shinjuku",
    nameJa: "新宿区",
    blurb:
      "The world's busiest station plus quiet pockets like Kagurazaka. Many guarantor-company-friendly buildings used to foreign renters.",
    blurbJa:
      "世界一の乗降客数を誇るターミナルと、神楽坂のような落ち着いた街が同居。外国人入居に慣れた物件も多い。",
    access: "Shinjuku Sta. — JR, Marunouchi, Oedo, private rails",
    accessJa: "新宿駅 — JR・丸ノ内線・大江戸線・私鉄各線",
    baseline: { "1K": 85000, "1LDK": 155000, "2LDK": 220000 },
  },
  {
    id: "bunkyo",
    nameEn: "Bunkyo",
    nameJa: "文京区",
    blurb:
      "University district (Todai), calm and residential, strong schools. Favorite of academics and families who want central-but-quiet.",
    blurbJa:
      "東大を擁する文教地区。静かな住宅街と良好な学区で、研究者やファミリーに人気。",
    access: "Korakuen, Hongo-sanchome — Marunouchi, Namboku lines",
    accessJa: "後楽園・本郷三丁目 — 丸ノ内線・南北線",
    baseline: { "1K": 80000, "1LDK": 145000, "2LDK": 205000 },
  },
  {
    id: "taito",
    nameEn: "Taito",
    nameJa: "台東区",
    blurb:
      "Ueno and Asakusa. Old shitamachi charm, smaller/older building stock keeps rents reasonable for how central it is.",
    blurbJa:
      "上野・浅草。下町情緒が残り、築古物件が多いぶん立地の割に家賃は手頃。",
    access: "Ueno, Asakusa — JR, Ginza, Hibiya lines",
    accessJa: "上野・浅草 — JR・銀座線・日比谷線",
    baseline: { "1K": 85000, "1LDK": 135000, "2LDK": 180000 },
  },
  {
    id: "sumida",
    nameEn: "Sumida",
    nameJa: "墨田区",
    blurb:
      "Skytree, Ryogoku sumo country. East-bank value pick with fast access to Otemachi via the Hanzomon line.",
    blurbJa:
      "スカイツリーと両国の相撲の街。半蔵門線で大手町へ直通、東側のコスパ株。",
    access: "Kinshicho, Oshiage — JR Sobu, Hanzomon lines",
    accessJa: "錦糸町・押上 — JR総武線・半蔵門線",
    baseline: { "1K": 84000, "1LDK": 125000, "2LDK": 165000 },
  },
  {
    id: "koto",
    nameEn: "Koto",
    nameJa: "江東区",
    blurb:
      "Toyosu and Kiba. New tower-mansion stock on reclaimed land, popular with young professionals; watch for higher 管理費.",
    blurbJa:
      "豊洲・木場。湾岸の新築タワーが多く若手社会人に人気。管理費はやや高め。",
    access: "Toyosu, Monzen-nakacho — Yurakucho, Tozai lines",
    accessJa: "豊洲・門前仲町 — 有楽町線・東西線",
    baseline: { "1K": 86000, "1LDK": 135000, "2LDK": 175000 },
  },
  {
    id: "shinagawa",
    nameEn: "Shinagawa",
    nameJa: "品川区",
    blurb:
      "Shinkansen hub plus laid-back Musashi-koyama and Togoshi-ginza shotengai. Great airport access via Keikyu.",
    blurbJa:
      "新幹線の玄関口に、武蔵小山や戸越銀座の商店街。京急で羽田空港も近い。",
    access: "Shinagawa, Osaki — Yamanote, Keikyu, Rinkai lines",
    accessJa: "品川・大崎 — 山手線・京急線・りんかい線",
    baseline: { "1K": 84000, "1LDK": 145000, "2LDK": 200000 },
  },
  {
    id: "meguro",
    nameEn: "Meguro",
    nameJa: "目黒区",
    blurb:
      "Nakameguro and Jiyugaoka. Stylish, café-dense, cherry-blossom river walks — you pay a lifestyle premium here.",
    blurbJa:
      "中目黒・自由が丘。カフェと目黒川の桜並木、おしゃれな街の代名詞——その分プレミアム価格。",
    access: "Nakameguro, Meguro — Toyoko, Namboku, Hibiya lines",
    accessJa: "中目黒・目黒 — 東横線・南北線・日比谷線",
    baseline: { "1K": 88000, "1LDK": 165000, "2LDK": 240000 },
  },
  {
    id: "ota",
    nameEn: "Ota",
    nameJa: "大田区",
    blurb:
      "Haneda Airport's home ward. Kamata offers some of the best rent-to-access value on the Keihin-Tohoku line.",
    blurbJa:
      "羽田空港のある区。蒲田は京浜東北線沿線で屈指のコストパフォーマンス。",
    access: "Kamata, Omori — JR Keihin-Tohoku, Keikyu lines",
    accessJa: "蒲田・大森 — JR京浜東北線・京急線",
    baseline: { "1K": 72000, "1LDK": 115000, "2LDK": 150000 },
  },
  {
    id: "setagaya",
    nameEn: "Setagaya",
    nameJa: "世田谷区",
    blurb:
      "Tokyo's most populous ward: Shimokitazawa's indie scene, leafy Futako-tamagawa. Huge supply means real room to negotiate.",
    blurbJa:
      "23区最大の人口。下北沢のカルチャーと二子玉川の緑。物件数が多く交渉の余地も大きい。",
    access: "Sangenjaya, Shimokitazawa — Denentoshi, Odakyu, Keio lines",
    accessJa: "三軒茶屋・下北沢 — 田園都市線・小田急線・京王線",
    baseline: { "1K": 73000, "1LDK": 125000, "2LDK": 170000 },
  },
  {
    id: "shibuya",
    nameEn: "Shibuya",
    nameJa: "渋谷区",
    blurb:
      "Shibuya crossing, Harajuku, Ebisu, Yoyogi Park. Startup-land; rents rival Minato in Ebisu and Hiroo.",
    blurbJa:
      "スクランブル交差点・原宿・恵比寿・代々木公園。スタートアップの街。恵比寿・広尾は港区並みの家賃。",
    access: "Shibuya, Ebisu — Yamanote, Hanzomon, Fukutoshin lines",
    accessJa: "渋谷・恵比寿 — 山手線・半蔵門線・副都心線",
    baseline: { "1K": 100000, "1LDK": 195000, "2LDK": 300000 },
  },
  {
    id: "nakano",
    nameEn: "Nakano",
    nameJa: "中野区",
    blurb:
      "Nakano Broadway subculture mecca, dense cheap eats. Four minutes from Shinjuku on the Chuo rapid — superb value.",
    blurbJa:
      "中野ブロードウェイのサブカルの聖地と安うま飲食店。中央線快速で新宿4分の抜群のコスパ。",
    access: "Nakano — JR Chuo/Sobu, Tozai lines",
    accessJa: "中野 — JR中央・総武線・東西線",
    baseline: { "1K": 72000, "1LDK": 120000, "2LDK": 160000 },
  },
  {
    id: "suginami",
    nameEn: "Suginami",
    nameJa: "杉並区",
    blurb:
      "Koenji vintage shops, Ogikubo ramen. Beloved by creatives; older stock means frequent zero-reikin listings.",
    blurbJa:
      "高円寺の古着屋と荻窪のラーメン。クリエイターに愛され、礼金ゼロ物件も多い。",
    access: "Koenji, Ogikubo — JR Chuo/Sobu, Marunouchi lines",
    accessJa: "高円寺・荻窪 — JR中央・総武線・丸ノ内線",
    baseline: { "1K": 69000, "1LDK": 115000, "2LDK": 150000 },
  },
  {
    id: "toshima",
    nameEn: "Toshima",
    nameJa: "豊島区",
    blurb:
      "Ikebukuro's mega-terminal plus quiet Mejiro. Lots of compact studios aimed at students and young workers.",
    blurbJa:
      "池袋の巨大ターミナルと閑静な目白。学生・若手向けのコンパクト物件が豊富。",
    access: "Ikebukuro — JR, Marunouchi, Fukutoshin, Tobu/Seibu",
    accessJa: "池袋 — JR・丸ノ内線・副都心線・東武/西武線",
    baseline: { "1K": 74000, "1LDK": 125000, "2LDK": 165000 },
  },
  {
    id: "kita",
    nameEn: "Kita",
    nameJa: "北区",
    blurb:
      "Akabane's izakaya alleys, Oji's paper-museum parks. Underrated northern value with Saikyo-line speed to Shinjuku.",
    blurbJa:
      "赤羽の飲み屋横丁と王子の公園。埼京線で新宿へ一本、北の穴場。",
    access: "Akabane — JR Saikyo, Keihin-Tohoku, Namboku lines",
    accessJa: "赤羽 — JR埼京線・京浜東北線・南北線",
    baseline: { "1K": 70000, "1LDK": 110000, "2LDK": 145000 },
  },
  {
    id: "arakawa",
    nameEn: "Arakawa",
    nameJa: "荒川区",
    blurb:
      "Nippori's fabric town and the nostalgic Toden streetcar. Small, friendly, cheap — Skyliner to Narita from Nippori.",
    blurbJa:
      "日暮里の繊維街とレトロな都電荒川線。小さく人情味があり家賃も手頃。日暮里から成田へスカイライナー直通。",
    access: "Nippori — JR Yamanote, Keisei Skyliner",
    accessJa: "日暮里 — JR山手線・京成スカイライナー",
    baseline: { "1K": 74000, "1LDK": 110000, "2LDK": 140000 },
  },
  {
    id: "itabashi",
    nameEn: "Itabashi",
    nameJa: "板橋区",
    blurb:
      "Working-class northwest with big supermarkets and river parks. Mita-line residents get one-seat rides to Otemachi.",
    blurbJa:
      "大型スーパーと河川敷公園のある庶民的な北西部。三田線で大手町へ一本。",
    access: "Itabashi, Takashimadaira — JR Saikyo, Mita line",
    accessJa: "板橋・高島平 — JR埼京線・三田線",
    baseline: { "1K": 67000, "1LDK": 100000, "2LDK": 130000 },
  },
  {
    id: "nerima",
    nameEn: "Nerima",
    nameJa: "練馬区",
    blurb:
      "Anime studio heartland (Toei), cabbage fields turned family suburbs. Among the cheapest 2LDKs inside the 23 wards.",
    blurbJa:
      "アニメスタジオの本場（東映）。畑の残る郊外型ファミリータウン。2LDKは23区最安クラス。",
    access: "Nerima, Oizumi-gakuen — Seibu, Oedo, Fukutoshin lines",
    accessJa: "練馬・大泉学園 — 西武線・大江戸線・副都心線",
    baseline: { "1K": 65000, "1LDK": 95000, "2LDK": 125000 },
  },
  {
    id: "adachi",
    nameEn: "Adachi",
    nameJa: "足立区",
    blurb:
      "Kitasenju's six-line hub anchors Tokyo's best bargain ward. Rents here run ~40% below the 23-ward average.",
    blurbJa:
      "6路線が乗り入れる北千住を擁する、都内屈指のバーゲン区。家賃は23区平均より約4割安。",
    access: "Kitasenju — Hibiya, Chiyoda, Tobu, TX lines",
    accessJa: "北千住 — 日比谷線・千代田線・東武線・TX",
    baseline: { "1K": 66000, "1LDK": 90000, "2LDK": 115000 },
  },
  {
    id: "katsushika",
    nameEn: "Katsushika",
    nameJa: "葛飾区",
    blurb:
      "Shibamata's retro temple street, riverside fireworks. The cheapest average rents of all 23 wards.",
    blurbJa:
      "柴又帝釈天の参道と江戸川の花火。23区で最も平均家賃が安い。",
    access: "Kanamachi, Aoto — JR Joban, Keisei lines",
    accessJa: "金町・青砥 — JR常磐線・京成線",
    baseline: { "1K": 60000, "1LDK": 85000, "2LDK": 110000 },
  },
  {
    id: "edogawa",
    nameEn: "Edogawa",
    nameJa: "江戸川区",
    blurb:
      "Kasai's Indian community and huge riverside parks. Tozai line express reaches Otemachi in ~15 minutes.",
    blurbJa:
      "葛西のインド人コミュニティと広大な河川敷公園。東西線快速で大手町へ約15分。",
    access: "Nishi-kasai, Koiwa — Tozai, JR Sobu lines",
    accessJa: "西葛西・小岩 — 東西線・JR総武線",
    baseline: { "1K": 60000, "1LDK": 90000, "2LDK": 115000 },
  },
];

export const WARD_BY_ID: Record<string, WardInfo> = Object.fromEntries(
  WARDS.map((w) => [w.id, w])
);

export const WARD_BY_JA: Record<string, WardInfo> = Object.fromEntries(
  WARDS.map((w) => [w.nameJa, w])
);

/** Date the baseline dataset was last hand-calibrated */
export const BASELINE_DATE = "2026-07-05";
