/**
 * Japanese apartment move-in cost engine.
 *
 * Models the standard 初期費用 (initial cost) structure of a Japanese
 * lease: deposit, key money, agency fee, guarantor company, insurance,
 * key exchange, prorated + advance rent, and the common optional add-ons.
 *
 * Explanatory text for each line item lives in src/lib/strings.ts
 * (localized), keyed by LineItem.key.
 */

export interface CalcInput {
  /** Monthly rent 家賃 (yen) */
  rent: number;
  /** Monthly management/common fee 管理費・共益費 (yen) */
  managementFee: number;
  /** 敷金 in months of rent (usually 0–2, typically 1) */
  shikikinMonths: number;
  /** 礼金 in months of rent (usually 0–2, typically 1) */
  reikinMonths: number;
  /** 仲介手数料 in months of rent before tax (0, 0.5 or 1) */
  agencyFeeMonths: number;
  /** Guarantor company initial fee as a fraction of (rent + mgmt), usually 0.5–1.0; 0 if you have a Japanese guarantor */
  guarantorRate: number;
  /** 火災保険 2-year premium (yen) */
  fireInsurance: number;
  /** 鍵交換費用 incl. tax (yen) */
  keyExchange: number;
  /** Move-in date, ISO yyyy-mm-dd */
  moveInDate: string;
  /** 室内消毒・消臭 add-on (yen); 0 if declined */
  sanitization: number;
  /** 24時間サポート add-on (yen); 0 if declined */
  supportService: number;
}

export type LineCategory = "refundable" | "gone" | "prepaid";

export interface LineItem {
  key: string;
  nameJa: string;
  nameEn: string;
  amount: number;
  category: LineCategory;
}

export interface CalcResult {
  items: LineItem[];
  total: number;
  totalMonthsOfRent: number;
  refundable: number;
  gone: number;
  prepaid: number;
  proratedDays: number;
  daysInMonth: number;
}

const CONSUMPTION_TAX = 1.1;

export const DEFAULTS = {
  shikikinMonths: 1,
  reikinMonths: 1,
  agencyFeeMonths: 1,
  guarantorRate: 0.5,
  fireInsurance: 18000,
  keyExchange: 16500,
  sanitization: 16500,
  supportService: 16500,
  /** Management fee is commonly ~5–8% of rent when not known */
  managementFeeRatio: 0.06,
};

export function estimateManagementFee(rent: number): number {
  return Math.round((rent * DEFAULTS.managementFeeRatio) / 1000) * 1000;
}

export function calculateMoveInCost(input: CalcInput): CalcResult {
  const monthly = input.rent + input.managementFee;

  const date = new Date(input.moveInDate + "T00:00:00");
  const valid = !isNaN(date.getTime());
  const year = valid ? date.getFullYear() : new Date().getFullYear();
  const month = valid ? date.getMonth() : new Date().getMonth();
  const day = valid ? date.getDate() : 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const proratedDays = daysInMonth - day + 1;
  const proratedRent = Math.round((monthly * proratedDays) / daysInMonth);

  const items: LineItem[] = [
    {
      key: "prorated",
      nameJa: "日割り家賃",
      nameEn: "Prorated rent (move-in month)",
      amount: proratedRent,
      category: "prepaid",
    },
    {
      key: "advance",
      nameJa: "前家賃",
      nameEn: "Advance rent (next month)",
      amount: monthly,
      category: "prepaid",
    },
    {
      key: "shikikin",
      nameJa: "敷金",
      nameEn: "Deposit (shikikin)",
      amount: Math.round(input.rent * input.shikikinMonths),
      category: "refundable",
    },
    {
      key: "reikin",
      nameJa: "礼金",
      nameEn: "Key money (reikin)",
      amount: Math.round(input.rent * input.reikinMonths),
      category: "gone",
    },
    {
      key: "agency",
      nameJa: "仲介手数料",
      nameEn: "Agency fee (+10% tax)",
      amount: Math.round(input.rent * input.agencyFeeMonths * CONSUMPTION_TAX),
      category: "gone",
    },
    {
      key: "guarantor",
      nameJa: "保証会社利用料",
      nameEn: "Guarantor company (initial)",
      amount: Math.round(monthly * input.guarantorRate),
      category: "gone",
    },
    {
      key: "insurance",
      nameJa: "火災保険",
      nameEn: "Fire insurance (2 years)",
      amount: input.fireInsurance,
      category: "gone",
    },
    {
      key: "key",
      nameJa: "鍵交換費用",
      nameEn: "Lock/key exchange",
      amount: input.keyExchange,
      category: "gone",
    },
  ];

  if (input.sanitization > 0) {
    items.push({
      key: "sanitization",
      nameJa: "室内消毒・消臭",
      nameEn: "Room sanitization (optional)",
      amount: input.sanitization,
      category: "gone",
    });
  }

  if (input.supportService > 0) {
    items.push({
      key: "support",
      nameJa: "24時間サポート",
      nameEn: "24h support service (optional)",
      amount: input.supportService,
      category: "gone",
    });
  }

  const total = items.reduce((s, i) => s + i.amount, 0);
  const sum = (c: LineCategory) =>
    items.filter((i) => i.category === c).reduce((s, i) => s + i.amount, 0);

  return {
    items,
    total,
    totalMonthsOfRent: input.rent > 0 ? total / input.rent : 0,
    refundable: sum("refundable"),
    gone: sum("gone"),
    prepaid: sum("prepaid"),
    proratedDays,
    daysInMonth,
  };
}
