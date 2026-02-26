export default async function handler(req, res) {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.status(400).json({ error: "Missing q" });

    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;

    const r = await fetch(url, {
      headers: {
        "User-Agent": "for-intlstudent (school project)",
        "Accept-Language": "en",
      },
    });

    const data = await r.json();
    if (!data?.length) {
      return res.status(404).json({ error: "No result" });
    }

    const { lat, lon, display_name } = data[0];
    res.status(200).json({
      lat: Number(lat),
      lon: Number(lon),
      display_name,
    });
  } catch (e) {
    res.status(500).json({ error: "Geocode failed" });
  }
}
