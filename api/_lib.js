const banks = require("../data/banks.json");

const PRODUCTION_URL = "https://indian-bank-logos.vercel.app";
/** Always use the public CDN domain for logo URLs in API responses. */
const DEFAULT_BASE = process.env.BANK_LOGOS_BASE_URL || PRODUCTION_URL;

function withUrls(bank, base) {
  const root = base || DEFAULT_BASE;
  return {
    slug: bank.slug,
    name: bank.name,
    category: bank.category,
    logo: `${root}/logos/${bank.slug}.png`,
    logoHorizontal: bank.hasHorizontal
      ? `${root}/logos/${bank.slug}-horizontal.png`
      : null,
  };
}

function parseQuery(req) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  return {
    q: url.searchParams.get("q")?.trim().toLowerCase() || "",
    category: url.searchParams.get("category")?.trim().toLowerCase() || "",
    limit: Math.min(parseInt(url.searchParams.get("limit") || "100", 10), 100),
    offset: Math.max(parseInt(url.searchParams.get("offset") || "0", 10), 0),
  };
}

function filterBanks({ q, category }) {
  return banks.filter((bank) => {
    if (category && bank.category !== category) return false;
    if (!q) return true;
    return (
      bank.slug.includes(q) ||
      bank.name.toLowerCase().includes(q)
    );
  });
}

function json(res, status, body) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(status).json(body);
}

module.exports = { banks, withUrls, parseQuery, filterBanks, json, DEFAULT_BASE };
