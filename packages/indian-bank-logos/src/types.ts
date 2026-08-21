export type BankCategory =
  | "nationalised"
  | "private"
  | "sfb"
  | "payments"
  | "lab"
  | "foreign";

export interface BankRecord {
  slug: string;
  name: string;
  category: BankCategory;
  hasHorizontal: boolean;
}

export interface Bank extends BankRecord {
  logo: string;
  logoHorizontal: string | null;
}

export interface SearchOptions {
  category?: BankCategory;
  limit?: number;
  offset?: number;
}

export const BANK_CATEGORIES: BankCategory[] = [
  "nationalised",
  "private",
  "sfb",
  "payments",
  "lab",
  "foreign",
];

export const DEFAULT_BASE_URL = "https://indian-bank-logos.vercel.app";
