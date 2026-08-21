#!/usr/bin/env node
/**
 * Regenerate data/banks.json from public/logos and copy to npm package.
 * Run after adding new logo files.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const LOGOS = path.join(ROOT, "public", "logos");
const META_PATH = path.join(__dirname, "bank-meta.json");

const meta = JSON.parse(fs.readFileSync(META_PATH, "utf8"));
const files = fs.readdirSync(LOGOS).filter((f) => f.endsWith(".png"));

const slugs = new Set();
for (const f of files) {
  if (f.endsWith("-horizontal.png")) {
    slugs.add(f.replace("-horizontal.png", ""));
  } else if (!f.includes("-horizontal")) {
    slugs.add(f.replace(".png", ""));
  }
}

const banks = [];
for (const slug of [...slugs].sort()) {
  const m = meta[slug];
  if (!m) {
    console.warn(`No metadata for slug: ${slug}`);
    continue;
  }
  const std = path.join(LOGOS, `${slug}.png`);
  if (!fs.existsSync(std)) {
    console.warn(`Missing standard logo: ${slug}.png`);
    continue;
  }
  banks.push({
    slug,
    name: m.name,
    category: m.category,
    hasHorizontal: fs.existsSync(path.join(LOGOS, `${slug}-horizontal.png`)),
  });
}

const out = path.join(ROOT, "data", "banks.json");
fs.writeFileSync(out, JSON.stringify(banks, null, 2));

const pkgData = path.join(ROOT, "packages", "indian-bank-logos", "data", "banks.json");
fs.mkdirSync(path.dirname(pkgData), { recursive: true });
fs.writeFileSync(pkgData, JSON.stringify(banks, null, 2));

console.log(`Generated manifest: ${banks.length} banks -> ${out}`);
console.log(`Copied to npm package: ${pkgData}`);
