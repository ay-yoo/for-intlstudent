export default async function handler(req, res) {
  try {
    const { lat, lon, address } = req.query;

    if (!lat || !lon) return res.status(400).json({ error: "Missing lat/lon" });

    const key = process.env.WALKSCORE_API_KEY;
    if (!key)
      return res.status(500).json({ error: "Missing WALKSCORE_API_KEY" });

    const safeAddress = (address || "Unknown address").toString();

    const url =
      `https://api.walkscore.com/score?format=json` +
      `&lat=${encodeURIComponent(lat)}` +
      `&lon=${encodeURIComponent(lon)}` +
      `&address=${encodeURIComponent(safeAddress)}` +
      `&wsapikey=${encodeURIComponent(key)}` +
      `&bike=1&transit=1`;

    const r = await fetch(url);
    const data = await r.json();

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "WalkScore failed" });
  }
}
