const { banks, withUrls, json, DEFAULT_BASE } = require("../_lib");

module.exports = (req, res) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return json(res, 405, { error: "Method not allowed" });
  }

  const slug = req.query.slug;
  const bank = banks.find((b) => b.slug === slug);

  if (!bank) {
    return json(res, 404, { error: "Bank not found", slug });
  }

  return json(res, 200, withUrls(bank, DEFAULT_BASE));
};
