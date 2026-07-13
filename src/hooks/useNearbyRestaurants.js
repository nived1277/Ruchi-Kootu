import { useState, useEffect } from 'react';
import { computeRuchiScore } from '../utils/ruchiScore.js';

// Calculate Distance using Haversine Formula
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const cuisineImages = {
  "Artisanal Japanese": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
  "Contemporary French": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  "Royal Awadhi": "https://images.unsplash.com/photo-1585938338392-50a59970d8ee?auto=format&fit=crop&w=800&q=80",
  "New Nordic & Botanical": "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
  "Modern South Indian": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=800&q=80"
};

function determineCuisine(tags) {
  const cuisineTag = (tags.cuisine || "").toLowerCase();
  const name = (tags.name || "").toLowerCase();
  
  if (cuisineTag.includes("japanese") || cuisineTag.includes("sushi") || name.includes("sushi") || name.includes("japanese")) {
    return "Artisanal Japanese";
  }
  if (cuisineTag.includes("french") || name.includes("french") || name.includes("bistro")) {
    return "Contemporary French";
  }
  if (cuisineTag.includes("indian") || cuisineTag.includes("regional") || name.includes("biryani") || name.includes("mahal") || name.includes("kebab") || cuisineTag.includes("awadhi")) {
    return "Royal Awadhi";
  }
  if (cuisineTag.includes("nordic") || name.includes("nordic") || name.includes("glasshouse") || name.includes("botanical")) {
    return "New Nordic & Botanical";
  }
  if (cuisineTag.includes("south_indian") || name.includes("south") || name.includes("kootu") || name.includes("dosa") || cuisineTag.includes("south")) {
    return "Modern South Indian";
  }
  
  const fallbackCuisines = ["Modern South Indian", "Contemporary French", "Royal Awadhi", "Artisanal Japanese", "New Nordic & Botanical"];
  const charCodeSum = (tags.name || "Gastronomy Lounge").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return fallbackCuisines[charCodeSum % fallbackCuisines.length];
}

export function useNearbyRestaurants(coordinates, searchRadius) {
  const [placesData, setPlacesData] = useState([]);
  const [placesLoading, setPlacesLoading] = useState(false);
  const [placesError, setPlacesError] = useState(null);

  useEffect(() => {
    if (!coordinates) return;

    setPlacesLoading(true);
    setPlacesError(null);

    const fetchNearbyRestaurants = async () => {
      try {
        // Query restaurants, cafes, fast_food, and food courts using Overpass API
        const query = `[out:json][timeout:25];
(
  node["amenity"~"^(restaurant|cafe|fast_food|food_court)$"](around:${searchRadius},${coordinates.lat},${coordinates.lng});
  way["amenity"~"^(restaurant|cafe|fast_food|food_court)$"](around:${searchRadius},${coordinates.lat},${coordinates.lng});
  relation["amenity"~"^(restaurant|cafe|fast_food|food_court)$"](around:${searchRadius},${coordinates.lat},${coordinates.lng});
);
out center;`;

        const url = 'https://overpass-api.de/api/interpreter';
        const response = await fetch(url, {
          method: 'POST',
          body: `data=${encodeURIComponent(query)}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch from Overpass API");
        }

        const data = await response.json();
        
        if (!data.elements || data.elements.length === 0) {
          setPlacesData([]);
          setPlacesError("NO_RESTAURANTS_FOUND");
          setPlacesLoading(false);
          return;
        }

        const mapped = data.elements
          .filter(element => element.tags && element.tags.name)
          .map(element => {
            const lat = element.lat || (element.center && element.center.lat);
            const lng = element.lon || (element.center && element.center.lon);
            const dist = calculateDistance(coordinates.lat, coordinates.lng, lat, lng);
            const travelTimeVal = Math.max(2, Math.round(dist * 2.5));
            
            const tags = element.tags;
            const finalCuisine = determineCuisine(tags);

            const ruchiObj = computeRuchiScore({
              name: tags.name,
              rating: Number(tags.rating) || (4.3 + (element.id % 8) * 0.1),
              reviewCount: Number(tags.reviews) || (50 + (element.id % 450)),
              distance: dist,
              isOpen: element.id % 7 !== 0,
              priceLevel: 2 + (element.id % 3)
            });

            const phone = tags.phone || `+91 80 ${(30000000 + (element.id % 60000000))}`;
            const website = tags.website || "https://www.ruchikootu.com";
            const address = tags["addr:full"] || (tags["addr:street"] ? `${tags["addr:housenumber"] || ""} ${tags["addr:street"]}`.trim() : "Heritage Quarter");
            
            const selectedImage = cuisineImages[finalCuisine] || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80";

            const amenity = tags.amenity || "restaurant";
            const category = amenity === "fast_food" ? "Fast Food" :
                             amenity === "food_court" ? "Food Court" :
                             amenity === "cafe" ? "Cafe" : "Restaurant";

            return {
              id: `rest-${element.id}`,
              osmId: element.id,
              osmType: element.type,
              name: tags.name,
              category,
              cuisine: finalCuisine,
              rating: Number(tags.rating) || Math.round((4.3 + (element.id % 8) * 0.1) * 10) / 10,
              reviewCount: Number(tags.reviews) || (50 + (element.id % 450)),
              priceLevel: 2 + (element.id % 3),
              distance: dist,
              estimatedTravelTime: travelTimeVal,
              ruchiScore: ruchiObj.score,
              ruchiReasons: ruchiObj.reasons,
              isOpen: element.id % 7 !== 0,
              phone,
              website,
              address,
              description: `An exceptional dining venue selected for its refined ${finalCuisine.toLowerCase()} gastronomy and ambiance.`,
              hours: { weekday: "12:00 - 23:30", weekend: "12:00 - 00:30", weekday_text: ["Monday - Friday: 12:00 - 23:30", "Saturday - Sunday: 12:00 - 00:30"] },
              reviews: [
                { author: "Concierge Guide", rating: 5, comment: "Highly praised by elite members for exceptional service and food quality." }
              ],
              image: selectedImage,
              images: [
                selectedImage,
                "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
              ],
              geometry: {
                location: { lat, lng }
              }
            };
          });

        setPlacesData(mapped);
        setPlacesLoading(false);
      } catch (err) {
        console.error(err);
        setPlacesData([]);
        setPlacesError("OVERPASS_API_ERROR");
        setPlacesLoading(false);
      }
    };

    fetchNearbyRestaurants();
  }, [coordinates, searchRadius]);

  return { placesData, placesLoading, placesError };
}
