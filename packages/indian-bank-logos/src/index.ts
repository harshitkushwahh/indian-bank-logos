import type { Bank, BankCategory, BankRecord, SearchOptions } from "./types";
import { DEFAULT_BASE_URL } from "./types";
import banksData from "../data/banks.json";

const banks = banksData as BankRecord[];

let baseUrl = DEFAULT_BASE_URL;

/** Override CDN/API base URL (e.g. your Vercel deployment). */
export function setBaseUrl(url: string): void {
  baseUrl = url.replace(/\/$/, "");
}

export function getBaseUrl(): string {
  return baseUrl;
}

export function withUrls(bank: BankRecord, base = baseUrl): Bank {
  return {
    ...bank,
    logo: `${base}/logos/${bank.slug}.png`,
    logoHorizontal: bank.hasHorizontal
      ? `${base}/logos/${bank.slug}-horizontal.png`
      : null,
  };
}

/** Standard square/favicon logo URL. */
export function getLogoUrl(slug: string, base = baseUrl): string {
  return `${base}/logos/${slug}.png`;
}

/** Horizontal/wide logo URL. Returns null if not available. */
export function getLogoHorizontalUrl(slug: string, base = baseUrl): string | null {
  const bank = banks.find((b) => b.slug === slug);
  if (!bank?.hasHorizontal) return null;
  return `${base}/logos/${slug}-horizontal.png`;
}

/** All banks with logo URLs (offline, no network). */
export function getAllBanks(): Bank[] {
  return banks.map((b) => withUrls(b));
}

/** Get one bank by slug. */
export function getBank(slug: string): Bank | undefined {
  const bank = banks.find((b) => b.slug === slug);
  return bank ? withUrls(bank) : undefined;
}

/** Search by name or slug (offline). */
export function searchBanks(query: string, options: SearchOptions = {}): Bank[] {
  const q = query.trim().toLowerCase();
  const { category, limit = 100, offset = 0 } = options;

  let results = banks;
  if (category) {
    results = results.filter((b) => b.category === category);
  }
  if (q) {
    results = results.filter(
      (b) => b.slug.includes(q) || b.name.toLowerCase().includes(q)
    );
  }

  return results.slice(offset, offset + limit).map((b) => withUrls(b));
}

/** Filter by RBI category (offline). */
export function getBanksByCategory(category: BankCategory): Bank[] {
  return banks.filter((b) => b.category === category).map((b) => withUrls(b));
}

/** Fetch from live API (search + category supported). */
export async function fetchBanks(
  options: SearchOptions & { q?: string } = {}
): Promise<{ banks: Bank[]; total: number }> {
  const params = new URLSearchParams();
  if (options.q) params.set("q", options.q);
  if (options.category) params.set("category", options.category);
  if (options.limit != null) params.set("limit", String(options.limit));
  if (options.offset != null) params.set("offset", String(options.offset));

  const qs = params.toString();
  const res = await fetch(`${baseUrl}/api/banks${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch banks: ${res.status}`);
  const data = (await res.json()) as { banks: Bank[]; total: number };
  return data;
}

/** Fetch single bank from live API. */
export async function fetchBank(slug: string): Promise<Bank> {
  const res = await fetch(`${baseUrl}/api/banks/${slug}`);
  if (!res.ok) throw new Error(`Bank not found: ${slug}`);
  return res.json() as Promise<Bank>;
}

export { banks as bankRecords };
