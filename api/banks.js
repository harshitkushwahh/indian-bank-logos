const { withUrls, parseQuery, filterBanks, json, DEFAULT_BASE } = require("./_lib");

module.exports = (req, res) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return json(res, 405, { error: "Method not allowed" });
  }

  const { q, category, limit, offset } = parseQuery(req);
  const validCategories = ["nationalised", "private", "sfb", "payments", "lab", "foreign"];

  if (category && !validCategories.includes(category)) {
    return json(res, 400, {
      error: "Invalid category",
      validCategories,
    });
  }

  const filtered = filterBanks({ q, category });
  const total = filtered.length;
  const page = filtered.slice(offset, offset + limit).map((b) => withUrls(b, DEFAULT_BASE));

  return json(res, 200, {
    version: "1.0.0",
    count: page.length,
    total,
    offset,
    limit,
    banks: page,
  });
};
