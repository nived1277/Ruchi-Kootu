export default async function handler(req, res) {
  // Support GET (query) and POST (body)
  let lat, lng, radius;

  if (req.method === 'POST') {
    const body = req.body || {};
    lat = body.lat || body.latitude;
    lng = body.lng || body.longitude;
    radius = body.radius || body.searchRadius;
    
    if (typeof body === 'string') {
      try {
        const parsed = JSON.parse(body);
        lat = lat || parsed.lat || parsed.latitude;
        lng = lng || parsed.lng || parsed.longitude;
        radius = radius || parsed.radius || parsed.searchRadius;
      } catch (e) {
        // Not JSON
      }
    }
  }

  // Fallback to query params
  lat = lat || req.query.lat || req.query.latitude;
  lng = lng || req.query.lng || req.query.longitude;
  radius = radius || req.query.radius || req.query.searchRadius;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing required parameters: latitude/lat and longitude/lng are required." });
  }

  const searchRadius = radius || 1000;

  // Build the SAME Overpass query already used in useNearbyRestaurants.js
  const query = `[out:json][timeout:25];
(
  node["amenity"~"^(restaurant|cafe|fast_food|food_court)$"](around:${searchRadius},${lat},${lng});
  way["amenity"~"^(restaurant|cafe|fast_food|food_court)$"](around:${searchRadius},${lat},${lng});
  relation["amenity"~"^(restaurant|cafe|fast_food|food_court)$"](around:${searchRadius},${lat},${lng});
);
out center;`;

  try {
    const overpassUrl = 'https://overpass-api.de/api/interpreter';
    const response = await fetch(overpassUrl, {
      method: 'POST',
      body: `data=${encodeURIComponent(query)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'RuchiKootuRestaurantFinder/1.0'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: `Failed to fetch from Overpass API: ${response.statusText}`,
        details: errorText
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching restaurants from Overpass API:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
