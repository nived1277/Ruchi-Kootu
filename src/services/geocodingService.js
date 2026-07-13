// RUCHI KOOTU - Geocoding Service (OpenStreetMap Nominatim)

export async function geocodePlace(placeName) {
  if (!placeName || !placeName.trim()) return null;

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName.trim())}&format=json&limit=1`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'RuchiKootuApp/1.0'
      }
    });

    if (!response.ok) {
      throw new Error("Nominatim geocoding request failed");
    }

    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name
      };
    }
    return null;
  } catch (err) {
    console.error("Geocoding service error:", err);
    return null;
  }
}
