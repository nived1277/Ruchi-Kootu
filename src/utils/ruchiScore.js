// RUCHI KOOTU - RUCHI Score Calculation Engine

export function calculateDistance(lat1, lng1, lat2, lng2) {
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

// Extensible and modular scoring factors definition
export const SCORING_FACTORS = [
  {
    name: 'distance',
    weight: 0.40,
    calculate: (restaurant, context) => {
      let dist = restaurant.distance;
      if (context.userLocation && restaurant.geometry?.location) {
        const rLat = typeof restaurant.geometry.location.lat === 'function' ? restaurant.geometry.location.lat() : restaurant.geometry.location.lat;
        const rLng = typeof restaurant.geometry.location.lng === 'function' ? restaurant.geometry.location.lng() : restaurant.geometry.location.lng;
        dist = calculateDistance(context.userLocation.lat, context.userLocation.lng, rLat, rLng);
      }
      
      if (dist === undefined || dist === null) return 40; // Default fallback if no distance
      
      // Distance Scoring thresholds:
      // 0–300m = 100 points
      // 300–800m = 90
      // 800m–1.5km = 75
      // 1.5km–3km = 60
      // More than 3km = 40
      const distMeters = dist * 1000;
      if (distMeters <= 300) return 100;
      if (distMeters <= 800) return 90;
      if (distMeters <= 1500) return 75;
      if (distMeters <= 3000) return 60;
      return 40;
    }
  },
  {
    name: 'categoryMatch',
    weight: 0.20,
    calculate: (restaurant, context) => {
      const query = (context.searchQuery || '').toLowerCase().trim();
      const categoriesToCheck = ['cafe', 'restaurant', 'bakery', 'fast food'];
      const activeCategory = categoriesToCheck.find(cat => query.includes(cat));
      
      if (!activeCategory) {
        return 100; // Neutral if user hasn't searched for a specific category keyword
      }
      
      // Check if restaurant name, category, or cuisine matches the active category
      const name = (restaurant.name || '').toLowerCase();
      const cat = (restaurant.category || '').toLowerCase();
      const cuisine = (restaurant.cuisine || '').toLowerCase();
      
      if (name.includes(activeCategory) || cat.includes(activeCategory) || cuisine.includes(activeCategory)) {
        return 100;
      }
      
      return 0;
    }
  },
  {
    name: 'openStatus',
    weight: 0.15,
    calculate: (restaurant) => {
      return restaurant.isOpen ? 100 : 0;
    }
  },
  {
    name: 'popularity',
    weight: 0.10,
    calculate: (restaurant) => {
      const rating = Number(restaurant.rating) || 0;
      const reviewCount = Number(restaurant.reviewCount) || 0;
      
      // Original popularity formula avoiding Google ratings
      const ratingScore = (rating / 5) * 50;
      const reviewScore = Math.min(50, (reviewCount / 500) * 50);
      
      return ratingScore + reviewScore;
    }
  },
  {
    name: 'favorites',
    weight: 0.10,
    calculate: (restaurant, context) => {
      const favList = context.favorites || [];
      return favList.includes(restaurant.id) ? 100 : 0;
    }
  },
  {
    name: 'searchRelevance',
    weight: 0.05,
    calculate: (restaurant, context) => {
      const query = (context.searchQuery || '').toLowerCase().trim();
      if (!query) {
        return 100; // Neutral if no search query
      }
      
      const name = (restaurant.name || '').toLowerCase();
      const cat = (restaurant.category || '').toLowerCase();
      const cuisine = (restaurant.cuisine || '').toLowerCase();
      const desc = (restaurant.description || '').toLowerCase();
      const addr = (restaurant.address || '').toLowerCase();
      
      if (name.includes(query) || cat.includes(query) || cuisine.includes(query) || desc.includes(query) || addr.includes(query)) {
        return 100;
      }
      
      return 0;
    }
  }
];

function getCurrentDiningTimeSegment() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 11) return "Breakfast";
  if (hour >= 11 && hour < 16) return "Lunch";
  return "Dinner";
}

export function computeRuchiScore(restaurant, context = {}) {
  let totalScore = 0;
  const factorScores = {};

  // Calculate weighted score sum
  SCORING_FACTORS.forEach(factor => {
    const rawScore = factor.calculate(restaurant, context);
    factorScores[factor.name] = rawScore;
    totalScore += rawScore * factor.weight;
  });

  // Apply User Preferences Boost
  if (context.preferences) {
    const prefs = context.preferences;
    let boost = 0;
    // Cuisine preference boost (up to 8 points)
    if (prefs.cuisines && restaurant.cuisine && prefs.cuisines[restaurant.cuisine]) {
      boost += Math.min(8, prefs.cuisines[restaurant.cuisine] * 0.15);
    }
    // Category preference boost (up to 6 points)
    if (prefs.categories && restaurant.category && prefs.categories[restaurant.category]) {
      boost += Math.min(6, prefs.categories[restaurant.category] * 0.15);
    }
    // Dining Time preference boost (up to 3 points)
    const timeSegment = getCurrentDiningTimeSegment();
    if (prefs.diningTimes && prefs.diningTimes[timeSegment]) {
      boost += Math.min(3, prefs.diningTimes[timeSegment] * 0.15);
    }
    
    totalScore += boost;
  }

  const finalScore = Math.min(100, Math.max(0, Math.round(totalScore)));

  // Generate "Why Recommended" reasons
  const reasons = [];

  // Personalized reasons from preference engine
  if (context.preferences) {
    const prefs = context.preferences;
    if (prefs.cuisines && restaurant.cuisine && prefs.cuisines[restaurant.cuisine] >= 15) {
      reasons.push(`Likes ${restaurant.cuisine}`);
    }
    if (prefs.categories && restaurant.category && prefs.categories[restaurant.category] >= 15) {
      reasons.push(`Prefers ${restaurant.category}s`);
    }
  }
  
  // 1. Very Close (distance <= 300m)
  let dist = restaurant.distance;
  if (context.userLocation && restaurant.geometry?.location) {
    const rLat = typeof restaurant.geometry.location.lat === 'function' ? restaurant.geometry.location.lat() : restaurant.geometry.location.lat;
    const rLng = typeof restaurant.geometry.location.lng === 'function' ? restaurant.geometry.location.lng() : restaurant.geometry.location.lng;
    dist = calculateDistance(context.userLocation.lat, context.userLocation.lng, rLat, rLng);
  }
  if (dist !== undefined && dist !== null && dist <= 0.3) {
    reasons.push("Very Close");
  }

  // 2. Matches Search (search query present and relevance matches)
  if (context.searchQuery && factorScores.searchRelevance === 100) {
    reasons.push("Matches Search");
  }

  // 3. Favorite
  if (context.favorites && context.favorites.includes(restaurant.id)) {
    reasons.push("Favorite");
  }

  // 4. Open Now
  if (restaurant.isOpen) {
    reasons.push("Open Now");
  }

  // 5. Popular Nearby
  if (factorScores.popularity >= 80) {
    reasons.push("Popular Nearby");
  }

  // If no reasons match, provide a premium fallback
  if (reasons.length === 0) {
    reasons.push("Elite Ambiance");
  }

  return {
    score: finalScore,
    reasons: reasons.slice(0, 3) // Return up to 3 strong reasons
  };
}
